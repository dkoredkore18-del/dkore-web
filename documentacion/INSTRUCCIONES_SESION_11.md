# INSTRUCCIONES PARA SESIÓN 11: Agregar Imágenes para Productos Pendientes

## 📋 Resumen Rápido

**Objetivo**: Agregar imágenes para los 30 productos que aún no tienen URLs en Supabase.

**Tiempo Estimado**: 1-2 horas (depende de disponibilidad de imágenes)

**Archivos a Usar**:
- `scripts/upload-product-images-fixed.mjs` (script de carga)
- `data/productos.ts` (actualizar URLs)
- `.uploaded-product-images-cache.json` (cache automático)

## 🎯 Productos Pendientes

### Macetas (5 productos)
```
id: 13 - Maceta Selene Mini
id: 16 - Maceta Prisma Mini
id: 17 - Maceta Prisma Plus
id: 18 - Maceta Lyra Prisma
id: 19 - Maceta Orion Lineal
```

### Revestimientos 3D (12 productos)
```
id: 20 - Revestimiento 3D Abanico
id: 21 - Revestimiento 3D Burbuja
id: 22 - Revestimiento 3D Calicanto
id: 23 - Revestimiento 3D Cristal
id: 24 - Revestimiento 3D Elite
id: 25 - Revestimiento 3D Evolución
id: 26 - Revestimiento 3D Ladrillo
id: 27 - Revestimiento 3D Lucca
id: 28 - Revestimiento 3D Ola
id: 29 - Revestimiento 3D Órbita
id: 30 - Revestimiento 3D Geométrico
id: 31 - Revestimiento 3D Quadrat
```

### Muebles de Melamina (9 productos)
```
id: 32 - Closets
id: 33 - Cocina en Melamina
id: 34 - Walking Closet
id: 35 - Baño Flotante de Melamina
id: 36 - Centro de Entretenimiento
id: 37 - Librerías
id: 38 - Recibidores
id: 39 - Repisas
id: 40 - Veladores
```

### Material Eléctrico (9 productos)
```
id: 41 - Caja de Embutir
id: 42 - Conmutador
id: 43 - Interruptor Simple
id: 44 - Interruptor Doble
id: 45 - Interruptor Triple
id: 46 - Tomacorriente Simple
id: 47 - Timbre
id: 48 - Toma Telefónica
id: 49 - Tomacorriente con Interruptor
```

## 📁 Estructura de Carpetas Esperada

Las imágenes deben estar organizadas en:
```
C:\Users\admin\Desktop\dkore\dkore-web\imagenes usadas\
├── macetas/
│   ├── selene-mini/
│   ├── prisma-mini/
│   ├── prisma-plus/
│   ├── lyra-prisma/
│   └── orion-lineal/
├── revestimientos-3d/
│   ├── abanico/
│   ├── burbuja/
│   ├── calicanto/
│   ├── cristal/
│   ├── elite/
│   ├── evolucion/
│   ├── ladrillo/
│   ├── lucca/
│   ├── ola/
│   ├── orbita/
│   ├── geometrico/
│   └── quadrat/
├── muebles-melamina/
│   ├── closets/
│   ├── cocina/
│   ├── walking-closet/
│   ├── bano-flotante/
│   ├── centro-entretenimiento/
│   ├── librerias/
│   ├── recibidores/
│   ├── repisas/
│   └── veladores/
└── material-electrico/
    ├── caja-embutir/
    ├── conmutador/
    ├── interruptor-simple/
    ├── interruptor-doble/
    ├── interruptor-triple/
    ├── tomacorriente-simple/
    ├── timbre/
    ├── toma-telefonica/
    └── tomacorriente-interruptor/
```

## 🚀 Pasos a Seguir

### Paso 1: Preparar Imágenes
1. Obtener imágenes para los 30 productos pendientes
2. Organizar en carpetas según estructura anterior
3. Copiar a `C:\Users\admin\Desktop\dkore\dkore-web\imagenes usadas\`

### Paso 2: Ejecutar Script de Carga
```bash
node scripts/upload-product-images-fixed.mjs
```

**Resultado esperado**:
```
✅ Imágenes subidas: [número de nuevas imágenes]
⏭️  Imágenes saltadas: [imágenes ya cargadas]
❌ Errores: 0
📊 Total procesadas: [total]
```

### Paso 3: Obtener URLs del Cache
El script genera URLs automáticamente. Revisar:
- `.uploaded-product-images-cache.json` (archivo de cache)
- Salida del script (muestra URLs por carpeta)

### Paso 4: Actualizar `data/productos.ts`
Para cada producto, reemplazar:
```typescript
// ANTES
imagenes: ["/imagenes/producto.jpg"]

