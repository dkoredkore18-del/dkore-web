import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Cargar variables de entorno
dotenv.config({ path: path.join(__dirname, '..', '.env.local') })

// Configuración
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const BUCKET_NAME = 'productos-imagenes'

// Mapeo de carpetas locales a slugs de productos
const MACETA_FOLDERS = {
  'lunaris mini': 'maceta-lunaris-mini',
  'lunaris normal': 'maceta-lunaris-normal',
  'lunaris plus': 'maceta-lunaris-plus',
  'selene normal': 'maceta-selene-normal',
  'selene plus': 'maceta-selene-plus',
}

// Ruta base de imágenes
const IMAGES_BASE_PATH = 'C:\\Users\\admin\\Desktop\\dkore\\dkore-web\\imagenes usadas\\macetas'

async function uploadMacetaImages() {
  console.log('🔍 Verificando configuración...')
  console.log(`SUPABASE_URL: ${SUPABASE_URL ? '✅' : '❌'}`)
  console.log(`SUPABASE_KEY: ${SUPABASE_KEY ? '✅' : '❌'}`)

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('\n❌ Error: Variables de entorno no configuradas')
    console.error('Asegúrate de tener NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env.local')
    process.exit(1)
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

  console.log('\n🚀 Iniciando carga de imágenes de macetas...\n')

  let totalUploaded = 0
  let totalErrors = 0
  const uploadedUrls = {}

  for (const [localFolder, productSlug] of Object.entries(MACETA_FOLDERS)) {
    const productPath = path.join(IMAGES_BASE_PATH, localFolder)

    // Verificar que la carpeta existe
    if (!fs.existsSync(productPath)) {
      console.log(`⚠️  Carpeta no encontrada: ${localFolder}`)
      continue
    }

    // Leer archivos
    const files = fs.readdirSync(productPath).filter(file => {
      const ext = path.extname(file).toLowerCase()
      return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext)
    })

    if (files.length === 0) {
      console.log(`⚠️  No hay imágenes en: ${localFolder}`)
      continue
    }

    console.log(`📁 ${localFolder} → ${productSlug} (${files.length} imágenes)`)
    uploadedUrls[productSlug] = []

    // Subir cada imagen
    for (const file of files) {
      const filePath = path.join(productPath, file)
      const fileBuffer = fs.readFileSync(filePath)
      const storagePath = `${productSlug}/${file}`

      try {
        const { error } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(storagePath, fileBuffer, {
            upsert: true,
            contentType: `image/${path.extname(file).slice(1)}`,
          })

        if (error) {
          console.log(`   ❌ ${file}: ${error.message}`)
          totalErrors++
        } else {
          // Obtener URL pública
          const { data } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(storagePath)
          
          uploadedUrls[productSlug].push(data.publicUrl)
          console.log(`   ✅ ${file}`)
          totalUploaded++
        }
      } catch (err) {
        console.log(`   ❌ ${file}: ${err.message}`)
        totalErrors++
      }
    }

    console.log('')
  }

  console.log('📊 Resumen:')
  console.log(`✅ Imágenes subidas: ${totalUploaded}`)
  console.log(`❌ Errores: ${totalErrors}`)
  
  console.log('\n📋 URLs para actualizar data/productos.ts:')
  console.log(JSON.stringify(uploadedUrls, null, 2))
  
  console.log('\n✨ ¡Carga completada!')
}

uploadMacetaImages().catch(err => {
  console.error('Error fatal:', err)
  process.exit(1)
})
