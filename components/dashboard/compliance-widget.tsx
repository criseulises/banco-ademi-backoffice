import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { complianceStatus } from "@/lib/mock-data/dashboard-data"
import { CheckCircle, AlertCircle, XCircle, ArrowUpRight } from "lucide-react"
import { colors } from "@/lib/colors"

export function ComplianceWidget() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      case "critical":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      compliant: "bg-green-100 text-green-800",
      warning: "bg-yellow-100 text-yellow-800",
      critical: "bg-red-100 text-red-800",
    }
    const labels = {
      compliant: "Conforme",
      warning: "Advertencia",
      critical: "Crítico",
    }
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  const compliantCount = complianceStatus.filter(item => item.status === "compliant").length
  const totalModules = complianceStatus.length
  const compliancePercentage = Math.round((compliantCount / totalModules) * 100)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Estado de Cumplimiento</CardTitle>
        <a
          href="/cumplimiento"
          className="text-sm font-medium flex items-center gap-1 hover:underline"
          style={{ color: colors.primary }}
        >
          Ver detalles
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </CardHeader>
      <CardContent>
        {/* Overall Status */}
        <div className="mb-4 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-green-900">Estado General</h3>
            <span className="text-2xl font-bold text-green-700">{compliancePercentage}%</span>
          </div>
          <div className="w-full bg-green-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${compliancePercentage}%` }}
            />
          </div>
          <p className="text-xs text-green-700 mt-2">
            {compliantCount} de {totalModules} módulos conformes
          </p>
        </div>

        {/* Module Status List */}
        <div className="space-y-3">
          {complianceStatus.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                {getStatusIcon(item.status)}
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-900">{item.module}</p>
                  <p className="text-xs text-gray-500">Última revisión: {item.lastCheck}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                {getStatusBadge(item.status)}
                {item.issues > 0 && (
                  <span className="text-xs text-red-600 font-medium">
                    {item.issues} {item.issues === 1 ? "problema" : "problemas"}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
