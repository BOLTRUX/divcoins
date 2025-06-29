# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 📚 NAVEGACIÓN DE DOCUMENTOS

### 🎯 Archivo Central de Referencia
**ESTE ARCHIVO (CLAUDE.md)** - Guía principal para desarrollo

### 📊 Project Management & Tracking
- **PROJECT_TRACKER.md** - Dashboard ejecutivo, progreso diario
  - **Úsalo para**: Conocer estado general, métricas, próximos milestones
  - **Actualizar**: Diariamente al final del día
  - **Estado actual**: 15% progreso, Fase 1 Foundation
  
- **CURRENT_STATUS.md** - Análisis técnico profundo
  - **Úsalo para**: Entender gaps técnicos, blockers, próximos pasos críticos
  - **Actualizar**: Semanalmente o cuando hay cambios técnicos
  - **Last update**: Identifica 4 blockers críticos inmediatos

- **ROADMAP_DETAILED.md** - Plan completo de desarrollo  
  - **Úsalo para**: Entender tareas específicas, dependencias, estimaciones
  - **Actualizar**: Mensualmente o al completar fases
  - **Scope**: 3 fases, 18-26 semanas timeline

- **TASKS_BREAKDOWN.md** - Tracking granular de 156 tareas
  - **Úsalo para**: Marcar progress diario, gestionar sprints
  - **Actualizar**: Diariamente al completar tareas
  - **Current**: 580 story points, 12 completadas (8%)

### 🏗️ Architecture & Specifications  
- **CONTEXT.md** - Biblia técnica del proyecto (606 líneas)
  - **Úsalo para**: Decisiones arquitecturales, especificaciones técnicas
  - **Actualizar**: Solo cuando hay cambios arquitecturales mayores
  - **Contains**: Complete system architecture, database schema, development standards

## Essential Commands

### Development
```bash
npm run dev          # Start development server with Vite + HMR
npm run build        # TypeScript compilation + Vite production build  
npm run lint         # ESLint code linting
npm run preview      # Preview production build locally
```

### Shadcn/ui Components
```bash
npx shadcn@latest add [component]  # Add shadcn/ui components
npx shadcn@latest init             # Reinitialize shadcn/ui if needed
```

## Project Architecture

### Tech Stack Overview
- **DivCoins v2.0**: Social fintech app for shared expense management with advanced theming
- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Supabase (Auth + PostgreSQL + Storage + Real-time)
- **State**: Zustand for global state management
- **UI**: TailwindCSS v4 + Shadcn/ui (New York style) + advanced theming system
- **Data Fetching**: TanStack React Query
- **Forms**: React Hook Form + Zod validation

### Key Architectural Decisions

#### Theming System (Core Differentiator)
- **TweakCN Integration**: Scalable system designed for 1000+ themes
- **OKLCH Color System**: Advanced color management over traditional HSL/RGB
- **CSS Variables**: Dynamic theme switching without rebuilds
- **Performance**: Lazy loading and caching strategies for theme assets

#### Component Structure
```
src/components/
├── ui/              # Shadcn/ui base components
├── theme/           # Advanced theming components (ThemeSelector, ThemePreview, etc.)
├── auth/            # Authentication components
├── dashboard/       # Dashboard and analytics
├── expenses/        # Expense management
├── relationships/   # User relationships and groups
├── inventory/       # Inventory tracking
├── debts/           # Debt calculation and settlement
└── reports/         # Reporting and insights
```

#### State Management Pattern
- **Zustand Stores**: Specific stores for auth, themes, expenses, relationships, inventory, debts
- **React Query**: Server state management with optimistic updates
- **Type Safety**: Full TypeScript coverage with strict configuration

#### Path Aliases
- `@/` → `./src/` (configured in vite.config.ts)
- All imports use absolute paths from src root

### Database Architecture (Supabase)
- **Row Level Security (RLS)**: Enforced on all tables
- **Real-time**: Subscriptions for collaborative features
- **Multi-tenancy**: Users can belong to multiple relationship groups
- **Theme Preferences**: Stored per user and per relationship group

### Styling Architecture

