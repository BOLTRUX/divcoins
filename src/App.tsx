import { SupabaseTest } from './components/SupabaseTest'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          🚀 DivCoins - Development
        </h1>
        <SupabaseTest />
      </div>
    </div>
  )
}

export default App
