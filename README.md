# D'kore - Decore y Remodele

Sitio web de catálogo de productos con panel de administración para D'kore.

## Stack Tecnológico

- **Frontend:** Next.js 16 + React 19 + TypeScript
- **Estilos:** Tailwind CSS 4
- **Animaciones:** Framer Motion
- **Base de Datos:** Supabase
- **Autenticación:** Supabase Auth
- **Hosting:** Vercel

## Estructura del Proyecto

```
dkore/
├── app/                    # Páginas y rutas de Next.js
│   ├── (public)/          # Rutas públicas
│   ├── admin/             # Panel de administración
│   └── api/               # API routes
├── components/            # Componentes React
│   ├── layout/           # Navbar, Footer, WhatsApp
│   ├── home/             # Componentes de home
│   ├── products/         # Componentes de productos
│   ├── admin/            # Componentes de admin
│   └── ui/               # Componentes UI reutilizables
├── lib/                  # Utilidades y configuración
├── types/                # Tipos de TypeScript
├── hooks/                # Custom hooks
├── public/               # Archivos estáticos
└── data/                 # Datos temporales
```

## Configuración

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Copiar `.env.local.example` a `.env.local` y configurar variables:
   ```bash
   cp .env.local.example .env.local
   ```

4. Configurar Supabase (ver sección siguiente)

5. Ejecutar en desarrollo:
   ```bash
   npm run dev
   ```

## Configuración de Supabase

### Paso 1: Crear Proyecto
1. Ir a [supabase.com](https://supabase.com)
2. Crear nuevo proyecto
3. Copiar URL y anon key a `.env.local`

### Paso 2: Crear Tablas
Ejecutar los siguientes SQL en el editor de Supabase:

```sql
-- Tabla de productos
CREATE TABLE productos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  descripcion TEXT NOT NULL,
  descripcion_larga TEXT,
  categoria TEXT NOT NULL,
  subcategoria TEXT,
  imagenes TEXT[] DEFAULT '{}',
  destacado BOOLEAN DEFAULT false,
  orden INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de mensajes de contacto
CREATE TABLE mensajes_contacto (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  celular TEXT NOT NULL,
  ciudad TEXT NOT NULL,
  mensaje TEXT NOT NULL,
  estado TEXT DEFAULT 'nuevo',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  leido_at TIMESTAMP WITH TIME ZONE
);

-- Tabla de proyectos
CREATE TABLE proyectos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  imagenes TEXT[] DEFAULT '{}',
  productos_usados UUID[] DEFAULT '{}',
  fecha_realizacion DATE,
  destacado BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de usuarios admin
CREATE TABLE usuarios_admin (
  id UUID REFERENCES auth.users PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  rol TEXT DEFAULT 'admin',
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Paso 3: Configurar Storage
1. Crear bucket `productos-imagenes`
2. Configurar políticas públicas de lectura

### Paso 4: Configurar Auth
1. Habilitar Email Auth
2. Crear usuarios admin desde el panel

## Scripts Disponibles

- `npm run dev` - Ejecutar en desarrollo
- `npm run build` - Construir para producción
- `npm run start` - Ejecutar en producción
- `npm run lint` - Ejecutar linter

## Categorías de Productos

1. Mesas en Piedra Sinterizada
2. Macetas en Fibra de Vidrio
3. Revestimientos 3D
4. Muebles de Melamina
   - Cocinas
   - Closets
   - Muebles de Entretenimiento
   - Veladores
   - Muebles de Baño

## Contacto

- **WhatsApp:** +593 99 868 2900
- **Email:** dkore.dkore.18@gmail.com
- **Facebook:** [D'kore](https://www.facebook.com/dkore.decore.y.remodele/)
- **Instagram:** [@dkore.dkore](https://www.instagram.com/dkore.dkore/)

## Licencia

Todos los derechos reservados © 2024 D'kore
