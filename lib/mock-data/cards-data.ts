/**
 * Mock Cards Data for Banco ADEMI Backoffice
 * Credit and Debit cards
 */

export type CardType = "debit" | "credit"
export type CardStatus = "active" | "blocked" | "expired" | "pending"
export type CardTier = "classic" | "gold" | "platinum" | "black"

export interface Card {
  id: string
  cardNumber: string // Masked
  customerId: string
  customerName: string
  type: CardType
  tier: CardTier
  status: CardStatus
  balance: number // For debit cards
  creditLimit?: number // For credit cards
  availableCredit?: number // For credit cards
  expirationDate: string
  issuedDate: string
  lastUsed: string | null
  monthlySpending: number
  hasContactless: boolean
  hasInternational: boolean
}

// Generate cards
const generateCards = (): Card[] => {
  const firstNames = ["María", "Juan", "Ana", "Carlos", "Laura", "Pedro", "Isabel", "Jorge", "Sofía", "Miguel", "Carmen", "Luis", "Rosa", "José", "Elena"]
  const lastNames = ["González", "Pérez", "Rodríguez", "Martínez", "Sánchez", "López", "Díaz", "Ramírez", "Hernández", "Torres", "Flores", "Vargas", "Castro", "Méndez", "Reyes"]

  const cardTypes: CardType[] = ["debit", "credit"]
  const tiers: CardTier[] = ["classic", "gold", "platinum", "black"]
  const statuses: CardStatus[] = ["active", "active", "active", "active", "blocked", "expired"]

  const cards: Card[] = []

  for (let i = 1; i <= 80; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const customerName = `${firstName} ${lastName}`

    const type = cardTypes[Math.floor(Math.random() * cardTypes.length)]
    let tier: CardTier

    // Higher tier cards are less common
    const tierRandom = Math.random()
    if (tierRandom > 0.95) {
      tier = "black"
    } else if (tierRandom > 0.85) {
      tier = "platinum"
    } else if (tierRandom > 0.6) {
      tier = "gold"
    } else {
      tier = "classic"
    }

    const status = statuses[Math.floor(Math.random() * statuses.length)]

    // Generate card number (masked)
    const lastFourDigits = String(Math.floor(Math.random() * 10000)).padStart(4, "0")
    const cardNumber = `**** **** **** ${lastFourDigits}`

    // Issue date (1-48 months ago)
    const issuedMonthsAgo = Math.floor(Math.random() * 48) + 1
    const issuedDate = new Date()
    issuedDate.setMonth(issuedDate.getMonth() - issuedMonthsAgo)

    // Expiration date (48 months from issue)
    const expirationDate = new Date(issuedDate)
    expirationDate.setMonth(expirationDate.getMonth() + 48)

    // Check if expired
    const isExpired = expirationDate < new Date()
    const finalStatus = isExpired ? "expired" : status

    // Last used (for active cards)
    let lastUsed: string | null = null
    if (finalStatus === "active" && Math.random() > 0.1) {
      const lastUsedDaysAgo = Math.floor(Math.random() * 30)
      const lastUsedDate = new Date()
      lastUsedDate.setDate(lastUsedDate.getDate() - lastUsedDaysAgo)
      lastUsed = lastUsedDate.toISOString()
    }

    let balance = 0
    let creditLimit: number | undefined
    let availableCredit: number | undefined
    let monthlySpending = 0

    if (type === "debit") {
      // Debit cards have balance
      if (tier === "classic") {
        balance = Math.random() * 50000 + 5000
      } else if (tier === "gold") {
        balance = Math.random() * 150000 + 20000
      } else if (tier === "platinum") {
        balance = Math.random() * 300000 + 50000
      } else {
        balance = Math.random() * 500000 + 100000
      }
      monthlySpending = Math.random() * balance * 0.3
    } else {
      // Credit cards have limits
      if (tier === "classic") {
        creditLimit = Math.random() * 100000 + 30000
      } else if (tier === "gold") {
        creditLimit = Math.random() * 300000 + 100000
      } else if (tier === "platinum") {
        creditLimit = Math.random() * 500000 + 200000
      } else {
        creditLimit = Math.random() * 1000000 + 500000
      }

      const usedPercentage = Math.random() * 0.7 // Max 70% used
      const usedCredit = creditLimit * usedPercentage
      availableCredit = creditLimit - usedCredit
      monthlySpending = usedCredit * (Math.random() * 0.5 + 0.3) // 30-80% of used credit
    }

    cards.push({
      id: `CARD-${String(i).padStart(4, "0")}`,
      cardNumber,
      customerId: `CUS-${String(Math.floor(Math.random() * 50) + 1).padStart(4, "0")}`,
      customerName,
      type,
      tier,
      status: finalStatus,
      balance: type === "debit" ? Math.round(balance * 100) / 100 : 0,
      creditLimit: type === "credit" ? Math.round(creditLimit! * 100) / 100 : undefined,
      availableCredit: type === "credit" ? Math.round(availableCredit! * 100) / 100 : undefined,
      expirationDate: expirationDate.toISOString(),
      issuedDate: issuedDate.toISOString(),
      lastUsed,
      monthlySpending: Math.round(monthlySpending * 100) / 100,
      hasContactless: Math.random() > 0.3, // 70% have contactless
      hasInternational: tier !== "classic" || Math.random() > 0.5, // Most non-classic cards have international
    })
  }

  return cards.sort((a, b) => new Date(b.issuedDate).getTime() - new Date(a.issuedDate).getTime())
}

