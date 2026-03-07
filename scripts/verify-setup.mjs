/**
 * Script de Verificación del Setup
 * 
 * Verifica que todo esté configurado correctamente
 * 
 * Para ejecutar:
 * node scripts/verify-setup.mjs
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log('🔍 VERIFICACIÓN DEL SETUP DE D\'KORE\n')
console.log('═'.repeat(60))

// Cargar variables de entorno
const envPath = join(__dirname, '..', '.env.local')
try {
  const envFile = readFileSync(envPath, 'utf8')
  envFile.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=')
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').trim()
      process.env[key.trim()] = value
    }
  })
  console.log('✅ Variables de entorno cargadas\n')
} catch (error) {
  console.error('❌ Error al cargar .env.local:', error.message)
  process.exit(1)
}

// Verificar variables de entorno
console.log('📋 VARIABLES DE ENTORNO')
console.log('─'.repeat(60))

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
]

let envOk = true
for (const envVar of requiredEnvVars) {
  if (process.env[envVar]) {
    console.log(`✅ ${envVar}: Configurada`)
  } else {
    console.log(`❌ ${envVar}: NO configurada`)
    envOk = false
  }
}

if (!envOk) {
  console.log('\n❌ Faltan variables de entorno. Verifica tu archivo .env.local')
  process.exit(1)
}

console.log('\n')

// Verificar conexión a Supabase
console.log('🗄️  CONEXIÓN A SUPABASE')
console.log('─'.repeat(60))

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

try {
  const { data, error } = await supabase.from('productos').select('count')
  if (error) throw error
  console.log('✅ Conexión a Supabase exitosa\n')
} catch (error) {
  console.error('❌ Error de conexión:', error.message)
  process.exit(1)
}

// Verificar productos
console.log('📦 PRODUCTOS EN SUPABASE')
console.log('─'.repeat(60))

try {
  const { count: totalCount } = await supabase
    .from('productos')
    .select('*', { count: 'exact', head: true })
  
  console.log(`Total de productos: ${totalCount}`)
  
  const categorias = [
    'mesas-piedra-sinterizada',
    'macetas-fibra-vidrio',
    'revestimientos-3d',
    'muebles-melamina'
  ]
  
  for (const categoria of categorias) {
    const { count } = await supabase
      .from('productos')
      .select('*', { count: 'exact', head: true })
      .eq('categoria', categoria)
    
    console.log(`  - ${categoria}: ${count} productos`)
  }
  
  const { count: destacadosCount } = await supabase
    .from('productos')
    .select('*', { count: 'exact', head: true })
    .eq('destacado', true)
  
  console.log(`  - Destacados: ${destacadosCount} productos\n`)
} catch (error) {
  console.error('❌ Error al verificar productos:', error.message)
}

// Verificar imágenes
console.log('🖼️  IMÁGENES')
console.log('─'.repeat(60))

const imagesToCheck = [
  '/public/categorias/mesas-piedra-sinterizada/portada.jpg',
  '/public/categorias/macetas-fibra-vidrio/portada.jpg',
  '/public/categorias/revestimientos-3d/portada.jpg',
  '/public/categorias/muebles-melamina/portada.jpg',
  '/public/imagenes/mesas-piedra-sinterizada/calacata-white.jpg'
]

for (const imagePath of imagesToCheck) {
  const fullPath = join(__dirname, '..', imagePath)
  if (existsSync(fullPath)) {
    console.log(`✅ ${imagePath}`)
  } else {
    console.log(`❌ ${imagePath} - NO EXISTE`)
  }
}

console.log('\n')

// Verificar Storage
console.log('📁 STORAGE DE SUPABASE')
console.log('─'.repeat(60))

try {
  const { data: buckets, error } = await supabase.storage.listBuckets()
  if (error) throw error
  
  const bucket = buckets.find(b => b.name === 'productos-imagenes')
  if (bucket) {
    console.log('✅ Bucket "productos-imagenes" existe')
    console.log(`   - Público: ${bucket.public ? 'Sí' : 'No'}`)
  } else {
    console.log('❌ Bucket "productos-imagenes" NO existe')
  }
} catch (error) {
  console.error('❌ Error al verificar storage:', error.message)
}

console.log('\n')

// Verificar usuarios admin
console.log('👤 USUARIOS ADMIN')
console.log('─'.repeat(60))

try {
  const { count } = await supabase
    .from('usuarios_admin')
    .select('*', { count: 'exact', head: true })
  
  console.log(`Total de usuarios admin: ${count}`)
  
  if (count === 0) {
    console.log('⚠️  No hay usuarios admin registrados')
    console.log('   Ejecuta el script crear_admin.sql en Supabase')
  }
} catch (error) {
  console.error('❌ Error al verificar usuarios:', error.message)
}

console.log('\n')
console.log('═'.repeat(60))
console.log('✅ VERIFICACIÓN COMPLETADA')
console.log('═'.repeat(60))

console.log('\n💡 PRÓXIMOS PASOS:')
console.log('1. Si todo está ✅, reinicia el servidor: npm run dev')
console.log('2. Abre http://localhost:3000 en tu navegador')
console.log('3. Verifica que el navbar funcione')
console.log('4. Verifica que el carrusel se vea')
console.log('5. Navega por el catálogo')

process.exit(0)
