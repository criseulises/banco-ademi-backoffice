"use client"

import { Shield, AlertTriangle, TrendingUp, Users, DollarSign, Ban, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function PrevencionFraudePage() {
  // Mock fraud detection data
  const fraudStats = {
    totalCases: 156,
    activeCases: 23,
    resolvedCases: 128,
    blockedTransactions: 45,
    preventedLoss: 2450000,
    falsePositives: 5,
  }

  const fraudTypes = [
    {
      type: "Identidad Falsa",
      cases: 42,
      percentage: 26.9,
      severity: "high",
      color: "bg-red-100 text-red-800",
    },
    {
      type: "Tarjeta Robada",
      cases: 38,
      percentage: 24.4,
      severity: "high",
      color: "bg-orange-100 text-orange-800",
    },
    {
      type: "Cuenta Comprometida",
      cases: 31,
      percentage: 19.9,
      severity: "medium",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      type: "Phishing",
      cases: 28,
      percentage: 17.9,
      severity: "medium",
      color: "bg-blue-100 text-blue-800",
    },
    {
      type: "Otros",
      cases: 17,
      percentage: 10.9,
      severity: "low",
      color: "bg-gray-100 text-gray-800",
    },
  ]

  const recentCases = [
    {
      id: "FRD-001",
      user: "Usuario Anónimo",
      type: "Identidad Falsa",
      amount: 125000,
      status: "active",
      riskScore: 95,
      detectedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      indicators: ["Documentos falsificados", "IP sospechosa", "Datos inconsistentes"],
    },
    {
      id: "FRD-002",
      user: "Carlos M.",
      type: "Tarjeta Robada",
      amount: 85000,
      status: "blocked",
      riskScore: 88,
      detectedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      indicators: ["Transacción inusual", "Ubicación atípica"],
    },
    {
      id: "FRD-003",
      user: "Ana R.",
      type: "Cuenta Comprometida",
      amount: 65000,
      status: "reviewing",
      riskScore: 72,
      detectedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      indicators: ["Cambio de contraseña reciente", "Múltiples intentos fallidos"],
    },
    {
      id: "FRD-004",
      user: "Juan P.",
      type: "Phishing",
      amount: 45000,
      status: "resolved",
      riskScore: 65,
      detectedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      indicators: ["Link sospechoso", "Solicitud de credenciales"],
    },
  ]

  const fraudRules = [
    { name: "Velocidad de transacciones", enabled: true, detections: 18 },
    { name: "Monto inusual", enabled: true, detections: 25 },
    { name: "Ubicación geográfica", enabled: true, detections: 12 },
    { name: "Dispositivo no reconocido", enabled: true, detections: 15 },
    { name: "Patrones de horario", enabled: true, detections: 8 },
    { name: "Cambios de datos sensibles", enabled: true, detections: 22 },
  ]

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { color: string; label: string }> = {
      active: { color: "bg-red-100 text-red-800", label: "Activo" },
      blocked: { color: "bg-orange-100 text-orange-800", label: "Bloqueado" },
      reviewing: { color: "bg-yellow-100 text-yellow-800", label: "En Revisión" },
      resolved: { color: "bg-green-100 text-green-800", label: "Resuelto" },
    }
    const config = variants[status]
    return <Badge className={`${config.color} border-0`}>{config.label}</Badge>
  }

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-red-600"
    if (score >= 60) return "text-orange-600"
    if (score >= 40) return "text-yellow-600"
    return "text-green-600"
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-8 w-8" style={{ color: "#0095A9" }} />
          <h1 className="text-3xl font-bold text-gray-900">
            Prevención de Fraude
          </h1>
        </div>
        <p className="text-gray-600">
          Sistema de detección y prevención de actividades fraudulentas
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Casos Totales
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {fraudStats.totalCases}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {fraudStats.activeCases} activos
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Pérdidas Prevenidas
              </p>
              <h3 className="text-xl font-bold text-green-600 mt-1">
                RD$ {(fraudStats.preventedLoss / 1000000).toFixed(1)}M
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Este mes
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
                Transacciones Bloqueadas
              </p>
              <h3 className="text-2xl font-bold text-orange-600 mt-1">
                {fraudStats.blockedTransactions}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Última semana
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Ban className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Tasa de Precisión
              </p>
              <h3 className="text-2xl font-bold text-blue-600 mt-1">
                {(((fraudStats.totalCases - fraudStats.falsePositives) / fraudStats.totalCases) * 100).toFixed(1)}%
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {fraudStats.falsePositives} falsos positivos
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      {fraudStats.activeCases > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <div>
              <h4 className="font-semibold text-red-900">
                Casos Activos Requieren Atención
              </h4>
              <p className="text-sm text-red-700">
                Hay {fraudStats.activeCases} casos de fraude activos que necesitan revisión inmediata
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Fraud Types */}
      <Card>
        <CardHeader>
          <CardTitle>Tipos de Fraude Detectados</CardTitle>
          <CardDescription>
            Distribución de casos por categoría
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fraudTypes.map((fraudType, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={`${fraudType.color} border-0`}>
                      {fraudType.type}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {fraudType.cases} casos
                    </span>
                  </div>
                  <Progress value={fraudType.percentage} className="h-2" />
                </div>
                <span className="ml-4 text-sm font-semibold text-gray-900">
                  {fraudType.percentage.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Cases */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Casos Recientes</CardTitle>
              <CardDescription>
                Últimas detecciones de fraude
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Ver Todos
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCases.map((fraudCase) => (
              <div
                key={fraudCase.id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {fraudCase.id} - {fraudCase.type}
                      </h4>
                      {getStatusBadge(fraudCase.status)}
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Usuario: {fraudCase.user}</p>
                      <p>Monto: RD$ {fraudCase.amount.toLocaleString("es-DO")}</p>
                      <p>{formatTimeAgo(fraudCase.detectedAt)}</p>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-xs text-gray-600 mb-1">Score de Riesgo</p>
                    <p className={`text-3xl font-bold ${getRiskColor(fraudCase.riskScore)}`}>
                      {fraudCase.riskScore}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <p className="text-xs text-gray-600 mb-2">Indicadores:</p>
                  <div className="flex flex-wrap gap-1">
                    {fraudCase.indicators.map((indicator, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {indicator}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    Investigar
                  </Button>
                  {fraudCase.status === "active" && (
                    <Button size="sm" style={{ backgroundColor: "#0095A9" }}>
                      <Ban className="h-4 w-4 mr-1" />
                      Bloquear
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detection Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Reglas de Detección Activas</CardTitle>
          <CardDescription>
            Configuración del sistema antifraude
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fraudRules.map((rule, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${rule.enabled ? "bg-green-100" : "bg-gray-100"}`}>
                    <Shield className={`h-5 w-5 ${rule.enabled ? "text-green-600" : "text-gray-400"}`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{rule.name}</p>
                    <p className="text-xs text-gray-500">
                      {rule.detections} detecciones este mes
                    </p>
                  </div>
                </div>
                <Badge className={rule.enabled ? "bg-green-100 text-green-800 border-0" : "bg-gray-100 text-gray-800 border-0"}>
                  {rule.enabled ? "Activa" : "Inactiva"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tasa de Detección</CardTitle>
            <CardDescription>
              Efectividad del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-4xl font-bold text-green-600">
                {((fraudStats.totalCases / (fraudStats.totalCases + 50)) * 100).toFixed(1)}%
              </h3>
              <TrendingUp className="h-10 w-10 text-green-600" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Casos detectados vs intentos totales
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tiempo de Respuesta</CardTitle>
            <CardDescription>
              Promedio de resolución
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-4xl font-bold text-blue-600">
                2.4h
              </h3>
              <Users className="h-10 w-10 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Desde detección hasta resolución
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Casos Resueltos</CardTitle>
            <CardDescription>
              Tasa de éxito
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-4xl font-bold text-purple-600">
                {((fraudStats.resolvedCases / fraudStats.totalCases) * 100).toFixed(0)}%
              </h3>
              <Shield className="h-10 w-10 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {fraudStats.resolvedCases} de {fraudStats.totalCases} casos
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
