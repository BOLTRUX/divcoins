import { useEffect, useMemo, useCallback } from 'react'
import { useThemeStore } from '@/stores/themeStore'
import type { Theme, ThemeMetadata } from '@/types/theme'

// Main theme hook
export function useTheme() {
  const {
    currentTheme,
    currentMode,
    isLoading,
    error,
    setTheme,
    setMode,
    toggleMode,
    loadThemes,
  } = useThemeStore()

  // Stable loadThemes reference
  const stableLoadThemes = useCallback(() => {
    loadThemes()
  }, [loadThemes])

  // Load themes on mount (only once)
  useEffect(() => {
    stableLoadThemes()
  }, [stableLoadThemes])

  // Memoize return object to prevent unnecessary re-renders
  return useMemo(() => ({
    theme: currentTheme,
    mode: currentMode,
    isLoading,
    error,
    setTheme,
    setMode,
    toggleMode,
    refreshThemes: loadThemes,
  }), [currentTheme, currentMode, isLoading, error, setTheme, setMode, toggleMode, loadThemes])
}

// Theme collection hook
export function useThemes() {
  const {
    availableThemes,
    searchQuery,
    selectedCategory,
    selectedTags,
    isLoading,
    error,
    setSearchQuery,
    setCategory,
    toggleTag,
    clearFilters,
    loadThemes,
  } = useThemeStore()

  // Filter themes based on search and filters
  const filteredThemes = availableThemes.filter((theme) => {
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesName = theme.metadata.name.toLowerCase().includes(query)
      const matchesDescription = theme.metadata.description.toLowerCase().includes(query)
      const matchesTags = theme.metadata.tags.some(tag => tag.toLowerCase().includes(query))
      const matchesAuthor = theme.metadata.author.toLowerCase().includes(query)
      
      if (!matchesName && !matchesDescription && !matchesTags && !matchesAuthor) {
        return false
      }
    }

    // Category filter
    if (selectedCategory !== 'all' && theme.metadata.category !== selectedCategory) {
      return false
    }

    // Tags filter
    if (selectedTags.length > 0) {
      const hasAllTags = selectedTags.every(tag => 
        theme.metadata.tags.includes(tag)
      )
      if (!hasAllTags) {
        return false
      }
    }

    return true
  })

  // Get available categories from themes
  const availableCategories = Array.from(
    new Set(availableThemes.map(theme => theme.metadata.category))
  )

  // Get available tags from themes
  const availableTags = Array.from(
    new Set(availableThemes.flatMap(theme => theme.metadata.tags))
  ).sort()

  return {
    themes: filteredThemes,
    allThemes: availableThemes,
    availableCategories,
    availableTags,
    searchQuery,
    selectedCategory,
    selectedTags,
    isLoading,
    error,
    setSearchQuery,
    setCategory,
    toggleTag,
    clearFilters,
    refreshThemes: loadThemes,
    totalCount: availableThemes.length,
    filteredCount: filteredThemes.length,
  }
}

// Favorites hook
export function useFavoriteThemes() {
  const {
    availableThemes,
    favoriteThemeIds,
    toggleFavorite,
  } = useThemeStore()

  const favoriteThemes = availableThemes.filter(theme =>
    favoriteThemeIds.includes(theme.metadata.id)
  )

  const isFavorite = (themeId: string) => favoriteThemeIds.includes(themeId)

  return {
    favoriteThemes,
    favoriteThemeIds,
    isFavorite,
    toggleFavorite,
    count: favoriteThemes.length,
  }
}

// Recent themes hook
export function useRecentThemes() {
  const {
    availableThemes,
    recentThemeIds,
    addToRecent,
    clearRecent,
  } = useThemeStore()

  const recentThemes = recentThemeIds
    .map(id => availableThemes.find(theme => theme.metadata.id === id))
    .filter((theme): theme is Theme => theme !== undefined)

  return {
    recentThemes,
    recentThemeIds,
    addToRecent,
    clearRecent,
    count: recentThemes.length,
  }
}

// Preview hook
export function useThemePreview() {
  const {
    previewTheme,
    isPreviewMode,
    startPreview,
    endPreview,
    applyPreview,
  } = useThemeStore()

  return {
    previewTheme,
    isPreviewMode,
    startPreview,
    endPreview,
    applyPreview,
  }
}

// Performance hook for theme metrics
export function useThemePerformance() {
  const { themeCache, lastUpdated, clearCache } = useThemeStore()

  const cacheSize = themeCache.size
  const cacheMemoryUsage = JSON.stringify([...themeCache.entries()]).length

  return {
    cacheSize,
    cacheMemoryUsage,
    lastUpdated,
    clearCache,
  }
}

// Theme validation hook
export function useThemeValidation() {
  const validateTheme = (theme: Theme) => {
    const errors: string[] = []
    const warnings: string[] = []

    // Validate metadata
    if (!theme.metadata.name.trim()) {
      errors.push('Theme name is required')
    }
    if (!theme.metadata.description.trim()) {
      warnings.push('Theme description is recommended')
    }
    if (!theme.metadata.author.trim()) {
      warnings.push('Theme author is recommended')
    }

    // Validate colors
    const requiredColors = [
      'primary', 'primaryForeground', 'secondary', 'secondaryForeground',
      'background', 'foreground', 'card', 'cardForeground'
    ]

    for (const mode of ['light', 'dark'] as const) {
      for (const colorKey of requiredColors) {
        const color = theme.colors[mode][colorKey as keyof typeof theme.colors.light]
        if (!color || typeof color !== 'string') {
          errors.push(`Missing ${colorKey} color for ${mode} mode`)
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    }
  }

  return { validateTheme }
}

// System theme detection hook
export function useSystemTheme() {
  const { setMode } = useThemeStore()

  useEffect(() => {
    // Ensure we're in a browser environment
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      setMode(e.matches ? 'dark' : 'light')
    }

    // Set initial theme based on system preference
    setMode(mediaQuery.matches ? 'dark' : 'light')

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [setMode])

  return {
    systemPrefersDark: typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false,
  }
}

// Theme categories helper
export function useThemeCategories() {
  const categoryInfo: Record<ThemeMetadata['category'], { name: string; description: string; icon: string }> = {
    default: {
      name: 'Default',
      description: 'Built-in themes from DivCoins',
      icon: '🎨'
    },
    nature: {
      name: 'Nature',
      description: 'Earth tones and natural colors',
      icon: '🌿'
    },
    dark: {
      name: 'Dark',
      description: 'Dark themes for low-light environments',
      icon: '🌙'
    },
    colorful: {
      name: 'Colorful',
      description: 'Vibrant and bold color schemes',
      icon: '🌈'
    },
    minimal: {
      name: 'Minimal',
      description: 'Clean and simple designs',
      icon: '⚪'
    },
    premium: {
      name: 'Premium',
      description: 'Exclusive themes for premium users',
      icon: '💎'
    }
  }

  return { categoryInfo }
}