# 📋 CONTEXT.md - DIVCOINS BACKEND COMPLETE ARCHITECTURE

## 🎯 PROJECT STATUS: BACKEND COMPLETE ✅

**DivCoins v2.0** is a smart expense sharing application with a **fully functional backend architecture**. All core business logic, authentication, database operations, and API services are implemented and production-ready. The UI has been intentionally removed to enable fresh, modern interface development.

---

## 📑 ARCHITECTURE OVERVIEW

### 🏗️ CURRENT IMPLEMENTATION STATUS

| Component | Status | Files | Description |
|-----------|--------|-------|-------------|
| **Authentication** | ✅ Complete | `authStore.ts`, `useAuth.ts` | Full Supabase auth with Google OAuth |
| **Database Schema** | ✅ Complete | `supabase.ts` | PostgreSQL with RLS policies |
| **Relationship Service** | ✅ Complete | `relationshipService.ts` | Group management, invitations |
| **Expense Service** | ✅ Complete | `expenseService.ts` | Expense tracking, splitting, debts |
| **Type System** | ✅ Complete | `auth.ts` | Full TypeScript coverage |
| **Build System** | ✅ Complete | Vite + TypeScript | Production builds working |
| **Deployment** | ✅ Complete | Vercel + GitHub Actions | CI/CD pipeline active |
| **UI Components** | 🔄 Ready for Dev | Minimal structure | Clean slate for modern UI |

---

## 🛠️ TECHNOLOGY STACK

### **Core Backend (Production Ready)**
- **React 19** + **TypeScript** + **Vite 6**
- **Supabase** (Auth + PostgreSQL + Storage + Real-time)
- **Zustand** for state management
- **Zod** for validation
- **ESLint** + **TypeScript** strict mode

### **Infrastructure**
- **GitHub Actions** for CI/CD
- **Vercel** for deployment
- **Supabase** for backend services
- **Row Level Security** for data protection

---

## 🗄️ DATABASE ARCHITECTURE

### **Tables Schema (Supabase PostgreSQL)**

#### **Users**
```sql
users (
  id uuid PRIMARY KEY,
  email text UNIQUE,
  display_name text,
  avatar_url text,
  created_at timestamp,
  updated_at timestamp
)
```

#### **Relationships (Groups)**
```sql
relationships (
  id uuid PRIMARY KEY,
  name text,
  description text,
  type enum('couple', 'roommates', 'friends', 'family', 'group'),
  created_by uuid REFERENCES users(id),
  created_at timestamp,
  updated_at timestamp
)
```

#### **Relationship Members**
```sql
relationship_members (
  id uuid PRIMARY KEY,
  relationship_id uuid REFERENCES relationships(id),
  user_id uuid REFERENCES users(id),
  role enum('admin', 'member', 'viewer'),
  joined_at timestamp
)
```

#### **Expenses**
```sql
expenses (
  id uuid PRIMARY KEY,
  relationship_id uuid REFERENCES relationships(id),
  title text,
  amount decimal,
  currency text DEFAULT 'USD',
  category text,
  description text,
  receipt_url text,
  created_by uuid REFERENCES users(id),
  created_at timestamp,
  updated_at timestamp
)
```

#### **Expense Splits**
```sql
expense_splits (
  id uuid PRIMARY KEY,
  expense_id uuid REFERENCES expenses(id),
  user_id uuid REFERENCES users(id),
  amount decimal,
  percentage decimal,
  status enum('pending', 'paid', 'settled'),
  paid_at timestamp
)
```

### **Row Level Security (RLS) Policies**
- ✅ Users can only access their own data
- ✅ Group members can access group expenses
- ✅ Admin roles for group management
- ✅ Secure expense splitting logic

---

## 🔧 BACKEND SERVICES ARCHITECTURE

### **Authentication Service** (`authStore.ts`)
```typescript
interface AuthStore {
  user: AuthUser | null
  session: Session | null
  loading: boolean
  
  // Core auth methods
  signUp: (email, password, displayName?) => Promise<{success, error?}>
  signIn: (email, password) => Promise<{success, error?}>
  signInWithGoogle: () => Promise<{success, error?}>
  signOut: () => Promise<{success, error?}>
  
  // Profile management
  updateProfile: (updates) => Promise<{success, error?}>
  resetPassword: (email) => Promise<{success, error?}>
  
  // Session management
  refreshSession: () => Promise<void>
  initialize: () => Promise<void>
}
```

