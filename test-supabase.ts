/**
 * Script de prueba para verificar la conexión con Supabase
 * 
 * Para ejecutar:
 * 1. Asegúrate de que el servidor esté corriendo (npm run dev)
 * 2. O ejecuta: npx tsx test-supabase.ts
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

async function testSupabase() {
  console.log('🧪 Probando conexión con Supabase...\n')

  const supabase = createClient(supabaseUrl, supabaseKey)

  // Test 1: Verificar conexión
  console.log('1️⃣ Verificando conexión...')
  try {
    const { data, error } = await supabase.from('productos').select('count')
    if (error) throw error
    console.log('✅ Conexión exitosa!\n')
  } catch (error) {
    console.error('❌ Error de conexión:', error)
    return
  }

  // Test 2: Contar productos
  console.log('2️⃣ Contando productos...')
  try {
    const { count, error } = await supabase
      .from('productos')
      .select('*', { count: 'exact', head: true })
    
    if (error) throw error
    console.log(`✅ Productos en la base de datos: ${count}\n`)
  } catch (error) {
    console.error('❌ Error:', error)
  }

  // Test 3: Verificar usuarios admin
  console.log('3️⃣ Verificando usuarios admin...')
  try {
    const { count, error } = await supabase
      .from('usuarios_admin')
      .select('*', { count: 'exact', head: true })
    
    if (error) throw error
    console.log(`✅ Usuarios admin registrados: ${count}\n`)
  } catch (error) {
    console.error('❌ Error:', error)
  }

  // Test 4: Verificar Storage
  console.log('4️⃣ Verificando Storage...')
  try {
    const { data, error } = await supabase.storage.listBuckets()
    if (error) throw error
    
    const bucket = data.find(b => b.name === 'productos-imagenes')
    if (bucket) {
      console.log('✅ Bucket "productos-imagenes" encontrado')
      console.log(`   - Público: ${bucket.public ? 'Sí' : 'No'}\n`)
    } else {
      console.log('⚠️  Bucket "productos-imagenes" no encontrado\n')
    }
  } catch (error) {
    console.error('❌ Error:', error)
  }

  // Test 5: Probar función de búsqueda
  console.log('5️⃣ Probando función de búsqueda...')
  try {
    const { data, error } = await supabase.rpc('buscar_productos', { 
      termino: 'mesa' 
    })
    if (error) throw error
    console.log(`✅ Función de búsqueda funciona correctamente\n`)
  } catch (error) {
    console.error('❌ Error:', error)
  }

  console.log('🎉 ¡Todas las pruebas completadas!')
}

testSupabase()
