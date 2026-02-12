/**
 * Mock Loans Data for Banco ADEMI Backoffice
 * Personal, mortgage, auto, and business loans
 */

export type LoanType = "personal" | "mortgage" | "auto" | "business"
export type LoanStatus = "active" | "pending" | "approved" | "rejected" | "paid_off" | "defaulted"

export interface Loan {
  id: string
  customerId: string
  customerName: string
  type: LoanType
  status: LoanStatus
  amount: number
  interestRate: number // Annual percentage
  term: number // Months
  monthlyPayment: number
  remainingBalance: number
  paidAmount: number
  nextPaymentDate: string | null
  startDate: string
  endDate: string
  approvedDate: string | null
  collateral?: string // For secured loans
  purpose?: string
  missedPayments: number
  creditScore: number
}

// Generate loans
const generateLoans = (): Loan[] => {
  const firstNames = ["María", "Juan", "Ana", "Carlos", "Laura", "Pedro", "Isabel", "Jorge", "Sofía", "Miguel", "Carmen", "Luis", "Rosa", "José", "Elena"]
  const lastNames = ["González", "Pérez", "Rodríguez", "Martínez", "Sánchez", "López", "Díaz", "Ramírez", "Hernández", "Torres", "Flores", "Vargas", "Castro", "Méndez", "Reyes"]

  const loanTypes: LoanType[] = ["personal", "mortgage", "auto", "business"]
  const statuses: LoanStatus[] = ["active", "active", "active", "pending", "approved", "paid_off"]

  const personalPurposes = ["Educación", "Salud", "Viaje", "Renovación hogar", "Consolidación deudas"]
  const businessPurposes = ["Expansión", "Equipamiento", "Capital de trabajo", "Inventario", "Tecnología"]

  const loans: Loan[] = []

  for (let i = 1; i <= 60; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const customerName = `${firstName} ${lastName}`

    const type = loanTypes[Math.floor(Math.random() * loanTypes.length)]
    let status = statuses[Math.floor(Math.random() * statuses.length)]

    // Credit score (300-850)
    const creditScore = Math.floor(Math.random() * 550) + 300

    let amount = 0
    let interestRate = 0
    let term = 0
    let collateral: string | undefined
    let purpose: string | undefined

    // Loan parameters based on type
    if (type === "personal") {
      amount = Math.random() * 500000 + 50000
      interestRate = Math.random() * 8 + 12 // 12-20%
      term = [12, 24, 36, 48, 60][Math.floor(Math.random() * 5)]
      purpose = personalPurposes[Math.floor(Math.random() * personalPurposes.length)]
    } else if (type === "mortgage") {
      amount = Math.random() * 5000000 + 1000000
      interestRate = Math.random() * 3 + 6 // 6-9%
      term = [120, 180, 240, 300, 360][Math.floor(Math.random() * 5)]
      collateral = `Propiedad valorada en RD$ ${(amount * 1.3).toLocaleString("es-DO")}`
      purpose = "Compra de vivienda"
    } else if (type === "auto") {
      amount = Math.random() * 1500000 + 300000
      interestRate = Math.random() * 5 + 8 // 8-13%
      term = [36, 48, 60, 72, 84][Math.floor(Math.random() * 5)]
      collateral = `Vehículo valorado en RD$ ${(amount * 1.2).toLocaleString("es-DO")}`
      purpose = "Compra de vehículo"
    } else {
      // business
      amount = Math.random() * 3000000 + 200000
      interestRate = Math.random() * 6 + 9 // 9-15%
      term = [12, 24, 36, 48, 60, 72][Math.floor(Math.random() * 6)]
      purpose = businessPurposes[Math.floor(Math.random() * businessPurposes.length)]
      if (Math.random() > 0.5) {
        collateral = `Activos empresariales valorados en RD$ ${(amount * 1.5).toLocaleString("es-DO")}`
      }
    }

    // Start date (1-36 months ago for active/paid_off, recent for pending/approved)
    let startMonthsAgo: number
    if (status === "pending" || status === "approved") {
      startMonthsAgo = Math.floor(Math.random() * 2)
    } else {
      startMonthsAgo = Math.floor(Math.random() * 36) + 1
    }
    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - startMonthsAgo)

    // End date
    const endDate = new Date(startDate)
    endDate.setMonth(endDate.getMonth() + term)

    // Approved date
    let approvedDate: string | null = null
    if (status !== "pending" && status !== "rejected") {
      const approvedDaysBeforeStart = Math.floor(Math.random() * 15) + 1
      const approved = new Date(startDate)
      approved.setDate(approved.getDate() - approvedDaysBeforeStart)
      approvedDate = approved.toISOString()
    }

    // Calculate monthly payment (simple formula)
    const monthlyInterestRate = interestRate / 100 / 12
    const monthlyPayment = (amount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, term)) /
                           (Math.pow(1 + monthlyInterestRate, term) - 1)

    // Calculate remaining balance and paid amount
    let paidAmount = 0
    let remainingBalance = amount
    let missedPayments = 0

    if (status === "active") {
      const monthsPassed = Math.min(startMonthsAgo, term)
      paidAmount = monthlyPayment * monthsPassed
      remainingBalance = Math.max(0, amount - paidAmount + (amount * interestRate / 100 * monthsPassed / 12))

      // Some loans have missed payments
      if (creditScore < 600 && Math.random() > 0.7) {
        missedPayments = Math.floor(Math.random() * 3) + 1
        if (missedPayments >= 3) {
          status = "defaulted"
        }
      }
    } else if (status === "paid_off") {
      paidAmount = amount + (amount * interestRate / 100 * term / 12)
      remainingBalance = 0
    }

    // Next payment date
    let nextPaymentDate: string | null = null
    if (status === "active") {
      const nextPayment = new Date()
      nextPayment.setMonth(nextPayment.getMonth() + 1)
      nextPayment.setDate(startDate.getDate())
      nextPaymentDate = nextPayment.toISOString()
    }

    loans.push({
      id: `LOAN-${String(i).padStart(4, "0")}`,
      customerId: `CUS-${String(Math.floor(Math.random() * 50) + 1).padStart(4, "0")}`,
      customerName,
      type,
      status,
      amount: Math.round(amount * 100) / 100,
      interestRate: Math.round(interestRate * 100) / 100,
      term,
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      remainingBalance: Math.round(remainingBalance * 100) / 100,
      paidAmount: Math.round(paidAmount * 100) / 100,
      nextPaymentDate,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      approvedDate,
      collateral,
      purpose,
      missedPayments,
      creditScore,
    })
  }

  return loans.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
}

