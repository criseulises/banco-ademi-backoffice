import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { recentTransactions } from "@/lib/mock-data/dashboard-data"
import { ArrowUpRight, Clock, CheckCircle, XCircle } from "lucide-react"
import { colors } from "@/lib/colors"

export function RecentTransactions() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      failed: "bg-red-100 text-red-800",
    }
    const labels = {
      completed: "Completada",
      pending: "Pendiente",
      failed: "Fallida",
    }
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {getStatusIcon(status)}
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Transacciones Recientes</CardTitle>
        <a
          href="/transacciones"
          className="text-sm font-medium flex items-center gap-1 hover:underline"
          style={{ color: colors.primary }}
        >
          Ver todas
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div className="flex-1">
                <p className="font-semibold text-sm text-gray-900">
                  {transaction.user}
                </p>
                <p className="text-xs text-gray-500">{transaction.type}</p>
                <p className="text-xs text-gray-400 mt-1">{transaction.timestamp}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="font-bold text-sm" style={{ color: colors.textPrimary }}>
                  RD$ {transaction.amount.toLocaleString("es-DO", { minimumFractionDigits: 2 })}
                </p>
                {getStatusBadge(transaction.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
