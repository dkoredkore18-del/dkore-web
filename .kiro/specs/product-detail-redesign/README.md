# SPEC: Página de Producto Individual - Layout 2 Columnas

## 📋 Resumen

Rediseñar la página de producto individual para mostrar información en un layout de 2 columnas:
- **Columna Izquierda (40%):** Información del producto (nombre, descripción, especificaciones, botones)
- **Columna Derecha (60%):** Galería de imágenes interactiva

---

## 🎯 Objetivo

Mejorar la experiencia del usuario al visualizar productos, permitiendo ver la información y las imágenes de forma clara y organizada, con una galería interactiva que permita cambiar entre múltiples imágenes.

---

## 📁 Archivos del Spec

1. **design.md** - Diseño técnico detallado
   - Layout de 2 columnas
   - Estructura visual
   - Estilos específicos
   - Responsive design
   - Animaciones

2. **requirements.md** - Requerimientos funcionales
   - Información requerida por producto
   - Categorías y productos esperados
   - Estructura de datos
   - Funcionalidades requeridas
   - Comportamiento esperado

3. **implementation.md** - Plan de implementación
   - Tareas específicas (6 fases)
   - Orden de ejecución
   - Archivos a crear/modificar
   - Criterios de aceptación

---

## 🚀 Inicio Rápido

### Paso 1: Revisar Design
Lee `design.md` para entender la estructura visual y los estilos.

### Paso 2: Revisar Requirements
Lee `requirements.md` para entender qué información necesita cada producto.

### Paso 3: Seguir Implementation
Sigue `implementation.md` para implementar las tareas en orden.

---

## 📊 Estructura Visual

```
┌─────────────────────────────────────────────────────┐
│                    NAVBAR                           │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────────┬──────────────────────────┐   │
│  │  INFORMACIÓN     │      IMÁGENES            │   │
│  │  (40%)           │      (60%)               │   │
│  │                  │                          │   │
│  │ • Nombre         │  [Imagen Principal]      │   │
│  │ • Categoría      │                          │   │
│  │ • Descripción    │  [Mini] [Mini] [Mini]    │   │
│  │ • Especificaciones                          │   │
│  │ • Botones        │                          │   │
│  │                  │                          │   │
│  └──────────────────┴──────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │    PRODUCTOS RELACIONADOS (Grid 3-4)        │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
├─────────────────────────────────────────────────────┤
│                    FOOTER                           │
└─────────────────────────────────────────────────────┘
```

---

## 🎨 Paleta de Colores

- **Fondo:** #000000 (negro)
- **Texto principal:** #ffffff (blanco)
- **Texto secundario:** #d1d5db (gris claro)
- **Acentos:** #e5e7eb (platinum/plata)

---

## 📱 Responsive

- **Desktop (>1024px):** Columnas lado a lado
- **Tablet (768px-1024px):** Columnas lado a lado, más compacto
- **Mobile (<768px):** Stack vertical (imagen arriba, info abajo)

---

## ✅ Checklist de Implementación

### Fase 1: Estructura Base
- [ ] Crear página de producto
- [ ] Crear componente ProductDetail
- [ ] Crear componente ProductImageGallery

### Fase 2: Galería Interactiva
- [ ] Implementar cambio de imagen
- [ ] Agregar transiciones suaves
- [ ] Responsive de galería

### Fase 3: Información del Producto
- [ ] Actualizar datos de productos
- [ ] Mostrar información completa
- [ ] Agregar botones de acción

### Fase 4: Productos Relacionados
- [ ] Crear componente RelatedProducts
- [ ] Integrar en página

### Fase 5: Responsive y Estilos
- [ ] Desktop
- [ ] Tablet
- [ ] Mobile
- [ ] Estilos generales

### Fase 6: Optimizaciones
- [ ] Performance
- [ ] Accesibilidad
- [ ] SEO

---

## 🔗 Referencias

- Especificaciones del proyecto: `documentacion/PROYECTO_DKORE_ESPECIFICACIONES.md`
- Datos de productos: `data/productos.ts`
- Componentes existentes: `components/products/`

---

## 📝 Notas Importantes

1. **Usar inline styles** para evitar problemas con Tailwind 4 Beta
2. **Optimizar imágenes** con Next.js Image component
3. **Implementar lazy loading** para mejor performance
4. **Asegurar accesibilidad** (alt text, keyboard navigation)
5. **Mantener consistencia** con el diseño actual (negro, blanco, platinum)

---

## 🎯 Próximos Pasos

1. Revisar los 3 archivos del spec (design, requirements, implementation)
2. Comenzar con Fase 1 (estructura base)
3. Seguir el orden de ejecución recomendado
4. Validar cada tarea antes de pasar a la siguiente

---

**Estado:** Spec completado y listo para implementación
**Última actualización:** Hoy
**Versión:** 1.0
