import { SupabaseTest } from './components/SupabaseTest'
import { ThemeProvider } from './components/ThemeProvider'
import { ThemeToggle } from './components/ThemeToggle'
import { ThemeSelector } from './components/ThemeSelector'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-foreground">
              🚀 DivCoins - Development
            </h1>
            <ThemeToggle />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <ThemeSelector />
            </div>
            <div>
              <SupabaseTest />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
