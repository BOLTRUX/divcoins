# DivCoins - Backend Complete, UI Ready for Development

## 🎯 Project Status: Backend Complete ✅

**DivCoins** is a smart expense sharing application with a **fully functional backend** and **clean architecture**. All business logic, authentication, and database operations are implemented and tested. The UI has been intentionally removed to allow for modern interface development.

## 📚 Essential Files for Development

### 🔧 Core Backend (Ready to Use)
- **Authentication**: `src/stores/authStore.ts` + `src/hooks/useAuth.ts`
- **Services**: `src/services/relationshipService.ts` + `src/services/expenseService.ts`  
- **Database**: Supabase fully configured with RLS policies
- **Types**: `src/types/auth.ts` for TypeScript definitions

### 📖 Context Documentation (Complete Project Knowledge)
- **CONTEXT.md** - Complete backend architecture (454 lines)
- **UI_DEVELOPMENT_GUIDE.md** - Complete guide for UI developers (244 lines)
- **CURRENT_STATUS.md** - Detailed project status analysis (335 lines)
- **PROJECT_TRACKER.md** - Executive dashboard with metrics (155 lines)
- **TASKS_BREAKDOWN.md** - Granular task list (156 tasks, 357 lines)
- **ROADMAP_DETAILED.md** - Development phases breakdown
- **REGLAS.md** - Project rules and conventions
- **README.md** - Main project documentation
- **CLAUDE.md** - This file (project context)
- **package.json** - Clean dependencies (only backend essentials)

### 🤖 TaskMaster AI Integration
- **.taskmaster/tasks/tasks.json** - AI-generated task list (11KB, 10 core tasks)
- **.taskmaster/tasks/task_001.txt** to **task_010.txt** - Individual task details
- **.taskmaster/config.json** - AI model configuration
- **.taskmaster/state.json** - Current TaskMaster state

## 🏗️ Architecture Overview

### Backend Stack (✅ Complete)
- **React 19** + **TypeScript** + **Vite**
- **Supabase** (Auth + PostgreSQL + Storage + RLS)
- **Zustand** for state management
- **Zod** for validation

### What's Working
```typescript
// Authentication
const { user, signIn, signOut, loading } = useAuth()

// Relationship Management  
const groups = await relationshipService.getUserRelationships()
await relationshipService.createRelationship({ name: 'Roommates', type: 'roommates' })

// Expense Management
const expenses = await expenseService.getRelationshipExpenses(groupId)
await expenseService.createExpense({
  relationship_id: groupId,
  title: 'Groceries',
  amount: 50.00,
  splits: [{ user_id: 'user1', amount: 25.00 }]
})

// Debt Calculation
const debts = await expenseService.calculateDebts(groupId)
```

## 🎨 UI Development Instructions

### Quick Start
1. **Choose UI Framework** (recommended: Shadcn/ui + Tailwind)
2. **Read UI_DEVELOPMENT_GUIDE.md** for complete instructions
3. **Start with authentication forms** using `useAuth()` hook
4. **Build dashboard** using backend services

### Essential Commands
```bash
npm install          # Install dependencies
npm run dev          # Start development server  
npm run build        # Build for production
npm run type-check   # TypeScript validation
```

### Key User Flows to Implement
1. **Authentication**: Login/signup forms with Google OAuth
2. **Dashboard**: Overview of expenses, debts, recent activity
3. **Groups**: Create/manage groups, invite members
4. **Expenses**: Add/edit expenses, split bills, upload receipts
5. **Settlement**: View debts, mark as paid, settlement suggestions

## 🔐 Environment Setup

Create `.env.local`:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📊 Database Schema (Supabase)

### Core Tables
- **users**: User profiles and preferences
- **relationships**: Groups (couples, roommates, friends, family)
- **relationship_members**: Group membership with roles
- **expenses**: Individual expenses with metadata
- **expense_splits**: How expenses are split between users

### Security
- **Row Level Security (RLS)**: Fully configured
- **Auth policies**: Users can only access their own data
- **Real-time subscriptions**: Ready for collaborative features

## 🚀 Deployment

- **Development**: `npm run dev` (auto-reload)
- **Production**: Automatic deployment via Vercel on git push
- **CI/CD**: GitHub Actions configured
- **Environment**: Production Supabase project ready

## 📱 Design Considerations

