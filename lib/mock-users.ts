import type { BackofficeUser } from "@/types"

/**
 * USUARIOS MOCK PARA DEMO
 * Email: usuario@demo.com
 * Password: demo123
 */
export const MOCK_USERS: (BackofficeUser & { password: string })[] = [
  {
    id: "1",
    email: "admin@bancoademi.com",
    password: "admin123",
    name: "Juan Administrador",
    role: "admin",
    department: "Administración",
    status: "active",
    permissions: [],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    lastLogin: new Date(),
  },
  {
    id: "2",
    email: "compliance@bancoademi.com",
    password: "demo123",
    name: "María Compliance",
    role: "compliance_officer",
    department: "Cumplimiento",
    status: "active",
    permissions: [],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    lastLogin: new Date(),
  },
  {
    id: "3",
    email: "ops@bancoademi.com",
    password: "demo123",
    name: "Carlos Operaciones",
    role: "operations_manager",
    department: "Operaciones",
    status: "active",
    permissions: [],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    lastLogin: new Date(),
  },
  {
    id: "4",
    email: "soporte@bancoademi.com",
    password: "demo123",
    name: "Ana Soporte",
    role: "support_agent",
    department: "Soporte al Cliente",
    status: "active",
    permissions: [],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    lastLogin: new Date(),
  },
]

export const authenticateUser = (email: string, password: string) => {
  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  )
  
  if (!user) {
    return null
  }
  
  // No retornar el password
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}
