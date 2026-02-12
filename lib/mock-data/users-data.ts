/**
 * Mock Users Data for Banco ADEMI Backoffice
 * Contains sample user data for testing and demonstration
 */

export type UserRole =
  | "admin"
  | "compliance_officer"
  | "operations_manager"
  | "support_agent"
  | "product_manager"
  | "risk_analyst"
  | "auditor"

export type UserStatus = "active" | "inactive" | "suspended" | "blocked"

export interface BackofficeUserDetailed {
  id: string
  name: string
  email: string
  role: UserRole
  department: string
  status: UserStatus
  createdAt: string
  lastLogin: string | null
  phone: string
  position: string
  permissions: string[]
  avatar?: string
  twoFactorEnabled: boolean
  loginAttempts: number
  notes?: string
}

// Helper function to generate random date
const randomDate = (start: Date, end: Date): string => {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
  return date.toISOString().split("T")[0] + " " + date.toTimeString().split(" ")[0]
}

// Helper function to get last login (can be null for inactive users)
const getLastLogin = (status: UserStatus): string | null => {
  if (status === "inactive" || Math.random() > 0.8) return null
  const now = new Date()
  const daysAgo = Math.floor(Math.random() * 30)
  const lastLogin = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)
  return lastLogin.toISOString().split("T")[0] + " " + lastLogin.toTimeString().split(" ")[0]
}

// Permissions by role
const rolePermissions: Record<UserRole, string[]> = {
  admin: [
    "users.view",
    "users.create",
    "users.edit",
    "users.delete",
    "transactions.view",
    "transactions.approve",
    "transactions.cancel",
    "alerts.view",
    "alerts.manage",
    "compliance.view",
    "compliance.manage",
    "reports.view",
    "reports.create",
    "settings.view",
    "settings.edit",
  ],
  compliance_officer: [
    "users.view",
    "transactions.view",
    "alerts.view",
    "alerts.manage",
    "compliance.view",
    "compliance.manage",
    "reports.view",
    "reports.create",
  ],
  operations_manager: [
    "users.view",
    "transactions.view",
    "transactions.approve",
    "alerts.view",
    "reports.view",
  ],
  support_agent: [
    "users.view",
    "transactions.view",
    "alerts.view",
  ],
  product_manager: [
    "users.view",
    "transactions.view",
    "alerts.view",
    "reports.view",
    "reports.create",
  ],
  risk_analyst: [
    "users.view",
    "transactions.view",
    "alerts.view",
    "compliance.view",
    "reports.view",
    "reports.create",
  ],
  auditor: [
    "users.view",
    "transactions.view",
    "alerts.view",
    "compliance.view",
    "reports.view",
  ],
}

