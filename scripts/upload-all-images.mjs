import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Cargar variables de entorno
dotenv.config({ path: path.join(__dirname, '..', '.env.local') })

// Configuración
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const BUCKET_NAME = 'productos-imagenes'

// Configuración de carpetas a subir
const UPLOAD_CONFIGS = [
  {
    name: 'Portadas de Catálogos',
    localPath: 'C:\\Users\\admin\\Desktop\\dkore\\dkore-web\\imagenes usadas\\portadas de catalogos',
    storagePath: 'portadas',
  },
  {
    name: 'Mesas en Piedra Sinterizada',
    localPath: 'C:\\Users\\admin\\Desktop\\dkore\\mesas',
    storagePath: 'mesas-piedra-sinterizada',
  },
]

async function uploadAllImages() {
  console.log('🔍 Verificando configuración...')
  console.log(`SUPABASE_URL: ${SUPABASE_URL ? '✅' : '❌'}`)
  console.log(`SUPABASE_KEY: ${SUPABASE_KEY ? '✅' : '❌'}`)

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('\n❌ Error: Variables de entorno no configuradas')
    process.exit(1)
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

  console.log('\n🚀 Iniciando carga de todas las imágenes...\n')

  let totalUploaded = 0
  let totalErrors = 0
  const uploadedUrls = {}

  for (const config of UPLOAD_CONFIGS) {
    console.log(`\n📁 ${config.name}`)
    console.log(`   Ruta: ${config.localPath}`)

    // Verificar que la carpeta existe
    if (!fs.existsSync(config.localPath)) {
      console.log(`   ⚠️  Carpeta no encontrada`)
      continue
    }

    // Leer archivos
    const files = fs.readdirSync(config.localPath).filter(file => {
      const ext = path.extname(file).toLowerCase()
      return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext)
    })

    if (files.length === 0) {
      console.log(`   ⚠️  No hay imágenes en esta carpeta`)
      continue
    }

    console.log(`   📊 ${files.length} imágenes encontradas\n`)
    uploadedUrls[config.storagePath] = []

    // Subir cada imagen
    for (const file of files) {
      const filePath = path.join(config.localPath, file)
      const fileBuffer = fs.readFileSync(filePath)
      const storagePath = `${config.storagePath}/${file}`

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
          
          uploadedUrls[config.storagePath].push({
            filename: file,
            url: data.publicUrl,
          })
          console.log(`   ✅ ${file}`)
          totalUploaded++
        }
      } catch (err) {
        console.log(`   ❌ ${file}: ${err.message}`)
        totalErrors++
      }
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log('📊 RESUMEN FINAL:')
  console.log('='.repeat(60))
  console.log(`✅ Imágenes subidas: ${totalUploaded}`)
  console.log(`❌ Errores: ${totalErrors}`)
  
  console.log('\n📋 URLs para actualizar data/productos.ts:')
  console.log(JSON.stringify(uploadedUrls, null, 2))
  
  console.log('\n✨ ¡Carga completada!')
}

uploadAllImages().catch(err => {
  console.error('Error fatal:', err)
  process.exit(1)
})