export const mockLoans = generateLoans()

// Helper functions
export const getLoanById = (id: string): Loan | undefined => {
  return mockLoans.find((loan) => loan.id === id)
}

export const getLoansByType = (type: LoanType): Loan[] => {
  return mockLoans.filter((loan) => loan.type === type)
}

export const getLoansByStatus = (status: LoanStatus): Loan[] => {
  return mockLoans.filter((loan) => loan.status === status)
}

export const getLoansByCustomerId = (customerId: string): Loan[] => {
  return mockLoans.filter((loan) => loan.customerId === customerId)
}

// Display names
export const loanTypeNames: Record<LoanType, string> = {
  personal: "Personal",
  mortgage: "Hipotecario",
  auto: "Automotriz",
  business: "Empresarial",
}

export const loanStatusNames: Record<LoanStatus, string> = {
  active: "Activo",
  pending: "Pendiente",
  approved: "Aprobado",
  rejected: "Rechazado",
  paid_off: "Pagado",
  defaulted: "En Mora",
}

// Statistics
export const getLoansStats = () => {
  const activeLoans = getLoansByStatus("active")
  const pendingLoans = getLoansByStatus("pending")

  const totalDisbursed = mockLoans
    .filter((l) => l.status === "active" || l.status === "paid_off" || l.status === "defaulted")
    .reduce((sum, l) => sum + l.amount, 0)

  const totalOutstanding = activeLoans.reduce((sum, l) => sum + l.remainingBalance, 0)
  const totalCollected = mockLoans.reduce((sum, l) => sum + l.paidAmount, 0)
  const totalDefaulted = getLoansByStatus("defaulted").reduce((sum, l) => sum + l.remainingBalance, 0)

  const monthlyPaymentsDue = activeLoans.reduce((sum, l) => sum + l.monthlyPayment, 0)

  return {
    total: mockLoans.length,
    active: activeLoans.length,
    pending: pendingLoans.length,
    approved: getLoansByStatus("approved").length,
    rejected: getLoansByStatus("rejected").length,
    paidOff: getLoansByStatus("paid_off").length,
    defaulted: getLoansByStatus("defaulted").length,
    totalDisbursed,
    totalOutstanding,
    totalCollected,
    totalDefaulted,
    monthlyPaymentsDue,
    personalLoans: getLoansByType("personal").length,
    mortgageLoans: getLoansByType("mortgage").length,
    autoLoans: getLoansByType("auto").length,
    businessLoans: getLoansByType("business").length,
  }
}
