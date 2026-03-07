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

async function listRecursive(supabase, path = '') {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .list(path, { limit: 1000 })

  if (error) {
    console.error(`Error listing ${path}: ${error.message}`)
    return []
  }

  let files = []

  for (const item of data) {
    const fullPath = path ? `${path}/${item.name}` : item.name

    if (item.id === null) {
      // Es una carpeta
      const subFiles = await listRecursive(supabase, fullPath)
      files = files.concat(subFiles)
    } else {
      // Es un archivo
      files.push(fullPath)
    }
  }

  return files
}

async function main() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

  console.log('📂 Listando TODOS los archivos recursivamente...\n')

  try {
    const allFiles = await listRecursive(supabase)

    console.log(`✅ Total de archivos: ${allFiles.length}\n`)

    if (allFiles.length === 0) {
      console.log('⚠️  No se encontraron archivos')
      process.exit(0)
    }

    // Agrupar por carpeta
    const folders = {}
    allFiles.forEach(file => {
      const parts = file.split('/')
      const folder = parts.length > 1 ? parts[0] : 'root'
      if (!folders[folder]) folders[folder] = []
      folders[folder].push(file)
    })

    console.log('📊 Archivos por carpeta:\n')
    Object.entries(folders).sort().forEach(([folder, files]) => {
      console.log(`${folder}: ${files.length} archivos`)
      files.slice(0, 3).forEach(f => console.log(`  ✓ ${f}`))
      if (files.length > 3) console.log(`  ... y ${files.length - 3} más`)
      console.log()
    })

    // Mostrar URLs de ejemplo
    console.log('🔗 URLs de ejemplo:\n')
    const examples = allFiles.slice(0, 3)
    examples.forEach(file => {
      const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(file)
      console.log(`${file}`)
      console.log(`→ ${data.publicUrl}\n`)
    })

  } catch (err) {
    console.error(`❌ Error: ${err.message}`)
    process.exit(1)
  }
}

main()
