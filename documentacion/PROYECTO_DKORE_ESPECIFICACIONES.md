# 📋 ESPECIFICACIONES COMPLETAS - PROYECTO D'KORE

## 📌 RESUMEN EJECUTIVO

**Estado Actual:** Fase 1 Completada - Reestructuración y Componentes Base  
**Última Sesión:** Reorganización completa del proyecto  
**Próximo Paso:** Configuración de Supabase

### Lo que Tenemos Funcionando
✅ Estructura de carpetas modular y escalable  
✅ Navbar con menú multinivel (desktop y mobile)  
✅ Footer completo con redes sociales  
✅ WhatsApp Button flotante con animación  
✅ Home page completa (carousel, productos destacados, CTA)  
✅ Página de catálogo con cards de categorías  
✅ 10 componentes UI reutilizables  
✅ Sistema de validaciones  
✅ Constantes y utilidades centralizadas  
✅ Tipos TypeScript definidos  
✅ Documentación completa (README, .env.example)

### Lo que Falta
⏳ Configuración de Supabase (base de datos, storage, auth)  
⏳ Páginas de categoría y producto individual  
⏳ Páginas "Quiénes Somos", "Contacto", "Proyectos"  
⏳ Panel de administración completo  
⏳ Sistema de búsqueda global  
⏳ Integración con servicio de emails  
⏳ Deploy a Vercel

---

## 🎯 INFORMACIÓN DEL PROYECTO

**Nombre:** D'kore - Decore y Remodele  
**Tipo:** Sitio web de catálogo de productos con panel de administración  
**Stack Tecnológico:**
- Frontend: Next.js 16 + React 19 + TypeScript
- Estilos: Tailwind CSS 4
- Animaciones: Framer Motion
- Base de Datos: Supabase
- Autenticación: Supabase Auth (múltiples usuarios)
- Emails: Por configurar (Resend o SendGrid)
- Hosting: Vercel
- Iconos: React Icons

**Eslogan:** "D'kore - Decore y Remodele"

---

## 📱 ESTRUCTURA COMPLETA DEL SITIO

### **PÁGINAS PÚBLICAS**

#### 1. HOME (`/`)
**Componentes:**
- Navbar (persistente)
- Hero Carousel interactivo
  - 4 slides (una por categoría)
  - Auto-play cada 4 segundos
  - Flechas de navegación visibles
  - Indicadores de puntos
  - Botón "Ver catálogo" sobre cada imagen
  - Redirección a categoría correspondiente
- Sección "Tu estilo, tu espacio, tu mundo"
  - Texto inspiracional
  - Botón "Ver catálogo completo"
- Productos Destacados (3 cards)
  - Imagen con hover zoom
  - Nombre y descripción
  - Link a categoría
- CTA Final
  - "¿Tienes un proyecto en mente?"
  - Botón a contacto
- Footer
- WhatsApp Button (flotante)

#### 2. CATÁLOGO GENERAL (`/catalogo`)
**Contenido:**
- Título: "Nuestros productos"
- Grid de 4 categorías principales:
  1. Mesas en Piedra Sinterizada
  2. Macetas en Fibra de Vidrio
  3. Revestimientos 3D
  4. Muebles de Melamina
- Cada categoría en card con:
  - Imagen de portada
  - Nombre de categoría
  - Descripción breve
  - Hover effect
  - Click → redirige a `/catalogo/[categoria]`

#### 3. PÁGINA DE CATEGORÍA (`/catalogo/[categoria]`)
**Categorías disponibles:**
- `mesas-piedra-sinterizada`
- `macetas-fibra-vidrio`
- `revestimientos-3d`
- `muebles-melamina`

**Contenido:**
- Breadcrumbs: Inicio > Catálogo > [Categoría]
- Título de categoría
- Barra de búsqueda/filtros
- Grid de productos
  - Cards con imagen + nombre
  - Hover effect
  - Click → `/catalogo/producto/[slug]`

**CASO ESPECIAL - Muebles de Melamina:**
- Muestra subcategorías primero:
  - Cocinas
  - Closets
  - Muebles de Entretenimiento
  - Veladores
  - Muebles de Baño
- Click en subcategoría → muestra productos de esa subcategoría

#### 4. PRODUCTO INDIVIDUAL (`/catalogo/producto/[slug]`)
**Layout de 2 columnas:**

