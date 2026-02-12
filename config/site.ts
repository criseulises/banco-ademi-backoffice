export const siteConfig = {
  name: "Banco ADEMI Backoffice",
  description: "Sistema de Administración y Gestión de Banca Digital",
  url: "https://backoffice.bancoademi.com",
  version: "1.0.0",
}

export const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "LayoutDashboard",
  },
  {
    title: "Usuarios",
    href: "/usuarios",
    icon: "Users",
    children: [
      { title: "Clientes Digitales", href: "/usuarios/clientes" },
      { title: "Onboarding", href: "/usuarios/onboarding" },
      { title: "Personal Interno", href: "/usuarios/personal" },
      { title: "Roles y Permisos", href: "/usuarios/roles" },
      { title: "Dispositivos", href: "/usuarios/dispositivos" },
    ],
  },
  {
    title: "Productos",
    href: "/productos",
    icon: "Package",
    children: [
      { title: "Cuentas", href: "/productos/cuentas" },
      { title: "Tarjetas", href: "/productos/tarjetas" },
      { title: "Préstamos", href: "/productos/prestamos" },
      { title: "Inversiones", href: "/productos/inversiones" },
    ],
  },
  {
    title: "Transacciones",
    href: "/transacciones",
    icon: "ArrowLeftRight",
    children: [
      { title: "Monitoreo en Tiempo Real", href: "/transacciones/monitoreo" },
      { title: "Transacciones Pendientes", href: "/transacciones/pendientes" },
      { title: "Límites", href: "/transacciones/limites" },
      { title: "Historial", href: "/transacciones/historial" },
    ],
  },
  {
    title: "Pagos y Servicios",
    href: "/pagos",
    icon: "CreditCard",
    children: [
      { title: "Proveedores", href: "/pagos/proveedores" },
      { title: "Monitoreo de Pagos", href: "/pagos/monitoreo" },
      { title: "Conciliación", href: "/pagos/conciliacion" },
      { title: "Impuestos (DGII)", href: "/pagos/impuestos" },
    ],
  },
  {
    title: "Cumplimiento",
    href: "/cumplimiento",
    icon: "Shield",
    children: [
      { title: "Monitoreo AML", href: "/cumplimiento/aml" },
      { title: "Gestión KYC", href: "/cumplimiento/kyc" },
      { title: "Prevención de Fraude", href: "/cumplimiento/fraude" },
      { title: "Listas OFAC/PEP", href: "/cumplimiento/listas" },
      { title: "ROS", href: "/cumplimiento/ros" },
    ],
  },
  {
    title: "Configuración",
    href: "/configuracion",
    icon: "Settings",
    children: [
      { title: "Parámetros Generales", href: "/configuracion/general" },
      { title: "Integraciones", href: "/configuracion/integraciones" },
      { title: "Versiones de Apps", href: "/configuracion/versiones" },
      { title: "Feature Flags", href: "/configuracion/features" },
      { title: "Notificaciones", href: "/configuracion/notificaciones" },
    ],
  },
  {
    title: "Reportes",
    href: "/reportes",
    icon: "FileBarChart",
    children: [
      { title: "Dashboards Ejecutivos", href: "/reportes/dashboards" },
      { title: "Reportes Transaccionales", href: "/reportes/transacciones" },
      { title: "Reportes Regulatorios", href: "/reportes/regulatorios" },
      { title: "Reportes Operativos", href: "/reportes/operativos" },
    ],
  },
  {
    title: "Soporte",
    href: "/soporte",
    icon: "Headphones",
    children: [
      { title: "Tickets", href: "/soporte/tickets" },
      { title: "Base de Conocimiento", href: "/soporte/base-conocimiento" },
      { title: "Comunicaciones", href: "/soporte/comunicaciones" },
    ],
  },
  {
    title: "Auditoría",
    href: "/auditoria",
    icon: "FileSearch",
    children: [
      { title: "Logs de Auditoría", href: "/auditoria/logs" },
      { title: "Aprobaciones", href: "/auditoria/aprobaciones" },
      { title: "Trazabilidad", href: "/auditoria/trazabilidad" },
    ],
  },
]

export const permissions = {
  usuarios: {
    view: "usuarios.view",
    create: "usuarios.create",
    edit: "usuarios.edit",
    delete: "usuarios.delete",
    approve: "usuarios.approve",
    export: "usuarios.export",
  },
  productos: {
    view: "productos.view",
    create: "productos.create",
    edit: "productos.edit",
    delete: "productos.delete",
    approve: "productos.approve",
    export: "productos.export",
  },
  transacciones: {
    view: "transacciones.view",
    reverse: "transacciones.reverse",
    approve: "transacciones.approve",
    export: "transacciones.export",
  },
  pagos: {
    view: "pagos.view",
    create: "pagos.create",
    edit: "pagos.edit",
    export: "pagos.export",
  },
  cumplimiento: {
    view: "cumplimiento.view",
    investigate: "cumplimiento.investigate",
    resolve: "cumplimiento.resolve",
    export: "cumplimiento.export",
  },
  configuracion: {
    view: "configuracion.view",
    edit: "configuracion.edit",
    approve: "configuracion.approve",
  },
  reportes: {
    view: "reportes.view",
    export: "reportes.export",
    regulatorio: "reportes.regulatorio",
  },
  soporte: {
    view: "soporte.view",
    create: "soporte.create",
    assign: "soporte.assign",
    resolve: "soporte.resolve",
  },
  auditoria: {
    view: "auditoria.view",
    export: "auditoria.export",
  },
}

export const rolePermissions: Record<string, string[]> = {
  admin: Object.values(permissions).flatMap(p => Object.values(p)),
  compliance_officer: [
    ...Object.values(permissions.cumplimiento),
    ...Object.values(permissions.usuarios).filter(p => p.includes("view")),
    ...Object.values(permissions.transacciones).filter(p => p.includes("view")),
    ...Object.values(permissions.auditoria),
    permissions.reportes.view,
    permissions.reportes.export,
    permissions.reportes.regulatorio,
  ],
  operations_manager: [
    ...Object.values(permissions.usuarios),
    ...Object.values(permissions.productos),
    ...Object.values(permissions.transacciones),
    ...Object.values(permissions.pagos),
    permissions.reportes.view,
    permissions.reportes.export,
    permissions.auditoria.view,
  ],
  support_agent: [
    permissions.usuarios.view,
    permissions.usuarios.edit,
    ...Object.values(permissions.soporte),
    permissions.transacciones.view,
    permissions.productos.view,
  ],
  product_manager: [
    ...Object.values(permissions.productos),
    permissions.configuracion.view,
    permissions.configuracion.edit,
    permissions.reportes.view,
    permissions.reportes.export,
  ],
  risk_analyst: [
    ...Object.values(permissions.cumplimiento),
    permissions.transacciones.view,
    permissions.usuarios.view,
    permissions.reportes.view,
    permissions.reportes.export,
  ],
  auditor: [
    ...Object.values(permissions.auditoria),
    permissions.usuarios.view,
    permissions.transacciones.view,
    permissions.productos.view,
    permissions.cumplimiento.view,
    permissions.reportes.view,
    permissions.reportes.export,
  ],
}
