import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'

const availableFonts = [
  // Sans-Serif Bundle (10 fonts)
  { name: 'Inter', value: 'Inter, sans-serif', category: 'Sans-serif', cssClass: 'font-button-inter' },
  { name: 'Roboto', value: 'Roboto, sans-serif', category: 'Sans-serif', cssClass: 'font-button-roboto' },
  { name: 'Open Sans', value: 'Open Sans, sans-serif', category: 'Sans-serif', cssClass: 'font-button-opensans' },
  { name: 'Lato', value: 'Lato, sans-serif', category: 'Sans-serif', cssClass: 'font-button-lato' },
  { name: 'Montserrat', value: 'Montserrat, sans-serif', category: 'Sans-serif', cssClass: 'font-button-montserrat' },
  { name: 'Poppins', value: 'Poppins, sans-serif', category: 'Sans-serif', cssClass: 'font-button-poppins' },
  { name: 'Source Sans 3', value: 'Source Sans 3, sans-serif', category: 'Sans-serif', cssClass: 'font-button-sourcesans3' },
  { name: 'Raleway', value: 'Raleway, sans-serif', category: 'Sans-serif', cssClass: 'font-button-raleway' },
  { name: 'Ubuntu', value: 'Ubuntu, sans-serif', category: 'Sans-serif', cssClass: 'font-button-ubuntu' },
  { name: 'Nunito', value: 'Nunito, sans-serif', category: 'Sans-serif', cssClass: 'font-button-nunito' },
  
  // Serif Bundle (5 fonts)
  { name: 'Playfair Display', value: 'Playfair Display, serif', category: 'Serif', cssClass: 'font-button-playfairdisplay' },
  { name: 'Merriweather', value: 'Merriweather, serif', category: 'Serif', cssClass: 'font-button-merriweather' },
  { name: 'Crimson Text', value: 'Crimson Text, serif', category: 'Serif', cssClass: 'font-button-crimsontext' },
  { name: 'Lora', value: 'Lora, serif', category: 'Serif', cssClass: 'font-button-lora' },
  { name: 'Libre Baskerville', value: 'Libre Baskerville, serif', category: 'Serif', cssClass: 'font-button-librebaskerville' },
  
  // Monospace Bundle (6 fonts)
  { name: 'Fira Code', value: 'Fira Code, monospace', category: 'Monospace', cssClass: 'font-button-firacode' },
  { name: 'Source Code Pro', value: 'Source Code Pro, monospace', category: 'Monospace', cssClass: 'font-button-sourcecodepro' },
  { name: 'JetBrains Mono', value: 'JetBrains Mono, monospace', category: 'Monospace', cssClass: 'font-button-jetbrainsmono' },
  { name: 'Inconsolata', value: 'Inconsolata, monospace', category: 'Monospace', cssClass: 'font-button-inconsolata' },
  { name: 'Roboto Mono', value: 'Roboto Mono, monospace', category: 'Monospace', cssClass: 'font-button-robotomono' },
  { name: 'Space Mono', value: 'Space Mono, monospace', category: 'Monospace', cssClass: 'font-button-spacemono' },
  
  // Display/Decorative Bundle (8 fonts)
  { name: 'Oswald', value: 'Oswald, sans-serif', category: 'Display', cssClass: 'font-button-oswald' },
  { name: 'Dancing Script', value: 'Dancing Script, cursive', category: 'Display', cssClass: 'font-button-dancingscript' },
  { name: 'Pacifico', value: 'Pacifico, cursive', category: 'Display', cssClass: 'font-button-pacifico' },
  { name: 'Bebas Neue', value: 'Bebas Neue, cursive', category: 'Display', cssClass: 'font-button-bebasneue' },
  { name: 'Righteous', value: 'Righteous, cursive', category: 'Display', cssClass: 'font-button-righteous' },
  { name: 'Fredoka', value: 'Fredoka, sans-serif', category: 'Display', cssClass: 'font-button-fredoka' },
  { name: 'Comfortaa', value: 'Comfortaa, cursive', category: 'Display', cssClass: 'font-button-comfortaa' },
  { name: 'Quicksand', value: 'Quicksand, sans-serif', category: 'Display', cssClass: 'font-button-quicksand' },
  
  // Retro/Gaming Bundle (4 fonts)
  { name: 'VT323', value: 'VT323, monospace', category: 'Retro', cssClass: 'font-button-vt323' },
  { name: 'Orbitron', value: 'Orbitron, sans-serif', category: 'Retro', cssClass: 'font-button-orbitron' },
  { name: 'Press Start 2P', value: 'Press Start 2P, cursive', category: 'Retro', cssClass: 'font-button-pressstart2p' },
  { name: 'Audiowide', value: 'Audiowide, cursive', category: 'Retro', cssClass: 'font-button-audiowide' },
]

