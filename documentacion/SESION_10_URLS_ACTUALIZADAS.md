# SESIÓN 10: Actualización de URLs de Productos en Supabase

## Resumen
Se completó la actualización de todas las URLs de productos en `data/productos.ts` para que apunten correctamente a las imágenes almacenadas en Supabase Storage.

## Estado Actual del Sistema de Imágenes

### Imágenes Cargadas en Supabase
- **Total de imágenes**: 47 imágenes
- **Macetas**: 33 imágenes (5 productos × 3-12 imágenes cada uno)
- **Mesas en Piedra Sinterizada**: 9 imágenes (9 productos × 1 imagen cada uno)
- **Portadas de Catálogos**: 4 imágenes
- **Logo**: 1 imagen

### Estructura de Carpetas en Supabase
```
productos-imagenes/
├── macetas/
│   ├── lunaris-mini/ (12 imágenes)
│   ├── lunaris-normal/ (9 imágenes)
│   ├── lunaris-plus/ (3 imágenes)
│   ├── selene-normal/ (3 imágenes)
│   └── selene-plus/ (3 imágenes)
├── mesas-en-piedra-sinterizada/
│   ├── Porcelanato-Cemento-Brera-Fresh1/
│   ├── Porcelanato-Cemento-Cosmopolita-Ivory1/
│   ├── Porcelanato-Marmol-Belvedere-Black1/
│   ├── Porcelanato-Marmol-Calacata-White1/
│   ├── Porcelanato-Marmol-Estatuario-Extra1/
│   ├── Porcelanato-Marmol-Onice-Black1/
│   ├── Marmol-Labradorite-Royal-Blue-Velvet1/
│   ├── Marmol-LCP-Pierre1/
│   └── Marmol-Lucca1/
├── portadas-de-catalogos/
│   ├── portada-macetas.png.png
│   ├── portada-mesas-piedra-sinterizada.png
│   ├── portada-muebles-melamina.png
│   └── portada-revestimientos3D.png
└── logo-dekore.png
```

## URLs Actualizadas en `data/productos.ts`

### Mesas en Piedra Sinterizada (9 productos)
Todos los productos de mesas ahora tienen URLs correctas que apuntan a Supabase:

1. **Porcelanato Mármol Onice Black** (id: 1)
   - URL: `mesas-en-piedra-sinterizada/Porcelanato-Marmol-Onice-Black1/Porcelanato-Marmol-Onice-Black1.png`

2. **Porcelanato Mármol Estatuario Extra** (id: 2)
   - URL: `mesas-en-piedra-sinterizada/Porcelanato-Marmol-Estatuario-Extra1/Porcelanato-Marmol-Estatuario-Extra1.png`

3. **Porcelanato Mármol Calacata White** (id: 3)
   - URL: `mesas-en-piedra-sinterizada/Porcelanato-Marmol-Calacata-White1/Porcelanato-Marmol-Calacata-White1.png`

4. **Porcelanato Mármol Belvedere Black** (id: 4)
   - URL: `mesas-en-piedra-sinterizada/Porcelanato-Marmol-Belvedere-Black1/Porcelanato-Marmol-Belvedere-Black1.png`

5. **Porcelanato Cemento Cosmopolita Ivory** (id: 5)
   - URL: `mesas-en-piedra-sinterizada/Porcelanato-Cemento-Cosmopolita-Ivory1/Porcelanato-Cemento-Cosmopolita-Ivory1.png`

6. **Porcelanato Cemento Brera Fresh** (id: 6)
   - URL: `mesas-en-piedra-sinterizada/Porcelanato-Cemento-Brera-Fresh1/Porcelanato-Cemento-Brera-Fresh1.png`

7. **Mármol Lucca** (id: 7)
   - URL: `mesas-en-piedra-sinterizada/Marmol-Lucca1/Marmol-Lucca1.png`

8. **Mármol LCP Pierre** (id: 8)
   - URL: `mesas-en-piedra-sinterizada/Marmol-LCP-Pierre1/Marmol-LCP-Pierre1.png`

9. **Mármol Labradorite Royal Blue Velvet** (id: 9)
   - URL: `mesas-en-piedra-sinterizada/Marmol-Labradorite-Royal-Blue-Velvet1/Marmol-Labradorite-Royal-Blue-Velvet1.png`

### Macetas en Fibra de Vidrio (5 productos con URLs)
Todos los productos de macetas ahora tienen URLs correctas:

1. **Maceta Lunaris Mini** (id: 10) - 12 imágenes
2. **Maceta Lunaris Normal** (id: 11) - 9 imágenes
3. **Maceta Lunaris Plus** (id: 12) - 3 imágenes
4. **Maceta Selene Normal** (id: 14) - 3 imágenes
5. **Maceta Selene Plus** (id: 15) - 3 imágenes

## Sistema de Cache

El archivo `.uploaded-product-images-cache.json` mantiene un registro de todas las imágenes cargadas con:
- **Hash MD5**: Para detectar cambios en archivos
- **URL pública**: URL de Supabase para cada imagen
- **Timestamp**: Fecha de carga

Este sistema permite que futuras ejecuciones del script solo carguen imágenes nuevas o modificadas.

## Script de Carga

**Archivo**: `scripts/upload-product-images-fixed.mjs`

**Características**:
- Escanea recursivamente desde `C:\Users\admin\Desktop\dkore\dkore-web\imagenes usadas`
- Sanitiza nombres de archivo (elimina acentos, reemplaza espacios con guiones)
- Usa cache para evitar re-cargas innecesarias
- Agrupa URLs por carpeta para fácil referencia

**Uso**:
```bash
node scripts/upload-product-images-fixed.mjs
```

## Próximos Pasos

1. ✅ Todas las imágenes están cargadas en Supabase
2. ✅ URLs actualizadas en `data/productos.ts`
3. ⏳ Verificar que las imágenes se muestren correctamente en las páginas de productos
4. ⏳ Agregar imágenes para productos sin URLs (Selene Mini, Prisma, Lyra, Orion, Revestimientos 3D, Muebles de Melamina, Material Eléctrico)

## Notas Técnicas

- Las URLs usan el formato: `https://pfvgoumghwtkrinhxgwa.supabase.co/storage/v1/object/public/productos-imagenes/{ruta}`
- Los nombres de carpeta se sanitizan automáticamente (ej: "Mármol" → "Marmol")
- El sistema es incremental: solo carga imágenes nuevas o modificadas
- Compatible con futuras adiciones de imágenes a `C:\Users\admin\Desktop\dkore\dkore-web\imagenes usadas`
