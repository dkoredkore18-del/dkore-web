// Precios centralizados de productos DKORE
// Actualizar aquí cuando cambien los precios

export const COLORES_ESTANDAR_MACETAS = ['negro', 'blanco', 'champán', 'champan']
export const RECARGO_COLOR_ESPECIAL = 0.05 // 5% adicional

// Precio por panel de revestimiento 3D (todos los modelos y colores)
export const PRECIO_REVESTIMIENTO_3D = 30

export const PRECIOS_MACETAS: Record<string, number> = {
  'maceta-timba-mini': 45,
  'maceta-timba-normal': 55,
  'maceta-timba-plus': 75,
  'maceta-nique-mini': 17,
  'maceta-nique-normal': 35,
  'maceta-nique-plus': 45,
  'maceta-cristal-mini': 45,
  'maceta-cristal-normal': 35,
  'maceta-cristal-plus': 45,
  'maceta-diamante': 45,
  'maceta-geometrica': 80,
  'maceta-esferica-xs': 50,
  'maceta-esferica-s': 60,
  'maceta-esferica-m': 75,
  'maceta-esferica-l': 95,
  'maceta-esferica-xl': 145,
  'maceta-lisa-normal': 60,
  'maceta-lisa-plus': 75,
  'maceta-lineal-normal': 50,
  'maceta-lineal-plus': 75,
  'maceta-armonia-normal': 50,
  'maceta-armonia-plus': 85,
  'maceta-jardinera-normal': 100,
  'maceta-jardinera-plus': 120,
  'maceta-totem-normal': 60,
  'maceta-totem-plus': 80,
}

// Precios por metro lineal de muebles de melamina
// TODO: completar cuando se definan los precios
export const PRECIOS_MELAMINA: Record<string, number> = {
  'closets': 0,           // pendiente
  'cocina-melamina': 0,   // pendiente
  'walking-closet': 0,    // pendiente
  'bano-flotante-melamina': 0,
  'centro-entretenimiento': 0,
  'librerias': 0,
  'recibidores': 0,
  'repisas': 0,
  'veladores': 0,
}

// Calcula el precio de una maceta según el color elegido
export function calcularPrecioMaceta(slug: string, color: string): number {
  const precioBase = PRECIOS_MACETAS[slug] ?? 0
  const colorNormalizado = color.toLowerCase().trim()
  const esEstandar = COLORES_ESTANDAR_MACETAS.includes(colorNormalizado)
  return esEstandar ? precioBase : precioBase * (1 + RECARGO_COLOR_ESPECIAL)
}

// Calcula el precio de un mueble de melamina según dimensiones
export function calcularPrecioMueble(
  slug: string,
  alto: number,
  profundidad: number,
  ancho: number
): number {
  const precioPorMetroLineal = PRECIOS_MELAMINA[slug] ?? 0
  // Por ahora usa metros lineales (ancho), se puede ajustar la fórmula
  return precioPorMetroLineal * ancho
}
