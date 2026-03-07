# 📝 SESIÓN 02 - CONFIGURACIÓN DE SUPABASE

**Fecha:** 2024  
**Estado:** ✅ COMPLETADA  
**Duración:** ~1 hora  
**Objetivo:** Configurar Supabase completamente (base de datos, storage, auth)

---

## 🎯 OBJETIVOS CUMPLIDOS

1. ✅ Instalar dependencias de Supabase
2. ✅ Crear clientes de Supabase (browser, server, admin)
3. ✅ Configurar middleware de autenticación
4. ✅ Crear hooks personalizados
5. ✅ Preparar script SQL para tablas
6. ✅ Configurar proyecto en Supabase.com
7. ✅ Crear tablas en la base de datos
8. ✅ Configurar Storage para imágenes
9. ✅ Crear usuario admin
10. ✅ Documentar todo el proceso

---

## 📦 DEPENDENCIAS INSTALADAS

```bash
npm install @supabase/supabase-js
npm install @supabase/ssr
```

**Paquetes:**
- `@supabase/supabase-js` - Cliente principal de Supabase
- `@supabase/ssr` - Helpers para Server-Side Rendering en Next.js

---

## 📁 ARCHIVOS CREADOS

### Clientes de Supabase (4)
```
lib/supabase/
├── client.ts          ✅ Cliente para navegador (componentes client-side)
├── server.ts          ✅ Cliente para servidor (Server Components, API Routes)
├── middleware.ts      ✅ Middleware de autenticación
└── (raíz)
    └── middleware.ts  ✅ Middleware de Next.js (protección de rutas)
```

### Hooks Personalizados (2)
```
hooks/
├── useProducts.ts     ✅ 5 hooks para productos
└── useAuth.ts         ✅ Hook de autenticación
```

### Configuración (2)
```
├── .env.local         ✅ Variables de entorno (completado)
└── supabase_setup.sql ✅ Script SQL completo
```

### Scripts de Ayuda (2)
```
├── crear_admin.sql    ✅ Script para crear usuario admin
└── test-supabase.ts   ✅ Script de prueba de conexión
```

### Documentación (1)
```
└── GUIA_SUPABASE.md   ✅ Guía completa paso a paso
```

**Total: 12 archivos nuevos**

---

## 🗄️ BASE DE DATOS CONFIGURADA

### Tablas Creadas (4)

#### 1. productos
```sql
- id (UUID, PK)
- nombre (TEXT)
- slug (TEXT, UNIQUE)
- descripcion (TEXT)
- descripcion_larga (TEXT, nullable)
- categoria (TEXT)
- subcategoria (TEXT, nullable)
- imagenes (TEXT[])
- destacado (BOOLEAN)
- orden (INTEGER)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

**Índices:**
- idx_productos_categoria
- idx_productos_slug
- idx_productos_destacado

**Triggers:**
- update_productos_updated_at (actualiza updated_at automáticamente)

#### 2. mensajes_contacto
```sql
- id (UUID, PK)
- nombre (TEXT)
- email (TEXT)
- celular (TEXT)
- ciudad (TEXT)
- mensaje (TEXT)
- estado (TEXT: 'nuevo', 'leido', 'respondido')
- created_at (TIMESTAMP)
- leido_at (TIMESTAMP, nullable)
```

**Índices:**
- idx_mensajes_estado
- idx_mensajes_created_at

#### 3. proyectos
```sql
- id (UUID, PK)
- nombre (TEXT)
- descripcion (TEXT)
- imagenes (TEXT[])
- productos_usados (UUID[])
- fecha_realizacion (DATE)
- destacado (BOOLEAN)
- created_at (TIMESTAMP)
```

**Índices:**
- idx_proyectos_destacado
- idx_proyectos_fecha

#### 4. usuarios_admin
```sql
- id (UUID, PK, FK → auth.users)
- nombre (TEXT)
- email (TEXT)
- rol (TEXT)
- activo (BOOLEAN)
- created_at (TIMESTAMP)
```

**Índices:**
- idx_usuarios_activo

---

## 🔐 SEGURIDAD (RLS)

### Row Level Security Configurado

**Productos:**
- ✅ Lectura: Pública (cualquiera puede ver)
- 🔒 Inserción: Solo admins
- 🔒 Actualización: Solo admins
- 🔒 Eliminación: Solo admins

**Mensajes de Contacto:**
- ✅ Inserción: Pública (formulario de contacto)
- 🔒 Lectura: Solo admins
- 🔒 Actualización: Solo admins

**Proyectos:**
- ✅ Lectura: Pública
- 🔒 Escritura: Solo admins

**Usuarios Admin:**
- 🔒 Todo: Solo admins

---

## 🛠️ FUNCIONES SQL CREADAS

### 1. buscar_productos(termino TEXT)
Busca productos por nombre, descripción o categoría.

```sql
SELECT * FROM buscar_productos('mesa');
```

### 2. productos_destacados(limite INTEGER)
Obtiene productos destacados ordenados.

```sql
SELECT * FROM productos_destacados(6);
```

### 3. productos_por_categoria(cat TEXT)
Obtiene productos de una categoría específica.

```sql
SELECT * FROM productos_por_categoria('mesas-piedra-sinterizada');
```

---

## 📦 STORAGE CONFIGURADO

### Bucket: productos-imagenes
- ✅ Creado
- ✅ Público (lectura pública)
- ✅ Listo para subir imágenes

**Uso:**
```typescript
// Subir imagen
const { data, error } = await supabase.storage
  .from('productos-imagenes')
  .upload('producto-1.jpg', file)

