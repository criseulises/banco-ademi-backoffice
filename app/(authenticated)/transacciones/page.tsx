"use client"

import { useState, useMemo } from "react"
import { ArrowLeftRight, CheckCircle, Clock, XCircle, TrendingUp } from "lucide-react"
import { mockTransactions, getTransactionStats } from "@/lib/mock-data/transactions-data"
import { TransactionsTable } from "@/components/transactions/transactions-table"
import { TransactionsFilters } from "@/components/transactions/transactions-filters"
import { columns } from "@/components/transactions/table-columns"

export default function TransactionsPage() {
  const [filters, setFilters] = useState({
    type: "",
    status: "",
    paymentMethod: "",
    minAmount: "",
    maxAmount: "",
    dateFrom: "",
    dateTo: "",
  })

  const stats = getTransactionStats()

  // Filter transactions based on active filters
  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((transaction) => {
      // Type filter
      if (filters.type && transaction.type !== filters.type) return false

      // Status filter
      if (filters.status && transaction.status !== filters.status) return false

      // Payment method filter
      if (
        filters.paymentMethod &&
        transaction.paymentMethod !== filters.paymentMethod
      )
        return false

      // Min amount filter
      if (filters.minAmount && transaction.amount < parseFloat(filters.minAmount))
        return false

      // Max amount filter
      if (filters.maxAmount && transaction.amount > parseFloat(filters.maxAmount))
        return false

      // Date from filter
      if (
        filters.dateFrom &&
        new Date(transaction.createdAt) < new Date(filters.dateFrom)
      )
        return false

      // Date to filter
      if (
        filters.dateTo &&
        new Date(transaction.createdAt) > new Date(filters.dateTo + "T23:59:59")
      )
        return false

      return true
    })
  }, [filters])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <ArrowLeftRight className="h-8 w-8" style={{ color: "#0095A9" }} />
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de Transacciones
          </h1>
        </div>
        <p className="text-gray-600">
          Monitorea y administra todas las transacciones del sistema
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Transacciones
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {stats.total.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <ArrowLeftRight className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completadas</p>
              <h3 className="text-2xl font-bold text-green-600 mt-1">
                {stats.completed.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pendientes</p>
              <h3 className="text-2xl font-bold text-yellow-600 mt-1">
                {stats.pending.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Fallidas</p>
              <h3 className="text-2xl font-bold text-red-600 mt-1">
                {stats.failed.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Monto Total
              </p>
              <h3 className="text-xl font-bold text-gray-900 mt-1">
                RD$ {stats.totalAmount.toLocaleString("es-DO", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Promedio: RD$ {stats.averageAmount.toLocaleString("es-DO", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <TransactionsFilters onFilterChange={setFilters} />

      {/* Transactions Table */}
      <div className="bg-white rounded-lg border p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Todas las Transacciones
          </h2>
          <p className="text-sm text-gray-600">
            Mostrando {filteredTransactions.length} de {stats.total} transacciones
          </p>
        </div>
        <TransactionsTable columns={columns} data={filteredTransactions} />
      </div>
    </div>
  )
}
