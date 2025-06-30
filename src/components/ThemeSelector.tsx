import { useThemes, useFavoriteThemes, useThemePreview } from '@/hooks/useTheme'

export function ThemeSelector() {
  const { themes, isLoading } = useThemes()
  const { favoriteThemes, isFavorite, toggleFavorite } = useFavoriteThemes()
  const { startPreview, endPreview, applyPreview, isPreviewMode } = useThemePreview()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-card-foreground mb-4">
          🎨 Available Themes ({themes.length})
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {themes.map((theme) => (
            <div
              key={theme.metadata.id}
              className="border border-border rounded-lg p-4 bg-card hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-card-foreground">
                    {theme.metadata.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {theme.metadata.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-muted px-2 py-1 rounded">
                      {theme.metadata.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      by {theme.metadata.author}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => toggleFavorite(theme.metadata.id)}
                  aria-label={
                    isFavorite(theme.metadata.id)
                      ? `Remove ${theme.metadata.name} from favorites`
                      : `Add ${theme.metadata.name} to favorites`
                  }
                  className={`p-1 rounded transition-colors ${
                    isFavorite(theme.metadata.id)
                      ? 'text-warning hover:text-warning/80'
                      : 'text-muted-foreground hover:text-card-foreground'
                  }`}
                >
                  ⭐
                </button>
              </div>

              {/* Color preview */}
              <div className="grid grid-cols-6 gap-1 mb-3">
                {Object.entries(theme.colors.light)
                  .slice(0, 6)
                  .map(([key, value]) => (
                    <div
                      key={key}
                      className="aspect-square rounded"
                      style={{ backgroundColor: `oklch(${value})` }}
                      title={key}
                    />
                  ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {theme.metadata.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-accent/20 text-accent-foreground px-1.5 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onMouseEnter={() => startPreview(theme)}
                  onMouseLeave={() => endPreview()}
                  onClick={() => applyPreview()}
                  aria-label={
                    isPreviewMode 
                      ? `Apply ${theme.metadata.name} theme`
                      : `Preview ${theme.metadata.name} theme`
                  }
                  className="flex-1 bg-primary text-primary-foreground py-2 px-3 rounded text-sm hover:bg-primary/90 transition-colors"
                >
                  {isPreviewMode ? 'Apply' : 'Preview'}
                </button>
                
                <button
                  onClick={() => {
                    // Set theme directly
                    import('@/stores/themeStore').then(({ useThemeStore }) => {
                      useThemeStore.getState().setTheme(theme)
                    })
                  }}
                  aria-label={`Select ${theme.metadata.name} theme`}
                  className="bg-secondary text-secondary-foreground py-2 px-3 rounded text-sm hover:bg-secondary/90 transition-colors"
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {favoriteThemes.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            ⭐ Favorite Themes ({favoriteThemes.length})
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {favoriteThemes.map((theme) => (
              <button
                key={theme.metadata.id}
                onClick={() => {
                  import('@/stores/themeStore').then(({ useThemeStore }) => {
                    useThemeStore.getState().setTheme(theme)
                  })
                }}
                aria-label={`Apply favorite theme: ${theme.metadata.name}`}
                className="flex items-center gap-2 bg-card border border-border rounded-lg p-3 hover:shadow-md transition-shadow"
              >
                <div className="w-4 h-4 rounded" style={{ backgroundColor: `oklch(${theme.colors.light.primary})` }} />
                <span className="text-sm font-medium text-card-foreground">
                  {theme.metadata.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}