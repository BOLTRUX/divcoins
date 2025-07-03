import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useEffect, useState } from 'react'

export function ThemeTest() {
  const [fontSans, setFontSans] = useState('')
  const [fontSerif, setFontSerif] = useState('')
  const [fontMono, setFontMono] = useState('')

  useEffect(() => {
    const updateFonts = () => {
      setFontSans(getComputedStyle(document.documentElement).getPropertyValue('--font-sans'))
      setFontSerif(getComputedStyle(document.documentElement).getPropertyValue('--font-serif'))
      setFontMono(getComputedStyle(document.documentElement).getPropertyValue('--font-mono'))
    }
    
    updateFonts()
    // Update fonts when theme changes
    const interval = setInterval(updateFonts, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Theme System Test</h1>
        
        {/* Color Palette Test */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Color Palette Test</CardTitle>
            <CardDescription>Testing all theme colors and their variations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-primary text-primary-foreground p-4 rounded-lg">Primary</div>
              <div className="bg-secondary text-secondary-foreground p-4 rounded-lg">Secondary</div>
              <div className="bg-accent text-accent-foreground p-4 rounded-lg">Accent</div>
              <div className="bg-muted text-muted-foreground p-4 rounded-lg">Muted</div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-card text-card-foreground p-4 rounded-lg border">Card</div>
              <div className="bg-popover text-popover-foreground p-4 rounded-lg border">Popover</div>
              <div className="bg-destructive text-destructive-foreground p-4 rounded-lg">Destructive</div>
            </div>
          </CardContent>
        </Card>

        {/* Button Variants Test */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Button Variants Test</CardTitle>
            <CardDescription>Testing different button styles and sizes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">🎨</Button>
            </div>
          </CardContent>
        </Card>

        {/* Border Radius Test */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Border Radius Test</CardTitle>
            <CardDescription>Testing custom radius values (--radius: 0.125rem)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-primary text-primary-foreground p-4 rounded-sm">rounded-sm</div>
              <div className="bg-secondary text-secondary-foreground p-4 rounded-md">rounded-md</div>
              <div className="bg-accent text-accent-foreground p-4 rounded-lg">rounded-lg</div>
              <div className="bg-muted text-muted-foreground p-4 rounded-xl">rounded-xl</div>
            </div>
          </CardContent>
        </Card>

        {/* Font Test */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Font Test</CardTitle>
            <CardDescription>Testing custom fonts from CSS variables</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Font Sans (--font-sans):</p>
                <p className="font-sans text-lg">The quick brown fox jumps over the lazy dog</p>
                <p className="text-xs text-muted-foreground">Current: {fontSans || 'Not loaded'}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Font Serif (--font-serif):</p>
                <p className="font-serif text-lg">The quick brown fox jumps over the lazy dog</p>
                <p className="text-xs text-muted-foreground">Current: {fontSerif || 'Not loaded'}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Font Mono (--font-mono):</p>
                <p className="font-mono text-lg">The quick brown fox jumps over the lazy dog</p>
                <p className="text-xs text-muted-foreground">Current: {fontMono || 'Not loaded'}</p>
              </div>
              
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">How to test font changes:</p>
                <ol className="text-sm space-y-1">
                  <li>1. Change <code className="bg-background px-1 rounded">--font-sans</code> in CSS</li>
                  <li>2. Use any Google Font or system font name</li>
                  <li>3. Example: <code className="bg-background px-1 rounded">"Inter", sans-serif</code></li>
                  <li>4. Fonts apply automatically to all text</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shadow Test */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Shadow Test</CardTitle>
            <CardDescription>Testing custom shadow values</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-card text-card-foreground p-4 rounded-lg shadow-2xs">shadow-2xs</div>
              <div className="bg-card text-card-foreground p-4 rounded-lg shadow-xs">shadow-xs</div>
              <div className="bg-card text-card-foreground p-4 rounded-lg shadow-sm">shadow-sm</div>
              <div className="bg-card text-card-foreground p-4 rounded-lg shadow">shadow</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-card text-card-foreground p-4 rounded-lg shadow-md">shadow-md</div>
              <div className="bg-card text-card-foreground p-4 rounded-lg shadow-lg">shadow-lg</div>
              <div className="bg-card text-card-foreground p-4 rounded-lg shadow-xl">shadow-xl</div>
            </div>
          </CardContent>
        </Card>

        {/* Form Elements Test */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Form Elements Test</CardTitle>
            <CardDescription>Testing input fields and form styling</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="test-input">Test Input Field</Label>
              <Input id="test-input" placeholder="Enter some text..." />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="test-input-2">Another Input</Label>
              <Input id="test-input-2" value="Filled input" readOnly />
            </div>
          </CardContent>
        </Card>

        {/* Sidebar Colors Test */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Sidebar Colors Test</CardTitle>
            <CardDescription>Testing sidebar-specific color variables</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-sidebar text-sidebar-foreground p-4 rounded-lg border-sidebar-border border">Sidebar</div>
              <div className="bg-sidebar-primary text-sidebar-primary-foreground p-4 rounded-lg">Sidebar Primary</div>
              <div className="bg-sidebar-accent text-sidebar-accent-foreground p-4 rounded-lg">Sidebar Accent</div>
            </div>
          </CardContent>
        </Card>

        {/* Theme Toggle Info */}
        <Card>
          <CardHeader>
            <CardTitle>Theme Toggle</CardTitle>
            <CardDescription>Click the button in the top-right corner to toggle between light and dark modes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The theme toggle is positioned fixed in the top-right corner. 
              Try switching between light and dark modes to see all the color changes!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}