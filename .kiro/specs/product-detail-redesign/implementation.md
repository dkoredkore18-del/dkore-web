# IMPLEMENTATION - Página de Producto Individual (2 Columnas)

## Tareas de Implementación

### FASE 1: Estructura Base

#### Task 1.1: Crear página de producto
- [ ] Crear archivo: `app/catalogo/producto/[slug]/page.tsx`
- [ ] Implementar layout de 2 columnas con inline styles
- [ ] Agregar breadcrumbs
- [ ] Fetch de datos del producto desde `data/productos.ts`
- [ ] Manejo de producto no encontrado (404)

#### Task 1.2: Crear componente ProductDetail
- [ ] Crear archivo: `components/products/ProductDetail.tsx`
- [ ] Mostrar nombre del producto
- [ ] Mostrar categoría/subcategoría
- [ ] Mostrar descripción
- [ ] Mostrar especificaciones en lista
- [ ] Agregar botones (Cotización, Contactar)
- [ ] Agregar información de contacto

#### Task 1.3: Crear componente ProductImageGallery
- [ ] Crear archivo: `components/products/ProductImageGallery.tsx`
- [ ] Mostrar imagen principal
- [ ] Mostrar miniaturas
- [ ] Implementar lógica de cambio de imagen
- [ ] Agregar transiciones suaves
- [ ] Responsive (desktop, tablet, mobile)

---

### FASE 2: Galería Interactiva

#### Task 2.1: Interactividad de miniaturas
- [ ] Click en miniatura cambia imagen principal
- [ ] Miniatura seleccionada se marca con borde
- [ ] Transición suave entre imágenes (fade 0.3s)
- [ ] Scroll automático a miniatura si está fuera de vista

#### Task 2.2: Responsive de galería
- [ ] Desktop: miniaturas debajo (80x80px)
- [ ] Tablet: miniaturas debajo (70x70px)
- [ ] Mobile: miniaturas scroll horizontal (60x60px)
- [ ] Imagen principal se adapta al ancho

#### Task 2.3: Hover effects
- [ ] Hover en miniatura: borde blanco, scale 1.05
- [ ] Hover en imagen principal: cursor zoom (opcional)
- [ ] Transiciones suaves (0.3s)

---

### FASE 3: Información del Producto

#### Task 3.1: Estructura de datos
- [ ] Actualizar `data/productos.ts` con estructura completa
- [ ] Agregar descripciones largas
- [ ] Agregar especificaciones
- [ ] Agregar múltiples imágenes por producto
- [ ] Validar que todos los productos tengan datos

#### Task 3.2: Mostrar información
- [ ] Nombre del producto (h1, grande, bold)
- [ ] Categoría (pequeño, gris, uppercase)
- [ ] Descripción (párrafo normal)
- [ ] Especificaciones (lista con bullets)
- [ ] Información de contacto (pequeño, gris)

#### Task 3.3: Botones de acción
- [ ] Botón "Solicitar Cotización" (blanco, full width)
  - Click → abre WhatsApp con mensaje pre-llenado
  - Mensaje: "Hola, estoy interesado en [nombre producto]"
- [ ] Botón "Contactar" (borde blanco, full width)
  - Click → redirige a `/contacto`

---

### FASE 4: Productos Relacionados

#### Task 4.1: Crear componente RelatedProducts
- [ ] Crear archivo: `components/products/RelatedProducts.tsx`
- [ ] Mostrar 3-4 productos de la misma categoría
- [ ] Excluir el producto actual
- [ ] Grid responsive
- [ ] Link a producto individual

#### Task 4.2: Integrar en página
- [ ] Agregar componente al final de la página
- [ ] Fetch de productos relacionados
- [ ] Mostrar título "Productos Relacionados"

---

### FASE 5: Responsive y Estilos

#### Task 5.1: Desktop (>1024px)
- [ ] Columnas lado a lado (40% - 60%)
- [ ] Gap: 4rem (64px)
- [ ] Miniaturas: 80x80px
- [ ] Imagen principal: max-height 600px
- [ ] Padding: 2rem

#### Task 5.2: Tablet (768px - 1024px)
- [ ] Columnas lado a lado (45% - 55%)
- [ ] Gap: 2rem (32px)
- [ ] Miniaturas: 70x70px
- [ ] Imagen principal: max-height 500px
- [ ] Padding: 1.5rem

