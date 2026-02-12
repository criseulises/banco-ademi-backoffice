/**
 * Mock Transactions Data for Banco ADEMI Backoffice
 * Contains sample transaction data for testing and demonstration
 */

export type TransactionType =
  | "transfer_own"
  | "transfer_third_party"
  | "card_payment"
  | "loan_payment"
  | "service_payment"
  | "mobile_recharge"
  | "tax_payment"

export type TransactionStatus =
  | "completed"
  | "pending"
  | "failed"
  | "cancelled"
  | "in_review"

export type PaymentMethod = "bank_account" | "credit_card" | "debit_card" | "cash"

export interface Transaction {
  id: string
  userId: string
  userName: string
  type: TransactionType
  status: TransactionStatus
  amount: number
  currency: string
  description: string
  reference?: string
  fromAccount?: string
  toAccount?: string
  paymentMethod: PaymentMethod
  createdAt: string
  completedAt?: string
  failureReason?: string
  metadata?: {
    service?: string
    phoneNumber?: string
    cardLast4?: string
    loanId?: string
    taxType?: string
  }
}

// Helper to generate random transaction
const generateTransaction = (
  id: number,
  date: Date
): Transaction => {
  const types: TransactionType[] = [
    "transfer_own",
    "transfer_third_party",
    "card_payment",
    "loan_payment",
    "service_payment",
    "mobile_recharge",
    "tax_payment",
  ]

  const statuses: TransactionStatus[] = [
    "completed",
    "completed",
    "completed",
    "completed",
    "pending",
    "failed",
    "in_review",
  ]

  const type = types[Math.floor(Math.random() * types.length)]
  const status = statuses[Math.floor(Math.random() * statuses.length)]

  const userNames = [
    "María González",
    "Juan Pérez",
    "Ana Rodríguez",
    "Carlos Martínez",
    "Laura Sánchez",
    "Pedro López",
    "Isabel Díaz",
    "Jorge Ramírez",
    "Sofía Hernández",
    "Miguel Torres",
  ]

  const userName = userNames[Math.floor(Math.random() * userNames.length)]
  const userId = `USR-${1000 + Math.floor(Math.random() * 9000)}`

  let amount = 0
  let description = ""
  let metadata = {}
  let paymentMethod: PaymentMethod = "bank_account"

  switch (type) {
    case "transfer_own":
      amount = Math.random() * 50000 + 1000
      description = "Transferencia entre cuentas propias"
      paymentMethod = "bank_account"
      break
    case "transfer_third_party":
      amount = Math.random() * 100000 + 5000
      description = `Transferencia a ${userNames[Math.floor(Math.random() * userNames.length)]}`
      paymentMethod = "bank_account"
      break
    case "card_payment":
      amount = Math.random() * 30000 + 500
      description = "Pago de tarjeta de crédito"
      metadata = { cardLast4: String(Math.floor(Math.random() * 10000)).padStart(4, "0") }
      paymentMethod = "credit_card"
      break
    case "loan_payment":
      amount = Math.random() * 50000 + 5000
      description = "Pago de cuota de préstamo"
      metadata = { loanId: `LN-${Math.floor(Math.random() * 10000)}` }
      paymentMethod = "bank_account"
      break
    case "service_payment":
      const services = ["Electricidad (EDENORTE)", "Agua (CAASD)", "Telefonía (Claro)", "Internet (Altice)"]
      const service = services[Math.floor(Math.random() * services.length)]
      amount = Math.random() * 5000 + 200
      description = `Pago de ${service}`
      metadata = { service }
      paymentMethod = "debit_card"
      break
    case "mobile_recharge":
      const operators = ["Claro", "Altice", "Viva"]
      const operator = operators[Math.floor(Math.random() * operators.length)]
      amount = Math.floor(Math.random() * 5) * 100 + 100 // 100, 200, 300, 400, 500
      description = `Recarga ${operator}`
      metadata = {
        service: operator,
        phoneNumber: `809-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`
      }
      paymentMethod = "debit_card"
      break
    case "tax_payment":
      const taxes = ["ITBIS", "ISR", "Impuesto Municipal", "Impuesto Vehículo"]
      const taxType = taxes[Math.floor(Math.random() * taxes.length)]
      amount = Math.random() * 100000 + 5000
      description = `Pago de ${taxType}`
      metadata = { taxType }
      paymentMethod = "bank_account"
      break
  }

  const createdAt = new Date(date)
  createdAt.setHours(Math.floor(Math.random() * 24))
  createdAt.setMinutes(Math.floor(Math.random() * 60))
  createdAt.setSeconds(Math.floor(Math.random() * 60))

  const transaction: Transaction = {
    id: `TXN-${String(id).padStart(6, "0")}`,
    userId,
    userName,
    type,
    status,
    amount: Math.round(amount * 100) / 100,
    currency: "DOP",
    description,
    reference: `REF-${Math.floor(Math.random() * 1000000)}`,
    fromAccount: `****${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}`,
    toAccount: type.includes("transfer") ? `****${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}` : undefined,
    paymentMethod,
    createdAt: createdAt.toISOString(),
    metadata: Object.keys(metadata).length > 0 ? metadata : undefined,
  }

  if (status === "completed") {
    const completedAt = new Date(createdAt)
    completedAt.setMinutes(completedAt.getMinutes() + Math.floor(Math.random() * 30))
    transaction.completedAt = completedAt.toISOString()
  }

  if (status === "failed") {
    const reasons = [
      "Fondos insuficientes",
      "Error de conexión",
      "Cuenta bloqueada",
      "Límite excedido",
      "Datos incorrectos",
    ]
    transaction.failureReason = reasons[Math.floor(Math.random() * reasons.length)]
  }

  return transaction
}

