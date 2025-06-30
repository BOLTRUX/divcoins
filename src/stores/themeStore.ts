import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { ThemeStore, Theme, ThemeMetadata } from '@/types/theme'
import { mintFreshTheme } from '@/themes/tweakcn-mint'

// Default theme (built-in DivCoins theme)
const defaultTheme: Theme = {
  metadata: {
    id: 'divcoins-default',
    name: 'DivCoins Default',
    description: 'Official DivCoins theme with OKLCH colors',
    category: 'default',
    author: 'DivCoins Team',
    version: '1.0.0',
    source: 'built-in',
    previewImage: '/themes/previews/default.png',
    tags: ['default', 'lime', 'modern'],
    supportsLightMode: true,
    supportsDarkMode: true,
    isAnimated: false,
    downloadCount: 0,
    rating: 5.0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  colors: {
    light: {
      // Primary colors (Lime-based)
      primary: '75.83% 0.218 132.34',        // lime-500
      primaryForeground: '98.71% 0.009 106.23', // white
      secondary: '69.71% 0.329 342.55',      // pink-400  
      secondaryForeground: '98.71% 0.009 106.23',
      accent: '74.22% 0.167 183.61',         // cyan-400
      accentForeground: '98.71% 0.009 106.23',
      
      // Background colors
      background: '98.71% 0.009 106.23',     // white
      foreground: '25.32% 0.024 256.85',     // gray-900
      muted: '96.21% 0.014 240.01',          // gray-50
      mutedForeground: '53.36% 0.016 251.04', // gray-500
      
      // UI elements
      card: '98.71% 0.009 106.23',           // white
      cardForeground: '25.32% 0.024 256.85', // gray-900
      popover: '98.71% 0.009 106.23',        // white
      popoverForeground: '25.32% 0.024 256.85',
      border: '89.84% 0.011 240.01',         // gray-200
      input: '89.84% 0.011 240.01',          // gray-200
      ring: '75.83% 0.218 132.34',           // lime-500
      
      // Status colors
      destructive: '65.69% 0.249 27.33',     // red-500
      destructiveForeground: '98.71% 0.009 106.23',
      success: '69.80% 0.184 145.97',        // green-500
      successForeground: '98.71% 0.009 106.23',
      warning: '84.26% 0.199 83.87',         // yellow-500
      warningForeground: '98.71% 0.009 106.23',
      
      // Chart colors (for expense analytics)
      chart1: '75.83% 0.218 132.34',         // lime-500
      chart2: '69.71% 0.329 342.55',         // pink-400
      chart3: '74.22% 0.167 183.61',         // cyan-400
      chart4: '84.26% 0.199 83.87',          // yellow-500
      chart5: '69.80% 0.184 145.97',         // green-500
    },
    dark: {
      // Primary colors (Lime-based but darker)
      primary: '75.83% 0.218 132.34',        // lime-500 (same, works in dark)
      primaryForeground: '11.32% 0.006 256.85', // gray-950
      secondary: '69.71% 0.329 342.55',      // pink-400
      secondaryForeground: '11.32% 0.006 256.85',
      accent: '74.22% 0.167 183.61',         // cyan-400
      accentForeground: '11.32% 0.006 256.85',
      
      // Background colors
      background: '11.32% 0.006 256.85',     // gray-950
      foreground: '96.21% 0.014 240.01',     // gray-50
      muted: '18.04% 0.014 240.01',          // gray-800
      mutedForeground: '63.91% 0.015 240.01', // gray-400
      
      // UI elements
      card: '11.32% 0.006 256.85',           // gray-950
      cardForeground: '96.21% 0.014 240.01', // gray-50
      popover: '11.32% 0.006 256.85',        // gray-950
      popoverForeground: '96.21% 0.014 240.01',
      border: '18.04% 0.014 240.01',         // gray-800
      input: '18.04% 0.014 240.01',          // gray-800
      ring: '75.83% 0.218 132.34',           // lime-500
      
      // Status colors (same as light, they work well in dark)
      destructive: '65.69% 0.249 27.33',     // red-500
      destructiveForeground: '96.21% 0.014 240.01',
      success: '69.80% 0.184 145.97',        // green-500
      successForeground: '96.21% 0.014 240.01',
      warning: '84.26% 0.199 83.87',         // yellow-500
      warningForeground: '96.21% 0.014 240.01',
      
      // Chart colors (same, OKLCH works great in both modes)
      chart1: '75.83% 0.218 132.34',         // lime-500
      chart2: '69.71% 0.329 342.55',         // pink-400
      chart3: '74.22% 0.167 183.61',         // cyan-400
      chart4: '84.26% 0.199 83.87',          // yellow-500
      chart5: '69.80% 0.184 145.97',         // green-500
    }
  },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
    mono: 'Fira Code, Consolas, monospace',
  },
  borderRadius: {
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
  }
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentTheme: defaultTheme,
      currentMode: 'light',
      availableThemes: [defaultTheme, mintFreshTheme],
      isLoading: false,
      error: null,
      
      // User preferences
      favoriteThemeIds: [],
      recentThemeIds: ['divcoins-default'],
      
      // Preview mode
      previewTheme: null,
      isPreviewMode: false,
      
      // Search and filtering
      searchQuery: '',
      selectedCategory: 'all',
      selectedTags: [],
      
      // Performance
      themeCache: new Map(),
      lastUpdated: new Date().toISOString(),

      // Actions
      setTheme: (theme: Theme) => {
        const { isPreviewMode } = get()
        
        // Don't apply if in preview mode
        if (isPreviewMode) return
        
        set((state) => {
          // Add to recent themes
          const recentIds = [theme.metadata.id, ...state.recentThemeIds.filter(id => id !== theme.metadata.id)].slice(0, 10)
          
          // Apply theme to CSS variables
          applyThemeToDOM(theme, state.currentMode)
          
          return {
            currentTheme: theme,
            recentThemeIds: recentIds,
            lastUpdated: new Date().toISOString(),
          }
        })
      },

      setMode: (mode: 'light' | 'dark') => {
        const { currentTheme } = get()
        
        set({ currentMode: mode })
        
        // Apply current theme with new mode
        if (currentTheme) {
          applyThemeToDOM(currentTheme, mode)
        }
      },

      toggleMode: () => {
        const { currentMode, setMode } = get()
        setMode(currentMode === 'light' ? 'dark' : 'light')
      },

      loadThemes: async () => {
        set({ isLoading: true, error: null })
        
        try {
          // Load built-in themes and TweakCN themes
          const themes = [defaultTheme, mintFreshTheme]
          
          set({
            availableThemes: themes,
            isLoading: false,
            lastUpdated: new Date().toISOString(),
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to load themes',
            isLoading: false,
          })
        }
      },

      loadTheme: async (themeId: string) => {
        const { themeCache, availableThemes } = get()
        
        // Check cache first
        const cachedTheme = themeCache.get(themeId)
        if (cachedTheme) return cachedTheme
        
        // Check available themes
        const existingTheme = availableThemes.find(t => t.metadata.id === themeId)
        if (existingTheme) {
          // Add to cache
          set((state) => {
            const newCache = new Map(state.themeCache)
            newCache.set(themeId, existingTheme)
            return { themeCache: newCache }
          })
          return existingTheme
        }
        
        // In the future: fetch from API
        return null
      },

      refreshThemes: async () => {
        const { loadThemes } = get()
        await loadThemes()
      },

      toggleFavorite: (themeId: string) => {
        set((state) => {
          const isFavorite = state.favoriteThemeIds.includes(themeId)
          const favoriteIds = isFavorite
            ? state.favoriteThemeIds.filter(id => id !== themeId)
            : [...state.favoriteThemeIds, themeId]
          
          return { favoriteThemeIds: favoriteIds }
        })
      },

      addToRecent: (themeId: string) => {
        set((state) => {
          const recentIds = [themeId, ...state.recentThemeIds.filter(id => id !== themeId)].slice(0, 10)
          return { recentThemeIds: recentIds }
        })
      },

      clearRecent: () => {
        set({ recentThemeIds: [] })
      },

      startPreview: (theme: Theme) => {
        const { currentMode } = get()
        
        set({
          previewTheme: theme,
          isPreviewMode: true,
        })
        
        // Apply preview theme to DOM
        applyThemeToDOM(theme, currentMode, true)
      },

      endPreview: () => {
        const { currentTheme, currentMode } = get()
        
        set({
          previewTheme: null,
          isPreviewMode: false,
        })
        
        // Restore current theme
        if (currentTheme) {
          applyThemeToDOM(currentTheme, currentMode)
        }
      },

      applyPreview: () => {
        const { previewTheme } = get()
        
        if (previewTheme) {
          get().setTheme(previewTheme)
          get().endPreview()
        }
      },

      setSearchQuery: (query: string) => {
        set({ searchQuery: query })
      },

      setCategory: (category: ThemeMetadata['category'] | 'all') => {
        set({ selectedCategory: category })
      },

      toggleTag: (tag: string) => {
        set((state) => {
          const isSelected = state.selectedTags.includes(tag)
          const selectedTags = isSelected
            ? state.selectedTags.filter(t => t !== tag)
            : [...state.selectedTags, tag]
          
          return { selectedTags }
        })
      },

      clearFilters: () => {
        set({
          searchQuery: '',
          selectedCategory: 'all',
          selectedTags: [],
        })
      },

      clearCache: () => {
        set({ themeCache: new Map() })
      },

      getCachedTheme: (themeId: string) => {
        const { themeCache } = get()
        return themeCache.get(themeId) || null
      },

      saveToStorage: () => {
        // Zustand persist middleware handles this automatically
      },

      loadFromStorage: () => {
        // Zustand persist middleware handles this automatically
      },
    }),
    {
      name: 'divcoins-theme-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentTheme: state.currentTheme,
        currentMode: state.currentMode,
        favoriteThemeIds: state.favoriteThemeIds,
        recentThemeIds: state.recentThemeIds,
        selectedCategory: state.selectedCategory,
        selectedTags: state.selectedTags,
      }),
    }
  )
)

