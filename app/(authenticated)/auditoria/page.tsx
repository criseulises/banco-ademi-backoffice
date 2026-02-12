"use client"

import { useState } from "react"
import { FileSearch, User, Activity, Settings, Database, Shield, Download, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type AuditAction = "create" | "update" | "delete" | "login" | "logout" | "export" | "config_change" | "approval"
type AuditEntity = "user" | "transaction" | "account" | "loan" | "investment" | "config" | "integration" | "feature_flag"

interface AuditLog {
  id: string
  timestamp: string
  userId: string
  userName: string
  userRole: string
  action: AuditAction
  entity: AuditEntity
  entityId?: string
  details: string
  ipAddress: string
  userAgent: string
  success: boolean
  changes?: Record<string, { old: any; new: any }>
}

export default function AuditoriaPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterAction, setFilterAction] = useState<string>("all")
  const [filterEntity, setFilterEntity] = useState<string>("all")

  // Generate mock audit logs
  const generateAuditLogs = (): AuditLog[] => {
    const logs: AuditLog[] = []
    const users = [
      { id: "USR-001", name: "Admin Principal", role: "Super Admin" },
      { id: "USR-002", name: "María González", role: "Gerente" },
      { id: "USR-003", name: "Juan Pérez", role: "Analista" },
      { id: "USR-004", name: "Ana Rodríguez", role: "Operador" },
    ]

    const actions: { action: AuditAction; entity: AuditEntity; details: string }[] = [
      { action: "create", entity: "user", details: "Creó nuevo usuario del sistema" },
      { action: "update", entity: "transaction", details: "Modificó límite de transacción" },
      { action: "delete", entity: "account", details: "Eliminó cuenta inactiva" },
      { action: "login", entity: "user", details: "Inicio de sesión exitoso" },
      { action: "logout", entity: "user", details: "Cerró sesión" },
      { action: "export", entity: "transaction", details: "Exportó reporte de transacciones" },
      { action: "config_change", entity: "config", details: "Cambió configuración de seguridad" },
      { action: "approval", entity: "transaction", details: "Aprobó transacción pendiente" },
      { action: "update", entity: "loan", details: "Actualizó estado de préstamo" },
      { action: "create", entity: "investment", details: "Registró nueva inversión" },
      { action: "config_change", entity: "integration", details: "Configuró integración de Visa" },
      { action: "update", entity: "feature_flag", details: "Habilitó feature flag" },
    ]

    for (let i = 0; i < 50; i++) {
      const user = users[Math.floor(Math.random() * users.length)]
      const actionData = actions[Math.floor(Math.random() * actions.length)]
      const hoursAgo = Math.floor(Math.random() * 72)
      const timestamp = new Date(Date.now() - hoursAgo * 60 * 60 * 1000)

      logs.push({
        id: `AUD-${String(i + 1).padStart(4, "0")}`,
        timestamp: timestamp.toISOString(),
        userId: user.id,
        userName: user.name,
        userRole: user.role,
        action: actionData.action,
        entity: actionData.entity,
        entityId: `${actionData.entity.toUpperCase()}-${String(Math.floor(Math.random() * 1000)).padStart(4, "0")}`,
        details: actionData.details,
        ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        success: Math.random() > 0.05, // 95% success rate
        changes: actionData.action === "update" ? {
          status: { old: "pending", new: "approved" },
        } : undefined,
      })
    }

    return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }

  const auditLogs = generateAuditLogs()

  const stats = {
    totalLogs: auditLogs.length,
    last24h: auditLogs.filter((log) => {
      const logTime = new Date(log.timestamp)
      const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
      return logTime > dayAgo
    }).length,
    failedActions: auditLogs.filter((log) => !log.success).length,
    uniqueUsers: new Set(auditLogs.map((log) => log.userId)).size,
  }

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch = log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.entityId?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesAction = filterAction === "all" || log.action === filterAction
    const matchesEntity = filterEntity === "all" || log.entity === filterEntity
    return matchesSearch && matchesAction && matchesEntity
  })

  const getActionBadge = (action: AuditAction) => {
    const variants: Record<AuditAction, { color: string; label: string }> = {
      create: { color: "bg-green-100 text-green-800", label: "Crear" },
      update: { color: "bg-blue-100 text-blue-800", label: "Actualizar" },
      delete: { color: "bg-red-100 text-red-800", label: "Eliminar" },
      login: { color: "bg-purple-100 text-purple-800", label: "Login" },
      logout: { color: "bg-gray-100 text-gray-800", label: "Logout" },
      export: { color: "bg-yellow-100 text-yellow-800", label: "Exportar" },
      config_change: { color: "bg-orange-100 text-orange-800", label: "Configurar" },
      approval: { color: "bg-teal-100 text-teal-800", label: "Aprobar" },
    }
    const config = variants[action]
    return (
      <Badge className={`${config.color} border-0 text-xs`}>
        {config.label}
      </Badge>
    )
  }

  const getEntityIcon = (entity: AuditEntity) => {
    const icons: Record<AuditEntity, React.ReactNode> = {
      user: <User className="h-4 w-4" />,
      transaction: <Activity className="h-4 w-4" />,
      account: <Database className="h-4 w-4" />,
      loan: <Database className="h-4 w-4" />,
      investment: <Database className="h-4 w-4" />,
      config: <Settings className="h-4 w-4" />,
      integration: <Settings className="h-4 w-4" />,
      feature_flag: <Settings className="h-4 w-4" />,
    }
    return icons[entity]
  }

  const getEntityName = (entity: AuditEntity) => {
    const names: Record<AuditEntity, string> = {
      user: "Usuario",
      transaction: "Transacción",
      account: "Cuenta",
      loan: "Préstamo",
      investment: "Inversión",
      config: "Configuración",
      integration: "Integración",
      feature_flag: "Feature Flag",
    }
    return names[entity]
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) {
      return `Hace ${diffInMinutes}m`
    }
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
      return `Hace ${diffInHours}h`
    }
    const diffInDays = Math.floor(diffInHours / 24)
    return `Hace ${diffInDays}d`
  }

  const handleExport = () => {
    const csv = auditLogs.map((log) => ({
      ID: log.id,
      Timestamp: new Date(log.timestamp).toLocaleString("es-DO"),
      Usuario: log.userName,
      Rol: log.userRole,
      Acción: log.action,
      Entidad: log.entity,
      Detalles: log.details,
      IP: log.ipAddress,
      Éxito: log.success ? "Sí" : "No",
    }))
    console.log("Exporting:", csv)
    // In real app, generate and download CSV
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <FileSearch className="h-8 w-8" style={{ color: "#0095A9" }} />
          <h1 className="text-3xl font-bold text-gray-900">
            Auditoría del Sistema
          </h1>
        </div>
        <p className="text-gray-600">
          Registro completo de todas las acciones realizadas en el sistema
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Registros
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {stats.totalLogs}
              </h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileSearch className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Últimas 24h
              </p>
              <h3 className="text-2xl font-bold text-blue-600 mt-1">
                {stats.last24h}
              </h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Acciones Fallidas
              </p>
              <h3 className="text-2xl font-bold text-red-600 mt-1">
                {stats.failedActions}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {((stats.failedActions / stats.totalLogs) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <Shield className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Usuarios Activos
              </p>
              <h3 className="text-2xl font-bold text-purple-600 mt-1">
                {stats.uniqueUsers}
              </h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <User className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Buscar por usuario, acción o ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterAction} onValueChange={setFilterAction}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por acción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las acciones</SelectItem>
                <SelectItem value="create">Crear</SelectItem>
                <SelectItem value="update">Actualizar</SelectItem>
                <SelectItem value="delete">Eliminar</SelectItem>
                <SelectItem value="login">Login</SelectItem>
                <SelectItem value="logout">Logout</SelectItem>
                <SelectItem value="export">Exportar</SelectItem>
                <SelectItem value="config_change">Configurar</SelectItem>
                <SelectItem value="approval">Aprobar</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterEntity} onValueChange={setFilterEntity}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por entidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las entidades</SelectItem>
                <SelectItem value="user">Usuario</SelectItem>
                <SelectItem value="transaction">Transacción</SelectItem>
                <SelectItem value="account">Cuenta</SelectItem>
                <SelectItem value="loan">Préstamo</SelectItem>
                <SelectItem value="investment">Inversión</SelectItem>
                <SelectItem value="config">Configuración</SelectItem>
                <SelectItem value="integration">Integración</SelectItem>
                <SelectItem value="feature_flag">Feature Flag</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Registro de Auditoría</CardTitle>
              <CardDescription>
                {filteredLogs.length} registros encontrados
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredLogs.slice(0, 20).map((log) => (
              <div
                key={log.id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1 bg-gray-100 rounded">
                        {getEntityIcon(log.entity)}
                      </div>
                      <span className="font-semibold text-gray-900">
                        {log.userName}
                      </span>
                      {getActionBadge(log.action)}
                      <Badge variant="outline" className="text-xs">
                        {getEntityName(log.entity)}
                      </Badge>
                      {!log.success && (
                        <Badge className="bg-red-100 text-red-800 border-0 text-xs">
                          Fallido
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-900 mb-1">
                      {log.details}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{log.id}</span>
                      <span>•</span>
                      <span>{log.userRole}</span>
                      <span>•</span>
                      <span>IP: {log.ipAddress}</span>
                      {log.entityId && (
                        <>
                          <span>•</span>
                          <span>Entidad: {log.entityId}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-xs text-gray-600">
                      {formatTimeAgo(log.timestamp)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(log.timestamp).toLocaleString("es-DO", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                {log.changes && (
                  <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
                    <p className="font-semibold text-blue-900 mb-1">Cambios:</p>
                    {Object.entries(log.changes).map(([key, value]) => (
                      <p key={key} className="text-blue-800">
                        {key}: <span className="line-through">{value.old}</span> → <span className="font-semibold">{value.new}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredLogs.length > 20 && (
            <div className="mt-4 text-center">
              <Button variant="outline">
                Cargar Más
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Activity Summary */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tasa de Éxito</CardTitle>
            <CardDescription>
              Acciones completadas exitosamente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-4xl font-bold text-green-600">
                {(((stats.totalLogs - stats.failedActions) / stats.totalLogs) * 100).toFixed(1)}%
              </h3>
              <Shield className="h-10 w-10 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Acciones por Hora</CardTitle>
            <CardDescription>
              Promedio de actividad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-4xl font-bold text-blue-600">
                {(stats.last24h / 24).toFixed(1)}
              </h3>
              <Activity className="h-10 w-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Retención de Logs</CardTitle>
            <CardDescription>
              Días de almacenamiento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-4xl font-bold text-purple-600">
                90
              </h3>
              <Database className="h-10 w-10 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
