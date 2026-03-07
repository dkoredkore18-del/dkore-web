import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Faltan variables de entorno')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Distribución de productos de melamina en subcategorías
const subcategoriasAsignacion = {
  'cocinas': [
    'cocina-melamina'
  ],
  'closets': [
    'closets',
    'walking-closet'
  ],
  'muebles-entretenimiento': [
    'centro-entretenimiento',
    'librerias',
    'repisas'
  ],
  'veladores': [
    'veladores',
    'recibidores'
  ],
  'muebles-bano': [
    'bano-flotante-melamina'
  ]
}

async function updateSubcategorias() {
  console.log('🔄 Actualizando subcategorías de muebles de melamina...\n')

  let totalActualizados = 0
  let errores = 0

  for (const [subcategoria, slugs] of Object.entries(subcategoriasAsignacion)) {
    if (slugs.length === 0) continue

    console.log(`📁 Subcategoría: ${subcategoria}`)
    
    for (const slug of slugs) {
      try {
        const { data, error } = await supabase
          .from('productos')
          .update({ subcategoria: subcategoria })
          .eq('slug', slug)
          .eq('categoria', 'muebles-melamina')
          .select()

        if (error) throw error

        if (data && data.length > 0) {
          console.log(`  ✅ ${slug} → ${subcategoria}`)
          totalActualizados++
        } else {
          console.log(`  ⚠️  ${slug} no encontrado`)
        }
      } catch (error) {
        console.error(`  ❌ Error en ${slug}:`, error.message)
        errores++
      }
    }
    console.log('')
  }

  console.log('━'.repeat(50))
  console.log(`✅ Total actualizados: ${totalActualizados}`)
  console.log(`❌ Errores: ${errores}`)
  console.log('━'.repeat(50))
}

// Verificar productos actuales
async function verificarProductos() {
  console.log('🔍 Verificando productos de muebles de melamina...\n')

  const { data, error } = await supabase
    .from('productos')
    .select('slug, nombre, subcategoria')
    .eq('categoria', 'muebles-melamina')
    .order('nombre')

  if (error) {
    console.error('❌ Error:', error.message)
    return
  }

  console.log(`📦 Total de productos: ${data.length}\n`)
  
  data.forEach(p => {
    console.log(`  ${p.slug}`)
    console.log(`    Nombre: ${p.nombre}`)
    console.log(`    Subcategoría: ${p.subcategoria || '(sin asignar)'}`)
    console.log('')
  })
}

// Ejecutar
async function main() {
  const args = process.argv.slice(2)
  
  if (args.includes('--verificar')) {
    await verificarProductos()
  } else {
    await updateSubcategorias()
    console.log('\n🔍 Verificando resultados...\n')
    await verificarProductos()
  }
}

main()
