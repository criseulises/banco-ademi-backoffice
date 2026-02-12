"use client"

import { Banknote, DollarSign, TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { getLoansStats, mockLoans, loanStatusNames } from "@/lib/mock-data/loans-data"

export default function PrestamosPage() {
  const stats = getLoansStats()

  const loanTypes = [
    {
      type: "Personal",
      count: stats.personalLoans,
      percentage: (stats.personalLoans / stats.total) * 100,
      color: "bg-blue-100 text-blue-800",
      icon: Banknote,
      features: ["Hasta RD$ 500K", "12-60 meses", "Aprobación rápida"],
      avgRate: "15%",
    },
    {
      type: "Hipotecario",
      count: stats.mortgageLoans,
      percentage: (stats.mortgageLoans / stats.total) * 100,
      color: "bg-green-100 text-green-800",
      icon: TrendingUp,
      features: ["Hasta RD$ 6M", "10-30 años", "Tasa preferencial"],
      avgRate: "7.5%",
    },
    {
      type: "Automotriz",
      count: stats.autoLoans,
      percentage: (stats.autoLoans / stats.total) * 100,
      color: "bg-purple-100 text-purple-800",
      icon: Banknote,
      features: ["Hasta RD$ 2M", "3-7 años", "Sin inicial"],
      avgRate: "10.5%",
    },
    {
      type: "Empresarial",
      count: stats.businessLoans,
      percentage: (stats.businessLoans / stats.total) * 100,
      color: "bg-orange-100 text-orange-800",
      icon: TrendingUp,
      features: ["Hasta RD$ 3M", "1-6 años", "Tasas competitivas"],
      avgRate: "12%",
    },
  ]

  const recentLoans = mockLoans.slice(0, 5).map((loan) => ({
    id: loan.id,
    customer: loan.customerName,
    type: loan.type,
    amount: loan.amount,
    status: loan.status,
    monthlyPayment: loan.monthlyPayment,
    remainingBalance: loan.remainingBalance,
    startDate: loan.startDate,
  }))

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-blue-100 text-blue-800",
      rejected: "bg-red-100 text-red-800",
      paid_off: "bg-gray-100 text-gray-800",
      defaulted: "bg-red-100 text-red-800",
    }
    return (
      <Badge className={`${variants[status]} border-0`}>
        {loanStatusNames[status as keyof typeof loanStatusNames]}
      </Badge>
    )
  }

  const getTypeName = (type: string) => {
    const names: Record<string, string> = {
      personal: "Personal",
      mortgage: "Hipotecario",
      auto: "Automotriz",
      business: "Empresarial",
    }
    return names[type] || type
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Banknote className="h-8 w-8" style={{ color: "#0095A9" }} />
          <h1 className="text-3xl font-bold text-gray-900">
            Préstamos
          </h1>
        </div>
        <p className="text-gray-600">
          Gestiona la cartera de préstamos del banco
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Préstamos
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {stats.total.toLocaleString()}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {stats.active} activos
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Banknote className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Cartera Total
              </p>
              <h3 className="text-xl font-bold text-gray-900 mt-1">
                RD$ {(stats.totalOutstanding / 1000000).toFixed(1)}M
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Desembolsado: RD$ {(stats.totalDisbursed / 1000000).toFixed(1)}M
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
                Pago Mensual Esperado
              </p>
              <h3 className="text-xl font-bold text-gray-900 mt-1">
                RD$ {(stats.monthlyPaymentsDue / 1000000).toFixed(1)}M
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Recaudado: RD$ {(stats.totalCollected / 1000000).toFixed(1)}M
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
                En Mora
              </p>
              <h3 className="text-2xl font-bold text-red-600 mt-1">
                {stats.defaulted}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                RD$ {(stats.totalDefaulted / 1000000).toFixed(1)}M pendiente
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Loan Types */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Tipos de Préstamo
        </h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {loanTypes.map((loanType, index) => {
            const Icon = loanType.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 ${loanType.color} rounded-lg`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Préstamo {loanType.type}</CardTitle>
                        <CardDescription className="text-sm mt-1">
                          Tasa promedio: {loanType.avgRate}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Préstamos activos:</span>
                      <span className="font-semibold">{loanType.count}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Distribución</span>
                        <span className="font-semibold">{loanType.percentage.toFixed(1)}%</span>
                      </div>
                      <Progress value={loanType.percentage} className="h-2" />
                    </div>
                    <div className="border-t pt-3">
                      <p className="text-xs text-gray-600 mb-2">Características:</p>
                      <ul className="space-y-1">
                        {loanType.features.map((feature, i) => (
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

      {/* Recent Loans */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Préstamos Recientes</CardTitle>
              <CardDescription>
                Últimos préstamos otorgados
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Ver todos
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentLoans.map((loan) => (
              <div
                key={loan.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Banknote className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{loan.customer}</h4>
                    <p className="text-sm text-gray-500">
                      {loan.id} • {getTypeName(loan.type)}
                    </p>
                    <p className="text-xs text-gray-400">
                      Inicio: {new Date(loan.startDate).toLocaleDateString("es-DO")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="mb-2">
                    {getStatusBadge(loan.status)}
                  </div>
                  <p className="font-bold text-gray-900">
                    RD$ {loan.amount.toLocaleString("es-DO")}
                  </p>
                  <p className="text-xs text-gray-500">
                    Mensual: RD$ {loan.monthlyPayment.toLocaleString("es-DO")}
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

      {/* Quick Stats */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pendientes de Aprobación</CardTitle>
            <CardDescription className="text-sm">
              Solicitudes en revisión
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold text-yellow-600">
                {stats.pending}
              </h3>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Préstamos Pagados</CardTitle>
            <CardDescription className="text-sm">
              Completados exitosamente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold text-green-600">
                {stats.paidOff}
              </h3>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tasa de Aprobación</CardTitle>
            <CardDescription className="text-sm">
              Ratio aprobados vs rechazados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold text-blue-600">
                {stats.approved + stats.rejected > 0
                  ? Math.round((stats.approved / (stats.approved + stats.rejected)) * 100)
                  : 0}%
              </h3>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
