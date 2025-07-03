# 🎨 TweakCN UI Design Guide - DivCoins Implementation

## 📊 Overview

This document contains the complete visual design specification for DivCoins based on TweakCN theme analysis. The interface will have **professional fintech-grade consistency** using the exact color system, layouts, and component patterns from TweakCN.

---

## 🖼️ Source Analysis (4 TweakCN Screenshots)

### **Screenshot Analysis Summary**
- **Screenshot_1.png**: 🌙 Dark grid layout with multiple widget types
- **Screenshot_2.png**: ☀️ Light version of same grid layout  
- **Screenshot_3.png**: 🌙 Dark sidebar dashboard with area charts
- **Screenshot_4.png**: ☀️ Light version of sidebar dashboard

### **Key Visual Insights**
1. **Perfect theme consistency** between light/dark modes
2. **Two main layout patterns**: Grid dashboard + Sidebar dashboard
3. **Verde menta signature color** (`oklch(0.8663 0.1764 162.0517)`) works in both themes
4. **Professional spacing and typography** with Inter font
5. **Glassmorphism and clean cards** with subtle shadows

---

## 🎨 **Color System (Exact TweakCN Code)**

### **Complete CSS Variables**
```css
:root {
  /* LIGHT THEME VARIABLES */
  --background: oklch(1.0000 0 0);          /* Pure white */
  --foreground: oklch(0.3211 0 0);          /* Dark text */
  --card: oklch(1.0000 0 0);                /* White cards */
  --card-foreground: oklch(0.3211 0 0);     /* Dark card text */
  --popover: oklch(1.0000 0 0);             /* White popovers */
  --popover-foreground: oklch(0.3211 0 0);  /* Dark popover text */
  --primary: oklch(0.8663 0.1764 162.0517); /* Mint green signature */
  --primary-foreground: oklch(1.0000 0 0);  /* White on primary */
  --secondary: oklch(0.9706 0.0034 174.4833); /* Light secondary */
  --secondary-foreground: oklch(0.4770 0.0330 167.5385); /* Dark secondary text */
  --muted: oklch(0.9863 0.0025 165.0769);   /* Light muted */
  --muted-foreground: oklch(0.5809 0.0267 173.1755); /* Muted text */
  --accent: oklch(0.9705 0.0392 159.2739);  /* Light accent */
  --accent-foreground: oklch(0.5677 0.1033 170.5926); /* Accent text */
  --destructive: oklch(0.6955 0.2707 328.0110); /* Red destructive */
  --destructive-foreground: oklch(1.0000 0 0); /* White on destructive */
  --border: oklch(0.9349 0.0069 174.3698);  /* Subtle borders */
  --input: oklch(0.9349 0.0069 174.3698);   /* Input borders */
  --ring: oklch(0.8663 0.1764 162.0517);    /* Focus rings */
  
  /* CHART COLORS */
  --chart-1: oklch(0.8663 0.1764 162.0517); /* Primary chart color */
  --chart-2: oklch(0.8356 0.1700 164.9157); /* Secondary chart */
  --chart-3: oklch(0.7858 0.1541 168.4397); /* Tertiary chart */
  --chart-4: oklch(0.6743 0.1254 171.5792); /* Fourth chart */
  --chart-5: oklch(0.5677 0.1033 170.5926); /* Fifth chart */
  
  /* SIDEBAR COLORS */
  --sidebar: oklch(0.9863 0.0025 165.0769);
  --sidebar-foreground: oklch(0.3211 0 0);
  --sidebar-primary: oklch(0.8663 0.1764 162.0517);
  --sidebar-primary-foreground: oklch(1.0000 0 0);
  --sidebar-accent: oklch(0.9705 0.0392 159.2739);
  --sidebar-accent-foreground: oklch(0.5677 0.1033 170.5926);
  --sidebar-border: oklch(0.9349 0.0069 174.3698);
  --sidebar-ring: oklch(0.8663 0.1764 162.0517);
  
  /* TYPOGRAPHY */
  --font-sans: Inter, sans-serif;
  --font-serif: Source Serif 4, serif;
  --font-mono: JetBrains Mono, monospace;
  
  /* BORDER RADIUS */
  --radius: 0.375rem;
  
  /* SHADOWS */
  --shadow-2xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-sm: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow-md: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10);
  --shadow-lg: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10);
  --shadow-xl: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10);
  --shadow-2xl: 0 1px 3px 0px hsl(0 0% 0% / 0.25);
  
  --tracking-normal: 0em;
  --spacing: 0.25rem;
}

.dark {
  /* DARK THEME OVERRIDES */
  --background: oklch(0.2046 0 0);          /* Dark elegant background */
  --foreground: oklch(0.9219 0 0);          /* Light text */
  --card: oklch(0.2686 0 0);                /* Dark cards */
  --card-foreground: oklch(0.9219 0 0);     /* Light card text */
  --popover: oklch(0.2686 0 0);             /* Dark popovers */
  --popover-foreground: oklch(0.9219 0 0);  /* Light popover text */
  --primary: oklch(0.8663 0.1764 162.0517); /* SAME mint green */
  --primary-foreground: oklch(1.0000 0 0);  /* White on primary */
  --secondary: oklch(0.2686 0 0);           /* Dark secondary */
  --secondary-foreground: oklch(0.9219 0 0); /* Light secondary text */
  --muted: oklch(0.2686 0 0);               /* Dark muted */
  --muted-foreground: oklch(0.7155 0 0);    /* Muted text */
  --accent: oklch(0.5677 0.1033 170.5926);  /* Darker accent */
  --accent-foreground: oklch(0.9471 0.0737 165.7364); /* Light accent text */
  --destructive: oklch(0.6955 0.2707 328.0110); /* Same red */
  --destructive-foreground: oklch(1.0000 0 0); /* White on destructive */
  --border: oklch(0.3715 0 0);              /* Dark borders */
  --input: oklch(0.3715 0 0);               /* Dark input borders */
  --ring: oklch(0.8663 0.1764 162.0517);    /* Same focus rings */
  
  /* DARK CHART COLORS */
  --chart-1: oklch(0.8856 0.1633 160.6481);
  --chart-2: oklch(0.8663 0.1764 162.0517);
  --chart-3: oklch(0.8356 0.1700 164.9157);
  --chart-4: oklch(0.7858 0.1541 168.4397);
  --chart-5: oklch(0.6743 0.1254 171.5792);
  
  /* DARK SIDEBAR */
  --sidebar: oklch(0.2046 0 0);
  --sidebar-foreground: oklch(0.9219 0 0);
  --sidebar-primary: oklch(0.8663 0.1764 162.0517);
  --sidebar-primary-foreground: oklch(1.0000 0 0);
  --sidebar-accent: oklch(0.5677 0.1033 170.5926);
  --sidebar-accent-foreground: oklch(0.9471 0.0737 165.7364);
  --sidebar-border: oklch(0.3715 0 0);
  --sidebar-ring: oklch(0.8663 0.1764 162.0517);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-serif);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --shadow-2xs: var(--shadow-2xs);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow: var(--shadow);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
  --shadow-2xl: var(--shadow-2xl);
}
```