### User Experience Goals
- **Mobile-first**: Primary interface should be mobile-optimized
- **Fast interactions**: Quick expense entry and splitting
- **Clear debt visualization**: Easy to see who owes what
- **Intuitive navigation**: Minimal clicks to core functions

### Technical Requirements
- **TypeScript**: All components should be fully typed
- **Responsive**: Works on all screen sizes
- **Accessible**: WCAG 2.1 compliant
- **Performance**: Fast loading and smooth interactions

## 🧪 Testing Strategy

### Backend (Already Tested)
- ✅ Authentication flows working
- ✅ Database operations tested
- ✅ RLS policies verified
- ✅ API endpoints functional

### UI Testing (To Implement)
- React Testing Library for components
- Cypress/Playwright for E2E flows
- Real Supabase data integration tests

## 🎯 MVP Feature Priority

### Phase 1: Core Authentication & Groups
1. Login/signup with Google OAuth
2. User profile management
3. Create and join groups
4. Invite members via email

### Phase 2: Expense Management  
1. Add expense form with splitting
2. Expense list/feed
3. Receipt upload
4. Edit/delete expenses

### Phase 3: Debt Settlement
1. Debt calculation display
2. Settlement suggestions
3. Mark debts as paid
4. Settlement history

### Phase 4: Analytics & Reports
1. Spending charts
2. Category breakdowns
3. Export functionality
4. Notifications

## 🛠️ Development Guidelines

### Code Standards
- Use TypeScript for all new code
- Follow ESLint configuration
- Use existing Zustand stores for state
- Implement proper error handling
- Add loading states for async operations

### Component Structure
```
src/components/
├── ui/           # Base components (Button, Input, Card)
├── forms/        # Form components  
├── layout/       # Navigation, header, sidebar
└── features/     # Feature-specific components

src/pages/        # Route-level components
├── Dashboard.tsx
├── Login.tsx  
├── Groups.tsx
└── Expenses.tsx
```

### State Management
- **Authentication**: Use existing `useAuth()` hook
- **Application state**: Use Zustand stores
- **Server state**: Consider React Query for caching
- **Form state**: React Hook Form recommended

## 🚀 Ready for UI Development!

The backend is production-ready with:
- ✅ Authentication system working
- ✅ Database schema complete  
- ✅ Business logic implemented
- ✅ API services ready
- ✅ TypeScript types defined
- ✅ Error handling implemented

**Next step**: Choose a UI framework and start building beautiful interfaces! 🎨

---

## 📋 **Critical Context Files Reference**

### **🎯 For Project Understanding**
1. **CURRENT_STATUS.md** - Read FIRST for complete project state analysis
2. **PROJECT_TRACKER.md** - Executive dashboard with metrics and progress
3. **CONTEXT.md** - Deep technical architecture documentation

### **📝 For Task Management**  
4. **TASKS_BREAKDOWN.md** - Granular list of 156 specific tasks
5. **.taskmaster/tasks/tasks.json** - AI-generated core tasks (10 main tasks)
6. **ROADMAP_DETAILED.md** - Development phases and planning

### **🛠️ For Implementation**
7. **UI_DEVELOPMENT_GUIDE.md** - Step-by-step UI development guide
8. **TWEAKCN_UI_DESIGN_GUIDE.md** - Complete TweakCN visual design specs 🎨
9. **REGLAS.md** - Project rules and coding conventions
10. **README.md** - Main project documentation

### **📊 Usage Priority for Claude Sessions**
```
1. CLAUDE.md (this file) - Always loaded first
2. CURRENT_STATUS.md - Read for project state  
3. UI_DEVELOPMENT_GUIDE.md - Read for UI development tasks
4. TWEAKCN_UI_DESIGN_GUIDE.md - Read for visual design specs 🎨
5. CONTEXT.md - Read for backend understanding
6. .taskmaster/tasks/tasks.json - Read for AI-generated tasks
7. PROJECT_TRACKER.md - Read for metrics and progress
8. TASKS_BREAKDOWN.md - Read for granular task details
```

---

*This project uses modern React patterns and is ready for immediate UI development. All complex backend logic is handled - focus on creating an amazing user experience.*

**💡 Important**: All context files are interconnected and provide different views of the same project. Always read CURRENT_STATUS.md first to understand the current state before proceeding with any development tasks.