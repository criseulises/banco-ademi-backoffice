import { LoginForm } from "../components/login-form"
import { Shield, Users, BarChart3, Lock } from "lucide-react"

export default function LoginContainer() {
  return (
    <div className="min-h-screen flex">
      {/* Columna izquierda - Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <LoginForm />
      </div>

      {/* Columna derecha - Info del Backoffice */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary p-12 flex-col justify-center">
        <div className="max-w-lg mx-auto text-white space-y-8">
          {/* Título */}
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Sistema Administrativo</h2>
            <p className="text-lg text-white/90">
              Gestiona y administra todos los aspectos de la banca digital
            </p>
          </div>

          {/* Características */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-lg">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Gestión de Usuarios</h3>
                <p className="text-sm text-white/90">
                  Administra clientes, onboarding, KYC y permisos
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-lg">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Cumplimiento y Seguridad</h3>
                <p className="text-sm text-white/90">
                  Monitoreo AML, prevención de fraude y compliance
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-lg">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Reportes y Analítica</h3>
                <p className="text-sm text-white/90">
                  Dashboards ejecutivos y reportes regulatorios
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-lg">
                <Lock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Acceso Seguro</h3>
                <p className="text-sm text-white/90">
                  Sistema de autenticación basado en roles y permisos
                </p>
              </div>
            </div>
          </div>

          {/* Usuarios de prueba */}
          <div className="bg-white/10 p-4 rounded-lg space-y-2">
            <p className="text-sm font-semibold">📝 Usuarios de Prueba (DEMO)</p>
            <div className="text-xs space-y-1">
              <p>👑 Admin: admin@bancoademi.com / admin123</p>
              <p>🛡️ Compliance: compliance@bancoademi.com / demo123</p>
              <p>⚙️ Ops: ops@bancoademi.com / demo123</p>
              <p>💬 Soporte: soporte@bancoademi.com / demo123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
