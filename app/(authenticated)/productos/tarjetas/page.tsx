"use client"

import { CreditCard, DollarSign, TrendingUp, Shield, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { getCardsStats, mockCards, cardStatusNames } from "@/lib/mock-data/cards-data"

export default function TarjetasPage() {
  const stats = getCardsStats()

  const cardTiers = [
    {
      tier: "Clásica",
      count: stats.classicCards,
      percentage: (stats.classicCards / stats.total) * 100,
      color: "bg-gray-100 text-gray-800",
      icon: CreditCard,
      benefits: ["Sin cuota anual", "Retiros en cajeros", "Compras en línea"],
      cashback: "0.5%",
    },
    {
      tier: "Gold",
      count: stats.goldCards,
      percentage: (stats.goldCards / stats.total) * 100,
      color: "bg-yellow-100 text-yellow-800",
      icon: TrendingUp,
      benefits: ["Cashback 2%", "Acceso a salas VIP", "Seguros de viaje"],
      cashback: "2.0%",
    },
    {
      tier: "Platinum",
      count: stats.platinumCards,
      percentage: (stats.platinumCards / stats.total) * 100,
      color: "bg-purple-100 text-purple-800",
      icon: Shield,
      benefits: ["Cashback 3%", "Concierge 24/7", "Seguro premium"],
      cashback: "3.0%",
    },
    {
      tier: "Black",
      count: stats.blackCards,
      percentage: (stats.blackCards / stats.total) * 100,
      color: "bg-slate-100 text-slate-800",
      icon: Shield,
      benefits: ["Cashback 5%", "Servicio personalizado", "Beneficios exclusivos"],
      cashback: "5.0%",
    },
  ]

  const recentCards = mockCards.slice(0, 5).map((card) => ({
    id: card.id,
    customer: card.customerName,
    cardNumber: card.cardNumber,
    type: card.type === "debit" ? "Débito" : "Crédito",
    tier: card.tier,
    status: card.status,
    issued: card.issuedDate,
    limit: card.type === "credit" ? card.creditLimit : card.balance,
  }))

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      active: "bg-green-100 text-green-800",
      blocked: "bg-red-100 text-red-800",
      expired: "bg-gray-100 text-gray-800",
      pending: "bg-yellow-100 text-yellow-800",
    }
    return (
      <Badge className={`${variants[status]} border-0`}>
        {cardStatusNames[status as keyof typeof cardStatusNames]}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <CreditCard className="h-8 w-8" style={{ color: "#0095A9" }} />
          <h1 className="text-3xl font-bold text-gray-900">
            Tarjetas
          </h1>
        </div>
        <p className="text-gray-600">
          Gestiona las tarjetas de débito y crédito de los clientes
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Tarjetas
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {stats.total.toLocaleString()}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {stats.active} activas
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Débito vs Crédito
              </p>
              <h3 className="text-xl font-bold text-gray-900 mt-1">
                {stats.debitCards} / {stats.creditCards}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {((stats.debitCards / stats.total) * 100).toFixed(0)}% débito
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
                Límite Total Crédito
              </p>
              <h3 className="text-xl font-bold text-gray-900 mt-1">
                RD$ {(stats.totalCreditLimit / 1000000).toFixed(1)}M
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Disponible: RD$ {(stats.totalAvailableCredit / 1000000).toFixed(1)}M
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
                Gasto Mensual
              </p>
              <h3 className="text-xl font-bold text-gray-900 mt-1">
                RD$ {(stats.totalMonthlySpending / 1000000).toFixed(1)}M
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {stats.blocked} bloqueadas
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Card Tiers */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Categorías de Tarjetas
        </h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {cardTiers.map((cardTier, index) => {
            const Icon = cardTier.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 ${cardTier.color} rounded-lg`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Tarjeta {cardTier.tier}</CardTitle>
                        <CardDescription className="text-sm mt-1">
                          Cashback: {cardTier.cashback}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Tarjetas activas:</span>
                      <span className="font-semibold">{cardTier.count}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Distribución</span>
                        <span className="font-semibold">{cardTier.percentage.toFixed(1)}%</span>
                      </div>
                      <Progress value={cardTier.percentage} className="h-2" />
                    </div>
                    <div className="border-t pt-3">
                      <p className="text-xs text-gray-600 mb-2">Beneficios:</p>
                      <ul className="space-y-1">
                        {cardTier.benefits.map((benefit, i) => (
                          <li key={i} className="text-xs text-gray-700 flex items-center gap-2">
                            <div className="h-1.5 w-1.5 bg-green-500 rounded-full" />
                            {benefit}
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

      {/* Recent Cards */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tarjetas Recientes</CardTitle>
              <CardDescription>
                Últimas tarjetas emitidas
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Ver todas
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentCards.map((card) => (
              <div
                key={card.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{card.customer}</h4>
                    <p className="text-sm text-gray-500">
                      {card.cardNumber} • {card.type} {card.tier.charAt(0).toUpperCase() + card.tier.slice(1)}
                    </p>
                    <p className="text-xs text-gray-400">
                      Emitida: {new Date(card.issued).toLocaleDateString("es-DO")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="mb-2">
                    {getStatusBadge(card.status)}
                  </div>
                  <p className="font-bold text-gray-900 text-sm">
                    RD$ {card.limit?.toLocaleString("es-DO")}
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
            <CardTitle className="text-base">Tarjetas Bloqueadas</CardTitle>
            <CardDescription className="text-sm">
              Requieren atención inmediata
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold text-red-600">
                {stats.blocked}
              </h3>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tarjetas Expiradas</CardTitle>
            <CardDescription className="text-sm">
              Pendientes de renovación
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold text-gray-600">
                {stats.expired}
              </h3>
              <CreditCard className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Balance en Débito</CardTitle>
            <CardDescription className="text-sm">
              Total en tarjetas de débito
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-green-600">
                RD$ {(stats.totalDebitBalance / 1000000).toFixed(1)}M
              </h3>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
