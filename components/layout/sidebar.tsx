"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { colors } from "@/lib/colors"
import {
  LayoutDashboard,
  Users,
  Package,
  ArrowLeftRight,
  CreditCard,
  Shield,
  Settings,
  FileBarChart,
  Headphones,
  FileSearch,
  ChevronRight,
} from "lucide-react"

interface SubMenuItem {
  label: string
  href: string
}

interface MenuItem {
  icon: React.ReactNode
  label: string
  href?: string
  subItems?: SubMenuItem[]
}

export function Sidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const menuItems: MenuItem[] = [
    {
      icon: <LayoutDashboard size={24} />,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <Users size={24} />,
      label: "Usuarios",
      subItems: [
        { label: "Personal Backoffice", href: "/usuarios" },
        { label: "Clientes", href: "/usuarios/clientes" },
        { label: "Onboarding", href: "/usuarios/onboarding" },
        { label: "Roles y Permisos", href: "/usuarios/roles" },
      ],
    },
    {
      icon: <Package size={24} />,
      label: "Productos",
      subItems: [
        { label: "Cuentas", href: "/productos/cuentas" },
        { label: "Tarjetas", href: "/productos/tarjetas" },
        { label: "Préstamos", href: "/productos/prestamos" },
        { label: "Inversiones", href: "/productos/inversiones" },
      ],
    },
    {
      icon: <ArrowLeftRight size={24} />,
      label: "Transacciones",
      subItems: [
        { label: "Todas las Transacciones", href: "/transacciones" },
        { label: "Pendientes de Aprobación", href: "/transacciones/pendientes" },
        { label: "Fallidas y Canceladas", href: "/transacciones/fallidas" },
        { label: "Configurar Límites", href: "/transacciones/limites" },
      ],
    },
    {
      icon: <CreditCard size={24} />,
      label: "Pagos",
      subItems: [
        { label: "Proveedores", href: "/pagos/proveedores" },
        { label: "Monitoreo", href: "/pagos/monitoreo" },
        { label: "Conciliación", href: "/pagos/conciliacion" },
      ],
    },
    {
      icon: <Shield size={24} />,
      label: "Cumplimiento",
      subItems: [
        { label: "Verificaciones KYC/AML", href: "/cumplimiento" },
        { label: "Centro de Alertas", href: "/alertas" },
        { label: "Prevención de Fraude", href: "/cumplimiento/fraude" },
      ],
    },
    {
      icon: <Settings size={24} />,
      label: "Configuración",
      subItems: [
        { label: "General", href: "/configuracion/general" },
        { label: "Integraciones", href: "/configuracion/integraciones" },
        { label: "Features", href: "/configuracion/features" },
      ],
    },
    {
      icon: <FileBarChart size={24} />,
      label: "Reportes",
      href: "/reportes",
    },
    {
      icon: <Headphones size={24} />,
      label: "Soporte",
      href: "/soporte",
    },
    {
      icon: <FileSearch size={24} />,
      label: "Auditoría",
      href: "/auditoria",
    },
  ]

  const toggleItem = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    )
  }

  const isActive = (href?: string) => {
    if (!href) return false
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <aside className="w-[280px] h-screen bg-white overflow-y-auto border-r border-gray-200">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-200">
        <div className="text-center">
          <div
            className="text-2xl font-bold mb-1"
            style={{ color: colors.primary }}
          >
            BANCO ADEMI
          </div>
          <div className="text-xs text-gray-500">Backoffice</div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="py-3">
        {menuItems.map((item, index) => {
          const itemIsActive = isActive(item.href)
          const hasActiveChild = item.subItems?.some((sub) =>
            isActive(sub.href)
          )

          return (
            <div key={index}>
              {/* Main Item */}
              {item.subItems ? (
                <button
                  onClick={() => toggleItem(item.label)}
                  className="w-full flex items-center gap-3 px-6 py-3 transition-all duration-200"
                >
                  <div
                    className="w-6 h-6 flex items-center justify-center flex-shrink-0"
                    style={{
                      color:
                        itemIsActive || hasActiveChild
                          ? colors.primary
                          : colors.grey700,
                    }}
                  >
                    {item.icon}
                  </div>
                  <span
                    className="text-[15px] flex-1 text-left transition-colors duration-200"
                    style={{
                      color:
                        itemIsActive || hasActiveChild
                          ? colors.primary
                          : colors.grey700,
                      fontWeight: 700,
                    }}
                  >
                    {item.label}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-300 ${
                      expandedItems.includes(item.label) ? "rotate-90" : ""
                    }`}
                    style={{ color: colors.textSecondary }}
                  />
                </button>
              ) : (
                <Link
                  href={item.href || "#"}
                  className="w-full flex items-center gap-3 px-6 py-3 transition-all duration-200"
                >
                  <div
                    className="w-6 h-6 flex items-center justify-center flex-shrink-0"
                    style={{
                      color: itemIsActive ? colors.primary : colors.grey700,
                    }}
                  >
                    {item.icon}
                  </div>
                  <span
                    className="text-[15px] flex-1 text-left transition-colors duration-200"
                    style={{
                      color: itemIsActive ? colors.primary : colors.grey700,
                      fontWeight: 700,
                    }}
                  >
                    {item.label}
                  </span>
                </Link>
              )}

              {/* Sub Items */}
              {item.subItems && expandedItems.includes(item.label) && (
                <div className="overflow-hidden transition-all duration-300 animate-slide-down">
                  {item.subItems.map((subItem, subIndex) => {
                    const subIsActive = isActive(subItem.href)
                    const isLast = subIndex === item.subItems!.length - 1

                    return (
                      <div key={subIndex} className="relative">
                        {/* Vertical Line */}
                        <div
                          className="absolute left-[38px] w-[2px]"
                          style={{
                            backgroundColor: colors.grey700,
                            top: 0,
                            height: isLast ? "calc(50% - 8px)" : "100%",
                          }}
                        />

                        {/* Curved Connector */}
                        <div
                          className="absolute"
                          style={{
                            left: "38px",
                            top: "50%",
                            width: "16px",
                            height: "16px",
                            transform: "translateY(-100%)",
                            borderLeft: `2px solid ${colors.grey700}`,
                            borderBottom: `2px solid ${colors.grey700}`,
                            borderBottomLeftRadius: "8px",
                          }}
                        />

                        <Link
                          href={subItem.href}
                          className="flex items-center pl-[68px] pr-6 py-2 transition-all duration-150"
                        >
                          <span
                            className="text-[15px] transition-colors duration-200"
                            style={{
                              color: subIsActive
                                ? colors.primary
                                : colors.grey700,
                              fontWeight: 700,
                            }}
                          >
                            {subItem.label}
                          </span>
                        </Link>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
