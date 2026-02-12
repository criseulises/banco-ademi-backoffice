import { z } from "zod"

/**
 * Zod schemas for user validation
 */

// User roles enum
export const userRoleSchema = z.enum([
  "admin",
  "compliance_officer",
  "operations_manager",
  "support_agent",
  "product_manager",
  "risk_analyst",
  "auditor",
])

// User status enum
export const userStatusSchema = z.enum([
  "active",
  "inactive",
  "suspended",
  "blocked",
])

// Create/Edit user form schema
export const userFormSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),

  email: z
    .string()
    .email("Debe ser un email válido")
    .endsWith("@bancoademi.com", "El email debe ser del dominio @bancoademi.com"),

  role: userRoleSchema,

  department: z
    .string()
    .min(2, "El departamento debe tener al menos 2 caracteres")
    .max(50, "El departamento no puede exceder 50 caracteres"),

  status: userStatusSchema,

  phone: z
    .string()
    .regex(
      /^\+?1?\s?\(?[0-9]{3}\)?\s?[0-9]{3}[-\s]?[0-9]{4}$/,
      "Formato de teléfono inválido. Ejemplo: +1 (809) 555-0123"
    ),

  position: z
    .string()
    .min(3, "La posición debe tener al menos 3 caracteres")
    .max(100, "La posición no puede exceder 100 caracteres"),

  twoFactorEnabled: z.boolean().default(false),

  notes: z.string().max(500, "Las notas no pueden exceder 500 caracteres").optional(),
})

// Type inference from schema
export type UserFormData = z.infer<typeof userFormSchema>

// Change password schema
export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "La contraseña actual es requerida"),

    newPassword: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/,
        "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial"
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })

export type ChangePasswordData = z.infer<typeof changePasswordSchema>

// Filters schema
export const userFiltersSchema = z.object({
  search: z.string().optional(),
  role: userRoleSchema.optional(),
  status: userStatusSchema.optional(),
  department: z.string().optional(),
  twoFactorEnabled: z.boolean().optional(),
})

export type UserFiltersData = z.infer<typeof userFiltersSchema>
