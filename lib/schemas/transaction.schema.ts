import { z } from "zod"

/**
 * Zod schemas for transaction validation
 */

// Transaction type enum
export const transactionTypeSchema = z.enum([
  "transfer_own",
  "transfer_third_party",
  "card_payment",
  "loan_payment",
  "service_payment",
  "mobile_recharge",
  "tax_payment",
])

// Transaction status enum
export const transactionStatusSchema = z.enum([
  "completed",
  "pending",
  "failed",
  "cancelled",
  "in_review",
])

// Payment method enum
export const paymentMethodSchema = z.enum([
  "bank_account",
  "credit_card",
  "debit_card",
  "cash",
])

// Filters schema
export const transactionFiltersSchema = z.object({
  search: z.string().optional(),
  type: transactionTypeSchema.optional(),
  status: transactionStatusSchema.optional(),
  paymentMethod: paymentMethodSchema.optional(),
  minAmount: z.number().min(0).optional(),
  maxAmount: z.number().min(0).optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
})

export type TransactionFiltersData = z.infer<typeof transactionFiltersSchema>

// Cancel transaction schema
export const cancelTransactionSchema = z.object({
  reason: z
    .string()
    .min(10, "El motivo debe tener al menos 10 caracteres")
    .max(500, "El motivo no puede exceder 500 caracteres"),
})

export type CancelTransactionData = z.infer<typeof cancelTransactionSchema>

// Approve transaction schema
export const approveTransactionSchema = z.object({
  notes: z
    .string()
    .max(500, "Las notas no pueden exceder 500 caracteres")
    .optional(),
})

export type ApproveTransactionData = z.infer<typeof approveTransactionSchema>