#### TailwindCSS v4 Configuration
- **Primary Colors**: Lime-based palette (lime-50 to lime-900)
- **CSS Variables**: Theme-aware color system
- **Component Variants**: Class Variance Authority (CVA) for component styling
- **Utility Classes**: Tailwind-merge for conditional class merging

#### Responsive Design
- **Mobile-first**: All components designed for mobile experience first
- **Touch-friendly**: Minimum 44px touch targets
- **Progressive Enhancement**: Enhanced features for larger screens

### Development Workflow

#### Code Quality
- **ESLint**: Configured with React hooks and TypeScript rules
- **TypeScript**: Strict mode enabled with comprehensive type checking
- **Conventional Commits**: Required for version control (feat, fix, docs, style, refactor, perf, theme)

#### Performance Requirements
- **Lighthouse Score**: >90 target
- **Theme Switch Time**: <100ms requirement
- **First Contentful Paint**: <2s target
- **Code Splitting**: React.lazy for heavy components

### Security Considerations
- **Supabase RLS**: All data access controlled by Row Level Security policies
- **Type Validation**: Zod schemas for all API boundaries  
- **Privacy Settings**: Configurable data sharing between relationship members
- **Theme Preferences**: Isolated per user/relationship with proper access controls

### Critical Implementation Notes

#### Theme System Integration
- All new components must support dynamic theming via CSS variables
- Use OKLCH color format when possible for better color accuracy
- Implement lazy loading for theme assets to maintain performance
- Test theme switching functionality in all new features

#### Component Development
- Follow Shadcn/ui patterns for consistency
- Implement proper loading states for all async operations
- Use Framer Motion for functional animations only
- Ensure mobile-first responsive design

#### State Management
- Zustand stores should follow the established pattern in CONTEXT.md
- Implement optimistic updates for better UX
- Use React Query for all server state management
- Maintain type safety across all state operations

## 🔄 WORKFLOW DE DESARROLLO DIARIO

### 🌅 Morning Routine (5 min)
1. **Leer PROJECT_TRACKER.md** 
   - Revisar progreso de ayer
   - Identificar blockers nuevos
   - Confirmar milestone actual

2. **Consultar CURRENT_STATUS.md**
   - Verificar blockers críticos actuales
   - Revisar próximos pasos inmediatos
   - Confirmar prioridades técnicas

3. **Planear en TASKS_BREAKDOWN.md**
   - Marcar tareas del día como 🔄 In Progress
   - Verificar dependencias de tareas
   - Estimar tiempo realista

### 🌆 Evening Routine (10 min)
1. **Actualizar TASKS_BREAKDOWN.md**
   - Marcar tareas completadas: ✅
   - Mover tareas bloqueadas: 🚫
   - Añadir nuevas tareas descubiertas

2. **Actualizar PROJECT_TRACKER.md**
   - Recalcular progreso de fase
   - Actualizar métricas clave  
   - Documentar wins del día
   - Actualizar timestamp

### 📅 Weekly Review (30 min - Viernes)
1. **Actualizar CURRENT_STATUS.md**
   - Análisis técnico de la semana
   - Identificar nuevos gaps/blockers
   - Actualizar estimaciones
   - Celebrar logros

2. **Velocity Analysis**
   - Calcular tasks completadas/semana
   - Actualizar story points velocity
   - Ajustar estimaciones futuras

## 🚨 BLOCKERS CRÍTICOS ACTUALES

### 🔴 **MUST FIX IMMEDIATELY**
1. **Build System Broken** 
   - `npm run build` falla por dependencias rollup
   - **Bloquea**: Deploy, CI/CD, production testing
   - **Próximo paso**: Diagnosticar y resolver dependencias nativas

2. **No Git History**
   - Proyecto sin commits, sin GitHub repository
   - **Bloquea**: Version control, collaboration, CI/CD
   - **Próximo paso**: Initial commit + GitHub repo setup

3. **No Environment Configuration**
   - Falta .env.local, Supabase no configurado  
   - **Bloquea**: Backend connection, authentication
   - **Próximo paso**: Supabase project + environment vars

### ⚠️ **HIGH PRIORITY**
- Theme system implementation (ThemeStore, TweakCN integration)
- Authentication flow (AuthStore, Supabase Auth)
- CI/CD pipeline setup (GitHub Actions + Vercel)

**Referencia completa**: CURRENT_STATUS.md

