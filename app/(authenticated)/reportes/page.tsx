"use client"

import { FileBarChart, Download, Calendar, Users, ArrowLeftRight, Shield, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function ReportsPage() {
  const handleGenerateReport = (reportType: string) => {
    toast.success(`Generando reporte de ${reportType}...`)
  }

  const reportTemplates = [
    {
      id: "users",
      title: "Reporte de Usuarios",
      description: "Estadísticas de usuarios, registros y actividad",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: "transactions",
      title: "Reporte de Transacciones",
      description: "Análisis de transacciones por periodo",
      icon: ArrowLeftRight,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: "compliance",
      title: "Reporte de Cumplimiento",
      description: "Estado KYC/AML y verificaciones",
      icon: Shield,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      id: "financial",
      title: "Reporte Financiero",
      description: "Balance, ingresos y comisiones",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      id: "alerts",
      title: "Reporte de Alertas",
      description: "Alertas por tipo y severidad",
      icon: FileBarChart,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      id: "executive",
      title: "Reporte Ejecutivo",
      description: "Resumen general para dirección",
      icon: FileBarChart,
      color: "text-gray-600",
      bgColor: "bg-gray-100",
    },
  ]

  const scheduledReports = [
    {
      name: "Reporte Diario de Transacciones",
      frequency: "Diario",
      lastRun: "2024-02-11 06:00:00",
      status: "Activo",
    },
    {
      name: "Reporte Semanal de Usuarios",
      frequency: "Semanal",
      lastRun: "2024-02-05 08:00:00",
      status: "Activo",
    },
    {
      name: "Reporte Mensual de Cumplimiento",
      frequency: "Mensual",
      lastRun: "2024-02-01 10:00:00",
      status: "Activo",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <FileBarChart className="h-8 w-8" style={{ color: "#0095A9" }} />
          <h1 className="text-3xl font-bold text-gray-900">
            Reportes y Analytics
          </h1>
        </div>
        <p className="text-gray-600">
          Genera reportes personalizados y consulta analytics del sistema
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Reportes Generados
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                156
              </h3>
              <p className="text-xs text-gray-500 mt-1">Este mes</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileBarChart className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Programados
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {scheduledReports.length}
              </h3>
              <p className="text-xs text-gray-500 mt-1">Activos</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Último Reporte
              </p>
              <h3 className="text-lg font-bold text-gray-900 mt-1">
                Hace 2h
              </h3>
              <p className="text-xs text-gray-500 mt-1">Transacciones</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Download className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Formatos
              </p>
              <h3 className="text-lg font-bold text-gray-900 mt-1">
                PDF • Excel
              </h3>
              <p className="text-xs text-gray-500 mt-1">Disponibles</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <FileBarChart className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Custom Report Generator */}
      <Card>
        <CardHeader>
          <CardTitle>Generador de Reportes Personalizado</CardTitle>
          <CardDescription>
            Selecciona los parámetros para generar tu reporte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="report-type">Tipo de Reporte</Label>
              <Select>
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="users">Usuarios</SelectItem>
                  <SelectItem value="transactions">Transacciones</SelectItem>
                  <SelectItem value="compliance">Cumplimiento</SelectItem>
                  <SelectItem value="financial">Financiero</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-from">Fecha Desde</Label>
              <Input id="date-from" type="date" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-to">Fecha Hasta</Label>
              <Input id="date-to" type="date" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="format">Formato</Label>
              <Select>
                <SelectTrigger id="format">
                  <SelectValue placeholder="Seleccionar formato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button style={{ backgroundColor: "#0095A9" }}>
              <Download className="h-4 w-4 mr-2" />
              Generar Reporte
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Programar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Predefined Report Templates */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Reportes Predefinidos
        </h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reportTemplates.map((template) => {
            const Icon = template.icon
            return (
              <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 ${template.bgColor} rounded-lg`}>
                        <Icon className={`h-6 w-6 ${template.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{template.title}</CardTitle>
                        <CardDescription className="text-sm mt-1">
                          {template.description}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleGenerateReport(template.title)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleGenerateReport(template.title)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Excel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Scheduled Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Reportes Programados</CardTitle>
          <CardDescription>
            Reportes que se generan automáticamente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduledReports.map((report, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{report.name}</h4>
                    <p className="text-sm text-gray-500">
                      Frecuencia: {report.frequency} • Última ejecución:{" "}
                      {new Date(report.lastRun).toLocaleDateString("es-DO")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {report.status}
                  </span>
                  <Button variant="ghost" size="sm">
                    Editar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
