"use client"

import { useState } from "react"
import { Settings, Building2, Mail, Phone, MapPin, Globe, Save, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

export default function ConfiguracionGeneralPage() {
  const [config, setConfig] = useState({
    // Company Information
    companyName: "Banco ADEMI",
    businessName: "ADEMI Financial Services SA",
    rnc: "101-12345-6",
    email: "admin@bancoademi.com.do",
    phone: "809-555-0100",
    address: "Av. Winston Churchill, Santo Domingo",
    city: "Santo Domingo",
    country: "República Dominicana",
    postalCode: "10101",
    website: "https://www.bancoademi.com.do",

    // System Settings
    timezone: "America/Santo_Domingo",
    currency: "DOP",
    language: "es",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24h",

    // Business Hours
    businessHoursStart: "08:00",
    businessHoursEnd: "18:00",
    workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],

    // Notifications
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,

    // Security
    sessionTimeout: 30,
    passwordExpiry: 90,
    maxLoginAttempts: 5,
    require2FA: true,
  })

  const handleSave = () => {
    toast.success("Configuración guardada exitosamente")
  }

  const handleReset = () => {
    toast.info("Configuración restablecida a valores por defecto")
  }

  const updateConfig = (key: string, value: string | boolean | string[]) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const workingDays = [
    { value: "monday", label: "Lunes" },
    { value: "tuesday", label: "Martes" },
    { value: "wednesday", label: "Miércoles" },
    { value: "thursday", label: "Jueves" },
    { value: "friday", label: "Viernes" },
    { value: "saturday", label: "Sábado" },
    { value: "sunday", label: "Domingo" },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Settings className="h-8 w-8" style={{ color: "#0095A9" }} />
          <h1 className="text-3xl font-bold text-gray-900">
            Configuración General
          </h1>
        </div>
        <p className="text-gray-600">
          Configuración general del sistema y de la empresa
        </p>
      </div>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5" style={{ color: "#0095A9" }} />
            <CardTitle>Información de la Empresa</CardTitle>
          </div>
          <CardDescription>
            Datos corporativos y de contacto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">Nombre Comercial</Label>
              <Input
                id="companyName"
                value={config.companyName}
                onChange={(e) => updateConfig("companyName", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="businessName">Razón Social</Label>
              <Input
                id="businessName"
                value={config.businessName}
                onChange={(e) => updateConfig("businessName", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="rnc">RNC</Label>
              <Input
                id="rnc"
                value={config.rnc}
                onChange={(e) => updateConfig("rnc", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="website">Sitio Web</Label>
              <div className="flex items-center gap-2 mt-1">
                <Globe className="h-4 w-4 text-gray-400" />
                <Input
                  id="website"
                  type="url"
                  value={config.website}
                  onChange={(e) => updateConfig("website", e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email Corporativo</Label>
              <div className="flex items-center gap-2 mt-1">
                <Mail className="h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={config.email}
                  onChange={(e) => updateConfig("email", e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Teléfono Principal</Label>
              <div className="flex items-center gap-2 mt-1">
                <Phone className="h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  value={config.phone}
                  onChange={(e) => updateConfig("phone", e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address">Dirección</Label>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="h-4 w-4 text-gray-400" />
                <Input
                  id="address"
                  value={config.address}
                  onChange={(e) => updateConfig("address", e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="city">Ciudad</Label>
              <Input
                id="city"
                value={config.city}
                onChange={(e) => updateConfig("city", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="postalCode">Código Postal</Label>
              <Input
                id="postalCode"
                value={config.postalCode}
                onChange={(e) => updateConfig("postalCode", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regional Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Configuración Regional</CardTitle>
          <CardDescription>
            Formato de fecha, hora, moneda e idioma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="timezone">Zona Horaria</Label>
              <Select value={config.timezone} onValueChange={(value) => updateConfig("timezone", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Santo_Domingo">Santo Domingo (GMT-4)</SelectItem>
                  <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                  <SelectItem value="America/Los_Angeles">Los Angeles (GMT-8)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="currency">Moneda</Label>
              <Select value={config.currency} onValueChange={(value) => updateConfig("currency", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DOP">Peso Dominicano (RD$)</SelectItem>
                  <SelectItem value="USD">Dólar Americano ($)</SelectItem>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="language">Idioma</Label>
              <Select value={config.language} onValueChange={(value) => updateConfig("language", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dateFormat">Formato de Fecha</Label>
              <Select value={config.dateFormat} onValueChange={(value) => updateConfig("dateFormat", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card>
        <CardHeader>
          <CardTitle>Horario de Atención</CardTitle>
          <CardDescription>
            Configura el horario de operación del banco
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessHoursStart">Hora de Inicio</Label>
                <Input
                  id="businessHoursStart"
                  type="time"
                  value={config.businessHoursStart}
                  onChange={(e) => updateConfig("businessHoursStart", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="businessHoursEnd">Hora de Cierre</Label>
                <Input
                  id="businessHoursEnd"
                  type="time"
                  value={config.businessHoursEnd}
                  onChange={(e) => updateConfig("businessHoursEnd", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label className="mb-2 block">Días Laborables</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {workingDays.map((day) => (
                  <div key={day.value} className="flex items-center space-x-2 p-2 border rounded">
                    <input
                      type="checkbox"
                      id={day.value}
                      checked={config.workingDays.includes(day.value)}
                      onChange={(e) => {
                        const newDays = e.target.checked
                          ? [...config.workingDays, day.value]
                          : config.workingDays.filter((d) => d !== day.value)
                        updateConfig("workingDays", newDays)
                      }}
                      className="rounded"
                    />
                    <label htmlFor={day.value} className="text-sm cursor-pointer">
                      {day.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notificaciones</CardTitle>
          <CardDescription>
            Configura los canales de notificación del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label htmlFor="emailNotifications" className="font-medium">
                  Notificaciones por Email
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Enviar notificaciones importantes por correo electrónico
                </p>
              </div>
              <Switch
                id="emailNotifications"
                checked={config.emailNotifications}
                onCheckedChange={(checked) => updateConfig("emailNotifications", checked)}
              />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label htmlFor="smsNotifications" className="font-medium">
                  Notificaciones por SMS
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Enviar alertas críticas por mensaje de texto
                </p>
              </div>
              <Switch
                id="smsNotifications"
                checked={config.smsNotifications}
                onCheckedChange={(checked) => updateConfig("smsNotifications", checked)}
              />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label htmlFor="pushNotifications" className="font-medium">
                  Notificaciones Push
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Notificaciones en tiempo real en el navegador
                </p>
              </div>
              <Switch
                id="pushNotifications"
                checked={config.pushNotifications}
                onCheckedChange={(checked) => updateConfig("pushNotifications", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle>Configuración de Seguridad</CardTitle>
          <CardDescription>
            Políticas de seguridad y acceso
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sessionTimeout">Tiempo de Sesión (minutos)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={config.sessionTimeout}
                  onChange={(e) => updateConfig("sessionTimeout", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="passwordExpiry">Expiración de Contraseña (días)</Label>
                <Input
                  id="passwordExpiry"
                  type="number"
                  value={config.passwordExpiry}
                  onChange={(e) => updateConfig("passwordExpiry", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="maxLoginAttempts">Máximo de Intentos de Login</Label>
                <Input
                  id="maxLoginAttempts"
                  type="number"
                  value={config.maxLoginAttempts}
                  onChange={(e) => updateConfig("maxLoginAttempts", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label htmlFor="require2FA" className="font-medium">
                  Requerir Autenticación de Dos Factores
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Obligatorio para todos los usuarios del backoffice
                </p>
              </div>
              <Switch
                id="require2FA"
                checked={config.require2FA}
                onCheckedChange={(checked) => updateConfig("require2FA", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={handleReset}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Restablecer
            </Button>
            <div className="flex gap-3">
              <Button variant="outline">
                Cancelar
              </Button>
              <Button onClick={handleSave} style={{ backgroundColor: "#0095A9" }}>
                <Save className="h-4 w-4 mr-2" />
                Guardar Cambios
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
