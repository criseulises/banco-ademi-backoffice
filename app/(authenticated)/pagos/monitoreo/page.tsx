"use client"

import { useState } from "react"
import { Activity, DollarSign, CheckCircle, Clock, XCircle, AlertTriangle, TrendingUp, FileCheck, Building2, CreditCard } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  mockVendorPayments,
  getPaymentsByStatus,
  paymentStatusNames,
  getVendorsStats
} from "@/lib/mock-data/vendors-data"
import { toast } from "sonner"

export default function MonitoreoPage() {
  const [selectedPayment, setSelectedPayment] = useState<any>(null)
  const [openReceiptDialog, setOpenReceiptDialog] = useState(false)

  const stats = getVendorsStats()

  const recentPayments = mockVendorPayments.slice(0, 15)

  // Calculate payment trends
  const thisMonthPayments = mockVendorPayments.filter((p) => {
    const paymentDate = new Date(p.dueDate)
    const now = new Date()
    return (
      paymentDate.getMonth() === now.getMonth() &&
      paymentDate.getFullYear() === now.getFullYear()
    )
  })

  const paidThisMonth = thisMonthPayments.filter((p) => p.status === "paid")
  const totalPaidThisMonth = paidThisMonth.reduce((sum, p) => sum + p.amount, 0)

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      paid: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      overdue: "bg-red-100 text-red-800",
      cancelled: "bg-gray-100 text-gray-800",
    }
    const icons: Record<string, React.ReactNode> = {
      paid: <CheckCircle className="h-3 w-3 mr-1" />,
      pending: <Clock className="h-3 w-3 mr-1" />,
      overdue: <AlertTriangle className="h-3 w-3 mr-1" />,
      cancelled: <XCircle className="h-3 w-3 mr-1" />,
    }
    return (
      <Badge className={`${variants[status]} border-0 flex items-center w-fit`}>
        {icons[status]}
        {paymentStatusNames[status as keyof typeof paymentStatusNames]}
      </Badge>
    )
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) {
      return "Hoy"
    } else if (diffInDays === 1) {
      return "Ayer"
    } else if (diffInDays < 7) {
      return `Hace ${diffInDays}d`
    } else if (diffInDays < 30) {
      return `Hace ${Math.floor(diffInDays / 7)}sem`
    } else {
      return date.toLocaleDateString("es-DO", { day: "2-digit", month: "short" })
    }
  }

  const getDaysUntilDue = (dueDateString: string) => {
    const dueDate = new Date(dueDateString)
    const now = new Date()
    const diffInDays = Math.floor((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return diffInDays
  }

  const getPaymentPriority = (payment: any) => {
    const daysUntilDue = getDaysUntilDue(payment.dueDate)

    if (payment.status === "overdue") {
      return { level: "critical", label: "Urgente", color: "text-red-600" }
    } else if (payment.status === "pending" && daysUntilDue <= 3) {
      return { level: "high", label: "Alta", color: "text-orange-600" }
    } else if (payment.status === "pending" && daysUntilDue <= 7) {
      return { level: "medium", label: "Media", color: "text-yellow-600" }
    }
    return { level: "low", label: "Baja", color: "text-gray-600" }
  }

  const handleViewReceipt = (payment: any) => {
    setSelectedPayment(payment)
    setOpenReceiptDialog(true)
  }

  const handlePayNow = (payment: any) => {
    toast.success("💰 Pago procesado", {
      description: `Pago de RD$ ${payment.amount.toLocaleString("es-DO")} a ${payment.vendorName} registrado exitosamente`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Monitoreo de Pagos
        </h1>
        <p className="text-gray-600 mt-1">
          Seguimiento en tiempo real de pagos a proveedores
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Pagados
              </p>
              <h3 className="text-2xl font-bold text-green-600 mt-1">
                {getPaymentsByStatus("paid").length}
              </h3>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Pendientes
              </p>
              <h3 className="text-2xl font-bold text-yellow-600 mt-1">
                {stats.pendingCount}
              </h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Vencidos
              </p>
              <h3 className="text-2xl font-bold text-red-600 mt-1">
                {stats.overdueCount}
              </h3>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Este Mes
              </p>
              <h3 className="text-xl font-bold text-gray-900 mt-1">
                RD$ {(totalPaidThisMonth / 1000000).toFixed(2)}M
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {paidThisMonth.length} pagos
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {mockVendorPayments.length}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                transacciones
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {stats.overdueCount > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <div>
              <h4 className="font-semibold text-red-900">
                Pagos Vencidos Pendientes
              </h4>
              <p className="text-sm text-red-700">
                Hay {stats.overdueCount} pagos vencidos por un total de RD$ {(stats.totalOverdue / 1000).toFixed(0)}K
                que requieren atención inmediata
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recent Payments Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>
                Últimos pagos y transacciones
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Exportar Reporte
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentPayments.map((payment) => {
              const priority = getPaymentPriority(payment)
              const daysUntilDue = getDaysUntilDue(payment.dueDate)

              return (
                <div
                  key={payment.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">
                          {payment.vendorName}
                        </h4>
                        {getStatusBadge(payment.status)}
                        {payment.status !== "paid" && payment.status !== "cancelled" && (
                          <Badge className={`border-0 ${priority.color} bg-transparent px-0`}>
                            Prioridad {priority.label}
                          </Badge>
                        )}
                      </div>

                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Concepto: {payment.concept}</p>
                        <div className="flex items-center gap-4">
                          <span>Factura: {payment.invoiceNumber}</span>
                          <span>•</span>
                          <span>Método: {payment.paymentMethod}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span>
                            Vencimiento:{" "}
                            {new Date(payment.dueDate).toLocaleDateString("es-DO", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                          {payment.status === "pending" && daysUntilDue >= 0 && (
                            <>
                              <span>•</span>
                              <span className={daysUntilDue <= 3 ? "text-orange-600 font-medium" : ""}>
                                {daysUntilDue === 0
                                  ? "Vence hoy"
                                  : daysUntilDue === 1
                                  ? "Vence mañana"
                                  : `${daysUntilDue} días restantes`}
                              </span>
                            </>
                          )}
                          {payment.status === "overdue" && (
                            <>
                              <span>•</span>
                              <span className="text-red-600 font-medium">
                                Vencido hace {Math.abs(daysUntilDue)} días
                              </span>
                            </>
                          )}
                        </div>
                        {payment.paidDate && (
                          <p className="text-green-600">
                            Pagado: {new Date(payment.paidDate).toLocaleDateString("es-DO", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-right ml-4">
                      <p className="text-2xl font-bold text-gray-900 mb-3">
                        RD$ {payment.amount.toLocaleString("es-DO")}
                      </p>
                      {payment.status === "pending" || payment.status === "overdue" ? (
                        <Button 
                          size="sm" 
                          style={{ backgroundColor: "#0095A9" }}
                          onClick={() => handlePayNow(payment)}
                        >
                          Pagar Ahora
                        </Button>
                      ) : payment.status === "paid" ? (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewReceipt(payment)}
                        >
                          Ver Recibo
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Payment Trends */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tasa de Pago a Tiempo</CardTitle>
            <CardDescription>
              Porcentaje de pagos puntuales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-4xl font-bold text-green-600">
                {Math.round(
                  (getPaymentsByStatus("paid").length /
                    (mockVendorPayments.length - getPaymentsByStatus("cancelled").length)) *
                    100
                )}%
              </h3>
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Excelente historial de pagos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Próximos 7 Días</CardTitle>
            <CardDescription>
              Pagos que vencen esta semana
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-4xl font-bold text-orange-600">
                {
                  mockVendorPayments.filter((p) => {
                    const days = getDaysUntilDue(p.dueDate)
                    return days >= 0 && days <= 7 && p.status === "pending"
                  }).length
                }
              </h3>
              <Clock className="h-10 w-10 text-orange-600" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Requieren planificación
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Promedio de Pago</CardTitle>
            <CardDescription>
              Monto promedio por transacción
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold text-blue-600">
                RD$ {(
                  mockVendorPayments.reduce((sum, p) => sum + p.amount, 0) /
                  mockVendorPayments.length /
                  1000
                ).toFixed(0)}K
              </h3>
              <DollarSign className="h-10 w-10 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Por transacción
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Receipt Dialog */}
      <Dialog open={openReceiptDialog} onOpenChange={setOpenReceiptDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Recibo de Pago</DialogTitle>
            <DialogDescription>
              Comprobante de transacción completada
            </DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-6 py-4">
              {/* Receipt Header */}
              <div className="text-center border-b pb-4">
                <div className="inline-flex p-3 bg-green-100 rounded-full mb-3">
                  <FileCheck className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Pago Exitoso</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  RD$ {selectedPayment.amount.toLocaleString("es-DO")}
                </p>
                <Badge className="bg-green-100 text-green-800 border-0 mt-2">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Pagado
                </Badge>
              </div>

              {/* Payment Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-gray-600">Número de Recibo</p>
                  <p className="font-semibold text-gray-900">{selectedPayment.invoiceNumber}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-600">Fecha de Pago</p>
                  <p className="font-semibold text-gray-900">
                    {selectedPayment.paidDate
                      ? new Date(selectedPayment.paidDate).toLocaleDateString("es-DO", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-600">Proveedor</p>
                  <p className="font-semibold text-gray-900">{selectedPayment.vendorName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-600">Método de Pago</p>
                  <p className="font-semibold text-gray-900">{selectedPayment.paymentMethod}</p>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Concepto</span>
                  <span className="text-sm font-medium text-gray-900">{selectedPayment.concept}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Factura</span>
                  <span className="text-sm font-medium text-gray-900">{selectedPayment.invoiceNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Fecha de Vencimiento</span>
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(selectedPayment.dueDate).toLocaleDateString("es-DO", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="text-base font-semibold text-gray-900">Total Pagado</span>
                  <span className="text-base font-bold text-green-600">
                    RD$ {selectedPayment.amount.toLocaleString("es-DO")}
                  </span>
                </div>
              </div>

              {/* Receipt Footer */}
              <div className="border-t pt-4 text-center text-xs text-gray-500">
                <p>Este es un comprobante digital generado automáticamente</p>
                <p className="mt-1">
                  Generado el {new Date().toLocaleDateString("es-DO", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })} a las {new Date().toLocaleTimeString("es-DO", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => setOpenReceiptDialog(false)}
                  className="w-full sm:w-auto"
                >
                  Cerrar
                </Button>
                <Button
                  style={{ backgroundColor: "#0095A9" }}
                  onClick={() => {
                    toast.success("📄 Recibo descargado", {
                      description: "El recibo se ha descargado exitosamente",
                    })
                  }}
                  className="w-full sm:w-auto"
                >
                  Descargar PDF
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
