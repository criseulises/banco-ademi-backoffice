"use client"

import { Shield, Users, CheckCircle, XCircle, Edit } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function RolesPage() {
  const roles = [
    {
      id: "admin",
      name: "Administrador",
      description: "Acceso completo al sistema",
      users: 2,
      color: "bg-purple-100 text-purple-800",
      permissions: {
        users: { view: true, create: true, edit: true, delete: true },
        transactions: { view: true, create: true, edit: true, delete: true },
        alerts: { view: true, create: true, edit: true, delete: true },
        compliance: { view: true, create: true, edit: true, delete: true },
        reports: { view: true, create: true, edit: true, delete: true },
        settings: { view: true, create: true, edit: true, delete: true },
      },
    },
    {
      id: "compliance_officer",
      name: "Oficial de Cumplimiento",
      description: "Gestión de cumplimiento y auditoría",
      users: 5,
      color: "bg-blue-100 text-blue-800",
      permissions: {
        users: { view: true, create: false, edit: false, delete: false },
        transactions: { view: true, create: false, edit: false, delete: false },
        alerts: { view: true, create: true, edit: true, delete: false },
        compliance: { view: true, create: true, edit: true, delete: true },
        reports: { view: true, create: true, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
      },
    },
    {
      id: "operations_manager",
      name: "Gerente de Operaciones",
      description: "Gestión de operaciones y transacciones",
      users: 5,
      color: "bg-cyan-100 text-cyan-800",
      permissions: {
        users: { view: true, create: false, edit: false, delete: false },
        transactions: { view: true, create: false, edit: true, delete: false },
        alerts: { view: true, create: false, edit: false, delete: false },
        compliance: { view: true, create: false, edit: false, delete: false },
        reports: { view: true, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
      },
    },
    {
      id: "support_agent",
      name: "Agente de Soporte",
      description: "Soporte al usuario",
      users: 8,
      color: "bg-green-100 text-green-800",
      permissions: {
        users: { view: true, create: false, edit: false, delete: false },
        transactions: { view: true, create: false, edit: false, delete: false },
        alerts: { view: true, create: false, edit: false, delete: false },
        compliance: { view: false, create: false, edit: false, delete: false },
        reports: { view: false, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
      },
    },
    {
      id: "product_manager",
      name: "Gerente de Producto",
      description: "Gestión de productos financieros",
      users: 3,
      color: "bg-orange-100 text-orange-800",
      permissions: {
        users: { view: true, create: false, edit: false, delete: false },
        transactions: { view: true, create: false, edit: false, delete: false },
        alerts: { view: true, create: false, edit: false, delete: false },
        compliance: { view: false, create: false, edit: false, delete: false },
        reports: { view: true, create: true, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
      },
    },
    {
      id: "risk_analyst",
      name: "Analista de Riesgo",
      description: "Análisis de riesgos",
      users: 4,
      color: "bg-red-100 text-red-800",
      permissions: {
        users: { view: true, create: false, edit: false, delete: false },
        transactions: { view: true, create: false, edit: false, delete: false },
        alerts: { view: true, create: false, edit: false, delete: false },
        compliance: { view: true, create: false, edit: false, delete: false },
        reports: { view: true, create: true, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
      },
    },
    {
      id: "auditor",
      name: "Auditor",
      description: "Solo lectura para auditoría",
      users: 3,
      color: "bg-gray-100 text-gray-800",
      permissions: {
        users: { view: true, create: false, edit: false, delete: false },
        transactions: { view: true, create: false, edit: false, delete: false },
        alerts: { view: true, create: false, edit: false, delete: false },
        compliance: { view: true, create: false, edit: false, delete: false },
        reports: { view: true, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
      },
    },
  ]

  const modules = [
    { id: "users", name: "Usuarios" },
    { id: "transactions", name: "Transacciones" },
    { id: "alerts", name: "Alertas" },
    { id: "compliance", name: "Cumplimiento" },
    { id: "reports", name: "Reportes" },
    { id: "settings", name: "Configuración" },
  ]

  const actions = [
    { id: "view", name: "Ver" },
    { id: "create", name: "Crear" },
    { id: "edit", name: "Editar" },
    { id: "delete", name: "Eliminar" },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-8 w-8" style={{ color: "#0095A9" }} />
          <h1 className="text-3xl font-bold text-gray-900">
            Roles y Permisos
          </h1>
        </div>
        <p className="text-gray-600">
          Gestiona los roles del sistema y sus permisos
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Roles
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {roles.length}
              </h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Usuarios Totales
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {roles.reduce((sum, role) => sum + role.users, 0)}
              </h3>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Módulos
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {modules.length}
              </h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Permisos
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {modules.length * actions.length}
              </h3>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Roles Cards */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Roles del Sistema
        </h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => (
            <Card key={role.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className={`${role.color} border-0 mb-2`}>
                      {role.name}
                    </Badge>
                    <CardTitle className="text-lg">{role.name}</CardTitle>
                    <CardDescription className="text-sm mt-1">
                      {role.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Usuarios asignados:</span>
                    <span className="font-semibold text-gray-900">
                      {role.users}
                    </span>
                  </div>
                  <Button variant="outline" className="w-full" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Permisos
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Permissions Matrix */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Matriz de Permisos</CardTitle>
              <CardDescription>
                Permisos por rol y módulo
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Editar Matriz
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Módulo</TableHead>
                  {roles.map((role) => (
                    <TableHead key={role.id} className="text-center">
                      <Badge className={`${role.color} border-0 text-xs`}>
                        {role.name.split(" ")[0]}
                      </Badge>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {modules.map((module) => (
                  <TableRow key={module.id}>
                    <TableCell className="font-medium">{module.name}</TableCell>
                    {roles.map((role) => {
                      const perms = role.permissions[module.id as keyof typeof role.permissions]
                      const hasAnyPermission = perms && Object.values(perms).some((p) => p)

                      return (
                        <TableCell key={role.id} className="text-center">
                          {hasAnyPermission ? (
                            <div className="flex flex-col gap-1">
                              {perms.view && (
                                <span className="text-xs text-gray-600">Ver</span>
                              )}
                              {perms.create && (
                                <span className="text-xs text-green-600">Crear</span>
                              )}
                              {perms.edit && (
                                <span className="text-xs text-blue-600">Editar</span>
                              )}
                              {perms.delete && (
                                <span className="text-xs text-red-600">Eliminar</span>
                              )}
                            </div>
                          ) : (
                            <XCircle className="h-5 w-5 text-gray-300 mx-auto" />
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
