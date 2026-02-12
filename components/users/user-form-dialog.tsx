"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { UserForm } from "./user-form"
import { UserFormData } from "@/lib/schemas/user.schema"
import { BackofficeUserDetailed } from "@/lib/mock-data/users-data"

interface UserFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user?: BackofficeUserDetailed
  onSubmit: (data: UserFormData) => void | Promise<void>
}

export function UserFormDialog({
  open,
  onOpenChange,
  user,
  onSubmit,
}: UserFormDialogProps) {
  const handleSubmit = async (data: UserFormData) => {
    await onSubmit(data)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {user ? "Editar Usuario" : "Crear Nuevo Usuario"}
          </DialogTitle>
          <DialogDescription>
            {user
              ? "Modifica la información del usuario. Los campos marcados con * son obligatorios."
              : "Completa el formulario para crear un nuevo usuario. Los campos marcados con * son obligatorios."}
          </DialogDescription>
        </DialogHeader>
        <UserForm
          user={user}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
