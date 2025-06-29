import type { Config } from 'tailwindcss'

export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ecfccb',   // lime-50
          100: '#d9f99d',  // lime-100
          500: '#84cc16',  // lime-500 (principal)
          600: '#65a30d',  // lime-600
          900: '#365314',  // lime-900
        },
        secondary: {
          black: '#000000',
          gray: { 
            50: '#f9fafb', 
            100: '#f3f4f6', 
            900: '#111827' 
          }
        }
      },
    },
  },
} satisfies Config
