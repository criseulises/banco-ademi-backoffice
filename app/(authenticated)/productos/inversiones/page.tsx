"use client"

import { TrendingUp, DollarSign, PieChart, Shield, BarChart3, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { getInvestmentsStats, mockInvestments, investmentStatusNames, riskLevelNames } from "@/lib/mock-data/investments-data"

export default function InversionesPage() {
  const stats = getInvestmentsStats()

  const investmentTypes = [
    {
      type: "Depósito a Plazo",
      count: stats.fixedDeposits,
      percentage: (stats.fixedDeposits / stats.total) * 100,
      color: "bg-green-100 text-green-800",
      icon: Shield,
      features: ["Garantizado", "5-8% anual", "3-36 meses"],
      riskLevel: "Bajo",
    },
    {
      type: "Fondos Mutuos",
      count: stats.mutualFunds,
      percentage: (stats.mutualFunds / stats.total) * 100,
      color: "bg-blue-100 text-blue-800",
      icon: PieChart,
      features: ["Diversificado", "6-14% anual", "Sin plazo fijo"],
      riskLevel: "Medio",
    },
    {
      type: "Bonos",
      count: stats.bonds,
      percentage: (stats.bonds / stats.total) * 100,
      color: "bg-purple-100 text-purple-800",
      icon: BarChart3,
      features: ["Ingreso fijo", "4-8% anual", "1-5 años"],
      riskLevel: "Bajo",
    },
    {
      type: "Acciones",
      count: stats.stocks,
      percentage: (stats.stocks / stats.total) * 100,
      color: "bg-orange-100 text-orange-800",
      icon: TrendingUp,
      features: ["Alto potencial", "Variable", "Sin plazo fijo"],
      riskLevel: "Alto",
    },
  ]

  const recentInvestments = mockInvestments.slice(0, 5).map((inv) => ({
    id: inv.id,
    customer: inv.customerName,
    type: inv.type,
    principal: inv.principal,
    currentValue: inv.currentValue,
    returnRate: inv.returnRate,
    status: inv.status,
    riskLevel: inv.riskLevel,
    startDate: inv.startDate,
  }))

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      active: "bg-green-100 text-green-800",
      matured: "bg-gray-100 text-gray-800",
      cancelled: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
    }
    return (
      <Badge className={`${variants[status]} border-0`}>
        {investmentStatusNames[status as keyof typeof investmentStatusNames]}
      </Badge>
    )
  }

  const getRiskBadge = (risk: string) => {
    const variants: Record<string, string> = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800",
    }
    return (
      <Badge className={`${variants[risk]} border-0 text-xs`}>
        Riesgo {riskLevelNames[risk as keyof typeof riskLevelNames]}
      </Badge>
    )
  }

  const getTypeName = (type: string) => {
    const names: Record<string, string> = {
      fixed_deposit: "Depósito a Plazo",
      mutual_fund: "Fondo Mutuo",
      bonds: "Bonos",
      stocks: "Acciones",
    }
    return names[type] || type
  }

  const totalGain = stats.totalCurrentValue - stats.totalPrincipal
  const gainPercentage = (totalGain / stats.totalPrincipal) * 100

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="h-8 w-8" style={{ color: "#0095A9" }} />
          <h1 className="text-3xl font-bold text-gray-900">
            Inversiones
          </h1>
        </div>
        <p className="text-gray-600">
          Gestiona el portafolio de inversiones de los clientes
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Inversiones
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {stats.total.toLocaleString()}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {stats.active} activas
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Capital Invertido
              </p>
              <h3 className="text-xl font-bold text-gray-900 mt-1">
                RD$ {(stats.totalPrincipal / 1000000).toFixed(1)}M
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Principal total
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
                Valor Actual
              </p>
              <h3 className="text-xl font-bold text-gray-900 mt-1">
                RD$ {(stats.totalCurrentValue / 1000000).toFixed(1)}M
              </h3>
              <p className={`text-xs mt-1 ${totalGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalGain >= 0 ? '+' : ''}{gainPercentage.toFixed(2)}%
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Retornos Totales
              </p>
              <h3 className="text-xl font-bold text-green-600 mt-1">
                RD$ {(stats.totalReturns / 1000000).toFixed(1)}M
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Tasa prom: {stats.avgReturnRate.toFixed(2)}%
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Investment Types */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Tipos de Inversión
        </h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {investmentTypes.map((invType, index) => {
            const Icon = invType.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 ${invType.color} rounded-lg`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{invType.type}</CardTitle>
                        <CardDescription className="text-sm mt-1">
                          Riesgo: {invType.riskLevel}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Inversiones activas:</span>
                      <span className="font-semibold">{invType.count}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Distribución</span>
                        <span className="font-semibold">{invType.percentage.toFixed(1)}%</span>
                      </div>
                      <Progress value={invType.percentage} className="h-2" />
                    </div>
                    <div className="border-t pt-3">
                      <p className="text-xs text-gray-600 mb-2">Características:</p>
                      <ul className="space-y-1">
                        {invType.features.map((feature, i) => (
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

      {/* Recent Investments */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Inversiones Recientes</CardTitle>
              <CardDescription>
                Últimas inversiones realizadas
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Ver todas
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentInvestments.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{inv.customer}</h4>
                    <p className="text-sm text-gray-500">
                      {inv.id} • {getTypeName(inv.type)}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {getRiskBadge(inv.riskLevel)}
                      <p className="text-xs text-gray-400">
                        {new Date(inv.startDate).toLocaleDateString("es-DO")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="mb-2">
                    {getStatusBadge(inv.status)}
                  </div>
                  <p className="font-bold text-gray-900">
                    RD$ {inv.currentValue.toLocaleString("es-DO")}
                  </p>
                  <p className={`text-xs ${inv.currentValue >= inv.principal ? 'text-green-600' : 'text-red-600'}`}>
                    {inv.currentValue >= inv.principal ? '+' : ''}
                    {((inv.currentValue - inv.principal) / inv.principal * 100).toFixed(2)}%
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

      {/* Risk Distribution */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Riesgo Bajo</CardTitle>
            <CardDescription className="text-sm">
              Inversiones conservadoras
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold text-green-600">
                {stats.lowRisk}
              </h3>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {((stats.lowRisk / stats.total) * 100).toFixed(1)}% del total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Riesgo Medio</CardTitle>
            <CardDescription className="text-sm">
              Inversiones balanceadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold text-yellow-600">
                {stats.mediumRisk}
              </h3>
              <PieChart className="h-8 w-8 text-yellow-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {((stats.mediumRisk / stats.total) * 100).toFixed(1)}% del total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Riesgo Alto</CardTitle>
            <CardDescription className="text-sm">
              Inversiones agresivas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold text-red-600">
                {stats.highRisk}
              </h3>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {((stats.highRisk / stats.total) * 100).toFixed(1)}% del total
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
