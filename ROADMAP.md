# 🗺️ Roadmap - Banco ADEMI Backoffice

Documento de planificación por fases para el desarrollo del sistema de administración (backoffice) de Banco ADEMI.

---

## 📊 Estado General del Proyecto

| Fase | Estado | Progreso |
|------|--------|----------|
| Fase 0: Configuración Inicial | ✅ Completada | 100% |
| Fase 1: Layout y Navegación | ✅ Completada | 100% |
| Fase 2: Dashboard Principal | ✅ Completada | 100% |
| Fase 3: Gestión de Usuarios | ⏳ Pendiente | 0% |
| Fase 4: Gestión de Transacciones | ⏳ Pendiente | 0% |
| Fase 5: Alertas y Cumplimiento | ⏳ Pendiente | 0% |
| Fase 6: Reportes y Analytics | ⏳ Pendiente | 0% |
| Fase 7: Configuración del Sistema | ⏳ Pendiente | 0% |

---

## ✅ FASE 0: CONFIGURACIÓN INICIAL

### Objetivo
Configurar el proyecto base con todas las dependencias y estructura inicial.

### Componentes Completados
- ✅ Proyecto Next.js 16 con App Router
- ✅ TypeScript 5 configurado
- ✅ Tailwind CSS 4
- ✅ shadcn/ui components instalados
- ✅ Dependencias principales:
  - React Hook Form + Zod (validación)
  - TanStack Table (tablas)
  - Recharts (gráficos)
  - Zustand (estado global)
  - Axios (HTTP client)
  - Lucide React (iconos)

### Archivos Creados
```
banco-ademy-backoffice/
├── app/
├── components/
├── lib/
├── hooks/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

---

## ✅ FASE 1: LAYOUT Y NAVEGACIÓN

### Objetivo
Crear la estructura base del backoffice con sidebar, header y sistema de autenticación.

### Componentes Completados

#### 1. Sistema de Autenticación (Mock)
- ✅ `lib/mock-users.ts` - Usuarios mock para login
- ✅ `hooks/use-auth.tsx` - Context de autenticación
- ✅ `features/auth/components/login-form.tsx` - Formulario de login
- ✅ `features/auth/container/login-container.tsx` - Layout de login
- ✅ `components/auth/protected-route.tsx` - Protección de rutas

#### 2. Layout Principal
- ✅ `components/layout/sidebar.tsx` - Sidebar de navegación (280px)
- ✅ `components/layout/header.tsx` - Header con usuario y acciones
- ✅ `app/(authenticated)/layout.tsx` - Layout autenticado

#### 3. Configuración de Colores
- ✅ `lib/colors.ts` - Paleta oficial de ADEMI
  - Primary: `#0095A9` (Turquesa ADEMI)
  - Secondary: `#FA6C26` (Naranja ADEMI)

### Funcionalidades
- Login con 4 usuarios mock (admin, compliance, operations, support)
- Navegación con 10 módulos principales
- Sidebar expandible con submenús
- Header con notificaciones y logout
- Rutas protegidas

---

## ✅ FASE 2: DASHBOARD PRINCIPAL

### Objetivo
Crear un dashboard interactivo con métricas, gráficos y widgets de actividad.

### Componentes Completados

#### 1. Datos Mock
- ✅ `lib/mock-data/dashboard-data.ts`
  - Estadísticas generales
  - Transacciones recientes
  - Alertas del sistema
  - Estado de cumplimiento
  - Datos para gráficos

#### 2. Componentes de Métricas
- ✅ `components/dashboard/stats-card.tsx` - Tarjeta de estadísticas reutilizable

#### 3. Gráficos (Recharts)
- ✅ `components/dashboard/transaction-chart.tsx` - Tendencia de transacciones (7 días)
- ✅ `components/dashboard/distribution-chart.tsx` - Distribución por tipo (pie chart)

#### 4. Widgets de Actividad
- ✅ `components/dashboard/recent-transactions.tsx` - Últimas 5 transacciones
- ✅ `components/dashboard/alerts-widget.tsx` - Alertas urgentes sin leer
- ✅ `components/dashboard/compliance-widget.tsx` - Estado de cumplimiento

#### 5. Página Principal
- ✅ `app/(authenticated)/dashboard/page.tsx` - Dashboard completo

