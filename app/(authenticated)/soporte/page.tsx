"use client"

import { useState } from "react"
import { Headphones, MessageSquare, Clock, CheckCircle, AlertCircle, User, Send, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

type TicketStatus = "open" | "in_progress" | "resolved" | "closed"
type TicketPriority = "low" | "medium" | "high" | "urgent"
type TicketCategory = "technical" | "billing" | "account" | "transaction" | "feature_request" | "other"

interface SupportTicket {
  id: string
  subject: string
  description: string
  category: TicketCategory
  priority: TicketPriority
  status: TicketStatus
  createdBy: string
  assignedTo?: string
  createdAt: string
  updatedAt: string
  responses: number
}

export default function SoportePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const tickets: SupportTicket[] = [
    {
      id: "TKT-001",
      subject: "Error al procesar transferencia internacional",
      description: "El sistema muestra error 500 al intentar procesar transferencias a cuentas en USA",
      category: "technical",
      priority: "urgent",
      status: "in_progress",
      createdBy: "María González",
      assignedTo: "Soporte Técnico",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      responses: 3,
    },
    {
      id: "TKT-002",
      subject: "Consulta sobre facturación mensual",
      description: "Necesito entender el cargo adicional en mi factura de este mes",
      category: "billing",
      priority: "medium",
      status: "open",
      createdBy: "Juan Pérez",
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      responses: 0,
    },
    {
      id: "TKT-003",
      subject: "No puedo acceder a mi cuenta",
      description: "Olvidé mi contraseña y el email de recuperación no llega",
      category: "account",
      priority: "high",
      status: "in_progress",
      createdBy: "Ana Rodríguez",
      assignedTo: "Soporte Nivel 1",
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      responses: 2,
    },
    {
      id: "TKT-004",
      subject: "Transacción rechazada sin razón",
      description: "Mi pago fue rechazado pero tengo fondos suficientes",
      category: "transaction",
      priority: "high",
      status: "resolved",
      createdBy: "Carlos Martínez",
      assignedTo: "Soporte Técnico",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      responses: 5,
    },
    {
      id: "TKT-005",
      subject: "Sugerencia: Dark mode para la app móvil",
      description: "Sería genial tener un modo oscuro en la aplicación móvil",
      category: "feature_request",
      priority: "low",
      status: "open",
      createdBy: "Laura Sánchez",
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      responses: 1,
    },
    {
      id: "TKT-006",
      subject: "Error en el dashboard de reportes",
      description: "Los gráficos no se cargan correctamente en Chrome",
      category: "technical",
      priority: "medium",
      status: "closed",
      createdBy: "Pedro López",
      assignedTo: "Desarrollo",
      createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      responses: 4,
    },
  ]

  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    inProgress: tickets.filter((t) => t.status === "in_progress").length,
    resolved: tickets.filter((t) => t.status === "resolved").length,
    avgResponseTime: 2.4, // hours
  }

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || ticket.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: TicketStatus) => {
    const variants: Record<TicketStatus, { color: string; label: string; icon: React.ReactNode }> = {
      open: {
        color: "bg-yellow-100 text-yellow-800",
        label: "Abierto",
        icon: <AlertCircle className="h-3 w-3 mr-1" />,
      },
      in_progress: {
        color: "bg-blue-100 text-blue-800",
        label: "En Progreso",
        icon: <Clock className="h-3 w-3 mr-1" />,
      },
      resolved: {
        color: "bg-green-100 text-green-800",
        label: "Resuelto",
        icon: <CheckCircle className="h-3 w-3 mr-1" />,
      },
      closed: {
        color: "bg-gray-100 text-gray-800",
        label: "Cerrado",
        icon: <CheckCircle className="h-3 w-3 mr-1" />,
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

  const getPriorityBadge = (priority: TicketPriority) => {
    const variants: Record<TicketPriority, { color: string; label: string }> = {
      low: { color: "bg-gray-100 text-gray-800", label: "Baja" },
      medium: { color: "bg-blue-100 text-blue-800", label: "Media" },
      high: { color: "bg-orange-100 text-orange-800", label: "Alta" },
      urgent: { color: "bg-red-100 text-red-800", label: "Urgente" },
    }
    const config = variants[priority]
    return (
      <Badge className={`${config.color} border-0 text-xs`}>
        {config.label}
      </Badge>
    )
  }

  const getCategoryName = (category: TicketCategory) => {
    const names: Record<TicketCategory, string> = {
      technical: "Técnico",
      billing: "Facturación",
      account: "Cuenta",
      transaction: "Transacción",
      feature_request: "Nueva Funcionalidad",
      other: "Otro",
    }
    return names[category]
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

  const handleCreateTicket = () => {
    toast.success("Ticket de soporte creado exitosamente")
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Headphones className="h-8 w-8" style={{ color: "#0095A9" }} />
          <h1 className="text-3xl font-bold text-gray-900">
            Centro de Soporte
          </h1>
        </div>
        <p className="text-gray-600">
          Gestiona tickets de soporte y solicitudes de ayuda
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Tickets
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {stats.total}
              </h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Abiertos
              </p>
              <h3 className="text-2xl font-bold text-yellow-600 mt-1">
                {stats.open}
              </h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                En Progreso
              </p>
              <h3 className="text-2xl font-bold text-blue-600 mt-1">
                {stats.inProgress}
              </h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Resueltos
              </p>
              <h3 className="text-2xl font-bold text-green-600 mt-1">
                {stats.resolved}
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
                Tiempo Respuesta
              </p>
              <h3 className="text-2xl font-bold text-purple-600 mt-1">
                {stats.avgResponseTime}h
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                promedio
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar tickets por asunto o descripción..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="open">Abiertos</SelectItem>
                <SelectItem value="in_progress">En Progreso</SelectItem>
                <SelectItem value="resolved">Resueltos</SelectItem>
                <SelectItem value="closed">Cerrados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tickets List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tickets de Soporte</CardTitle>
              <CardDescription>
                {filteredTickets.length} tickets encontrados
              </CardDescription>
            </div>
            <Button style={{ backgroundColor: "#0095A9" }}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Nuevo Ticket
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {ticket.subject}
                      </h4>
                      {getStatusBadge(ticket.status)}
                      {getPriorityBadge(ticket.priority)}
                      <Badge variant="outline" className="text-xs">
                        {getCategoryName(ticket.category)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {ticket.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{ticket.createdBy}</span>
                      </div>
                      <span>•</span>
                      <span>ID: {ticket.id}</span>
                      <span>•</span>
                      <span>{formatTimeAgo(ticket.createdAt)}</span>
                      {ticket.assignedTo && (
                        <>
                          <span>•</span>
                          <span>Asignado a: {ticket.assignedTo}</span>
                        </>
                      )}
                      <span>•</span>
                      <span>{ticket.responses} respuestas</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver Detalles
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-base">Base de Conocimiento</CardTitle>
                <CardDescription className="text-sm">
                  Artículos y guías de ayuda
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Headphones className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-base">Chat en Vivo</CardTitle>
                <CardDescription className="text-sm">
                  Soporte en tiempo real
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Send className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-base">Contacto Directo</CardTitle>
                <CardDescription className="text-sm">
                  Email o teléfono
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tasa de Resolución</CardTitle>
            <CardDescription>
              Tickets resueltos exitosamente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-4xl font-bold text-green-600">
                {(((stats.resolved + tickets.filter((t) => t.status === "closed").length) / stats.total) * 100).toFixed(0)}%
              </h3>
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Satisfacción del Cliente</CardTitle>
            <CardDescription>
              Rating promedio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-4xl font-bold text-yellow-600">
                4.7/5
              </h3>
              <span className="text-3xl">⭐</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tickets por Agente</CardTitle>
            <CardDescription>
              Promedio de carga de trabajo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-4xl font-bold text-blue-600">
                8.5
              </h3>
              <User className="h-10 w-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
