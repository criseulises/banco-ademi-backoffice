"use client"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Filter, X } from "lucide-react"
import {
  transactionTypeNames,
  transactionStatusNames,
  paymentMethodNames,
} from "@/lib/mock-data/transactions-data"
import { useState } from "react"

interface TransactionsFiltersProps {
  onFilterChange?: (filters: {
    type?: string
    status?: string
    paymentMethod?: string
    minAmount?: string
    maxAmount?: string
    dateFrom?: string
    dateTo?: string
  }) => void
}

export function TransactionsFilters({ onFilterChange }: TransactionsFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    type: "",
    status: "",
    paymentMethod: "",
    minAmount: "",
    maxAmount: "",
    dateFrom: "",
    dateTo: "",
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
      type: "",
      status: "",
      paymentMethod: "",
      minAmount: "",
      maxAmount: "",
      dateFrom: "",
      dateTo: "",
    }
    setFilters(emptyFilters)
    if (onFilterChange) {
      onFilterChange(emptyFilters)
    }
  }

  const hasActiveFilters = Object.values(filters).some((v) => v)

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
          Filtros Avanzados
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
              {/* Type Filter */}
              <div className="space-y-2">
                <Label htmlFor="filter-type">Tipo de Transacción</Label>
                <Select
                  value={filters.type}
                  onValueChange={(value) => handleFilterChange("type", value)}
                >
                  <SelectTrigger id="filter-type">
                    <SelectValue placeholder="Todos los tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos los tipos</SelectItem>
                    {Object.entries(transactionTypeNames).map(([key, value]) => (
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
                    {Object.entries(transactionStatusNames).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Payment Method Filter */}
              <div className="space-y-2">
                <Label htmlFor="filter-payment">Método de Pago</Label>
                <Select
                  value={filters.paymentMethod}
                  onValueChange={(value) =>
                    handleFilterChange("paymentMethod", value)
                  }
                >
                  <SelectTrigger id="filter-payment">
                    <SelectValue placeholder="Todos los métodos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos los métodos</SelectItem>
                    {Object.entries(paymentMethodNames).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Min Amount */}
              <div className="space-y-2">
                <Label htmlFor="filter-min-amount">Monto Mínimo (RD$)</Label>
                <Input
                  id="filter-min-amount"
                  type="number"
                  min="0"
                  step="100"
                  placeholder="0.00"
                  value={filters.minAmount}
                  onChange={(e) =>
                    handleFilterChange("minAmount", e.target.value)
                  }
                />
              </div>

              {/* Max Amount */}
              <div className="space-y-2">
                <Label htmlFor="filter-max-amount">Monto Máximo (RD$)</Label>
                <Input
                  id="filter-max-amount"
                  type="number"
                  min="0"
                  step="100"
                  placeholder="999,999.99"
                  value={filters.maxAmount}
                  onChange={(e) =>
                    handleFilterChange("maxAmount", e.target.value)
                  }
                />
              </div>

              {/* Date From */}
              <div className="space-y-2">
                <Label htmlFor="filter-date-from">Fecha Desde</Label>
                <Input
                  id="filter-date-from"
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) =>
                    handleFilterChange("dateFrom", e.target.value)
                  }
                />
              </div>

              {/* Date To */}
              <div className="space-y-2">
                <Label htmlFor="filter-date-to">Fecha Hasta</Label>
                <Input
                  id="filter-date-to"
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange("dateTo", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
