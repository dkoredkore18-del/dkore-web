# DESIGN - Página de Producto Individual (2 Columnas)

## Layout General

```
┌─────────────────────────────────────────────────────────────┐
│                        NAVBAR                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────┬──────────────────────────────┐ │
│  │                          │                              │ │
│  │   COLUMNA IZQUIERDA      │    COLUMNA DERECHA           │ │
│  │   (Información)          │    (Imágenes)                │ │
│  │   40% del ancho          │    60% del ancho             │ │
│  │                          │                              │ │
│  │  - Nombre producto       │  - Imagen principal grande   │ │
│  │  - Categoría             │  - Miniaturas debajo         │ │
│  │  - Descripción           │  - Animación suave           │ │
│  │  - Especificaciones      │                              │ │
│  │  - Botones de acción     │                              │ │
│  │                          │                              │ │
│  └──────────────────────────┴──────────────────────────────┘ │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │         PRODUCTOS RELACIONADOS (Grid 3-4 items)         │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                        FOOTER                                │
└─────────────────────────────────────────────────────────────┘
```

---

## COLUMNA IZQUIERDA - INFORMACIÓN DEL PRODUCTO (40%)

### Estructura Vertical

```
┌─────────────────────────────┐
│  Breadcrumbs                │  (Inicio > Catálogo > Categoría > Producto)
├─────────────────────────────┤
│  Nombre del Producto (H1)   │  (Fuerte, grande)
├─────────────────────────────┤
│  Categoría / Subcategoría   │  (Gris claro, pequeño)
├─────────────────────────────┤
│  ⭐ Rating (si aplica)      │  (Opcional)
├─────────────────────────────┤
│  Descripción Corta          │  (Párrafo principal)
├─────────────────────────────┤
│  Especificaciones           │  (Lista de características)
│  • Especificación 1         │
│  • Especificación 2         │
│  • Especificación 3         │
├─────────────────────────────┤
│  Botón: Solicitar Cotización│  (Verde o blanco con borde)
│  Botón: Contactar           │  (Secundario)
├─────────────────────────────┤
│  Información de Contacto    │  (Pequeño, gris)
│  WhatsApp: +593 99 868 2900 │
│  Email: dkore.dkore.18@...  │
└─────────────────────────────┘
```

### Estilos Específicos

**Nombre del Producto:**
- Font size: `clamp(1.875rem, 5vw, 2.5rem)` (30-40px)
- Font weight: bold (700)
- Color: white
- Margin bottom: 1rem

**Categoría:**
- Font size: 0.875rem (14px)
- Color: #d1d5db (gris claro)
- Text transform: uppercase
- Letter spacing: 0.05em
- Margin bottom: 1.5rem

**Descripción:**
- Font size: 1rem (16px)
- Color: #e5e7eb (gris muy claro)
- Line height: 1.6
- Margin bottom: 2rem

**Especificaciones:**
- Font size: 0.95rem
- Color: #d1d5db
- List style: bullet points
- Margin bottom: 2rem
- Cada item con padding: 0.5rem 0

**Botones:**
- Solicitar Cotización: 
  - Background: white
  - Color: black
  - Padding: 12px 32px
  - Font weight: bold
  - Hover: scale 1.05, shadow
  - Width: 100%
  - Margin bottom: 1rem

- Contactar:
  - Background: transparent
  - Border: 2px solid white
  - Color: white
  - Padding: 12px 32px
  - Font weight: bold
  - Hover: bg white, color black
  - Width: 100%

---

## COLUMNA DERECHA - GALERÍA DE IMÁGENES (60%)

### Estructura

```
┌──────────────────────────────────┐
│                                  │
│      IMAGEN PRINCIPAL GRANDE     │
│      (Aspect ratio: 1:1 o 4:3)   │
│      (Animación suave al cambiar)│
│                                  │
│                                  │
├──────────────────────────────────┤
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐      │
│  │  │ │  │ │  │ │  │ │  │      │
│  └──┘ └──┘ └──┘ └──┘ └──┘      │
│  Miniaturas (scroll horizontal)  │
└──────────────────────────────────┘
```

### Estilos Específicos

**Imagen Principal:**
- Width: 100%
- Height: auto (mantener aspect ratio)
- Max height: 600px
- Object fit: cover
- Border radius: 8px
- Background: #1a1a1a (gris muy oscuro)
- Transition: opacity 0.3s ease
- Cursor: pointer (para zoom si aplica)

**Miniaturas:**
- Display: flex
- Gap: 12px
- Margin top: 1.5rem
- Overflow-x: auto (scroll horizontal en móvil)
- Padding bottom: 0.5rem

**Cada Miniatura:**
- Width: 80px
- Height: 80px
- Border radius: 4px
- Cursor: pointer
- Border: 2px solid transparent
- Transition: all 0.3s ease
- Hover: border-color white, scale 1.05
- Active (seleccionada): border-color white

