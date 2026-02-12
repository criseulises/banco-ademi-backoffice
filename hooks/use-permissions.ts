"use client"

import { useAuth } from "./use-auth"
import { rolePermissions } from "@/config/site"

export function usePermissions() {
  const { user } = useAuth()

  const can = (permission: string): boolean => {
    if (!user) return false
    
    // Admin tiene todos los permisos
    if (user.role === "admin") return true
    
    const userPermissions = rolePermissions[user.role] || []
    return userPermissions.includes(permission)
  }

  const hasRole = (role: string): boolean => {
    if (!user) return false
    return user.role === role
  }

  const hasAnyRole = (roles: string[]): boolean => {
    if (!user) return false
    return roles.includes(user.role)
  }

  return {
    can,
    hasRole,
    hasAnyRole,
    permissions: user ? rolePermissions[user.role] || [] : [],
  }
}
