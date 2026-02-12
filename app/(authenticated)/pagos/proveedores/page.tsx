"use client"

import { useState } from "react"
import { Building2, DollarSign, FileText, TrendingUp, UserPlus, Phone, Mail, X, CreditCard } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  mockVendors as initialVendors,
  getVendorsStats,
  vendorTypeNames,
  vendorStatusNames,
  getPaymentsByVendorId
} from "@/lib/mock-data/vendors-data"
import { toast } from "sonner"

export default function ProveedoresPage() {
  const [vendors, setVendors] = useState(initialVendors)
  const [selectedVendor, setSelectedVendor] = useState<any>(null)
  const [openNewDialog, setOpenNewDialog] = useState(false)
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const [newVendor, setNewVendor] = useState({
    name: "",
    rnc: "",
    email: "",
    phone: "",
    type: "",
    monthlyAmount: "",
    paymentTerms: "",
    services: "",
  })

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

  const handleAddVendor = () => {
    if (!newVendor.name || !newVendor.rnc || !newVendor.email || !newVendor.type) {
      toast.error("❌ Campos requeridos", {
        description: "Por favor completa todos los campos obligatorios",
      })
      return
    }

    const vendor = {
      id: `VENDOR-${Date.now()}`,
      name: newVendor.name,
      rnc: newVendor.rnc,
      email: newVendor.email,
      phone: newVendor.phone,
      type: newVendor.type as any,
      status: "active" as const,
      monthlyAmount: parseFloat(newVendor.monthlyAmount) || 0,
      totalPaid: 0,
      lastPaymentDate: null,
      paymentTerms: parseInt(newVendor.paymentTerms) || 30,
      services: newVendor.services.split(",").map(s => s.trim()).filter(Boolean),
      contractStart: new Date().toISOString(),
      contractEnd: null,
      nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    }

    setVendors((prev) => [...prev, vendor])
    setOpenNewDialog(false)
    setNewVendor({
      name: "",
      rnc: "",
      email: "",
      phone: "",
      type: "",
      monthlyAmount: "",
      paymentTerms: "",
      services: "",
    })

    toast.success("✨ Proveedor agregado", {
      description: `${newVendor.name} ha sido registrado exitosamente`,
    })
  }

  const handleViewDetails = (vendor: any) => {
    setSelectedVendor(vendor)
    setOpenDetailsDialog(true)
  }

  const handlePayVendor = (vendor: any) => {
    toast.success(`💰 Pago procesado`, {
      description: `Pago de RD$ ${vendor.monthlyAmount.toLocaleString("es-DO")} a ${vendor.name} registrado exitosamente`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Proveedores
        </h1>
        <p className="text-gray-600 mt-1">
          Gestiona los proveedores y sus contratos
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg p-4">
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

        <div className="bg-white rounded-lg p-4">
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

        <div className="bg-white rounded-lg p-4">
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

        <div className="bg-white rounded-lg p-4">
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
                <div key={index} className="p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
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
            <Dialog open={openNewDialog} onOpenChange={setOpenNewDialog}>
              <DialogTrigger asChild>
                <Button size="sm" style={{ backgroundColor: "#0095A9" }}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Nuevo Proveedor
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Agregar Nuevo Proveedor</DialogTitle>
                  <DialogDescription>
                    Completa la información del proveedor para registrarlo en el sistema
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre del Proveedor *</Label>
                      <Input
                        id="name"
                        placeholder="Ej: Acme Corporation"
                        value={newVendor.name}
                        onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rnc">RNC *</Label>
                      <Input
                        id="rnc"
                        placeholder="000-0000000-0"
                        value={newVendor.rnc}
                        onChange={(e) => setNewVendor({ ...newVendor, rnc: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="contacto@proveedor.com"
                        value={newVendor.email}
                        onChange={(e) => setNewVendor({ ...newVendor, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        placeholder="809-000-0000"
                        value={newVendor.phone}
                        onChange={(e) => setNewVendor({ ...newVendor, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Tipo de Proveedor *</Label>
                      <Select
                        value={newVendor.type}
                        onValueChange={(value) => setNewVendor({ ...newVendor, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="payment_processor">Procesador de Pago</SelectItem>
                          <SelectItem value="software_provider">Software</SelectItem>
                          <SelectItem value="service_provider">Servicios</SelectItem>
                          <SelectItem value="infrastructure">Infraestructura</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="monthlyAmount">Monto Mensual (RD$)</Label>
                      <Input
                        id="monthlyAmount"
                        type="number"
                        placeholder="0.00"
                        value={newVendor.monthlyAmount}
                        onChange={(e) => setNewVendor({ ...newVendor, monthlyAmount: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="paymentTerms">Términos de Pago (días)</Label>
                      <Input
                        id="paymentTerms"
                        type="number"
                        placeholder="30"
                        value={newVendor.paymentTerms}
                        onChange={(e) => setNewVendor({ ...newVendor, paymentTerms: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="services">Servicios (separados por coma)</Label>
                    <Textarea
                      id="services"
                      placeholder="Ej: Procesamiento de pagos, Soporte técnico"
                      value={newVendor.services}
                      onChange={(e) => setNewVendor({ ...newVendor, services: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setOpenNewDialog(false)
                      setNewVendor({
                        name: "",
                        rnc: "",
                        email: "",
                        phone: "",
                        type: "",
                        monthlyAmount: "",
                        paymentTerms: "",
                        services: "",
                      })
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleAddVendor} style={{ backgroundColor: "#0095A9" }}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Agregar Proveedor
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vendors.map((vendor) => {
              const vendorPayments = getPaymentsByVendorId(vendor.id)
              const paidPayments = vendorPayments.filter((p) => p.status === "paid")

              return (
                <div
                  key={vendor.id}
                  className="p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
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
                              ? new Date(vendor.nextPaymentDate).toLocaleDateString("es-DO", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })
                              : "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDetails(vendor)}
                        >
                          Ver Detalle
                        </Button>
                        <Button 
                          size="sm" 
                          style={{ backgroundColor: "#0095A9" }}
                          onClick={() => handlePayVendor(vendor)}
                        >
                          <CreditCard className="h-4 w-4 mr-1" />
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
                    vendors.reduce((sum, v) => sum + v.paymentTerms, 0) /
                      vendors.length
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

      {/* Details Dialog */}
      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles del Proveedor</DialogTitle>
            <DialogDescription>
              Información completa del proveedor y sus transacciones
            </DialogDescription>
          </DialogHeader>
          {selectedVendor && (
            <div className="space-y-6 py-4">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Building2 className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedVendor.name}</h3>
                    <p className="text-sm text-gray-500">
                      {selectedVendor.id} • RNC: {selectedVendor.rnc}
                    </p>
                    <div className="flex gap-2 mt-2">
                      {getStatusBadge(selectedVendor.status)}
                      {getTypeBadge(selectedVendor.type)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label className="text-xs text-gray-600">Email</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <p className="text-sm font-medium break-all">{selectedVendor.email}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Teléfono</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <p className="text-sm font-medium">{selectedVendor.phone}</p>
                  </div>
                </div>
              </div>

              {/* Financial Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <Label className="text-xs text-gray-600">Pago Mensual</Label>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                    RD$ {selectedVendor.monthlyAmount.toLocaleString("es-DO")}
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <Label className="text-xs text-gray-600">Total Pagado</Label>
                  <p className="text-xl sm:text-2xl font-bold text-green-600 mt-1">
                    RD$ {(selectedVendor.totalPaid / 1000000).toFixed(2)}M
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <Label className="text-xs text-gray-600">Términos de Pago</Label>
                  <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-1">
                    {selectedVendor.paymentTerms} días
                  </p>
                </div>
              </div>

              {/* Contract Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border rounded-lg">
                <div>
                  <Label className="text-xs text-gray-600">Inicio del Contrato</Label>
                  <p className="text-sm font-medium mt-1">
                    {new Date(selectedVendor.contractStart).toLocaleDateString("es-DO", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Próximo Pago</Label>
                  <p className="text-sm font-medium mt-1">
                    {selectedVendor.nextPaymentDate
                      ? new Date(selectedVendor.nextPaymentDate).toLocaleDateString("es-DO", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "No programado"}
                  </p>
                </div>
              </div>

              {/* Services */}
              <div>
                <Label className="text-sm font-semibold">Servicios Contratados</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedVendor.services.map((service: string, i: number) => (
                    <Badge key={i} variant="outline" className="text-sm">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Recent Payments */}
              <div>
                <Label className="text-sm font-semibold mb-2 block">Pagos Recientes</Label>
                <div className="space-y-2">
                  {getPaymentsByVendorId(selectedVendor.id)
                    .slice(0, 5)
                    .map((payment: any) => (
                      <div
                        key={payment.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg shadow-sm"
                      >
                        <div>
                          <p className="font-medium text-sm">{payment.concept}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(payment.paidDate ?? payment.dueDate).toLocaleDateString("es-DO", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="font-bold text-sm">
                            RD$ {payment.amount.toLocaleString("es-DO")}
                          </p>
                          <Badge
                            className={`text-xs mt-1 ${
                              payment.status === "paid"
                                ? "bg-green-100 text-green-800"
                                : payment.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            } border-0`}
                          >
                            {payment.status === "paid"
                              ? "Pagado"
                              : payment.status === "pending"
                              ? "Pendiente"
                              : "Vencido"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => setOpenDetailsDialog(false)}
                  className="w-full sm:w-auto"
                >
                  Cerrar
                </Button>
                <Button
                  style={{ backgroundColor: "#0095A9" }}
                  onClick={() => {
                    handlePayVendor(selectedVendor)
                    setOpenDetailsDialog(false)
                  }}
                  className="w-full sm:w-auto"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Procesar Pago
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
