import type { Theme } from '@/types/theme'

// First TweakCN theme integration - Mint Fresh theme
export const mintFreshTheme: Theme = {
  metadata: {
    id: 'tweakcn-mint-fresh',
    name: 'Mint Fresh',
    description: 'A refreshing mint-green theme perfect for financial tracking',
    category: 'nature',
    author: 'TweakCN Community',
    version: '1.0.0',
    source: 'tweakcn',
    previewImage: '/themes/previews/mint-fresh.png',
    tags: ['mint', 'green', 'fresh', 'nature', 'finance'],
    supportsLightMode: true,
    supportsDarkMode: true,
    isAnimated: false,
    downloadCount: 1247,
    rating: 4.8,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-06-20T14:22:00Z',
  },
  colors: {
    light: {
      // Primary colors (Mint-based)
      primary: '69.51% 0.142 164.25',        // mint-500
      primaryForeground: '98.71% 0.009 106.23', // white
      secondary: '86.28% 0.084 166.11',      // mint-200
      secondaryForeground: '22.18% 0.024 171.12', // mint-900
      accent: '77.84% 0.108 165.38',         // mint-400
      accentForeground: '22.18% 0.024 171.12',
      
      // Background colors
      background: '98.71% 0.009 106.23',     // white
      foreground: '22.18% 0.024 171.12',     // mint-900
      muted: '96.89% 0.016 158.18',          // mint-50
      mutedForeground: '51.44% 0.068 166.89', // mint-600
      
      // UI elements
      card: '98.71% 0.009 106.23',           // white
      cardForeground: '22.18% 0.024 171.12', // mint-900
      popover: '98.71% 0.009 106.23',        // white
      popoverForeground: '22.18% 0.024 171.12',
      border: '91.69% 0.052 162.72',         // mint-100
      input: '91.69% 0.052 162.72',          // mint-100
      ring: '69.51% 0.142 164.25',           // mint-500
      
      // Status colors
      destructive: '65.69% 0.249 27.33',     // red-500
      destructiveForeground: '98.71% 0.009 106.23',
      success: '69.80% 0.184 145.97',        // green-500
      successForeground: '98.71% 0.009 106.23',
      warning: '84.26% 0.199 83.87',         // yellow-500
      warningForeground: '98.71% 0.009 106.23',
      
      // Chart colors (mint palette)
      chart1: '69.51% 0.142 164.25',         // mint-500
      chart2: '77.84% 0.108 165.38',         // mint-400
      chart3: '86.28% 0.084 166.11',         // mint-200
      chart4: '60.94% 0.116 163.48',         // mint-600
      chart5: '51.44% 0.068 166.89',         // mint-700
    },
    dark: {
      // Primary colors (Mint-based for dark)
      primary: '77.84% 0.108 165.38',        // mint-400
      primaryForeground: '22.18% 0.024 171.12', // mint-900
      secondary: '35.42% 0.042 169.15',      // mint-800
      secondaryForeground: '86.28% 0.084 166.11', // mint-200
      accent: '69.51% 0.142 164.25',         // mint-500
      accentForeground: '22.18% 0.024 171.12',
      
      // Background colors
      background: '22.18% 0.024 171.12',     // mint-900
      foreground: '96.89% 0.016 158.18',     // mint-50
      muted: '35.42% 0.042 169.15',          // mint-800
      mutedForeground: '77.84% 0.108 165.38', // mint-400
      
      // UI elements
      card: '27.84% 0.032 170.33',           // mint-850
      cardForeground: '96.89% 0.016 158.18', // mint-50
      popover: '27.84% 0.032 170.33',        // mint-850
      popoverForeground: '96.89% 0.016 158.18',
      border: '35.42% 0.042 169.15',         // mint-800
      input: '35.42% 0.042 169.15',          // mint-800
      ring: '77.84% 0.108 165.38',           // mint-400
      
      // Status colors (same as light, work well in dark)
      destructive: '65.69% 0.249 27.33',     // red-500
      destructiveForeground: '96.89% 0.016 158.18',
      success: '69.80% 0.184 145.97',        // green-500
      successForeground: '96.89% 0.016 158.18',
      warning: '84.26% 0.199 83.87',         // yellow-500
      warningForeground: '96.89% 0.016 158.18',
      
      // Chart colors (mint palette for dark)
      chart1: '77.84% 0.108 165.38',         // mint-400
      chart2: '69.51% 0.142 164.25',         // mint-500
      chart3: '86.28% 0.084 166.11',         // mint-200
      chart4: '60.94% 0.116 163.48',         // mint-600
      chart5: '51.44% 0.068 166.89',         // mint-700
    }
  },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
    mono: 'Fira Code, Consolas, monospace',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  }
}