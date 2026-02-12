"use client"

import { Wallet, TrendingUp, Users, DollarSign, CreditCard } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function CuentasPage() {
  const accountsStats = {
    total: 1247,
    savings: 856,
    checking: 321,
    premium: 54,
    business: 16,
    totalBalance: 45678900.50,
    averageBalance: 36621.15,
  }

  const accountTypes = [
    {
      type: "Cuenta de Ahorros",
      count: 856,
      percentage: 68.6,
      balance: 28450000,
      color: "bg-green-100 text-green-800",
      icon: Wallet,
      rate: "3.5% anual",
      features: ["Sin cargo mensual", "Retiros ilimitados", "Banca en línea"],
    },
    {
      type: "Cuenta Corriente",
      count: 321,
      percentage: 25.7,
      balance: 12340000,
      color: "bg-blue-100 text-blue-800",
      icon: CreditCard,
      rate: "0% rendimiento",
      features: ["Chequera incluida", "Sobregiro disponible", "Transferencias gratis"],
    },
    {
      type: "Cuenta Premium",
      count: 54,
      percentage: 4.3,
      balance: 4120000,
      color: "bg-purple-100 text-purple-800",
      icon: TrendingUp,
      rate: "5.0% anual",
      features: ["Asesor personal", "Tarjeta premium", "Seguros incluidos"],
    },
    {
      type: "Cuenta Empresarial",
      count: 16,
      percentage: 1.3,
      balance: 768900.50,
      color: "bg-orange-100 text-orange-800",
      icon: Users,
      rate: "2.5% anual",
      features: ["Múltiples usuarios", "API integration", "Reportes detallados"],
    },
  ]

  const recentAccounts = [
    { id: "ACC-2401", customer: "María González", type: "Ahorros", balance: 45000, opened: "2024-02-10" },
    { id: "ACC-2402", customer: "Juan Pérez", type: "Corriente", balance: 25000, opened: "2024-02-09" },
    { id: "ACC-2403", customer: "Ana Rodríguez", type: "Premium", balance: 150000, opened: "2024-02-08" },
    { id: "ACC-2404", customer: "Carlos Martínez", type: "Empresarial", balance: 500000, opened: "2024-02-07" },
    { id: "ACC-2405", customer: "Laura Sánchez", type: "Ahorros", balance: 32000, opened: "2024-02-06" },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Wallet className="h-8 w-8" style={{ color: "#0095A9" }} />
          <h1 className="text-3xl font-bold text-gray-900">
            Cuentas Bancarias
          </h1>
        </div>
        <p className="text-gray-600">
          Gestiona las cuentas bancarias de todos los clientes
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Cuentas
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {accountsStats.total.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Wallet className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Balance Total
              </p>
              <h3 className="text-xl font-bold text-gray-900 mt-1">
                RD$ {(accountsStats.totalBalance / 1000000).toFixed(1)}M
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Promedio: RD$ {(accountsStats.averageBalance / 1000).toFixed(0)}K
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Más Popular
              </p>
              <h3 className="text-xl font-bold text-gray-900 mt-1">
                Ahorros
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {accountsStats.savings} cuentas
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Nuevas Hoy
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                12
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                +8% vs ayer
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Account Types */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Tipos de Cuenta
        </h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {accountTypes.map((account, index) => {
            const Icon = account.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 ${account.color} rounded-lg`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{account.type}</CardTitle>
                        <CardDescription className="text-sm mt-1">
                          Tasa: {account.rate}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Cuentas activas:</span>
                      <span className="font-semibold">{account.count}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Distribución</span>
                        <span className="font-semibold">{account.percentage}%</span>
                      </div>
                      <Progress value={account.percentage} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Balance total:</span>
                      <span className="font-semibold">
                        RD$ {(account.balance / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="border-t pt-3">
                      <p className="text-xs text-gray-600 mb-2">Características:</p>
                      <ul className="space-y-1">
                        {account.features.map((feature, i) => (
                          <li key={i} className="text-xs text-gray-700 flex items-center gap-2">
                            <div className="h-1.5 w-1.5 bg-green-500 rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Recent Accounts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Cuentas Recientes</CardTitle>
              <CardDescription>
                Últimas cuentas abiertas
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Ver todas
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAccounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Wallet className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{account.customer}</h4>
                    <p className="text-sm text-gray-500">
                      {account.id} • {account.type}
                    </p>
                    <p className="text-xs text-gray-400">
                      Apertura: {new Date(account.opened).toLocaleDateString("es-DO")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    RD$ {account.balance.toLocaleString("es-DO")}
                  </p>
                  <Button variant="ghost" size="sm" className="mt-1">
                    Ver detalles
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
