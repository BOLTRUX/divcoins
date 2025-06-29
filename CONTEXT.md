# 📋 CONTEXT.md - DOCUMENTACIÓN COMPLETA DE DIVCOINS v2.0

## 📑 ÍNDICE
1. [VISIÓN DEL PROYECTO](#-visión-del-proyecto)
2. [INFORMACIÓN GENERAL](#-información-general)
3. [STACK TECNOLÓGICO](#-stack-tecnológico)
4. [ARQUITECTURA DE TEMAS ESCALABLE](#-arquitectura-de-temas-escalable)
5. [ESTRUCTURA DEL PROYECTO](#-estructura-del-proyecto)
6. [BASE DE DATOS](#-base-de-datos)
7. [MÓDULOS Y FUNCIONALIDADES](#-módulos-y-funcionalidades)
8. [WORKFLOW DE DESARROLLO PROFESIONAL](#-workflow-de-desarrollo-profesional)
9. [DISEÑO Y UX/UI](#-diseño-y-uxui)
10. [REGLAS DE DESARROLLO](#-reglas-de-desarrollo)
11. [SEGURIDAD Y PRIVACIDAD](#-seguridad-y-privacidad)
12. [OPTIMIZACIÓN Y RENDIMIENTO](#-optimización-y-rendimiento)
13. [ROADMAP DE DESARROLLO](#-roadmap-de-desarrollo)
14. [MÉTRICAS DE ÉXITO](#-métricas-de-éxito)
15. [INSTRUCCIONES PARA EL LLM](#-instrucciones-para-el-llm)

---

## 🎯 VISIÓN DEL PROYECTO

**DivCoins** es una red social de finanzas compartidas de próxima generación que combina:
- **Gestión inteligente** de gastos compartidos
- **Sistema de personalización visual** más avanzado del mercado fintech
- **Arquitectura escalable** y profesional
- **Integración nativa con TweakCN** para miles de temas

### 🚀 DIFERENCIACIÓN CLAVE
- **Primera app de finanzas** con +1000 opciones de personalización
- **Integración nativa** con TweakCN theme ecosystem
- **Arquitectura preparada** para escalabilidad masiva
- **Sistema de desarrollo profesional** con CI/CD

### 🎪 CONCEPTO CORE
"Instagram para finanzas compartidas con personalización ilimitada"

---

## 📊 INFORMACIÓN GENERAL

### 🏢 Empresa
- **Nombre**: Boltrux Technologies
- **Producto**: DivCoins
- **Mercado**: Fintech Social + Personalización Visual

### 📱 Tipo de Aplicación
Red social de gastos y pagos que permite a usuarios (parejas, roommates, amigos, familia) gestionar gastos compartidos y personales de manera inteligente, social y **altamente personalizable**.

---

## 🛠️ STACK TECNOLÓGICO

### 🎨 Frontend Core
- **React 18** + **TypeScript** + **Vite**
- **Estado Global**: Zustand con stores específicos
- **UI/Estilos**: TailwindCSS + Shadcn/ui + **TweakCN Integration**
- **Temas**: Sistema escalable con soporte OKLCH
- **Animaciones**: Framer Motion
- **Iconografía**: Lucide React

### 🔧 Backend & Servicios
- **Backend**: Supabase (Auth + PostgreSQL + Storage)
- **Internacionalización**: i18next
- **Notificaciones**: react-hot-toast

### 🚀 Desarrollo & Deploy
- **Control de Versiones**: Git + GitHub con workflows profesionales
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel con deploy automático
- **Testing**: Jest + React Testing Library

---

## 🎨 ARQUITECTURA DE TEMAS ESCALABLE

### 🌟 FILOSOFÍA DE PERSONALIZACIÓN
- **Personalización masiva** como ventaja competitiva
- **Integración nativa** con TweakCN (https://tweakcn.com)
- **Sistema preparado** para +1000 temas
- **Performance optimizado** para carga dinámica

### 📁 ESTRUCTURA DE TEMAS
```
src/
├── styles/
│   ├── themes/
│   │   ├── base.css                    # Variables base shadcn/ui
│   │   ├── tweakcn-themes/            # Temas de TweakCN
│   │   │   ├── theme-01-mint-fresh.css
│   │   │   ├── theme-02-cosmic-dark.css
│   │   │   ├── theme-03-sunset-vibes.css
│   │   │   └── [preparado para +1000 temas]
│   │   └── themes.css                 # Orquestador principal
├── stores/
│   └── themeStore.ts                  # Store escalable Zustand
├── components/
│   └── theme/
│       ├── ThemeSelector.tsx          # Selector visual avanzado
│       ├── ThemePreview.tsx           # Preview en tiempo real
│       ├── ThemeProvider.tsx          # Context provider
│       └── ThemeGrid.tsx              # Grid de selección
└── data/
    └── themes-config.ts               # Metadata de temas
```

### 🎯 FORMATO DE TEMAS TWEAKCN
```typescript
interface TweakCNTheme {
  id: string;
  name: string;
  category: 'light' | 'dark' | 'vibrant' | 'brand' | 'seasonal';
  cssVariables: Record<string, string>; // Variables OKLCH
  sourceCode: string;                   // CSS completo de TweakCN
  preview?: string;                     // URL de preview
  tags: string[];                       // Tags para filtrado
  author?: string;                      // Autor del tema
  downloads?: number;                   // Popularidad
}
```

### 🌈 COLORES SOPORTADOS
- **OKLCH nativo** (mejor que HSL/RGB)
- **CSS Variables dinámicas** para cambio instantáneo
- **Soporte completo** dark/light mode automático
- **Transiciones suaves** entre temas
- **Compatibilidad total** con shadcn/ui

### ⚡ SISTEMA DE CARGA OPTIMIZADO
```typescript
// Carga lazy de temas para performance
const themeLoader = {
  loadTheme: async (themeId: string) => {
    return import(`../styles/tweakcn-themes/${themeId}.css`);
  },
  preloadPopular: () => {}, // Pre-cargar los 10 más populares
  cachingStrategy: 'stale-while-revalidate'
};
```

---

## 🏗️ ESTRUCTURA DEL PROYECTO

### 📂 Estructura de Carpetas Obligatoria
```
src/
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── theme/                 # 🆕 Sistema de temas
│   ├── layout/
│   ├── auth/
│   ├── dashboard/
│   ├── expenses/
│   ├── relationships/
│   ├── inventory/
│   ├── debts/
│   └── reports/
├── stores/                    # Zustand stores
│   ├── authStore.ts
│   ├── relationshipStore.ts
│   ├── expenseStore.ts
│   ├── inventoryStore.ts
│   ├── debtStore.ts
│   ├── themeStore.ts          # 🆕 Store de temas
│   └── appSettingsStore.ts
├── styles/                    # 🆕 Sistema de estilos escalable
│   ├── themes/
│   └── globals.css
├── services/
├── utils/
├── hooks/
├── types/
├── lib/
└── pages/
```

---

## 💾 BASE DE DATOS

### 🗄️ Tablas Principales (Supabase PostgreSQL)

#### Usuarios
```sql
users (
  id, 
  email, 
  name, 
  avatar_url, 
  theme_preferences,  -- 🆕 Preferencias de tema
  created_at, 
  updated_at, 
  settings
)
```

#### Relaciones entre usuarios
```sql
relationships (
  id, 
  name, 
  type, -- 'couple', 'roommates', 'friends', 'family', 'other'
  created_by, 
  theme_id,  -- 🆕 Tema compartido del grupo
  settings, 
  created_at, 
  updated_at
)
```

#### Miembros de relaciones
```sql
relationship_members (
  id, 
  relationship_id, 
  user_id, 
  role, -- 'admin', 'member', 'viewer' (solo para family)
  personal_theme_override,  -- 🆕 Override de tema personal
  joined_at
)
```

*[Resto de tablas mantienen la estructura original...]*

---

## 🎪 MÓDULOS Y FUNCIONALIDADES

### 🆕 MÓDULO DE PERSONALIZACIÓN (NUEVO)

#### 🎨 Funcionalidades Core
- **Selector visual** de temas con categorías
- **Preview en tiempo real** sin aplicar
- **Sistema de favoritos** personal
- **Búsqueda y filtros** avanzados
- **Import/Export** de configuraciones
- **Temas personalizados** (roadmap futuro)

#### 🔗 Integración con TweakCN
- **Catálogo masivo** de temas profesionales
- **Actualización automática** de nuevos temas
- **Compatibilidad total** con shadcn/ui
- **Performance optimizada** para carga dinámica

#### 🎭 UX Diferenciadora
- **Primera app de finanzas** con personalización masiva
- **Experiencia visual única** por usuario
- **Engagement aumentado** por personalización
- **Ventaja competitiva** en mercado fintech

### 🔐 MÓDULO 1: AUTENTICACIÓN
*[Mantiene funcionalidades originales...]*

### 👥 MÓDULO 2: SISTEMA DE RELACIONES
*[Mantiene funcionalidades originales con mejoras de temas...]*

### 📊 MÓDULO 3: DASHBOARD
*[Mantiene funcionalidades originales con temas aplicados...]*

### 💰 MÓDULO 4: GASTOS INTELIGENTE
*[Mantiene funcionalidades originales...]*

### 📦 MÓDULO 5: INVENTARIO
*[Mantiene funcionalidades originales...]*

### 💸 MÓDULO 6: DEUDAS Y LIQUIDACIONES
*[Mantiene funcionalidades originales...]*

### 💵 MÓDULO 7: PRESUPUESTOS
*[Mantiene funcionalidades originales...]*

### 📈 MÓDULO 8: REPORTES Y ANÁLISIS
*[Mantiene funcionalidades originales...]*

---

## 🔄 WORKFLOW DE DESARROLLO PROFESIONAL

### 🌳 GIT STRATEGY
```
main              # Producción (protegido)
├── develop       # Desarrollo principal  
├── feature/*     # Nuevas funcionalidades
├── fix/*         # Correcciones
└── hotfix/*      # Urgencias
```

### 📝 CONVENTIONAL COMMITS
```bash
feat: nueva funcionalidad
fix: corrección de bug
docs: documentación
style: formato/temas
refactor: refactorización
perf: optimización
theme: cambios de temas/personalización  # 🆕
```

### 🚀 CI/CD PIPELINE
- **GitHub Actions** para testing automático
- **Deploy automático** a Vercel desde main
- **Preview deployments** para PRs
- **Linting y type-checking** automático
- **Theme validation** automática  # 🆕

### 🛠️ SCRIPTS DE DESARROLLO
```bash
npm run dev              # Desarrollo local
npm run commit:feat     # Commit de feature
npm run commit:fix      # Commit de fix
npm run commit:theme    # 🆕 Commit de tema
npm run push:feature    # Push branch actual
npm run theme:add       # 🆕 Agregar nuevo tema de TweakCN
npm run theme:validate  # 🆕 Validar temas
npm run release         # Crear nueva versión
```

---

## 🎨 DISEÑO Y UX/UI

### 🌈 Sistema de Colores Avanzado
```typescript
// Base colors (mantenidos para compatibilidad)
const baseColors = {
  primary: {
    50: '#ecfccb',      // lime-50
    100: '#d9f99d',     // lime-100
    500: '#84cc16',     // lime-500 (principal)
    600: '#65a30d',     // lime-600
    900: '#365314',     // lime-900
  },
  secondary: {
    black: '#000000',
    gray: { 50: '#f9fafb', 100: '#f3f4f6', 900: '#111827' }
  }
}

// 🆕 Sistema de colores dinámico con OKLCH
const dynamicColors = {
  getCurrentThemeColors: () => ThemeStore.currentTheme?.cssVariables,
  applyTheme: (themeId: string) => ThemeStore.setTheme(themeId),
  supportedFormats: ['OKLCH', 'HSL', 'RGB', 'HEX']
}
```

### 🎭 Principios de Diseño (Actualizados)
- **Mobile-first** - Desarrollo responsive desde móvil
- **Sidebar colapsible** con iconografía clara
- **No abrumar al usuario** - Máximo 3 clicks para funciones principales
- **Animaciones elegantes** pero funcionales con Framer Motion
- **Touch-friendly** - Botones mínimo 44px
- **Loading states** en todas las operaciones async
- **Dark/Light mode automático** + **temas personalizados**  # 🆕
- **Consistencia visual** mantenida en todos los temas  # 🆕

### 🧩 Componentes UI Requeridos
```typescript
// Siempre usar Shadcn/ui como base + TweakCN themes:
// Button, Input, Card, Dialog, Select, Table, Form, Toast, 
// Tabs, Avatar, Badge, Separator, Progress

// 🆕 Nuevos componentes de temas:
// ThemeSelector, ThemePreview, ColorPalette, ThemeCard
```

---

## ⚙️ REGLAS DE DESARROLLO

### 🏪 Zustand Stores Obligatorios

#### 🆕 ThemeStore (Nuevo)
```typescript
interface ThemeStore {
  currentTheme: TweakCNTheme | null;
  availableThemes: TweakCNTheme[];
  favoriteThemes: string[];
  isLoading: boolean;
  
  // Actions
  setTheme: (themeId: string) => Promise<void>;
  loadThemes: () => Promise<void>;
  toggleFavorite: (themeId: string) => void;
  searchThemes: (query: string) => TweakCNTheme[];
  previewTheme: (themeId: string) => void;
  resetPreview: () => void;
}
```

#### AuthStore (Actualizado)
```typescript
interface AuthStore {
  user: User | null;
  loading: boolean;
  userThemePreferences: ThemePreferences;  // 🆕
  
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: UserUpdate) => Promise<void>;
  updateThemePreferences: (prefs: ThemePreferences) => Promise<void>;  // 🆕
}
```

*[Otros stores mantienen estructura original...]*

### 🎣 Hooks Personalizados Requeridos

#### 🆕 Hooks de Temas (Nuevos)
```typescript
// useThemes.ts - Gestión completa de temas
// useThemePreview.ts - Preview en tiempo real
// useThemeSync.ts - Sincronización entre dispositivos
// useTweakCNIntegration.ts - Integración con TweakCN API
```

#### Hooks Existentes
```typescript
// useExpenses.ts - Manejo de gastos con React Query
// useRelationships.ts - Gestión de relaciones
// useDebts.ts - Cálculo y gestión de deudas
// useInventory.ts - Control de inventario
// useBudgets.ts - Presupuestos y alertas
```

### 🔧 Servicios Supabase (Actualizados)

#### 🆕 ThemeService (Nuevo)
```typescript
export const themeService = {
  getUserThemePreferences: (userId: string) => Promise<ThemePreferences>,
  updateUserTheme: (userId: string, themeId: string) => Promise<void>,
  getRelationshipTheme: (relationshipId: string) => Promise<string>,
  syncThemeAcrossDevices: (userId: string) => Promise<void>
}
```

*[Otros services mantienen estructura original...]*

---

## 🔒 SEGURIDAD Y PRIVACIDAD

### 🛡️ Row Level Security (RLS) - Actualizado

#### 🆕 Políticas de Temas
```sql
-- Solo usuarios pueden modificar sus preferencias de tema
CREATE POLICY "Users can manage their own theme preferences" ON user_theme_preferences
FOR ALL USING (user_id = auth.uid());

-- Miembros pueden ver tema del grupo
CREATE POLICY "Members can view relationship themes" ON relationships
FOR SELECT USING (
  id IN (
    SELECT relationship_id FROM relationship_members 
    WHERE user_id = auth.uid()
  )
);
```

*[Políticas existentes mantienen estructura original...]*

### 🔐 Configuraciones de Privacidad (Actualizadas)
```typescript
interface PrivacySettings {
  showPersonalExpenses: boolean;
  personalExpenseThreshold?: number;
  allowBudgetView: boolean;
  allowReportsView: boolean;
  shareThemePreferences: boolean;  // 🆕 Compartir tema con grupo
  allowThemeRecommendations: boolean;  // 🆕 Recibir recomendaciones
}
```

---

## ⚡ OPTIMIZACIÓN Y RENDIMIENTO

### 🚀 Optimizaciones Obligatorias
- **React.lazy** para componentes pesados
- **Virtualización** para listas > 100 items
- **Optimistic updates** en Zustand
- **Caching con React Query**
- **Compresión de imágenes** antes de upload
- **🆕 Lazy loading de temas** para performance
- **🆕 CSS-in-JS optimizado** para cambio de temas
- **🆕 Preload de temas populares**

### 📊 Métricas de Rendimiento (Actualizadas)
- **Lighthouse Score** > 90
- **First Contentful Paint** < 2s
- **Time to Interactive** < 3s
- **Zero errores** de TypeScript
- **🆕 Theme Switch Time** < 100ms
- **🆕 Theme Load Time** < 500ms

---

## 🗺️ ROADMAP DE DESARROLLO

### 🚀 FASE 1: FOUNDATION (4-6 semanas)
- ✅ Setup profesional Git + GitHub
- ✅ Arquitectura base con sistema de temas
- 🔄 Integración inicial con TweakCN (16 temas)
- 🔄 Funcionalidades core de gastos compartidos
- 🔄 CI/CD pipeline funcionando

### 📈 FASE 2: ESCALABILIDAD (6-8 semanas)  
- 🔮 Integración masiva TweakCN (+100 temas)
- 🔮 Sistema de usuario y relaciones completo
- 🔮 Dashboard avanzado con widgets temáticos
- 🔮 Performance optimization para miles de temas

### 🎯 FASE 3: DIFERENCIACIÓN (8-12 semanas)
- 🔮 Editor de temas personalizado
- 🔮 AI para recomendación de temas
- 🔮 Analytics de uso de temas
- 🔮 Community themes marketplace

### 🏆 VENTAJA COMPETITIVA
- **Al completar Fase 1**: Primera app fintech con personalización masiva
- **Al completar Fase 2**: Líder indiscutible en UX personalizable
- **Al completar Fase 3**: Ecosistema completo de personalización

---

## 📊 MÉTRICAS DE ÉXITO

### 🔧 KPIs TÉCNICOS
- **Performance**: <100ms para cambio de tema
- **Escalabilidad**: Soporte para +1000 temas sin degradación
- **Compatibility**: 100% componentes shadcn/ui responsive
- **CI/CD**: <5min pipeline completo

### 📱 KPIs DE PRODUCTO
- **Engagement**: +40% tiempo en app por personalización
- **Diferenciación**: Primera app fintech con +100 temas
- **User satisfaction**: >4.5/5 en personalización
- **Market position**: Líder en UX fintech personalizable

### 👨‍💻 KPIs DE DESARROLLO
- **Velocity**: Features deployed diariamente
- **Quality**: Zero breaking changes en main
- **Collaboration**: Git workflow eficiente
- **Documentation**: 100% features documentadas

---

## 🤖 INSTRUCCIONES PARA EL LLM

### ✅ SIEMPRE:
- **Consultar este documento** antes de generar código
- **Usar la estructura de carpetas** exacta
- **Implementar validaciones** con Zod
- **Crear tipos TypeScript** para todo
- **Usar Zustand** para estado global
- **Implementar RLS** en Supabase
- **Validar que animaciones** sean funcionales, no decorativas
- **Priorizar mobile-first** en diseño
- **🆕 Integrar sistema de temas** en nuevos componentes
- **🆕 Usar OKLCH** para colores cuando sea posible
- **🆕 Implementar lazy loading** para performance

### ❌ NUNCA:
- **Usar localStorage/sessionStorage** en artifacts
- **Crear componentes** sin validación
- **Ignorar la estructura** de base de datos
- **Usar CSS vanilla** en lugar de Tailwind
- **Crear funciones** sin tipos TypeScript
- **Omitir loading states**
- **Usar cualquier library** no especificada en el stack
- **🆕 Hardcodear colores** sin considerar temas
- **🆕 Crear estilos** incompatibles con TweakCN
- **🆕 Ignorar performance** al agregar temas

### 🎯 PRIORIDADES EN ORDEN:
1. **Funcionalidad core** (auth, gastos, relaciones)
2. **🆕 Sistema de temas** escalable
3. **Seguridad y validaciones**
4. **Experiencia de usuario**
5. **Optimización y rendimiento**
6. **Features adicionales**

### 🤔 CUANDO TENGAS DUDAS:
- **Siempre preguntar** antes de asumir
- **Sugerir alternativas** basadas en este contexto
- **Referenciar secciones específicas** de este documento
- **Priorizar simplicidad** y usabilidad
- **🆕 Considerar impacto** en sistema de temas

---

## 🎯 OBJETIVO FINAL

Crear una **red social de gastos y pagos moderna, segura y altamente personalizable** que permita a grupos de personas gestionar sus finanzas compartidas de manera inteligente y transparente, con la **primera experiencia de personalización masiva en el mercado fintech**.

### 🏆 VISIÓN A LARGO PLAZO
**DivCoins** se convertirá en el estándar de oro para aplicaciones financieras personalizables, estableciendo un nuevo paradigma en la industria fintech donde la **experiencia visual única** es tan importante como la **funcionalidad financiera**.

---

*🤖 Generado con [Claude Code](https://claude.ai/code)*

*Co-Authored-By: Claude <noreply@anthropic.com>*