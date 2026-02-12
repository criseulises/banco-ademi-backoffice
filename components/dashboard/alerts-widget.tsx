import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { alerts } from "@/lib/mock-data/dashboard-data"
import { AlertTriangle, Shield, Activity, DollarSign, ArrowUpRight } from "lucide-react"
import { colors } from "@/lib/colors"

export function AlertsWidget() {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "security":
        return <Shield className="h-4 w-4" />
      case "compliance":
        return <AlertTriangle className="h-4 w-4" />
      case "system":
        return <Activity className="h-4 w-4" />
      case "transaction":
        return <DollarSign className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case "high":
        return "Alta"
      case "medium":
        return "Media"
      case "low":
        return "Baja"
      default:
        return severity
    }
  }

  // Show only unread alerts
  const unreadAlerts = alerts.filter((alert) => !alert.read)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          Alertas Urgentes
          {unreadAlerts.length > 0 && (
            <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full">
              {unreadAlerts.length}
            </span>
          )}
        </CardTitle>
        <a
          href="/alertas"
          className="text-sm font-medium flex items-center gap-1 hover:underline"
          style={{ color: colors.primary }}
        >
          Ver todas
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {unreadAlerts.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              No hay alertas pendientes
            </p>
          ) : (
            unreadAlerts.map((alert) => (
              <div
                key={alert.id}
                className="p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${getSeverityColor(alert.severity)}`}
                  >
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-semibold text-sm text-gray-900 line-clamp-1">
                        {alert.title}
                      </h4>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${getSeverityColor(alert.severity)}`}
                      >
                        {getSeverityLabel(alert.severity)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                      {alert.description}
                    </p>
                    <p className="text-xs text-gray-400">{alert.timestamp}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
