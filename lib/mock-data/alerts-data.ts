/**
 * Mock Alerts Data for Banco ADEMI Backoffice
 * Contains sample alerts data for security, compliance, and system monitoring
 */

export type AlertType = "security" | "compliance" | "system" | "transaction" | "fraud"

export type AlertSeverity = "critical" | "high" | "medium" | "low"

export type AlertStatus = "open" | "assigned" | "in_progress" | "resolved" | "closed"

export interface Alert {
  id: string
  type: AlertType
  severity: AlertSeverity
  status: AlertStatus
  title: string
  description: string
  userId?: string
  userName?: string
  transactionId?: string
  assignedTo?: string
  assignedToName?: string
  createdAt: string
  updatedAt: string
  resolvedAt?: string
  resolvedBy?: string
  notes?: string
  metadata?: {
    ipAddress?: string
    location?: string
    deviceId?: string
    riskScore?: number
    flaggedReason?: string
  }
}

// Generate alerts
const generateAlerts = (): Alert[] => {
  const now = new Date()

  const alerts: Alert[] = [
    // Critical Security Alerts
    {
      id: "ALT-001",
      type: "security",
      severity: "critical",
      status: "open",
      title: "Múltiples intentos de acceso fallidos",
      description: "Se detectaron 8 intentos de inicio de sesión fallidos desde IP sospechosa en los últimos 15 minutos",
      userId: "USR-4521",
      userName: "Carlos Méndez",
      createdAt: new Date(now.getTime() - 25 * 60000).toISOString(),
      updatedAt: new Date(now.getTime() - 25 * 60000).toISOString(),
      metadata: {
        ipAddress: "187.45.23.156",
        location: "Santo Domingo, DO",
        deviceId: "DEV-98234",
      },
    },
    {
      id: "ALT-002",
      type: "fraud",
      severity: "critical",
      status: "assigned",
      title: "Transacción sospechosa detectada",
      description: "Transacción de RD$150,000 desde ubicación no habitual",
      userId: "USR-7821",
      userName: "María González",
      transactionId: "TXN-000045",
      assignedTo: "compliance@bancoademi.com",
      assignedToName: "Carlos Cumplimiento",
      createdAt: new Date(now.getTime() - 120 * 60000).toISOString(),
      updatedAt: new Date(now.getTime() - 45 * 60000).toISOString(),
      metadata: {
        ipAddress: "45.234.12.89",
        location: "Nueva York, US",
        riskScore: 85,
        flaggedReason: "Ubicación inusual + Monto elevado",
      },
    },
    {
      id: "ALT-003",
      type: "fraud",
      severity: "high",
      status: "in_progress",
      title: "Patrón de transacciones estructuradas",
      description: "Usuario realizó 5 transacciones de RD$9,900 en 2 horas",
      userId: "USR-3421",
      userName: "Pedro Ramírez",
      assignedTo: "compliance@bancoademi.com",
      assignedToName: "Carlos Cumplimiento",
      createdAt: new Date(now.getTime() - 180 * 60000).toISOString(),
      updatedAt: new Date(now.getTime() - 30 * 60000).toISOString(),
      metadata: {
        riskScore: 78,
        flaggedReason: "Posible evasión de límites",
      },
    },

    // Compliance Alerts
    {
      id: "ALT-004",
      type: "compliance",
      severity: "high",
      status: "open",
      title: "Verificación KYC vencida",
      description: "25 usuarios con documentos de identidad vencidos",
      createdAt: new Date(now.getTime() - 240 * 60000).toISOString(),
      updatedAt: new Date(now.getTime() - 240 * 60000).toISOString(),
      metadata: {
        flaggedReason: "Documentos vencidos por más de 30 días",
      },
    },
    {
      id: "ALT-005",
      type: "compliance",
      severity: "medium",
      status: "assigned",
      title: "Usuario en lista de vigilancia",
      description: "Coincidencia parcial con lista PEP",
      userId: "USR-5643",
      userName: "Ana Rodríguez",
      assignedTo: "compliance@bancoademi.com",
      assignedToName: "Carlos Cumplimiento",
      createdAt: new Date(now.getTime() - 360 * 60000).toISOString(),
      updatedAt: new Date(now.getTime() - 300 * 60000).toISOString(),
      metadata: {
        flaggedReason: "Nombre similar en lista PEP - requiere verificación manual",
      },
    },
    {
      id: "ALT-006",
      type: "compliance",
      severity: "medium",
      status: "resolved",
      title: "Reporte mensual pendiente",
      description: "Informe AML del mes anterior aún no enviado",
      assignedTo: "compliance@bancoademi.com",
      assignedToName: "Carlos Cumplimiento",
      createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60000).toISOString(),
      updatedAt: new Date(now.getTime() - 12 * 60 * 60000).toISOString(),
      resolvedAt: new Date(now.getTime() - 12 * 60 * 60000).toISOString(),
      resolvedBy: "Carlos Cumplimiento",
      notes: "Reporte enviado a la SIB exitosamente",
    },

    // Transaction Alerts
    {
      id: "ALT-007",
      type: "transaction",
      severity: "high",
      status: "open",
      title: "Transacción bloqueada por límite",
      description: "Intento de transferencia de RD$500,000 excede límite diario",
      userId: "USR-8765",
      userName: "Jorge López",
      transactionId: "TXN-000123",
      createdAt: new Date(now.getTime() - 60 * 60000).toISOString(),
      updatedAt: new Date(now.getTime() - 60 * 60000).toISOString(),
      metadata: {
        riskScore: 45,
        flaggedReason: "Excede límite diario de RD$250,000",
      },
    },
    {
      id: "ALT-008",
      type: "transaction",
      severity: "medium",
      status: "resolved",
      title: "Transacción internacional rechazada",
      description: "Pago a país de alto riesgo bloqueado",
      userId: "USR-2341",
      userName: "Laura Martínez",
      transactionId: "TXN-000089",
      assignedTo: "operations@bancoademi.com",
      assignedToName: "Laura Operaciones",
      createdAt: new Date(now.getTime() - 3 * 60 * 60000).toISOString(),
      updatedAt: new Date(now.getTime() - 2 * 60 * 60000).toISOString(),
      resolvedAt: new Date(now.getTime() - 2 * 60 * 60000).toISOString(),
      resolvedBy: "Laura Operaciones",
      notes: "Usuario contactado y verificado. Transacción autorizada manualmente.",
    },

    // System Alerts
    {
      id: "ALT-009",
      type: "system",
      severity: "medium",
      status: "in_progress",
      title: "Alto uso de CPU en servidor de base de datos",
      description: "CPU al 85% durante los últimos 30 minutos",
      assignedTo: "admin@bancoademi.com",
      assignedToName: "Juan Administrador",
      createdAt: new Date(now.getTime() - 40 * 60000).toISOString(),
      updatedAt: new Date(now.getTime() - 10 * 60000).toISOString(),
      metadata: {
        flaggedReason: "Posible necesidad de optimización de consultas",
      },
    },
    {
      id: "ALT-010",
      type: "system",
      severity: "low",
      status: "closed",
      title: "Mantenimiento programado completado",
      description: "Actualización de seguridad aplicada exitosamente",
      assignedTo: "admin@bancoademi.com",
      assignedToName: "Juan Administrador",
      createdAt: new Date(now.getTime() - 24 * 60 * 60000).toISOString(),
      updatedAt: new Date(now.getTime() - 20 * 60 * 60000).toISOString(),
      resolvedAt: new Date(now.getTime() - 20 * 60 * 60000).toISOString(),
      resolvedBy: "Juan Administrador",
      status: "closed",
      notes: "Todos los servicios operando normalmente post-mantenimiento",
    },

    // More Security Alerts
    {
      id: "ALT-011",
      type: "security",
      severity: "high",
      status: "open",
      title: "Acceso desde dispositivo no reconocido",
      description: "Usuario accedió desde nuevo dispositivo sin verificación 2FA",
      userId: "USR-6754",
      userName: "Roberto Sánchez",
      createdAt: new Date(now.getTime() - 90 * 60000).toISOString(),
      updatedAt: new Date(now.getTime() - 90 * 60000).toISOString(),
      metadata: {
        ipAddress: "190.123.45.67",
        location: "Santiago, DO",
        deviceId: "DEV-UNKNOWN",
      },
    },
    {
      id: "ALT-012",
      type: "security",
      severity: "medium",
      status: "assigned",
      title: "Cambio de contraseña desde IP sospechosa",
      description: "Solicitud de cambio de contraseña desde VPN/Proxy",
      userId: "USR-3456",
      userName: "Diana Torres",
      assignedTo: "support@bancoademi.com",
      assignedToName: "Pedro Soporte",
      createdAt: new Date(now.getTime() - 150 * 60000).toISOString(),
      updatedAt: new Date(now.getTime() - 120 * 60000).toISOString(),
      metadata: {
        ipAddress: "198.23.45.12",
        location: "Unknown (VPN)",
      },
    },

    // More Compliance Alerts
    {
      id: "ALT-013",
      type: "compliance",
      severity: "low",
      status: "resolved",
      title: "Actualización de políticas requerida",
      description: "15 usuarios no han aceptado nuevos términos y condiciones",
      assignedTo: "compliance@bancoademi.com",
      assignedToName: "Ana Martínez",
      createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60000).toISOString(),
      updatedAt: new Date(now.getTime() - 3 * 24 * 60 * 60000).toISOString(),
      resolvedAt: new Date(now.getTime() - 3 * 24 * 60 * 60000).toISOString(),
      resolvedBy: "Ana Martínez",
      notes: "Notificaciones enviadas. 12 usuarios ya aceptaron.",
    },
  ]

  return alerts
}

