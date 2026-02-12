/**
 * Mock Vendors Data for Banco ADEMI Backoffice
 * Suppliers and payment providers
 */

export type VendorType = "payment_processor" | "software_provider" | "service_provider" | "infrastructure"
export type VendorStatus = "active" | "inactive" | "pending" | "suspended"
export type PaymentStatus = "paid" | "pending" | "overdue" | "cancelled"

export interface Vendor {
  id: string
  name: string
  type: VendorType
  status: VendorStatus
  email: string
  phone: string
  rnc: string // Registro Nacional del Contribuyente (Dominican Tax ID)
  monthlyAmount: number
  totalPaid: number
  lastPaymentDate: string | null
  nextPaymentDate: string | null
  contractStart: string
  contractEnd: string | null
  paymentTerms: number // Days
  services: string[]
}

export interface VendorPayment {
  id: string
  vendorId: string
  vendorName: string
  amount: number
  status: PaymentStatus
  dueDate: string
  paidDate: string | null
  invoiceNumber: string
  concept: string
  paymentMethod: string
}

// Generate vendors
const generateVendors = (): Vendor[] => {
  const vendors: Vendor[] = [
    {
      id: "VEN-0001",
      name: "Visa International",
      type: "payment_processor",
      status: "active",
      email: "admin@visa.com.do",
      phone: "809-555-0100",
      rnc: "101-12345-6",
      monthlyAmount: 250000,
      totalPaid: 3000000,
      lastPaymentDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      nextPaymentDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      contractStart: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
      contractEnd: new Date(Date.now() + 730 * 24 * 60 * 60 * 1000).toISOString(),
      paymentTerms: 30,
      services: ["Procesamiento de tarjetas", "Gateway de pagos", "Soporte 24/7"],
    },
    {
      id: "VEN-0002",
      name: "Mastercard Caribbean",
      type: "payment_processor",
      status: "active",
      email: "admin@mastercard.com.do",
      phone: "809-555-0101",
      rnc: "101-12346-7",
      monthlyAmount: 235000,
      totalPaid: 2820000,
      lastPaymentDate: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
      nextPaymentDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
      contractStart: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
      contractEnd: new Date(Date.now() + 730 * 24 * 60 * 60 * 1000).toISOString(),
      paymentTerms: 30,
      services: ["Procesamiento de pagos", "Tokenización", "Análisis de fraude"],
    },
    {
      id: "VEN-0003",
      name: "AWS Cloud Services",
      type: "infrastructure",
      status: "active",
      email: "billing@aws.com",
      phone: "1-800-123-4567",
      rnc: "102-78901-2",
      monthlyAmount: 85000,
      totalPaid: 1020000,
      lastPaymentDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      nextPaymentDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
      contractStart: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
      contractEnd: null,
      paymentTerms: 15,
      services: ["Cloud hosting", "Base de datos", "Storage", "CDN"],
    },
    {
      id: "VEN-0004",
      name: "Salesforce Dominican Republic",
      type: "software_provider",
      status: "active",
      email: "accounts@salesforce.com.do",
      phone: "809-555-0200",
      rnc: "103-45678-9",
      monthlyAmount: 125000,
      totalPaid: 1500000,
      lastPaymentDate: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
      nextPaymentDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
      contractStart: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
      contractEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      paymentTerms: 30,
      services: ["CRM", "Marketing automation", "Análisis de datos"],
    },
    {
      id: "VEN-0005",
      name: "Seguridad Total RD",
      type: "service_provider",
      status: "active",
      email: "admin@seguridadtotal.com.do",
      phone: "809-555-0300",
      rnc: "104-11111-1",
      monthlyAmount: 45000,
      totalPaid: 540000,
      lastPaymentDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      nextPaymentDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
      contractStart: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
      contractEnd: new Date(Date.now() + 730 * 24 * 60 * 60 * 1000).toISOString(),
      paymentTerms: 30,
      services: ["Seguridad física", "Vigilancia 24/7", "Control de acceso"],
    },
    {
      id: "VEN-0006",
      name: "Microsoft Caribbean",
      type: "software_provider",
      status: "active",
      email: "licensing@microsoft.com.do",
      phone: "809-555-0400",
      rnc: "105-22222-2",
      monthlyAmount: 95000,
      totalPaid: 1140000,
      lastPaymentDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      nextPaymentDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
      contractStart: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
      contractEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      paymentTerms: 30,
      services: ["Office 365", "Azure AD", "Windows Server"],
    },
    {
      id: "VEN-0007",
      name: "Limpieza Profesional SA",
      type: "service_provider",
      status: "active",
      email: "ventas@limpiezapro.com.do",
      phone: "809-555-0500",
      rnc: "106-33333-3",
      monthlyAmount: 28000,
      totalPaid: 336000,
      lastPaymentDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      nextPaymentDate: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000).toISOString(),
      contractStart: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
      contractEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      paymentTerms: 30,
      services: ["Limpieza de oficinas", "Mantenimiento"],
    },
    {
      id: "VEN-0008",
      name: "DataCenter Solutions RD",
      type: "infrastructure",
      status: "active",
      email: "billing@datacentersol.com.do",
      phone: "809-555-0600",
      rnc: "107-44444-4",
      monthlyAmount: 150000,
      totalPaid: 1800000,
      lastPaymentDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      nextPaymentDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      contractStart: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
      contractEnd: new Date(Date.now() + 730 * 24 * 60 * 60 * 1000).toISOString(),
      paymentTerms: 30,
      services: ["Colocation", "Backup", "Disaster recovery"],
    },
  ]

  return vendors
}

