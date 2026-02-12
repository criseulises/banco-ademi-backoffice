"use client"

import { Clock, AlertCircle, CheckCircle, XCircle, User, DollarSign } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockTransactions, transactionTypeNames } from "@/lib/mock-data/transactions-data"
import { toast } from "sonner"

export default function PendientesAprobacionPage() {
  // Filter transactions that need approval (pending and in_review)
  const pendingTransactions = mockTransactions.filter(
    (t) => t.status === "pending" || t.status === "in_review"
  )

  // Group by status
  const pendingOnly = pendingTransactions.filter((t) => t.status === "pending")
  const inReview = pendingTransactions.filter((t) => t.status === "in_review")

  // High value transactions (>100K)
  const highValuePending = pendingTransactions.filter((t) => t.amount > 100000)

  const handleApprove = (id: string) => {
    toast.success(`Transacción ${id} aprobada exitosamente`)
  }

  const handleReject = (id: string) => {
    toast.error(`Transacción ${id} rechazada`)
  }

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
    if (status === "pending") {
      return <Badge className="bg-yellow-100 text-yellow-800 border-0">Pendiente</Badge>
    }
    return <Badge className="bg-blue-100 text-blue-800 border-0">En Revisión</Badge>
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return `Hace ${diffInMinutes}m`
    }
    if (diffInHours < 24) {
      return `Hace ${diffInHours}h`
    }
    const diffInDays = Math.floor(diffInHours / 24)
    return `Hace ${diffInDays}d`
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Clock className="h-8 w-8" style={{ color: "#0095A9" }} />
          <h1 className="text-3xl font-bold text-gray-900">
            Pendientes de Aprobación
          </h1>
        </div>
        <p className="text-gray-600">
          Transacciones que requieren revisión y aprobación manual
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Pendientes
              </p>
              <h3 className="text-2xl font-bold text-yellow-600 mt-1">
                {pendingTransactions.length}
              </h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                En Revisión
              </p>
              <h3 className="text-2xl font-bold text-blue-600 mt-1">
                {inReview.length}
              </h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Alto Valor
              </p>
              <h3 className="text-2xl font-bold text-orange-600 mt-1">
                {highValuePending.length}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                &gt; RD$ 100K
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Monto Total
              </p>
              <h3 className="text-lg font-bold text-gray-900 mt-1">
                RD$ {pendingTransactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString("es-DO")}
              </h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Alert for high priority */}
      {highValuePending.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <div>
              <h4 className="font-semibold text-orange-900">
                Transacciones de Alto Valor Pendientes
              </h4>
              <p className="text-sm text-orange-700">
                Hay {highValuePending.length} transacciones mayores a RD$ 100,000 esperando aprobación
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Pending Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>Transacciones Pendientes</CardTitle>
          <CardDescription>
            Requieren aprobación inmediata
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingTransactions.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">
                  No hay transacciones pendientes
                </h3>
                <p className="text-sm text-gray-600">
                  Todas las transacciones han sido procesadas
                </p>
              </div>
            ) : (
              pendingTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">
                          {transaction.description}
                        </h4>
                        {getStatusBadge(transaction.status)}
                        {getTypeBadge(transaction.type)}
                        {transaction.amount > 100000 && (
                          <Badge className="bg-orange-100 text-orange-800 border-0 text-xs">
                            Alto Valor
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{transaction.customerName}</span>
                        </div>
                        <span>•</span>
                        <span>ID: {transaction.id}</span>
                        <span>•</span>
                        <span>{formatTimeAgo(transaction.createdAt)}</span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Método: {transaction.paymentMethod === "bank_transfer" ? "Transferencia Bancaria" :
                                transaction.paymentMethod === "credit_card" ? "Tarjeta de Crédito" :
                                transaction.paymentMethod === "debit_card" ? "Tarjeta de Débito" :
                                transaction.paymentMethod === "cash" ? "Efectivo" : "Digital Wallet"}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-2xl font-bold text-gray-900 mb-3">
                        RD$ {transaction.amount.toLocaleString("es-DO")}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReject(transaction.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Rechazar
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleApprove(transaction.id)}
                          style={{ backgroundColor: "#0095A9" }}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Aprobar
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="mt-3 pt-3 border-t grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-gray-500">Fecha:</span>
                      <p className="font-medium text-gray-900">
                        {new Date(transaction.createdAt).toLocaleDateString("es-DO", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Referencia:</span>
                      <p className="font-medium text-gray-900">{transaction.reference}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Usuario:</span>
                      <p className="font-medium text-gray-900">{transaction.customerId}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {pendingTransactions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Acciones en Lote</CardTitle>
            <CardDescription>
              Procesar múltiples transacciones simultáneamente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => toast.success("Todas las transacciones han sido aprobadas")}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Aprobar Todas
              </Button>
              <Button
                variant="outline"
                className="text-red-600 hover:text-red-700"
                onClick={() => toast.error("Todas las transacciones han sido rechazadas")}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Rechazar Todas
              </Button>
              <Button variant="outline">
                Exportar Lista
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
