# Sesión 9: Sistema Inteligente de Carga de Imágenes

## 🎯 Objetivo Completado
Crear un sistema inteligente que:
- Escanea recursivamente `C:\Users\admin\Desktop\dkore\dkore-web`
- Sube todas las imágenes encontradas a Supabase Storage
- Mantiene un cache para evitar duplicados
- Solo sube imágenes nuevas en futuras ejecuciones

## ✅ Tareas Realizadas

### 1. Creación del Script Inteligente
Se creó `scripts/upload-images-smart.mjs` que:
- ✅ Escanea recursivamente todas las carpetas
- ✅ Encuentra imágenes (.jpg, .jpeg, .png, .webp, .gif)
- ✅ Calcula hash MD5 de cada archivo
- ✅ Mantiene cache de imágenes subidas
- ✅ Solo sube imágenes nuevas (evita duplicados)
- ✅ Organiza imágenes por carpeta en Supabase
- ✅ Genera URLs públicas automáticamente

### 2. Ejecución del Script
```bash
node scripts/upload-images-smart.mjs
```

**Resultado:**
- ✅ Todas las imágenes subidas exitosamente
- ❌ 0 errores
- 📁 Estructura de carpetas preservada
- 💾 Cache guardado para futuras ejecuciones

### 3. Imágenes Subidas

#### Estructura en Supabase Storage
```
productos-imagenes/
├── dkore/.next/dev/cache/images/     (cientos de imágenes de cache)
├── dkore/public/categorias/          (portadas de categorías)
├── dkore/public/hero/                (imágenes hero)
├── dkore/public/imagenes/            (imágenes de productos)
├── dkore/public/                     (logo y otros)
├── imagenes usadas/macetas/          (macetas por tamaño)
├── imagenes usadas/mesas en piedra sinterizada/
├── imagenes usadas/portadas de catalogos/
└── (raíz)                            (imágenes sueltas)
```

### 4. Cache Inteligente
El script crea `.uploaded-images-cache.json` que contiene:
- Hash MD5 de cada archivo
- URL pública de Supabase
- Fecha de carga

Esto permite:
- ✅ Detectar cambios en archivos
- ✅ Evitar re-subidas innecesarias
- ✅ Actualizar solo archivos modificados

## 📊 Estadísticas

| Métrica | Valor |
|---------|-------|
| Total de imágenes encontradas | 500+ |
| Imágenes subidas | 500+ |
| Errores | 0 |
| Carpetas procesadas | 20+ |
| Cache guardado | ✅ |

## 🔄 Cómo Funciona el Sistema

### Primera Ejecución
1. Escanea todas las carpetas recursivamente
2. Encuentra todas las imágenes
3. Calcula hash MD5 de cada una
4. Sube a Supabase Storage
5. Guarda cache con hashes y URLs

### Ejecuciones Posteriores
1. Escanea todas las carpetas recursivamente
2. Encuentra todas las imágenes
3. Calcula hash MD5 de cada una
4. Compara con cache:
   - Si hash coincide → ⏭️ Salta (ya subida)
   - Si hash diferente → 📤 Sube (archivo modificado)
   - Si no está en cache → 📤 Sube (archivo nuevo)
5. Actualiza cache

## 🚀 Cómo Usar

### Subir todas las imágenes
```bash
node scripts/upload-images-smart.mjs
```

### Agregar nuevas imágenes
1. Copia las imágenes a `C:\Users\admin\Desktop\dkore\dkore-web`
2. Ejecuta el script
3. Solo se suben las imágenes nuevas

### Modificar imágenes existentes
1. Reemplaza la imagen en `C:\Users\admin\Desktop\dkore\dkore-web`
2. Ejecuta el script
3. El script detecta el cambio (hash diferente) y sube la nueva versión

## 📝 Archivos Creados

### Scripts
- `scripts/upload-images-smart.mjs` - Script inteligente de carga

### Cache
- `.uploaded-images-cache.json` - Cache de imágenes subidas (generado automáticamente)

## 🔗 URLs de Supabase Storage

Todas las imágenes están disponibles en:
```
https://pfvgoumghwtkrinhxgwa.supabase.co/storage/v1/object/public/productos-imagenes/
```

Ejemplos de URLs:
```
https://pfvgoumghwtkrinhxgwa.supabase.co/storage/v1/object/public/productos-imagenes/imagenes%20usadas/macetas/lunaris%20mini/lunaris-mini-blanco.png

https://pfvgoumghwtkrinhxgwa.supabase.co/storage/v1/object/public/productos-imagenes/dkore/public/categorias/mesas-piedra-sinterizada/portada.jpg
```

## 💡 Ventajas del Sistema

1. **Automatizado**: No necesitas especificar carpetas
2. **Inteligente**: Detecta cambios automáticamente
3. **Eficiente**: No re-sube archivos sin cambios
4. **Escalable**: Funciona con cualquier cantidad de imágenes
5. **Organizado**: Mantiene la estructura de carpetas
6. **Rastreable**: Cache permite auditar qué se subió

## 🔧 Configuración

### Cambiar ruta base
Edita `scripts/upload-images-smart.mjs`:
```javascript
const BASE_PATH = 'C:\\Users\\admin\\Desktop\\dkore\\dkore-web'
```

### Cambiar extensiones permitidas
Edita `scripts/upload-images-smart.mjs`:
```javascript
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
```

### Cambiar bucket de Supabase
Edita `scripts/upload-images-smart.mjs`:
```javascript
const BUCKET_NAME = 'productos-imagenes'
```

## 📈 Próximos Pasos

1. **Actualizar data/productos.ts**
   - Usar URLs de Supabase en lugar de rutas locales
   - Agregar múltiples imágenes por producto

2. **Crear interfaz web**
   - Panel para subir imágenes
   - Visualización de imágenes subidas
   - Gestión de cache

3. **Optimizar imágenes**
   - Convertir a WebP
   - Comprimir tamaño
   - Agregar lazy loading

4. **Automatizar carga**
   - Crear webhook para subir automáticamente
   - Ejecutar script en CI/CD

## ⚠️ Notas Importantes

1. **Cache**: El archivo `.uploaded-images-cache.json` es importante. No lo elimines a menos que quieras re-subir todas las imágenes.

2. **Espacios en nombres**: Las URLs codifican espacios como `%20`. Esto es normal.

3. **Estructura**: El script preserva la estructura de carpetas. Las imágenes se organizan igual que en tu computadora.

4. **Rendimiento**: Con 500+ imágenes, el script tarda unos minutos. Es normal.

## 🎓 Cómo Funciona Internamente

### Escaneo Recursivo
```javascript
function findAllImages(dir, relativePath = '') {
  // Lee archivos en la carpeta
  // Si es carpeta → recursión
  // Si es imagen → agrega a lista
}
```

### Hash MD5
```javascript
function getFileHash(filePath) {
  // Lee contenido del archivo
  // Calcula hash MD5
  // Retorna hash único
}
```

### Comparación de Cache
```javascript
if (cache[cacheKey] && cache[cacheKey].hash === fileHash) {
  // Archivo no cambió → salta
} else {
  // Archivo es nuevo o cambió → sube
}
```

---

**Sesión:** 9  
**Fecha:** 2026-03-04  
**Estado:** ✅ Completado  
**Próxima Sesión:** Actualizar data/productos.ts con URLs de Supabase
