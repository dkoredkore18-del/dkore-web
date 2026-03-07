# BUG CATÁLOGO - IMÁGENES GIGANTES

**Fecha:** 3 de marzo de 2026
**Problema:** Al entrar al catálogo de mesas, las imágenes pasan rápido y una queda enorme

---

## DESCRIPCIÓN DEL BUG

Al navegar a `/catalogo/mesas-piedra-sinterizada`:
1. ❌ Las imágenes aparecen muy rápido en secuencia
2. ❌ Una imagen se queda gigante ocupando toda la página
3. ❌ Las cards no se separan correctamente
4. ❌ Layout roto

---

## CAUSA RAÍZ

### 1. Animaciones con `whileInView`
```tsx
// PROBLEMA: whileInView anima cada vez que el elemento entra en viewport
<motion.div
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.05 }} // Delay muy corto
>
```
- Con 9 productos, delay máximo era 0.45s
- Todas las animaciones se ejecutaban casi simultáneamente
- Causaba efecto visual de "parpadeo rápido"

### 2. Image con fill sin contenedor fijo
```tsx
// PROBLEMA: Sin aspect ratio fijo
<div className="relative h-80">
  <Image fill />
</div>
```
- `h-80` (320px) puede no aplicarse correctamente con Tailwind 4 Beta
- Sin aspect ratio, las imágenes pueden expandirse descontroladamente
- Causaba que una imagen se volviera gigante

### 3. Grid con Tailwind
```tsx
// PROBLEMA: Tailwind 4 Beta puede no compilar correctamente
<div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
```
- Posibles problemas de compilación con Turbopack
- Grid puede no aplicarse correctamente

---

## SOLUCIÓN IMPLEMENTADA

### 1. Cambiar a `animate` en lugar de `whileInView`
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ 
    duration: 0.5, 
    delay: Math.min(index * 0.1, 1.5), // Delay limitado a 1.5s
    ease: "easeOut"
  }}
>
```
**Beneficios:**
- Anima solo una vez al montar el componente
- Delay máximo de 1.5s evita esperas largas
- Transición suave con easeOut

### 2. Contenedor con aspect ratio fijo
```tsx
<div 
  style={{
    position: 'relative',
    width: '100%',
    paddingBottom: '125%', // Aspect ratio 4:5
    overflow: 'hidden',
    backgroundColor: '#f3f4f6' // Placeholder mientras carga
  }}
>
  <Image
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    style={{ objectFit: 'cover' }}
  />
</div>
```
**Beneficios:**
- `paddingBottom: '125%'` crea aspect ratio 4:5 consistente
- Todas las imágenes tienen el mismo tamaño
- Background gris mientras carga
- `sizes` optimizado para responsive

### 3. Grid con inline styles
```tsx
<div 
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem',
    width: '100%'
  }}
>
```
**Beneficios:**
- No depende de Tailwind CSS 4 Beta
- Grid responsive automático
- Garantiza separación correcta entre cards

### 4. Optimización de carga
```tsx
<Image
  loading={index < 4 ? "eager" : "lazy"}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```
**Beneficios:**
- Primeras 4 imágenes cargan inmediatamente
- Resto usa lazy loading para mejor performance
- Reduce tiempo de carga inicial

---

## ARCHIVOS MODIFICADOS

- `components/products/ProductGrid.tsx` - Reescrito completamente con inline styles

---

## RESULTADO

✅ **BUG RESUELTO**
- Las imágenes tienen tamaño consistente
- Las cards se separan correctamente
- Animaciones suaves y controladas
- Layout funciona perfectamente
- Mejor performance con lazy loading

---

## LECCIÓN APRENDIDA

**Tailwind CSS 4 Beta + Turbopack:**
- Puede causar problemas con layouts complejos
- Inline styles son más confiables para componentes críticos
- Aspect ratio con paddingBottom es técnica probada
- Limitar delays en animaciones evita efectos visuales extraños

---

**Estado:** ✅ RESUELTO
**Próximo problema:** Navbar - Buscador y menús desplegables
