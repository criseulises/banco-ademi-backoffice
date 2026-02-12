"use client"

import { useState } from "react"
import { Plug, CheckCircle, XCircle, Settings, Key, RefreshCw, Plus, Copy, Eye, EyeOff } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
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
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "visa",
      name: "Visa",
      description: "Procesamiento de pagos con tarjetas Visa",
      category: "Pagos",
      status: "active",
      enabled: true,
      logo: "💳",
      apiKey: "pk_live_51J3x4yH8n2K5m6p7q8r9s0t",
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
      apiKey: "pk_live_61K4z5zI9o3L6n7q8r9s0t1u",
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
      apiKey: "AKIAIOSFODNN7EXAMPLE1234567890",
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
      apiKey: "AC1234567890abcdef1234567890abcd",
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
      apiKey: "SG.1234567890abcdef.1234567890abcdef",
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
      apiKey: "ds_1234567890abcdef1234567890abcd",
      lastSync: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    },
  ])

  const [showApiKey, setShowApiKey] = useState<Record<string, boolean>>({})
  const [openDialog, setOpenDialog] = useState(false)
  const [newIntegration, setNewIntegration] = useState({
    name: "",
    description: "",
    category: "",
    apiKey: "",
    logo: "🔌",
  })

  const categories = [...new Set(integrations.map((i) => i.category))]

  const handleToggle = (id: string) => {
    setIntegrations((prev) =>
      prev.map((integration) => {
        if (integration.id === id) {
          const newEnabled = !integration.enabled
          const newStatus = newEnabled ? "active" : "inactive"
          
          toast.success(
            newEnabled
              ? `✅ Integración "${integration.name}" activada correctamente`
              : `⏸️ Integración "${integration.name}" desactivada`,
            {
              description: newEnabled
                ? "La integración está ahora activa y operativa"
                : "La integración ha sido pausada temporalmente",
            }
          )
          
          return {
            ...integration,
            enabled: newEnabled,
            status: newStatus as "active" | "inactive" | "error",
          }
        }
        return integration
      })
    )
  }

  const handleCopyApiKey = (apiKey: string, name: string) => {
    navigator.clipboard.writeText(apiKey)
    toast.success(`🔑 API Key copiada`, {
      description: `La API Key de ${name} se ha copiado al portapapeles`,
    })
  }

  const toggleShowApiKey = (id: string) => {
    setShowApiKey((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleAddIntegration = () => {
    if (!newIntegration.name || !newIntegration.category || !newIntegration.apiKey) {
      toast.error("❌ Campos requeridos", {
        description: "Por favor completa todos los campos obligatorios",
      })
      return
    }

    const integration: Integration = {
      id: newIntegration.name.toLowerCase().replace(/\s+/g, "-"),
      name: newIntegration.name,
      description: newIntegration.description,
      category: newIntegration.category,
      status: "active",
      enabled: true,
      logo: newIntegration.logo,
      apiKey: newIntegration.apiKey,
      lastSync: new Date().toISOString(),
    }

    setIntegrations((prev) => [...prev, integration])
    setOpenDialog(false)
    setNewIntegration({
      name: "",
      description: "",
      category: "",
      apiKey: "",
      logo: "🔌",
    })

    toast.success("✨ Nueva integración agregada", {
      description: `${newIntegration.name} se ha conectado correctamente`,
    })
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
        <div className="bg-white rounded-lg p-4">
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

        <div className="bg-white rounded-lg p-4">
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

        <div className="bg-white rounded-lg p-4">
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

        <div className="bg-white rounded-lg p-4">
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
                    className="p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
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
                            type={showApiKey[integration.id] ? "text" : "password"}
                            value={integration.apiKey}
                            readOnly
                            className="flex-1 text-xs font-mono"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleShowApiKey(integration.id)}
                            title={showApiKey[integration.id] ? "Ocultar API Key" : "Mostrar API Key"}
                          >
                            {showApiKey[integration.id] ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyApiKey(integration.apiKey!, integration.name)}
                            title="Copiar API Key"
                          >
                            <Copy className="h-4 w-4" />
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
                Configura una nueva integración con servicios externos
              </p>
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button style={{ backgroundColor: "#0095A9" }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Integración
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Agregar Nueva Integración</DialogTitle>
                    <DialogDescription>
                      Completa la información para conectar un nuevo servicio externo
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre del Servicio *</Label>
                      <Input
                        id="name"
                        placeholder="Ej: PayPal, Google Analytics"
                        value={newIntegration.name}
                        onChange={(e) =>
                          setNewIntegration({ ...newIntegration, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Descripción</Label>
                      <Input
                        id="description"
                        placeholder="Describe el propósito de esta integración"
                        value={newIntegration.description}
                        onChange={(e) =>
                          setNewIntegration({ ...newIntegration, description: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoría *</Label>
                      <Select
                        value={newIntegration.category}
                        onValueChange={(value) =>
                          setNewIntegration({ ...newIntegration, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pagos">Pagos</SelectItem>
                          <SelectItem value="Comunicaciones">Comunicaciones</SelectItem>
                          <SelectItem value="Infraestructura">Infraestructura</SelectItem>
                          <SelectItem value="Finanzas">Finanzas</SelectItem>
                          <SelectItem value="Documentación">Documentación</SelectItem>
                          <SelectItem value="Análisis">Análisis</SelectItem>
                          <SelectItem value="Seguridad">Seguridad</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apiKey">API Key *</Label>
                      <Input
                        id="apiKey"
                        type="text"
                        placeholder="Ingresa la clave API del servicio"
                        value={newIntegration.apiKey}
                        onChange={(e) =>
                          setNewIntegration({ ...newIntegration, apiKey: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="logo">Emoji/Icono</Label>
                      <Input
                        id="logo"
                        placeholder="🔌"
                        maxLength={2}
                        value={newIntegration.logo}
                        onChange={(e) =>
                          setNewIntegration({ ...newIntegration, logo: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setOpenDialog(false)
                        setNewIntegration({
                          name: "",
                          description: "",
                          category: "",
                          apiKey: "",
                          logo: "🔌",
                        })
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleAddIntegration}
                      style={{ backgroundColor: "#0095A9" }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar Integración
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
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
