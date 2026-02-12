/**
 * Mock Investments Data for Banco ADEMI Backoffice
 * Fixed deposits, mutual funds, bonds, and stocks
 */

export type InvestmentType = "fixed_deposit" | "mutual_fund" | "bonds" | "stocks"
export type InvestmentStatus = "active" | "matured" | "cancelled" | "pending"
export type RiskLevel = "low" | "medium" | "high"

export interface Investment {
  id: string
  customerId: string
  customerName: string
  type: InvestmentType
  status: InvestmentStatus
  riskLevel: RiskLevel
  principal: number
  currentValue: number
  returnRate: number // Annual percentage
  term: number // Months (0 for indefinite like stocks/mutual funds)
  startDate: string
  maturityDate: string | null
  lastUpdated: string
  projectedReturn: number
  actualReturn: number
}

// Generate investments
const generateInvestments = (): Investment[] => {
  const firstNames = ["María", "Juan", "Ana", "Carlos", "Laura", "Pedro", "Isabel", "Jorge", "Sofía", "Miguel", "Carmen", "Luis", "Rosa", "José", "Elena"]
  const lastNames = ["González", "Pérez", "Rodríguez", "Martínez", "Sánchez", "López", "Díaz", "Ramírez", "Hernández", "Torres", "Flores", "Vargas", "Castro", "Méndez", "Reyes"]

  const investmentTypes: InvestmentType[] = ["fixed_deposit", "mutual_fund", "bonds", "stocks"]
  const statuses: InvestmentStatus[] = ["active", "active", "active", "matured", "pending"]
  const riskLevels: Record<InvestmentType, RiskLevel> = {
    fixed_deposit: "low",
    bonds: "low",
    mutual_fund: "medium",
    stocks: "high",
  }

  const investments: Investment[] = []

  for (let i = 1; i <= 70; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const customerName = `${firstName} ${lastName}`

    const type = investmentTypes[Math.floor(Math.random() * investmentTypes.length)]
    let status = statuses[Math.floor(Math.random() * statuses.length)]
    const riskLevel = riskLevels[type]

    let principal = 0
    let returnRate = 0
    let term = 0

    // Investment parameters based on type
    if (type === "fixed_deposit") {
      principal = Math.random() * 500000 + 50000
      returnRate = Math.random() * 3 + 5 // 5-8%
      term = [3, 6, 12, 18, 24, 36][Math.floor(Math.random() * 6)]
    } else if (type === "mutual_fund") {
      principal = Math.random() * 300000 + 30000
      returnRate = Math.random() * 8 + 6 // 6-14%
      term = 0 // Indefinite
    } else if (type === "bonds") {
      principal = Math.random() * 1000000 + 100000
      returnRate = Math.random() * 4 + 4 // 4-8%
      term = [12, 24, 36, 48, 60][Math.floor(Math.random() * 5)]
    } else {
      // stocks
      principal = Math.random() * 400000 + 50000
      returnRate = Math.random() * 20 - 5 // -5% to 15% (stocks can lose value)
      term = 0 // Indefinite
    }

    // Start date
    let startMonthsAgo: number
    if (status === "pending") {
      startMonthsAgo = 0
    } else if (status === "matured") {
      startMonthsAgo = term + Math.floor(Math.random() * 12)
    } else {
      startMonthsAgo = Math.floor(Math.random() * (term || 24))
    }
    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - startMonthsAgo)

    // Maturity date (only for term investments)
    let maturityDate: string | null = null
    if (term > 0) {
      const maturity = new Date(startDate)
      maturity.setMonth(maturity.getMonth() + term)
      maturityDate = maturity.toISOString()

      // Check if matured
      if (maturity < new Date() && status === "active") {
        status = "matured"
      }
    }

    // Last updated
    const lastUpdatedDaysAgo = Math.floor(Math.random() * 7)
    const lastUpdated = new Date()
    lastUpdated.setDate(lastUpdated.getDate() - lastUpdatedDaysAgo)

    // Calculate returns
    const monthsElapsed = Math.min(startMonthsAgo, term || startMonthsAgo)
    const projectedReturn = principal * (returnRate / 100) * (term ? (term / 12) : (monthsElapsed / 12))

    let actualReturn = 0
    let currentValue = principal

    if (status === "active") {
      // Add some variance to actual returns
      const variance = (Math.random() - 0.5) * 0.2 // ±10%
      const elapsedReturn = principal * (returnRate / 100) * (monthsElapsed / 12)
      actualReturn = elapsedReturn * (1 + variance)
      currentValue = principal + actualReturn
    } else if (status === "matured") {
      actualReturn = projectedReturn * (0.9 + Math.random() * 0.2) // 90-110% of projected
      currentValue = principal + actualReturn
    } else if (status === "cancelled") {
      // Early cancellation penalty
      actualReturn = principal * (returnRate / 100) * (monthsElapsed / 12) * 0.7
      currentValue = principal + actualReturn
    }

    investments.push({
      id: `INV-${String(i).padStart(4, "0")}`,
      customerId: `CUS-${String(Math.floor(Math.random() * 50) + 1).padStart(4, "0")}`,
      customerName,
      type,
      status,
      riskLevel,
      principal: Math.round(principal * 100) / 100,
      currentValue: Math.round(currentValue * 100) / 100,
      returnRate: Math.round(returnRate * 100) / 100,
      term,
      startDate: startDate.toISOString(),
      maturityDate,
      lastUpdated: lastUpdated.toISOString(),
      projectedReturn: Math.round(projectedReturn * 100) / 100,
      actualReturn: Math.round(actualReturn * 100) / 100,
    })
  }

  return investments.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
}