// Generate payments for vendors
const generateVendorPayments = (vendors: Vendor[]): VendorPayment[] => {
  const payments: VendorPayment[] = []
  let paymentId = 1

  vendors.forEach((vendor) => {
    // Generate 3-5 payments per vendor
    const numPayments = Math.floor(Math.random() * 3) + 3

    for (let i = 0; i < numPayments; i++) {
      const daysAgo = i * 30 + Math.floor(Math.random() * 10)
      const dueDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000)

      let status: PaymentStatus
      let paidDate: string | null = null

      if (i === 0) {
        // Most recent - might be pending or overdue
        const random = Math.random()
        if (random > 0.7) {
          status = "pending"
        } else if (random > 0.5) {
          status = "overdue"
        } else {
          status = "paid"
          paidDate = new Date(dueDate.getTime() + Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString()
        }
      } else {
        // Older payments - mostly paid
        status = Math.random() > 0.9 ? "cancelled" : "paid"
        if (status === "paid") {
          paidDate = new Date(dueDate.getTime() + Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString()
        }
      }

      payments.push({
        id: `PAY-${String(paymentId).padStart(4, "0")}`,
        vendorId: vendor.id,
        vendorName: vendor.name,
        amount: vendor.monthlyAmount + (Math.random() - 0.5) * 10000,
        status,
        dueDate: dueDate.toISOString(),
        paidDate,
        invoiceNumber: `INV-${vendor.id}-${String(paymentId).padStart(4, "0")}`,
        concept: vendor.services[0],
        paymentMethod: Math.random() > 0.5 ? "Transferencia Bancaria" : "ACH",
      })

      paymentId++
    }
  })

  return payments.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime())
}

export const mockVendors = generateVendors()
export const mockVendorPayments = generateVendorPayments(mockVendors)

// Helper functions
export const getVendorById = (id: string): Vendor | undefined => {
  return mockVendors.find((vendor) => vendor.id === id)
}

export const getVendorsByType = (type: VendorType): Vendor[] => {
  return mockVendors.filter((vendor) => vendor.type === type)
}

export const getVendorsByStatus = (status: VendorStatus): Vendor[] => {
  return mockVendors.filter((vendor) => vendor.status === status)
}

export const getPaymentsByVendorId = (vendorId: string): VendorPayment[] => {
  return mockVendorPayments.filter((payment) => payment.vendorId === vendorId)
}

export const getPaymentsByStatus = (status: PaymentStatus): VendorPayment[] => {
  return mockVendorPayments.filter((payment) => payment.status === status)
}

// Display names
export const vendorTypeNames: Record<VendorType, string> = {
  payment_processor: "Procesador de Pagos",
  software_provider: "Proveedor de Software",
  service_provider: "Proveedor de Servicios",
  infrastructure: "Infraestructura",
}

export const vendorStatusNames: Record<VendorStatus, string> = {
  active: "Activo",
  inactive: "Inactivo",
  pending: "Pendiente",
  suspended: "Suspendido",
}

export const paymentStatusNames: Record<PaymentStatus, string> = {
  paid: "Pagado",
  pending: "Pendiente",
  overdue: "Vencido",
  cancelled: "Cancelado",
}

// Statistics
export const getVendorsStats = () => {
  const totalMonthlyAmount = mockVendors.reduce((sum, v) => sum + v.monthlyAmount, 0)
  const totalPaid = mockVendors.reduce((sum, v) => sum + v.totalPaid, 0)
  const overduePayments = getPaymentsByStatus("overdue")
  const pendingPayments = getPaymentsByStatus("pending")
  const totalOverdue = overduePayments.reduce((sum, p) => sum + p.amount, 0)
  const totalPending = pendingPayments.reduce((sum, p) => sum + p.amount, 0)

  return {
    totalVendors: mockVendors.length,
    activeVendors: getVendorsByStatus("active").length,
    inactiveVendors: getVendorsByStatus("inactive").length,
    pendingVendors: getVendorsByStatus("pending").length,
    totalMonthlyAmount,
    totalPaid,
    overdueCount: overduePayments.length,
    pendingCount: pendingPayments.length,
    totalOverdue,
    totalPending,
    paymentProcessors: getVendorsByType("payment_processor").length,
    softwareProviders: getVendorsByType("software_provider").length,
    serviceProviders: getVendorsByType("service_provider").length,
    infrastructureProviders: getVendorsByType("infrastructure").length,
  }
}
