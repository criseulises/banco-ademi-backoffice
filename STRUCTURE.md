# 📁 Estructura del Proyecto - Banco ADEMI Backoffice

Este documento explica la organización del código y las convenciones del proyecto.

## 🗂️ Estructura de Carpetas

```
banco-ademy-backoffice/
│
├── app/                          # Next.js App Router
│   ├── (guest)/                 # Rutas públicas (sin autenticación)
│   │   └── login/               # Página de login
│   │
│   ├── (authenticated)/         # Rutas protegidas (requieren autenticación)
│   │   ├── dashboard/           # Dashboard principal
│   │   ├── usuarios/            # Gestión de usuarios
│   │   ├── productos/           # Gestión de productos
│   │   ├── transacciones/       # Gestión de transacciones
│   │   ├── pagos/               # Pagos y servicios
│   │   ├── cumplimiento/        # Compliance (AML, KYC, Fraude)
│   │   ├── configuracion/       # Configuración del sistema
│   │   ├── reportes/            # Reportes y analítica
│   │   ├── soporte/             # Soporte al cliente
│   │   └── auditoria/           # Auditoría y logs
│   │
│   ├── api/                     # API Routes
│   │   └── auth/                # Endpoints de autenticación
│   │
│   ├── layout.tsx               # Layout raíz
│   ├── page.tsx                 # Página de inicio (redirige según auth)
│   └── globals.css              # Estilos globales
│
├── components/                   # Componentes React reutilizables
│   ├── ui/                      # Componentes de shadcn/ui
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── table.tsx
│   │   └── ...
│   │
│   ├── layout/                  # Componentes de layout
│   │   ├── sidebar.tsx          # Sidebar de navegación
│   │   ├── header.tsx           # Header con perfil de usuario
│   │   ├── breadcrumb.tsx       # Breadcrumbs de navegación
│   │   └── page-header.tsx      # Header de página con título y acciones
│   │
│   ├── shared/                  # Componentes compartidos
│   │   ├── data-table.tsx       # Tabla de datos genérica
│   │   ├── filters.tsx          # Filtros reutilizables
│   │   ├── pagination.tsx       # Paginación
│   │   ├── search-input.tsx     # Input de búsqueda
│   │   ├── status-badge.tsx     # Badge de estado
│   │   ├── currency-display.tsx # Mostrar moneda formateada
│   │   └── export-button.tsx    # Botón de exportación
│   │
│   ├── dashboard/               # Componentes específicos del dashboard
│   │   ├── stats-card.tsx       # Tarjeta de estadística
│   │   ├── chart-wrapper.tsx    # Wrapper para gráficos
│   │   ├── recent-activity.tsx  # Actividad reciente
│   │   └── alerts-panel.tsx     # Panel de alertas
│   │
│   └── auth/                    # Componentes de autenticación
│       ├── login-form.tsx       # Formulario de login
│       └── auth-provider.tsx    # Proveedor de autenticación
│
├── features/                     # Módulos por funcionalidad (domain-driven)
│   │
│   ├── usuarios/                # Módulo de usuarios
│   │   ├── components/          # Componentes específicos de usuarios
│   │   ├── hooks/               # Hooks personalizados
│   │   ├── services/            # Servicios API
│   │   ├── schemas/             # Esquemas de validación Zod
│   │   ├── types/               # Tipos TypeScript
│   │   └── constants/           # Constantes del módulo
│   │
│   ├── productos/               # Módulo de productos
│   ├── transacciones/           # Módulo de transacciones
│   ├── pagos/                   # Módulo de pagos
│   ├── cumplimiento/            # Módulo de compliance
│   ├── configuracion/           # Módulo de configuración
│   ├── reportes/                # Módulo de reportes
│   ├── soporte/                 # Módulo de soporte
│   └── auditoria/               # Módulo de auditoría
│
├── lib/                          # Utilidades y helpers
│   ├── utils.ts                 # Funciones utilitarias generales
│   ├── api-client.ts            # Cliente HTTP (axios configurado)
│   ├── auth.ts                  # Funciones de autenticación
│   ├── permissions.ts           # Verificación de permisos
│   └── validators.ts            # Validadores personalizados
│
├── hooks/                        # Custom React Hooks globales
│   ├── use-auth.ts              # Hook de autenticación
│   ├── use-permissions.ts       # Hook de permisos
│   ├── use-debounce.ts          # Hook de debounce
│   ├── use-pagination.ts        # Hook de paginación
│   └── use-filters.ts           # Hook de filtros
│
├── types/                        # TypeScript types globales
│   └── index.ts                 # Tipos principales del sistema
│
├── config/                       # Configuración
│   ├── site.ts                  # Configuración del sitio (nav, permisos)
│   └── constants.ts             # Constantes globales
│
├── public/                       # Archivos estáticos
│   ├── images/                  # Imágenes
│   ├── icons/                   # Íconos
│   └── logos/                   # Logos del banco
│
├── .env.example                  # Ejemplo de variables de entorno
├── components.json               # Configuración de shadcn/ui
├── tailwind.config.ts            # Configuración de Tailwind
├── tsconfig.json                 # Configuración de TypeScript
├── next.config.ts                # Configuración de Next.js
├── package.json                  # Dependencias y scripts
└── README.md                     # Documentación principal

```

