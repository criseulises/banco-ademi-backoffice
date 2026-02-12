/**
 * Mock Compliance/KYC Data for Banco ADEMI Backoffice
 * Contains sample KYC verification and compliance data
 */

export type KYCStatus = "pending" | "approved" | "rejected" | "expired" | "under_review"

export type DocumentType = "cedula" | "passport" | "license" | "proof_of_address" | "bank_statement"

export type RiskLevel = "low" | "medium" | "high" | "very_high"

export interface KYCRecord {
  id: string
  userId: string
  userName: string
  email: string
  status: KYCStatus
  riskLevel: RiskLevel
  riskScore: number
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
  expiresAt?: string
  documents: KYCDocument[]
  pepCheck: boolean
  sanctionsCheck: boolean
  adverseMediaCheck: boolean
  notes?: string
}

export interface KYCDocument {
  id: string
  type: DocumentType
  fileName: string
  uploadedAt: string
  status: "pending" | "approved" | "rejected"
  rejectionReason?: string
}

// Generate KYC records
const generateKYCRecords = (): KYCRecord[] => {
  const now = new Date()

  const records: KYCRecord[] = [
    {
      id: "KYC-001",
      userId: "USR-1234",
      userName: "María González",
      email: "maria.gonzalez@email.com",
      status: "pending",
      riskLevel: "low",
      riskScore: 25,
      submittedAt: new Date(now.getTime() - 2 * 60 * 60000).toISOString(),
      documents: [
        {
          id: "DOC-001",
          type: "cedula",
          fileName: "cedula-frente.jpg",
          uploadedAt: new Date(now.getTime() - 2 * 60 * 60000).toISOString(),
          status: "pending",
        },
        {
          id: "DOC-002",
          type: "cedula",
          fileName: "cedula-reverso.jpg",
          uploadedAt: new Date(now.getTime() - 2 * 60 * 60000).toISOString(),
          status: "pending",
        },
        {
          id: "DOC-003",
          type: "proof_of_address",
          fileName: "factura-luz.pdf",
          uploadedAt: new Date(now.getTime() - 2 * 60 * 60000).toISOString(),
          status: "pending",
        },
      ],
      pepCheck: false,
      sanctionsCheck: false,
      adverseMediaCheck: false,
    },
    {
      id: "KYC-002",
      userId: "USR-5678",
      userName: "Juan Pérez",
      email: "juan.perez@email.com",
      status: "approved",
      riskLevel: "low",
      riskScore: 18,
      submittedAt: new Date(now.getTime() - 5 * 24 * 60 * 60000).toISOString(),
      reviewedAt: new Date(now.getTime() - 4 * 24 * 60 * 60000).toISOString(),
      reviewedBy: "Carlos Cumplimiento",
      expiresAt: new Date(now.getTime() + 360 * 24 * 60 * 60000).toISOString(),
      documents: [
        {
          id: "DOC-004",
          type: "cedula",
          fileName: "cedula-completa.pdf",
          uploadedAt: new Date(now.getTime() - 5 * 24 * 60 * 60000).toISOString(),
          status: "approved",
        },
        {
          id: "DOC-005",
          type: "proof_of_address",
          fileName: "contrato-alquiler.pdf",
          uploadedAt: new Date(now.getTime() - 5 * 24 * 60 * 60000).toISOString(),
          status: "approved",
        },
      ],
      pepCheck: false,
      sanctionsCheck: false,
      adverseMediaCheck: false,
      notes: "Documentación completa y verificada",
    },
    {
      id: "KYC-003",
      userId: "USR-9012",
      userName: "Ana Rodríguez",
      email: "ana.rodriguez@email.com",
      status: "under_review",
      riskLevel: "medium",
      riskScore: 55,
      submittedAt: new Date(now.getTime() - 24 * 60 * 60000).toISOString(),
      documents: [
        {
          id: "DOC-006",
          type: "passport",
          fileName: "pasaporte-completo.pdf",
          uploadedAt: new Date(now.getTime() - 24 * 60 * 60000).toISOString(),
          status: "approved",
        },
        {
          id: "DOC-007",
          type: "bank_statement",
          fileName: "estado-cuenta.pdf",
          uploadedAt: new Date(now.getTime() - 24 * 60 * 60000).toISOString(),
          status: "pending",
        },
      ],
      pepCheck: true,
      sanctionsCheck: false,
      adverseMediaCheck: false,
      notes: "Requiere verificación adicional - coincidencia parcial en lista PEP",
    },
    {
      id: "KYC-004",
      userId: "USR-3456",
      userName: "Carlos Martínez",
      email: "carlos.martinez@email.com",
      status: "rejected",
      riskLevel: "high",
      riskScore: 82,
      submittedAt: new Date(now.getTime() - 3 * 24 * 60 * 60000).toISOString(),
      reviewedAt: new Date(now.getTime() - 2 * 24 * 60 * 60000).toISOString(),
      reviewedBy: "Ana Martínez",
      documents: [
        {
          id: "DOC-008",
          type: "cedula",
          fileName: "cedula-borrosa.jpg",
          uploadedAt: new Date(now.getTime() - 3 * 24 * 60 * 60000).toISOString(),
          status: "rejected",
          rejectionReason: "Imagen no legible, solicitar nueva foto",
        },
        {
          id: "DOC-009",
          type: "proof_of_address",
          fileName: "factura-antigua.pdf",
          uploadedAt: new Date(now.getTime() - 3 * 24 * 60 * 60000).toISOString(),
          status: "rejected",
          rejectionReason: "Documento con más de 3 meses de antigüedad",
        },
      ],
      pepCheck: false,
      sanctionsCheck: true,
      adverseMediaCheck: true,
      notes: "Usuario en lista de sanciones - cuenta bloqueada",
    },
    {
      id: "KYC-005",
      userId: "USR-7890",
      userName: "Laura Sánchez",
      email: "laura.sanchez@email.com",
      status: "expired",
      riskLevel: "low",
      riskScore: 22,
      submittedAt: new Date(now.getTime() - 400 * 24 * 60 * 60000).toISOString(),
      reviewedAt: new Date(now.getTime() - 395 * 24 * 60 * 60000).toISOString(),
      reviewedBy: "Carlos Cumplimiento",
      expiresAt: new Date(now.getTime() - 35 * 24 * 60 * 60000).toISOString(),
      documents: [
        {
          id: "DOC-010",
          type: "cedula",
          fileName: "cedula.pdf",
          uploadedAt: new Date(now.getTime() - 400 * 24 * 60 * 60000).toISOString(),
          status: "approved",
        },
      ],
      pepCheck: false,
      sanctionsCheck: false,
      adverseMediaCheck: false,
      notes: "Requiere renovación de documentos",
    },
    {
      id: "KYC-006",
      userId: "USR-2345",
      userName: "Pedro López",
      email: "pedro.lopez@email.com",
      status: "pending",
      riskLevel: "low",
      riskScore: 30,
      submittedAt: new Date(now.getTime() - 6 * 60 * 60000).toISOString(),
      documents: [
        {
          id: "DOC-011",
          type: "cedula",
          fileName: "id-front.jpg",
          uploadedAt: new Date(now.getTime() - 6 * 60 * 60000).toISOString(),
          status: "pending",
        },
        {
          id: "DOC-012",
          type: "cedula",
          fileName: "id-back.jpg",
          uploadedAt: new Date(now.getTime() - 6 * 60 * 60000).toISOString(),
          status: "pending",
        },
      ],
      pepCheck: false,
      sanctionsCheck: false,
      adverseMediaCheck: false,
    },
    {
      id: "KYC-007",
      userId: "USR-6789",
      userName: "Isabel Díaz",
      email: "isabel.diaz@email.com",
      status: "approved",
      riskLevel: "low",
      riskScore: 15,
      submittedAt: new Date(now.getTime() - 10 * 24 * 60 * 60000).toISOString(),
      reviewedAt: new Date(now.getTime() - 9 * 24 * 60 * 60000).toISOString(),
      reviewedBy: "Ana Martínez",
      expiresAt: new Date(now.getTime() + 355 * 24 * 60 * 60000).toISOString(),
      documents: [
        {
          id: "DOC-013",
          type: "license",
          fileName: "licencia-conducir.pdf",
          uploadedAt: new Date(now.getTime() - 10 * 24 * 60 * 60000).toISOString(),
          status: "approved",
        },
        {
          id: "DOC-014",
          type: "proof_of_address",
          fileName: "recibo-agua.pdf",
          uploadedAt: new Date(now.getTime() - 10 * 24 * 60 * 60000).toISOString(),
          status: "approved",
        },
      ],
      pepCheck: false,
      sanctionsCheck: false,
      adverseMediaCheck: false,
    },
    {
      id: "KYC-008",
      userId: "USR-4567",
      userName: "Jorge Ramírez",
      email: "jorge.ramirez@email.com",
      status: "under_review",
      riskLevel: "high",
      riskScore: 75,
      submittedAt: new Date(now.getTime() - 12 * 60 * 60000).toISOString(),
      documents: [
        {
          id: "DOC-015",
          type: "passport",
          fileName: "passport.pdf",
          uploadedAt: new Date(now.getTime() - 12 * 60 * 60000).toISOString(),
          status: "approved",
        },
        {
          id: "DOC-016",
          type: "bank_statement",
          fileName: "bank-statement-3-months.pdf",
          uploadedAt: new Date(now.getTime() - 12 * 60 * 60000).toISOString(),
          status: "pending",
        },
      ],
      pepCheck: false,
      sanctionsCheck: false,
      adverseMediaCheck: true,
      notes: "Requiere verificación de fuentes de fondos - transacciones de alto valor",
    },
  ]

  return records
}

