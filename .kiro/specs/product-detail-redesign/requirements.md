# REQUIREMENTS - Página de Producto Individual (2 Columnas)

## Objetivo
Rediseñar la página de producto individual para mostrar información en 2 columnas:
- **Columna Izquierda (40%):** Información del producto
- **Columna Derecha (60%):** Galería de imágenes

---

## Información Requerida por Producto

### Datos Básicos
- ✅ Nombre del producto
- ✅ Slug (URL amigable)
- ✅ Categoría principal
- ✅ Subcategoría (si aplica)

### Descripciones
- ✅ Descripción corta (1-2 líneas para preview)
- ✅ Descripción larga (párrafo completo con detalles)

### Especificaciones
- ✅ Lista de características/especificaciones
- ✅ Materiales
- ✅ Dimensiones (si aplica)
- ✅ Colores disponibles (si aplica)

### Imágenes
- ✅ Múltiples imágenes del producto
- ✅ Imagen principal (primera de la lista)
- ✅ Miniaturas para galería
- ✅ Aspect ratio consistente

### Contacto
- ✅ Botón "Solicitar Cotización" → WhatsApp
- ✅ Botón "Contactar" → Página de contacto

---

## Categorías y Productos Esperados

### 1. Mesas en Piedra Sinterizada
**Productos esperados:**
- Belvedere Black
- Brera Fresh
- Calacata White
- Cosmopolita Ivory
- Estatuario Extra
- Labradorite Royal Blue Velvet
- LCP Pierre
- Lucca
- Onice Black

**Información específica:**
- Material: Piedra sinterizada
- Acabado: (especificar)
- Dimensiones: Largo x Ancho x Alto
- Peso: (si aplica)
- Colores: (especificar)

### 2. Macetas en Fibra de Vidrio
**Productos esperados:**
- Maceta Lunaris Mini
- Maceta Lunaris Medium
- Maceta Lunaris Large
- (Otros modelos según catálogo)

**Información específica:**
- Material: Fibra de vidrio
- Acabado: (mate, brillante, etc.)
- Dimensiones: Diámetro x Altura
- Peso: (si aplica)
- Colores disponibles: (lista)

### 3. Revestimientos 3D
**Productos esperados:**
- (Modelos según catálogo)

**Información específica:**
- Material: Revestimiento 3D
- Acabado: (especificar)
- Dimensiones: Largo x Ancho x Profundidad
- Cobertura: m² por caja
- Colores: (lista)

### 4. Muebles de Melamina
**Subcategorías:**
- Cocinas
- Closets
- Muebles de Entretenimiento
- Veladores
- Muebles de Baño

**Información específica:**
- Material: Melamina
- Acabado: (especificar)
- Dimensiones: Largo x Ancho x Alto
- Capacidad: (si aplica)
- Colores: (lista)

---

## Estructura de Datos

```typescript
interface Producto {
  id: string
  nombre: string
  slug: string
  categoria: 'mesas-piedra-sinterizada' | 'macetas-fibra-vidrio' | 'revestimientos-3d' | 'muebles-melamina'
  subcategoria?: 'cocinas' | 'closets' | 'muebles-entretenimiento' | 'veladores' | 'muebles-bano'
  descripcion: string              // Corta (1-2 líneas)
  descripcionLarga: string         // Larga (párrafo completo)
  especificaciones: {
    material: string
    acabado: string
    dimensiones: string
    peso?: string
    colores?: string[]
    capacidad?: string
    cobertura?: string
    [key: string]: any
  }
  imagenes: string[]               // URLs de imágenes
  destacado: boolean
  orden: number
  created_at: string
  updated_at: string
}
```

---

## Funcionalidades Requeridas

### Página de Producto
- ✅ Mostrar información en 2 columnas
- ✅ Galería de imágenes interactiva
- ✅ Cambio de imagen al click en miniatura
- ✅ Breadcrumbs de navegación
- ✅ Botones de acción (Cotización, Contactar)
- ✅ Productos relacionados (misma categoría)
- ✅ Responsive (desktop, tablet, mobile)

### Galería de Imágenes
- ✅ Imagen principal grande
- ✅ Miniaturas debajo/al lado
- ✅ Click en miniatura cambia imagen principal
- ✅ Transición suave entre imágenes
- ✅ Indicador visual de imagen seleccionada
- ✅ Scroll horizontal en móvil

### Información del Producto
- ✅ Nombre prominente
- ✅ Categoría/subcategoría
- ✅ Descripción clara
- ✅ Especificaciones en lista
- ✅ Botones de acción
- ✅ Información de contacto

### Productos Relacionados
- ✅ Grid de 3-4 productos
- ✅ Misma categoría
- ✅ Link a producto individual
- ✅ Imagen + nombre

---

## Comportamiento Esperado

### Desktop (>1024px)
- Columnas lado a lado (40% - 60%)
- Miniaturas debajo de imagen principal
- Scroll normal
- Hover effects en botones

### Tablet (768px - 1024px)
- Columnas lado a lado (45% - 55%)
- Miniaturas debajo, más pequeñas
- Scroll normal
- Hover effects en botones

### Mobile (<768px)
- Stack vertical (imagen arriba, info abajo)
- Miniaturas con scroll horizontal
- Botones full width
- Touch-friendly (áreas de click más grandes)

---

## Datos Faltantes a Obtener

De la página https://dkore1.whataform.com/ necesitamos:

1. **Descripciones completas** de cada producto
2. **Especificaciones técnicas** (materiales, dimensiones, etc.)
3. **Colores disponibles** por producto
4. **Imágenes de alta calidad** de cada producto
5. **Información de precios** (si aplica)
6. **Información de disponibilidad** (si aplica)

---

## Prioridad de Implementación

1. **Alta:** Estructura de 2 columnas + galería básica
2. **Alta:** Información del producto (nombre, descripción, especificaciones)
3. **Media:** Productos relacionados
4. **Media:** Breadcrumbs
5. **Baja:** Zoom en imagen
6. **Baja:** Animaciones avanzadas

---

## Notas Importantes

- Mantener consistencia con diseño actual (negro, blanco, platinum)
- Usar inline styles para evitar problemas con Tailwind 4 Beta
- Optimizar imágenes con Next.js Image component
- Implementar lazy loading
- Asegurar accesibilidad (alt text, keyboard navigation)
- Responsive desde mobile hasta desktop
- Performance: cargar solo imágenes necesarias
