"use client"

import { UserPlus, CheckCircle, Clock, XCircle, FileText, Shield, CreditCard } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function OnboardingPage() {
  const onboardingStats = {
    total: 45,
    inProgress: 12,
    completed: 28,
    rejected: 5,
  }

  const onboardingSteps = [
    { id: 1, name: "Información Personal", icon: FileText, completed: 100 },
    { id: 2, name: "Verificación de Identidad", icon: Shield, completed: 85 },
    { id: 3, name: "Documentos KYC", icon: FileText, completed: 70 },
    { id: 4, name: "Aprobación de Cuenta", icon: CheckCircle, completed: 62 },
  ]

  const recentApplications = [
    {
      id: "ONB-001",
      name: "María González",
      email: "maria.gonzalez@email.com",
      step: "Verificación de Identidad",
      progress: 50,
      status: "in_progress",
      submittedAt: "2024-02-11 10:30:00",
    },
    {
      id: "ONB-002",
      name: "Juan Pérez",
      email: "juan.perez@email.com",
      step: "Documentos KYC",
      progress: 75,
      status: "in_progress",
      submittedAt: "2024-02-11 09:15:00",
    },
    {
      id: "ONB-003",
      name: "Ana Rodríguez",
      email: "ana.rodriguez@email.com",
      step: "Completado",
      progress: 100,
      status: "completed",
      submittedAt: "2024-02-10 16:45:00",
    },
    {
      id: "ONB-004",
      name: "Carlos Martínez",
      email: "carlos.martinez@email.com",
      step: "Información Personal",
      progress: 25,
      status: "in_progress",
      submittedAt: "2024-02-11 14:20:00",
    },
    {
      id: "ONB-005",
      name: "Laura Sánchez",
      email: "laura.sanchez@email.com",
      step: "Rechazado",
      progress: 60,
      status: "rejected",
      submittedAt: "2024-02-09 11:00:00",
    },
  ]

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      in_progress: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    }
    const labels: Record<string, string> = {
      in_progress: "En Progreso",
      completed: "Completado",
      rejected: "Rechazado",
    }
    return (
      <Badge className={`${variants[status]} border-0`}>
        {labels[status]}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <UserPlus className="h-8 w-8" style={{ color: "#0095A9" }} />
          <h1 className="text-3xl font-bold text-gray-900">
            Onboarding de Clientes
          </h1>
        </div>
        <p className="text-gray-600">
          Gestiona el proceso de registro de nuevos clientes
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Solicitudes
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {onboardingStats.total}
              </h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <UserPlus className="h-6 w-6 text-blue-600" />
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
                {onboardingStats.inProgress}
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
                Completados
              </p>
              <h3 className="text-2xl font-bold text-green-600 mt-1">
                {onboardingStats.completed}
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
                Rechazados
              </p>
              <h3 className="text-2xl font-bold text-red-600 mt-1">
                {onboardingStats.rejected}
              </h3>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Onboarding Steps Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Proceso de Onboarding</CardTitle>
          <CardDescription>
            Etapas del proceso de registro de nuevos clientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {onboardingSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <div
                  key={step.id}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Paso {step.id}</p>
                      <h4 className="font-semibold text-sm text-gray-900">
                        {step.name}
                      </h4>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Completado</span>
                      <span className="font-semibold">{step.completed}%</span>
                    </div>
                    <Progress value={step.completed} className="h-2" />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Applications */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Solicitudes Recientes</CardTitle>
              <CardDescription>
                Últimas solicitudes de onboarding
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Ver todas
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentApplications.map((application) => (
              <div
                key={application.id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">
                        {application.name}
                      </h4>
                      {getStatusBadge(application.status)}
                    </div>
                    <p className="text-sm text-gray-500">{application.email}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      ID: {application.id} • Enviado:{" "}
                      {new Date(application.submittedAt).toLocaleDateString("es-DO")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                    {application.status === "in_progress" && (
                      <Button size="sm" style={{ backgroundColor: "#0095A9" }}>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Procesar
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progreso: {application.step}</span>
                    <span className="font-semibold">{application.progress}%</span>
                  </div>
                  <Progress value={application.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Aprobar Pendientes</CardTitle>
                <CardDescription className="text-sm">
                  {onboardingStats.inProgress} solicitudes listas
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Revisar Documentos</CardTitle>
                <CardDescription className="text-sm">
                  Documentos pendientes de verificación
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Asignar Productos</CardTitle>
                <CardDescription className="text-sm">
                  Configurar cuentas y productos
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