export const mockKYCRecords = generateKYCRecords()

// Helper functions
export const getKYCById = (id: string): KYCRecord | undefined => {
  return mockKYCRecords.find((record) => record.id === id)
}

export const getKYCByStatus = (status: KYCStatus): KYCRecord[] => {
  return mockKYCRecords.filter((record) => record.status === status)
}

export const getKYCByRiskLevel = (riskLevel: RiskLevel): KYCRecord[] => {
  return mockKYCRecords.filter((record) => record.riskLevel === riskLevel)
}

export const getPendingKYC = (): KYCRecord[] => {
  return mockKYCRecords.filter((record) =>
    record.status === "pending" || record.status === "under_review"
  )
}

// Display names
export const kycStatusNames: Record<KYCStatus, string> = {
  pending: "Pendiente",
  approved: "Aprobado",
  rejected: "Rechazado",
  expired: "Vencido",
  under_review: "En Revisión",
}

export const documentTypeNames: Record<DocumentType, string> = {
  cedula: "Cédula de Identidad",
  passport: "Pasaporte",
  license: "Licencia de Conducir",
  proof_of_address: "Comprobante de Domicilio",
  bank_statement: "Estado de Cuenta",
}

export const riskLevelNames: Record<RiskLevel, string> = {
  low: "Bajo",
  medium: "Medio",
  high: "Alto",
  very_high: "Muy Alto",
}

// Statistics
export const getKYCStats = () => {
  return {
    total: mockKYCRecords.length,
    pending: getKYCByStatus("pending").length,
    underReview: getKYCByStatus("under_review").length,
    approved: getKYCByStatus("approved").length,
    rejected: getKYCByStatus("rejected").length,
    expired: getKYCByStatus("expired").length,
    highRisk: getKYCByRiskLevel("high").length + getKYCByRiskLevel("very_high").length,
    pepFlagged: mockKYCRecords.filter((r) => r.pepCheck).length,
    sanctionsFlagged: mockKYCRecords.filter((r) => r.sanctionsCheck).length,
  }
}