// URL pública
const { data } = supabase.storage
  .from('productos-imagenes')
  .getPublicUrl('producto-1.jpg')
```

---

## 🎣 HOOKS PERSONALIZADOS

### useProducts.ts (5 hooks)

#### 1. useProducts()
Obtiene todos los productos.

```typescript
const { products, loading, error } = useProducts()
```

#### 2. useProductsByCategory(categoria)
Productos filtrados por categoría.

```typescript
const { products, loading, error } = useProductsByCategory('mesas-piedra-sinterizada')
```

#### 3. useProductBySlug(slug)
Obtiene un producto específico.

```typescript
const { product, loading, error } = useProductBySlug('mesa-calacata-white')
```

#### 4. useFeaturedProducts(limit)
Productos destacados.

```typescript
const { products, loading, error } = useFeaturedProducts(6)
```

#### 5. useSearchProducts(searchTerm)
Búsqueda con debounce de 300ms.

```typescript
const { products, loading, error } = useSearchProducts('mesa')
```

### useAuth.ts (1 hook)

#### useAuth()
Maneja autenticación y estado de admin.

```typescript
const { user, loading, isAdmin, signIn, signOut } = useAuth()

// Login
await signIn('email@ejemplo.com', 'password')

// Logout
await signOut()
```

---

## 🔧 CLIENTES DE SUPABASE

### Cliente Browser (client.ts)
Para componentes client-side.

```typescript
"use client"
import { supabase } from '@/lib/supabase/client'

const { data } = await supabase.from('productos').select('*')
```

### Cliente Server (server.ts)
Para Server Components y API Routes.

```typescript
import { createClient } from '@/lib/supabase/server'

const supabase = await createClient()
const { data } = await supabase.from('productos').select('*')
```

### Cliente Admin (server.ts)
Para operaciones administrativas (⚠️ solo en servidor).

```typescript
import { createAdminClient } from '@/lib/supabase/server'

const supabase = createAdminClient()
// Tiene permisos de service_role
```

---

## 🛡️ MIDDLEWARE DE AUTENTICACIÓN

### Protección de Rutas

El middleware protege automáticamente:
- `/admin/*` - Solo usuarios autenticados y admin activos
- Redirige a `/admin/login` si no está autenticado
- Redirige a `/` si no es admin o está inactivo
- Redirige a `/admin` si ya está autenticado y va a login

---

## 📊 CONFIGURACIÓN EN SUPABASE.COM

### Proyecto Creado
- ✅ Nombre: dkore-web
- ✅ Región: South America (São Paulo)
- ✅ Plan: Free

### Credenciales Configuradas
- ✅ Project URL en `.env.local`
- ✅ Anon Key en `.env.local`
- ✅ Service Role Key en `.env.local`

### Usuario Admin Creado
- ✅ Usuario creado en Authentication
- ✅ Registrado en tabla usuarios_admin
- ✅ Estado: activo

---

## ✅ VERIFICACIONES REALIZADAS

1. ✅ Dependencias instaladas correctamente
2. ✅ Clientes de Supabase creados
3. ✅ Middleware configurado
4. ✅ Hooks funcionando
5. ✅ Proyecto de Supabase creado
6. ✅ Credenciales copiadas
7. ✅ SQL ejecutado (4 tablas)
8. ✅ Storage configurado
9. ✅ Usuario admin creado
10. ✅ RLS configurado

---

## 🎯 PRÓXIMOS PASOS (SESIÓN 03)

### 1. Migrar Datos de Productos
- [ ] Crear script de migración
- [ ] Migrar productos de `data/productos.ts` a Supabase
- [ ] Subir imágenes a Storage
- [ ] Actualizar URLs de imágenes

### 2. Actualizar Páginas para Usar Supabase
- [ ] Actualizar home page (productos destacados)
- [ ] Actualizar catálogo (categorías)
- [ ] Crear página de categoría (con datos de Supabase)
- [ ] Crear página de producto (con datos de Supabase)

### 3. Crear Página de Login
- [ ] Diseñar formulario de login
- [ ] Implementar autenticación
- [ ] Manejar errores
- [ ] Redireccionar a dashboard

### 4. Crear Dashboard Admin
- [ ] Layout de admin
- [ ] Estadísticas básicas
- [ ] Navegación
- [ ] Protección de rutas

---

## 📝 NOTAS IMPORTANTES

### Variables de Entorno
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **IMPORTANTE:**
- Las variables `NEXT_PUBLIC_*` son públicas
- `SUPABASE_SERVICE_ROLE_KEY` es privada (nunca exponerla al cliente)
- `.env.local` está en `.gitignore`

### Convenciones de Código
- Usar `supabase` (instancia) en client-side
- Usar `await createClient()` en server-side
- Usar `createAdminClient()` solo en API Routes
- Siempre manejar errores de Supabase

### Estructura de Respuestas
```typescript
const { data, error } = await supabase.from('productos').select('*')

if (error) {
  console.error(error)
  // Manejar error
}

// Usar data
```

---

## 🎉 LOGROS DE LA SESIÓN

1. ✅ Supabase completamente configurado
2. ✅ 12 archivos nuevos creados
3. ✅ 4 tablas con RLS
4. ✅ 3 funciones SQL útiles
5. ✅ Storage configurado
6. ✅ 6 hooks personalizados
7. ✅ Middleware de autenticación
8. ✅ Usuario admin funcional
9. ✅ Documentación completa
10. ✅ Base sólida para desarrollo

---

**Preparado para:** Sesión 03 - Migración de Datos y Páginas  
**Documento actualizado:** PROYECTO_DKORE_ESPECIFICACIONES.md  
**Referencia adicional:** GUIA_SUPABASE.md