// DESPUÉS
imagenes: [
  "https://pfvgoumghwtkrinhxgwa.supabase.co/storage/v1/object/public/productos-imagenes/categoria/producto/imagen1.png",
  "https://pfvgoumghwtkrinhxgwa.supabase.co/storage/v1/object/public/productos-imagenes/categoria/producto/imagen2.png"
]
```

### Paso 5: Validar Cambios
```bash
# Verificar que no hay errores de TypeScript
npm run build
```

### Paso 6: Probar en Navegador
1. Ir a `/catalogo`
2. Hacer clic en cada producto
3. Verificar que las imágenes se muestren correctamente

## 📝 Ejemplo de Actualización

### Antes (Sesión 10)
```typescript
{ 
  id: 13, 
  nombre: "Maceta Selene Mini", 
  slug: "maceta-selene-mini", 
  descripcion: "Estética minimalista con acabado premium.", 
  descripcion_larga: "Maceta Selene Mini en fibra de vidrio...",
  imagenes: ["/imagenes/maceta-selene-mini.jpg"],  // ❌ URL local
  categoria: "macetas-fibra-vidrio" 
}
```

### Después (Sesión 11)
```typescript
{ 
  id: 13, 
  nombre: "Maceta Selene Mini", 
  slug: "maceta-selene-mini", 
  descripcion: "Estética minimalista con acabado premium.", 
  descripcion_larga: "Maceta Selene Mini en fibra de vidrio...",
  imagenes: [
    "https://pfvgoumghwtkrinhxgwa.supabase.co/storage/v1/object/public/productos-imagenes/macetas/selene-mini/selene-mini-blanco.png",
    "https://pfvgoumghwtkrinhxgwa.supabase.co/storage/v1/object/public/productos-imagenes/macetas/selene-mini/selene-mini-negro.png",
    "https://pfvgoumghwtkrinhxgwa.supabase.co/storage/v1/object/public/productos-imagenes/macetas/selene-mini/selene-mini-champan.png"
  ],  // ✅ URLs de Supabase
  categoria: "macetas-fibra-vidrio" 
}
```

## 🔍 Verificaciones Importantes

### ✅ Antes de Ejecutar el Script
- [ ] Todas las imágenes están en `C:\Users\admin\Desktop\dkore\dkore-web\imagenes usadas\`
- [ ] Las carpetas están nombradas correctamente (sin acentos, con guiones)
- [ ] Las imágenes tienen extensiones válidas (.jpg, .png, .webp, .gif)

### ✅ Después de Ejecutar el Script
- [ ] El script reporta 0 errores
- [ ] Las URLs están en el cache (`.uploaded-product-images-cache.json`)
- [ ] Las URLs son públicas (accesibles desde navegador)

### ✅ Después de Actualizar `data/productos.ts`
- [ ] No hay errores de TypeScript
- [ ] Todas las URLs apuntan a Supabase
- [ ] Las imágenes se muestran en las páginas de productos

## 💡 Tips Útiles

### Nombres de Carpetas
- Usar guiones en lugar de espacios: `selene-mini` (no `selene mini`)
- Eliminar acentos: `revestimiento` (no `revestimiento`)
- Minúsculas: `abanico` (no `Abanico`)

### Nombres de Archivos
- El script sanitiza automáticamente
- Puede usar acentos y espacios en nombres
- El script los convertirá a: `abanico-1.png`

### URLs en Supabase
- Formato: `https://pfvgoumghwtkrinhxgwa.supabase.co/storage/v1/object/public/productos-imagenes/{ruta}`
- Las rutas se sanitizan automáticamente
- Todas son públicas (no requieren autenticación)

## 📚 Documentos de Referencia

- `ESTADO_PROYECTO_ACTUAL.md` - Estado completo del proyecto
- `SESION_10_URLS_ACTUALIZADAS.md` - Cómo funcionan las URLs
- `SESION_09_SMART_IMAGE_UPLOAD.md` - Cómo funciona el script
- `scripts/upload-product-images-fixed.mjs` - Script de carga

## 🎯 Objetivo Final

Al completar esta sesión:
- ✅ 30 productos tendrán imágenes en Supabase
- ✅ Todas las URLs estarán actualizadas en `data/productos.ts`
- ✅ Las imágenes se mostrarán correctamente en las páginas de productos
- ✅ El proyecto tendrá 77 imágenes totales en Supabase

## ⏱️ Estimación de Tiempo

- Preparar imágenes: 30-60 minutos
- Ejecutar script: 2-5 minutos
- Actualizar `data/productos.ts`: 30-45 minutos
- Validar y probar: 15-30 minutos
- **Total**: 1-2 horas

## 🚨 Posibles Problemas

### Problema: "Ruta no encontrada"
**Solución**: Verificar que la ruta `C:\Users\admin\Desktop\dkore\dkore-web\imagenes usadas\` existe

### Problema: "No se encontraron imágenes"
**Solución**: Verificar que las imágenes están en las subcarpetas correctas

### Problema: "Error al subir imagen"
**Solución**: Verificar que la imagen no está corrupta y tiene extensión válida

### Problema: "URLs no aparecen en el cache"
**Solución**: Revisar la salida del script para ver si hubo errores

## 📞 Soporte

Si encuentras problemas:
1. Revisar la salida del script (buscar mensajes de error)
2. Consultar `SESION_09_SMART_IMAGE_UPLOAD.md` para detalles técnicos
3. Verificar que las imágenes están en la ruta correcta
4. Ejecutar el script nuevamente

---

**Próxima Sesión**: Sesión 12 - Implementar carrito de compras
**Documentos a Crear**: `SESION_11_IMAGENES_PENDIENTES.md`
**Documentos a Actualizar**: `ESTADO_PROYECTO_ACTUAL.md`, `INDICE_DOCUMENTACION.md`

¡Buena suerte! 🚀
