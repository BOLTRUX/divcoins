# 🔒 REGLAS DE DESARROLLO - DIVCOINS

## 🚨 REGLAS CRÍTICAS ANTES DE CADA COMMIT

### ⚠️ **NUNCA HACER COMMIT SIN ESTAS VERIFICACIONES**

#### 🔍 **AUDITORÍA PRE-COMMIT OBLIGATORIA**
```bash
# 1. LINT CHECK (OBLIGATORIO)
npm run lint
# ❌ Si hay errores: ARREGLAR ANTES DE CONTINUAR
# ✅ Si no hay errores: Continuar

# 2. TYPE CHECK (OBLIGATORIO)  
npm run type-check
# ❌ Si hay errores: ARREGLAR ANTES DE CONTINUAR
# ✅ Si no hay errores: Continuar

# 3. BUILD CHECK (OBLIGATORIO)
npm run build
# ❌ Si falla: ARREGLAR ANTES DE CONTINUAR
# ✅ Si construye: LISTO PARA COMMIT
```

#### 🎯 **PROCESO DE AUDITORÍA PASO A PASO**

1. **ANTES de agregar archivos al commit:**
   - Ejecutar los 3 comandos arriba
   - Si cualquiera falla: ARREGLAR PRIMERO

2. **DURANTE la preparación del commit:**
   - `git status` - Revisar qué archivos se van a commitear
   - `git diff --cached` - Revisar cambios específicos

3. **DESPUÉS del commit, ANTES del push:**
   - Verificar que el commit message sea descriptivo
   - `git log --oneline -1` - Confirmar que el commit se creó

### 🚫 **ERRORES COMUNES A EVITAR**

#### **ESLint Errors (npm run lint)**
- ❌ `no-useless-escape` - Escapar caracteres innecesarios en regex
- ❌ `@typescript-eslint/no-unused-vars` - Variables no utilizadas
- ❌ `react-hooks/exhaustive-deps` - Dependencies faltantes en useEffect
- ❌ `@typescript-eslint/no-explicit-any` - Uso de tipo 'any'

#### **TypeScript Errors (npm run type-check)**
- ❌ Tipos incorrectos o faltantes
- ❌ Imports no encontrados
- ❌ Propiedades inexistentes en objetos
- ❌ Llamadas a funciones con parámetros incorrectos

#### **Build Errors (npm run build)**
- ❌ Módulos no encontrados
- ❌ Sintaxis incorrecta que no se detecta en desarrollo
- ❌ Variables de entorno faltantes
- ❌ Archivos referenciados que no existen

### 🔧 **COMANDOS DE RECUPERACIÓN RÁPIDA**

Si algo falla en CI/CD después del push:

```bash
# 1. Ver el último commit
git log --oneline -1

# 2. Hacer fix rápido
# [Arreglar el error específico]

# 3. Commit de fix
git add .
git commit -m "fix: resolve [error-específico]"
git push origin main

# 4. Verificar que CI/CD pase
# Ir a GitHub Actions y verificar ✅
```

### 📋 **CHECKLIST PRE-COMMIT**

Antes de cada `git commit`, verificar:

- [ ] ✅ `npm run lint` - Sin errores
- [ ] ✅ `npm run type-check` - Sin errores  
- [ ] ✅ `npm run build` - Compilación exitosa
- [ ] ✅ `git status` - Solo archivos deseados
- [ ] ✅ Mensaje de commit descriptivo
- [ ] ✅ No hay `console.log` de debug olvidados
- [ ] ✅ No hay archivos temporales/personales
- [ ] ✅ Variables de entorno no expuestas

### ⚡ **SCRIPTS DE VERIFICACIÓN AUTOMÁTICA**

#### **Pre-commit Hook Simulado:**
```bash
# Crear alias para verificación completa
# Agregar a ~/.bashrc o ~/.zshrc:
alias pre-commit="npm run lint && npm run type-check && npm run build && echo '✅ Ready for commit!'"
```

#### **Verificación Rápida:**
```bash
# Verificación mínima antes de commit
npm run lint && npm run type-check
```

### 🎯 **FLUJO DE TRABAJO SEGURO**

#### **Desarrollo Diario:**
1. Desarrollar feature/fix
2. **EJECUTAR AUDITORÍA PRE-COMMIT**
3. `git add .`
4. `git commit -m "mensaje descriptivo"`
5. `git push origin main`
6. **Verificar GitHub Actions ✅**
7. **Verificar Vercel Deploy ✅**

#### **Si Algo Falla en CI/CD:**
1. **NO PÁNICO** - Es mejor fallar en CI que en producción
2. Ver error específico en GitHub Actions
3. Reproducir error localmente
4. Arreglar error
5. Commit de fix
6. Verificar que CI/CD pase

### 🏆 **OBJETIVOS DE CALIDAD**

- **0 errores** en CI/CD pipelines
- **100% builds** exitosos
- **Commits limpios** sin fixes inmediatos
- **Deploy automático** confiable

### 📚 **REFERENCIAS RÁPIDAS**

- **ESLint Rules**: `.eslintrc.cjs`
- **TypeScript Config**: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- **Build Config**: `vite.config.ts`
- **CI/CD Config**: `.github/workflows/ci.yml`

---

## 🚨 **REGLA DE ORO**

> **"NUNCA hacer commit sin ejecutar: lint + type-check + build"**

**Si cualquier comando falla, ARREGLAR ANTES de continuar.**

**El tiempo invertido en verificación previa es menor que el tiempo perdido arreglando CI/CD roto.**

---

*Documento actualizado: 30 Junio 2025*  
*Versión: 1.0*