**Columna Izquierda (60%):**
- Galería de imágenes
  - 1 imagen principal grande
  - Miniaturas debajo (desktop) o al lado (mobile)
  - Click en miniatura: intercambio con imagen principal
  - Animación suave de transición

**Columna Derecha (40%):**
- Nombre del producto (h1)
- Categoría/subcategoría
- Descripción atractiva
- Especificaciones (si aplica)
- Botón "Solicitar Cotización" → WhatsApp
- Botón "Contactar" → página de contacto

**Sección inferior:**
- Productos relacionados (misma categoría)
- Grid de 3-4 productos

#### 5. QUIÉNES SOMOS (`/quienes-somos`)
**Secciones:**
1. **Hero**
   - Título: "Nuestro Equipo" o "Quiénes Somos"
   - Subtítulo inspiracional

2. **Historia del Negocio**
   - Texto narrativo
   - Imagen representativa

3. **Visión**
   - Texto descriptivo
   - Icono o imagen

4. **Misión**
   - Texto descriptivo
   - Icono o imagen

5. **Valores**
   - Grid de 3 valores principales:
     - Calidad
     - Diseño
     - Compromiso
   - Cada uno en card con icono y descripción

6. **CTA**
   - "Trabajemos juntos"
   - Botón a contacto

#### 6. CONTACTO (`/contacto`)
**Layout de 2 columnas:**

**Columna Izquierda (40%):**
- Título: "Contáctanos"
- Subtítulo: "¿Tienes en mente algo especial?"
- Texto: "REGÍSTRATE PARA OBTENER INFORMACIÓN PERSONALIZADA."
- Descripción: "Comparte tu idea con nosotros y estaremos gustosos de ayudarte."
- Iconos de redes sociales (clickeables):
  - Facebook: https://www.facebook.com/dkore.decore.y.remodele/
  - Instagram: https://www.instagram.com/dkore.dkore/
  - WhatsApp: https://wa.me/5930998682900
  - Email: dkore.dkore.18@gmail.com

**Columna Derecha (60%):**
- Formulario de contacto funcional
  - Campos:
    - Nombres y Apellidos (text, required)
    - Email (email, required)
    - Número celular (tel, required)
    - Ciudad (radio buttons: Cuenca, Guayaquil, Quito, Ambato)
    - Mensaje (textarea, required)
  - Botón "Enviar"
  - Validación de campos
  - Envío a Gmail vía API
  - Guardado en Supabase para CRM
  - Mensaje de confirmación

#### 7. GALERÍA DE PROYECTOS (`/proyectos`)
**Contenido:**
- Título: "Proyectos Realizados"
- Grid de proyectos (masonry o grid regular)
- Cada proyecto:
  - Imagen principal
  - Nombre del proyecto
  - Breve descripción
  - Click → Modal con más detalles
- Modal:
  - Galería de imágenes
  - Descripción completa
  - Productos utilizados
  - Botón cerrar

---

### **PÁGINAS ADMINISTRATIVAS**

#### 8. LOGIN ADMIN (`/admin/login`)
- Formulario de login
- Email + Password
- Autenticación con Supabase Auth
- Redirección a dashboard si ya está autenticado
- Mensaje de error si credenciales incorrectas

#### 9. DASHBOARD ADMIN (`/admin`)
**Protegido con autenticación**

**Contenido:**
- Estadísticas:
  - Total de productos
  - Mensajes sin leer
  - Productos por categoría
  - Últimos productos agregados
- Accesos rápidos:
  - Agregar producto
  - Ver mensajes
  - Ver productos

#### 10. GESTIÓN DE PRODUCTOS (`/admin/productos`)
**Funcionalidades:**
- Lista de todos los productos
- Tabla con columnas:
  - Imagen miniatura
  - Nombre
  - Categoría
  - Subcategoría
  - Destacado (sí/no)
  - Acciones (Editar, Eliminar)
- Búsqueda y filtros
- Paginación
- Botón "Agregar Producto"

#### 11. AGREGAR PRODUCTO (`/admin/productos/nuevo`)
**Formulario:**
- Nombre (text, required)
- Slug (auto-generado, editable)
- Descripción corta (textarea, required)
- Descripción larga (textarea, optional)
- Categoría (select, required)
- Subcategoría (select, conditional)
- Destacado (checkbox)
- Orden (number)
- Imágenes (upload múltiple)
  - Drag & drop
  - Preview
  - Reordenar
  - Eliminar