// Helper function to validate CSS values
function isValidCSSValue(value: string): boolean {
  if (!value || typeof value !== 'string') return false
  // Basic validation for OKLCH values and CSS units
  return /^[\d.%\s\-\/]+$/.test(value) || /^[a-zA-Z\-\s,]+$/.test(value)
}

// Helper function to apply theme to DOM
function applyThemeToDOM(theme: Theme, mode: 'light' | 'dark', isPreview = false) {
  try {
    // Ensure we're in a browser environment
    if (typeof document === 'undefined') return
    if (!document.documentElement) return
    
    const colors = theme.colors[mode]
    if (!colors) return
    
    const root = document.documentElement
    
    // Apply CSS variables with validation
    Object.entries(colors).forEach(([key, value]) => {
      try {
        if (!isValidCSSValue(value)) {
          console.warn(`Invalid CSS value for ${key}:`, value)
          return
        }
        
        const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
        root.style.setProperty(cssVar, `oklch(${value})`)
      } catch (error) {
        console.error(`Error applying CSS variable ${key}:`, error)
      }
    })
    
    // Apply fonts if available
    if (theme.fonts) {
      try {
        if (theme.fonts.heading && isValidCSSValue(theme.fonts.heading)) {
          root.style.setProperty('--font-heading', theme.fonts.heading)
        }
        if (theme.fonts.body && isValidCSSValue(theme.fonts.body)) {
          root.style.setProperty('--font-body', theme.fonts.body)
        }
        if (theme.fonts.mono && isValidCSSValue(theme.fonts.mono)) {
          root.style.setProperty('--font-mono', theme.fonts.mono)
        }
      } catch (error) {
        console.error('Error applying fonts:', error)
      }
    }
    
    // Apply border radius if available
    if (theme.borderRadius) {
      try {
        Object.entries(theme.borderRadius).forEach(([key, value]) => {
          if (isValidCSSValue(value)) {
            root.style.setProperty(`--radius-${key}`, value)
          }
        })
      } catch (error) {
        console.error('Error applying border radius:', error)
      }
    }
    
    // Add custom CSS if available
    if (theme.customCSS && !isPreview) {
      try {
        const existingCustomStyle = document.getElementById('divcoins-custom-theme')
        if (existingCustomStyle) {
          existingCustomStyle.remove()
        }
        
        const styleElement = document.createElement('style')
        styleElement.id = 'divcoins-custom-theme'
        styleElement.textContent = theme.customCSS
        
        if (document.head) {
          document.head.appendChild(styleElement)
        }
      } catch (error) {
        console.error('Error applying custom CSS:', error)
      }
    }
    
    // Add theme class for targeting
    try {
      root.className = root.className.replace(/theme-\w+/g, '')
      root.classList.add(`theme-${theme.metadata.id}`)
      root.classList.toggle('dark', mode === 'dark')
    } catch (error) {
      console.error('Error applying theme classes:', error)
    }
  } catch (error) {
    console.error('Error in applyThemeToDOM:', error)
  }
}

// Note: loadThemes() is called from useTheme hook useEffect to ensure DOM is ready