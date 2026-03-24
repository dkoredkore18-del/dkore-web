// Agrupación de macetas por familia para mostrar una card por tipo
import { productos } from '@/data/productos'
import type { Producto } from '@/data/productos'

export interface MacetaFamilia {
  slug: string          // slug de la familia, ej: "timba"
  nombre: string        // nombre visible, ej: "Timba"
  descripcion: string
  portadaSlug: string   // slug del producto que se usa como portada
  variantes: Producto[] // todos los tamaños disponibles
}

// Orden de tamaños para mostrar en el selector
const ORDEN_TALLAS = ['mini', 'xs', 's', 'normal', 'm', 'l', 'plus', 'xl']

function ordenarVariantes(variantes: Producto[]): Producto[] {
  return [...variantes].sort((a, b) => {
    const tA = ORDEN_TALLAS.findIndex(t => a.slug.endsWith(`-${t}`))
    const tB = ORDEN_TALLAS.findIndex(t => b.slug.endsWith(`-${t}`))
    return (tA === -1 ? 99 : tA) - (tB === -1 ? 99 : tB)
  })
}

// Familias definidas manualmente para controlar nombre y descripción
const FAMILIAS_CONFIG: { slug: string; nombre: string; descripcion: string; prefijo: string }[] = [
  { slug: 'timba',      nombre: 'Timba',      descripcion: 'Diseño compacto y moderno en fibra de vidrio.',          prefijo: 'maceta-timba-' },
  { slug: 'nique',      nombre: 'Nique',      descripcion: 'Estética minimalista con acabado premium.',               prefijo: 'maceta-nique-' },
  { slug: 'cristal',    nombre: 'Cristal',    descripcion: 'Diseño geométrico moderno con líneas definidas.',         prefijo: 'maceta-cristal-' },
  { slug: 'diamante',   nombre: 'Diamante',   descripcion: 'Elegancia con diseño distintivo.',                        prefijo: 'maceta-diamante' },
  { slug: 'geometrica', nombre: 'Geométrica', descripcion: 'Diseño lineal ideal para separación de ambientes.',       prefijo: 'maceta-geometrica' },
  { slug: 'lineal',     nombre: 'Lineal',     descripcion: 'Diseño lineal versátil y funcional.',                     prefijo: 'maceta-lineal-' },
  { slug: 'jardinera',  nombre: 'Jardinera',  descripcion: 'Jardinera en fibra de vidrio para espacios exteriores.',  prefijo: 'maceta-jardinera-' },
  { slug: 'armonia',    nombre: 'Armonía',    descripcion: 'Diseño armónico y equilibrado.',                          prefijo: 'maceta-armonia-' },
  { slug: 'esferica',   nombre: 'Esférica',   descripcion: 'Forma esférica moderna en múltiples tamaños.',            prefijo: 'maceta-esferica-' },
  { slug: 'lisa',       nombre: 'Lisa',       descripcion: 'Diseño minimalista y limpio.',                            prefijo: 'maceta-lisa-' },
  { slug: 'totem',      nombre: 'Totem',      descripcion: 'Diseño vertical alargado tipo totem.',                    prefijo: 'maceta-totem-' },
]

export function getMacetasFamilias(): MacetaFamilia[] {
  const macetas = productos.filter(p => p.categoria === 'macetas-fibra-vidrio')

  return FAMILIAS_CONFIG.map(config => {
    const variantes = ordenarVariantes(
      macetas.filter(p =>
        config.prefijo.endsWith('-')
          ? p.slug.startsWith(config.prefijo)
          : p.slug === config.prefijo
      )
    )
    const portada = variantes[0]
    return {
      slug: config.slug,
      nombre: config.nombre,
      descripcion: config.descripcion,
      portadaSlug: portada?.slug ?? '',
      variantes,
    }
  }).filter(f => f.variantes.length > 0)
}

export function getMacetaFamilia(slug: string): MacetaFamilia | undefined {
  return getMacetasFamilias().find(f => f.slug === slug)
}

// Etiqueta legible para cada variante
export function etiquetaVariante(slug: string): string {
  const sufijos: Record<string, string> = {
    mini: 'Mini', xs: 'XS', s: 'S', normal: 'Normal',
    m: 'M', l: 'L', plus: 'Plus', xl: 'XL',
  }
  for (const [key, label] of Object.entries(sufijos)) {
    if (slug.endsWith(`-${key}`)) return label
  }
  return slug
}
