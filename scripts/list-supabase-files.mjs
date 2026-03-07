import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '..', '.env.local') })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const BUCKET_NAME = 'productos-imagenes'

async function listAllFiles() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

  console.log('📂 Listando TODOS los archivos en Supabase Storage...\n')

  try {
    // Listar con límite alto
    const { data: files, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list('', { limit: 1000 })

    if (error) {
      console.error(`❌ Error: ${error.message}`)
      process.exit(1)
    }

    console.log(`Total de archivos: ${files.length}\n`)
    
    files.forEach((file, index) => {
      console.log(`${index + 1}. ${file.name}`)
    })

    // Agrupar por carpeta
    console.log('\n📊 Resumen por carpeta:')
    const folders = {}
    files.forEach(file => {
      const parts = file.name.split('/')
      if (parts.length > 1) {
        const folder = parts[0]
        if (!folders[folder]) folders[folder] = []
        folders[folder].push(file.name)
      } else {
        if (!folders['root']) folders['root'] = []
        folders['root'].push(file.name)
      }
    })

    Object.entries(folders).forEach(([folder, files]) => {
      console.log(`\n${folder}: ${files.length} archivos`)
      files.slice(0, 5).forEach(f => console.log(`  - ${f}`))
      if (files.length > 5) console.log(`  ... y ${files.length - 5} más`)
    })

  } catch (err) {
    console.error(`❌ Error: ${err.message}`)
    process.exit(1)
  }
}

listAllFiles()
