"use client"

import { Building2, DollarSign, FileText, TrendingUp, UserPlus, Phone, Mail } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  mockVendors,
  getVendorsStats,
  vendorTypeNames,
  vendorStatusNames,
  getPaymentsByVendorId
} from "@/lib/mock-data/vendors-data"

export default function ProveedoresPage() {
  const stats = getVendorsStats()

  const vendorTypes = [
    {
      type: "Procesadores de Pago",
      count: stats.paymentProcessors,
      percentage: (stats.paymentProcessors / stats.totalVendors) * 100,
      color: "bg-blue-100 text-blue-800",
      icon: DollarSign,
    },
    {
      type: "Software",
      count: stats.softwareProviders,
      percentage: (stats.softwareProviders / stats.totalVendors) * 100,
      color: "bg-purple-100 text-purple-800",
      icon: FileText,
    },
    {
      type: "Servicios",
      count: stats.serviceProviders,
      percentage: (stats.serviceProviders / stats.totalVendors) * 100,
      color: "bg-green-100 text-green-800",
      icon: Building2,
    },
    {
      type: "Infraestructura",
      count: stats.infrastructureProviders,
      percentage: (stats.infrastructureProviders / stats.totalVendors) * 100,
      color: "bg-orange-100 text-orange-800",
      icon: TrendingUp,
    },
  ]

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      pending: "bg-yellow-100 text-yellow-800",
      suspended: "bg-red-100 text-red-800",
    }
    return (
      <Badge className={`${variants[status]} border-0`}>
        {vendorStatusNames[status as keyof typeof vendorStatusNames]}
      </Badge>
    )
  }

  const getTypeBadge = (type: string) => {
    const variants: Record<string, string> = {
      payment_processor: "bg-blue-100 text-blue-800",
      software_provider: "bg-purple-100 text-purple-800",
      service_provider: "bg-green-100 text-green-800",
      infrastructure: "bg-orange-100 text-orange-800",
    }
    return (
      <Badge className={`${variants[type]} border-0 text-xs`}>
        {vendorTypeNames[type as keyof typeof vendorTypeNames]}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Building2 className="h-8 w-8" style={{ color: "#0095A9" }} />
          <h1 className="text-3xl font-bold text-gray-900">
            Proveedores
          </h1>
        </div>
        <p className="text-gray-600">
          Gestiona los proveedores y sus contratos
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Proveedores
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {stats.totalVendors}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {stats.activeVendors} activos
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Building2 className="h-6 w-6 text-blue-600" />
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
                RD$ {(stats.totalMonthlyAmount / 1000000).toFixed(2)}M
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Comprometido
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
                Total Pagado
              </p>
              <h3 className="text-xl font-bold text-gray-900 mt-1">
                RD$ {(stats.totalPaid / 1000000).toFixed(1)}M
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Este año
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
                Pagos Pendientes
              </p>
              <h3 className="text-2xl font-bold text-yellow-600 mt-1">
                {stats.pendingCount}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                RD$ {(stats.totalPending / 1000).toFixed(0)}K
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <FileText className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Vendor Types Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Distribución por Tipo</CardTitle>
          <CardDescription>
            Categorías de proveedores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {vendorTypes.map((vendorType, index) => {
              const Icon = vendorType.icon
              return (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 ${vendorType.color} rounded-lg`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600">
                        {vendorType.type}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {vendorType.count}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-full"
                      style={{ width: `${vendorType.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {vendorType.percentage.toFixed(0)}% del total
                  </p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Vendors List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Listado de Proveedores</CardTitle>
              <CardDescription>
                Todos los proveedores registrados
              </CardDescription>
            </div>
            <Button size="sm" style={{ backgroundColor: "#0095A9" }}>
              <UserPlus className="h-4 w-4 mr-2" />
              Nuevo Proveedor
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockVendors.map((vendor) => {
              const vendorPayments = getPaymentsByVendorId(vendor.id)
              const paidPayments = vendorPayments.filter((p) => p.status === "paid")

              return (
                <div
                  key={vendor.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Building2 className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {vendor.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {vendor.id} • RNC: {vendor.rnc}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        {getStatusBadge(vendor.status)}
                        {getTypeBadge(vendor.type)}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{vendor.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{vendor.phone}</span>
                        </div>
                      </div>

                      <div className="border-t pt-3">
                        <p className="text-xs text-gray-600 mb-2">Servicios:</p>
                        <div className="flex flex-wrap gap-1">
                          {vendor.services.map((service, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="text-right ml-4">
                      <div className="mb-4">
                        <p className="text-xs text-gray-600">Pago Mensual</p>
                        <p className="text-2xl font-bold text-gray-900">
                          RD$ {vendor.monthlyAmount.toLocaleString("es-DO")}
                        </p>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-xs text-gray-600">Total Pagado</p>
                          <p className="font-semibold text-green-600">
                            RD$ {(vendor.totalPaid / 1000000).toFixed(2)}M
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Próximo Pago</p>
                          <p className="font-medium text-gray-900">
                            {vendor.nextPaymentDate
                              ? new Date(vendor.nextPaymentDate).toLocaleDateString("es-DO")
                              : "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          Ver Detalle
                        </Button>
                        <Button size="sm" style={{ backgroundColor: "#0095A9" }}>
                          Pagar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pagos Vencidos</CardTitle>
            <CardDescription>
              Facturas que requieren atención
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-bold text-red-600">
                  {stats.overdueCount}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  RD$ {(stats.totalOverdue / 1000).toFixed(0)}K en total
                </p>
              </div>
              <FileText className="h-10 w-10 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Términos de Pago</CardTitle>
            <CardDescription>
              Promedio de días de crédito
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-bold text-blue-600">
                  {Math.round(
                    mockVendors.reduce((sum, v) => sum + v.paymentTerms, 0) /
                      mockVendors.length
                  )}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  días promedio
                </p>
              </div>
              <TrendingUp className="h-10 w-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
