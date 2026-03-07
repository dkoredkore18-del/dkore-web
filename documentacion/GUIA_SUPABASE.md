# 🗄️ GUÍA DE CONFIGURACIÓN DE SUPABASE

## ✅ PASOS COMPLETADOS

1. ✅ Archivo `.env.local` creado
2. ✅ Script SQL `supabase_setup.sql` creado
3. ✅ Dependencias instaladas (`@supabase/supabase-js`, `@supabase/ssr`)
4. ✅ Clientes de Supabase creados:
   - `lib/supabase/client.ts` (navegador)
   - `lib/supabase/server.ts` (servidor)
   - `lib/supabase/middleware.ts` (autenticación)
5. ✅ Middleware de Next.js creado (`middleware.ts`)
6. ✅ Hooks personalizados creados:
   - `hooks/useProducts.ts`
   - `hooks/useAuth.ts`

---

## 📋 PASOS QUE DEBES COMPLETAR

### PASO 1: Crear Proyecto en Supabase ⏳

1. Ve a [supabase.com](https://supabase.com)
2. Inicia sesión o crea una cuenta
3. Clic en "New Project"
4. Completa:
   - **Name:** `dkore-web`
   - **Database Password:** (guárdala en un lugar seguro)
   - **Region:** South America (São Paulo)
   - **Pricing Plan:** Free
5. Clic en "Create new project"
6. Espera 2-3 minutos

### PASO 2: Obtener Credenciales ⏳

1. En tu proyecto de Supabase, ve a **Settings** ⚙️
2. Clic en **API**
3. Copia estos 3 valores:
   - **Project URL** (ejemplo: `https://xxxxx.supabase.co`)
   - **anon public** key (empieza con `eyJ...`)
   - **service_role** key (también empieza con `eyJ...`)

### PASO 3: Configurar Variables de Entorno ⏳

1. Abre el archivo `.env.local` en tu proyecto
2. Reemplaza los valores:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
3. Guarda el archivo

### PASO 4: Crear Tablas en Supabase ⏳

1. En Supabase, ve a **SQL Editor** (icono de base de datos)
2. Clic en **New query**
3. Abre el archivo `supabase_setup.sql` de tu proyecto
4. Copia TODO el contenido
5. Pégalo en el editor SQL de Supabase
6. Clic en **Run** (o Ctrl+Enter)
7. Deberías ver "Success. No rows returned"

### PASO 5: Configurar Storage ⏳

1. En Supabase, ve a **Storage** (icono de carpeta)
2. Clic en **Create a new bucket**
3. Completa:
   - **Name:** `productos-imagenes`
   - **Public bucket:** ✅ Activado
4. Clic en **Create bucket**

### PASO 6: Crear Usuario Admin ⏳

1. En Supabase, ve a **Authentication** (icono de usuario)
2. Clic en **Add user** → **Create new user**
3. Completa:
   - **Email:** tu email de admin
   - **Password:** contraseña segura
   - **Auto Confirm User:** ✅ Activado
4. Clic en **Create user**
5. Copia el **User UID** (lo necesitarás)

### PASO 7: Registrar Admin en la Tabla ⏳

1. Ve a **SQL Editor**
2. Ejecuta este SQL (reemplaza `USER_UID` con el UID que copiaste):
   ```sql
   INSERT INTO usuarios_admin (id, nombre, email, rol, activo)
   VALUES (
     'USER_UID_AQUI',
     'Tu Nombre',
     'tu-email@ejemplo.com',
     'admin',
     true
   );
   ```
3. Clic en **Run**

### PASO 8: Reiniciar Servidor de Desarrollo ⏳

1. Detén el servidor si está corriendo (Ctrl+C)
2. Ejecuta:
   ```bash
   npm run dev
   ```
3. El servidor debería iniciar sin errores

---

## 🧪 VERIFICAR QUE TODO FUNCIONA

### Test 1: Verificar Conexión

Crea un archivo temporal `test-supabase.ts`:

```typescript
import { supabase } from '@/lib/supabase/client'

async function testConnection() {
  const { data, error } = await supabase
    .from('productos')
    .select('count')
  
  if (error) {
    console.error('❌ Error:', error)
  } else {
    console.log('✅ Conexión exitosa!')
    console.log('Productos en la base de datos:', data)
  }
}

testConnection()
```

### Test 2: Verificar Tablas

En Supabase, ve a **Table Editor** y verifica que existan:
- ✅ productos
- ✅ mensajes_contacto
- ✅ proyectos
- ✅ usuarios_admin

### Test 3: Verificar Storage

En Supabase, ve a **Storage** y verifica:
- ✅ Bucket `productos-imagenes` existe
- ✅ Es público (icono de ojo abierto)

### Test 4: Verificar Usuario Admin

En Supabase, ve a **Table Editor** → `usuarios_admin`:
- ✅ Debe haber 1 registro con tu email
- ✅ Campo `activo` debe ser `true`

---

## 📚 CÓMO USAR LOS CLIENTES DE SUPABASE

### En Componentes Client-Side

```typescript
"use client"

import { supabase } from '@/lib/supabase/client'

export default function MiComponente() {
  async function cargarProductos() {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
    
    if (error) console.error(error)
    else console.log(data)
  }

  return <button onClick={cargarProductos}>Cargar</button>
}
```

### En Server Components

```typescript
import { createClient } from '@/lib/supabase/server'

export default async function MiPagina() {
  const supabase = await createClient()
  
  const { data: productos } = await supabase
    .from('productos')
    .select('*')

  return (
    <div>
      {productos?.map(p => <div key={p.id}>{p.nombre}</div>)}
    </div>
  )
}
```

### En API Routes

```typescript
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('productos')
    .select('*')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
```

### Usando Hooks Personalizados

```typescript
"use client"

import { useProducts } from '@/hooks/useProducts'

export default function ListaProductos() {
  const { products, loading, error } = useProducts()

  if (loading) return <div>Cargando...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {products.map(p => (
        <div key={p.id}>{p.nombre}</div>
      ))}
    </div>
  )
}
```

---

## 🔐 SEGURIDAD

### Row Level Security (RLS)

Las tablas tienen políticas de seguridad configuradas:

**Productos:**
- ✅ Lectura: Pública (cualquiera puede ver)
- 🔒 Escritura: Solo admins

**Mensajes:**
- ✅ Inserción: Pública (formulario de contacto)
- 🔒 Lectura: Solo admins

**Proyectos:**
- ✅ Lectura: Pública
- 🔒 Escritura: Solo admins

**Usuarios Admin:**
- 🔒 Todo: Solo admins

### Variables de Entorno

⚠️ **IMPORTANTE:**
- `NEXT_PUBLIC_*` son públicas (se exponen al navegador)
- `SUPABASE_SERVICE_ROLE_KEY` es privada (NUNCA exponerla)
- Nunca subas `.env.local` a Git (ya está en `.gitignore`)

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### Error: "Invalid API key"
- Verifica que copiaste las keys correctamente
- Asegúrate de no tener espacios extra
- Reinicia el servidor de desarrollo

### Error: "relation does not exist"
- Las tablas no se crearon correctamente
- Ejecuta el SQL de nuevo en Supabase
- Verifica en Table Editor que las tablas existan

### Error: "Row Level Security policy violation"
- El usuario no tiene permisos
- Verifica que el usuario esté en `usuarios_admin`
- Verifica que `activo = true`

### Error: "Failed to fetch"
- Verifica la URL de Supabase en `.env.local`
- Verifica tu conexión a internet
- Verifica que el proyecto de Supabase esté activo

---

## 📊 PRÓXIMOS PASOS

Una vez completada la configuración:

1. ✅ Migrar productos de `data/productos.ts` a Supabase
2. ✅ Actualizar páginas para usar Supabase
3. ✅ Crear página de login de admin
4. ✅ Crear panel de administración
5. ✅ Implementar formulario de contacto
6. ✅ Subir imágenes a Storage

---

## 📝 CHECKLIST FINAL

Antes de continuar, verifica:

- [ ] Proyecto de Supabase creado
- [ ] Credenciales copiadas a `.env.local`
- [ ] SQL ejecutado (4 tablas creadas)
- [ ] Storage bucket creado y público
- [ ] Usuario admin creado
- [ ] Usuario registrado en `usuarios_admin`
- [ ] Servidor de desarrollo reiniciado
- [ ] No hay errores en la consola

---

**¿Necesitas ayuda?** Consulta la documentación oficial:
- [Supabase Docs](https://supabase.com/docs)
- [Next.js + Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

**Última actualización:** 2024