### **Relationship Service** (`relationshipService.ts`)
```typescript
export const relationshipService = {
  // Group management
  getUserRelationships: () => Promise<{data, error}>
  createRelationship: (relationship) => Promise<{data, error}>
  deleteRelationship: (id) => Promise<{data, error}>
  
  // Member management
  addMember: (relationshipId, userEmail, role) => Promise<{data, error}>
  removeMember: (relationshipId, userId) => Promise<{data, error}>
  updateMemberRole: (relationshipId, userId, role) => Promise<{data, error}>
  getRelationshipMembers: (relationshipId) => Promise<{data, error}>
}
```

### **Expense Service** (`expenseService.ts`)
```typescript
export const expenseService = {
  // Expense management
  getRelationshipExpenses: (relationshipId) => Promise<{data, error}>
  createExpense: (expense) => Promise<{data, error}>
  updateExpense: (expenseId, updates) => Promise<{data, error}>
  deleteExpense: (expenseId) => Promise<{data, error}>
  
  // Splitting and settlements
  markSplitPaid: (splitId) => Promise<{data, error}>
  calculateDebts: (relationshipId) => Promise<{data, error}>
  
  // File management
  uploadReceipt: (file, expenseId) => Promise<{data, error}>
  
  // Analytics
  getUserExpenseSummary: (relationshipId?) => Promise<{data, error}>
}
```

---

## 🎣 HOOKS ARCHITECTURE

### **Authentication Hook** (`useAuth.ts`)
```typescript
export function useAuth() {
  return {
    // State
    user: AuthUser | null
    session: Session | null
    loading: boolean
    initializing: boolean
    error: string | null
    isAuthenticated: boolean
    
    // Actions
    signUp, signIn, signInWithGoogle, signOut
    updateProfile, resetPassword, updateThemePreferences
    refreshSession, clearError
  }
}
```

### **Additional Utility Hooks**
- `useAuthStatus()` - Authentication status check
- `useAuthValidation()` - Form validation helpers
- `useRequireAuth()` - Protected operations
- `useAuthGuard()` - Route protection
- `useSession()` - Session management
- `useUserProfile()` - Profile management

---

## 🔒 SECURITY ARCHITECTURE

### **Authentication Security**
- ✅ JWT-based sessions with auto-refresh
- ✅ Google OAuth integration
- ✅ Password strength validation
- ✅ Email verification flow
- ✅ Password reset functionality

### **Database Security**
- ✅ Row Level Security (RLS) on all tables
- ✅ User-based data isolation
- ✅ Role-based access control
- ✅ SQL injection protection
- ✅ Real-time subscription security

### **API Security**
- ✅ Type-safe API calls with Zod validation
- ✅ Error handling and sanitization
- ✅ Rate limiting via Supabase
- ✅ CORS configuration

---

## 📁 PROJECT STRUCTURE

```
src/
├── stores/
│   └── authStore.ts           # ✅ Complete Zustand auth store
├── hooks/
│   └── useAuth.ts            # ✅ Complete auth hooks collection
├── services/
│   ├── relationshipService.ts # ✅ Complete group management
│   └── expenseService.ts      # ✅ Complete expense operations
├── types/
│   └── auth.ts               # ✅ Complete TypeScript definitions
├── lib/
│   ├── supabase.ts          # ✅ Complete Supabase configuration
│   └── utils.ts             # ✅ Utility functions
├── components/              # 🔄 Ready for UI development
│   ├── ui/                  # Base components (to implement)
│   ├── forms/               # Form components (to implement)
│   ├── layout/              # Layout components (to implement)
│   └── pages/               # Page components (to implement)
└── App.tsx                  # ✅ Minimal working app
```

---

## 🚀 DEPLOYMENT ARCHITECTURE

### **Development Environment**
- ✅ Vite dev server with HMR
- ✅ TypeScript compilation
- ✅ ESLint code quality
- ✅ Environment variable management

### **Production Environment**
- ✅ Vercel deployment pipeline
- ✅ GitHub Actions CI/CD
- ✅ Automatic builds on push
- ✅ Environment secrets management

### **Backend Services**
- ✅ Supabase production instance
- ✅ Database migrations ready
- ✅ RLS policies deployed
- ✅ Storage buckets configured

---

## 🧪 TESTING ARCHITECTURE

### **Backend Testing (Complete)**
- ✅ Authentication flows tested
- ✅ Database operations verified
- ✅ RLS policies validated
- ✅ API endpoints functional
- ✅ Error handling tested

