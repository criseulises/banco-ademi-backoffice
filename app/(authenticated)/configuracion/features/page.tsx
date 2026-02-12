"use client"

import { useState } from "react"
import { Flag, CheckCircle, XCircle, Users, Code, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

interface FeatureFlag {
  id: string
  name: string
  description: string
  category: string
  enabled: boolean
  rolloutPercentage: number
  environment: "all" | "production" | "staging" | "development"
  targetUsers?: string[]
  createdAt: string
  lastModified: string
}

export default function FeaturesPage() {
  const [features, setFeatures] = useState<FeatureFlag[]>([
    {
      id: "new-dashboard",
      name: "Nuevo Dashboard",
      description: "Nueva interfaz del dashboard con métricas en tiempo real",
      category: "UI/UX",
      enabled: true,
      rolloutPercentage: 100,
      environment: "all",
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "advanced-analytics",
      name: "Análisis Avanzados",
      description: "Reportes y análisis predictivos con IA",
      category: "Analytics",
      enabled: true,
      rolloutPercentage: 75,
      environment: "production",
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      lastModified: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "instant-transfers",
      name: "Transferencias Instantáneas",
      description: "Procesamiento de transferencias en tiempo real",
      category: "Transacciones",
      enabled: true,
      rolloutPercentage: 50,
      environment: "production",
      targetUsers: ["premium", "vip"],
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      lastModified: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "biometric-auth",
      name: "Autenticación Biométrica",
      description: "Login con huella digital y reconocimiento facial",
      category: "Seguridad",
      enabled: false,
      rolloutPercentage: 0,
      environment: "staging",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      lastModified: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "chatbot-support",
      name: "Soporte con Chatbot IA",
      description: "Asistente virtual para atención al cliente",
      category: "Soporte",
      enabled: true,
      rolloutPercentage: 25,
      environment: "production",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      lastModified: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "dark-mode",
      name: "Modo Oscuro",
      description: "Tema oscuro para la interfaz del sistema",
      category: "UI/UX",
      enabled: true,
      rolloutPercentage: 100,
      environment: "all",
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      lastModified: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "mobile-app",
      name: "App Móvil Nativa",
      description: "Aplicación móvil para iOS y Android",
      category: "Producto",
      enabled: false,
      rolloutPercentage: 0,
      environment: "development",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      lastModified: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "cryptocurrency",
      name: "Soporte de Criptomonedas",
      description: "Compra, venta y almacenamiento de criptomonedas",
      category: "Producto",
      enabled: false,
      rolloutPercentage: 0,
      environment: "staging",
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      lastModified: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ])

  const categories = [...new Set(features.map((f) => f.category))]

  const handleToggle = (id: string) => {
    setFeatures((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              enabled: !f.enabled,
              lastModified: new Date().toISOString(),
            }
          : f
      )
    )
    toast.success("Feature flag actualizado")
  }

  const handleRolloutChange = (id: string, percentage: number) => {
    setFeatures((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              rolloutPercentage: percentage,
              lastModified: new Date().toISOString(),
            }
          : f
      )
    )
  }

  const handleEnvironmentChange = (id: string, environment: string) => {
    setFeatures((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              environment: environment as any,
              lastModified: new Date().toISOString(),
            }
          : f
      )
    )
  }

  const handleSaveAll = () => {
    toast.success("Todos los feature flags han sido guardados")
  }

  const getEnvironmentBadge = (env: string) => {
    const variants: Record<string, string> = {
      all: "bg-green-100 text-green-800",
      production: "bg-blue-100 text-blue-800",
      staging: "bg-yellow-100 text-yellow-800",
      development: "bg-purple-100 text-purple-800",
    }
    const labels: Record<string, string> = {
      all: "Todos",
      production: "Producción",
      staging: "Staging",
      development: "Desarrollo",
    }
    return (
      <Badge className={`${variants[env]} border-0 text-xs`}>
        {labels[env]}
      </Badge>
    )
  }

  const enabledFeatures = features.filter((f) => f.enabled)
  const productionFeatures = features.filter((f) => f.environment === "production" || f.environment === "all")

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Flag className="h-8 w-8" style={{ color: "#0095A9" }} />
          <h1 className="text-3xl font-bold text-gray-900">
            Feature Flags
          </h1>
        </div>
        <p className="text-gray-600">
          Controla el despliegue de nuevas funcionalidades del sistema
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Features
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {features.length}
              </h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Flag className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Habilitados
              </p>
              <h3 className="text-2xl font-bold text-green-600 mt-1">
                {enabledFeatures.length}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {((enabledFeatures.length / features.length) * 100).toFixed(0)}% del total
              </p>
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
                En Producción
              </p>
              <h3 className="text-2xl font-bold text-blue-600 mt-1">
                {productionFeatures.length}
              </h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Code className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                En Testing
              </p>
              <h3 className="text-2xl font-bold text-yellow-600 mt-1">
                {features.filter((f) => f.rolloutPercentage < 100 && f.enabled).length}
              </h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Users className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Feature Categories */}
      {categories.map((category) => {
        const categoryFeatures = features.filter((f) => f.category === category)

        return (
          <Card key={category}>
            <CardHeader>
              <CardTitle>{category}</CardTitle>
              <CardDescription>
                {categoryFeatures.filter((f) => f.enabled).length} de {categoryFeatures.length} habilitados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryFeatures.map((feature) => (
                  <div
                    key={feature.id}
                    className="p-4 border rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">
                            {feature.name}
                          </h4>
                          {getEnvironmentBadge(feature.environment)}
                          <Switch
                            checked={feature.enabled}
                            onCheckedChange={() => handleToggle(feature.id)}
                          />
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {feature.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>
                            Creado: {new Date(feature.createdAt).toLocaleDateString("es-DO")}
                          </span>
                          <span>•</span>
                          <span>
                            Modificado: {new Date(feature.lastModified).toLocaleDateString("es-DO")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-xs">Rollout (%)</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="25"
                            value={feature.rolloutPercentage}
                            onChange={(e) =>
                              handleRolloutChange(feature.id, parseInt(e.target.value))
                            }
                            className="flex-1"
                            disabled={!feature.enabled}
                          />
                          <span className="text-sm font-semibold text-gray-900 w-12 text-right">
                            {feature.rolloutPercentage}%
                          </span>
                        </div>
                      </div>

                      <div>
                        <Label className="text-xs">Entorno</Label>
                        <Select
                          value={feature.environment}
                          onValueChange={(value) => handleEnvironmentChange(feature.id, value)}
                          disabled={!feature.enabled}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="production">Producción</SelectItem>
                            <SelectItem value="staging">Staging</SelectItem>
                            <SelectItem value="development">Desarrollo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {feature.targetUsers && (
                        <div>
                          <Label className="text-xs">Usuarios Objetivo</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {feature.targetUsers.map((user, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {user}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      {feature.enabled ? (
                        <Badge className="bg-green-100 text-green-800 border-0">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Activo
                        </Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-800 border-0">
                          <XCircle className="h-3 w-3 mr-1" />
                          Inactivo
                        </Badge>
                      )}
                      {feature.enabled && feature.rolloutPercentage < 100 && (
                        <Badge className="bg-yellow-100 text-yellow-800 border-0">
                          Rollout Gradual
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}

      {/* Save Button */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Los cambios se aplican inmediatamente al guardar
            </p>
            <Button onClick={handleSaveAll} style={{ backgroundColor: "#0095A9" }}>
              <Save className="h-4 w-4 mr-2" />
              Guardar Todos los Cambios
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Rollout Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Guía de Rollout</CardTitle>
          <CardDescription>
            Mejores prácticas para despliegue de features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-xl">1️⃣</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Desarrollo</h4>
                <p className="text-sm text-gray-600">
                  Prueba la feature en el entorno de desarrollo con 0% rollout
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-xl">2️⃣</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Staging</h4>
                <p className="text-sm text-gray-600">
                  Valida en staging con usuarios de prueba, 25% rollout
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-xl">3️⃣</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Beta (Producción)</h4>
                <p className="text-sm text-gray-600">
                  Rollout gradual: 25% → 50% → 75%, monitorea métricas
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-xl">4️⃣</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Producción Completa</h4>
                <p className="text-sm text-gray-600">
                  100% rollout para todos los usuarios cuando todo está estable
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
