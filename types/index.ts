export interface Producto {
  id: number
  nombre: string
  slug: string
  descripcion: string
  descripcion_larga?: string
  imagenes: string[]
  categoria: string
  subcategoria?: string
  destacado?: boolean
  aspectRatio?: number
  imageScale?: number
  precio?: number           // precio base en USD
  precioVariable?: boolean  // true = precio se calcula (muebles, mesas)
}

// --- CARRITO Y COTIZACIONES ---

export interface ConfiguracionMueble {
  alto: number
  profundidad: number
  ancho: number
  tipoMelamina: string
  colorMelamina: string
}

export interface CartItem {
  id: string                           // uuid único por item en carrito
  productoId: number
  nombre: string
  slug: string
  imagen: string
  categoria: string
  precio: number                       // precio final calculado
  precioBase: number                   // precio sin extras
  cantidad: number
  color?: string                       // para macetas y revestimientos
  colorEsEstandar?: boolean            // para calcular recargo macetas
  configuracion?: ConfiguracionMueble  // para muebles de melamina
  notaEspecial?: string
}

export interface ClienteData {
  nombres: string
  apellidos: string
  cedula: string
  telefono: string
  direccion: string
}

export interface QuotationRequest {
  cliente: ClienteData
  items: CartItem[]
  // descuento?: number  // preparado para futuro, oculto por ahora
}

export interface Quotation {
  id: string
  quotationNumber: string
  cliente: ClienteData
  items: CartItem[]
  subtotal: number
  // descuento?: number  // preparado para futuro, oculto por ahora
  total: number
  fechaEmision: string
  fechaValidez: string   // 15 días desde emisión
  status: 'pending' | 'sent' | 'viewed'
}

export interface MensajeContacto {
  id: string
  nombre: string
  email: string
  celular: string
  ciudad: string
  mensaje: string
  estado: "nuevo" | "leido" | "respondido"
  created_at: string
  leido_at?: string
}

export interface Proyecto {
  id: string
  nombre: string
  descripcion: string
  imagenes: string[]
  productos_usados: string[]
  fecha_realizacion: string
  destacado: boolean
  created_at: string
}

export interface UsuarioAdmin {
  id: string
  nombre: string
  email: string
  rol: string
  activo: boolean
  created_at: string
}

export type Categoria = 
  | "mesas-piedra-sinterizada"
  | "macetas-fibra-vidrio"
  | "revestimientos-3d"
  | "muebles-melamina"

export type Subcategoria = 
  | "cocinas"
  | "closets"
  | "muebles-entretenimiento"
  | "veladores"
  | "muebles-bano"