- Botones: Guardar, Cancelar

#### 12. EDITAR PRODUCTO (`/admin/productos/[id]`)
- Mismo formulario que agregar
- Pre-llenado con datos existentes
- Botón "Eliminar producto" (con confirmación)

#### 13. CRM - MENSAJES (`/admin/mensajes`)
**Contenido:**
- Lista de mensajes de contacto
- Tabla con:
  - Fecha
  - Nombre
  - Email
  - Teléfono
  - Ciudad
  - Mensaje (preview)
  - Estado (Nuevo, Leído, Respondido)
  - Acciones (Ver detalle, Marcar como leído)
- Filtros por estado
- Búsqueda
- Paginación

---

## 🧩 COMPONENTES GLOBALES

### **NAVBAR (Persistente en todas las páginas)**
**Estructura:**
```
[Logo] | Inicio | Productos ▼ | Quiénes Somos | Contacto | [🔍 Búsqueda]
```

**Comportamiento:**
- Fixed top
- Altura: 80px (h-20)
- Fondo: Negro semi-transparente con blur
- Al hacer scroll: fondo más opaco + sombra
- Logo: tamaño adaptable según scroll
- Responsive: menú hamburguesa en móvil

**Menú Desplegable "Productos":**
```
Productos ▼
  └─ Catálogo ▶
      ├─ Mesas en Piedra Sinterizada
      ├─ Macetas en Fibra de Vidrio
      ├─ Revestimientos 3D
      └─ Muebles de Melamina ▶
          ├─ Cocinas
          ├─ Closets
          ├─ Muebles de Entretenimiento
          ├─ Veladores
          └─ Muebles de Baño
```

**Reglas del menú:**
- Desktop: hover para abrir
- Mobile: click para abrir
- Submenús se abren a la derecha (desktop)
- Submenús se abren abajo (mobile)
- Click fuera cierra el menú
- Animaciones suaves con Framer Motion
- NO debe expandir la altura del navbar

**Barra de Búsqueda:**
- Icono de lupa en navbar
- Click → abre modal de búsqueda
- Input con autocompletado
- Búsqueda en tiempo real
- Resultados con preview (imagen + nombre)
- Click en resultado → página del producto
- ESC para cerrar

### **FOOTER**
**Contenido:**
- 3 columnas (desktop) / apiladas (mobile)

**Columna 1: Información**
- Logo
- Eslogan
- Dirección
- Teléfono
- Email

**Columna 2: Enlaces Rápidos**
- Inicio
- Catálogo
- Quiénes Somos
- Contacto
- Proyectos

**Columna 3: Redes Sociales**
- Facebook
- Instagram
- WhatsApp

**Pie de página:**
- Copyright © 2024 D'kore. Todos los derechos reservados.

### **WHATSAPP BUTTON (Flotante)**
**Características:**
- Posición: fixed bottom-right
- z-index alto (siempre visible)
- Icono de WhatsApp verde
- Animación de pulso sutil
- Hover: tooltip "¿Necesitas ayuda? Chatea con nosotros"
- Click: abre WhatsApp con mensaje pre-llenado
- Número: +593 99 868 2900
- Mensaje inicial: "Hola, estoy interesado en sus productos"
- Responsive: más pequeño en móvil

---

## 🎨 DISEÑO Y ESTILO

### **Paleta de Colores**
```css
--negro-principal: #000000
--blanco: #FFFFFF
--dorado-acento: #C5A059
--gris-oscuro: #171717
--gris-medio: #6B7280
--gris-claro: #F3F4F6
```

### **Tipografía**
- **Principal:** Geist Sans
- **Monospace:** Geist Mono (para códigos si aplica)
- **Jerarquía:**
  - h1: 3rem (48px) - 5rem (80px)
  - h2: 2.5rem (40px) - 4rem (64px)
  - h3: 2rem (32px)
  - h4: 1.5rem (24px)
  - body: 1rem (16px)
  - small: 0.875rem (14px)

### **Espaciado**
- Secciones: py-24 (96px)
- Contenedores: max-w-7xl mx-auto px-6
- Cards: p-6 o p-8
- Gaps: gap-8 o gap-12

