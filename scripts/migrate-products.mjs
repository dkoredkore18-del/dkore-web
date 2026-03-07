/**
 * Script de Migración de Productos a Supabase
 * 
 * Para ejecutar:
 * node scripts/migrate-products.mjs
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Cargar variables de entorno manualmente
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
} catch (error) {
  console.error('❌ Error al cargar .env.local:', error.message)
  process.exit(1)
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Variables de entorno no configuradas')
  console.error('Asegúrate de tener NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Productos a migrar (sin material-electrico)
const productos = [
  // MESAS EN PIEDRA SINTERIZADA
  { nombre: "Porcelanato Mármol Onice Black", slug: "onice-black", descripcion: "Acabado oscuro de alto impacto con vetas intensas tipo ónice.", imagenes: ["/imagenes/mesas-piedra-sinterizada/onice-black.jpg"], categoria: "mesas-piedra-sinterizada" },
  { nombre: "Porcelanato Mármol Estatuario Extra", slug: "estatuario-extra", descripcion: "Elegancia clásica en blanco con vetas grises sofisticadas.", imagenes: ["/imagenes/mesas-piedra-sinterizada/estatuario-extra.jpg"], categoria: "mesas-piedra-sinterizada" },
  { nombre: "Porcelanato Mármol Calacata White", slug: "calacata-white", descripcion: "Diseño luminoso con vetas amplias y presencia moderna.", imagenes: ["/imagenes/mesas-piedra-sinterizada/calacata-white.jpg"], categoria: "mesas-piedra-sinterizada" },
  { nombre: "Porcelanato Mármol Belvedere Black", slug: "belvedere-black", descripcion: "Fondo negro profundo con vetas doradas de lujo.", imagenes: ["/imagenes/mesas-piedra-sinterizada/belvedere-black.jpg"], categoria: "mesas-piedra-sinterizada" },
  { nombre: "Porcelanato Cemento Cosmopolita Ivory", slug: "cosmopolita-ivory", descripcion: "Estética urbana con textura cemento en tono marfil.", imagenes: ["/imagenes/mesas-piedra-sinterizada/cosmopolita-ivory.jpg"], categoria: "mesas-piedra-sinterizada" },
  { nombre: "Porcelanato Cemento Brera Fresh", slug: "brera-fresh", descripcion: "Estilo industrial moderno con acabado fresco y limpio.", imagenes: ["/imagenes/mesas-piedra-sinterizada/brera-fresh.jpg"], categoria: "mesas-piedra-sinterizada" },
  { nombre: "Mármol Lucca", slug: "lucca", descripcion: "Tonalidades suaves y elegancia natural atemporal.", imagenes: ["/imagenes/mesas-piedra-sinterizada/lucca.jpg"], categoria: "mesas-piedra-sinterizada" },
  { nombre: "Mármol LCP Pierre", slug: "lcp-pierre", descripcion: "Textura pétrea con carácter contemporáneo.", imagenes: ["/imagenes/mesas-piedra-sinterizada/lcp-pierre.jpg"], categoria: "mesas-piedra-sinterizada" },
  { nombre: "Mármol Labradorite Royal Blue Velvet", slug: "labradorite-royal-blue-velvet", descripcion: "Superficie exótica con reflejos azules intensos y profundidad visual.", imagenes: ["/imagenes/mesas-piedra-sinterizada/labradorite-royal-blue-velvet.jpg"], categoria: "mesas-piedra-sinterizada" },
  
  // MACETAS FIBRA DE VIDRIO
  { nombre: "Maceta Lunaris Mini", slug: "maceta-lunaris-mini", descripcion: "Diseño compacto y moderno en fibra de vidrio.", imagenes: ["/imagenes/maceta-lunaris-mini.jpg"], categoria: "macetas-fibra-vidrio" },
  { nombre: "Maceta Lunaris Normal", slug: "maceta-lunaris-normal", descripcion: "Equilibrio perfecto entre diseño y funcionalidad.", imagenes: ["/imagenes/maceta-lunaris-normal.jpg"], categoria: "macetas-fibra-vidrio" },
  { nombre: "Maceta Lunaris Plus", slug: "maceta-lunaris-plus", descripcion: "Formato amplio ideal para proyectos decorativos.", imagenes: ["/imagenes/maceta-lunaris-plus.jpg"], categoria: "macetas-fibra-vidrio" },
  { nombre: "Maceta Selene Mini", slug: "maceta-selene-mini", descripcion: "Estética minimalista con acabado premium.", imagenes: ["/imagenes/maceta-selene-mini.jpg"], categoria: "macetas-fibra-vidrio" },
  { nombre: "Maceta Selene Normal", slug: "maceta-selene-normal", descripcion: "Diseño versátil para interiores modernos.", imagenes: ["/imagenes/maceta-selene-normal.jpg"], categoria: "macetas-fibra-vidrio" },
  { nombre: "Maceta Selene Plus", slug: "maceta-selene-plus", descripcion: "Presencia imponente y resistencia superior.", imagenes: ["/imagenes/maceta-selene-plus.jpg"], categoria: "macetas-fibra-vidrio" },
  { nombre: "Maceta Prisma Mini", slug: "maceta-prisma-mini", descripcion: "Diseño geométrico moderno.", imagenes: ["/imagenes/maceta-prisma-mini.jpg"], categoria: "macetas-fibra-vidrio" },
  { nombre: "Maceta Prisma Plus", slug: "maceta-prisma-plus", descripcion: "Formato amplio con líneas definidas.", imagenes: ["/imagenes/maceta-prisma-plus.jpg"], categoria: "macetas-fibra-vidrio" },
  { nombre: "Maceta Lyra Prisma", slug: "maceta-lyra-prisma", descripcion: "Elegancia con diseño distintivo.", imagenes: ["/imagenes/maceta-lyra-prisma.jpg"], categoria: "macetas-fibra-vidrio" },
  { nombre: "Maceta Orion Lineal", slug: "maceta-orion-lineal", descripcion: "Diseño lineal ideal para separación de ambientes.", imagenes: ["/imagenes/maceta-orion-lineal.jpg"], categoria: "macetas-fibra-vidrio" },
  
  // REVESTIMIENTOS 3D
  { nombre: "Revestimiento 3D Abanico", slug: "revestimiento-abanico", descripcion: "Patrón dinámico con efecto envolvente.", imagenes: ["/imagenes/abanico.jpg"], categoria: "revestimientos-3d" },
  { nombre: "Revestimiento 3D Burbuja", slug: "revestimiento-burbuja", descripcion: "Diseño orgánico moderno.", imagenes: ["/imagenes/burbuja.jpg"], categoria: "revestimientos-3d" },
  { nombre: "Revestimiento 3D Calicanto", slug: "revestimiento-calicanto", descripcion: "Textura natural contemporánea.", imagenes: ["/imagenes/calicanto.jpg"], categoria: "revestimientos-3d" },
  { nombre: "Revestimiento 3D Cristal", slug: "revestimiento-cristal", descripcion: "Relieve elegante y sofisticado.", imagenes: ["/imagenes/cristal.jpg"], categoria: "revestimientos-3d" },
  { nombre: "Revestimiento 3D Elite", slug: "revestimiento-elite", descripcion: "Diseño exclusivo con textura premium.", imagenes: ["/imagenes/elite.jpg"], categoria: "revestimientos-3d" },
  { nombre: "Revestimiento 3D Evolución", slug: "revestimiento-evolucion", descripcion: "Relieve moderno con dinamismo visual.", imagenes: ["/imagenes/evolucion.jpg"], categoria: "revestimientos-3d" },
  { nombre: "Revestimiento 3D Ladrillo", slug: "revestimiento-ladrillo", descripcion: "Clásico diseño tipo ladrillo moderno.", imagenes: ["/imagenes/ladrillo.jpg"], categoria: "revestimientos-3d" },
  { nombre: "Revestimiento 3D Lucca", slug: "revestimiento-lucca", descripcion: "Textura arquitectónica elegante.", imagenes: ["/imagenes/lucca-3d.jpg"], categoria: "revestimientos-3d" },
  { nombre: "Revestimiento 3D Ola", slug: "revestimiento-ola", descripcion: "Movimiento visual fluido.", imagenes: ["/imagenes/ola.jpg"], categoria: "revestimientos-3d" },
  { nombre: "Revestimiento 3D Órbita", slug: "revestimiento-orbita", descripcion: "Diseño circular impactante.", imagenes: ["/imagenes/orbita.jpg"], categoria: "revestimientos-3d" },
  { nombre: "Revestimiento 3D Geométrico", slug: "revestimiento-geometrico", descripcion: "Patrones definidos contemporáneos.", imagenes: ["/imagenes/geometrico.jpg"], categoria: "revestimientos-3d" },
  { nombre: "Revestimiento 3D Quadrat", slug: "revestimiento-quadrat", descripcion: "Diseño estructurado moderno.", imagenes: ["/imagenes/quadrat.jpg"], categoria: "revestimientos-3d" },
  
  // MUEBLES DE MELAMINA
  { nombre: "Closets", slug: "closets", descripcion: "Closets personalizados en melamina de 15mm.", imagenes: ["/imagenes/closets.jpg"], categoria: "muebles-melamina" },
  { nombre: "Cocina en Melamina", slug: "cocina-melamina", descripcion: "Diseño funcional y moderno para cocinas.", imagenes: ["/imagenes/cocina-melamina.jpg"], categoria: "muebles-melamina" },
  { nombre: "Walking Closet", slug: "walking-closet", descripcion: "Espacios organizados y elegantes.", imagenes: ["/imagenes/walking-closet.jpg"], categoria: "muebles-melamina" },
  { nombre: "Baño Flotante de Melamina", slug: "bano-flotante-melamina", descripcion: "Diseño moderno suspendido.", imagenes: ["/imagenes/bano-flotante.jpg"], categoria: "muebles-melamina" },
  { nombre: "Centro de Entretenimiento", slug: "centro-entretenimiento", descripcion: "Soluciones modernas para sala.", imagenes: ["/imagenes/centro-entretenimiento.jpg"], categoria: "muebles-melamina" },
  { nombre: "Librerías", slug: "librerias", descripcion: "Diseño práctico y decorativo.", imagenes: ["/imagenes/librerias.jpg"], categoria: "muebles-melamina" },
  { nombre: "Recibidores", slug: "recibidores", descripcion: "Muebles elegantes para entradas.", imagenes: ["/imagenes/recibidores.jpg"], categoria: "muebles-melamina" },
  { nombre: "Repisas", slug: "repisas", descripcion: "Soluciones flotantes modernas.", imagenes: ["/imagenes/repisas.jpg"], categoria: "muebles-melamina" },
  { nombre: "Veladores", slug: "veladores", descripcion: "Complemento ideal para dormitorios.", imagenes: ["/imagenes/veladores.jpg"], categoria: "muebles-melamina" }
]

async function migrateProducts() {
  console.log('🚀 Iniciando migración de productos...\n')
  console.log(`📦 Total de productos a migrar: ${productos.length}\n`)

  // Transformar productos al formato de Supabase
  const productosSupabase = productos.map((producto, index) => ({
    nombre: producto.nombre,
    slug: producto.slug,
    descripcion: producto.descripcion,
    descripcion_larga: null,
    categoria: producto.categoria,
    subcategoria: null,
    imagenes: producto.imagenes,
    destacado: index < 6, // Los primeros 6 serán destacados
    orden: index + 1
  }))

  console.log('🔄 Limpiando tabla de productos existentes...')
  
  const { error: deleteError } = await supabase
    .from('productos')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000')

  if (deleteError) {
    console.warn('⚠️  Advertencia al limpiar:', deleteError.message)
  } else {
    console.log('✅ Tabla limpiada\n')
  }

  console.log('📤 Insertando productos en Supabase...')

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

  const { count: destacadosCount } = await supabase
    .from('productos')
    .select('*', { count: 'exact', head: true })
    .eq('destacado', true)

  console.log(`\n⭐ Productos destacados: ${destacadosCount}`)
  console.log('\n🎉 ¡Migración completada!')
}

migrateProducts()
  .then(() => {
    console.log('\n✅ Script finalizado exitosamente')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Error fatal:', error)
    process.exit(1)
  })