// Generate transactions for the last 30 days
const generateTransactions = (count: number): Transaction[] => {
  const transactions: Transaction[] = []
  const now = new Date()

  for (let i = 0; i < count; i++) {
    const daysAgo = Math.floor(Math.random() * 30)
    const date = new Date(now)
    date.setDate(date.getDate() - daysAgo)
    transactions.push(generateTransaction(i + 1, date))
  }

  // Sort by date descending (newest first)
  return transactions.sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export const mockTransactions = generateTransactions(250)

// Helper functions
export const getTransactionById = (id: string): Transaction | undefined => {
  return mockTransactions.find((tx) => tx.id === id)
}

export const getTransactionsByStatus = (status: TransactionStatus): Transaction[] => {
  return mockTransactions.filter((tx) => tx.status === status)
}

export const getTransactionsByType = (type: TransactionType): Transaction[] => {
  return mockTransactions.filter((tx) => tx.type === type)
}

export const getTransactionsByUser = (userId: string): Transaction[] => {
  return mockTransactions.filter((tx) => tx.userId === userId)
}

// Display names
export const transactionTypeNames: Record<TransactionType, string> = {
  transfer_own: "Transferencia Propia",
  transfer_third_party: "Transferencia a Tercero",
  card_payment: "Pago de Tarjeta",
  loan_payment: "Pago de Préstamo",
  service_payment: "Pago de Servicio",
  mobile_recharge: "Recarga Móvil",
  tax_payment: "Pago de Impuesto",
}

export const transactionStatusNames: Record<TransactionStatus, string> = {
  completed: "Completada",
  pending: "Pendiente",
  failed: "Fallida",
  cancelled: "Cancelada",
  in_review: "En Revisión",
}

export const paymentMethodNames: Record<PaymentMethod, string> = {
  bank_account: "Cuenta Bancaria",
  credit_card: "Tarjeta de Crédito",
  debit_card: "Tarjeta de Débito",
  cash: "Efectivo",
}

// Statistics
export const getTransactionStats = () => {
  const total = mockTransactions.length
  const completed = getTransactionsByStatus("completed").length
  const pending = getTransactionsByStatus("pending").length
  const failed = getTransactionsByStatus("failed").length
  const inReview = getTransactionsByStatus("in_review").length

  const totalAmount = mockTransactions
    .filter((tx) => tx.status === "completed")
    .reduce((sum, tx) => sum + tx.amount, 0)

  return {
    total,
    completed,
    pending,
    failed,
    inReview,
    totalAmount,
    averageAmount: totalAmount / completed,
  }
}
