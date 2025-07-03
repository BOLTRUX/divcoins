import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { User, Session } from '@supabase/supabase-js'
import { 
  supabase, 
  signUp as supabaseSignUp, 
  signIn as supabaseSignIn, 
  signOut as supabaseSignOut,
  signInWithGoogle,
  updateUserProfile 
} from '@/lib/supabase'

export interface AuthUser extends User {
  display_name?: string
  theme_preferences?: {
    currentTheme: string
    favoriteThemes: string[]
    darkMode: boolean
  }
}

export interface AuthState {
  // Core state
  user: AuthUser | null
  session: Session | null
  loading: boolean
  initializing: boolean
  error: string | null
  
  // Authentication actions
  signUp: (email: string, password: string, displayName?: string) => Promise<{ success: boolean; error?: string }>
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<{ success: boolean; error?: string }>
  
  // Session management
  refreshSession: () => Promise<void>
  clearError: () => void
  
  // Profile management
  updateProfile: (updates: { display_name?: string; avatar_url?: string }) => Promise<{ success: boolean; error?: string }>
  updateThemePreferences: (preferences: AuthUser['theme_preferences']) => Promise<{ success: boolean; error?: string }>
  
  // Password management
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>
  updatePassword: (password: string) => Promise<{ success: boolean; error?: string }>
  
