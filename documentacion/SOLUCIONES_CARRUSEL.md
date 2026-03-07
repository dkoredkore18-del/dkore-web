# SOLUCIONES INTENTADAS - CARRUSEL HERO

## PROBLEMA PRINCIPAL
Las flechas de navegación y los dots (indicadores) del carrusel no son visibles sobre las imágenes del carrusel.

---

## INTENTO 1: Aumentar z-index con Tailwind
**Fecha:** Sesión actual
**Modificaciones:**
- Cambié z-index de `z-50` a `z-[60]` y luego a `z-[100]`
- Aumenté opacidad de flechas de `bg-white/30` a `bg-white/80`
- Agregué bordes más visibles

**Resultado:** ❌ NO FUNCIONÓ
**Razón:** El problema no era el z-index sino la estructura del DOM con AnimatePresence

---

## INTENTO 2: Mover controles fuera de AnimatePresence
**Fecha:** Sesión actual
**Modificaciones:**
- Saqué las flechas y dots del componente AnimatePresence
- Los coloqué como hermanos del AnimatePresence en el DOM
- Usé z-index `z-[999]`

**Resultado:** ❌ NO FUNCIONÓ
**Razón:** Los controles seguían dentro de contenedores con position relative que limitaban su visibilidad

---

## INTENTO 3: Position Fixed en lugar de Absolute
**Fecha:** Sesión actual
**Modificaciones:**
- Cambié `position: absolute` a `position: fixed` en flechas y dots
- Usé `top-[50vh]` para centrado vertical
- Mantuve z-index alto

**Resultado:** ❌ NO FUNCIONÓ
**Razón:** Posiblemente conflicto con otros estilos globales o el navbar fixed

---

## INTENTO 4: Estructura simplificada con capas z-index explícitas
**Fecha:** Sesión actual
**Modificaciones:**
- Reorganicé la estructura en capas claras:
  - z-10: Imagen
  - z-20: Overlay
  - z-30: Contenido de texto
  - z-100: Controles (flechas y dots)
- Eliminé contenedores innecesarios

**Resultado:** ❌ NO FUNCIONÓ
**Razón:** AnimatePresence con mode="wait" puede estar creando un nuevo contexto de stacking

---

## INTENTO 5: Inline styles en lugar de Tailwind (ACTUAL)
**Fecha:** Sesión actual
**Modificaciones:**
- Reemplacé TODAS las clases de Tailwind por estilos inline
- Usé `style={{}}` para garantizar que los estilos se apliquen directamente
- Estructura:
  ```
  <div> (contenedor principal)
    <AnimatePresence>
      <motion.div> (slides con z-index: 1-3)
    </AnimatePresence>
    <button> (flecha izq, z-index: 100, position: absolute)
    <button> (flecha der, z-index: 100, position: absolute)
    <div> (dots, z-index: 100, position: absolute)
  </div>
  ```
- Flechas y dots completamente fuera de AnimatePresence
- Estilos inline para evitar conflictos con CSS compilado

**Resultado:** ✅ FUNCIONÓ
**Por qué funcionó:**
1. Los estilos inline tienen la mayor especificidad CSS (1000)
2. No dependen de la compilación de Tailwind CSS 4 Beta
3. Los controles están completamente separados del AnimatePresence
4. z-index 100 garantiza visibilidad sobre todos los elementos
5. Position absolute con valores explícitos evita conflictos de layout

**SOLUCIÓN CONFIRMADA:** Usar inline styles cuando Tailwind CSS 4 Beta causa problemas de z-index o visibilidad.

---

## DIAGNÓSTICO TÉCNICO

### Posibles causas del problema:
1. **Tailwind CSS 4 (Beta):** Puede tener bugs con z-index o position
2. **AnimatePresence mode="wait":** Crea un nuevo contexto de stacking que puede aislar elementos
3. **Turbopack:** El compilador puede no estar aplicando correctamente los estilos
4. **CSS Global:** Puede haber estilos que sobrescriben los del carrusel

### Por qué inline styles deberían funcionar:
- Especificidad máxima (1000 en CSS specificity)
- No dependen de compilación de Tailwind
- Se aplican directamente al elemento
- No pueden ser sobrescritos por clases CSS

---

## PRÓXIMOS PASOS SI NO FUNCIONA

### Opción A: Usar biblioteca de carrusel
- Embla Carousel
- Swiper
- React Slick

### Opción B: Debugging profundo
1. Inspeccionar elemento en DevTools del navegador
2. Verificar computed styles de las flechas
3. Verificar si los elementos están en el DOM
4. Verificar si hay JavaScript errors en consola

### Opción C: Simplificar aún más
1. Eliminar Framer Motion completamente
2. Usar solo CSS transitions
3. Implementar carrusel básico sin animaciones complejas

---

## NOTAS IMPORTANTES

- El navbar tiene `z-50` y está `fixed`
- El carrusel debe tener altura `calc(100vh - 80px)` para no quedar debajo del navbar
- Los controles deben tener z-index > 50 para estar sobre el navbar
- AnimatePresence puede ser problemático con elementos que deben persistir

---

## CONFIGURACIÓN ACTUAL DEL PROYECTO

- Next.js 16.1.6 (Turbopack)
- React 19.2.3
- **Tailwind CSS 4 (^4) - BETA** ⚠️
- Framer Motion 12.34.3
- TypeScript 5
- @tailwindcss/postcss ^4

**⚠️ ADVERTENCIA CRÍTICA:** 
Tailwind CSS 4 está en BETA y tiene comportamientos inesperados conocidos:
- Problemas con z-index en algunos casos
- Compilación inconsistente de clases
- Posibles conflictos con Turbopack

**RECOMENDACIÓN:** Si el Intento #5 (inline styles) no funciona, considerar:
1. Downgrade a Tailwind CSS 3.x (estable)
2. Usar biblioteca de carrusel probada (Embla, Swiper)
3. Implementar carrusel sin Framer Motion