### **Efectos y Animaciones**
- Transiciones: duration-300 o duration-500
- Hover en cards: scale-105, shadow-2xl
- Hover en botones: bg change, scale-105
- Framer Motion para:
  - Entrada de elementos (fadeIn, slideUp)
  - Carrusel (slide transitions)
  - Menús desplegables
  - Modales

### **Responsive Breakpoints**
```css
sm: 640px   /* Móvil grande */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop pequeño */
xl: 1280px  /* Desktop grande */
2xl: 1536px /* Desktop extra grande */
```

### **Componentes UI Reutilizables**
- Button: variantes (primary, secondary, outline, ghost)
- Card: con hover effects
- Input: con validación visual
- Modal: con backdrop blur
- Toast: para notificaciones

---

## 🗂️ ESTRUCTURA DE DATOS

### **Tabla: productos**
```typescript
{
  id: uuid (PK)
  nombre: string
  slug: string (unique)
  descripcion: string
  descripcion_larga: text (nullable)
  categoria: string
  subcategoria: string (nullable)
  imagenes: string[] (array de URLs)
  destacado: boolean (default: false)
  orden: integer (default: 0)
  created_at: timestamp
  updated_at: timestamp
}
```

**Categorías válidas:**
- `mesas-piedra-sinterizada`
- `macetas-fibra-vidrio`
- `revestimientos-3d`
- `muebles-melamina`

**Subcategorías (solo para muebles-melamina):**
- `cocinas`
- `closets`
- `muebles-entretenimiento`
- `veladores`
- `muebles-bano`

### **Tabla: mensajes_contacto**
```typescript
{
  id: uuid (PK)
  nombre: string
  email: string
  celular: string
  ciudad: string
  mensaje: text
  estado: string (default: 'nuevo')
  created_at: timestamp
  leido_at: timestamp (nullable)
}
```

**Estados posibles:**
- `nuevo`
- `leido`
- `respondido`

### **Tabla: proyectos**
```typescript
{
  id: uuid (PK)
  nombre: string
  descripcion: text
  imagenes: string[]
  productos_usados: uuid[] (referencias a productos)
  fecha_realizacion: date
  destacado: boolean
  created_at: timestamp
}
```

### **Tabla: usuarios_admin**
```typescript
{
  id: uuid (PK, referencia a auth.users)
  nombre: string
  email: string
  rol: string (default: 'admin')
  activo: boolean (default: true)
  created_at: timestamp
}
```

---

## 🔧 FUNCIONALIDADES TÉCNICAS

### **Autenticación (Supabase Auth)**
- Múltiples usuarios admin
- Login con email + password
- Sesión persistente
- Protección de rutas admin
- Middleware de Next.js para verificar auth
- Logout funcional

### **Gestión de Imágenes**
- Upload a Supabase Storage
- Bucket: `productos-imagenes`
- Políticas públicas de lectura
- Compresión automática (opcional)
- Formatos: JPG, PNG, WebP
- Tamaño máximo: 5MB por imagen
- Múltiples imágenes por producto

### **Sistema de Emails**
- Servicio: Resend o SendGrid (por configurar)
- Envío desde: noreply@dkore.com (o similar)
- Envío a: dkore.dkore.18@gmail.com
- Template HTML para emails
- Confirmación al usuario
- Notificación al admin

### **Búsqueda**
- Búsqueda en tiempo real
- Campos: nombre, descripción, categoría
- Debounce de 300ms
- Resultados limitados a 10
- Highlight de términos encontrados

### **SEO**
- Metadata dinámica por página
- Open Graph tags
- Twitter cards
- Sitemap.xml automático
- robots.txt
- Structured data (JSON-LD) para productos

### **Performance**
- Next.js Image optimization
- Lazy loading de imágenes
- Code splitting automático
- ISR (Incremental Static Regeneration) para productos
- Caching de Supabase queries

---

## 📁 ESTRUCTURA DE CARPETAS DEFINITIVA