---

## 🏗️ **Layout Patterns**

### **1. Grid Dashboard Layout (Screenshots 1 & 2)**

#### **Visual Structure**
```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│ STAT CARD 1 │ STAT CARD 2 │    CALENDAR WIDGET        │
│ Total       │ Groups      │   📅 Date Selector        │
│ $2,847.50   │ 4 active    │   Month navigation         │
│ +12.5% ↗️   │ 12 users    │   Day selection           │
├─────────────┴─────────────┤                           │
│ DEBT SUMMARY CARD         │                           │
│ Balance overview          │                           │
│ Who owes whom            │                           │
├─────────────┬─────────────┼─────────────┬─────────────┤
│ QUICK       │ ANALYTICS   │ SAVINGS     │ TRENDS      │
│ ACTIONS     │ REPORTS     │ GOALS       │ CHARTS      │
│ [+ Create]  │ [View All]  │ Progress    │ Categories  │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

#### **CSS Grid Implementation**
```css
.grid-dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, minmax(120px, auto));
  gap: 1.5rem;
  padding: 1.5rem;
}

.stat-card {
  grid-column: span 1;
  grid-row: span 1;
}

.calendar-widget {
  grid-column: span 2;
  grid-row: span 2;
}

.debt-summary {
  grid-column: span 2;
  grid-row: span 1;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .grid-dashboard {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .stat-card,
  .calendar-widget,
  .debt-summary {
    grid-column: span 1;
    grid-row: span 1;
  }
}
```

### **2. Sidebar Dashboard Layout (Screenshots 3 & 4)**

#### **Visual Structure**
```
┌─ SIDEBAR ─┬─────────────── MAIN CONTENT ──────────────────┐
│ [+] Quick │ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐              │
│ Create    │ │Stat1│ │Stat2│ │Stat3│ │Stat4│              │
│           │ └─────┘ └─────┘ └─────┘ └─────┘              │
│ 🏠 *Dash  │                                              │
│ 💰 Gastos │ ┌─────────── LARGE CHART AREA ─────────────┐ │
│ 👥 Groups │ │  📊 Expense Timeline / Analytics          │ │
│ 📊 Debts  │ │  Area chart with gradient fill            │ │
│ 📋 Report │ │  Time period selectors                    │ │
│ ⚙️ Config │ └─────────────────────────────────────────┘ │
└───────────┤                                              │
            │ [Tabs] [Filters] [Actions]                   │
            └─────────────────────────────────────────────┘
```

#### **Layout Implementation**
```css
.sidebar-layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 256px;
  background: var(--sidebar);
  border-right: 1px solid var(--sidebar-border);
  flex-shrink: 0;
}

