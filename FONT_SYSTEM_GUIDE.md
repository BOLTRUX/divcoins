# 🎨 Font System - Plug and Play Guide

## ✅ Sistema Arreglado
El sistema de fuentes ahora funciona correctamente con el enfoque "plug and play". Cuando cambias las variables CSS de fuentes, se aplican automáticamente a toda la interfaz.

## 🔧 Cómo Cambiar Fuentes

### Paso 1: Identifica las variables de fuente
En `src/index.css`, busca estas líneas:

```css
:root {
  --font-sans: Courier New, monospace;
  --font-serif: Courier New, monospace;
  --font-mono: Courier New, monospace;
}

.dark {
  --font-sans: Source Code Pro, monospace;
  --font-serif: Source Code Pro, monospace;
  --font-mono: Source Code Pro, monospace;
}
```

### Paso 2: Reemplaza con tus fuentes favoritas

**Ejemplo 1: Google Fonts**
```css
:root {
  --font-sans: "Inter", "Segoe UI", sans-serif;
  --font-serif: "Merriweather", Georgia, serif;
  --font-mono: "JetBrains Mono", "Fira Code", monospace;
}
```

**Ejemplo 2: Sistema de fuentes moderno**
```css
:root {
  --font-sans: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
  --font-serif: "New York", "Times New Roman", serif;
  --font-mono: "SF Mono", "Monaco", monospace;
}
```

**Ejemplo 3: Fuentes clásicas**
```css
:root {
  --font-sans: "Helvetica Neue", Arial, sans-serif;
  --font-serif: "Times New Roman", Times, serif;
  --font-mono: "Courier New", Courier, monospace;
}
```

### Paso 3: ¡Listo!
Las fuentes se aplican automáticamente sin reiniciar el servidor.

## 📍 Dónde se Aplican las Fuentes

- **`--font-sans`**: Texto principal, botones, navegación, headings
- **`--font-serif`**: Texto decorativo cuando uses `font-serif`
- **`--font-mono`**: Código, inputs de tipo código, texto monoespaciado

## 🔄 Mapping de Variables CSS → Tailwind

| Variable CSS | Clase Tailwind | Uso |
|-------------|---------------|-----|
| `--font-sans` | `font-sans` | Texto principal por defecto |
| `--font-serif` | `font-serif` | Texto decorativo/elegante |
| `--font-mono` | `font-mono` | Código y datos técnicos |

## 🎯 Ejemplos de Temas Completos

### Tema Moderno
```css
:root {
  --font-sans: "Inter", sans-serif;
  --font-serif: "Crimson Text", serif;
  --font-mono: "JetBrains Mono", monospace;
}
```

### Tema Clásico
```css
:root {
  --font-sans: "Helvetica Neue", sans-serif;
  --font-serif: "Georgia", serif;
  --font-mono: "Menlo", monospace;
}
```

### Tema Tech
```css
:root {
  --font-sans: "Roboto", sans-serif;
  --font-serif: "Roboto Slab", serif;
  --font-mono: "Fira Code", monospace;
}
```

## 🔍 Verificar que Funciona

1. Ve al **Theme System Test** en la aplicación
2. En la sección **Font Test** verás:
   - Las 3 fuentes en acción
   - Los valores actuales de las variables CSS
   - Instrucciones de uso

## ⚡ Características del Sistema

✅ **Plug and Play** - Solo cambias CSS, no código  
✅ **Tiempo Real** - Cambios se ven inmediatamente  
✅ **Fallbacks** - Si la fuente no carga, usa alternativas  
✅ **Responsive** - Funciona en todos los dispositivos  
✅ **Compatible** - Funciona con cualquier fuente web  

## 🚨 Notas Importantes

1. **Google Fonts**: Si usas Google Fonts, agrégalas al `<head>` del HTML
2. **Formato**: Usa comillas para nombres con espacios: `"Times New Roman"`
3. **Fallbacks**: Siempre incluye fallbacks: `"Inter", sans-serif`
4. **Performance**: Las fuentes del sistema cargan más rápido

¡El sistema de fuentes está completamente funcional y listo para personalizar! 🎉