```
dkore/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                    # Home
│   │   ├── layout.tsx                  # Layout público
│   │   ├── catalogo/
│   │   │   ├── page.tsx                # Lista categorías
│   │   │   ├── [categoria]/
│   │   │   │   └── page.tsx            # Productos de categoría
│   │   │   └── producto/
│   │   │       └── [slug]/
│   │   │           └── page.tsx        # Detalle producto
│   │   ├── quienes-somos/
│   │   │   └── page.tsx
│   │   ├── contacto/
│   │   │   └── page.tsx
│   │   └── proyectos/
│   │       └── page.tsx
│   │
│   ├── admin/
│   │   ├── layout.tsx                  # Layout admin
│   │   ├── page.tsx                    # Dashboard
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── productos/
│   │   │   ├── page.tsx                # Lista
│   │   │   ├── nuevo/
│   │   │   │   └── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx            # Editar
│   │   └── mensajes/
│   │       └── page.tsx
│   │
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts
│   │   ├── productos/
│   │   │   └── route.ts
│   │   └── upload/
│   │       └── route.ts
│   │
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── WhatsAppButton.tsx
│   │   └── SearchModal.tsx
│   │
│   ├── home/
│   │   ├── HeroCarousel.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── ProductCard.tsx
│   │   └── CTASection.tsx
│   │
│   ├── products/
│   │   ├── ProductGrid.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductGallery.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── RelatedProducts.tsx
│   │   └── CategoryCard.tsx
│   │
│   ├── admin/
│   │   ├── ProductForm.tsx
│   │   ├── ImageUpload.tsx
│   │   ├── Dashboard.tsx
│   │   ├── ProductTable.tsx
│   │   ├── MessageTable.tsx
│   │   └── ProtectedRoute.tsx
│   │
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Textarea.tsx
│       ├── Select.tsx
│       ├── Modal.tsx
│       ├── Card.tsx
│       ├── Toast.tsx
│       └── Loading.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts               # Cliente browser
│   │   ├── server.ts               # Cliente server
│   │   └── middleware.ts           # Auth middleware
│   ├── utils.ts
│   ├── validations.ts
│   └── constants.ts
│
├── types/
│   ├── index.ts
│   ├── producto.ts
│   ├── mensaje.ts
│   └── proyecto.ts
│
├── hooks/
│   ├── useAuth.ts
│   ├── useProducts.ts
│   └── useSearch.ts
│
├── public/
│   ├── logo.png
│   ├── hero/
│   ├── categorias/
│   └── imagenes/
│
├── .env.local
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── PROYECTO_DKORE_ESPECIFICACIONES.md (este archivo)
```

---

## 🚀 PLAN DE IMPLEMENTACIÓN

### **FASE 1: Configuración y Fundación (Días 1-3)** ✅ COMPLETADA
- [x] Análisis de requerimientos
- [x] Reorganizar estructura de carpetas
- [x] Crear componentes base UI
- [x] Crear librerías y utilidades
- [x] Definir tipos TypeScript
- [x] Crear documentación (README, .env.example)
- [x] Configurar Supabase
  - [x] Crear proyecto
  - [x] Crear tablas
  - [x] Configurar Storage
  - [x] Configurar Auth
  - [x] Crear usuario admin
- [x] Configurar variables de entorno
- [x] Crear clientes y hooks de Supabase

### **FASE 2: Frontend Público (Días 4-10)** 🔄 EN PROGRESO
- [x] Navbar con menú multinivel funcional
- [x] Footer
- [x] WhatsApp Button
- [x] Home completo
  - [x] Hero Carousel
  - [x] Sección de frase
  - [x] Productos destacados
  - [x] CTA
- [x] Catálogo general
- [ ] Página de categoría
- [ ] Página de producto individual
- [ ] Quiénes somos
- [ ] Contacto con formulario
- [ ] Galería de proyectos

### **FASE 3: Backend y Admin (Días 11-17)**
- [ ] API Routes
  - [ ] Productos CRUD
  - [ ] Contacto
  - [ ] Upload de imágenes
- [ ] Panel de administración
  - [ ] Login
  - [ ] Dashboard
  - [ ] Gestión de productos
  - [ ] CRM de mensajes
- [ ] Autenticación completa
- [ ] Protección de rutas

### **FASE 4: Funcionalidades Avanzadas (Días 18-21)**
- [ ] Búsqueda global
- [ ] Sistema de emails
- [ ] Optimizaciones de performance
- [ ] SEO completo
- [ ] Testing responsive
- [ ] Corrección de bugs

### **FASE 5: Deploy y Producción (Días 22-24)**
- [ ] Configurar dominio
- [ ] Deploy en Vercel
- [ ] Configurar variables de entorno producción
- [ ] Testing en producción
- [ ] Documentación de uso
- [ ] Capacitación de administradores

