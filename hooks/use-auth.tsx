"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"
import type { BackofficeUser } from "@/types"
import { authenticateUser } from "@/lib/mock-users"

interface AuthContextType {
  user: BackofficeUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<BackofficeUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Cargar usuario del localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("backoffice_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem("backoffice_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Simular delay de red
      await new Promise((resolve) => setTimeout(resolve, 500))
      
      const authenticatedUser = authenticateUser(email, password)
      
      if (!authenticatedUser) {
        return {
          success: false,
          error: "Credenciales inválidas. Verifica tu email y contraseña.",
        }
      }
      
      // Guardar en localStorage
      localStorage.setItem("backoffice_user", JSON.stringify(authenticatedUser))
      setUser(authenticatedUser)
      
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: "Error al iniciar sesión. Intenta nuevamente.",
      }
    }
  }

  const logout = () => {
    localStorage.removeItem("backoffice_user")
    setUser(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
