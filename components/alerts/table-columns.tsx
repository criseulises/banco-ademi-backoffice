"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
  Alert,
  alertTypeNames,
  alertSeverityNames,
  alertStatusNames,
} from "@/lib/mock-data/alerts-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  UserPlus,
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

// Severity badge component
const SeverityBadge = ({ severity }: { severity: string }) => {
  const variants: Record<string, string> = {
    critical: "bg-red-100 text-red-800 border-red-200",
    high: "bg-orange-100 text-orange-800 border-orange-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-blue-100 text-blue-800 border-blue-200",
  }

  return (
    <Badge className={`${variants[severity]} border font-semibold`}>
      {alertSeverityNames[severity as keyof typeof alertSeverityNames]}
    </Badge>
  )
}

// Type badge component
const TypeBadge = ({ type }: { type: string }) => {
  const variants: Record<string, string> = {
    security: "bg-purple-100 text-purple-800",
    compliance: "bg-blue-100 text-blue-800",
    system: "bg-gray-100 text-gray-800",
    transaction: "bg-green-100 text-green-800",
    fraud: "bg-red-100 text-red-800",
  }

  return (
    <Badge className={`${variants[type]} border-0`}>
      {alertTypeNames[type as keyof typeof alertTypeNames]}
    </Badge>
  )
}

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const variants: Record<string, string> = {
    open: "bg-red-100 text-red-800",
    assigned: "bg-yellow-100 text-yellow-800",
    in_progress: "bg-blue-100 text-blue-800",
    resolved: "bg-green-100 text-green-800",
    closed: "bg-gray-100 text-gray-800",
  }

  return (
    <Badge className={`${variants[status]} border-0`}>
      {alertStatusNames[status as keyof typeof alertStatusNames]}
    </Badge>
  )
}

export const columns: ColumnDef<Alert>[] = [
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
    accessorKey: "severity",
    header: "Severidad",
    cell: ({ row }) => <SeverityBadge severity={row.getValue("severity")} />,
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => <TypeBadge type={row.getValue("type")} />,
  },
  {
    accessorKey: "title",
    header: "Título",
    cell: ({ row }) => {
      const alert = row.original
      return (
        <div className="max-w-[400px]">
          <p className="font-semibold text-gray-900 line-clamp-1">
            {alert.title}
          </p>
          <p className="text-xs text-gray-500 line-clamp-2 mt-1">
            {alert.description}
          </p>
        </div>
      )
    },
  },
  {
    accessorKey: "userName",
    header: "Usuario",
    cell: ({ row }) => {
      const alert = row.original
      if (!alert.userName) return <span className="text-gray-400">-</span>
      return (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">
            {alert.userName}
          </span>
          <span className="text-xs text-gray-500">{alert.userId}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-100"
        >
          Estado
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "assignedToName",
    header: "Asignada a",
    cell: ({ row }) => {
      const alert = row.original
      if (!alert.assignedToName) return <span className="text-gray-400">Sin asignar</span>
      return <span className="text-sm text-gray-900">{alert.assignedToName}</span>
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-100"
        >
          Fecha
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string
      const date = new Date(createdAt)
      const now = new Date()
      const diff = now.getTime() - date.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))

      let timeAgo = ""
      if (hours < 1) {
        const minutes = Math.floor(diff / (1000 * 60))
        timeAgo = `Hace ${minutes} min`
      } else if (hours < 24) {
        timeAgo = `Hace ${hours}h`
      } else {
        const days = Math.floor(hours / 24)
        timeAgo = `Hace ${days}d`
      }

      return (
        <div className="flex flex-col">
          <span className="text-sm">{date.toLocaleDateString("es-DO")}</span>
          <span className="text-xs text-gray-500">{timeAgo}</span>
        </div>
      )
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const alert = row.original

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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(alert.id)}
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              Ver detalles
            </DropdownMenuItem>
            {alert.status === "open" && (
              <DropdownMenuItem>
                <UserPlus className="mr-2 h-4 w-4" />
                Asignar
              </DropdownMenuItem>
            )}
            {(alert.status === "assigned" || alert.status === "in_progress") && (
              <DropdownMenuItem className="text-green-600">
                <CheckCircle className="mr-2 h-4 w-4" />
                Resolver
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
