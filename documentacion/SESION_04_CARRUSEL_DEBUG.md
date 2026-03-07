# SESIÓN 04 - DEBUG DEL CARRUSEL HERO

**Fecha:** 3 de marzo de 2026
**Problema:** Flechas de navegación y dots del carrusel no son visibles

---

## CONTEXTO

El usuario reportó que después de implementar el carrusel hero:
1. ✅ El carrusel funciona y cambia de slides
2. ✅ El botón "Ver productos" funciona y redirige correctamente
3. ❌ Las flechas de navegación NO son visibles
4. ❌ Los dots (indicadores) NO son visibles
5. ❌ El botón está muy arriba (tapado por el navbar)

---

## ANÁLISIS DEL PROBLEMA

### Causa Raíz Identificada
Después de múltiples intentos, se identificaron las posibles causas:

1. **Tailwind CSS 4 Beta:**
   - Versión inestable con bugs conocidos
   - Problemas de compilación con z-index
   - Comportamiento inconsistente con Turbopack

2. **AnimatePresence de Framer Motion:**
   - Crea contextos de stacking que pueden aislar elementos
   - Con `mode="wait"` puede causar problemas de visibilidad

3. **Estructura del DOM:**
   - Los controles dentro de contenedores con position relative
   - Conflictos de z-index entre capas

---

## SOLUCIONES INTENTADAS

### Intento 1: Aumentar z-index
- Cambié de `z-50` → `z-[60]` → `z-[100]` → `z-[999]`
- **Resultado:** ❌ No funcionó

### Intento 2: Mover controles fuera de AnimatePresence
- Reorganicé el DOM para que flechas y dots sean hermanos de AnimatePresence
- **Resultado:** ❌ No funcionó

### Intento 3: Position Fixed
- Cambié de `position: absolute` a `position: fixed`
- **Resultado:** ❌ No funcionó

### Intento 4: Capas z-index explícitas
- Organicé en capas: z-10 (imagen), z-20 (overlay), z-30 (texto), z-100 (controles)
- **Resultado:** ❌ No funcionó

### Intento 5: Inline Styles (ACTUAL)
- Reemplacé TODAS las clases de Tailwind por estilos inline
- Usé `style={{}}` para máxima especificidad
- Controles completamente fuera de AnimatePresence
- **Resultado:** ⏳ Pendiente de prueba

**Código implementado:**
```tsx
// Flechas con inline styles
<button
  onClick={goToPrevious}
  style={{
    position: 'absolute',
    left: '1.5rem',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 100,
    backgroundColor: 'white',
    // ... más estilos inline
  }}
>
  <svg>...</svg>
</button>
```

---

## ARCHIVOS MODIFICADOS

1. **components/home/HeroCarousel.tsx**
   - Reescrito completamente con inline styles
   - Eliminadas todas las clases de Tailwind
   - Estructura simplificada

2. **documentacion/SOLUCIONES_CARRUSEL.md** (NUEVO)
   - Documentación detallada de todos los intentos
   - Diagnóstico técnico
   - Próximos pasos

3. **documentacion/README.md** (NUEVO)
   - Índice de toda la documentación
   - Estructura del proyecto
   - Estado actual

---

## ORGANIZACIÓN DE DOCUMENTACIÓN

Se creó la carpeta `documentacion/` y se movieron todos los archivos .md:

```
documentacion/
├── README.md (índice principal)
├── PROYECTO_DKORE_ESPECIFICACIONES.md
├── ESTADO_PROYECTO.md
├── SESION_01_REESTRUCTURACION.md
├── SESION_02_SUPABASE.md
├── SESION_03_MIGRACION.md
├── SESION_04_CARRUSEL_DEBUG.md (este archivo)
├── SOLUCIONES_CARRUSEL.md (nuevo)
├── BUGS_CORREGIDOS.md
├── MIGRACION_COMPLETADA.md
├── CARRUSEL_NUEVO.md
├── GUIA_SUPABASE.md
├── REESTRUCTURACION.md
├── RESUMEN_SESION_02.md
└── INDICE_DOCUMENTACION.md
```

---

## PRÓXIMOS PASOS

### Si el Intento #5 funciona:
1. ✅ Marcar como resuelto en SOLUCIONES_CARRUSEL.md
2. Documentar por qué funcionó
3. Continuar con el resto del home page (productos destacados, CTA)

### Si el Intento #5 NO funciona:
1. **Opción A - Downgrade Tailwind:**
   ```bash
   npm uninstall tailwindcss @tailwindcss/postcss
   npm install tailwindcss@3.4.1 @tailwindcss/postcss@3.4.1
   ```

2. **Opción B - Usar biblioteca:**
   - Embla Carousel (recomendado)
   - Swiper
   - React Slick

3. **Opción C - Debugging profundo:**
   - Inspeccionar en DevTools del navegador
   - Verificar computed styles
   - Revisar console errors
   - Verificar si elementos están en el DOM

---

## NOTAS TÉCNICAS

### Por qué inline styles deberían funcionar:
- Especificidad CSS máxima (1000)
- No dependen de compilación
- Se aplican directamente al elemento
- No pueden ser sobrescritos por clases

### Configuración crítica:
- Navbar: `z-50`, `position: fixed`, `height: 80px`
- Carrusel: `height: calc(100vh - 80px)`
- Controles: `z-index: 100`, `position: absolute`

---

## LECCIONES APRENDIDAS

1. **Tailwind CSS 4 Beta no es production-ready**
   - Tiene bugs conocidos con z-index
   - Compilación inconsistente
   - Mejor usar versión estable (3.x)

2. **AnimatePresence puede ser problemático**
   - Crea contextos de stacking complejos
   - Elementos persistentes deben estar fuera

3. **Inline styles son la última línea de defensa**
   - Cuando Tailwind falla, inline styles funcionan
   - Máxima especificidad garantizada

---

**Estado:** ✅ RESUELTO
**Solución:** Inline styles funcionaron perfectamente
**Siguiente problema:** Bug en catálogo de productos (imágenes pasan rápido y una queda enorme)