### Métricas Mostradas
- Usuarios Activos: 8,932 (↑12.5%)
- Transacciones Hoy: 3,421 (↑8.3%)
- Alertas Pendientes: 12
- Tickets Abiertos: 28

---

## ⏳ FASE 3: GESTIÓN DE USUARIOS

### Objetivo
Sistema completo de administración de usuarios con CRUD, filtros y permisos.

### Componentes por Crear

#### 1. Datos Mock
- [ ] `lib/mock-data/users-data.ts`
  - Lista de usuarios (50-100 registros mock)
  - Roles y permisos
  - Estados (activo, inactivo, suspendido, bloqueado)
  - Departamentos

#### 2. Tipos y Esquemas
- [ ] `lib/types/user.types.ts` - Tipos de usuario
- [ ] `lib/schemas/user.schema.ts` - Validación con Zod

#### 3. Componentes de Tabla
- [ ] `components/users/users-table.tsx` - Tabla principal con TanStack Table
- [ ] `components/users/users-filters.tsx` - Filtros avanzados
- [ ] `components/users/table-columns.tsx` - Definición de columnas

#### 4. Formularios
- [ ] `components/users/user-form.tsx` - Crear/editar usuario
- [ ] `components/users/user-form-dialog.tsx` - Modal para formulario

#### 5. Detalles y Acciones
- [ ] `components/users/user-details.tsx` - Vista detallada de usuario
- [ ] `components/users/user-actions.tsx` - Acciones (editar, desactivar, etc.)
- [ ] `components/users/user-history.tsx` - Historial de acciones

#### 6. Gestión de Roles
- [ ] `components/users/role-selector.tsx` - Selector de roles
- [ ] `components/users/permissions-matrix.tsx` - Matriz de permisos

#### 7. Páginas
- [ ] `app/(authenticated)/usuarios/page.tsx` - Lista de usuarios
- [ ] `app/(authenticated)/usuarios/[id]/page.tsx` - Detalles de usuario

### Funcionalidades
- [x] Tabla con paginación, ordenamiento y búsqueda
- [x] Filtros por rol, estado, departamento, fecha de registro
- [x] Crear nuevo usuario
- [x] Editar usuario existente
- [x] Cambiar estado (activar/desactivar/suspender/bloquear)
- [x] Asignar/modificar roles
- [x] Ver historial de actividad del usuario
- [x] Exportar lista a Excel/CSV
- [x] Búsqueda en tiempo real
- [x] Acciones en lote (activar/desactivar múltiples)

### Roles del Sistema
1. **Admin** - Acceso total
2. **Compliance Officer** - Cumplimiento y auditoría
3. **Operations Manager** - Operaciones y transacciones
4. **Support Agent** - Soporte al usuario
5. **Product Manager** - Gestión de productos
6. **Risk Analyst** - Análisis de riesgos
7. **Auditor** - Solo lectura y reportes

---

## ⏳ FASE 4: GESTIÓN DE TRANSACCIONES

### Objetivo
Sistema de monitoreo y administración de transacciones con filtros avanzados.

### Componentes por Crear

#### 1. Datos Mock
- [ ] `lib/mock-data/transactions-data.ts`
  - Transacciones (200-300 registros)
  - Tipos (transferencias, pagos, recargas, servicios)
  - Estados (completada, pendiente, fallida, cancelada, en revisión)
  - Métodos de pago

#### 2. Tipos y Esquemas
- [ ] `lib/types/transaction.types.ts`
- [ ] `lib/schemas/transaction.schema.ts`

#### 3. Componentes de Tabla
- [ ] `components/transactions/transactions-table.tsx`
- [ ] `components/transactions/transactions-filters.tsx`
- [ ] `components/transactions/table-columns.tsx`

#### 4. Detalles y Timeline
- [ ] `components/transactions/transaction-details.tsx`
- [ ] `components/transactions/transaction-timeline.tsx` - Historial de estados
- [ ] `components/transactions/transaction-metadata.tsx` - Info técnica

#### 5. Acciones
- [ ] `components/transactions/transaction-actions.tsx`
- [ ] `components/transactions/approve-dialog.tsx` - Aprobar/rechazar
- [ ] `components/transactions/cancel-dialog.tsx` - Cancelar transacción

#### 6. Páginas
- [ ] `app/(authenticated)/transacciones/page.tsx`
- [ ] `app/(authenticated)/transacciones/[id]/page.tsx`

