/**
 * Mock Dashboard Data for Banco ADEMI Backoffice
 * Contains statistics, metrics, and sample data for dashboard widgets
 */

export interface DashboardStats {
  totalUsers: number
  activeUsers: number
  todayTransactions: number
  transactionVolume: number
  pendingAlerts: number
  openTickets: number
  userGrowth: number
  transactionGrowth: number
}

export interface Transaction {
  id: string
  user: string
  type: string
  amount: number
  status: "completed" | "pending" | "failed"
  timestamp: string
}

export interface Alert {
  id: string
  type: "security" | "compliance" | "system" | "transaction"
  severity: "high" | "medium" | "low"
  title: string
  description: string
  timestamp: string
  read: boolean
}

export interface ComplianceItem {
  module: string
  status: "compliant" | "warning" | "critical"
  lastCheck: string
  issues: number
}

export interface ChartDataPoint {
  date: string
  transactions: number
  amount: number
}

// Mock Statistics
export const dashboardStats: DashboardStats = {
  totalUsers: 12847,
  activeUsers: 8932,
  todayTransactions: 3421,
  transactionVolume: 2847563.89,
  pendingAlerts: 12,
  openTickets: 28,
  userGrowth: 12.5,
  transactionGrowth: 8.3,
}

// Mock Recent Transactions
export const recentTransactions: Transaction[] = [
  {
    id: "TXN-2024-001",
    user: "María González",
    type: "Transferencia",
    amount: 5000.0,
    status: "completed",
    timestamp: "2024-02-11 14:32:15",
  },
  {
    id: "TXN-2024-002",
    user: "Juan Pérez",
    type: "Pago de Préstamo",
    amount: 12500.0,
    status: "completed",
    timestamp: "2024-02-11 14:28:42",
  },
  {
    id: "TXN-2024-003",
    user: "Ana Rodríguez",
    type: "Pago de Servicio",
    amount: 850.5,
    status: "pending",
    timestamp: "2024-02-11 14:15:33",
  },
  {
    id: "TXN-2024-004",
    user: "Carlos Martínez",
    type: "Transferencia",
    amount: 25000.0,
    status: "completed",
    timestamp: "2024-02-11 13:58:21",
  },
  {
    id: "TXN-2024-005",
    user: "Laura Sánchez",
    type: "Recarga Móvil",
    amount: 200.0,
    status: "failed",
    timestamp: "2024-02-11 13:45:18",
  },
]

// Mock Alerts
export const alerts: Alert[] = [
  {
    id: "ALT-001",
    type: "security",
    severity: "high",
    title: "Múltiples intentos de acceso fallidos",
    description: "Usuario ID 4521 - 5 intentos en 10 minutos",
    timestamp: "2024-02-11 14:25:00",
    read: false,
  },
  {
    id: "ALT-002",
    type: "compliance",
    severity: "medium",
    title: "Verificación KYC pendiente",
    description: "15 usuarios requieren verificación de documentos",
    timestamp: "2024-02-11 13:15:00",
    read: false,
  },
  {
    id: "ALT-003",
    type: "transaction",
    severity: "high",
    title: "Transacción sospechosa detectada",
    description: "Monto inusual: RD$150,000 - Usuario ID 7821",
    timestamp: "2024-02-11 12:45:00",
    read: false,
  },
  {
    id: "ALT-004",
    type: "system",
    severity: "low",
    title: "Mantenimiento programado",
    description: "Sistema de respaldos - Domingo 3:00 AM",
    timestamp: "2024-02-11 10:00:00",
    read: true,
  },
  {
    id: "ALT-005",
    type: "compliance",
    severity: "medium",
    title: "Reporte mensual pendiente",
    description: "Informe de cumplimiento vence en 3 días",
    timestamp: "2024-02-11 09:30:00",
    read: true,
  },
]

// Mock Compliance Status
export const complianceStatus: ComplianceItem[] = [
  {
    module: "KYC/AML",
    status: "compliant",
    lastCheck: "2024-02-11 08:00:00",
    issues: 0,
  },
  {
    module: "Seguridad de Datos",
    status: "compliant",
    lastCheck: "2024-02-11 07:30:00",
    issues: 0,
  },
  {
    module: "Auditoría de Transacciones",
    status: "warning",
    lastCheck: "2024-02-11 06:00:00",
    issues: 3,
  },
  {
    module: "Gestión de Accesos",
    status: "compliant",
    lastCheck: "2024-02-10 23:00:00",
    issues: 0,
  },
]

// Mock Chart Data - Last 7 days
export const transactionChartData: ChartDataPoint[] = [
  { date: "05 Feb", transactions: 2845, amount: 1850420.5 },
  { date: "06 Feb", transactions: 3124, amount: 2145680.25 },
  { date: "07 Feb", transactions: 2956, amount: 1980340.75 },
  { date: "08 Feb", transactions: 3387, amount: 2456780.0 },
  { date: "09 Feb", transactions: 3098, amount: 2234560.5 },
  { date: "10 Feb", transactions: 2876, amount: 1987650.25 },
  { date: "11 Feb", transactions: 3421, amount: 2847563.89 },
]

// Distribution by transaction type
export const transactionTypeData = [
  { name: "Transferencias", value: 45, amount: 1280350.5 },
  { name: "Pagos", value: 30, amount: 854265.75 },
  { name: "Servicios", value: 15, amount: 427132.89 },
  { name: "Recargas", value: 10, amount: 285814.75 },
]

// User distribution by channel
export const channelDistribution = [
  { name: "Web", users: 4521, percentage: 35.2 },
  { name: "Móvil", users: 6842, percentage: 53.2 },
  { name: "Sucursal", users: 1484, percentage: 11.6 },
]
