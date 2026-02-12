"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
  KYCRecord,
  kycStatusNames,
  riskLevelNames,
} from "@/lib/mock-data/compliance-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const variants: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    expired: "bg-gray-100 text-gray-800",
    under_review: "bg-blue-100 text-blue-800",
  }

  return (
    <Badge className={`${variants[status]} border-0`}>
      {kycStatusNames[status as keyof typeof kycStatusNames]}
    </Badge>
  )
}

// Risk level badge component
const RiskBadge = ({ level, score }: { level: string; score: number }) => {
  const variants: Record<string, string> = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-orange-100 text-orange-800",
    very_high: "bg-red-100 text-red-800",
  }

  return (
    <div className="flex flex-col gap-1">
      <Badge className={`${variants[level]} border-0 w-fit`}>
        {riskLevelNames[level as keyof typeof riskLevelNames]}
      </Badge>
      <span className="text-xs text-gray-500">Score: {score}</span>
    </div>
  )
}

export const columns: ColumnDef<KYCRecord>[] = [
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
    accessorKey: "userName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-100"
        >
          Usuario
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const record = row.original
      return (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">{record.userName}</span>
          <span className="text-xs text-gray-500">{record.email}</span>
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
    accessorKey: "riskLevel",
    header: "Nivel de Riesgo",
    cell: ({ row }) => {
      const record = row.original
      return <RiskBadge level={record.riskLevel} score={record.riskScore} />
    },
  },
  {
    accessorKey: "documents",
    header: "Documentos",
    cell: ({ row }) => {
      const record = row.original
      const approved = record.documents.filter((d) => d.status === "approved").length
      const total = record.documents.length

      return (
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-900">
            {approved}/{total} aprobados
          </span>
          <div className="flex gap-1">
            {record.pepCheck && (
              <Badge variant="outline" className="text-xs bg-red-50 text-red-700">
                PEP
              </Badge>
            )}
            {record.sanctionsCheck && (
              <Badge variant="outline" className="text-xs bg-red-50 text-red-700">
                Sanciones
              </Badge>
            )}
            {record.adverseMediaCheck && (
              <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700">
                Medios
              </Badge>
            )}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "submittedAt",
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
      const submittedAt = row.getValue("submittedAt") as string
      const date = new Date(submittedAt)
      return (
        <div className="flex flex-col">
          <span className="text-sm">{date.toLocaleDateString("es-DO")}</span>
          <span className="text-xs text-gray-500">
            {date.toLocaleTimeString("es-DO", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      )
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const record = row.original

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
              onClick={() => navigator.clipboard.writeText(record.id)}
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              Ver detalles
            </DropdownMenuItem>
            {(record.status === "pending" || record.status === "under_review") && (
              <>
                <DropdownMenuItem className="text-green-600">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Aprobar
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <XCircle className="mr-2 h-4 w-4" />
                  Rechazar
                </DropdownMenuItem>
              </>
            )}
            {record.status === "expired" && (
              <DropdownMenuItem className="text-orange-600">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Solicitar renovación
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
