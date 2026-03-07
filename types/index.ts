export interface Producto {
  id: number
  nombre: string
  slug: string
  descripcion: string
  descripcion_larga?: string
  categoria: string
  subcategoria?: string
  imagenes: string[]
  destacado?: boolean
  orden?: number
  created_at?: string
  updated_at?: string
  aspectRatio?: number
  imageScale?: number
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