.main-content {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.chart-area {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  min-height: 400px;
}
```

---

## 📱 **DivCoins Specific Screens**

### **1. Main Dashboard (Grid Layout)**

#### **Component Mapping**
```typescript
// Grid layout for DivCoins dashboard
const DivCoinsDashboard = () => (
  <div className="grid-dashboard">
    {/* Top Row */}
    <ExpenseStatsCard 
      title="Total Gastos" 
      amount="$2,847.50" 
      change="+12.5%" 
      trend="up" 
    />
    <GroupStatsCard 
      title="Grupos Activos" 
      count={4} 
      members={12} 
      status="balanced" 
    />
    <CalendarWidget 
      selectedDate={selectedDate}
      onDateSelect={setSelectedDate}
      expensesByDate={expensesByDate}
    />
    
    {/* Middle Row */}
    <DebtSummaryCard 
      className="col-span-2"
      owedToYou={245.60}
      youOwe={178.40}
      netBalance={67.20}
    />
    <SavingsGoalCard 
      currentAmount={350}
      goalAmount={500}
      onGoalChange={setGoal}
    />
    
    {/* Bottom Row */}
    <QuickActionsCard />
    <AnalyticsCard />
    <TrendsCard />
  </div>
)
```

### **2. Expenses View (Sidebar Layout)**

#### **Component Structure**
```typescript
const ExpensesView = () => (
  <div className="sidebar-layout">
    <ExpensesSidebar />
    <main className="main-content">
      <div className="stats-row">
        <StatCard title="Este Mes" value="$1,247" />
        <StatCard title="Este Grupo" value="4 gastos" />
        <StatCard title="Pendientes" value="$523" />
        <StatCard title="Balanceado" value="✓" />
      </div>
      
      <div className="chart-area">
        <ExpenseTimeline 
          data={expenseData}
          period="30d"
          onPeriodChange={setPeriod}
        />
      </div>
      
      <ExpenseFilters />
    </main>
  </div>
)
```

### **3. Group Management (Grid Layout)**

#### **Group Cards Layout**
```typescript
const GroupsView = () => (
  <div className="grid-dashboard">
    {groups.map(group => (
      <GroupCard 
        key={group.id}
        name={group.name}
        members={group.members}
        totalSpent={group.totalSpent}
        balance={group.balance}
        icon={group.icon}
      />
    ))}
    <CreateGroupCard />
    
    <div className="col-span-4 chart-area">
      <GroupAnalytics data={groupData} />
    </div>
  </div>
)
```

---

## 🎨 **Component Design Specifications**

### **1. Stat Cards (Like Total Revenue)**

#### **Visual Design**
```typescript
interface StatCardProps {
  title: string
  value: string | number
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  chartData?: Array<{date: string, value: number}>
}

const StatCard = ({ title, value, change, trend, chartData }: StatCardProps) => (
  <Card className="p-6 hover:shadow-lg transition-all duration-200">
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
        {change && (
          <p className={`text-sm flex items-center gap-1 ${
            trend === 'up' ? 'text-primary' : 
            trend === 'down' ? 'text-destructive' : 
            'text-muted-foreground'
          }`}>
            {trend === 'up' && '↗️'}
            {trend === 'down' && '↘️'}
            {change}
          </p>
        )}
      </div>
      
      {chartData && (
        <div className="h-16 w-20">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="var(--primary)" 
                strokeWidth={2} 
                dot={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  </Card>
)
```

### **2. Calendar Widget (Like June 2025)**

#### **Implementation**
```typescript
const CalendarWidget = ({ selectedDate, onDateSelect, expensesByDate }) => (
  <Card className="p-6">
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Gastos por Fecha</h3>
        <div className="flex gap-1">
          <Button variant="outline" size="sm">
            ← 
          </Button>
          <Button variant="outline" size="sm">
            →
          </Button>
        </div>
      </div>
      
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onDateSelect}
        className="rounded-md border-0"
        classNames={{
          day_selected: "bg-primary text-primary-foreground hover:bg-primary/90",
          day_today: "bg-accent text-accent-foreground",
          day_has_expenses: "relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full"
        }}
        modifiers={{
          has_expenses: (date) => expensesByDate[format(date, 'yyyy-MM-dd')]?.length > 0
        }}
      />
    </div>
  </Card>
)
```

### **3. Debt Summary Card (Custom for DivCoins)**

#### **Design**
```typescript
const DebtSummaryCard = ({ owedToYou, youOwe, netBalance, className }) => (
  <Card className={`p-6 ${className}`}>
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">💸 Resumen de Deudas</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Te deben</p>
          <p className="text-2xl font-bold text-primary">
            ${owedToYou.toFixed(2)}
          </p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Debes</p>
          <p className="text-2xl font-bold text-destructive">
            ${youOwe.toFixed(2)}
          </p>
        </div>
      </div>
      
      <Separator />
      
      <div className="flex items-center justify-between">
        <span className="font-medium">Balance neto:</span>
        <span className={`text-xl font-bold ${
          netBalance > 0 ? 'text-primary' : 
          netBalance < 0 ? 'text-destructive' : 
          'text-muted-foreground'
        }`}>
          {netBalance > 0 && '+'}${netBalance.toFixed(2)}
          {netBalance > 0 && ' 💚'}
        </span>
      </div>
    </div>
  </Card>
)
```

### **4. Area Chart (Like Total Visitors)**

#### **Chart Implementation**
```typescript
const ExpenseChart = ({ data, period, onPeriodChange }) => (
  <div className="chart-area">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-xl font-semibold">Gastos Totales</h3>
        <p className="text-muted-foreground">
          Últimos {period === '7d' ? '7 días' : period === '30d' ? '30 días' : '3 meses'}
        </p>
      </div>
      
      <div className="flex gap-2">
        {['7d', '30d', '3m'].map(p => (
          <Button
            key={p}
            variant={period === p ? "default" : "outline"}
            size="sm"
            onClick={() => onPeriodChange(p)}
          >
            {p === '7d' ? 'Últimos 7 días' : 
             p === '30d' ? 'Últimos 30 días' : 
             'Últimos 3 meses'}
          </Button>
        ))}
      </div>
    </div>
    
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop 
                offset="0%" 
                stopColor="var(--primary)" 
                stopOpacity={0.3} 
              />
              <stop 
                offset="100%" 
                stopColor="var(--primary)" 
                stopOpacity={0} 
              />
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis 
            dataKey="date" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            formatter={(value) => [`$${value}`, 'Gastos']}
            labelStyle={{ color: 'var(--foreground)' }}
            contentStyle={{ 
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)'
            }}
          />
          
          <Area
            type="monotone"
            dataKey="amount"
            stroke="var(--primary)"
            strokeWidth={2}
            fill="url(#expenseGradient)"
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
)
```

---

## 🚀 **Implementation Commands**

### **1. Install TweakCN Theme**
```bash
# Install the exact theme from TweakCN
npx shadcn@latest add https://tweakcn.com/r/themes/cmcn33f7p000g04l5adx140nw
```

### **2. Required Components**
```bash
# Core UI components
npx shadcn@latest add button card input form
npx shadcn@latest add calendar badge separator
npx shadcn@latest add sidebar navigation-menu
npx shadcn@latest add tabs switch tooltip

# Additional components for charts
npm install recharts
```

### **3. CSS Setup**
```css
/* Add to src/index.css - EXACT TweakCN code above */
```

### **4. Theme Provider Setup**
```typescript
// src/components/ThemeProvider.tsx
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

const ThemeProviderContext = createContext<{
  theme: Theme
  setTheme: (theme: Theme) => void
}>({
  theme: "system",
  setTheme: () => null,
})

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  ...props
}) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")
  return context
}
```

---

## 🎯 **Development Phases**

### **Phase 1: Setup & Theme (Week 1)**
1. ✅ Apply TweakCN CSS variables
2. ✅ Install required shadcn/ui components
3. ✅ Setup theme provider and toggle
4. ✅ Create base layout components

### **Phase 2: Grid Dashboard (Week 2)**
1. 🔲 Implement grid layout structure
2. 🔲 Create stat cards with charts
3. 🔲 Build calendar widget
4. 🔲 Design debt summary card
5. 🔲 Add responsive breakpoints

### **Phase 3: Sidebar Dashboard (Week 3)**
1. 🔲 Build sidebar navigation
2. 🔲 Create main content area
3. 🔲 Implement large area charts
4. 🔲 Add filtering and tabs
5. 🔲 Mobile optimization

### **Phase 4: DivCoins Features (Week 4)**
1. 🔲 Expense management UI
2. 🔲 Group management interface
3. 🔲 Debt calculation views
4. 🔲 Settings and preferences
5. 🔲 Final polish and animations

---

## 📱 **Mobile Responsive Strategy**

### **Breakpoints**
```css
/* Mobile First Approach */
.responsive-grid {
  /* Mobile: Stack everything */
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  /* Tablet: 2 columns */
  .responsive-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }
}

