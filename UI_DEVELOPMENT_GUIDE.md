# DivCoins - UI Development Guide

## 🎯 Current Status

This project has a **fully functional backend** with authentication, database schema, and core business logic implemented. The UI has been **intentionally removed** to allow a fresh, modern interface to be built.

## 🏗️ What's Already Built

### ✅ Authentication System
- **Location**: `src/stores/authStore.ts`, `src/hooks/useAuth.ts`
- **Features**: Sign up, sign in, sign out, Google OAuth, password reset
- **Status**: ✅ Fully functional
- **Usage**: Import `useAuth()` hook for authentication state

### ✅ Database Schema (Supabase)
- **Users**: Complete user management
- **Relationships**: Groups (couples, roommates, friends, family)
- **Expenses**: Expense tracking with splits
- **Row Level Security**: Fully configured

### ✅ Backend Services
- **Location**: `src/services/`
- **relationshipService.ts**: Group management, member invitations
- **expenseService.ts**: Expense creation, splitting, debt calculation
- **Status**: ✅ Ready to use

### ✅ Core Infrastructure
- **Build system**: Vite + TypeScript working
- **CI/CD**: GitHub Actions + Vercel deployment
- **Environment**: Supabase configured and working

## 🎨 What Needs to be Built

### 1. **Authentication UI**
Create beautiful forms for:
- [ ] Login/Sign up forms
- [ ] Password reset flow
- [ ] Google OAuth button
- [ ] User profile management

**Hook to use**: `useAuth()` from `src/hooks/useAuth.ts`

### 2. **Dashboard**
Main application interface:
- [ ] Welcome screen
- [ ] Quick stats (total expenses, debts, etc.)
- [ ] Recent activity feed
- [ ] Quick action buttons

### 3. **Relationship Management**
Group management interface:
- [ ] Create new group form
- [ ] Group member list
- [ ] Invite members (email)
- [ ] Member role management
- [ ] Group settings

**Service to use**: `relationshipService` from `src/services/relationshipService.ts`

### 4. **Expense Management**
Core expense functionality:
- [ ] Add expense form
- [ ] Expense list/feed
- [ ] Expense splitting interface
- [ ] Receipt upload
- [ ] Expense categories
- [ ] Expense editing/deletion

**Service to use**: `expenseService` from `src/services/expenseService.ts`

### 5. **Debt Settlement**
Show who owes whom:
- [ ] Debt summary cards
- [ ] Settlement suggestions
- [ ] Mark debts as paid
- [ ] Settlement history

**Service method**: `expenseService.calculateDebts()`

### 6. **Reports & Analytics**
Data visualization:
- [ ] Spending charts
- [ ] Category breakdowns
- [ ] Monthly/yearly reports
- [ ] Export functionality

## 📁 Recommended Folder Structure

```
src/
├── components/
│   ├── ui/              # Base UI components (buttons, inputs, etc.)
│   ├── forms/           # Form components
│   ├── layout/          # Layout components (header, sidebar, etc.)
│   └── auth/            # Authentication components
├── pages/               # Page components
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   ├── Groups.tsx
│   ├── Expenses.tsx
│   └── Reports.tsx
├── hooks/               # Custom hooks
├── stores/              # State management (Zustand)
├── services/            # API services (✅ Already built)
├── types/               # TypeScript types
└── lib/                 # Utilities and configurations
```

## 🛠️ Technology Stack

### Core (Already Configured)
- **React 19** + **TypeScript** + **Vite**
- **Supabase** (Auth + Database + Storage)
- **Zustand** (State management)

### UI Framework (Choose One)
We recommend picking a modern UI framework:

#### Option 1: **Shadcn/ui + Tailwind CSS** (Recommended)
```bash
npx shadcn@latest init
npx shadcn@latest add button input card form
```

#### Option 2: **Chakra UI**
```bash
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

#### Option 3: **Mantine**
```bash
npm install @mantine/core @mantine/hooks
```

#### Option 4: **Ant Design**
```bash
npm install antd
```

## 🎯 Quick Start for UI Developer

### 1. Install UI Framework
Choose your preferred framework from above and install it.

### 2. Test Authentication
```typescript
import { useAuth } from './hooks/useAuth'

function TestAuth() {
  const { user, signIn, signOut, loading } = useAuth()
  
  if (loading) return <div>Loading...</div>
  if (user) return <div>Hello {user.email}! <button onClick={signOut}>Logout</button></div>
  
  return <button onClick={() => signIn('test@example.com', 'password')}>Login</button>
}
```

### 3. Test Backend Services
```typescript
import { relationshipService } from './services/relationshipService'
import { expenseService } from './services/expenseService'

// Create a group
const group = await relationshipService.createRelationship({
  name: 'My Roommates',
  type: 'roommates'
})

// Add an expense
const expense = await expenseService.createExpense({
  relationship_id: group.data.id,
  title: 'Groceries',
  amount: 50.00,
  category: 'Food',
  splits: [
    { user_id: 'user1', amount: 25.00 },
    { user_id: 'user2', amount: 25.00 }
  ]
})
```

## 🚀 Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🔑 Environment Variables

Create `.env.local`:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📱 Design Considerations

### User Experience
- **Mobile-first**: Design for mobile, enhance for desktop
- **Fast**: Optimize for performance and quick interactions
- **Intuitive**: Make expense splitting and debt calculation obvious
- **Accessible**: Follow WCAG 2.1 guidelines

### Key User Flows
1. **Onboarding**: Sign up → Create first group → Add first expense
2. **Daily use**: Open app → View dashboard → Add expense → Check debts
3. **Settlement**: View debts → Mark as paid → Update balances

### Visual Design
- **Clean and minimal**: Focus on functionality
- **Color coding**: Different colors for different expense categories
- **Data visualization**: Charts for spending patterns
- **Responsive**: Works on all screen sizes

## 🧪 Testing

The backend services are fully tested. For UI testing:
- Use React Testing Library for component tests
- Use Cypress or Playwright for E2E tests
- Test with real Supabase data (dev environment)

## 📞 Support

- **Authentication**: Check `useAuth()` hook implementation
- **Backend Services**: All methods have TypeScript types and error handling
- **Database**: Supabase dashboard for direct DB access
- **Deployment**: Automatic via Vercel on push to main

## 🎉 Ready to Start!

Everything is set up for you to focus on creating a beautiful, modern UI. The backend is solid, the authentication works, and the data flows are ready. Happy coding! 🚀