// Mock users data
export const mockUsers: BackofficeUserDetailed[] = [
  // Admins
  {
    id: "1",
    name: "Juan Administrador",
    email: "admin@bancoademi.com",
    role: "admin",
    department: "Tecnología",
    status: "active",
    createdAt: "2023-01-15 09:00:00",
    lastLogin: "2024-02-11 14:30:00",
    phone: "+1 (809) 555-0101",
    position: "Administrador de Sistemas",
    permissions: rolePermissions.admin,
    twoFactorEnabled: true,
    loginAttempts: 0,
  },
  {
    id: "2",
    name: "María Rodríguez",
    email: "maria.rodriguez@bancoademi.com",
    role: "admin",
    department: "Tecnología",
    status: "active",
    createdAt: "2023-02-10 10:30:00",
    lastLogin: "2024-02-11 13:45:00",
    phone: "+1 (809) 555-0102",
    position: "Directora de TI",
    permissions: rolePermissions.admin,
    twoFactorEnabled: true,
    loginAttempts: 0,
  },

  // Compliance Officers
  {
    id: "3",
    name: "Carlos Cumplimiento",
    email: "compliance@bancoademi.com",
    role: "compliance_officer",
    department: "Cumplimiento",
    status: "active",
    createdAt: "2023-01-20 08:00:00",
    lastLogin: "2024-02-11 12:15:00",
    phone: "+1 (809) 555-0103",
    position: "Oficial de Cumplimiento",
    permissions: rolePermissions.compliance_officer,
    twoFactorEnabled: true,
    loginAttempts: 0,
  },
  {
    id: "4",
    name: "Ana Martínez",
    email: "ana.martinez@bancoademi.com",
    role: "compliance_officer",
    department: "Cumplimiento",
    status: "active",
    createdAt: "2023-03-15 09:30:00",
    lastLogin: "2024-02-11 11:20:00",
    phone: "+1 (809) 555-0104",
    position: "Analista de Cumplimiento Senior",
    permissions: rolePermissions.compliance_officer,
    twoFactorEnabled: true,
    loginAttempts: 0,
  },
  {
    id: "5",
    name: "Roberto Sánchez",
    email: "roberto.sanchez@bancoademi.com",
    role: "compliance_officer",
    department: "Cumplimiento",
    status: "active",
    createdAt: "2023-05-20 10:00:00",
    lastLogin: "2024-02-10 16:30:00",
    phone: "+1 (809) 555-0105",
    position: "Especialista AML/KYC",
    permissions: rolePermissions.compliance_officer,
    twoFactorEnabled: false,
    loginAttempts: 0,
  },

  // Operations Managers
  {
    id: "6",
    name: "Laura Operaciones",
    email: "operations@bancoademi.com",
    role: "operations_manager",
    department: "Operaciones",
    status: "active",
    createdAt: "2023-02-01 09:00:00",
    lastLogin: "2024-02-11 14:00:00",
    phone: "+1 (809) 555-0106",
    position: "Gerente de Operaciones",
    permissions: rolePermissions.operations_manager,
    twoFactorEnabled: true,
    loginAttempts: 0,
  },
  {
    id: "7",
    name: "Miguel Pérez",
    email: "miguel.perez@bancoademi.com",
    role: "operations_manager",
    department: "Operaciones",
    status: "active",
    createdAt: "2023-04-10 08:30:00",
    lastLogin: "2024-02-11 10:45:00",
    phone: "+1 (809) 555-0107",
    position: "Supervisor de Operaciones",
    permissions: rolePermissions.operations_manager,
    twoFactorEnabled: true,
    loginAttempts: 0,
  },
  {
    id: "8",
    name: "Carmen Díaz",
    email: "carmen.diaz@bancoademi.com",
    role: "operations_manager",
    department: "Operaciones",
    status: "active",
    createdAt: "2023-06-05 09:15:00",
    lastLogin: "2024-02-09 15:20:00",
    phone: "+1 (809) 555-0108",
    position: "Coordinadora de Operaciones",
    permissions: rolePermissions.operations_manager,
    twoFactorEnabled: false,
    loginAttempts: 0,
  },

  // Support Agents
  {
    id: "9",
    name: "Pedro Soporte",
    email: "support@bancoademi.com",
    role: "support_agent",
    department: "Soporte",
    status: "active",
    createdAt: "2023-03-01 08:00:00",
    lastLogin: "2024-02-11 13:30:00",
    phone: "+1 (809) 555-0109",
    position: "Agente de Soporte",
    permissions: rolePermissions.support_agent,
    twoFactorEnabled: false,
    loginAttempts: 0,
  },
  {
    id: "10",
    name: "Isabel Gómez",
    email: "isabel.gomez@bancoademi.com",
    role: "support_agent",
    department: "Soporte",
    status: "active",
    createdAt: "2023-04-15 09:00:00",
    lastLogin: "2024-02-11 12:45:00",
    phone: "+1 (809) 555-0110",
    position: "Agente de Soporte Senior",
    permissions: rolePermissions.support_agent,
    twoFactorEnabled: false,
    loginAttempts: 0,
  },
  {
    id: "11",
    name: "Jorge Ramírez",
    email: "jorge.ramirez@bancoademi.com",
    role: "support_agent",
    department: "Soporte",
    status: "active",
    createdAt: "2023-07-01 10:00:00",
    lastLogin: "2024-02-11 11:15:00",
    phone: "+1 (809) 555-0111",
    position: "Agente de Soporte",
    permissions: rolePermissions.support_agent,
    twoFactorEnabled: false,
    loginAttempts: 0,
  },
  {
    id: "12",
    name: "Sofía Hernández",
    email: "sofia.hernandez@bancoademi.com",
    role: "support_agent",
    department: "Soporte",
    status: "active",
    createdAt: "2023-08-10 08:30:00",
    lastLogin: "2024-02-10 17:00:00",
    phone: "+1 (809) 555-0112",
    position: "Agente de Soporte",
    permissions: rolePermissions.support_agent,
    twoFactorEnabled: false,
    loginAttempts: 0,
  },
  {
    id: "13",
    name: "Daniel Torres",
    email: "daniel.torres@bancoademi.com",
    role: "support_agent",
    department: "Soporte",
    status: "inactive",
    createdAt: "2023-05-15 09:00:00",
    lastLogin: null,
    phone: "+1 (809) 555-0113",
    position: "Agente de Soporte",
    permissions: rolePermissions.support_agent,
    twoFactorEnabled: false,
    loginAttempts: 0,
    notes: "En licencia médica",
  },

  // Product Managers
  {
    id: "14",
    name: "Gabriela Producto",
    email: "product@bancoademi.com",
    role: "product_manager",
    department: "Producto",
    status: "active",
    createdAt: "2023-02-20 09:00:00",
    lastLogin: "2024-02-11 10:00:00",
    phone: "+1 (809) 555-0114",
    position: "Gerente de Producto",
    permissions: rolePermissions.product_manager,
    twoFactorEnabled: true,
    loginAttempts: 0,
  },
  {
    id: "15",
    name: "Ricardo Méndez",
    email: "ricardo.mendez@bancoademi.com",
    role: "product_manager",
    department: "Producto",
    status: "active",
    createdAt: "2023-06-15 10:00:00",
    lastLogin: "2024-02-10 14:30:00",
    phone: "+1 (809) 555-0115",
    position: "Product Owner",
    permissions: rolePermissions.product_manager,
    twoFactorEnabled: false,
    loginAttempts: 0,
  },

  // Risk Analysts
  {
    id: "16",
    name: "Patricia Riesgo",
    email: "risk@bancoademi.com",
    role: "risk_analyst",
    department: "Riesgos",
    status: "active",
    createdAt: "2023-01-25 08:00:00",
    lastLogin: "2024-02-11 13:00:00",
    phone: "+1 (809) 555-0116",
    position: "Analista de Riesgo",
    permissions: rolePermissions.risk_analyst,
    twoFactorEnabled: true,
    loginAttempts: 0,
  },
  {
    id: "17",
    name: "Fernando López",
    email: "fernando.lopez@bancoademi.com",
    role: "risk_analyst",
    department: "Riesgos",
    status: "active",
    createdAt: "2023-04-20 09:30:00",
    lastLogin: "2024-02-11 09:45:00",
    phone: "+1 (809) 555-0117",
    position: "Analista de Riesgo Senior",
    permissions: rolePermissions.risk_analyst,
    twoFactorEnabled: true,
    loginAttempts: 0,
  },
  {
    id: "18",
    name: "Valeria Morales",
    email: "valeria.morales@bancoademi.com",
    role: "risk_analyst",
    department: "Riesgos",
    status: "active",
    createdAt: "2023-07-10 10:00:00",
    lastLogin: "2024-02-08 16:00:00",
    phone: "+1 (809) 555-0118",
    position: "Analista de Riesgo Operacional",
    permissions: rolePermissions.risk_analyst,
    twoFactorEnabled: false,
    loginAttempts: 0,
  },

  // Auditors
  {
    id: "19",
    name: "Alberto Auditor",
    email: "auditor@bancoademi.com",
    role: "auditor",
    department: "Auditoría",
    status: "active",
    createdAt: "2023-02-05 08:00:00",
    lastLogin: "2024-02-11 08:30:00",
    phone: "+1 (809) 555-0119",
    position: "Auditor Interno",
    permissions: rolePermissions.auditor,
    twoFactorEnabled: true,
    loginAttempts: 0,
  },
  {
    id: "20",
    name: "Claudia Vargas",
    email: "claudia.vargas@bancoademi.com",
    role: "auditor",
    department: "Auditoría",
    status: "active",
    createdAt: "2023-05-12 09:00:00",
    lastLogin: "2024-02-10 12:00:00",
    phone: "+1 (809) 555-0120",
    position: "Auditora Senior",
    permissions: rolePermissions.auditor,
    twoFactorEnabled: true,
    loginAttempts: 0,
  },

  // Additional users for variety
  {
    id: "21",
    name: "Luis Castillo",
    email: "luis.castillo@bancoademi.com",
    role: "support_agent",
    department: "Soporte",
    status: "active",
    createdAt: "2023-09-01 08:00:00",
    lastLogin: "2024-02-11 14:15:00",
    phone: "+1 (809) 555-0121",
    position: "Agente de Soporte",
    permissions: rolePermissions.support_agent,
    twoFactorEnabled: false,
    loginAttempts: 0,
  },
  {
    id: "22",
    name: "Natalia Ortiz",
    email: "natalia.ortiz@bancoademi.com",
    role: "compliance_officer",
    department: "Cumplimiento",
    status: "active",
    createdAt: "2023-08-15 09:30:00",
    lastLogin: "2024-02-11 11:45:00",
    phone: "+1 (809) 555-0122",
    position: "Analista de Cumplimiento",
    permissions: rolePermissions.compliance_officer,
    twoFactorEnabled: true,
    loginAttempts: 0,
  },
  {
    id: "23",
    name: "Andrés Silva",
    email: "andres.silva@bancoademi.com",
    role: "operations_manager",
    department: "Operaciones",
    status: "suspended",
    createdAt: "2023-03-20 10:00:00",
    lastLogin: "2024-01-28 16:00:00",
    phone: "+1 (809) 555-0123",
    position: "Supervisor de Operaciones",
    permissions: rolePermissions.operations_manager,
    twoFactorEnabled: false,
    loginAttempts: 3,
    notes: "Suspendido por violación de política de seguridad",
  },
  {
    id: "24",
    name: "Beatriz Núñez",
    email: "beatriz.nunez@bancoademi.com",
    role: "risk_analyst",
    department: "Riesgos",
    status: "active",
    createdAt: "2023-10-01 08:30:00",
    lastLogin: "2024-02-09 13:20:00",
    phone: "+1 (809) 555-0124",
    position: "Analista de Riesgo Crediticio",
    permissions: rolePermissions.risk_analyst,
    twoFactorEnabled: false,
    loginAttempts: 0,
  },
  {
    id: "25",
    name: "Esteban Reyes",
    email: "esteban.reyes@bancoademi.com",
    role: "product_manager",
    department: "Producto",
    status: "active",
    createdAt: "2023-07-20 09:00:00",
    lastLogin: "2024-02-11 10:30:00",
    phone: "+1 (809) 555-0125",
    position: "Analista de Producto",
    permissions: rolePermissions.product_manager,
    twoFactorEnabled: false,
    loginAttempts: 0,
  },
  {
    id: "26",
    name: "Mónica Flores",
    email: "monica.flores@bancoademi.com",
    role: "support_agent",
    department: "Soporte",
    status: "blocked",
    createdAt: "2023-04-05 08:00:00",
    lastLogin: "2024-01-15 14:00:00",
    phone: "+1 (809) 555-0126",
    position: "Agente de Soporte",
    permissions: rolePermissions.support_agent,
    twoFactorEnabled: false,
    loginAttempts: 5,
    notes: "Bloqueado por múltiples intentos de acceso fallidos",
  },
  {
    id: "27",
    name: "Javier Rojas",
    email: "javier.rojas@bancoademi.com",
    role: "auditor",
    department: "Auditoría",
    status: "active",
    createdAt: "2023-06-10 10:00:00",
    lastLogin: "2024-02-10 15:30:00",
    phone: "+1 (809) 555-0127",
    position: "Auditor de Sistemas",
    permissions: rolePermissions.auditor,
    twoFactorEnabled: true,
    loginAttempts: 0,
  },
  {
    id: "28",
    name: "Diana Guzmán",
    email: "diana.guzman@bancoademi.com",
    role: "compliance_officer",
    department: "Cumplimiento",
    status: "active",
    createdAt: "2023-09-15 09:00:00",
    lastLogin: "2024-02-11 12:00:00",
    phone: "+1 (809) 555-0128",
    position: "Oficial de Prevención de Lavado",
    permissions: rolePermissions.compliance_officer,
    twoFactorEnabled: true,
    loginAttempts: 0,
  },
  {
    id: "29",
    name: "Héctor Medina",
    email: "hector.medina@bancoademi.com",
    role: "operations_manager",
    department: "Operaciones",
    status: "active",
    createdAt: "2023-05-25 08:30:00",
    lastLogin: "2024-02-11 09:15:00",
    phone: "+1 (809) 555-0129",
    position: "Gerente de Procesos",
    permissions: rolePermissions.operations_manager,
    twoFactorEnabled: true,
    loginAttempts: 0,
  },
  {
    id: "30",
    name: "Lucía Vega",
    email: "lucia.vega@bancoademi.com",
    role: "support_agent",
    department: "Soporte",
    status: "active",
    createdAt: "2023-10-15 10:00:00",
    lastLogin: "2024-02-11 13:45:00",
    phone: "+1 (809) 555-0130",
    position: "Agente de Soporte Técnico",
    permissions: rolePermissions.support_agent,
    twoFactorEnabled: false,
    loginAttempts: 0,
  },
  // Continue with more users...
  {
    id: "31",
    name: "Oscar Guerrero",
    email: "oscar.guerrero@bancoademi.com",
    role: "risk_analyst",
    department: "Riesgos",
    status: "active",
    createdAt: "2023-11-01 09:00:00",
    lastLogin: "2024-02-10 11:30:00",
    phone: "+1 (809) 555-0131",
    position: "Analista de Riesgo de Mercado",
    permissions: rolePermissions.risk_analyst,
    twoFactorEnabled: true,
    loginAttempts: 0,
  },
  {
    id: "32",
    name: "Paula Jiménez",
    email: "paula.jimenez@bancoademi.com",
    role: "product_manager",
    department: "Producto",
    status: "inactive",
    createdAt: "2023-03-10 08:00:00",
    lastLogin: null,
    phone: "+1 (809) 555-0132",
    position: "Especialista de Producto",
    permissions: rolePermissions.product_manager,
    twoFactorEnabled: false,
    loginAttempts: 0,
    notes: "De vacaciones",
  },
  {
    id: "33",
    name: "Ramón Ponce",
    email: "ramon.ponce@bancoademi.com",
    role: "support_agent",
    department: "Soporte",
    status: "active",
    createdAt: "2023-11-20 10:30:00",
    lastLogin: "2024-02-11 14:00:00",
    phone: "+1 (809) 555-0133",
    position: "Agente de Soporte",
    permissions: rolePermissions.support_agent,
    twoFactorEnabled: false,
    loginAttempts: 0,
  },
  {
    id: "34",
    name: "Sara Delgado",
    email: "sara.delgado@bancoademi.com",
    role: "compliance_officer",
    department: "Cumplimiento",
    status: "active",
    createdAt: "2023-12-01 09:00:00",
    lastLogin: "2024-02-11 10:45:00",
    phone: "+1 (809) 555-0134",
    position: "Analista de Fraudes",
    permissions: rolePermissions.compliance_officer,
    twoFactorEnabled: true,
    loginAttempts: 0,
  },
  {
    id: "35",
    name: "Tomás Cruz",
    email: "tomas.cruz@bancoademi.com",
    role: "operations_manager",
    department: "Operaciones",
    status: "active",
    createdAt: "2023-08-20 08:30:00",
    lastLogin: "2024-02-09 17:00:00",
    phone: "+1 (809) 555-0135",
    position: "Coordinador de Calidad",
    permissions: rolePermissions.operations_manager,
    twoFactorEnabled: false,
    loginAttempts: 0,
  },
]

// Helper functions
export const getUserById = (id: string): BackofficeUserDetailed | undefined => {
  return mockUsers.find((user) => user.id === id)
}

export const getUsersByRole = (role: UserRole): BackofficeUserDetailed[] => {
  return mockUsers.filter((user) => user.role === role)
}

export const getUsersByStatus = (status: UserStatus): BackofficeUserDetailed[] => {
  return mockUsers.filter((user) => user.status === status)
}

export const getUsersByDepartment = (department: string): BackofficeUserDetailed[] => {
  return mockUsers.filter((user) => user.department === department)
}

// Get unique departments
export const departments = Array.from(new Set(mockUsers.map((u) => u.department))).sort()

// Get role display names
export const roleNames: Record<UserRole, string> = {
  admin: "Administrador",
  compliance_officer: "Oficial de Cumplimiento",
  operations_manager: "Gerente de Operaciones",
  support_agent: "Agente de Soporte",
  product_manager: "Gerente de Producto",
  risk_analyst: "Analista de Riesgo",
  auditor: "Auditor",
}

// Get status display names
export const statusNames: Record<UserStatus, string> = {
  active: "Activo",
  inactive: "Inactivo",
  suspended: "Suspendido",
  blocked: "Bloqueado",
}
