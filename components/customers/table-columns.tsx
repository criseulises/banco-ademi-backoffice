"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
  Customer,
  accountTypeNames,
  tierNames,
  customerStatusNames,
} from "@/lib/mock-data/customers-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  CreditCard,
  FileText,
  Ban,
  CheckCircle,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Status badge
const StatusBadge = ({ status }: { status: string }) => {
  const variants: Record<string, string> = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    suspended: "bg-yellow-100 text-yellow-800",
    blocked: "bg-red-100 text-red-800",
  }

  return (
    <Badge className={`${variants[status]} border-0`}>
      {customerStatusNames[status as keyof typeof customerStatusNames]}
    </Badge>
  )
}

// Tier badge
const TierBadge = ({ tier }: { tier: string }) => {
  const variants: Record<string, string> = {
    standard: "bg-gray-100 text-gray-800",
    gold: "bg-yellow-100 text-yellow-800",
    platinum: "bg-purple-100 text-purple-800",
    vip: "bg-red-100 text-red-800",
  }

  return (
    <Badge className={`${variants[tier]} border-0 font-semibold`}>
      {tierNames[tier as keyof typeof tierNames]}
    </Badge>
  )
}

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-100"
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="font-mono text-sm font-semibold text-gray-900">
          {row.getValue("id")}
        </div>
      )
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-100"
        >
          Cliente
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const customer = row.original
      return (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">{customer.name}</span>
          <span className="text-xs text-gray-500">{customer.email}</span>
          <span className="text-xs text-gray-400">{customer.cedula}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "accountType",
    header: "Tipo de Cuenta",
    cell: ({ row }) => {
      const type = row.getValue("accountType") as string
      return (
        <span className="text-sm text-gray-900">
          {accountTypeNames[type as keyof typeof accountTypeNames]}
        </span>
      )
    },
  },
  {
    accessorKey: "tier",
    header: "Nivel",
    cell: ({ row }) => <TierBadge tier={row.getValue("tier")} />,
  },
  {
    accessorKey: "balance",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-100"
        >
          Balance
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const balance = row.getValue("balance") as number
      return (
        <div className="font-semibold text-gray-900">
          RD$ {balance.toLocaleString("es-DO", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "kycStatus",
    header: "KYC",
    cell: ({ row }) => {
      const customer = row.original
      const variants: Record<string, string> = {
        approved: "bg-green-100 text-green-800",
        pending: "bg-yellow-100 text-yellow-800",
        rejected: "bg-red-100 text-red-800",
      }
      const labels: Record<string, string> = {
        approved: "Aprobado",
        pending: "Pendiente",
        rejected: "Rechazado",
      }
      return (
        <Badge className={`${variants[customer.kycStatus]} border-0 text-xs`}>
          {labels[customer.kycStatus]}
        </Badge>
      )
    },
  },
  {
    id: "products",
    header: "Productos",
    cell: ({ row }) => {
      const customer = row.original
      return (
        <div className="flex gap-1">
          {customer.hasActiveLoans && (
            <Badge variant="outline" className="text-xs">
              Préstamo
            </Badge>
          )}
          {customer.hasCreditCard && (
            <Badge variant="outline" className="text-xs">
              <CreditCard className="h-3 w-3 mr-1" />
              TC
            </Badge>
          )}
        </div>
      )
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const customer = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              Ver perfil completo
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileText className="mr-2 h-4 w-4" />
              Ver transacciones
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {customer.status === "active" ? (
              <DropdownMenuItem className="text-yellow-600">
                <Ban className="mr-2 h-4 w-4" />
                Suspender cuenta
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem className="text-green-600">
                <CheckCircle className="mr-2 h-4 w-4" />
                Activar cuenta
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