### **FASE 6: Futuro - "Crea con Nosotros"**
- [ ] Investigación de tecnologías 3D
- [ ] Diseño de interfaz
- [ ] Implementación de visualizador
- [ ] Sistema de guardado de proyectos

---

## 📝 NOTAS IMPORTANTES

### **Decisiones Técnicas**
- **Base de datos:** Supabase (confirmado)
- **Autenticación:** Múltiples usuarios admin (confirmado)
- **Emails:** Por configurar (Resend recomendado)
- **Hosting:** Vercel (confirmado)

### **Pendientes de Configuración**
1. Crear cuenta de Supabase
2. Configurar servicio de emails
3. Obtener credenciales de API
4. Configurar dominio personalizado

### **Referencias de Diseño**
- https://imporquivi.com/
- https://quilmur.com.ec/
- https://duramas.com.ec/

### **Contacto D'kore**
- **WhatsApp:** +593 99 868 2900
- **Email:** dkore.dkore.18@gmail.com
- **Facebook:** https://www.facebook.com/dkore.decore.y.remodele/
- **Instagram:** https://www.instagram.com/dkore.dkore/

---

## ✅ CHECKLIST DE PROGRESO

### Configuración Inicial
- [x] Supabase configurado ✅ COMPLETADO
- [x] Variables de entorno (.env.local completado)
- [x] Estructura de carpetas reorganizada
- [x] Documentación creada (README, .env.example)
- [x] Clientes de Supabase creados
- [x] Middleware de autenticación
- [x] Hooks personalizados
- [x] Script SQL ejecutado
- [x] Storage configurado
- [x] Usuario admin creado

### Componentes Globales
- [x] Navbar (con menú multinivel funcional)
- [x] Footer (3 columnas: info, enlaces, redes)
- [x] WhatsApp Button (flotante con tooltip)
- [ ] Search Modal

### Componentes UI Reutilizables
- [x] Button (4 variantes)
- [x] Card (con hover effects)
- [x] Input (con validación)
- [x] Textarea (con validación)
- [x] Modal (con animaciones)
- [x] Loading (spinner)
- [ ] Select
- [ ] Toast

### Componentes de Productos
- [x] CategoryCard (para catálogo)
- [x] ProductCard (para home)
- [x] ProductGrid (grid con animaciones)
- [x] ProductGallery (galería de imágenes)
- [ ] ProductDetail
- [ ] RelatedProducts

### Componentes de Home
- [x] HeroCarousel (4 slides, 4 segundos)
- [x] ProductCard (destacados)
- [x] CTASection (call to action)

### Librerías y Utilidades
- [x] constants.ts (categorías, contacto, colores)
- [x] utils.ts (formateo, slugify, etc.)
- [x] validations.ts (validación de formularios)
- [x] types/index.ts (interfaces TypeScript)
- [x] supabase/client.ts (cliente navegador)
- [x] supabase/server.ts (cliente servidor + admin)
- [x] supabase/middleware.ts (autenticación)

### Hooks
- [x] useProducts.ts (5 hooks para productos)
- [x] useAuth.ts (autenticación)
- [ ] useSearch.ts

### Páginas Públicas
- [x] Home (completa con carousel, productos, CTA)
- [x] Catálogo (grid de categorías)
- [ ] Categoría (productos por categoría)
- [ ] Producto (detalle individual)
- [ ] Quiénes Somos
- [ ] Contacto (con formulario funcional)
- [ ] Proyectos

### Panel Admin
- [ ] Login
- [ ] Dashboard
- [ ] Productos (CRUD)
- [ ] Mensajes (CRM)

### Funcionalidades
- [ ] Búsqueda
- [ ] Emails
- [ ] Upload imágenes
- [ ] Autenticación

### Deploy
- [ ] Vercel configurado
- [ ] Dominio conectado
- [ ] SSL activo

---

**Última actualización:** 2024
**Versión del documento:** 1.1
**Estado del proyecto:** Fase 1 completada - Iniciando Fase 2

---

## 📊 REGISTRO DE CAMBIOS

### Sesión 2 - Configuración de Supabase (COMPLETADA) ✅

#### Dependencias Instaladas
- ✅ `@supabase/supabase-js` - Cliente principal
- ✅ `@supabase/ssr` - Helpers para Next.js SSR

