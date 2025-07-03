import { useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'
import type { AuthUser } from '@/stores/authStore'

// Main authentication hook
export function useAuth() {
  const {
    user,
    session,
    loading,
    initializing,
    error,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    refreshSession,
    clearError,
    updateProfile,
    updateThemePreferences,
    resetPassword,
    updatePassword,
    initialize,
  } = useAuthStore()

  // Initialize auth on first use
  useEffect(() => {
    if (initializing) {
      initialize()
    }
  }, [initialize, initializing])

  return {
    // State
    user,
    session,
    loading,
    initializing,
    error,
    isAuthenticated: !!user,
    
    // Actions
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    refreshSession,
    clearError,
    updateProfile,
    updateThemePreferences,
    resetPassword,
    updatePassword,
  }
}

// Hook for checking authentication status
export function useAuthStatus() {
  const { user, loading, initializing } = useAuthStore()
  
  return {
    isAuthenticated: !!user,
    isLoading: loading || initializing,
    user,
  }
}

// Hook for form validation helpers
export function useAuthValidation() {
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long')
    }
    
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Password must contain at least one lowercase letter')
    }
    
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Password must contain at least one uppercase letter')
    }
    
    if (!/(?=.*\d)/.test(password)) {
      errors.push('Password must contain at least one number')
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  const validateDisplayName = (name: string): boolean => {
    return name.trim().length >= 2 && name.trim().length <= 50
  }

  return {
    validateEmail,
    validatePassword,
    validateDisplayName,
  }
}

// Hook for auth-dependent operations
export function useRequireAuth() {
  const { user, initializing } = useAuthStore()
  
  const requireAuth = (callback: (user: AuthUser) => void | Promise<void>) => {
    if (initializing) {
      return // Still loading, wait
    }
    
    if (!user) {
      throw new Error('Authentication required')
    }
    
    return callback(user)
  }

  return { requireAuth, user, isReady: !initializing }
}

// Hook for protecting routes
export function useAuthGuard() {
  const { user, initializing, loading } = useAuthStore()
  
  const isLoading = initializing || loading
  const isAuthenticated = !!user
  const shouldRedirectToLogin = !isLoading && !isAuthenticated
  const shouldRedirectToDashboard = !isLoading && isAuthenticated

  return {
    isLoading,
    isAuthenticated,
    shouldRedirectToLogin,
    shouldRedirectToDashboard,
    user,
  }
}

// Hook for session management
export function useSession() {
  const { session, refreshSession, user } = useAuthStore()
  
  const isSessionValid = () => {
    if (!session) return false
    
    const now = Date.now() / 1000
    const expiresAt = session.expires_at || 0
    
    // Check if session expires in the next 5 minutes
    return expiresAt > (now + 300)
  }

  const refreshIfNeeded = async () => {
    if (!isSessionValid()) {
      await refreshSession()
    }
  }

  return {
    session,
    isSessionValid: isSessionValid(),
    refreshSession,
    refreshIfNeeded,
    user,
  }
}

// Hook for user profile management
export function useUserProfile() {
  const { user, updateProfile, loading, error } = useAuthStore()
  
  const updateUserProfile = async (updates: {
    display_name?: string
    avatar_url?: string
  }) => {
    if (!user) {
      throw new Error('User not authenticated')
    }
    
    return updateProfile(updates)
  }

  return {
    user,
    updateProfile: updateUserProfile,
    loading,
    error,
    displayName: user?.user_metadata?.display_name || user?.email?.split('@')[0] || '',
    avatarUrl: user?.user_metadata?.avatar_url,
  }
}

// Hook for theme integration with auth
export function useAuthTheme() {
  const { user, updateThemePreferences } = useAuthStore()
  
  const getUserThemePreferences = () => {
    return user?.user_metadata?.theme_preferences || {
      currentTheme: 'divcoins-default',
      favoriteThemes: [],
      darkMode: false,
    }
  }

  const syncThemeToUser = async (themeData: {
    currentTheme: string
    favoriteThemes: string[]
    darkMode: boolean
  }) => {
    if (user) {
      await updateThemePreferences(themeData)
    }
  }

  return {
    userThemePreferences: getUserThemePreferences(),
    syncThemeToUser,
    isAuthenticated: !!user,
  }
}