/**
 * Script de Migración de Productos a Supabase
 * 
 * Este script migra todos los productos de data/productos.ts a Supabase
 * 
 * Para ejecutar:
 * npx tsx scripts/migrate-products.ts
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { productos } from '../data/productos'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY! // Usamos service role para bypass RLS

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Variables de entorno no configuradas')
  console.error('Asegúrate de tener NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function migrateProducts() {
  console.log('🚀 Iniciando migración de productos...\n')

  // Filtrar productos de material-electrico (no los queremos en el catálogo)
  const productosParaMigrar = productos.filter(p => p.categoria !== 'material-electrico')

  console.log(`📦 Total de productos a migrar: ${productosParaMigrar.length}`)
  console.log(`🗑️  Productos excluidos (material-electrico): ${productos.length - productosParaMigrar.length}\n`)

  // Transformar productos al formato de Supabase
  const productosSupabase = productosParaMigrar.map((producto, index) => ({
    nombre: producto.nombre,
    slug: producto.slug,
    descripcion: producto.descripcion,
    descripcion_larga: null, // Por ahora null, se puede agregar después
    categoria: producto.categoria,
    subcategoria: null, // Por ahora null, se puede agregar después
    imagenes: producto.imagenes,
    destacado: index < 6, // Los primeros 6 serán destacados
    orden: index + 1
  }))

  console.log('🔄 Limpiando tabla de productos existentes...')
  
  // Eliminar productos existentes (opcional, comentar si no quieres limpiar)
  const { error: deleteError } = await supabase
    .from('productos')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000') // Elimina todos

  if (deleteError) {
    console.warn('⚠️  Advertencia al limpiar:', deleteError.message)
  } else {
    console.log('✅ Tabla limpiada\n')
  }

  console.log('📤 Insertando productos en Supabase...')

  // Insertar productos en lotes de 10
  const batchSize = 10
  let insertados = 0
  let errores = 0

  for (let i = 0; i < productosSupabase.length; i += batchSize) {
    const batch = productosSupabase.slice(i, i + batchSize)
    
    const { data, error } = await supabase
      .from('productos')
      .insert(batch)
      .select()

    if (error) {
      console.error(`❌ Error en lote ${Math.floor(i / batchSize) + 1}:`, error.message)
      errores += batch.length
    } else {
      insertados += data.length
      console.log(`✅ Lote ${Math.floor(i / batchSize) + 1}: ${data.length} productos insertados`)
    }
  }

  console.log('\n📊 RESUMEN DE MIGRACIÓN')
  console.log('═'.repeat(50))
  console.log(`✅ Productos insertados: ${insertados}`)
  console.log(`❌ Errores: ${errores}`)
  console.log(`📦 Total procesados: ${productosSupabase.length}`)
  console.log('═'.repeat(50))

  // Verificar productos por categoría
  console.log('\n📋 PRODUCTOS POR CATEGORÍA')
  console.log('═'.repeat(50))

  const categorias = ['mesas-piedra-sinterizada', 'macetas-fibra-vidrio', 'revestimientos-3d', 'muebles-melamina']

  for (const categoria of categorias) {
    const { count } = await supabase
      .from('productos')
      .select('*', { count: 'exact', head: true })
      .eq('categoria', categoria)

    console.log(`${categoria.padEnd(30)} : ${count} productos`)
  }

  console.log('═'.repeat(50))

  // Verificar productos destacados
  const { count: destacadosCount } = await supabase
    .from('productos')
    .select('*', { count: 'exact', head: true })
    .eq('destacado', true)

  console.log(`\n⭐ Productos destacados: ${destacadosCount}`)

  console.log('\n🎉 ¡Migración completada!')
}

// Ejecutar migración
migrateProducts()
  .then(() => {
    console.log('\n✅ Script finalizado exitosamente')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Error fatal:', error)
    process.exit(1)
  })