#### Archivos Creados
**Supabase:**
- ✅ `lib/supabase/client.ts` - Cliente para navegador
- ✅ `lib/supabase/server.ts` - Cliente para servidor (con admin client)
- ✅ `lib/supabase/middleware.ts` - Middleware de autenticación
- ✅ `middleware.ts` - Middleware de Next.js (protección de rutas)

**Hooks:**
- ✅ `hooks/useProducts.ts` - 5 hooks para productos
- ✅ `hooks/useAuth.ts` - Hook de autenticación

**Configuración:**
- ✅ `.env.local` - Variables de entorno (completado)
- ✅ `supabase_setup.sql` - Script SQL completo para crear tablas
- ✅ `crear_admin.sql` - Script para crear usuario admin
- ✅ `test-supabase.ts` - Script de prueba de conexión

**Documentación:**
- ✅ `GUIA_SUPABASE.md` - Guía paso a paso de configuración
- ✅ `SESION_02_SUPABASE.md` - Registro completo de la sesión

#### Configuración en Supabase.com
- ✅ Proyecto creado (dkore-web)
- ✅ Credenciales copiadas a `.env.local`
- ✅ 4 tablas creadas (productos, mensajes_contacto, proyectos, usuarios_admin)
- ✅ Row Level Security (RLS) configurado
- ✅ 3 funciones SQL útiles creadas
- ✅ Storage bucket `productos-imagenes` creado y público
- ✅ Usuario admin creado y registrado

#### Funcionalidades Implementadas
**Clientes de Supabase:**
- Cliente para navegador (componentes client-side)
- Cliente para servidor (Server Components, API Routes)
- Cliente admin (operaciones administrativas)
- Middleware de autenticación (protección de rutas)

**Hooks Personalizados:**
- `useProducts()` - Obtener todos los productos
- `useProductsByCategory(categoria)` - Productos por categoría
- `useProductBySlug(slug)` - Producto individual
- `useFeaturedProducts(limit)` - Productos destacados
- `useSearchProducts(searchTerm)` - Búsqueda con debounce
- `useAuth()` - Autenticación y estado de admin

**Base de Datos:**
- 4 tablas con índices optimizados
- Row Level Security (RLS) configurado
- Triggers para updated_at automático
- 3 funciones SQL útiles (buscar, destacados, por categoría)
- Políticas de seguridad por rol

---

### Sesión 2 - Configuración de Supabase (EN PROGRESO)

#### Archivos Creados
**Supabase:**
- ✅ `lib/supabase/client.ts` - Cliente para navegador
- ✅ `lib/supabase/server.ts` - Cliente para servidor (con admin client)
- ✅ `lib/supabase/middleware.ts` - Middleware de autenticación
- ✅ `middleware.ts` - Middleware de Next.js (protección de rutas)

**Hooks:**
- ✅ `hooks/useProducts.ts` - 5 hooks para productos
- ✅ `hooks/useAuth.ts` - Hook de autenticación

**Configuración:**
- ✅ `.env.local` - Variables de entorno (pendiente completar)
- ✅ `supabase_setup.sql` - Script SQL completo para crear tablas

**Documentación:**
- ✅ `GUIA_SUPABASE.md` - Guía paso a paso de configuración

#### Dependencias Instaladas
- ✅ `@supabase/supabase-js` - Cliente de Supabase
- ✅ `@supabase/ssr` - SSR helpers para Next.js

#### Funcionalidades Implementadas
**Clientes de Supabase:**
- Cliente para navegador (componentes client-side)
- Cliente para servidor (Server Components, API Routes)
- Cliente admin (operaciones administrativas)
- Middleware de autenticación (protección de rutas)

**Hooks Personalizados:**
- `useProducts()` - Obtener todos los productos
- `useProductsByCategory(categoria)` - Productos por categoría
- `useProductBySlug(slug)` - Producto individual
- `useFeaturedProducts(limit)` - Productos destacados
- `useSearchProducts(searchTerm)` - Búsqueda con debounce
- `useAuth()` - Autenticación y estado de admin

**Base de Datos:**
- 4 tablas: productos, mensajes_contacto, proyectos, usuarios_admin
- Row Level Security (RLS) configurado
- Índices para optimización
- Triggers para updated_at
- 3 funciones SQL útiles (buscar, destacados, por categoría)