@media (min-width: 1024px) {
  /* Desktop: 4 columns */
  .responsive-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
}
```

### **Mobile Navigation**
```typescript
// Bottom navigation for mobile
const MobileNavigation = () => (
  <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 md:hidden">
    <div className="flex justify-around">
      <NavItem icon="🏠" label="Inicio" />
      <NavItem icon="💰" label="Gastos" />
      <NavItem icon="👥" label="Grupos" />
      <NavItem icon="📊" label="Reportes" />
    </div>
  </div>
)
```

---

## 🎨 **Visual Consistency Rules**

### **1. Spacing System**
- **Micro spacing**: 0.25rem (4px)
- **Small spacing**: 0.5rem (8px) 
- **Medium spacing**: 1rem (16px)
- **Large spacing**: 1.5rem (24px)
- **XL spacing**: 2rem (32px)

### **2. Typography Scale**
- **H1**: 2rem (32px) - font-weight: 700
- **H2**: 1.5rem (24px) - font-weight: 600
- **H3**: 1.25rem (20px) - font-weight: 600
- **Body**: 1rem (16px) - font-weight: 400
- **Small**: 0.875rem (14px) - font-weight: 400
- **Caption**: 0.75rem (12px) - font-weight: 500

### **3. Border Radius System**
- **Small**: 6px (buttons, inputs)
- **Medium**: 8px (cards, smaller elements)
- **Large**: 12px (modals, large cards)
- **XL**: 16px (major containers)

### **4. Shadow Levels**
- **Level 1**: Subtle hover effects
- **Level 2**: Card elevation
- **Level 3**: Modal/popover shadows
- **Colored**: Primary color shadows for focus states

---

## 🚀 **Final Result**

Following this guide will create a DivCoins interface that is **visually identical** to TweakCN's professional standard:

- ✅ **Perfect theme consistency** between light/dark modes
- ✅ **Professional fintech appearance** with mint green signature color
- ✅ **Two flexible layouts** (grid dashboard + sidebar views)
- ✅ **Responsive design** that works on all devices
- ✅ **Smooth animations** and micro-interactions
- ✅ **Accessible components** with proper ARIA labels
- ✅ **Type-safe implementation** with TypeScript

The result will be a **production-ready expense sharing application** with the same visual quality as leading fintech products.