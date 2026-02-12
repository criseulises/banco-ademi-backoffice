"use client"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Filter, X } from "lucide-react"
import { roleNames, statusNames, departments } from "@/lib/mock-data/users-data"
import { useState } from "react"

interface UsersFiltersProps {
  onFilterChange?: (filters: {
    role?: string
    status?: string
    department?: string
    twoFactorEnabled?: string
  }) => void
}

export function UsersFilters({ onFilterChange }: UsersFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    role: "",
    status: "",
    department: "",
    twoFactorEnabled: "",
  })

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    if (onFilterChange) {
      onFilterChange(newFilters)
    }
  }

  const clearFilters = () => {
    const emptyFilters = {
      role: "",
      status: "",
      department: "",
      twoFactorEnabled: "",
    }
    setFilters(emptyFilters)
    if (onFilterChange) {
      onFilterChange(emptyFilters)
    }
  }

  const hasActiveFilters =
    filters.role || filters.status || filters.department || filters.twoFactorEnabled

  return (
    <div className="space-y-4">
      {/* Filter Toggle Button */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filtros
          {hasActiveFilters && (
            <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-white">
              {Object.values(filters).filter((v) => v).length}
            </span>
          )}
        </Button>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Limpiar filtros
          </Button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Role Filter */}
              <div className="space-y-2">
                <Label htmlFor="filter-role">Rol</Label>
                <Select
                  value={filters.role}
                  onValueChange={(value) => handleFilterChange("role", value)}
                >
                  <SelectTrigger id="filter-role">
                    <SelectValue placeholder="Todos los roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos los roles</SelectItem>
                    {Object.entries(roleNames).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <Label htmlFor="filter-status">Estado</Label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => handleFilterChange("status", value)}
                >
                  <SelectTrigger id="filter-status">
                    <SelectValue placeholder="Todos los estados" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos los estados</SelectItem>
                    {Object.entries(statusNames).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Department Filter */}
              <div className="space-y-2">
                <Label htmlFor="filter-department">Departamento</Label>
                <Select
                  value={filters.department}
                  onValueChange={(value) => handleFilterChange("department", value)}
                >
                  <SelectTrigger id="filter-department">
                    <SelectValue placeholder="Todos los departamentos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos los departamentos</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 2FA Filter */}
              <div className="space-y-2">
                <Label htmlFor="filter-2fa">Autenticación 2FA</Label>
                <Select
                  value={filters.twoFactorEnabled}
                  onValueChange={(value) =>
                    handleFilterChange("twoFactorEnabled", value)
                  }
                >
                  <SelectTrigger id="filter-2fa">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos</SelectItem>
                    <SelectItem value="true">Habilitado</SelectItem>
                    <SelectItem value="false">Deshabilitado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
