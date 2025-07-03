import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'

export function Dashboard() {
  // Datos de ejemplo para el dashboard
  const stats = [
    { title: "Total Gastos", value: "$3,247.80", change: "+12.5%", trend: "up" },
    { title: "Grupos Activos", value: "6", change: "+2", trend: "up" },
    { title: "Balance Neto", value: "+$127.50", change: "-$23.10", trend: "down" },
    { title: "Transacciones", value: "47", change: "+8", trend: "up" }
  ]

  const recentExpenses = [
    { title: "Cena Restaurante", amount: "$85.40", group: "Amigos", date: "Hace 2 horas" },
    { title: "Supermercado", amount: "$156.90", group: "Familia", date: "Ayer" },
    { title: "Gasolina", amount: "$45.00", group: "Trabajo", date: "Hace 2 días" },
    { title: "Cine", amount: "$28.50", group: "Pareja", date: "Hace 3 días" }
  ]

  const chartData = [
    { name: "Ene", value: 1200 },
    { name: "Feb", value: 1890 },
    { name: "Mar", value: 1567 },
    { name: "Abr", value: 2340 },
    { name: "May", value: 2100 },
    { name: "Jun", value: 2800 }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">DivCoins Dashboard</h1>
              <p className="text-muted-foreground">Gestiona tus gastos compartidos</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">📊 Reportes</Button>
              <Button>+ Nuevo Gasto</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardDescription className="text-sm">{stat.title}</CardDescription>
                <CardTitle className="text-2xl font-bold">{stat.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1">
                  <span className={`text-sm ${stat.trend === 'up' ? 'text-primary' : 'text-destructive'}`}>
                    {stat.trend === 'up' ? '↗️' : '↘️'} {stat.change}
                  </span>
                  <span className="text-xs text-muted-foreground">vs mes anterior</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Gastos por Mes</CardTitle>
              <CardDescription>Evolución de gastos en los últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-2 px-4">
                {chartData.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full bg-primary rounded-t-sm relative"
                      style={{ height: `${(item.value / 3000) * 100}%`, minHeight: '20px' }}
                    >
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
                        ${item.value}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Expenses */}
          <Card>
            <CardHeader>
              <CardTitle>Gastos Recientes</CardTitle>
              <CardDescription>Últimas transacciones registradas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentExpenses.map((expense, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{expense.title}</h4>
                        <span className="font-bold text-primary">{expense.amount}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                          {expense.group}
                        </span>
                        <span className="text-xs text-muted-foreground">{expense.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Groups Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Grupos Activos</CardTitle>
              <CardDescription>Resumen de tus grupos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Familia", members: 4, balance: "+$45.20" },
                  { name: "Amigos", members: 6, balance: "-$12.80" },
                  { name: "Trabajo", members: 3, balance: "+$89.40" },
                  { name: "Viaje", members: 8, balance: "+$156.70" }
                ].map((group, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded border">
                    <div>
                      <div className="font-medium">{group.name}</div>
                      <div className="text-sm text-muted-foreground">{group.members} miembros</div>
                    </div>
                    <div className={`font-semibold ${group.balance.startsWith('+') ? 'text-primary' : 'text-destructive'}`}>
                      {group.balance}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Por Categoría</CardTitle>
              <CardDescription>Gastos del mes actual</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { category: "Restaurantes", amount: "$489.50", percentage: 35 },
                  { category: "Supermercado", amount: "$356.80", percentage: 25 },
                  { category: "Transporte", amount: "$234.20", percentage: 17 },
                  { category: "Entretenimiento", amount: "$178.90", percentage: 13 },
                  { category: "Otros", amount: "$145.60", percentage: 10 }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.category}</span>
                      <span className="font-medium">{item.amount}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
              <CardDescription>Tareas pendientes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  💰 Registrar Gasto
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  👥 Crear Grupo
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  📱 Invitar Amigos
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  ⚖️ Saldar Cuentas
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  📊 Ver Reportes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}