#### Task 5.3: Mobile (<768px)
- [ ] Stack vertical (imagen arriba, info abajo)
- [ ] Full width
- [ ] Miniaturas: 60x60px, scroll horizontal
- [ ] Imagen principal: max-height 400px
- [ ] Padding: 1rem
- [ ] Botones full width

#### Task 5.4: Estilos generales
- [ ] Fondo: negro (#000000)
- [ ] Texto: blanco (#ffffff)
- [ ] Acentos: platinum (#e5e7eb)
- [ ] Usar inline styles (evitar Tailwind 4 Beta)
- [ ] Transiciones suaves (0.3s)

---

### FASE 6: Optimizaciones

#### Task 6.1: Performance
- [ ] Lazy loading de imágenes
- [ ] Next.js Image component
- [ ] Optimizar tamaño de imágenes
- [ ] Caché de datos

#### Task 6.2: Accesibilidad
- [ ] Alt text en todas las imágenes
- [ ] Aria-label en botones
- [ ] Keyboard navigation (Tab)
- [ ] Focus visible
- [ ] Contraste WCAG AA

#### Task 6.3: SEO
- [ ] Metadata dinámica (title, description)
- [ ] Open Graph tags
- [ ] Structured data (JSON-LD)
- [ ] Canonical URL

---

## Orden de Ejecución Recomendado

1. **Primero:** Task 1.1, 1.2, 1.3 (estructura base)
2. **Segundo:** Task 3.1 (datos completos)
3. **Tercero:** Task 2.1, 2.2, 2.3 (galería interactiva)
4. **Cuarto:** Task 3.2, 3.3 (información y botones)
5. **Quinto:** Task 4.1, 4.2 (productos relacionados)
6. **Sexto:** Task 5.1, 5.2, 5.3, 5.4 (responsive y estilos)
7. **Séptimo:** Task 6.1, 6.2, 6.3 (optimizaciones)

---

## Archivos a Crear

```
app/
├── catalogo/
│   └── producto/
│       └── [slug]/
│           └── page.tsx                    # Página principal

components/
├── products/
│   ├── ProductDetail.tsx                   # Información (columna izquierda)
│   ├── ProductImageGallery.tsx             # Galería (columna derecha)
│   └── RelatedProducts.tsx                 # Productos relacionados

data/
└── productos.ts                            # Actualizar con datos completos
```

---

## Archivos a Modificar

```
data/
└── productos.ts                            # Agregar descripciones, especificaciones, imágenes

lib/
└── constants.ts                            # Agregar constantes si es necesario
```

---

## Dependencias Necesarias

- ✅ Next.js (ya instalado)
- ✅ React (ya instalado)
- ✅ React Icons (ya instalado)
- ✅ Framer Motion (ya instalado, opcional para animaciones)

---

## Notas Técnicas

### Inline Styles vs Tailwind
- Usar inline styles para evitar problemas con Tailwind 4 Beta
- Ejemplo:
  ```typescript
  style={{
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr',
    gap: '4rem',
    backgroundColor: 'black',
    color: 'white'
  }}
  ```

### Responsive sin Tailwind
- Usar `window.innerWidth` para detectar breakpoints
- O usar media queries en inline styles
- Ejemplo:
  ```typescript
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  ```

### Imágenes
- Usar Next.js Image component
- Lazy loading automático
- Optimización automática
- Ejemplo:
  ```typescript
  import Image from 'next/image'
  
  <Image
    src={imagenUrl}
    alt={nombre}
    width={600}
    height={600}
    priority={false}
  />
  ```

### Datos de Productos
- Estructura en `data/productos.ts`
- Fetch en página con `getProductBySlug(slug)`
- Validar que exista el producto

---

## Criterios de Aceptación

- ✅ Página muestra 2 columnas (40% - 60%)
- ✅ Galería de imágenes funcional
- ✅ Click en miniatura cambia imagen
- ✅ Información del producto visible
- ✅ Botones de acción funcionales
- ✅ Productos relacionados mostrados
- ✅ Responsive en mobile, tablet, desktop
- ✅ Transiciones suaves
- ✅ Accesible (alt text, keyboard nav)
- ✅ Performance optimizado
