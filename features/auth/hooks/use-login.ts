"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import type { LoginFormData } from "../schema/login-schema"

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { login } = useAuth()

  const handleLogin = async (credentials: LoginFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await login(credentials.email, credentials.password)

      if (!result.success) {
        setError(result.error || "Error al iniciar sesión")
        return false
      }

      // Redirigir usando window.location para forzar recarga
      window.location.href = "/dashboard"
      return true
    } catch (err) {
      setError("Error inesperado al iniciar sesión")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    error,
    handleLogin,
  }
}
