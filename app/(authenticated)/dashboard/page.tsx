"use client"

import { useAuth } from "@/hooks/use-auth"
import { StatsCard } from "@/components/dashboard/stats-card"
import { TransactionChart } from "@/components/dashboard/transaction-chart"
import { DistributionChart } from "@/components/dashboard/distribution-chart"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { AlertsWidget } from "@/components/dashboard/alerts-widget"
import { ComplianceWidget } from "@/components/dashboard/compliance-widget"
import { dashboardStats } from "@/lib/mock-data/dashboard-data"
import { Users, Activity, AlertTriangle, Ticket } from "lucide-react"
import { colors } from "@/lib/colors"

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Bienvenido, {user.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Usuarios Activos"
          value={dashboardStats.activeUsers.toLocaleString()}
          icon={Users}
          subtitle={`Total: ${dashboardStats.totalUsers.toLocaleString()}`}
          trend={{
            value: dashboardStats.userGrowth,
            isPositive: true,
          }}
          iconColor={colors.primary}
          iconBgColor="#E0F7FA"
        />
        <StatsCard
          title="Transacciones Hoy"
          value={dashboardStats.todayTransactions.toLocaleString()}
          icon={Activity}
          subtitle={`RD$ ${dashboardStats.transactionVolume.toLocaleString("es-DO", { minimumFractionDigits: 2 })}`}
          trend={{
            value: dashboardStats.transactionGrowth,
            isPositive: true,
          }}
          iconColor={colors.secondary}
          iconBgColor="#FFE5D9"
        />
        <StatsCard
          title="Alertas Pendientes"
          value={dashboardStats.pendingAlerts}
          icon={AlertTriangle}
          subtitle="Requieren atención"
          iconColor="#FF9800"
          iconBgColor="#FFF3E0"
        />
        <StatsCard
          title="Tickets Abiertos"
          value={dashboardStats.openTickets}
          icon={Ticket}
          subtitle="Soporte al usuario"
          iconColor="#9C27B0"
          iconBgColor="#F3E5F5"
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <TransactionChart />
        <DistributionChart />
      </div>

      {/* Activity Widgets */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <RecentTransactions />
        <AlertsWidget />
        <ComplianceWidget />
      </div>
    </div>
  )
}
