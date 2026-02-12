import { z } from "zod"

/**
 * Zod schemas for alert validation
 */

// Alert type enum
export const alertTypeSchema = z.enum([
  "security",
  "compliance",
  "system",
  "transaction",
  "fraud",
])

// Alert severity enum
export const alertSeveritySchema = z.enum([
  "critical",
  "high",
  "medium",
  "low",
])

// Alert status enum
export const alertStatusSchema = z.enum([
  "open",
  "assigned",
  "in_progress",
  "resolved",
  "closed",
])

// Filters schema
export const alertFiltersSchema = z.object({
  search: z.string().optional(),
  type: alertTypeSchema.optional(),
  severity: alertSeveritySchema.optional(),
  status: alertStatusSchema.optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
})

export type AlertFiltersData = z.infer<typeof alertFiltersSchema>

// Assign alert schema
export const assignAlertSchema = z.object({
  assignedTo: z.string().email("Debe ser un email válido"),
  notes: z.string().max(500, "Las notas no pueden exceder 500 caracteres").optional(),
})

export type AssignAlertData = z.infer<typeof assignAlertSchema>

// Resolve alert schema
export const resolveAlertSchema = z.object({
  resolution: z.string().min(10, "La resolución debe tener al menos 10 caracteres").max(1000, "La resolución no puede exceder 1000 caracteres"),
  requiresFollowUp: z.boolean().default(false),
})

export type ResolveAlertData = z.infer<typeof resolveAlertSchema>

// Add note schema
export const addNoteSchema = z.object({
  note: z.string().min(5, "La nota debe tener al menos 5 caracteres").max(500, "La nota no puede exceder 500 caracteres"),
})

export type AddNoteData = z.infer<typeof addNoteSchema>
