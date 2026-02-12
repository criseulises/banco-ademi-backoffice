/**
 * Mock Customers Data for Banco ADEMI Backoffice
 * Bank customers (end users)
 */

export type CustomerStatus = "active" | "inactive" | "suspended" | "blocked"
export type AccountType = "savings" | "checking" | "premium" | "business"
export type CustomerTier = "standard" | "gold" | "platinum" | "vip"

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  cedula: string
  accountType: AccountType
  tier: CustomerTier
  status: CustomerStatus
  balance: number
  createdAt: string
  lastLogin: string | null
  kycStatus: "pending" | "approved" | "rejected"
  hasActiveLoans: boolean
  hasCreditCard: boolean
}

// Generate customers
const generateCustomers = (): Customer[] => {
  const firstNames = ["María", "Juan", "Ana", "Carlos", "Laura", "Pedro", "Isabel", "Jorge", "Sofía", "Miguel", "Carmen", "Luis", "Rosa", "José", "Elena"]
  const lastNames = ["González", "Pérez", "Rodríguez", "Martínez", "Sánchez", "López", "Díaz", "Ramírez", "Hernández", "Torres", "Flores", "Vargas", "Castro", "Méndez", "Reyes"]

  const accountTypes: AccountType[] = ["savings", "checking", "premium", "business"]
  const tiers: CustomerTier[] = ["standard", "gold", "platinum", "vip"]
  const statuses: CustomerStatus[] = ["active", "active", "active", "active", "inactive", "suspended"]

  const customers: Customer[] = []

  for (let i = 1; i <= 50; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const name = `${firstName} ${lastName}`

    const accountType = accountTypes[Math.floor(Math.random() * accountTypes.length)]
    let tier: CustomerTier
    if (accountType === "premium" || accountType === "business") {
      tier = ["gold", "platinum", "vip"][Math.floor(Math.random() * 3)] as CustomerTier
    } else {
      tier = Math.random() > 0.7 ? "gold" : "standard"
    }

    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const kycStatus = status === "active" ? "approved" : Math.random() > 0.5 ? "pending" : "approved"

    const createdDaysAgo = Math.floor(Math.random() * 365)
    const createdAt = new Date()
    createdAt.setDate(createdAt.getDate() - createdDaysAgo)

    let lastLogin: string | null = null
    if (status === "active" && Math.random() > 0.2) {
      const lastLoginDaysAgo = Math.floor(Math.random() * 30)
      const lastLoginDate = new Date()
      lastLoginDate.setDate(lastLoginDate.getDate() - lastLoginDaysAgo)
      lastLogin = lastLoginDate.toISOString()
    }

    let balance = 0
    if (accountType === "savings") {
      balance = Math.random() * 100000 + 5000
    } else if (accountType === "checking") {
      balance = Math.random() * 50000 + 1000
    } else if (accountType === "premium") {
      balance = Math.random() * 500000 + 50000
    } else {
      balance = Math.random() * 1000000 + 100000
    }

    customers.push({
      id: `CUS-${String(i).padStart(4, "0")}`,
      name,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
      phone: `809-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      cedula: `${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000000) + 1000000)}-${Math.floor(Math.random() * 9) + 1}`,
      accountType,
      tier,
      status,
      balance: Math.round(balance * 100) / 100,
      createdAt: createdAt.toISOString(),
      lastLogin,
      kycStatus,
      hasActiveLoans: Math.random() > 0.7,
      hasCreditCard: Math.random() > 0.6,
    })
  }

  return customers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export const mockCustomers = generateCustomers()

// Helper functions
export const getCustomerById = (id: string): Customer | undefined => {
  return mockCustomers.find((customer) => customer.id === id)
}

export const getCustomersByStatus = (status: CustomerStatus): Customer[] => {
  return mockCustomers.filter((customer) => customer.status === status)
}

export const getCustomersByTier = (tier: CustomerTier): Customer[] => {
  return mockCustomers.filter((customer) => customer.tier === tier)
}

// Display names
export const accountTypeNames: Record<AccountType, string> = {
  savings: "Cuenta de Ahorros",
  checking: "Cuenta Corriente",
  premium: "Cuenta Premium",
  business: "Cuenta Empresarial",
}

export const tierNames: Record<CustomerTier, string> = {
  standard: "Estándar",
  gold: "Gold",
  platinum: "Platinum",
  vip: "VIP",
}

export const customerStatusNames: Record<CustomerStatus, string> = {
  active: "Activo",
  inactive: "Inactivo",
  suspended: "Suspendido",
  blocked: "Bloqueado",
}

// Statistics
export const getCustomerStats = () => {
  const totalBalance = mockCustomers.reduce((sum, c) => sum + c.balance, 0)
  const activeCustomers = getCustomersByStatus("active")

  return {
    total: mockCustomers.length,
    active: activeCustomers.length,
    inactive: getCustomersByStatus("inactive").length,
    suspended: getCustomersByStatus("suspended").length,
    blocked: getCustomersByStatus("blocked").length,
    totalBalance,
    averageBalance: totalBalance / mockCustomers.length,
    withLoans: mockCustomers.filter((c) => c.hasActiveLoans).length,
    withCreditCard: mockCustomers.filter((c) => c.hasCreditCard).length,
    kycPending: mockCustomers.filter((c) => c.kycStatus === "pending").length,
    vipCustomers: getCustomersByTier("vip").length + getCustomersByTier("platinum").length,
  }
}
