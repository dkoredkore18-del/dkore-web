import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Cargar variables de entorno
dotenv.config({ path: path.join(__dirname, '..', '.env.local') })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const BUCKET_NAME = 'productos-imagenes'

async function verifySupabaseImages() {
  console.log('🔍 Verificando configuración de Supabase Storage...\n')
  console.log(`SUPABASE_URL: ${SUPABASE_URL ? '✅' : '❌'}`)
  console.log(`SUPABASE_KEY: ${SUPABASE_KEY ? '✅' : '❌'}`)

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('\n❌ Error: Variables de entorno no configuradas')
    process.exit(1)
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

  try {
    // 1. Verificar que el bucket existe
    console.log(`\n📦 Verificando bucket: ${BUCKET_NAME}`)
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
    
    if (bucketsError) {
      console.error(`❌ Error al listar buckets: ${bucketsError.message}`)
      process.exit(1)
    }

    const bucket = buckets.find(b => b.name === BUCKET_NAME)
    if (!bucket) {
      console.error(`❌ Bucket '${BUCKET_NAME}' no encontrado`)
      console.log('Buckets disponibles:', buckets.map(b => b.name).join(', '))
      process.exit(1)
    }

    console.log(`✅ Bucket encontrado: ${bucket.name}`)
    console.log(`   - Público: ${bucket.public ? 'Sí' : 'No'}`)
    console.log(`   - Creado: ${new Date(bucket.created_at).toLocaleString()}`)

    // 2. Listar archivos en el bucket
    console.log(`\n📂 Listando archivos en el bucket...`)
    const { data: files, error: filesError } = await supabase.storage
      .from(BUCKET_NAME)
      .list('', { limit: 100, sortBy: { column: 'name', order: 'asc' } })

    if (filesError) {
      console.error(`❌ Error al listar archivos: ${filesError.message}`)
      process.exit(1)
    }

    console.log(`✅ Total de archivos: ${files.length}`)
    
    // Agrupar por carpeta
    const folders = {}
    files.forEach(file => {
      if (file.name.includes('/')) {
        const folder = file.name.split('/')[0]
        if (!folders[folder]) folders[folder] = 0
        folders[folder]++
      }
    })

    console.log('\n📁 Archivos por carpeta:')
    Object.entries(folders).forEach(([folder, count]) => {
      console.log(`   - ${folder}: ${count} archivos`)
    })

    // 3. Probar acceso a una imagen
    console.log(`\n🔗 Probando acceso a imágenes...`)
    
    // Buscar una imagen de macetas
    const macetaImage = files.find(f => f.name.includes('macetas/lunaris-mini'))
    
    if (macetaImage) {
      const { data } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(macetaImage.name)
      
      console.log(`✅ URL pública generada:`)
      console.log(`   ${data.publicUrl}`)
      
      // Verificar si la URL es accesible
      try {
        const response = await fetch(data.publicUrl, { method: 'HEAD' })
        if (response.ok) {
          console.log(`✅ URL es accesible (HTTP ${response.status})`)
        } else {
          console.log(`⚠️  URL retorna HTTP ${response.status}`)
        }
      } catch (err) {
        console.log(`❌ URL no es accesible: ${err.message}`)
      }
    } else {
      console.log(`⚠️  No se encontraron imágenes de macetas para probar`)
    }

    // 4. Resumen
    console.log(`\n${'='.repeat(70)}`)
    console.log('📊 RESUMEN:')
    console.log(`${'='.repeat(70)}`)
    console.log(`✅ Bucket: ${bucket.name}`)
    console.log(`✅ Público: ${bucket.public ? 'Sí' : 'No'}`)
    console.log(`✅ Archivos: ${files.length}`)
    console.log(`✅ Carpetas: ${Object.keys(folders).length}`)
    
    if (bucket.public) {
      console.log(`\n✅ El bucket está configurado como público`)
      console.log(`✅ Las imágenes deberían ser accesibles`)
    } else {
      console.log(`\n⚠️  El bucket NO está configurado como público`)
      console.log(`⚠️  Las imágenes NO serán accesibles desde el navegador`)
      console.log(`\n💡 Para hacer el bucket público:`)
      console.log(`   1. Ve a Supabase Dashboard`)
      console.log(`   2. Storage > ${BUCKET_NAME}`)
      console.log(`   3. Haz clic en "Make public"`)
    }

  } catch (err) {
    console.error(`❌ Error: ${err.message}`)
    process.exit(1)
  }
}

verifySupabaseImages().catch(err => {
  console.error('Error fatal:', err)
  process.exit(1)
})
