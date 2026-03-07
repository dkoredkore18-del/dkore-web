const SUPABASE_BASE = "https://pfvgoumghwtkrinhxgwa.supabase.co/storage/v1/object/public/productos-imagenes"

export const CATEGORIAS = [
  {
    slug: "mesas-piedra-sinterizada",
    nombre: "Mesas en Piedra Sinterizada",
    descripcion: "Elegancia y durabilidad en cada detalle",
    portada: `${SUPABASE_BASE}/portadas-de-catalogos/portada-mesas-piedra-sinterizada.png`
  },
  {
    slug: "macetas-fibra-vidrio",
    nombre: "Macetas en Fibra de Vidrio",
    descripcion: "Resistencia y belleza para tus espacios",
    portada: `${SUPABASE_BASE}/portadas-de-catalogos/portada-macetas.png`
  },
  {
    slug: "revestimientos-3d",
    nombre: "Revestimientos 3D",
    descripcion: "Transforma tus paredes con textura y estilo",
    portada: `${SUPABASE_BASE}/portadas-de-catalogos/portada-revestimientos3D.png`
  },
  {
    slug: "muebles-melamina",
    nombre: "Muebles de Melamina",
    descripcion: "Diseño moderno y funcional a medida",
    portada: `${SUPABASE_BASE}/portadas-de-catalogos/portada-muebles-melamina.png`
  }
] as const

export const SUBCATEGORIAS_MELAMINA = [
  {
    slug: "cocinas",
    nombre: "Cocinas",
    portada: `${SUPABASE_BASE}/muebles-de-melamina/cocinas/cocinas-portada.png`
  },
  {
    slug: "closets",
    nombre: "Closets",
    portada: `${SUPABASE_BASE}/muebles-de-melamina/closets/closet-portada.png`
  },
  {
    slug: "muebles-entretenimiento",
    nombre: "Muebles de Entretenimiento",
    portada: `${SUPABASE_BASE}/muebles-de-melamina/muebles-de-entretenimiento/mueble-entretenimiento-portada.png`
  },
  {
    slug: "veladores",
    nombre: "Veladores",
    portada: `${SUPABASE_BASE}/muebles-de-melamina/veladores/veladores-portada.png`
  },
  {
    slug: "muebles-bano",
    nombre: "Muebles de Baño",
    portada: `${SUPABASE_BASE}/muebles-de-melamina/muebles-de-bano/muebles-bano-portada.png`
  }
] as const

export const CIUDADES = [
  "Cuenca",
  "Guayaquil",
  "Quito",
  "Ambato"
] as const

export const CONTACTO = {
  whatsapp: "+593 99 921 5891",
  whatsappUrl: "https://wa.me/593999215891",
  email: "dkore.dkore.18@gmail.com",
  facebook: "https://www.facebook.com/dkore.decore.y.remodele/",
  instagram: "https://www.instagram.com/dkore.dkore/"
} as const

export const COLORES = {
  negro: "#000000",
  blanco: "#FFFFFF",
  dorado: "#C5A059",
  grisOscuro: "#171717",
  grisMedio: "#6B7280",
  grisClaro: "#F3F4F6"
} as const