  // Internal actions
  setUser: (user: AuthUser | null) => void
  setSession: (session: Session | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      session: null,
      loading: false,
      initializing: true,
      error: null,

      // Authentication actions
      signUp: async (email: string, password: string, displayName?: string) => {
        set({ loading: true, error: null })
        
        try {
          const { data, error } = await supabaseSignUp(email, password)
          
          if (error) {
            set({ error: error.message, loading: false })
            return { success: false, error: error.message }
          }

          // If signup successful and we have a user, update display name
          if (data.user && displayName) {
            await updateUserProfile({ display_name: displayName })
          }

          set({ loading: false })
          return { success: true }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
          set({ error: errorMessage, loading: false })
          return { success: false, error: errorMessage }
        }
      },

      signIn: async (email: string, password: string) => {
        set({ loading: true, error: null })
        
        try {
          const { data, error } = await supabaseSignIn(email, password)
          
          if (error) {
            set({ error: error.message, loading: false })
            return { success: false, error: error.message }
          }

          if (data.user && data.session) {
            set({ 
              user: data.user as AuthUser, 
              session: data.session, 
              loading: false 
            })
            return { success: true }
          }

          set({ loading: false })
          return { success: false, error: 'No user data received' }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
          set({ error: errorMessage, loading: false })
          return { success: false, error: errorMessage }
        }
      },

      signInWithGoogle: async () => {
        set({ loading: true, error: null })
        
        try {
          const { error } = await signInWithGoogle()
          
          if (error) {
            set({ error: error.message, loading: false })
            return { success: false, error: error.message }
          }

          set({ loading: false })
          return { success: true }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
          set({ error: errorMessage, loading: false })
          return { success: false, error: errorMessage }
        }
      },

      signOut: async () => {
        set({ loading: true, error: null })
        
        try {
          const { error } = await supabaseSignOut()
          
          if (error) {
            set({ error: error.message, loading: false })
            return { success: false, error: error.message }
          }

          set({ 
            user: null, 
            session: null, 
            loading: false,
            error: null 
          })
          return { success: true }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
          set({ error: errorMessage, loading: false })
          return { success: false, error: errorMessage }
        }
      },

      // Session management
      refreshSession: async () => {
        try {
          const { data: { session }, error } = await supabase.auth.refreshSession()
          
          if (error) {
            console.error('Session refresh error:', error)
            set({ error: error.message })
            return
          }

          if (session) {
            set({ session, user: session.user as AuthUser })
          }
        } catch (error) {
          console.error('Session refresh failed:', error)
          set({ error: error instanceof Error ? error.message : 'Session refresh failed' })
        }
      },

      clearError: () => {
        set({ error: null })
      },

      // Profile management
      updateProfile: async (updates: { display_name?: string; avatar_url?: string }) => {
        set({ loading: true, error: null })
        
        try {
          const { error } = await updateUserProfile(updates)
          
          if (error) {
            set({ error: error.message, loading: false })
            return { success: false, error: error.message }
          }

          set({ loading: false })
          return { success: true }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Profile update failed'
          set({ error: errorMessage, loading: false })
          return { success: false, error: errorMessage }
        }
      },

      updateThemePreferences: async (preferences: AuthUser['theme_preferences']) => {
        set({ loading: true, error: null })
        
        try {
          const { data, error } = await supabase.auth.updateUser({
            data: { theme_preferences: preferences }
          })
          
          if (error) {
            set({ error: error.message, loading: false })
            return { success: false, error: error.message }
          }

          if (data.user) {
            const updatedUser = { 
              ...data.user, 
              theme_preferences: preferences 
            } as AuthUser
            
            set({ user: updatedUser, loading: false })
            return { success: true }
          }

          set({ loading: false })
          return { success: true }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Theme preferences update failed'
          set({ error: errorMessage, loading: false })
          return { success: false, error: errorMessage }
        }
      },

      // Password management
      resetPassword: async (email: string) => {
        set({ loading: true, error: null })
        
        try {
          const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
          })
          
          if (error) {
            set({ error: error.message, loading: false })
            return { success: false, error: error.message }
          }

          set({ loading: false })
          return { success: true }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Password reset failed'
          set({ error: errorMessage, loading: false })
          return { success: false, error: errorMessage }
        }
      },

      updatePassword: async (password: string) => {
        set({ loading: true, error: null })
        
        try {
          const { error } = await supabase.auth.updateUser({ password })
          
          if (error) {
            set({ error: error.message, loading: false })
            return { success: false, error: error.message }
          }

          set({ loading: false })
          return { success: true }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Password update failed'
          set({ error: errorMessage, loading: false })
          return { success: false, error: errorMessage }
        }
      },

      // Internal actions
      setUser: (user: AuthUser | null) => set({ user }),
      setSession: (session: Session | null) => set({ session }),
      setLoading: (loading: boolean) => set({ loading }),
      setError: (error: string | null) => set({ error }),

      // Initialize auth state
      initialize: async () => {
        set({ initializing: true })
        
        try {
          // Get current session
          const { data: { session }, error } = await supabase.auth.getSession()
          
          if (error) {
            console.error('Session initialization error:', error)
            set({ error: error.message, initializing: false })
            return
          }

          if (session) {
            set({ 
              session, 
              user: session.user as AuthUser,
              initializing: false 
            })
          } else {
            set({ initializing: false })
          }

          // Set up auth state listener
          supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth state change:', event, session?.user?.email)
            
            if (session) {
              set({ 
                session, 
                user: session.user as AuthUser,
                error: null 
              })
            } else {
              set({ 
                session: null, 
                user: null,
                error: null 
              })
            }
          })
        } catch (error) {
          console.error('Auth initialization failed:', error)
          set({ 
            error: error instanceof Error ? error.message : 'Authentication initialization failed',
            initializing: false 
          })
        }
      },
    }),
    {
      name: 'divcoins-auth-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist user data, not loading states or errors
        user: state.user,
      }),
    }
  )
)

// Hook for theme integration
export const useAuthTheme = () => {
  const { user, updateThemePreferences } = useAuthStore()
  
  const syncThemePreferences = async (themeData: {
    currentTheme: string
    favoriteThemes: string[]
    darkMode: boolean
  }) => {
    if (user) {
      await updateThemePreferences(themeData)
    }
  }

  return {
    userThemePreferences: user?.theme_preferences,
    syncThemePreferences,
  }
}

// Initialize auth on app start
export const initializeAuth = () => {
  const store = useAuthStore.getState()
  return store.initialize()
}