export const mockInvestments = generateInvestments()

// Helper functions
export const getInvestmentById = (id: string): Investment | undefined => {
  return mockInvestments.find((inv) => inv.id === id)
}

export const getInvestmentsByType = (type: InvestmentType): Investment[] => {
  return mockInvestments.filter((inv) => inv.type === type)
}

export const getInvestmentsByStatus = (status: InvestmentStatus): Investment[] => {
  return mockInvestments.filter((inv) => inv.status === status)
}

export const getInvestmentsByRiskLevel = (riskLevel: RiskLevel): Investment[] => {
  return mockInvestments.filter((inv) => inv.riskLevel === riskLevel)
}

export const getInvestmentsByCustomerId = (customerId: string): Investment[] => {
  return mockInvestments.filter((inv) => inv.customerId === customerId)
}

// Display names
export const investmentTypeNames: Record<InvestmentType, string> = {
  fixed_deposit: "Depósito a Plazo",
  mutual_fund: "Fondos Mutuos",
  bonds: "Bonos",
  stocks: "Acciones",
}

export const investmentStatusNames: Record<InvestmentStatus, string> = {
  active: "Activo",
  matured: "Vencido",
  cancelled: "Cancelado",
  pending: "Pendiente",
}

export const riskLevelNames: Record<RiskLevel, string> = {
  low: "Bajo",
  medium: "Medio",
  high: "Alto",
}

// Statistics
export const getInvestmentsStats = () => {
  const activeInvestments = getInvestmentsByStatus("active")

  const totalPrincipal = mockInvestments.reduce((sum, inv) => sum + inv.principal, 0)
  const totalCurrentValue = activeInvestments.reduce((sum, inv) => sum + inv.currentValue, 0)
  const totalReturns = activeInvestments.reduce((sum, inv) => sum + inv.actualReturn, 0)

  const avgReturnRate = mockInvestments.reduce((sum, inv) => sum + inv.returnRate, 0) / mockInvestments.length

  return {
    total: mockInvestments.length,
    active: activeInvestments.length,
    matured: getInvestmentsByStatus("matured").length,
    cancelled: getInvestmentsByStatus("cancelled").length,
    pending: getInvestmentsByStatus("pending").length,
    totalPrincipal,
    totalCurrentValue,
    totalReturns,
    avgReturnRate,
    fixedDeposits: getInvestmentsByType("fixed_deposit").length,
    mutualFunds: getInvestmentsByType("mutual_fund").length,
    bonds: getInvestmentsByType("bonds").length,
    stocks: getInvestmentsByType("stocks").length,
    lowRisk: getInvestmentsByRiskLevel("low").length,
    mediumRisk: getInvestmentsByRiskLevel("medium").length,
    highRisk: getInvestmentsByRiskLevel("high").length,
  }
}
