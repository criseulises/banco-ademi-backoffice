# 🚀 Guía de Inicio Rápido - Banco ADEMI Backoffice

Esta guía te ayudará a configurar y ejecutar el proyecto del Backoffice de Banco ADEMI en tu entorno local.

## ✅ Pre-requisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** 20.x o superior
- **npm** o **yarn** o **pnpm**
- **Git**
- Editor de código (recomendado: VS Code)

## 📥 Instalación

### 1. Clonar el repositorio (si aplica)

```bash
git clone [url-del-repositorio]
cd banco-ademy-backoffice
```

### 2. Instalar dependencias

```bash
npm install
# o
yarn install
# o
pnpm install
```

### 3. Configurar variables de entorno

```bash
# Copiar el archivo de ejemplo
cp .env.example .env.local

# Editar .env.local con tus valores
# nano .env.local  # o usa tu editor preferido
```

Variables esenciales para desarrollo local:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-secret-key-aqui
```

### 4. Ejecutar en modo desarrollo

```bash
npm run dev
```

El backoffice estará disponible en: [http://localhost:3000](http://localhost:3000)

## 🎨 Agregar Componentes de UI (shadcn/ui)

Este proyecto usa shadcn/ui para componentes. Para agregar nuevos componentes:

```bash
# Agregar un componente específico
npm run ui:add button
npm run ui:add card
npm run ui:add table
npm run ui:add dialog

# O usando npx directamente
npx shadcn@latest add [nombre-componente]
```

Componentes recomendados para instalar desde el inicio:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add form
npx shadcn@latest add table
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add select
npx shadcn@latest add badge
npx shadcn@latest add tabs
npx shadcn@latest add separator
npx shadcn@latest add avatar
npx shadcn@latest add checkbox
npx shadcn@latest add switch
npx shadcn@latest add textarea
npx shadcn@latest add popover
npx shadcn@latest add calendar
npx shadcn@latest add alert
npx shadcn@latest add toast
```

## 📂 Estructura del Proyecto

```
banco-ademy-backoffice/
├── app/                    # Next.js App Router
│   ├── (guest)/           # Rutas públicas
│   └── (authenticated)/   # Rutas protegidas
├── components/            # Componentes React
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layouts
│   └── shared/           # Componentes compartidos
├── features/              # Módulos por funcionalidad
│   ├── usuarios/
│   ├── productos/
│   ├── transacciones/
│   └── ...
├── lib/                   # Utilidades
├── hooks/                 # Custom hooks
├── types/                 # TypeScript types
└── config/                # Configuración
```

Ver [STRUCTURE.md](./STRUCTURE.md) para documentación completa.

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Ejecutar en modo desarrollo

# Build
npm run build            # Compilar para producción
npm run start            # Ejecutar build de producción

# Linting y Formateo
npm run lint             # Ejecutar ESLint
npm run lint:fix         # Ejecutar ESLint y corregir automáticamente
npm run type-check       # Verificar tipos TypeScript
npm run format           # Formatear código con Prettier
npm run format:check     # Verificar formato sin modificar

# Limpieza
npm run clean            # Limpiar build (.next)

# UI Components
npm run ui:add [nombre]  # Agregar componente de shadcn/ui
```

## 🎯 Desarrollo de Funcionalidades

### Crear un nuevo módulo

1. Crear carpeta en `features/`:

```bash
mkdir -p features/nuevo-modulo/{components,hooks,services,schemas,types,constants}
```

2. Crear ruta en `app/(authenticated)/`:

```bash
mkdir -p app/(authenticated)/nuevo-modulo
```

3. Agregar navegación en `config/site.ts`

### Crear un nuevo componente

```bash
# Componente compartido
touch components/shared/mi-componente.tsx

# Componente de módulo
touch features/usuarios/components/mi-componente.tsx
```

### Crear un servicio API

```typescript
// features/usuarios/services/user-service.ts
import { apiClient } from "@/lib/api-client"

export const userService = {
  async getUsers() {
    const { data } = await apiClient.get("/users")
    return data
  },
}
```

### Crear un hook personalizado

```typescript
// features/usuarios/hooks/use-users.ts
import { useState, useEffect } from "react"
import { userService } from "../services/user-service"

export function useUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    userService.getUsers().then(setUsers).finally(() => setLoading(false))
  }, [])
  
  return { users, loading }
}
```

## 🎨 Estilado con Tailwind

El proyecto usa Tailwind CSS 4. Ejemplos:

```tsx
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  <h1 className="text-2xl font-bold">Título</h1>
  <Button variant="default" size="lg">Acción</Button>
</div>
```

Función `cn()` para clases condicionales:

```tsx
import { cn } from "@/lib/utils"

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  isDisabled && "disabled-classes"
)}>
```

## 🔐 Autenticación (Próximamente)

El sistema de autenticación se implementará con:

- NextAuth.js para autenticación
- JWT tokens en cookies httpOnly
- Roles y permisos granulares
- Middleware para protección de rutas

```typescript
// Uso (una vez implementado)
import { useAuth } from "@/hooks/use-auth"

function Component() {
  const { user, isAuthenticated, logout } = useAuth()
  
  if (!isAuthenticated) return <Login />
  
  return <div>Bienvenido, {user.name}</div>
}
```

## 📊 Validación de Formularios

Usando React Hook Form + Zod:

```typescript
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(1, "Nombre requerido"),
  email: z.string().email("Email inválido"),
})

type FormData = z.infer<typeof schema>

function MyForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  
  const onSubmit = (data: FormData) => {
    console.log(data)
  }
  
  return <form onSubmit={form.handleSubmit(onSubmit)}>...</form>
}
```

## 🐛 Debugging

### Habilitar logs detallados

```env
LOG_LEVEL=debug
```

### Ver errores de build

```bash
npm run build --verbose
```

### Type checking

```bash
npm run type-check
```

## 📚 Recursos Útiles

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com)
- [Zod Documentation](https://zod.dev)
- [TanStack Table](https://tanstack.com/table)
- [Recharts](https://recharts.org)

## ❓ Troubleshooting

### Problema: Los componentes de shadcn no se muestran correctamente

**Solución**: Asegúrate de que `components.json` está configurado correctamente y que has ejecutado `npx shadcn@latest add [componente]`.

### Problema: Error de tipos TypeScript

**Solución**: Ejecuta `npm run type-check` para ver errores detallados.

### Problema: Estilos de Tailwind no funcionan

**Solución**: 
1. Verifica que `tailwind.config.ts` incluye las rutas correctas
2. Reinicia el servidor de desarrollo
3. Limpia la caché: `npm run clean && npm run dev`

### Problema: Variables de entorno no se cargan

**Solución**: 
1. Asegúrate de que el archivo se llama `.env.local` (no `.env`)
2. Las variables públicas deben empezar con `NEXT_PUBLIC_`
3. Reinicia el servidor después de cambiar variables

## 🤝 Contribuir

1. Crear rama para nueva funcionalidad: `git checkout -b feature/nueva-funcionalidad`
2. Hacer commits con mensajes descriptivos
3. Seguir convenciones de código del proyecto
4. Crear Pull Request para revisión

## 📞 Soporte

Para preguntas o problemas:
- Revisar documentación en `/docs`
- Consultar [STRUCTURE.md](./STRUCTURE.md)
- Contactar al equipo de desarrollo

---

**¡Listo para comenzar a desarrollar el Backoffice de Banco ADEMI! 🚀**
