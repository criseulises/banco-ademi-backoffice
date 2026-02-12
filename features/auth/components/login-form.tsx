"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { User, Lock } from "lucide-react"
import { loginSchema, type LoginFormData } from "../schema/login-schema"
import { useLogin } from "../hooks/use-login"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const LoginForm = () => {
  const { isLoading, error, handleLogin } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  })

  const onSubmit = async (data: LoginFormData) => {
    await handleLogin(data)
  }

  return (
    <div className="w-full max-w-md space-y-8 px-8">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-primary mb-2">BANCO ADEMI</div>
          <div className="text-sm text-gray-600">Backoffice</div>
        </div>
      </div>

      {/* Título y subtítulo */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          ¡Bienvenido de vuelta!
        </h1>
        <p className="text-gray-600 text-sm">
          Ingresa tus credenciales para iniciar sesión
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Error general */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Campo de email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="usuario@bancoademi.com"
              {...register("email")}
              className="pl-10"
              disabled={isLoading}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Campo de contraseña */}
        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="pl-10"
              disabled={isLoading}
            />
          </div>
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Botón de inicio de sesión */}
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>
      </form>
    </div>
  )
}