### Funcionalidades
- [x] Tabla con filtros avanzados
- [x] Búsqueda por ID, usuario, monto, fecha
- [x] Filtros por tipo, estado, método de pago, rango de monto
- [x] Ver detalles completos de transacción
- [x] Timeline de estados
- [x] Aprobar/rechazar transacciones pendientes
- [x] Cancelar transacciones
- [x] Marcar como sospechosa
- [x] Exportar a Excel/PDF
- [x] Estadísticas por periodo
- [x] Gráficos de tendencias

### Tipos de Transacciones
1. **Transferencias Propias** - Entre cuentas del mismo usuario
2. **Transferencias a Terceros** - A otros usuarios
3. **Pagos de Tarjetas** - Pago de tarjetas de crédito
4. **Pagos de Préstamos** - Cuotas de préstamos
5. **Pagos de Servicios** - Luz, agua, teléfono, etc.
6. **Recargas Móviles** - Recargas de celular
7. **Pagos de Impuestos** - Pagos gubernamentales

---

## ⏳ FASE 5: ALERTAS Y CUMPLIMIENTO

### Objetivo
Sistema de gestión de alertas, cumplimiento KYC/AML y auditoría.

### Componentes por Crear

#### 1. Datos Mock
- [ ] `lib/mock-data/alerts-data.ts` - Alertas expandidas
- [ ] `lib/mock-data/compliance-data.ts` - KYC/AML
- [ ] `lib/mock-data/audit-logs.ts` - Logs de auditoría

#### 2. Tipos y Esquemas
- [ ] `lib/types/alert.types.ts`
- [ ] `lib/types/compliance.types.ts`
- [ ] `lib/types/audit.types.ts`

#### 3. Gestión de Alertas
- [ ] `components/alerts/alerts-table.tsx`
- [ ] `components/alerts/alert-details.tsx`
- [ ] `components/alerts/alert-actions.tsx`
- [ ] `components/alerts/assign-dialog.tsx` - Asignar alerta

#### 4. KYC/AML
- [ ] `components/compliance/kyc-verification.tsx`
- [ ] `components/compliance/document-viewer.tsx`
- [ ] `components/compliance/aml-checks.tsx`
- [ ] `components/compliance/risk-assessment.tsx`

#### 5. Auditoría
- [ ] `components/audit/audit-logs-table.tsx`
- [ ] `components/audit/audit-filters.tsx`
- [ ] `components/audit/activity-timeline.tsx`

#### 6. Páginas
- [ ] `app/(authenticated)/alertas/page.tsx`
- [ ] `app/(authenticated)/alertas/[id]/page.tsx`
- [ ] `app/(authenticated)/cumplimiento/page.tsx`
- [ ] `app/(authenticated)/cumplimiento/kyc/page.tsx`
- [ ] `app/(authenticated)/auditoria/page.tsx`

### Funcionalidades - Alertas
- [x] Lista de alertas con filtros por tipo y severidad
- [x] Marcar como leída/sin leer
- [x] Asignar a usuario/equipo
- [x] Resolver/cerrar alerta
- [x] Agregar notas y comentarios
- [x] Escalamiento automático
- [x] Notificaciones en tiempo real

### Funcionalidades - KYC/AML
- [x] Verificación de identidad
- [x] Validación de documentos
- [x] Verificación facial
- [x] Listas negras (PEP, sanciones)
- [x] Score de riesgo
- [x] Aprobación/rechazo de KYC
- [x] Historial de verificaciones

### Funcionalidades - Auditoría
- [x] Logs de todas las acciones del sistema
- [x] Filtros por usuario, acción, módulo, fecha
- [x] Exportar logs
- [x] Trazabilidad completa
- [x] Reportes de auditoría

---

## ⏳ FASE 6: REPORTES Y ANALYTICS

### Objetivo
Sistema de generación de reportes y análisis avanzado de datos.

### Componentes por Crear

#### 1. Generador de Reportes
- [ ] `components/reports/report-builder.tsx` - Constructor visual
- [ ] `components/reports/report-filters.tsx` - Filtros para reportes
- [ ] `components/reports/report-preview.tsx` - Vista previa
- [ ] `components/reports/report-export.tsx` - Exportar (PDF, Excel, CSV)