export function FontTester() {
  const [selectedFont, setSelectedFont] = useState('Inter, sans-serif')

  const applyFont = (fontValue: string) => {
    setSelectedFont(fontValue)
    
    // Apply to CSS variables
    document.documentElement.style.setProperty('--font-sans', fontValue)
    
    // If it's a monospace font, also apply to mono
    if (fontValue.includes('monospace')) {
      document.documentElement.style.setProperty('--font-mono', fontValue)
    }
  }

  const resetFonts = () => {
    // Reset to theme defaults
    const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    
    if (theme === 'dark') {
      document.documentElement.style.setProperty('--font-sans', 'Source Code Pro, monospace')
      document.documentElement.style.setProperty('--font-serif', 'Source Code Pro, monospace')
      document.documentElement.style.setProperty('--font-mono', 'Source Code Pro, monospace')
    } else {
      document.documentElement.style.setProperty('--font-sans', 'Courier New, monospace')
      document.documentElement.style.setProperty('--font-serif', 'Courier New, monospace')
      document.documentElement.style.setProperty('--font-mono', 'Courier New, monospace')
    }
  }

  const copyCSS = () => {
    const cssCode = `
/* Paste this in your CSS theme */
:root {
  --font-sans: ${selectedFont};
  --font-serif: ${selectedFont};
  --font-mono: ${selectedFont.includes('monospace') ? selectedFont : 'monospace'};
}

.dark {
  --font-sans: ${selectedFont};
  --font-serif: ${selectedFont};
  --font-mono: ${selectedFont.includes('monospace') ? selectedFont : 'monospace'};
}`

    navigator.clipboard.writeText(cssCode)
    alert('CSS copied to clipboard!')
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>🔤 Font Tester</CardTitle>
        <CardDescription>
          Prueba fuentes en tiempo real y copia el CSS para tu tema
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Font Preview */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Vista Previa</h3>
          <div 
            className="p-6 border rounded-lg bg-muted/50"
            style={{ fontFamily: selectedFont }}
          >
            <h1 className="text-2xl font-bold mb-2">DivCoins Dashboard</h1>
            <p className="text-base mb-2">
              This is how your interface will look with {selectedFont.split(',')[0]} font.
            </p>
            <p className="text-sm text-muted-foreground">
              Números: 1234567890 • Símbolos: @#$%&*()
            </p>
          </div>
        </div>

        {/* Font Selection by Category */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">📚 Fuentes por Categoría</h3>
          
          {/* Group fonts by category */}
          {['Sans-serif', 'Serif', 'Monospace', 'Display', 'Retro'].map(category => {
            const categoryFonts = availableFonts.filter(font => font.category === category)
            const categoryEmojis = {
              'Sans-serif': '📝',
              'Serif': '📚', 
              'Monospace': '💻',
              'Display': '🎨',
              'Retro': '🕹️'
            }
            
            return (
              <div key={category} className="space-y-2">
                <h4 className="font-medium text-primary flex items-center gap-2">
                  {categoryEmojis[category as keyof typeof categoryEmojis]} {category} 
                  <span className="text-xs text-muted-foreground">({categoryFonts.length} fuentes)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {categoryFonts.map((font) => (
                    <Button
                      key={font.value}
                      variant={selectedFont === font.value ? "default" : "outline"}
                      className="justify-start h-auto p-2 text-left"
                      onClick={() => applyFont(font.value)}
                    >
                      <div className="w-full">
                        <span className={`font-medium text-sm ${font.cssClass}`}>
                          {font.name}
                        </span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button onClick={copyCSS} className="flex-1">
            📋 Copiar CSS
          </Button>
          <Button variant="outline" onClick={resetFonts}>
            🔄 Reset
          </Button>
        </div>

        {/* Instructions */}
        <div className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
          <p className="font-medium mb-2">💡 Cómo usar:</p>
          <ol className="space-y-1">
            <li>1. Selecciona una fuente de la lista</li>
            <li>2. Ve la vista previa en tiempo real</li>
            <li>3. Haz clic en "Copiar CSS"</li>
            <li>4. Pega el código en tu archivo CSS</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}