### **UI Testing (Ready for Implementation)**
- 🔄 React Testing Library setup needed
- 🔄 Component testing structure ready
- 🔄 E2E testing with Cypress/Playwright
- 🔄 Integration testing with real Supabase data

---

## 🎯 BUSINESS LOGIC IMPLEMENTATION

### **User Management**
- ✅ User registration and profile management
- ✅ Email verification and password reset
- ✅ Google OAuth integration
- ✅ Multi-device session management

### **Group Management**
- ✅ Create and manage expense groups
- ✅ Invite members via email
- ✅ Role-based permissions (admin/member/viewer)
- ✅ Group settings and privacy controls

### **Expense Tracking**
- ✅ Add individual and shared expenses
- ✅ Flexible expense splitting (equal, percentage, custom)
- ✅ Category management
- ✅ Receipt upload and storage
- ✅ Expense editing and deletion

### **Debt Calculation**
- ✅ Automatic debt calculation between users
- ✅ Debt simplification algorithms
- ✅ Settlement tracking and history
- ✅ Payment status management

---

## 📊 PERFORMANCE ARCHITECTURE

### **Backend Performance**
- ✅ Efficient database queries with proper indexing
- ✅ Real-time subscriptions for collaborative features
- ✅ File storage optimization for receipts
- ✅ Caching strategies in Zustand stores

### **Frontend Performance (Ready)**
- 🔄 Code splitting setup ready
- 🔄 Lazy loading for components
- 🔄 Image optimization for receipts
- 🔄 Bundle size optimization

---

## 🔄 REAL-TIME FEATURES

### **Collaborative Features (Ready)**
- ✅ Real-time expense updates
- ✅ Live debt calculation changes
- ✅ Group member activity
- ✅ Supabase subscriptions configured

---

## 📱 API DESIGN PATTERNS

### **Service Layer Pattern**
All backend operations follow a consistent service layer pattern:
```typescript
// Consistent API response format
interface ServiceResponse<T> {
  data: T | null
  error: Error | null
}

// Error handling
try {
  const result = await service.operation(params)
  if (result.error) {
    // Handle error
  }
  // Use result.data
} catch (error) {
  // Handle unexpected errors
}
```

### **Type Safety**
- ✅ Full TypeScript coverage
- ✅ Zod validation schemas
- ✅ Type-safe API calls
- ✅ Runtime type checking

---

## 🎨 UI DEVELOPMENT READINESS

### **What's Ready for UI Development**
- ✅ **Authentication flows** - Use `useAuth()` hook
- ✅ **Data fetching** - Use service functions
- ✅ **State management** - Zustand stores ready
- ✅ **Type definitions** - Full TypeScript support
- ✅ **Error handling** - Consistent error patterns

### **Recommended UI Implementation**
1. **Choose UI Framework** (Shadcn/ui + Tailwind recommended)
2. **Implement authentication forms** first
3. **Build dashboard** with overview widgets
4. **Add group management** interface
5. **Implement expense tracking** UI
6. **Create debt settlement** views

---

## 🚀 PRODUCTION READINESS

### **Backend Production Status** ✅
- ✅ Authentication system complete
- ✅ Database schema deployed
- ✅ Business logic implemented
- ✅ Security measures in place
- ✅ Error handling comprehensive
- ✅ Performance optimized
- ✅ CI/CD pipeline active

### **Next Steps for Full Product**
1. 🎨 **UI Development** - Modern interface implementation
2. 🧪 **UI Testing** - Component and E2E testing
3. 📱 **Mobile Optimization** - PWA or React Native
4. 📊 **Analytics** - User behavior tracking
5. 🔔 **Notifications** - Push notification system

---

## 🎯 DEVELOPMENT PRIORITIES

### **For UI Developer**
1. **Start with authentication** - Login/signup forms
2. **Build dashboard** - Overview and navigation
3. **Implement groups** - Create and manage groups
4. **Add expenses** - Expense forms and lists
5. **Show debts** - Settlement interface

### **Future Enhancements**
- 📊 Advanced analytics and reporting
- 🔔 Push notifications
- 💳 Payment integration
- 📱 Mobile app (PWA → React Native)
- 🌐 Multi-language support

---

**🎉 READY FOR UI DEVELOPMENT!**

The backend architecture is production-ready with comprehensive business logic, security, and performance optimization. The next developer can focus entirely on creating beautiful, modern user interfaces while leveraging the robust backend foundation.

---

*Generated with complete backend implementation - Focus on amazing UX/UI! 🚀*