## 📋 GUÍA DE MANTENIMIENTO DE DOCUMENTOS

### 🎯 Responsabilidades por Archivo
| Documento | Frecuencia | Cuándo Actualizar |
|-----------|------------|-------------------|
| PROJECT_TRACKER.md | Diario | Final del día de trabajo |
| TASKS_BREAKDOWN.md | Diario | Al completar/iniciar tareas |
| CURRENT_STATUS.md | Semanal | Viernes EOD |
| ROADMAP_DETAILED.md | Mensual | Al completar milestones |
| CONTEXT.md | Ocasional | Cambios arquitecturales |
| CLAUDE.md | Ocasional | Nuevos workflows/tools |

### 🔄 Templates de Commits
```bash
# Daily updates
git commit -m "docs: update PROJECT_TRACKER with daily progress"
git commit -m "docs: mark tasks complete in TASKS_BREAKDOWN"

# Technical updates  
git commit -m "docs: update CURRENT_STATUS with build fix"
git commit -m "docs: add new blocker to tracking system"

# Feature development
git commit -m "feat: implement ThemeStore with Zustand"
git commit -m "fix: resolve rollup build dependencies"
git commit -m "theme: integrate first TweakCN theme"
```

### 🎯 Quality Checks
- ✅ All docs timestamps < 1 week old
- ✅ PROJECT_TRACKER progress matches actual work
- ✅ TASKS_BREAKDOWN reflects current sprint
- ✅ No documents contradict each other

## 🎯 PRÓXIMOS PASOS CRÍTICOS

### 🔴 **ESTA SEMANA (CRÍTICO)**
Basado en CURRENT_STATUS.md analysis:

#### Día 1-2: Resolver Blockers
1. **Fix build system** - npm run build funcionando
2. **Git setup** - Initial commit + GitHub repo  
3. **Environment** - .env.local + Supabase project

#### Día 3-4: Foundation  
4. **CI/CD pipeline** - GitHub Actions + Vercel
5. **ThemeStore** - Zustand implementation
6. **AuthStore** - Basic authentication

#### Día 5-7: Primera Demo
7. **Theme switching** - TweakCN integration básica
8. **Login flow** - Authentication funcionando
9. **Deploy** - Primera versión accessible online

### 🎯 **TARGET SEMANAL**
- ✅ Build system working
- ✅ GitHub + CI/CD pipeline  
- ✅ Theme switching demo
- ✅ Authentication flow
- ✅ First Vercel deployment

**Referencia detallada**: ROADMAP_DETAILED.md  
**Tracking granular**: TASKS_BREAKDOWN.md

## ⚡ REFERENCIAS RÁPIDAS

### 🔍 "¿Dónde encuentro...?"
- **Progreso actual**: PROJECT_TRACKER.md
- **Qué hacer hoy**: TASKS_BREAKDOWN.md  
- **Por qué algo no funciona**: CURRENT_STATUS.md
- **Cómo implementar X**: CONTEXT.md
- **Cuándo estará listo**: ROADMAP_DETAILED.md

### 🎯 "¿Qué hago si...?"
- **No sé qué tarea hacer**: Consultar TASKS_BREAKDOWN.md sección "IMMEDIATE"
- **Algo está bloqueado**: Revisar CURRENT_STATUS.md blockers
- **Necesito arquitectura**: CONTEXT.md tiene especificaciones completas
- **Quiero ver progreso**: PROJECT_TRACKER.md dashboard ejecutivo

### 📊 "¿Cómo reporto progreso?"
1. **Diario**: Actualizar PROJECT_TRACKER.md + TASKS_BREAKDOWN.md  
2. **Semanal**: Actualizar CURRENT_STATUS.md con análisis técnico
3. **Commits**: Usar conventional commits (feat:, fix:, docs:, theme:)
4. **Issues**: Linkear a tareas específicas en TASKS_BREAKDOWN.md

### Project Status
**Current Phase**: Foundation (15% complete) - Focus on resolving critical blockers
**Next Priority**: Build system fix → Git setup → Theme system implementation
**Architecture**: Fully configured with modern tooling and comprehensive documentation

**For detailed specifications**: Refer to CONTEXT.md for modules, database schema, and development standards.