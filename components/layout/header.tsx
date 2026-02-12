"use client"

import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { colors } from "@/lib/colors"
import { Bell, LogOut, User } from "lucide-react"

interface HeaderProps {
  notificationCount?: number
}

export function Header({ notificationCount = 0 }: HeaderProps) {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
  }

  return (
    <header style={{ backgroundColor: colors.primary }} className="shadow-md">
      <div className="w-full px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-white">
              <div className="text-2xl font-bold">BANCO ADEMI</div>
              <div className="text-xs opacity-90">Backoffice</div>
            </div>
          </div>

          {/* Right Side - User Info & Actions */}
          <div className="flex items-center gap-6">
            {/* User Info */}
            {user && (
              <div className="flex items-center gap-3 text-white">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <User size={18} />
                </div>
                <div className="text-sm">
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-xs opacity-90">
                    {user.role === "admin"
                      ? "Administrador"
                      : user.role === "compliance_officer"
                      ? "Compliance"
                      : user.role === "operations_manager"
                      ? "Operaciones"
                      : "Soporte"}
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            <button
              className="flex flex-col items-center gap-1 group relative hover:opacity-80 transition-opacity"
              aria-label="Notificaciones"
            >
              <div className="relative">
                <Bell size={20} className="text-white" />
                {notificationCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </span>
                )}
              </div>
              <span className="text-white text-xs font-medium">
                Notificaciones
              </span>
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex flex-col items-center gap-1 group hover:opacity-80 transition-opacity"
              aria-label="Salir"
            >
              <LogOut size={20} className="text-white" />
              <span className="text-white text-xs font-medium">Salir</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