## 🎯 Convenciones y Patrones

### 1. Nomenclatura de Archivos

- **Componentes**: `kebab-case.tsx` (ej: `data-table.tsx`)
- **Páginas**: `page.tsx` (convención de Next.js App Router)
- **Layouts**: `layout.tsx` (convención de Next.js App Router)
- **Tipos**: `kebab-case.ts` (ej: `user-types.ts`)
- **Hooks**: `use-nombre.ts` (ej: `use-auth.ts`)
- **Servicios**: `kebab-case.ts` (ej: `user-service.ts`)

### 2. Estructura de Componentes

```typescript
// Imports
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Types
interface ComponentProps {
  title: string
  onAction?: () => void
}

// Component
export function Component({ title, onAction }: ComponentProps) {
  const [state, setState] = useState()
  
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

### 3. Estructura de Features (Módulos)

Cada feature sigue esta estructura modular:

```
features/usuarios/
├── components/       # Componentes UI del módulo
│   ├── client-list.tsx
│   ├── client-form.tsx
│   └── client-details.tsx
├── hooks/           # Hooks del módulo
│   ├── use-clients.ts
│   └── use-client-filters.ts
├── services/        # Llamadas API
│   └── client-service.ts
├── schemas/         # Validación Zod
│   └── client-schema.ts
├── types/           # Tipos TypeScript
│   └── client.types.ts
└── constants/       # Constantes del módulo
    └── client-status.ts
```

### 4. Rutas (App Router)

- **Rutas públicas**: `app/(guest)/[ruta]/page.tsx`
- **Rutas protegidas**: `app/(authenticated)/[ruta]/page.tsx`
- **API Routes**: `app/api/[ruta]/route.ts`

### 5. Componentes Reutilizables

- **UI básicos**: En `components/ui/` (shadcn)
- **Compartidos**: En `components/shared/` (usados en múltiples módulos)
- **Específicos**: En `features/[modulo]/components/` (solo para ese módulo)

### 6. Manejo de Estado

- **Estado local**: `useState`, `useReducer`
- **Estado global**: Zustand stores en `lib/stores/`
- **Server state**: React Query (si se implementa)

### 7. Estilos

- **Tailwind CSS**: Para todos los estilos
- **cn()**: Función para combinar clases condicionales
- **CSS Modules**: Evitar (preferir Tailwind)

### 8. Validación

- **Formularios**: React Hook Form + Zod
- **Schemas**: En `features/[modulo]/schemas/`
- **Tipos**: Inferidos de schemas Zod cuando sea posible

### 9. Servicios API

```typescript
// features/usuarios/services/client-service.ts
import { apiClient } from "@/lib/api-client"
import type { Client, PaginatedResponse } from "@/types"

export const clientService = {
  getClients: async (params: FilterParams): Promise<PaginatedResponse<Client>> => {
    const { data } = await apiClient.get("/clients", { params })
    return data
  },
  
  getClient: async (id: string): Promise<Client> => {
    const { data } = await apiClient.get(`/clients/${id}`)
    return data
  },
  
  // ... más métodos
}
```

### 10. Permisos

```typescript
import { usePermissions } from "@/hooks/use-permissions"

function Component() {
  const { can } = usePermissions()
  
  if (!can("usuarios.edit")) {
    return <AccessDenied />
  }
  
  return <EditForm />
}
```

## 🔒 Autenticación y Autorización

1. Login → Obtiene token JWT
2. Token almacenado en cookie httpOnly
3. Middleware verifica token en cada request
4. Usuario y permisos disponibles via `useAuth()`

## 📊 Manejo de Datos

1. **Fetch**: Services en `features/[modulo]/services/`
2. **Tipos**: Definidos en `types/` y `features/[modulo]/types/`
3. **Validación**: Schemas Zod en `features/[modulo]/schemas/`
4. **Estado**: Hooks personalizados en `features/[modulo]/hooks/`

## 🎨 Theming

- Colores definidos en `app/globals.css` usando CSS variables
- Modo oscuro: Soportado via `next-themes` (si se implementa)
- Componentes respetan tema automáticamente (shadcn/ui)

## 🧪 Testing (Futuro)

```
features/usuarios/
├── __tests__/
│   ├── components/
│   │   └── client-list.test.tsx
│   ├── services/
│   │   └── client-service.test.ts
│   └── hooks/
│       └── use-clients.test.ts
```

## 📝 Documentación de Código

- **Componentes complejos**: JSDoc
- **Funciones utilitarias**: JSDoc
- **APIs**: Comentarios explicativos
- **Tipos**: TypeScript autodocumentado

## 🚀 Próximos Pasos

1. Implementar autenticación completa
2. Crear componentes base de UI (shadcn)
3. Implementar dashboard principal
4. Desarrollar módulos uno por uno según prioridad
5. Agregar tests unitarios y de integración
6. Configurar CI/CD
7. Documentar APIs

---

**Mantener esta estructura asegura consistencia y escalabilidad del proyecto.**