#### 2. Reportes Predefinidos
- [ ] `components/reports/templates/users-report.tsx`
- [ ] `components/reports/templates/transactions-report.tsx`
- [ ] `components/reports/templates/compliance-report.tsx`
- [ ] `components/reports/templates/financial-report.tsx`

#### 3. Analytics
- [ ] `components/analytics/analytics-dashboard.tsx`
- [ ] `components/analytics/user-analytics.tsx`
- [ ] `components/analytics/transaction-analytics.tsx`
- [ ] `components/analytics/performance-metrics.tsx`

#### 4. Gráficos Avanzados
- [ ] `components/analytics/charts/heat-map.tsx`
- [ ] `components/analytics/charts/funnel-chart.tsx`
- [ ] `components/analytics/charts/area-chart.tsx`
- [ ] `components/analytics/charts/bar-chart.tsx`

#### 5. Programación de Reportes
- [ ] `components/reports/schedule-report.tsx`
- [ ] `components/reports/scheduled-list.tsx`

#### 6. Páginas
- [ ] `app/(authenticated)/reportes/page.tsx`
- [ ] `app/(authenticated)/reportes/crear/page.tsx`
- [ ] `app/(authenticated)/reportes/programados/page.tsx`
- [ ] `app/(authenticated)/analytics/page.tsx`

### Funcionalidades - Reportes
- [x] Generador de reportes personalizado
- [x] Reportes predefinidos (10+ templates)
- [x] Filtros avanzados (fecha, usuario, tipo, etc.)
- [x] Exportar a PDF, Excel, CSV
- [x] Programar reportes automáticos (diario, semanal, mensual)
- [x] Enviar por email
- [x] Guardar configuraciones de reporte
- [x] Historial de reportes generados

### Funcionalidades - Analytics
- [x] Dashboard de analytics avanzado
- [x] KPIs principales con tendencias
- [x] Análisis de usuarios (crecimiento, actividad, retención)
- [x] Análisis de transacciones (volumen, tipos, éxito)
- [x] Segmentación de usuarios
- [x] Análisis de conversión
- [x] Métricas de performance
- [x] Comparativas periodo anterior

### Tipos de Reportes
1. **Reporte de Usuarios** - Registros, actividad, segmentación
2. **Reporte de Transacciones** - Volumen, montos, tipos
3. **Reporte de Cumplimiento** - KYC, AML, estado
4. **Reporte Financiero** - Balance, ingresos, comisiones
5. **Reporte de Alertas** - Alertas por tipo y severidad
6. **Reporte de Auditoría** - Logs y trazabilidad
7. **Reporte Ejecutivo** - Resumen general para C-level

---

## ⏳ FASE 7: CONFIGURACIÓN DEL SISTEMA

### Objetivo
Panel de configuración y administración del sistema.

### Componentes por Crear

#### 1. Configuración General
- [ ] `components/settings/general-settings.tsx`
- [ ] `components/settings/company-info.tsx`
- [ ] `components/settings/branding.tsx`

#### 2. Configuración de Seguridad
- [ ] `components/settings/security-settings.tsx`
- [ ] `components/settings/password-policy.tsx`
- [ ] `components/settings/two-factor-auth.tsx`
- [ ] `components/settings/session-management.tsx`

#### 3. Configuración de Notificaciones
- [ ] `components/settings/notification-settings.tsx`
- [ ] `components/settings/email-templates.tsx`
- [ ] `components/settings/sms-templates.tsx`

#### 4. Configuración de Límites
- [ ] `components/settings/transaction-limits.tsx`
- [ ] `components/settings/rate-limits.tsx`

#### 5. Configuración de Roles
- [ ] `components/settings/roles-management.tsx`
- [ ] `components/settings/permissions-management.tsx`

#### 6. Logs del Sistema
- [ ] `components/settings/system-logs.tsx`
- [ ] `components/settings/error-logs.tsx`
- [ ] `components/settings/api-logs.tsx`

#### 7. Páginas
- [ ] `app/(authenticated)/configuracion/page.tsx`
- [ ] `app/(authenticated)/configuracion/general/page.tsx`
- [ ] `app/(authenticated)/configuracion/seguridad/page.tsx`
- [ ] `app/(authenticated)/configuracion/notificaciones/page.tsx`
- [ ] `app/(authenticated)/configuracion/limites/page.tsx`
- [ ] `app/(authenticated)/configuracion/roles/page.tsx`