#### Pendiente de Completar
- [ ] Crear proyecto en Supabase.com
- [ ] Copiar credenciales a `.env.local`
- [ ] Ejecutar SQL en Supabase
- [ ] Configurar Storage bucket
- [ ] Crear usuario admin
- [ ] Verificar conexión

---

### Sesión 1 - Reestructuración del Proyecto (COMPLETADA)

#### Componentes Creados
**Layout:**
- ✅ `components/layout/Navbar.tsx` - Menú multinivel con dropdowns funcionales
- ✅ `components/layout/Footer.tsx` - Footer con 3 columnas (info, enlaces, redes)
- ✅ `components/layout/WhatsAppButton.tsx` - Botón flotante con tooltip animado

**Home:**
- ✅ `components/home/HeroCarousel.tsx` - Carousel con 4 slides, auto-play 4s
- ✅ `components/home/ProductCard.tsx` - Card para productos destacados
- ✅ `components/home/CTASection.tsx` - Sección de call to action

**Products:**
- ✅ `components/products/CategoryCard.tsx` - Card para categorías
- ✅ `components/products/ProductGrid.tsx` - Grid de productos con animaciones
- ✅ `components/products/ProductGallery.tsx` - Galería de imágenes (movido)

**UI:**
- ✅ `components/ui/Button.tsx` - 4 variantes (primary, secondary, outline, ghost)
- ✅ `components/ui/Card.tsx` - Card genérico con hover effects
- ✅ `components/ui/Input.tsx` - Input con label y validación
- ✅ `components/ui/Textarea.tsx` - Textarea con label y validación
- ✅ `components/ui/Modal.tsx` - Modal con backdrop blur y animaciones
- ✅ `components/ui/Loading.tsx` - Spinner de carga

#### Librerías y Utilidades
- ✅ `lib/constants.ts` - Constantes (categorías, subcategorías, contacto, colores)
- ✅ `lib/utils.ts` - Funciones utilitarias (cn, formatDate, slugify, capitalize, formatPhoneNumber)
- ✅ `lib/validations.ts` - Validaciones de formularios (email, teléfono, contacto)
- ✅ `types/index.ts` - Interfaces TypeScript (Producto, MensajeContacto, Proyecto, UsuarioAdmin)

#### Páginas Actualizadas
- ✅ `app/layout.tsx` - Incluye Navbar, Footer y WhatsAppButton
- ✅ `app/page.tsx` - Home completa con carousel, productos destacados y CTA
- ✅ `app/catalogo/page.tsx` - Refactorizado con CategoryCard y constantes

#### Documentación
- ✅ `.env.local.example` - Template de variables de entorno
- ✅ `README.md` - Documentación completa del proyecto
- ✅ `REESTRUCTURACION.md` - Resumen detallado de cambios

#### Archivos Eliminados
- ❌ `components/HeroSlider.tsx` - Reemplazado por HeroCarousel

#### Estructura de Carpetas
```
✅ components/layout/     - Componentes de layout
✅ components/home/        - Componentes de home
✅ components/products/    - Componentes de productos
✅ components/ui/          - Componentes UI reutilizables
✅ lib/                    - Utilidades y constantes
✅ types/                  - Tipos TypeScript
```

---

## 🎯 PRÓXIMOS PASOS INMEDIATOS

### 1. Configurar Supabase (SIGUIENTE PASO)
- [ ] Crear proyecto en Supabase
- [ ] Crear tablas (productos, mensajes_contacto, proyectos, usuarios_admin)
- [ ] Configurar Storage para imágenes
- [ ] Configurar Auth para múltiples usuarios
- [ ] Copiar credenciales a `.env.local`
- [ ] Crear clientes de Supabase (browser y server)

### 2. Completar Páginas Públicas
- [ ] Página de categoría con filtros
- [ ] Página de producto individual con galería
- [ ] Página "Quiénes Somos"
- [ ] Página de contacto con formulario funcional
- [ ] Página de proyectos

### 3. Implementar Funcionalidades
- [ ] Sistema de búsqueda global
- [ ] Integración con Supabase
- [ ] Sistema de emails (Resend o SendGrid)

### 4. Panel de Administración
- [ ] Login de admin
- [ ] Dashboard con estadísticas
- [ ] CRUD de productos
- [ ] CRM de mensajes

**Este documento debe ser consultado en cada sesión para mantener continuidad y coherencia en el desarrollo.**
