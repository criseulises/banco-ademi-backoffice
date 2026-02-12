"use client"

import { useState, useMemo } from "react"
import { Users as UsersIcon } from "lucide-react"
import { mockUsers } from "@/lib/mock-data/users-data"
import { UsersTable } from "@/components/users/users-table"
import { UsersFilters } from "@/components/users/users-filters"
import { UserFormDialog } from "@/components/users/user-form-dialog"
import { columns } from "@/components/users/table-columns"
import { UserFormData } from "@/lib/schemas/user.schema"
import { toast } from "sonner"

export default function UsersPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [filters, setFilters] = useState({
    role: "",
    status: "",
    department: "",
    twoFactorEnabled: "",
  })

  // Filter users based on active filters
  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      if (filters.role && user.role !== filters.role) return false
      if (filters.status && user.status !== filters.status) return false
      if (filters.department && user.department !== filters.department)
        return false
      if (
        filters.twoFactorEnabled &&
        user.twoFactorEnabled !== (filters.twoFactorEnabled === "true")
      )
        return false
      return true
    })
  }, [filters])

  const handleCreateUser = (data: UserFormData) => {
    console.log("Creating user:", data)
    toast.success(`Usuario creado: ${data.name} ha sido creado exitosamente.`)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <UsersIcon className="h-8 w-8" style={{ color: "#0095A9" }} />
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de Usuarios
          </h1>
        </div>
        <p className="text-gray-600">
          Administra los usuarios del backoffice, roles y permisos
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Usuarios
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {mockUsers.length}
              </h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <UsersIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Activos</p>
              <h3 className="text-2xl font-bold text-green-600 mt-1">
                {mockUsers.filter((u) => u.status === "active").length}
              </h3>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <div className="h-6 w-6 bg-green-600 rounded-full" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Inactivos</p>
              <h3 className="text-2xl font-bold text-gray-600 mt-1">
                {mockUsers.filter((u) => u.status === "inactive").length}
              </h3>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg">
              <div className="h-6 w-6 bg-gray-600 rounded-full" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Con 2FA</p>
              <h3 className="text-2xl font-bold text-purple-600 mt-1">
                {mockUsers.filter((u) => u.twoFactorEnabled).length}
              </h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <div className="h-6 w-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                2FA
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <UsersFilters onFilterChange={setFilters} />

      {/* Users Table */}
      <div className="bg-white rounded-lg border p-6">
        <UsersTable
          columns={columns}
          data={filteredUsers}
          onAddUser={() => setDialogOpen(true)}
        />
      </div>

      {/* Create User Dialog */}
      <UserFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleCreateUser}
      />
    </div>
  )
}