### Funcionalidades
- [x] Información de la empresa
- [x] Configuración de marca (logo, colores)
- [x] Políticas de contraseña
- [x] Autenticación de dos factores (2FA)
- [x] Gestión de sesiones
- [x] Configuración de notificaciones (email, SMS, push)
- [x] Templates de emails
- [x] Límites de transacciones
- [x] Rate limiting
- [x] Gestión de roles y permisos
- [x] Variables de entorno
- [x] Logs del sistema
- [x] Respaldos y restauración

---

## 📦 Módulos Adicionales (Opcionales)

### A. Gestión de Productos Financieros
- Cuentas de ahorro
- Préstamos
- Tarjetas de crédito
- Inversiones
- Configuración de productos

### B. Gestión de Tickets/Soporte
- Sistema de tickets
- Chat en vivo
- Base de conocimiento
- FAQ

### C. Notificaciones y Comunicación
- Centro de notificaciones
- Envío masivo de emails
- SMS masivos
- Notificaciones push

### D. Integraciones
- APIs externas
- Webhooks
- Logs de API
- Documentación de API

---

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript 5
- **Estilos**: Tailwind CSS 4
- **Componentes**: shadcn/ui
- **Iconos**: Lucide React
- **Formularios**: React Hook Form + Zod
- **Tablas**: TanStack Table
- **Gráficos**: Recharts
- **Estado**: Zustand
- **HTTP**: Axios
- **Fechas**: date-fns

### Diseño
- **Colores**: Paleta oficial Banco ADEMI
  - Primary: `#0095A9` (Turquesa)
  - Secondary: `#FA6C26` (Naranja)
- **Tipografía**: Inter (sans-serif)
- **Espaciado**: Sistema de 8px

### Backend (Futuro - No incluido en este roadmap)
- **API**: Node.js + Express / NestJS
- **Base de datos**: PostgreSQL
- **ORM**: Prisma / TypeORM
- **Autenticación**: JWT + OAuth2
- **Cache**: Redis
- **File Storage**: AWS S3 / MinIO

---

## 📈 Priorización de Fases

### Alta Prioridad (Core)
1. ✅ Fase 0: Configuración Inicial
2. ✅ Fase 1: Layout y Navegación
3. ✅ Fase 2: Dashboard Principal
4. **→ Fase 3: Gestión de Usuarios** *(SIGUIENTE)*
5. Fase 4: Gestión de Transacciones

### Media Prioridad
6. Fase 5: Alertas y Cumplimiento
7. Fase 6: Reportes y Analytics

### Baja Prioridad
8. Fase 7: Configuración del Sistema
9. Módulos Adicionales (Opcionales)

---

## 🎯 Métricas de Éxito

### Por Fase
- [ ] Todos los componentes creados y funcionales
- [ ] Datos mock realistas
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Colores oficiales de ADEMI aplicados
- [ ] Formularios con validación completa
- [ ] Estados de carga y error manejados
- [ ] Accesibilidad (a11y) básica

### Global
- [ ] Sistema funcional end-to-end
- [ ] Demo lista para presentación
- [ ] Código limpio y documentado
- [ ] Performance óptimo (Lighthouse 90+)
- [ ] Sin errores en consola
- [ ] TypeScript strict mode sin errores

---

## 📝 Notas de Desarrollo

### Convenciones de Código
- Componentes en PascalCase
- Archivos en kebab-case
- Hooks comienzan con `use`
- Tipos terminan con `.types.ts`
- Schemas terminan con `.schema.ts`
- Mock data en `lib/mock-data/`

### Estructura de Carpetas
```
app/
  (authenticated)/
    [modulo]/
      page.tsx
      [id]/
        page.tsx

components/
  [modulo]/
    [componente].tsx

lib/
  colors.ts
  utils.ts
  mock-data/
    [modulo]-data.ts
  types/
    [modulo].types.ts
  schemas/
    [modulo].schema.ts

hooks/
  use-[nombre].tsx
```

### Commits
- Formato: `feat(modulo): descripción corta`
- Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Ejemplo: `feat(users): add users table with filters`

---

## 🚀 Siguiente Paso

**FASE 3: GESTIÓN DE USUARIOS** está lista para iniciar.

¿Empezamos con la implementación de la tabla de usuarios?