export const mockAlerts = generateAlerts()

// Helper functions
export const getAlertById = (id: string): Alert | undefined => {
  return mockAlerts.find((alert) => alert.id === id)
}

export const getAlertsByType = (type: AlertType): Alert[] => {
  return mockAlerts.filter((alert) => alert.type === type)
}

export const getAlertsBySeverity = (severity: AlertSeverity): Alert[] => {
  return mockAlerts.filter((alert) => alert.severity === severity)
}

export const getAlertsByStatus = (status: AlertStatus): Alert[] => {
  return mockAlerts.filter((alert) => alert.status === status)
}

export const getOpenAlerts = (): Alert[] => {
  return mockAlerts.filter((alert) =>
    alert.status === "open" || alert.status === "assigned" || alert.status === "in_progress"
  )
}

// Display names
export const alertTypeNames: Record<AlertType, string> = {
  security: "Seguridad",
  compliance: "Cumplimiento",
  system: "Sistema",
  transaction: "Transacción",
  fraud: "Fraude",
}

export const alertSeverityNames: Record<AlertSeverity, string> = {
  critical: "Crítica",
  high: "Alta",
  medium: "Media",
  low: "Baja",
}

export const alertStatusNames: Record<AlertStatus, string> = {
  open: "Abierta",
  assigned: "Asignada",
  in_progress: "En Progreso",
  resolved: "Resuelta",
  closed: "Cerrada",
}

// Statistics
export const getAlertStats = () => {
  return {
    total: mockAlerts.length,
    open: getAlertsByStatus("open").length,
    assigned: getAlertsByStatus("assigned").length,
    inProgress: getAlertsByStatus("in_progress").length,
    resolved: getAlertsByStatus("resolved").length,
    closed: getAlertsByStatus("closed").length,
    critical: getAlertsBySeverity("critical").length,
    high: getAlertsBySeverity("high").length,
    security: getAlertsByType("security").length,
    fraud: getAlertsByType("fraud").length,
    compliance: getAlertsByType("compliance").length,
  }
}