export const mockCards = generateCards()

// Helper functions
export const getCardById = (id: string): Card | undefined => {
  return mockCards.find((card) => card.id === id)
}

export const getCardsByType = (type: CardType): Card[] => {
  return mockCards.filter((card) => card.type === type)
}

export const getCardsByStatus = (status: CardStatus): Card[] => {
  return mockCards.filter((card) => card.status === status)
}

export const getCardsByTier = (tier: CardTier): Card[] => {
  return mockCards.filter((card) => card.tier === tier)
}

export const getCardsByCustomerId = (customerId: string): Card[] => {
  return mockCards.filter((card) => card.customerId === customerId)
}

// Display names
export const cardTypeNames: Record<CardType, string> = {
  debit: "Débito",
  credit: "Crédito",
}

export const cardTierNames: Record<CardTier, string> = {
  classic: "Clásica",
  gold: "Gold",
  platinum: "Platinum",
  black: "Black",
}

export const cardStatusNames: Record<CardStatus, string> = {
  active: "Activa",
  blocked: "Bloqueada",
  expired: "Expirada",
  pending: "Pendiente",
}

// Statistics
export const getCardsStats = () => {
  const debitCards = getCardsByType("debit")
  const creditCards = getCardsByType("credit")
  const activeCards = getCardsByStatus("active")

  const totalDebitBalance = debitCards.reduce((sum, c) => sum + c.balance, 0)
  const totalCreditLimit = creditCards.reduce((sum, c) => sum + (c.creditLimit || 0), 0)
  const totalAvailableCredit = creditCards.reduce((sum, c) => sum + (c.availableCredit || 0), 0)
  const totalMonthlySpending = activeCards.reduce((sum, c) => sum + c.monthlySpending, 0)

  return {
    total: mockCards.length,
    debitCards: debitCards.length,
    creditCards: creditCards.length,
    active: activeCards.length,
    blocked: getCardsByStatus("blocked").length,
    expired: getCardsByStatus("expired").length,
    pending: getCardsByStatus("pending").length,
    totalDebitBalance,
    totalCreditLimit,
    totalAvailableCredit,
    totalMonthlySpending,
    classicCards: getCardsByTier("classic").length,
    goldCards: getCardsByTier("gold").length,
    platinumCards: getCardsByTier("platinum").length,
    blackCards: getCardsByTier("black").length,
  }
}
