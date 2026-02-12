# 🏦 Banco ADEMI - Backoffice Administrativo

> Sistema de Administración y Gestión de Banca Digital

Plataforma administrativa que permite al personal del Banco Ademi gestionar, configurar, monitorear y administrar todos los aspectos de los canales digitales (App Móvil Personal, App Móvil Empresarial y Web Banking).

## 🎯 Propósito

El backoffice de Banco Ademi es la herramienta central para:
- Gestión operativa: Administración día a día de usuarios y operaciones
- Configuración del sistema: Parámetros, límites, productos y reglas
- Monitoreo y control: Dashboards, reportes, auditoría y compliance

## 👥 Usuarios del Sistema

- **Administradores de Sistema**: Control total sobre configuraciones y usuarios
- **Oficiales de Cumplimiento**: Gestión AML/KYC y compliance
- **Gerentes de Operaciones**: Supervisión de transacciones y límites
- **Soporte al Cliente**: Atención de casos y gestión de incidencias
- **Gerentes de Producto**: Configuración de productos financieros
- **Analistas de Riesgo**: Monitoreo de fraude y patrones anómalos
- **Auditores**: Revisión de logs y trazabilidad

## 🏗️ Stack Tecnológico

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19 + TypeScript
- **Estilos**: Tailwind CSS 4
- **Componentes**: shadcn/ui + Radix UI
- **Formularios**: React Hook Form + Zod
- **Tablas**: TanStack Table
- **Gráficos**: Recharts
- **Estado**: Zustand
- **HTTP**: Axios

## 📦 Módulos Principales

### 1. Dashboard
- Vista general del sistema
- Métricas en tiempo real
- Alertas y notificaciones

### 2. Gestión de Usuarios
- Administración de clientes digitales
- Onboarding y aprobación KYC
- Gestión de roles y permisos (personal interno)
- Dispositivos y sesiones

### 3. Gestión de Productos
- Cuentas de ahorro y corriente
- Tarjetas de débito y crédito
- Préstamos
- Inversiones

### 4. Gestión de Transacciones
- Monitoreo en tiempo real
- Transacciones pendientes
- Límites transaccionales
- Reversiones

### 5. Pagos y Servicios
- Proveedores de servicios
- Conciliación
- Pagos de impuestos (DGII)

### 6. Cumplimiento y Seguridad
- Monitoreo AML
- Gestión KYC
- Prevención de fraude
- Listas OFAC/PEP

### 7. Configuración
- Parámetros del sistema
- Integraciones
- Versiones de apps
- Feature flags

### 8. Reportes y Analítica
- Dashboards ejecutivos
- Reportes transaccionales
- Reportes regulatorios
- Exportación de datos

### 9. Soporte al Cliente
- Sistema de tickets
- Base de conocimiento
- Comunicación con clientes

### 10. Auditoría
- Logs completos
- Trazabilidad de acciones
- Maker-Checker

## 🚀 Comenzar

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm start
```

## 📁 Estructura del Proyecto

```
banco-ademy-backoffice/
├── app/                      # App Router de Next.js
│   ├── (guest)/             # Rutas públicas (login)
│   ├── (authenticated)/     # Rutas protegidas
│   └── api/                 # API Routes
├── components/              # Componentes React
│   ├── ui/                  # Componentes shadcn/ui
│   ├── layout/              # Layouts y navegación
│   ├── shared/              # Componentes compartidos
│   └── dashboard/           # Componentes del dashboard
├── features/                # Módulos por funcionalidad
│   ├── usuarios/
│   ├── productos/
│   ├── transacciones/
│   ├── pagos/
│   ├── cumplimiento/
│   ├── configuracion/
│   ├── reportes/
│   ├── soporte/
│   └── auditoria/
├── lib/                     # Utilidades y helpers
├── hooks/                   # Custom React hooks
├── types/                   # TypeScript types
└── config/                  # Configuración
```

## 🔐 Seguridad

- Autenticación basada en roles
- Principio de Maker-Checker para acciones críticas
- Logs de auditoría completos
- Permisos granulares por módulo y acción
- Validación y sanitización de datos

## 📊 Características Principales

- ✅ Dashboard en tiempo real
- ✅ Gestión completa de usuarios digitales
- ✅ Monitoreo de transacciones
- ✅ Sistema AML/KYC integrado
- ✅ Prevención de fraude
- ✅ Reportes regulatorios automatizados
- ✅ Sistema de tickets de soporte
- ✅ Auditoría completa
- ✅ Gestión de límites dinámicos
- ✅ Configuración de servicios de pago

## 🤝 Integraciones

- Core Bancario (API REST)
- FacePhi (Validación Biométrica)
- Cámara de Compensación (ACH/LBTR)
- Listas OFAC/ONU/PEP
- Proveedores de pago de servicios
- DGII (Impuestos)
- SMS/Email (Notificaciones)

## 📝 Licencia

Proyecto propietario de Banco ADEMI - Todos los derechos reservados

---

**Desarrollado con ❤️ para Banco ADEMI**
