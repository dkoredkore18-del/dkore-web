import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import crypto from 'crypto'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Cargar variables de entorno
dotenv.config({ path: path.join(__dirname, '..', '.env.local') })

// Configuración
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const BUCKET_NAME = 'productos-imagenes'
const BASE_PATH = 'C:\\Users\\admin\\Desktop\\dkore\\dkore-web'
const CACHE_FILE = path.join(__dirname, '..', '.uploaded-images-cache.json')

// Extensiones de imagen permitidas
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif']

/**
 * Calcula el hash MD5 de un archivo
 */
function getFileHash(filePath) {
  const content = fs.readFileSync(filePath)
  return crypto.createHash('md5').update(content).digest('hex')
}

/**
 * Carga el cache de imágenes subidas
 */
function loadCache() {
  if (fs.existsSync(CACHE_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'))
    } catch (err) {
      console.warn('⚠️  No se pudo leer el cache, creando uno nuevo')
      return {}
    }
  }
  return {}
}

/**
 * Guarda el cache de imágenes subidas
 */
function saveCache(cache) {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2))
}

/**
 * Encuentra todas las imágenes en una carpeta recursivamente
 */
function findAllImages(dir, relativePath = '') {
  const images = []

  try {
    const files = fs.readdirSync(dir)

    for (const file of files) {
      const fullPath = path.join(dir, file)
      const relPath = relativePath ? `${relativePath}/${file}` : file

      try {
        const stat = fs.statSync(fullPath)

        if (stat.isDirectory()) {
          // Recursivamente buscar en subdirectorios
          images.push(...findAllImages(fullPath, relPath))
        } else if (stat.isFile()) {
          const ext = path.extname(file).toLowerCase()
          if (ALLOWED_EXTENSIONS.includes(ext)) {
            images.push({
              fullPath,
              relPath,
              filename: file,
              size: stat.size,
            })
          }
        }
      } catch (err) {
        console.warn(`⚠️  Error procesando ${fullPath}: ${err.message}`)
      }
    }
  } catch (err) {
    console.warn(`⚠️  Error leyendo directorio ${dir}: ${err.message}`)
  }

  return images
}

async function uploadImagesSmartly() {
  console.log('🔍 Verificando configuración...')
  console.log(`SUPABASE_URL: ${SUPABASE_URL ? '✅' : '❌'}`)
  console.log(`SUPABASE_KEY: ${SUPABASE_KEY ? '✅' : '❌'}`)
  console.log(`BASE_PATH: ${BASE_PATH}`)

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('\n❌ Error: Variables de entorno no configuradas')
    process.exit(1)
  }

  if (!fs.existsSync(BASE_PATH)) {
    console.error(`\n❌ Error: Ruta no encontrada: ${BASE_PATH}`)
    process.exit(1)
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
  const cache = loadCache()

  console.log('\n🚀 Escaneando imágenes...\n')

  // Encontrar todas las imágenes
  const allImages = findAllImages(BASE_PATH)

  if (allImages.length === 0) {
    console.log('⚠️  No se encontraron imágenes en la carpeta')
    process.exit(0)
  }

  console.log(`📊 Total de imágenes encontradas: ${allImages.length}\n`)

  let totalUploaded = 0
  let totalSkipped = 0
  let totalErrors = 0
  const uploadedUrls = {}

  // Procesar cada imagen
  for (const image of allImages) {
    const fileHash = getFileHash(image.fullPath)
    const cacheKey = image.relPath

    // Verificar si ya fue subida
    if (cache[cacheKey] && cache[cacheKey].hash === fileHash) {
      console.log(`⏭️  ${image.relPath} (ya subida)`)
      totalSkipped++
      continue
    }

    try {
      const fileBuffer = fs.readFileSync(image.fullPath)
      const storagePath = image.relPath.replace(/\\/g, '/') // Convertir backslashes a forward slashes

      console.log(`📤 Subiendo: ${image.relPath}`)

      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(storagePath, fileBuffer, {
          upsert: true,
          contentType: `image/${path.extname(image.filename).slice(1)}`,
        })

      if (error) {
        console.log(`   ❌ Error: ${error.message}`)
        totalErrors++
      } else {
        // Obtener URL pública
        const { data } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(storagePath)

        // Guardar en cache
        cache[cacheKey] = {
          hash: fileHash,
          url: data.publicUrl,
          uploadedAt: new Date().toISOString(),
        }

        // Agrupar URLs por carpeta
        const folder = path.dirname(image.relPath)
        if (!uploadedUrls[folder]) {
          uploadedUrls[folder] = []
        }
        uploadedUrls[folder].push({
          filename: image.filename,
          url: data.publicUrl,
        })

        console.log(`   ✅ Subida exitosa`)
        totalUploaded++
      }
    } catch (err) {
      console.log(`   ❌ Error: ${err.message}`)
      totalErrors++
    }
  }

  // Guardar cache actualizado
  saveCache(cache)

  console.log('\n' + '='.repeat(70))
  console.log('📊 RESUMEN:')
  console.log('='.repeat(70))
  console.log(`✅ Imágenes subidas: ${totalUploaded}`)
  console.log(`⏭️  Imágenes saltadas (ya subidas): ${totalSkipped}`)
  console.log(`❌ Errores: ${totalErrors}`)
  console.log(`📊 Total procesadas: ${allImages.length}`)

  if (totalUploaded > 0) {
    console.log('\n📋 URLs de imágenes subidas (agrupadas por carpeta):')
    console.log(JSON.stringify(uploadedUrls, null, 2))
  }

  console.log('\n✨ ¡Proceso completado!')
  console.log(`💾 Cache guardado en: ${CACHE_FILE}`)
}

uploadImagesSmartly().catch(err => {
  console.error('Error fatal:', err)
  process.exit(1)
})
