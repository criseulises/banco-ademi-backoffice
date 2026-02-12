"use client"

import { useState } from "react"
import { Shield, DollarSign, CreditCard, Users, TrendingUp, AlertCircle, Save, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

export default function ConfigurarLimitesPage() {
  const [limits, setLimits] = useState({
    // Transaction type limits
    transferDailyLimit: 500000,
    transferSingleLimit: 100000,
    paymentDailyLimit: 300000,
    paymentSingleLimit: 50000,
    withdrawalDailyLimit: 50000,
    withdrawalSingleLimit: 20000,

    // User tier limits
    standardDailyLimit: 100000,
    goldDailyLimit: 500000,
    platinumDailyLimit: 1000000,
    vipDailyLimit: 5000000,

    // General settings
    requireApprovalAbove: 100000,
    maxTransactionsPerDay: 50,

    // Flags
    enableDailyLimits: true,
    enableSingleLimits: true,
    requireApprovalHighValue: true,
    blockSuspiciousActivity: true,
  })

  const handleSave = () => {
    toast.success("Límites de transacciones actualizados exitosamente")
  }

  const handleReset = () => {
    toast.info("Límites restablecidos a valores por defecto")
  }

  const updateLimit = (key: string, value: string | boolean) => {
    setLimits((prev) => ({
      ...prev,
      [key]: typeof value === "string" ? parseFloat(value) || 0 : value,
    }))
  }

  const transactionTypeLimits = [
    {
      type: "Transferencias",
      icon: TrendingUp,
      color: "bg-blue-100 text-blue-800",
      dailyKey: "transferDailyLimit",
      singleKey: "transferSingleLimit",
    },
    {
      type: "Pagos",
      icon: CreditCard,
      color: "bg-green-100 text-green-800",
      dailyKey: "paymentDailyLimit",
      singleKey: "paymentSingleLimit",
    },
    {
      type: "Retiros",
      icon: DollarSign,
      color: "bg-red-100 text-red-800",
      dailyKey: "withdrawalDailyLimit",
      singleKey: "withdrawalSingleLimit",
    },
  ]

  const userTierLimits = [
    { tier: "Estándar", key: "standardDailyLimit", color: "bg-gray-100 text-gray-800" },
    { tier: "Gold", key: "goldDailyLimit", color: "bg-yellow-100 text-yellow-800" },
    { tier: "Platinum", key: "platinumDailyLimit", color: "bg-purple-100 text-purple-800" },
    { tier: "VIP", key: "vipDailyLimit", color: "bg-red-100 text-red-800" },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-8 w-8" style={{ color: "#0095A9" }} />
          <h1 className="text-3xl font-bold text-gray-900">
            Configurar Límites
          </h1>
        </div>
        <p className="text-gray-600">
          Gestiona los límites de transacciones para seguridad y control
        </p>
      </div>

      {/* Alert Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900">
              Configuración de Límites de Seguridad
            </h4>
            <p className="text-sm text-blue-700 mt-1">
              Los límites ayudan a prevenir fraudes y proteger las cuentas de los usuarios.
              Las transacciones que excedan estos límites requerirán aprobación manual.
            </p>
          </div>
        </div>
      </div>

      {/* Transaction Type Limits */}
      <Card>
        <CardHeader>
          <CardTitle>Límites por Tipo de Transacción</CardTitle>
          <CardDescription>
            Configura límites diarios y por transacción individual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {transactionTypeLimits.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 ${item.color} rounded-lg`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{item.type}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={item.dailyKey} className="text-sm">
                        Límite Diario
                      </Label>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-600">RD$</span>
                        <Input
                          id={item.dailyKey}
                          type="number"
                          value={limits[item.dailyKey as keyof typeof limits]}
                          onChange={(e) => updateLimit(item.dailyKey, e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor={item.singleKey} className="text-sm">
                        Límite por Transacción
                      </Label>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-600">RD$</span>
                        <Input
                          id={item.singleKey}
                          type="number"
                          value={limits[item.singleKey as keyof typeof limits]}
                          onChange={(e) => updateLimit(item.singleKey, e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* User Tier Limits */}
      <Card>
        <CardHeader>
          <CardTitle>Límites por Nivel de Usuario</CardTitle>
          <CardDescription>
            Límites diarios basados en el nivel del cliente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userTierLimits.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">{item.tier}</h3>
                  </div>
                  <Badge className={`${item.color} border-0`}>{item.tier}</Badge>
                </div>
                <div>
                  <Label htmlFor={item.key} className="text-sm">
                    Límite Diario
                  </Label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-600">RD$</span>
                    <Input
                      id={item.key}
                      type="number"
                      value={limits[item.key as keyof typeof limits]}
                      onChange={(e) => updateLimit(item.key, e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Configuración de Seguridad</CardTitle>
          <CardDescription>
            Opciones adicionales para control de transacciones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <Label htmlFor="enableDailyLimits" className="font-medium">
                  Habilitar Límites Diarios
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Aplicar límites diarios a todas las transacciones
                </p>
              </div>
              <Switch
                id="enableDailyLimits"
                checked={limits.enableDailyLimits}
                onCheckedChange={(checked) => updateLimit("enableDailyLimits", checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <Label htmlFor="enableSingleLimits" className="font-medium">
                  Habilitar Límites por Transacción
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Aplicar límites individuales a cada transacción
                </p>
              </div>
              <Switch
                id="enableSingleLimits"
                checked={limits.enableSingleLimits}
                onCheckedChange={(checked) => updateLimit("enableSingleLimits", checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <Label htmlFor="requireApprovalHighValue" className="font-medium">
                  Aprobar Transacciones de Alto Valor
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Requiere aprobación manual para transacciones grandes
                </p>
              </div>
              <Switch
                id="requireApprovalHighValue"
                checked={limits.requireApprovalHighValue}
                onCheckedChange={(checked) => updateLimit("requireApprovalHighValue", checked)}
              />
            </div>

            <div className="p-4 border rounded-lg">
              <Label htmlFor="requireApprovalAbove" className="font-medium">
                Monto Mínimo para Aprobación Manual
              </Label>
              <p className="text-sm text-gray-600 mt-1 mb-3">
                Transacciones superiores a este monto requerirán aprobación
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">RD$</span>
                <Input
                  id="requireApprovalAbove"
                  type="number"
                  value={limits.requireApprovalAbove}
                  onChange={(e) => updateLimit("requireApprovalAbove", e.target.value)}
                  className="max-w-xs"
                />
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <Label htmlFor="maxTransactionsPerDay" className="font-medium">
                Máximo de Transacciones por Día
              </Label>
              <p className="text-sm text-gray-600 mt-1 mb-3">
                Límite de transacciones permitidas por usuario por día
              </p>
              <Input
                id="maxTransactionsPerDay"
                type="number"
                value={limits.maxTransactionsPerDay}
                onChange={(e) => updateLimit("maxTransactionsPerDay", e.target.value)}
                className="max-w-xs"
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <Label htmlFor="blockSuspiciousActivity" className="font-medium">
                  Bloquear Actividad Sospechosa
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Bloquea automáticamente transacciones identificadas como sospechosas
                </p>
              </div>
              <Switch
                id="blockSuspiciousActivity"
                checked={limits.blockSuspiciousActivity}
                onCheckedChange={(checked) => updateLimit("blockSuspiciousActivity", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleReset}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Restablecer Valores por Defecto
            </Button>
            <div className="flex gap-3">
              <Button variant="outline">
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                style={{ backgroundColor: "#0095A9" }}
              >
                <Save className="h-4 w-4 mr-2" />
                Guardar Cambios
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Status Summary */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Límites Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold text-green-600">
                {Object.values(limits).filter((v) => typeof v === "boolean" && v).length}
              </h3>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Configuraciones de seguridad habilitadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Monto Máximo Permitido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">
                RD$ {(limits.vipDailyLimit / 1000000).toFixed(1)}M
              </h3>
              <DollarSign className="h-8 w-8 text-gray-600" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Límite diario más alto (VIP)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Aprobación Manual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-orange-600">
                &gt; RD$ {(limits.requireApprovalAbove / 1000).toFixed(0)}K
              </h3>
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Requiere aprobación por encima de este monto
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
