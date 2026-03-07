# SESIÓN 13: Carrusel Automático en Página de Producto

## 🎯 Objetivo Completado
Implementar un carrusel automático de imágenes en la página de producto individual con rotación cada 5 segundos, flechas de navegación manual y pausa inteligente.

## ✅ Funcionalidades Implementadas

### 1. Auto-Rotación de Imágenes
- **Intervalo**: 5 segundos
- **Comportamiento**: Las imágenes avanzan automáticamente en bucle
- **Pausa**: Se pausa cuando el usuario interactúa (clic en flecha, miniatura o hover)
- **Reanudación**: Se reanuda cuando el mouse sale del área de la galería

### 2. Navegación Manual con Flechas
- **Flecha Izquierda (←)**: Retrocede a la imagen anterior
- **Flecha Derecha (→)**: Avanza a la siguiente imagen
- **Posición**: Laterales de la imagen principal
- **Estilo**: Botones circulares semi-transparentes con hover effect
- **Visibilidad**: Solo aparecen si hay más de 1 imagen

### 3. Indicador de Progreso
- **Formato**: "X / Total" (ej: "3 / 12")
- **Posición**: Debajo de la imagen principal
- **Actualización**: Se actualiza en tiempo real con cada cambio

### 4. Miniaturas Interactivas
- **Funcionalidad**: Click en miniatura cambia a esa imagen
- **Efecto**: Pausa auto-rotación al hacer click
- **Indicador**: Borde negro en miniatura activa

## 📊 Cambios Realizados

### Archivo Modificado: `components/products/ProductGallery.tsx`

#### Nuevos Imports
```typescript
import { useState, useEffect } from "react"
```

#### Nuevos Estados
```typescript
const [imagenActiva, setImagenActiva] = useState(0)
const [autoPlay, setAutoPlay] = useState(true)
```

#### Nuevo Hook useEffect
```typescript
useEffect(() => {
  if (!autoPlay || imagenes.length <= 1) return

  const intervalo = setInterval(() => {
    setImagenActiva((prev) => (prev + 1) % imagenes.length)
  }, 5000)

  return () => clearInterval(intervalo)
}, [autoPlay, imagenes.length])
```

#### Nuevas Funciones
- `handlePrevious()`: Navega a imagen anterior
- `handleNext()`: Navega a imagen siguiente
- `handleThumbnailClick()`: Maneja click en miniaturas
- `handleMouseEnter()`: Pausa auto-rotación
- `handleMouseLeave()`: Reanuda auto-rotación

#### Nuevos Elementos UI
1. **Botón Flecha Izquierda**
   - Posición: Absoluta, izquierda -50px
   - Tamaño: 40x40px circular
   - Color: Blanco sobre fondo semi-transparente
   - Hover: Fondo más oscuro

2. **Botón Flecha Derecha**
   - Posición: Absoluta, derecha -50px
   - Tamaño: 40x40px circular
   - Color: Blanco sobre fondo semi-transparente
   - Hover: Fondo más oscuro

