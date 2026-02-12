"use client"

import { useState } from "react"
import { FileCheck, CheckCircle, XCircle, AlertCircle, Download, Upload, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  mockVendorPayments,
  getPaymentsByStatus,
} from "@/lib/mock-data/vendors-data"
import { toast } from "sonner"

type ReconciliationStatus = "matched" | "unmatched" | "discrepancy" | "pending_review"

interface ReconciliationRecord {
  id: string
  paymentId: string
  vendorName: string
  bankAmount: number
  systemAmount: number
  status: ReconciliationStatus
  date: string
  reference: string
  difference: number
}

export default function ConciliacionPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))

  // Generate mock reconciliation data
  const generateReconciliationRecords = (): ReconciliationRecord[] => {
    const paidPayments = getPaymentsByStatus("paid")

    return paidPayments.slice(0, 20).map((payment) => {
      const random = Math.random()
      let status: ReconciliationStatus
      let bankAmount = payment.amount

      if (random > 0.9) {
        // 10% unmatched
        status = "unmatched"
        bankAmount = 0
      } else if (random > 0.8) {
        // 10% discrepancy
        status = "discrepancy"
        bankAmount = payment.amount + (Math.random() - 0.5) * 1000
      } else if (random > 0.7) {
        // 10% pending review
        status = "pending_review"
      } else {
        // 70% matched
        status = "matched"
      }

      return {
        id: `REC-${payment.id}`,
        paymentId: payment.id,
        vendorName: payment.vendorName,
        bankAmount,
        systemAmount: payment.amount,
        status,
        date: payment.paidDate || payment.dueDate,
        reference: payment.invoiceNumber,
        difference: Math.abs(bankAmount - payment.amount),
      }
    })
  }

  const reconciliationRecords = generateReconciliationRecords()

  const matchedRecords = reconciliationRecords.filter((r) => r.status === "matched")
  const unmatchedRecords = reconciliationRecords.filter((r) => r.status === "unmatched")
  const discrepancyRecords = reconciliationRecords.filter((r) => r.status === "discrepancy")
  const pendingRecords = reconciliationRecords.filter((r) => r.status === "pending_review")

  const totalBankAmount = reconciliationRecords.reduce((sum, r) => sum + r.bankAmount, 0)
  const totalSystemAmount = reconciliationRecords.reduce((sum, r) => sum + r.systemAmount, 0)
  const totalDifference = Math.abs(totalBankAmount - totalSystemAmount)

  const getStatusBadge = (status: ReconciliationStatus) => {
    const variants: Record<ReconciliationStatus, { color: string; label: string; icon: React.ReactNode }> = {
      matched: {
        color: "bg-green-100 text-green-800",
        label: "Conciliado",
        icon: <CheckCircle className="h-3 w-3 mr-1" />,
      },
      unmatched: {
        color: "bg-red-100 text-red-800",
        label: "No Conciliado",
        icon: <XCircle className="h-3 w-3 mr-1" />,
      },
      discrepancy: {
        color: "bg-orange-100 text-orange-800",
        label: "Discrepancia",
        icon: <AlertCircle className="h-3 w-3 mr-1" />,
      },
      pending_review: {
        color: "bg-yellow-100 text-yellow-800",
        label: "Pendiente Revisión",
        icon: <AlertCircle className="h-3 w-3 mr-1" />,
      },
    }

    const config = variants[status]
    return (
      <Badge className={`${config.color} border-0 flex items-center w-fit`}>
        {config.icon}
        {config.label}
      </Badge>
    )
  }

  const handleImportBankStatement = () => {
    toast.success("Estado de cuenta bancario importado exitosamente")
  }

  const handleRunReconciliation = () => {
    toast.info("Ejecutando proceso de conciliación automática...")
    setTimeout(() => {
      toast.success("Conciliación completada")
    }, 2000)
  }

  const handleResolveDiscrepancy = (id: string) => {
    toast.success(`Discrepancia ${id} marcada como resuelta`)
  }

  const handleInvestigate = (record: ReconciliationRecord) => {
    toast.info("🔍 Investigación iniciada", {
      description: `Se está investigando el registro ${record.id} de ${record.vendorName}`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Conciliación Bancaria
        </h1>
        <p className="text-gray-600 mt-1">
          Compara y reconcilia pagos del sistema con extractos bancarios
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Conciliados
              </p>
              <h3 className="text-2xl font-bold text-green-600 mt-1">
                {matchedRecords.length}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {((matchedRecords.length / reconciliationRecords.length) * 100).toFixed(0)}% del total
              </p>
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
                No Conciliados
              </p>
              <h3 className="text-2xl font-bold text-red-600 mt-1">
                {unmatchedRecords.length}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Requieren atención
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Discrepancias
              </p>
              <h3 className="text-2xl font-bold text-orange-600 mt-1">
                {discrepancyRecords.length}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                RD$ {(discrepancyRecords.reduce((sum, r) => sum + r.difference, 0) / 1000).toFixed(0)}K diferencia
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-orange-600" />
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
                {pendingRecords.length}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                En revisión
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones de Conciliación</CardTitle>
          <CardDescription>
            Importa extractos bancarios y ejecuta la conciliación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2 w-full sm:w-64">
              <Label htmlFor="month">Período de Conciliación</Label>
              <Input
                id="month"
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="h-10"
              />
            </div>
            <div className="space-y-2 w-full sm:w-64">
              <Label>Estado de Cuenta</Label>
              <Button 
                variant="outline" 
                onClick={handleImportBankStatement}
                className="w-full justify-start h-10"
              >
                <Upload className="h-4 w-4 mr-2" />
                Importar Archivo
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Button onClick={handleRunReconciliation} style={{ backgroundColor: "#0095A9" }}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Ejecutar Conciliación
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar Reporte
            </Button>
            <Button variant="outline">
              Ver Historial
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Comparison */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Total Sistema</CardTitle>
            <CardDescription>
              Pagos registrados en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl font-bold text-gray-900">
              RD$ {(totalSystemAmount / 1000000).toFixed(2)}M
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {reconciliationRecords.length} registros
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Total Banco</CardTitle>
            <CardDescription>
              Movimientos en estado de cuenta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl font-bold text-gray-900">
              RD$ {(totalBankAmount / 1000000).toFixed(2)}M
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Extracto bancario
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Diferencia Total</CardTitle>
            <CardDescription>
              Monto por conciliar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className={`text-3xl font-bold ${totalDifference > 1000 ? "text-red-600" : "text-green-600"}`}>
              RD$ {(totalDifference / 1000).toFixed(0)}K
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {totalDifference > 1000 ? "Requiere revisión" : "Dentro del margen"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Reconciliation Records */}
      <Card>
        <CardHeader>
          <CardTitle>Registros de Conciliación</CardTitle>
          <CardDescription>
            Comparación detallada de transacciones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reconciliationRecords.map((record) => (
              <div
                key={record.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {record.vendorName}
                      </h4>
                      {getStatusBadge(record.status)}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-gray-600">Referencia</p>
                        <p className="font-medium text-gray-900">{record.reference}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Fecha</p>
                        <p className="font-medium text-gray-900">
                          {new Date(record.date).toLocaleDateString("es-DO", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Monto Sistema</p>
                        <p className="font-medium text-blue-600">
                          RD$ {record.systemAmount.toLocaleString("es-DO")}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Monto Banco</p>
                        <p className={`font-medium ${record.bankAmount === 0 ? "text-red-600" : "text-green-600"}`}>
                          {record.bankAmount === 0
                            ? "No encontrado"
                            : `RD$ ${record.bankAmount.toLocaleString("es-DO")}`}
                        </p>
                      </div>
                    </div>

                    {record.difference > 0 && record.status === "discrepancy" && (
                      <div className="mt-2 p-2 bg-orange-50 rounded text-sm text-orange-800">
                        <AlertCircle className="h-4 w-4 inline mr-1" />
                        Diferencia de RD$ {record.difference.toLocaleString("es-DO")}
                      </div>
                    )}
                  </div>

                  <div className="ml-4">
                    {record.status === "matched" ? (
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    ) : record.status === "unmatched" ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleInvestigate(record)}
                      >
                        Investigar
                      </Button>
                    ) : record.status === "discrepancy" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleResolveDiscrepancy(record.id)}
                      >
                        Resolver
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm">
                        Revisar
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Health Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Métricas de Salud</CardTitle>
          <CardDescription>
            Indicadores de calidad de conciliación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Tasa de Conciliación
                </span>
                <span className="text-sm font-bold text-green-600">
                  {((matchedRecords.length / reconciliationRecords.length) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-600 h-3 rounded-full"
                  style={{
                    width: `${(matchedRecords.length / reconciliationRecords.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Precisión (sin discrepancias)
                </span>
                <span className="text-sm font-bold text-blue-600">
                  {(
                    ((reconciliationRecords.length - discrepancyRecords.length) /
                      reconciliationRecords.length) *
                    100
                  ).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full"
                  style={{
                    width: `${
                      ((reconciliationRecords.length - discrepancyRecords.length) /
                        reconciliationRecords.length) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
