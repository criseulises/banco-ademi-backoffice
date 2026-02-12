// ============================================
// TIPOS BASE
// ============================================

export type UserRole =
  | "admin"
  | "compliance_officer"
  | "operations_manager"
  | "support_agent"
  | "product_manager"
  | "risk_analyst"
  | "auditor"

export type UserStatus = "active" | "inactive" | "suspended"

export type ClientStatus = 
  | "active" 
  | "blocked_temporary" 
  | "blocked_permanent" 
  | "pending_kyc"

export type TransactionStatus = 
  | "completed" 
  | "pending" 
  | "failed" 
  | "reversed" 
  | "in_progress"

export type TransactionType =
  | "transfer_internal"
  | "transfer_ach"
  | "transfer_lbtr"
  | "payment_service"
  | "payment_card"
  | "payment_loan"
  | "payment_tax"
  | "mobile_recharge"

export type OnboardingStatus = 
  | "pending_review" 
  | "in_process" 
  | "approved" 
  | "rejected" 
  | "additional_info_required"

export type KYCLevel = "simplified" | "standard" | "enhanced"

export type RiskLevel = "low" | "medium" | "high"

export type AlertStatus = "open" | "in_review" | "resolved" | "false_positive"

export type TicketStatus = 
  | "new" 
  | "in_progress" 
  | "pending_client" 
  | "resolved" 
  | "closed"

export type TicketPriority = "low" | "medium" | "high" | "critical"

// ============================================
// INTERFACES PRINCIPALES
// ============================================

export interface BackofficeUser {
  id: string
  email: string
  name: string
  role: UserRole
  permissions: Permission[]
  department?: string
  status: UserStatus
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Permission {
  module: string
  actions: ("view" | "create" | "edit" | "delete" | "approve" | "export")[]
}

export interface Client {
  id: string
  clientNumber: string
  name: string
  documentId: string
  email: string
  phone: string
  status: ClientStatus
  kycLevel: KYCLevel
  riskScore: number
  isPEP: boolean
  registeredAt: Date
  lastActivity?: Date
  devices: Device[]
  accounts: Account[]
  cards: Card[]
}

export interface Device {
  id: string
  deviceId: string
  model: string
  os: string
  osVersion: string
  status: "trusted" | "suspicious" | "blocked"
  registeredAt: Date
  lastUsed?: Date
  location?: {
    country: string
    city: string
    ip: string
  }
}

export interface Account {
  id: string
  accountNumber: string
  type: "savings" | "checking" | "business"
  currency: string
  balance: number
  status: "active" | "blocked" | "closed"
  alias?: string
  isPrimary: boolean
  openedAt: Date
}

export interface Card {
  id: string
  cardNumber: string
  type: "debit" | "credit"
  network: "visa" | "mastercard"
  status: "active" | "blocked_temporary" | "blocked_permanent" | "expired"
  expiryDate: string
  creditLimit?: number
  availableCredit?: number
  dailyLimit: number
  issuedAt: Date
}

export interface Transaction {
  id: string
  transactionNumber: string
  type: TransactionType
  amount: number
  currency: string
  status: TransactionStatus
  sourceAccount?: string
  destinationAccount?: string
  description: string
  channel: "mobile_app" | "web" | "api"
  clientId: string
  deviceId?: string
  ipAddress: string
  createdAt: Date
  completedAt?: Date
  failureReason?: string
  metadata?: Record<string, any>
}

export interface OnboardingRequest {
  id: string
  clientName: string
  documentId: string
  email: string
  phone: string
  status: OnboardingStatus
  kycDocuments: KYCDocument[]
  biometricValidation?: BiometricValidation
  ofacScreening?: ScreeningResult
  riskScore: number
  assignedTo?: string
  submittedAt: Date
  reviewedAt?: Date
  reviewedBy?: string
  rejectionReason?: string
}

export interface KYCDocument {
  id: string
  type: "id_front" | "id_back" | "selfie" | "proof_of_income" | "proof_of_address"
  url: string
  status: "pending" | "approved" | "rejected"
  uploadedAt: Date
  reviewedAt?: Date
  reviewedBy?: string
}

export interface BiometricValidation {
  livenessScore: number
  matchScore: number
  status: "passed" | "failed"
  validatedAt: Date
}

export interface ScreeningResult {
  hasMatch: boolean
  matches: {
    name: string
    matchPercentage: number
    list: "OFAC" | "UN" | "PEP_LOCAL"
  }[]
  screenedAt: Date
}

export interface AMLAlert {
  id: string
  type: "high_amount" | "structuring" | "unusual_pattern" | "high_risk_country" | "rapid_movement"
  clientId: string
  transactionIds: string[]
  riskScore: number
  status: AlertStatus
  description: string
  assignedTo?: string
  createdAt: Date
  resolvedAt?: Date
  resolution?: string
}

export interface Ticket {
  id: string
  ticketNumber: string
  clientId: string
  type: "question" | "complaint" | "service_request" | "bug_report"
  category: string
  priority: TicketPriority
  status: TicketStatus
  subject: string
  description: string
  assignedTo?: string
  createdAt: Date
  updatedAt: Date
  resolvedAt?: Date
  notes: TicketNote[]
  attachments: Attachment[]
}

export interface TicketNote {
  id: string
  authorId: string
  authorName: string
  content: string
  isInternal: boolean
  createdAt: Date
}

export interface Attachment {
  id: string
  filename: string
  url: string
  size: number
  uploadedAt: Date
}

export interface AuditLog {
  id: string
  userId: string
  userName: string
  action: string
  module: string
  details: string
  ipAddress: string
  userAgent: string
  timestamp: Date
  metadata?: Record<string, any>
}

export interface ServiceProvider {
  id: string
  name: string
  category: "electricity" | "water" | "telecom" | "education" | "insurance" | "taxes"
  status: "active" | "inactive" | "maintenance"
  integrationMethod: "api_rest" | "api_soap" | "batch_file"
  apiEndpoint?: string
  commission: number
  fields: DynamicField[]
}

export interface DynamicField {
  id: string
  name: string
  type: "text" | "number" | "select"
  label: string
  required: boolean
  validation?: {
    minLength?: number
    maxLength?: number
    pattern?: string
  }
}

export interface DashboardStats {
  activeUsers: number
  transactionsToday: {
    count: number
    amount: number
  }
  pendingApprovals: number
  openAlerts: number
  openTickets: number
  fraudAlerts: number
}

// ============================================
// TIPOS PARA FORMULARIOS Y VALIDACIÓN
// ============================================

export interface LoginFormData {
  email: string
  password: string
  remember?: boolean
}

export interface CreateClientFormData {
  name: string
  documentId: string
  email: string
  phone: string
  accountType: string
}

export interface TransactionFilters {
  startDate?: Date
  endDate?: Date
  type?: TransactionType
  status?: TransactionStatus
  minAmount?: number
  maxAmount?: number
  clientId?: string
}

export interface PaginationParams {
  page: number
  pageSize: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
  }
}

export interface ApprovalRequest {
  id: string
  type: "limit_change" | "user_unlock" | "config_change" | "transaction_reversal"
  requestedBy: string
  requestedAt: Date
  details: string
  currentValue?: any
  newValue?: any
  status: "pending" | "approved" | "rejected"
  approvedBy?: string
  approvedAt?: Date
  rejectionReason?: string
}
