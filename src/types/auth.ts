export interface User {
  id: string
  email: string
  display_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
  theme_preferences?: ThemePreferences
}

export interface ThemePreferences {
  currentTheme: string
  favoriteThemes: string[]
  darkMode: boolean
  autoSyncThemes?: boolean
  allowThemeRecommendations?: boolean
}

export interface AuthSession {
  access_token: string
  refresh_token: string
  expires_at: number
  user: User
}

export interface SignUpData {
  email: string
  password: string
  displayName?: string
  themePreferences?: ThemePreferences
}

export interface SignInData {
  email: string
  password: string
  rememberMe?: boolean
}

export interface UpdateProfileData {
  display_name?: string
  avatar_url?: string
  theme_preferences?: ThemePreferences
}

export interface PasswordResetData {
  email: string
  redirectTo?: string
}

export interface PasswordUpdateData {
  password: string
  confirmPassword: string
}

export interface AuthError {
  message: string
  code?: string
  details?: unknown
}

export interface AuthResponse<T = unknown> {
  success: boolean
  data?: T
  error?: AuthError
}

// OAuth providers
export type OAuthProvider = 'google' | 'apple' | 'github' | 'discord'

export interface OAuthConfig {
  provider: OAuthProvider
  redirectTo?: string
  scopes?: string
}

// User roles and permissions (for future use)
export type UserRole = 'user' | 'admin' | 'moderator'

export interface UserPermissions {
  canCreateGroups: boolean
  canManageUsers: boolean
  canAccessAnalytics: boolean
  canCustomizeThemes: boolean
}

// Auth state
export interface AuthState {
  user: User | null
  session: AuthSession | null
  loading: boolean
  initializing: boolean
  error: AuthError | null
  lastActivity: number
}

// Form validation
export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export interface FormValidation {
  email: ValidationResult
  password: ValidationResult
  confirmPassword: ValidationResult
  displayName: ValidationResult
}

// Session management
export interface SessionConfig {
  autoRefresh: boolean
  persistSession: boolean
  detectSessionInUrl: boolean
  sessionTimeout: number // in minutes
}

// Multi-device sync
export interface DeviceInfo {
  id: string
  name: string
  type: 'mobile' | 'desktop' | 'tablet'
  lastSeen: string
  isActive: boolean
}

export interface UserDevices {
  current: DeviceInfo
  others: DeviceInfo[]
  syncEnabled: boolean
}