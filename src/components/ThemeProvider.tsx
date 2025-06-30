import { useEffect } from 'react'
import type { PropsWithChildren } from 'react'
import { useTheme } from '@/hooks/useTheme'

export function ThemeProvider({ children }: PropsWithChildren) {
  const { theme, mode } = useTheme()

  useEffect(() => {
    // Apply theme immediately on mount
    if (theme) {
      const root = document.documentElement
      const colors = theme.colors[mode]
      
      // Apply CSS variables
      Object.entries(colors).forEach(([key, value]) => {
        const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
        root.style.setProperty(cssVar, `oklch(${value})`)
      })
      
      // Apply fonts
      if (theme.fonts) {
        root.style.setProperty('--font-heading', theme.fonts.heading)
        root.style.setProperty('--font-body', theme.fonts.body)
        root.style.setProperty('--font-mono', theme.fonts.mono)
      }
      
      // Apply border radius
      if (theme.borderRadius) {
        Object.entries(theme.borderRadius).forEach(([key, value]) => {
          root.style.setProperty(`--radius-${key}`, value)
        })
      }
      
      // Add theme classes
      root.className = root.className.replace(/theme-\w+/g, '')
      root.classList.add(`theme-${theme.metadata.id}`)
      root.classList.toggle('dark', mode === 'dark')
    }
  }, [theme, mode])

  return <>{children}</>
}