**Responsive:**
- Desktop (>1024px): Miniaturas debajo de imagen principal
- Tablet (768px-1024px): Miniaturas debajo, más pequeñas
- Mobile (<768px): Miniaturas a la derecha o debajo con scroll

---

## COMPORTAMIENTO INTERACTIVO

### Click en Miniatura
1. Imagen principal cambia a la miniatura seleccionada
2. Transición suave (fade 0.3s)
3. Miniatura se marca con borde blanco
4. Scroll automático a miniatura si está fuera de vista

### Hover en Botones
- **Solicitar Cotización:** 
  - Background: white → gris claro
  - Color: black → negro
  - Scale: 1 → 1.02
  - Shadow: aumenta

- **Contactar:**
  - Background: transparent → white
  - Color: white → black
  - Scale: 1 → 1.02

### Zoom en Imagen (Opcional)
- Hover en imagen principal: cursor cambia a zoom
- Click: abre modal con imagen en full screen
- ESC o click fuera: cierra modal

---

## RESPONSIVE DESIGN

### Desktop (>1024px)
- Columna izquierda: 40% (max 500px)
- Columna derecha: 60% (max 700px)
- Gap entre columnas: 4rem (64px)
- Miniaturas: 80px x 80px
- Imagen principal: max-height 600px

### Tablet (768px - 1024px)
- Columna izquierda: 45%
- Columna derecha: 55%
- Gap: 2rem (32px)
- Miniaturas: 70px x 70px
- Imagen principal: max-height 500px

### Mobile (<768px)
- Layout: Stack vertical (columna derecha arriba, izquierda abajo)
- Columna derecha: 100% width
- Columna izquierda: 100% width
- Gap: 2rem (32px)
- Miniaturas: 60px x 60px, scroll horizontal
- Imagen principal: max-height 400px
- Padding: 1rem (16px)

---

## COLORES Y ESTILOS

### Paleta
- Fondo: #000000 (negro)
- Texto principal: #ffffff (blanco)
- Texto secundario: #d1d5db (gris claro)
- Texto terciario: #9ca3af (gris medio)
- Acentos: #e5e7eb (platinum/plata)
- Hover: #f3f4f6 (gris muy claro)

### Tipografía
- Familia: Geist Sans
- Nombre: 2rem - 2.5rem, bold
- Categoría: 0.875rem, uppercase
- Descripción: 1rem, regular
- Especificaciones: 0.95rem, regular

### Espaciado
- Padding columna izquierda: 2rem (32px)
- Padding columna derecha: 2rem (32px)
- Gap entre elementos: 1.5rem (24px)
- Gap entre botones: 1rem (16px)

---

## ANIMACIONES

### Transiciones
- Cambio de imagen: fade 0.3s ease-in-out
- Hover botones: all 0.3s ease
- Hover miniaturas: all 0.3s ease
- Entrada de página: fade-in 0.5s ease

### Framer Motion (si aplica)
- Imagen principal: `fadeIn` al cargar
- Miniaturas: `staggerContainer` con delay
- Botones: `whileHover` scale 1.02
- Especificaciones: `fadeInUp` al scroll

---

## ACCESIBILIDAD

- Alt text en todas las imágenes
- Botones con aria-label descriptivo
- Contraste suficiente (WCAG AA)
- Keyboard navigation: Tab entre botones
- Focus visible en botones
- Miniaturas con role="button" si son clickeables

---

## ARCHIVOS A CREAR/MODIFICAR

1. **Crear:** `app/catalogo/producto/[slug]/page.tsx`
   - Componente principal de la página
   - Fetch de datos del producto
   - Layout de 2 columnas

2. **Crear:** `components/products/ProductDetail.tsx`
   - Componente reutilizable
   - Información del producto (columna izquierda)

3. **Crear:** `components/products/ProductImageGallery.tsx`
   - Galería de imágenes (columna derecha)
   - Lógica de cambio de imagen
   - Miniaturas interactivas

4. **Crear:** `components/products/RelatedProducts.tsx`
   - Grid de productos relacionados
   - 3-4 items

5. **Modificar:** `data/productos.ts`
   - Agregar información completa de cada producto
   - Especificaciones, descripciones largas

---

## DATOS REQUERIDOS POR PRODUCTO

```typescript
{
  id: string
  nombre: string
  slug: string
  categoria: string
  subcategoria?: string
  descripcion: string              // Corta (1-2 líneas)
  descripcionLarga: string         // Larga (párrafo completo)
  especificaciones: string[]       // Array de características
  imagenes: string[]               // Array de URLs
  destacado: boolean
  orden: number
}
```

---

## NOTAS IMPORTANTES

- Mantener consistencia con el diseño general (negro, blanco, platinum)
- Usar inline styles para evitar problemas con Tailwind 4 Beta
- Implementar lazy loading en imágenes
- Optimizar imágenes con Next.js Image component
- Mantener aspect ratio consistente en todas las imágenes
- Asegurar que funcione bien en móvil (stack vertical)
