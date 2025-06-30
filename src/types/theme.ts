// Theme system types for DivCoins
export interface ThemeColors {
  // Base colors (OKLCH format)
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  accent: string
  accentForeground: string
  
  // Background colors
  background: string
  foreground: string
  muted: string
  mutedForeground: string
  
  // UI elements
  card: string
  cardForeground: string
  popover: string
  popoverForeground: string
  border: string
  input: string
  ring: string
  
  // Status colors
  destructive: string
  destructiveForeground: string
  success: string
  successForeground: string
  warning: string
  warningForeground: string
  
  // Chart colors (for expense analytics)
  chart1: string
  chart2: string
  chart3: string
  chart4: string
  chart5: string
}

export interface ThemeMetadata {
  id: string
  name: string
  description: string
  category: 'default' | 'nature' | 'dark' | 'colorful' | 'minimal' | 'premium'
  author: string
  version: string
  source: 'built-in' | 'tweakcn' | 'community' | 'custom'
  
  // Preview and branding
  previewImage?: string
  thumbnailUrl?: string
  tags: string[]
  
  // Compatibility and features
  supportsLightMode: boolean
  supportsDarkMode: boolean
  isAnimated: boolean
  requiredComponents?: string[]
  
  // Metrics
  downloadCount: number
  rating: number
  createdAt: string
  updatedAt: string
}

export interface Theme {
  metadata: ThemeMetadata
  colors: {
    light: ThemeColors
    dark: ThemeColors
  }
  customCSS?: string
  fonts?: {
    heading: string
    body: string
    mono: string
  }
  borderRadius?: {
    sm: string
    md: string
    lg: string
    xl: string
  }
}

export interface ThemeState {
  // Current theme
  currentTheme: Theme | null
  currentMode: 'light' | 'dark'
  
  // Available themes
  availableThemes: Theme[]
  isLoading: boolean
  error: string | null
  
  // Favorites and user preferences
  favoriteThemeIds: string[]
  recentThemeIds: string[]
  
  // Preview mode
  previewTheme: Theme | null
  isPreviewMode: boolean
  
  // Search and filtering
  searchQuery: string
  selectedCategory: ThemeMetadata['category'] | 'all'
  selectedTags: string[]
  
  // Performance
  themeCache: Map<string, Theme>
  lastUpdated: string
}

export interface ThemeActions {
  // Theme management
  setTheme: (theme: Theme) => void
  setMode: (mode: 'light' | 'dark') => void
  toggleMode: () => void
  
  // Theme loading
  loadThemes: () => Promise<void>
  loadTheme: (themeId: string) => Promise<Theme | null>
  refreshThemes: () => Promise<void>
  
  // Favorites
  toggleFavorite: (themeId: string) => void
  addToRecent: (themeId: string) => void
  clearRecent: () => void
  
  // Preview mode
  startPreview: (theme: Theme) => void
  endPreview: () => void
  applyPreview: () => void
  
  // Search and filtering
  setSearchQuery: (query: string) => void
  setCategory: (category: ThemeMetadata['category'] | 'all') => void
  toggleTag: (tag: string) => void
  clearFilters: () => void
  
  // Cache management
  clearCache: () => void
  getCachedTheme: (themeId: string) => Theme | null
  
  // Persistence
  saveToStorage: () => void
  loadFromStorage: () => void
}

export type ThemeStore = ThemeState & ThemeActions

// Helper types for theme creation
export interface CreateThemeInput {
  metadata: Omit<ThemeMetadata, 'id' | 'createdAt' | 'updatedAt' | 'downloadCount' | 'rating'>
  colors: Theme['colors']
  customCSS?: string
  fonts?: Theme['fonts']
  borderRadius?: Theme['borderRadius']
}

// Theme validation
export interface ThemeValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

// Performance metrics
export interface ThemePerformanceMetrics {
  loadTime: number
  applyTime: number
  cacheSize: number
  lastOptimized: string
}