3. **Indicador de Progreso**
   - Texto: "X / Total"
   - Color: Gris (#6b7280)
   - Tamaño: 14px
   - Margen superior: 16px

## 🎨 Características Técnicas

### Auto-Rotación
- **Intervalo**: 5000ms (5 segundos)
- **Ciclo**: Infinito (vuelve al inicio después de la última imagen)
- **Pausa**: Automática al interactuar
- **Reanudación**: Automática al salir del área

### Navegación
- **Circular**: Última imagen → Primera imagen (y viceversa)
- **Instantánea**: Sin transiciones de fade (cambio directo)
- **Responsiva**: Funciona en todos los tamaños de pantalla

### Rendimiento
- **Cleanup**: El intervalo se limpia al desmontar o cambiar dependencias
- **Optimización**: Solo se ejecuta si hay más de 1 imagen
- **Memory Leak Prevention**: useEffect retorna función de limpieza

## 🖼️ Comportamiento del Usuario

### Escenario 1: Usuario Solo Observa
1. Página carga con primera imagen
2. Auto-rotación comienza (5 segundos)
3. Imágenes avanzan automáticamente
4. Indicador actualiza en tiempo real

### Escenario 2: Usuario Usa Flechas
1. Usuario hace click en flecha derecha
2. Auto-rotación se pausa
3. Imagen cambia inmediatamente
4. Usuario puede seguir navegando manualmente
5. Al salir del área, auto-rotación se reanuda

### Escenario 3: Usuario Usa Miniaturas
1. Usuario hace click en miniatura
2. Auto-rotación se pausa
3. Imagen principal cambia
4. Miniatura se destaca con borde negro
5. Al salir del área, auto-rotación se reanuda

### Escenario 4: Usuario Hace Hover
1. Usuario mueve mouse sobre galería
2. Auto-rotación se pausa
3. Flechas se hacen más visibles (hover effect)
4. Usuario puede navegar manualmente
5. Al salir, auto-rotación se reanuda

## 📐 Especificaciones de Estilo

### Flechas
- **Tamaño**: 40x40px
- **Forma**: Circular (border-radius: 50%)
- **Color de fondo**: rgba(0, 0, 0, 0.5)
- **Color de texto**: Blanco
- **Hover**: rgba(0, 0, 0, 0.8)
- **Transición**: 0.3s
- **Z-index**: 10

### Indicador
- **Tamaño de fuente**: 14px
- **Color**: #6b7280
- **Alineación**: Centro
- **Margen**: 16px superior

### Miniaturas
- **Tamaño**: 80x80px
- **Borde activo**: 2px solid black
- **Borde inactivo**: 2px solid #d1d5db
- **Escala activa**: 1.1
- **Transición**: 0.2s

## 🔧 Cómo Funciona

### 1. Inicialización
```
- imagenActiva = 0 (primera imagen)
- autoPlay = true (auto-rotación activa)
```

### 2. Auto-Rotación
```
Cada 5 segundos:
  imagenActiva = (imagenActiva + 1) % imagenes.length
```

### 3. Navegación Manual
```
Flecha Izquierda:
  autoPlay = false
  imagenActiva = (imagenActiva - 1 + length) % length

Flecha Derecha:
  autoPlay = false
  imagenActiva = (imagenActiva + 1) % length
```

### 4. Pausa/Reanudación
```
Mouse Enter: autoPlay = false
Mouse Leave: autoPlay = true
```

## 📋 Próximos Pasos

1. ✅ Implementar auto-rotación cada 5 segundos
2. ✅ Agregar flechas de navegación
3. ✅ Agregar indicador de progreso
4. ✅ Implementar pausa inteligente
5. ⏳ Agregar transiciones de fade (opcional)
6. ⏳ Agregar teclado (← y → para navegar)
7. ⏳ Agregar indicadores de puntos (dots)
8. ⏳ Agregar soporte para touch/swipe en móvil

## 🎯 Casos de Uso

### Caso 1: Producto con 1 Imagen
- Flechas: No aparecen
- Indicador: No aparece
- Auto-rotación: No se ejecuta

### Caso 2: Producto con 2-5 Imágenes
- Flechas: Aparecen
- Indicador: Aparece
- Auto-rotación: Funciona normalmente

### Caso 3: Producto con 10+ Imágenes
- Flechas: Aparecen
- Indicador: Aparece
- Auto-rotación: Funciona normalmente
- Miniaturas: Scroll vertical

## 🐛 Consideraciones Técnicas

### Performance
- ✅ useEffect se limpia correctamente
- ✅ No hay memory leaks
- ✅ Intervalo se cancela al desmontar
- ✅ Dependencias correctas en useEffect

### Accesibilidad
- ⏳ Agregar aria-labels a botones
- ⏳ Agregar soporte para teclado
- ⏳ Agregar role="region" a galería

### Responsive
- ✅ Flechas se posicionan correctamente
- ✅ Funciona en móvil (aunque sin swipe)
- ✅ Miniaturas se adaptan

## 📁 Archivos Afectados

- ✅ `components/products/ProductGallery.tsx` - Refactorizado completamente

## 🎨 Comparación con Carrusel del Inicio

| Característica | Carrusel Inicio | Carrusel Producto |
|---|---|---|
| Auto-rotación | ✅ Sí | ✅ Sí |
| Intervalo | 5 segundos | 5 segundos |
| Flechas | ✅ Sí | ✅ Sí |
| Miniaturas | ❌ No | ✅ Sí |
| Indicador | ✅ Dots | ✅ Contador |
| Pausa inteligente | ✅ Sí | ✅ Sí |
| Transiciones | ✅ Fade | ❌ Directas |

---

**Sesión completada**: Carrusel automático implementado en página de producto con navegación manual y pausa inteligente.
