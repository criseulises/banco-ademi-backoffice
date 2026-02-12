"use client"

import { XCircle, AlertTriangle, DollarSign, TrendingDown, RefreshCw, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockTransactions, transactionTypeNames } from "@/lib/mock-data/transactions-data"
import { toast } from "sonner"

export default function FallidasCanceladasPage() {
  // Filter failed and cancelled transactions
  const failedTransactions = mockTransactions.filter(
    (t) => t.status === "failed" || t.status === "cancelled"
  )

  const failedOnly = failedTransactions.filter((t) => t.status === "failed")
  const cancelledOnly = failedTransactions.filter((t) => t.status === "cancelled")

  // Calculate totals
  const totalFailedAmount = failedOnly.reduce((sum, t) => sum + t.amount, 0)
  const totalCancelledAmount = cancelledOnly.reduce((sum, t) => sum + t.amount, 0)

  // Group by failure reason (mock reasons)
  const failureReasons = [
    { reason: "Fondos insuficientes", count: Math.floor(failedOnly.length * 0.4) },
    { reason: "Error de red", count: Math.floor(failedOnly.length * 0.25) },
    { reason: "Tarjeta expirada", count: Math.floor(failedOnly.length * 0.2) },
    { reason: "Límite excedido", count: Math.floor(failedOnly.length * 0.15) },
  ]

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      transfer: "bg-blue-100 text-blue-800",
      payment: "bg-green-100 text-green-800",
      recharge: "bg-purple-100 text-purple-800",
      loan_payment: "bg-orange-100 text-orange-800",
      withdrawal: "bg-red-100 text-red-800",
      deposit: "bg-teal-100 text-teal-800",
      tax_payment: "bg-gray-100 text-gray-800",
    }
    return (
      <Badge className={`${colors[type] || "bg-gray-100 text-gray-800"} border-0 text-xs`}>
        {transactionTypeNames[type as keyof typeof transactionTypeNames]}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    if (status === "failed") {
      return (
        <Badge className="bg-red-100 text-red-800 border-0">
          <XCircle className="h-3 w-3 mr-1" />
          Fallida
        </Badge>
      )
    }
    return (
      <Badge className="bg-gray-100 text-gray-800 border-0">
        Cancelada
      </Badge>
    )
  }

  const getRandomFailureReason = () => {
    const reasons = [
      "Fondos insuficientes",
      "Error de red",
      "Tarjeta expirada",
      "Límite excedido",
      "Transacción duplicada",
      "Cuenta bloqueada",
    ]
    return reasons[Math.floor(Math.random() * reasons.length)]
  }

  const handleRetry = (id: string) => {
    toast.success(`Reintentando transacción ${id}`)
  }

  const handleRefund = (id: string) => {
    toast.success(`Reembolso iniciado para transacción ${id}`)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <XCircle className="h-8 w-8" style={{ color: "#DC2626" }} />
          <h1 className="text-3xl font-bold text-gray-900">
            Fallidas y Canceladas
          </h1>
        </div>
        <p className="text-gray-600">
          Transacciones que no se completaron exitosamente
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Fallidas
              </p>
              <h3 className="text-2xl font-bold text-red-600 mt-1">
                {failedOnly.length}
              </h3>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Canceladas
              </p>
              <h3 className="text-2xl font-bold text-gray-600 mt-1">
                {cancelledOnly.length}
              </h3>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Monto Fallido
              </p>
              <h3 className="text-lg font-bold text-red-600 mt-1">
                RD$ {(totalFailedAmount / 1000).toFixed(0)}K
              </h3>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Monto Cancelado
              </p>
              <h3 className="text-lg font-bold text-gray-600 mt-1">
                RD$ {(totalCancelledAmount / 1000).toFixed(0)}K
              </h3>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Failure Reasons */}
      <Card>
        <CardHeader>
          <CardTitle>Razones de Falla</CardTitle>
          <CardDescription>
            Análisis de las causas principales de transacciones fallidas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {failureReasons.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.reason}</p>
                    <p className="text-xs text-gray-500">
                      {((item.count / failedOnly.length) * 100).toFixed(1)}% del total
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{item.count}</p>
                  <p className="text-xs text-gray-500">transacciones</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Failed Transactions List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Listado de Transacciones</CardTitle>
              <CardDescription>
                Todas las transacciones fallidas y canceladas
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Exportar Reporte
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {failedTransactions.length === 0 ? (
              <div className="text-center py-12">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <XCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  No hay transacciones fallidas
                </h3>
                <p className="text-sm text-gray-600">
                  Todas las transacciones se han procesado correctamente
                </p>
              </div>
            ) : (
              failedTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">
                          {transaction.description}
                        </h4>
                        {getStatusBadge(transaction.status)}
                        {getTypeBadge(transaction.type)}
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Cliente: {transaction.customerName}</p>
                        <p>ID: {transaction.id} • Ref: {transaction.reference}</p>
                        <p>
                          Fecha: {new Date(transaction.createdAt).toLocaleDateString("es-DO", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        {transaction.status === "failed" && (
                          <div className="flex items-center gap-2 mt-2">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <span className="text-red-600 font-medium">
                              Razón: {getRandomFailureReason()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-xl font-bold text-gray-900 mb-3">
                        RD$ {transaction.amount.toLocaleString("es-DO")}
                      </p>
                      <div className="flex flex-col gap-2">
                        {transaction.status === "failed" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRetry(transaction.id)}
                          >
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Reintentar
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRefund(transaction.id)}
                          className="text-blue-600"
                        >
                          Reembolsar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tasa de Fallas</CardTitle>
            <CardDescription>
              Porcentaje de transacciones fallidas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-4xl font-bold text-red-600">
                {((failedOnly.length / mockTransactions.length) * 100).toFixed(1)}%
              </h3>
              <TrendingDown className="h-10 w-10 text-red-600" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {failedOnly.length} de {mockTransactions.length} transacciones totales
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Impacto Financiero</CardTitle>
            <CardDescription>
              Monto total no procesado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold text-gray-900">
                RD$ {((totalFailedAmount + totalCancelledAmount) / 1000000).toFixed(2)}M
              </h3>
              <DollarSign className="h-10 w-10 text-gray-600" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Total combinado de fallidas y canceladas
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
