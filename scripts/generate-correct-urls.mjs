import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

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

  if (error) return []

  let files = []
  for (const item of data) {
    const fullPath = path ? `${path}/${item.name}` : item.name
    if (item.id === null) {
      const subFiles = await listRecursive(supabase, fullPath)
      files = files.concat(subFiles)
    } else {
      files.push(fullPath)
    }
  }
  return files
}

async function main() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

  console.log('🔍 Generando URLs correctas para productos...\n')

  const allFiles = await listRecursive(supabase)

  // Filtrar solo imágenes de productos (no caché de Next.js)
  const productImages = allFiles.filter(f => 
    !f.includes('dkore/.next') && 
    (f.includes('macetas/') || f.includes('mesas-en-piedra-sinterizada/'))
  )

  console.log(`✅ Imágenes de productos encontradas: ${productImages.length}\n`)

  // Agrupar por producto
  const products = {}

  productImages.forEach(file => {
    const parts = file.split('/')
    
    if (parts[0] === 'macetas') {
      const productName = parts[1] // lunaris mini, lunaris normal, etc.
      if (!products[productName]) products[productName] = []
      products[productName].push(file)
    } else if (parts[0] === 'mesas-en-piedra-sinterizada') {
      const productName = parts[1] // Porcelanato-Marmol-Onice-Black1, etc.
      if (!products[productName]) products[productName] = []
      products[productName].push(file)
    }
  })

  // Generar TypeScript
  console.log('📝 Generando código TypeScript...\n')
  console.log('// Copiar y pegar en data/productos.ts\n')

  Object.entries(products).sort().forEach(([productName, files]) => {
    console.log(`// ${productName}`)
    console.log('imagenes: [')
    files.forEach(file => {
      const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(file)
      console.log(`  "${data.publicUrl}",`)
    })
    console.log('],\n')
  })

  // Guardar en archivo
  const outputFile = path.join(__dirname, '..', 'generated-urls.txt')
  let output = '// URLs generadas automáticamente\n\n'

  Object.entries(products).sort().forEach(([productName, files]) => {
    output += `// ${productName}\n`
    output += 'imagenes: [\n'
    files.forEach(file => {
      const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(file)
      output += `  "${data.publicUrl}",\n`
    })
    output += '],\n\n'
  })

  fs.writeFileSync(outputFile, output)
  console.log(`\n✅ URLs guardadas en: ${outputFile}`)
}

main()
