# Sesión 7: Carga de Imágenes de Macetas a Supabase Storage

## 🎯 Objetivo Completado
Subir 33 imágenes de macetas a Supabase Storage y actualizar `data/productos.ts` con las URLs públicas.

## ✅ Tareas Realizadas

### 1. Creación de Scripts de Carga
Se crearon dos scripts para automatizar la carga de imágenes:

**`scripts/upload-maceta-images.mjs`**
- Script básico para subir imágenes
- Lee variables de entorno
- Sube archivos a Supabase Storage

**`scripts/upload-maceta-images-v2.mjs`** (versión final)
- Carga variables de entorno desde `.env.local`
- Mapea carpetas locales a slugs de productos
- Genera URLs públicas automáticamente
- Muestra resumen detallado de carga

### 2. Estructura de Carpetas Encontrada
```
C:\Users\admin\Desktop\dkore\dkore-web\imagenes usadas\macetas\
├── lunaris mini/          (12 imágenes)
├── lunaris normal/        (12 imágenes)
├── lunaris plus/          (3 imágenes)
├── selene normal/         (3 imágenes)
└── selene plus/           (3 imágenes)
```

### 3. Ejecución del Script
```bash
node scripts/upload-maceta-images-v2.mjs
```

**Resultado:**
- ✅ 33 imágenes subidas exitosamente
- ❌ 0 errores
- 📁 5 productos con imágenes

### 4. Imágenes Subidas por Producto

#### Maceta Lunaris Mini (12 imágenes)
- lunaris-mini-blanco.png
- lunaris-mini-champan.png
- lunaris-mini-negro.png
- lunaris-mini1.png a lunaris-mini9.png

#### Maceta Lunaris Normal (12 imágenes)
- lunaris-normal-blanco.png
- lunaris-normal-champan.png
- lunaris-normal-negra.png
- lunaris-normal1.png a lunaris-normal9.png

#### Maceta Lunaris Plus (3 imágenes)
- lunaris-plus-blanco.png
- lunaris-plus-champan.png
- lunaris-plus-negro.png

#### Maceta Selene Normal (3 imágenes)
- selene-normal-blanco.png
- selene-normal-champan.png
- selene-normal-negro.png

#### Maceta Selene Plus (3 imágenes)
- selene-plus-blanco.png
- selene-plus-champane.png
- selene-plus-negro.png

### 5. Actualización de data/productos.ts
Se actualizaron 5 productos con URLs públicas de Supabase:

```typescript
{
  id: 10,
  nombre: "Maceta Lunaris Mini",
  slug: "maceta-lunaris-mini",
  imagenes: [
    "https://pfvgoumghwtkrinhxgwa.supabase.co/storage/v1/object/public/productos-imagenes/maceta-lunaris-mini/lunaris-mini-blanco.png",
    // ... 11 URLs más
  ]
}
```

Todos los productos ahora tienen:
- ✅ URLs públicas de Supabase
- ✅ Múltiples imágenes (3-12 por producto)
- ✅ Acceso directo desde la página de producto

## 📊 Estadísticas

| Métrica | Valor |
|---------|-------|
| Total de imágenes | 33 |
| Productos actualizados | 5 |
| Imágenes por producto | 3-12 |
| Errores de carga | 0 |
| Bucket Supabase | productos-imagenes |

## 🔗 URLs de Supabase Storage

Todas las imágenes están disponibles en:
```
https://pfvgoumghwtkrinhxgwa.supabase.co/storage/v1/object/public/productos-imagenes/
```

Estructura:
```
productos-imagenes/
├── maceta-lunaris-mini/
├── maceta-lunaris-normal/
├── maceta-lunaris-plus/
├── maceta-selene-normal/
└── maceta-selene-plus/
```

## 🎨 Visualización en la Página

La página de producto individual ahora muestra:
- ✅ Galería de imágenes con múltiples fotos
- ✅ Primera imagen como miniatura principal
- ✅ Todas las imágenes disponibles para ver
- ✅ URLs públicas de Supabase Storage

### Ejemplo de URL
```
https://pfvgoumghwtkrinhxgwa.supabase.co/storage/v1/object/public/productos-imagenes/maceta-lunaris-mini/lunaris-mini-blanco.png
```

## 🔧 Archivos Modificados

### Creados
- `scripts/upload-maceta-images.mjs` - Script inicial
- `scripts/upload-maceta-images-v2.mjs` - Script final (usado)
- `app/api/upload-images/route.ts` - API route para futuras cargas

### Actualizados
- `data/productos.ts` - 5 productos con URLs de Supabase

## 📝 Próximos Pasos

### Corto Plazo
1. **Cargar imágenes de otros productos**
   - Mesas en piedra sinterizada
   - Revestimientos 3D
   - Muebles de melamina
   - Material eléctrico

2. **Mejorar galería de imágenes**
   - Agregar zoom
   - Agregar vista previa de miniaturas
   - Agregar navegación entre imágenes

### Mediano Plazo
1. **Optimizar imágenes**
   - Convertir a WebP
   - Comprimir tamaño
   - Agregar lazy loading

2. **Agregar más funcionalidades**
   - Comparación de productos
   - Galería 360°
   - Zoom interactivo

## 💡 Notas Técnicas

### Configuración de Supabase Storage
- Bucket: `productos-imagenes`
- Política: PUBLIC (acceso público)
- Tipos permitidos: jpg, jpeg, png, webp

### Variables de Entorno Necesarias
```env
NEXT_PUBLIC_SUPABASE_URL=https://pfvgoumghwtkrinhxgwa.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Cómo Ejecutar el Script
```bash
# Desde la carpeta del proyecto
node scripts/upload-maceta-images-v2.mjs
```

## ✨ Resultado Final

Las imágenes de macetas están ahora:
- ✅ Almacenadas en Supabase Storage
- ✅ Accesibles públicamente
- ✅ Integradas en `data/productos.ts`
- ✅ Visibles en la página de producto
- ✅ Organizadas por producto

---

**Sesión:** 7  
**Fecha:** 2026-03-04  
**Estado:** ✅ Completado  
**Próxima Sesión:** Cargar imágenes de otros productos
