"use client"

import { Plug, CheckCircle, XCircle, Settings, Key, RefreshCw, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

interface Integration {
  id: string
  name: string
  description: string
  category: string
  status: "active" | "inactive" | "error"
  enabled: boolean
  logo: string
  apiKey?: string
  webhookUrl?: string
  lastSync?: string
  config?: Record<string, any>
}

export default function IntegracionesPage() {
  const integrations: Integration[] = [
    {
      id: "visa",
      name: "Visa",
      description: "Procesamiento de pagos con tarjetas Visa",
      category: "Pagos",
      status: "active",
      enabled: true,
      logo: "💳",
      apiKey: "pk_live_****************************",
      lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "mastercard",
      name: "Mastercard",
      description: "Procesamiento de pagos con tarjetas Mastercard",
      category: "Pagos",
      status: "active",
      enabled: true,
      logo: "💳",
      apiKey: "pk_live_****************************",
      lastSync: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "aws",
      name: "Amazon Web Services",
      description: "Infraestructura en la nube y almacenamiento",
      category: "Infraestructura",
      status: "active",
      enabled: true,
      logo: "☁️",
      apiKey: "AKIA****************************",
      lastSync: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "twilio",
      name: "Twilio",
      description: "Envío de SMS y notificaciones",
      category: "Comunicaciones",
      status: "active",
      enabled: true,
      logo: "📱",
      apiKey: "AC****************************",
      lastSync: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "sendgrid",
      name: "SendGrid",
      description: "Servicio de email transaccional",
      category: "Comunicaciones",
      status: "active",
      enabled: true,
      logo: "✉️",
      apiKey: "SG.****************************",
      lastSync: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "stripe",
      name: "Stripe",
      description: "Plataforma de pagos internacional",
      category: "Pagos",
      status: "inactive",
      enabled: false,
      logo: "💰",
    },
    {
      id: "plaid",
      name: "Plaid",
      description: "Conexión con cuentas bancarias",
      category: "Finanzas",
      status: "inactive",
      enabled: false,
      logo: "🏦",
    },
    {
      id: "docusign",
      name: "DocuSign",
      description: "Firma electrónica de documentos",
      category: "Documentación",
      status: "error",
      enabled: true,
      logo: "📝",
      apiKey: "ds_****************************",
      lastSync: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    },
  ]

  const categories = [...new Set(integrations.map((i) => i.category))]

  const handleToggle = (id: string) => {
    toast.success(`Integración ${id} actualizada`)
  }

  const handleConfigure = (id: string) => {
    toast.info(`Configurando integración ${id}`)
  }

  const handleSync = (id: string) => {
    toast.info(`Sincronizando integración ${id}...`)
    setTimeout(() => {
      toast.success(`Sincronización completada`)
    }, 2000)
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { color: string; label: string; icon: React.ReactNode }> = {
      active: {
        color: "bg-green-100 text-green-800",
        label: "Activa",
        icon: <CheckCircle className="h-3 w-3 mr-1" />,
      },
      inactive: {
        color: "bg-gray-100 text-gray-800",
        label: "Inactiva",
        icon: <XCircle className="h-3 w-3 mr-1" />,
      },
      error: {
        color: "bg-red-100 text-red-800",
        label: "Error",
        icon: <XCircle className="h-3 w-3 mr-1" />,
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

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return "Hace menos de 1h"
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours}h`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `Hace ${diffInDays}d`
    }
  }

  const activeIntegrations = integrations.filter((i) => i.status === "active")
  const totalRequests = activeIntegrations.length * 1500 // Mock

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Plug className="h-8 w-8" style={{ color: "#0095A9" }} />
          <h1 className="text-3xl font-bold text-gray-900">
            Integraciones
          </h1>
        </div>
        <p className="text-gray-600">
          Gestiona las integraciones con servicios externos
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Integraciones
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {integrations.length}
              </h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Plug className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Activas
              </p>
              <h3 className="text-2xl font-bold text-green-600 mt-1">
                {activeIntegrations.length}
              </h3>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Con Errores
              </p>
              <h3 className="text-2xl font-bold text-red-600 mt-1">
                {integrations.filter((i) => i.status === "error").length}
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
                Requests (24h)
              </p>
              <h3 className="text-xl font-bold text-gray-900 mt-1">
                {totalRequests.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <RefreshCw className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Integration Categories */}
      {categories.map((category) => {
        const categoryIntegrations = integrations.filter((i) => i.category === category)

        return (
          <Card key={category}>
            <CardHeader>
              <CardTitle>{category}</CardTitle>
              <CardDescription>
                {categoryIntegrations.length} integraciones disponibles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryIntegrations.map((integration) => (
                  <div
                    key={integration.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{integration.logo}</div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {integration.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {integration.description}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={integration.enabled}
                        onCheckedChange={() => handleToggle(integration.id)}
                      />
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      {getStatusBadge(integration.status)}
                      {integration.lastSync && (
                        <span className="text-xs text-gray-500">
                          Última sincronización: {formatTimeAgo(integration.lastSync)}
                        </span>
                      )}
                    </div>

                    {integration.apiKey && (
                      <div className="mb-3">
                        <Label className="text-xs">API Key</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Input
                            type="password"
                            value={integration.apiKey}
                            readOnly
                            className="flex-1 text-xs"
                          />
                          <Button variant="outline" size="sm">
                            <Key className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleConfigure(integration.id)}
                      >
                        <Settings className="h-4 w-4 mr-1" />
                        Configurar
                      </Button>
                      {integration.enabled && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSync(integration.id)}
                        >
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Sincronizar
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}

      {/* Add New Integration */}
      <Card>
        <CardHeader>
          <CardTitle>Agregar Nueva Integración</CardTitle>
          <CardDescription>
            Conecta nuevos servicios externos a tu sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8 border-2 border-dashed rounded-lg">
            <div className="text-center">
              <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">
                Conectar Nuevo Servicio
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Explora el marketplace de integraciones disponibles
              </p>
              <Button style={{ backgroundColor: "#0095A9" }}>
                <Plus className="h-4 w-4 mr-2" />
                Explorar Integraciones
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Health */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Uptime</CardTitle>
            <CardDescription>
              Disponibilidad del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-4xl font-bold text-green-600">
                99.9%
              </h3>
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Últimos 30 días
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Latencia Promedio</CardTitle>
            <CardDescription>
              Tiempo de respuesta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-4xl font-bold text-blue-600">
                245ms
              </h3>
              <RefreshCw className="h-10 w-10 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Últimas 24 horas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tasa de Éxito</CardTitle>
            <CardDescription>
              Requests exitosos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-4xl font-bold text-purple-600">
                98.5%
              </h3>
              <CheckCircle className="h-10 w-10 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {totalRequests.toLocaleString()} requests
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
