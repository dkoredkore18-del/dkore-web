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
  aspectRatio?: number // Ej: 1.3 para 750x980, 1.25 para 4:5
  imageScale?: number // Ej: 1.2 para hacer zoom 20% a la imagen
}

export const productos: Producto[] = [

  /* MESAS EN PIEDRA SINTERIZADA */

  {
    id: 1,
    nombre: "Porcelanato Mármol Onice Black",
    slug: "onice-black",
    descripcion: "Acabado oscuro de alto impacto con vetas intensas tipo ónice.",
    descripcion_larga: "Mesa en piedra sinterizada con acabado mármol Onice Black. Placa de 12mm de grosor. Estructura resistente y duradera, ideal para espacios modernos que requieren elegancia y sofisticación. Superficie no porosa, fácil de limpiar y mantener. Dimensiones personalizables según necesidades del proyecto.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/mesas-en-piedra-sinterizada/Porcelanato-Marmol-Onice-Black1/Porcelanato-Marmol-Onice-Black1.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/mesas-en-piedra-sinterizada/Porcelanato-Marmol-Onice-Black1/Porcelanato-Marmol-Onice-Black2.png"
    ],
    categoria: "mesas-piedra-sinterizada",
        aspectRatio: 1.3067,
    imageScale: 1.56
  },
  {
    id: 2,
    nombre: "Porcelanato Mármol Estatuario Extra",
    slug: "estatuario-extra",
    descripcion: "Elegancia clásica en blanco con vetas grises sofisticadas.",
    descripcion_larga: "Mesa en piedra sinterizada con acabado mármol Estatuario Extra. Placa de 12mm de grosor. Diseño clásico con vetas grises que aportan carácter y distinción. Estructura robusta y resistente al desgaste. Perfecta para ambientes de lujo y espacios contemporáneos.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/mesas-en-piedra-sinterizada/Porcelanato-Marmol-Estatuario-Extra1/Porcelanato-Marmol-Estatuario-Extra1.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/mesas-en-piedra-sinterizada/Porcelanato-Marmol-Estatuario-Extra1/Porcelanato-Marmol-Estatuario-Extra2.png"
    ],
    categoria: "mesas-piedra-sinterizada",
        aspectRatio: 1.3067,
    imageScale: 1.91
  },
  {
    id: 3,
    nombre: "Porcelanato Mármol Calacata White",
    slug: "calacata-white",
    descripcion: "Diseño luminoso con vetas amplias y presencia moderna.",
    descripcion_larga: "Mesa en piedra sinterizada con acabado mármol Calacata White. Placa de 12mm de grosor. Superficie luminosa que amplía visualmente los espacios. Vetas amplias y definidas que crean un efecto visual impactante. Ideal para proyectos residenciales y comerciales de alto nivel.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/mesas-en-piedra-sinterizada/Porcelanato-Marmol-Calacata-White1/Porcelanato-Marmol-Calacata-White1.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/mesas-en-piedra-sinterizada/Porcelanato-Marmol-Calacata-White1/Porcelanato-Marmol-Calacata-White2.jpg"
    ],
    categoria: "mesas-piedra-sinterizada",
        aspectRatio: 1.3067,
    imageScale: 1.29
  },
  {
    id: 4,
    nombre: "Porcelanato Mármol Belvedere Black",
    slug: "belvedere-black",
    descripcion: "Fondo negro profundo con vetas doradas de lujo.",
    descripcion_larga: "Mesa en piedra sinterizada con acabado mármol Belvedere Black. Placa de 12mm de grosor. Fondo negro profundo con vetas doradas que aportan un toque de lujo y exclusividad. Estructura de máxima resistencia. Perfecta para espacios de diseño contemporáneo y sofisticado.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/mesas-en-piedra-sinterizada/Porcelanato-Marmol-Belvedere-Black1/Porcelanato-Marmol-Belvedere-Black1.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/mesas-en-piedra-sinterizada/Porcelanato-Marmol-Belvedere-Black1/Porcelanato-Marmol-Belvedere-Black2.png"
    ],
    categoria: "mesas-piedra-sinterizada",
        aspectRatio: 1.3067,
    imageScale: 1.23
  },
  {
    id: 5,
    nombre: "Porcelanato Cemento Cosmopolita Ivory",
    slug: "cosmopolita-ivory",
    descripcion: "Estética urbana con textura cemento en tono marfil.",
    descripcion_larga: "Mesa en piedra sinterizada con acabado cemento Cosmopolita Ivory. Placa de 12mm de grosor. Estética urbana y contemporánea con textura que simula cemento pulido. Tono marfil cálido que se adapta a diversos estilos de decoración. Superficie resistente y de bajo mantenimiento.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/mesas-en-piedra-sinterizada/Porcelanato-Cemento-Cosmopolita-Ivory1/Porcelanato-Cemento-Cosmopolita-Ivory1.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/mesas-en-piedra-sinterizada/Porcelanato-Cemento-Cosmopolita-Ivory1/Porcelanato-Cemento-Cosmopolita-Ivory2.png"
    ],
    categoria: "mesas-piedra-sinterizada",
        aspectRatio: 1.3067,
    imageScale: 1.25
  },
  {
    id: 6,
    nombre: "Porcelanato Cemento Brera Fresh",
    slug: "brera-fresh",
    descripcion: "Estilo industrial moderno con acabado fresco y limpio.",
    descripcion_larga: "Mesa en piedra sinterizada con acabado cemento Brera Fresh. Placa de 12mm de grosor. Estilo industrial moderno con acabado fresco y limpio. Textura que evoca el cemento pulido contemporáneo. Ideal para espacios loft, oficinas modernas y ambientes de diseño industrial.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/mesas-en-piedra-sinterizada/Porcelanato-Cemento-Brera-Fresh1/Porcelanato-Cemento-Brera-Fresh1.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/mesas-en-piedra-sinterizada/Porcelanato-Cemento-Brera-Fresh1/Porcelanato-Cemento-Brera-Fresh2.jpg"
    ],
    categoria: "mesas-piedra-sinterizada",
        aspectRatio: 1.3067,
    imageScale: 1.37
  },
  {
    id: 7,
    nombre: "Mármol Lucca",
    slug: "lucca",
    descripcion: "Tonalidades suaves y elegancia natural atemporal.",
    descripcion_larga: "Mesa en piedra sinterizada con acabado mármol Lucca. Placa de 12mm de grosor. Tonalidades suaves que transmiten elegancia y calidez. Diseño atemporal que se adapta a cualquier proyecto. Estructura duradera y resistente a cambios de temperatura.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/mesas-en-piedra-sinterizada/Marmol-Lucca1/Marmol-Lucca1.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/mesas-en-piedra-sinterizada/Marmol-Lucca1/Marmol-Lucca2.png"
    ],
    categoria: "mesas-piedra-sinterizada",
    aspectRatio: 1.3067,
    imageScale: 1.5
  },
  {
    id: 8,
    nombre: "Porcelanato-Mármol MARVEL DIVA Galaxy",
    slug: "marvel-diva-galaxy",
    descripcion: "Diseño galáctico con tonalidades profundas y sofisticadas.",
    descripcion_larga: "Mesa en piedra sinterizada con acabado porcelanato-mármol MARVEL DIVA Galaxy. Diseño galáctico con tonalidades profundas que aportan sofisticación y elegancia. Placa de 12mm de grosor. Superficie no porosa que garantiza higiene y facilidad de limpieza.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/mesas-en-piedra-sinterizada/Marmol-marvel-diva-galaxy/Marmol-marvel-diva-galaxy1.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/mesas-en-piedra-sinterizada/Marmol-marvel-diva-galaxy/Marmol-marvel-diva-galaxy2.png"
    ],
    categoria: "mesas-piedra-sinterizada",
    aspectRatio: 1.3067,
    imageScale: 1.4
  },
  {
    id: 9,
    nombre: "Mármol Labradorite Royal Blue Velvet",
    slug: "labradorite-royal-blue-velvet",
    descripcion: "Superficie exótica con reflejos azules intensos y profundidad visual.",
    descripcion_larga: "Mesa en piedra sinterizada con acabado mármol Labradorite Royal Blue Velvet. Placa de 12mm de grosor. Superficie exótica con reflejos azules intensos que crean profundidad visual. Diseño exclusivo y sofisticado. Ideal para proyectos de lujo y espacios que requieren impacto visual.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/mesas-en-piedra-sinterizada/Marmol-Labradorite-Royal-Blue-Velvet1/Marmol-Labradorite-Royal-Blue-Velvet1.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/mesas-en-piedra-sinterizada/Marmol-Labradorite-Royal-Blue-Velvet1/Marmol-Labradorite-Royal-Blue-Velvet2.png"
    ],
    categoria: "mesas-piedra-sinterizada",
    aspectRatio: 1.3067,
    imageScale: 1.6
  },

  /* MACETAS FIBRA DE VIDRIO */

  { 
    id: 10, 
    nombre: "Maceta Timba Mini", 
    slug: "maceta-timba-mini", 
    descripcion: "Diseño compacto y moderno en fibra de vidrio.", 
    descripcion_larga: "Maceta Timba Mini en fibra de vidrio de alta calidad. Diseño compacto ideal para plantas pequeñas y decoración de espacios reducidos. Resistente a la intemperie y UV. Acabado moderno que se adapta a cualquier estilo decorativo.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/timbas/timba-mini/timba-mini-blanco.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/timbas/timba-mini/timba-mini-champan.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/timbas/timba-mini/timba-mini-negro.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/timbas/timba-mini/timba-mini1.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/timbas/timba-mini/timba-mini2.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/timbas/timba-mini/timba-mini3.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/timbas/timba-mini/timba-mini4.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/timbas/timba-mini/timba-mini5.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/timbas/timba-mini/timba-mini6.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/timbas/timba-mini/timba-mini7.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/timbas/timba-mini/timba-mini8.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/timbas/timba-mini/timba-mini9.png"
    ], 
    categoria: "macetas-fibra-vidrio",
    aspectRatio: 1.3067,
    imageScale: 1.15
  },
  { 
    id: 11, 
    nombre: "Maceta Timba Normal", 
    slug: "maceta-timba-normal", 
    descripcion: "Equilibrio perfecto entre diseño y funcionalidad.", 
    descripcion_larga: "Maceta Timba Normal en fibra de vidrio. Tamaño versátil que se adapta a la mayoría de plantas. Equilibrio perfecto entre estética y funcionalidad. Resistente y duradera, ideal para interiores y exteriores.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/tinba%20normal/timba-normal-blanco.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/tinba%20normal/timba-normal-champan.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/tinba%20normal/timba-normal-negra.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/tinba%20normal/timba-normal1.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/tinba%20normal/timba-normal2.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/tinba%20normal/timba-normal3.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/tinba%20normal/timba-normal4.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/tinba%20normal/timba-normal5.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/tinba%20normal/timba-normal6.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/tinba%20normal/timba-normal7.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/tinba%20normal/timba-normal8.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/tinba%20normal/timba-normal9.png"
    ], 
    categoria: "macetas-fibra-vidrio" 
  },
  { 
    id: 12, 
    nombre: "Maceta Timba Plus", 
    slug: "maceta-timba-plus", 
    descripcion: "Formato amplio ideal para proyectos decorativos.", 
    descripcion_larga: "Maceta Timba Plus en fibra de vidrio. Formato amplio perfecto para plantas grandes y proyectos decorativos de impacto. Estructura robusta y resistente. Ideal para jardines, terrazas y espacios comerciales.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/timbas/timba-plus/timba-plus-blanco.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/timbas/timba-plus/timba-plus-champan.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/timbas/timba-plus/timba-plus-negro.png"
    ], 
    categoria: "macetas-fibra-vidrio",
    aspectRatio: 1.3067,
    imageScale: 1.15  
  },
  { 
    id: 13, 
    nombre: "Maceta Nique Mini", 
    slug: "maceta-nique-mini", 
    descripcion: "Estética minimalista con acabado premium.", 
    descripcion_larga: "Maceta Nique Mini en fibra de vidrio. Estética minimalista y elegante con acabado premium. Tamaño compacto para plantas pequeñas. Perfecta para decoración moderna y espacios contemporáneos.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/niques/nique-mini/nique-mini-blanco.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/niques/nique-mini/nique-mini-chanpan.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/niques/nique-mini/nique-mini-negro.png"
    ], 
    categoria: "macetas-fibra-vidrio",
    aspectRatio: 1.3067,
    imageScale: 1.179
  },
  { 
    id: 14, 
    nombre: "Maceta Nique Normal", 
    slug: "maceta-nique-normal", 
    descripcion: "Diseño versátil para interiores modernos.", 
    descripcion_larga: "Maceta Nique Normal en fibra de vidrio. Diseño versátil y elegante que se adapta a cualquier ambiente moderno. Acabado premium con líneas limpias. Resistente y fácil de mantener.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/niques/nique-normal/nique-normal-blanco.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/niques/nique-normal/nique-normal-champan.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/niques/nique-normal/nique-normal-negro.png"
    ], 
    categoria: "macetas-fibra-vidrio",
    aspectRatio: 1.3067,
    imageScale: 1.179    
  },
  { 
    id: 15, 
    nombre: "Maceta Nique Plus", 
    slug: "maceta-nique-plus", 
    descripcion: "Presencia imponente y resistencia superior.", 
    descripcion_larga: "Maceta Nique Plus en fibra de vidrio. Tamaño grande con presencia imponente. Resistencia superior y acabado premium. Ideal para plantas grandes y proyectos de decoración de alto impacto.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/niques/nique-plus/nique-plus-blanco.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/niques/nique-plus/nique-plus-champane.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/niques/nique-plus/nique-plus-negro.png"
    ], 
    categoria: "macetas-fibra-vidrio",
    aspectRatio: 1.3067,
    imageScale: 1.179
  },
  { 
    id: 16, 
    nombre: "Maceta Cristal Mini", 
    slug: "maceta-cristal-mini", 
    descripcion: "Diseño geométrico moderno.", 
    descripcion_larga: "Maceta Cristal Mini en fibra de vidrio. Diseño geométrico contemporáneo con líneas definidas. Tamaño compacto para plantas pequeñas. Perfecta para espacios modernos y minimalistas.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/cristales/cristal-mini/cristal-mini-blanco.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/cristales/cristal-mini/cristal-mini-champan.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/cristales/cristal-mini/cristal-mini-negro.png"
    ], 
    categoria: "macetas-fibra-vidrio",
    aspectRatio: 1.3067,
    imageScale: 1.179
  },
  { 
    id: 17, 
    nombre: "Maceta Cristal Plus", 
    slug: "maceta-cristal-plus", 
    descripcion: "Formato amplio con líneas definidas.", 
    descripcion_larga: "Maceta Cristal Plus en fibra de vidrio. Formato amplio con diseño geométrico de líneas definidas. Estructura robusta y resistente. Ideal para plantas grandes y proyectos decorativos de impacto visual.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/cristales/cristal-plus/cristal-plus-blanco.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/cristales/cristal-plus/cristal-plus-champan.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/cristales/cristal-plus/cristal-plus-negro.png"
    ], 
    categoria: "macetas-fibra-vidrio",
    aspectRatio: 1.3067,
    imageScale: 1.179
  },
  { 
    id: 18, 
    nombre: "Maceta Diamante", 
    slug: "maceta-diamante", 
    descripcion: "Elegancia con diseño distintivo.", 
    descripcion_larga: "Maceta Diamante en fibra de vidrio. Diseño distintivo que combina elegancia y modernidad. Acabado premium con líneas geométricas. Perfecta para espacios que requieren presencia visual.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/diamante/diamante-blanco.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/diamante/diamante-champan.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/diamante/diamante-negro.png"
    ], 
    categoria: "macetas-fibra-vidrio", 
    aspectRatio: 1.3067,
    imageScale: 1.179
  },
  { 
    id: 19, 
    nombre: "Maceta Geométrica", 
    slug: "maceta-geometrica", 
    descripcion: "Diseño lineal ideal para separación de ambientes.", 
    descripcion_larga: "Maceta Geométrica en fibra de vidrio. Diseño lineal y alargado ideal para separar ambientes o crear divisiones decorativas. Estructura resistente. Perfecta para proyectos de paisajismo interior y exterior.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/geometrica/geometrica-blanco.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/geometrica/geometrica-champan.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/geometrica/geometrica-negro.png"
    ], 
    categoria: "macetas-fibra-vidrio",
    aspectRatio: 1.3067,
    imageScale: 1.179
  },
  { 
    id: 20, 
    nombre: "Maceta Lineal Normal", 
    slug: "maceta-lineal-normal", 
    descripcion: "Diseño lineal versátil y funcional.", 
    descripcion_larga: "Maceta Lineal Normal en fibra de vidrio. Diseño lineal que combina funcionalidad y estética moderna. Ideal para crear divisiones decorativas o alineaciones de plantas. Estructura resistente y duradera.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/lineales/lineal-normal/lineal-blanco.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/lineales/lineal-normal/lineal-champan.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/lineales/lineal-normal/lineal-negra.png"
    ], 
    categoria: "macetas-fibra-vidrio",
    aspectRatio: 1.3067,
    imageScale: 1.179
  },
  { 
    id: 21, 
    nombre: "Maceta Lineal Plus", 
    slug: "maceta-lineal-plus", 
    descripcion: "Formato amplio con diseño lineal.", 
    descripcion_larga: "Maceta Lineal Plus en fibra de vidrio. Formato amplio con diseño lineal para proyectos decorativos de gran escala. Estructura robusta y resistente. Perfecta para paisajismo profesional.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/lineales/lineal-plus/lineal-plus-blanco.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/lineales/lineal-plus/lineal-plus-champan.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/lineales/lineal-plus/lineal-plus-negro.png"
    ], 
    categoria: "macetas-fibra-vidrio",
    aspectRatio: 1.3067,
    imageScale: 1.15
  },
  { 
    id: 22, 
    nombre: "Maceta Jardinera Normal", 
    slug: "maceta-jardinera-normal", 
    descripcion: "Jardinera compacta para espacios reducidos.", 
    descripcion_larga: "Maceta Jardinera Normal en fibra de vidrio. Diseño compacto ideal para balcones y espacios pequeños. Perfecta para múltiples plantas o flores. Acabado moderno y resistente.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/jardineras/jardinera-normal/jardinera-normal-blanca.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/jardineras/jardinera-normal/jardinera-normal-negra.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/jardineras/jardinera-normal/jardinera-normal-champan.png"
    ], 
    categoria: "macetas-fibra-vidrio",
    aspectRatio: 1.3067,
    imageScale: 1.169
  },
  { 
    id: 23, 
    nombre: "Maceta Jardinera Plus", 
    slug: "maceta-jardinera-plus", 
    descripcion: "Jardinera amplia para proyectos decorativos.", 
    descripcion_larga: "Maceta Jardinera Plus en fibra de vidrio. Formato amplio ideal para crear composiciones florales de impacto. Estructura robusta y resistente. Perfecta para terrazas y jardines.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/jardineras/jardinera-plus/jardinera-plus-blanco.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/jardineras/jardinera-plus/jardinera-plus-champan.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/jardineras/jardinera-plus/jardinera-plus-negro.png"
    ], 
    categoria: "macetas-fibra-vidrio",
    aspectRatio: 1.3067,
    imageScale: 1.169
  },
  { 
    id: 24, 
    nombre: "Maceta Armonía Normal", 
    slug: "maceta-armonia-normal", 
    descripcion: "Diseño armónico y equilibrado.", 
    descripcion_larga: "Maceta Armonía Normal en fibra de vidrio. Diseño armónico que transmite equilibrio y serenidad. Tamaño versátil para plantas medianas. Acabado moderno que se adapta a cualquier ambiente.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/armonias/armonia-normal/armonia-normal1.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/armonias/armonia-normal/armonia-normal2.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/armonias/armonia-normal/armonia-normal3.png"
    ], 
    categoria: "macetas-fibra-vidrio",
    aspectRatio: 1.3067,
    imageScale: 1.15
  },
  { 
    id: 25, 
    nombre: "Maceta Armonía Plus", 
    slug: "maceta-armonia-plus", 
    descripcion: "Formato amplio con diseño armónico.", 
    descripcion_larga: "Maceta Armonía Plus en fibra de vidrio. Formato amplio con diseño armónico y equilibrado. Estructura robusta para plantas grandes. Ideal para proyectos decorativos de impacto.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/armonias/armonia-plus/armonia-plus1.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/armonias/armonia-plus/armonia-plus2.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/armonias/armonia-plus/armonia-plus3.png"
    ], 
    categoria: "macetas-fibra-vidrio",
    aspectRatio: 1.3067,
    imageScale: 1.15
  },
  { 
    id: 26, 
    nombre: "Maceta Esférica M", 
    slug: "maceta-esferica-m", 
    descripcion: "Forma esférica moderna tamaño medio.", 
    descripcion_larga: "Maceta Esférica M en fibra de vidrio. Forma esférica moderna en tamaño medio. Diseño contemporáneo que aporta dinamismo. Perfecta para plantas decorativas.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/esfericas/esferica-m/esferica-m1.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/esfericas/esferica-m/esferica-m2.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/esfericas/esferica-m/esferica-m3.png"
    ], 
    categoria: "macetas-fibra-vidrio",
    aspectRatio: 1.3067,
    imageScale: 1.15
  },
  { 
    id: 27, 
    nombre: "Maceta Esférica XS", 
    slug: "maceta-esferica-xs", 
    descripcion: "Forma esférica compacta extra pequeña.", 
    descripcion_larga: "Maceta Esférica XS en fibra de vidrio. Forma esférica compacta en tamaño extra pequeño. Ideal para plantas pequeñas y decoración minimalista. Acabado moderno.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/esfericas/esferica-xs/esferica-xs1.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/esfericas/esferica-xs/esferica-xs2.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/esfericas/esferica-xs/esferica-xs3.png"
    ], 
    categoria: "macetas-fibra-vidrio",
    aspectRatio: 1.3067,
    imageScale: 1.15
  },
  { 
    id: 28, 
    nombre: "Maceta Esférica S", 
    slug: "maceta-esferica-s", 
    descripcion: "Forma esférica pequeña versátil.", 
    descripcion_larga: "Maceta Esférica S en fibra de vidrio. Forma esférica pequeña y versátil. Diseño moderno para plantas pequeñas. Perfecta para espacios reducidos.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/esfericas/esferica-s/esferica-s1.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/esfericas/esferica-s/esferica-s2.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/esfericas/esferica-s/esferica-s3.png"
    ], 
    categoria: "macetas-fibra-vidrio",
    aspectRatio: 1.3067,
    imageScale: 1.15
  },
  { 
    id: 29, 
    nombre: "Maceta Esférica XL", 
    slug: "maceta-esferica-xl", 
    descripcion: "Forma esférica grande impactante.", 
    descripcion_larga: "Maceta Esférica XL en fibra de vidrio. Forma esférica grande y impactante. Tamaño XL para plantas grandes. Ideal para proyectos decorativos de presencia visual.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/esfericas/esferica-xl/esferica-xl1.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/esfericas/esferica-xl/esferica-xl2.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/esfericas/esferica-xl/esferica-xl3.png"
    ], 
    categoria: "macetas-fibra-vidrio",
    aspectRatio: 1.3067,
    imageScale: 1.15
  },
  { 
    id: 30, 
    nombre: "Maceta Esférica L", 
    slug: "maceta-esferica-l", 
    descripcion: "Forma esférica grande versátil.", 
    descripcion_larga: "Maceta Esférica L en fibra de vidrio. Forma esférica grande y versátil. Tamaño L para plantas medianas a grandes. Diseño moderno y sofisticado.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/esfericas/esferica-l/esferica-l1.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/esfericas/esferica-l/esferica-l2.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/esfericas/esferica-l/esferica-l3.png"
    ], 
    categoria: "macetas-fibra-vidrio",
    aspectRatio: 1.3067,
    imageScale: 1.15
  },
  { 
    id: 31, 
    nombre: "Maceta Lisa Normal", 
    slug: "maceta-lisa-normal", 
    descripcion: "Diseño minimalista y limpio.", 
    descripcion_larga: "Maceta Lisa Normal en fibra de vidrio. Diseño minimalista y limpio con acabado liso. Tamaño normal versátil. Perfecta para espacios modernos y contemporáneos.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/lisas/lisa-normal/lisa-normal1.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/lisas/lisa-normal/lisa-normal2.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/lisas/lisa-normal/lisa-normal3.png"
    ], 
    categoria: "macetas-fibra-vidrio",
    aspectRatio: 1.3067,
    imageScale: 1.15
  },
  { 
    id: 32, 
    nombre: "Maceta Lisa Plus", 
    slug: "maceta-lisa-plus", 
    descripcion: "Formato amplio minimalista.", 
    descripcion_larga: "Maceta Lisa Plus en fibra de vidrio. Formato amplio con diseño minimalista y acabado liso. Estructura robusta para plantas grandes. Ideal para decoración contemporánea.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/lisas/lisa-plus/lisa-plus1.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/lisas/lisa-plus/lisa-plus2.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/lisas/lisa-plus/lisa-plus3.png"
    ], 
    categoria: "macetas-fibra-vidrio",
    aspectRatio: 1.3067,
    imageScale: 1.15
  },
  { 
    id: 33, 
    nombre: "Maceta Totem Normal", 
    slug: "maceta-totem-normal", 
    descripcion: "Diseño vertical alargado.", 
    descripcion_larga: "Maceta Totem Normal en fibra de vidrio. Diseño vertical alargado tipo totem. Tamaño normal para plantas trepadoras. Ideal para crear divisiones decorativas.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/totems/totem-normal/totem-normal1.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/totems/totem-normal/totem-normal2.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/totems/totem-normal/totem-normal3.png"
    ], 
    categoria: "macetas-fibra-vidrio",
    aspectRatio: 1.3067,
    imageScale: 1.15
  },
  { 
    id: 34, 
    nombre: "Maceta Totem Plus", 
    slug: "maceta-totem-plus", 
    descripcion: "Diseño vertical amplio impactante.", 
    descripcion_larga: "Maceta Totem Plus en fibra de vidrio. Diseño vertical amplio tipo totem. Tamaño plus para plantas grandes trepadoras. Estructura robusta y presencia visual impactante.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/totems/totem-plus/totem-plus1.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/totems/totem-plus/totem-plus2.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/macetas/totems/totem-plus/totem-plus3.png"
    ], 
    categoria: "macetas-fibra-vidrio",
    aspectRatio: 1.3067,
    imageScale: 1.15
  },

  /* REVESTIMIENTOS 3D */

  { 
    id: 35,
    nombre: "Revestimiento 3D Abanico", 
    slug: "revestimiento-abanico", 
    descripcion: "Patrón dinámico con efecto envolvente.", 
    descripcion_larga: "Revestimiento 3D Abanico. Patrón dinámico que crea efecto envolvente en las paredes. Diseño que juega con la luz y sombra. Ideal para espacios que requieren movimiento visual y sofisticación.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/abanico/abanico-bl.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/abanico/abanico-ng.png",
    ],
    categoria: "revestimientos-3d",
    aspectRatio: 1.126,
    imageScale: 1.28
  },
  { 
    id: 36,
    nombre: "Revestimiento 3D Burbuja", 
    slug: "revestimiento-burbuja", 
    descripcion: "Diseño orgánico moderno.", 
    descripcion_larga: "Revestimiento 3D Burbuja. Diseño orgánico y moderno con formas redondeadas. Crea profundidad y movimiento en las paredes. Perfecto para espacios contemporáneos que buscan innovación.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/burbuja/burbuja-bl.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/burbuja/burbuja-ng.png",
    ], 
    categoria: "revestimientos-3d",
    aspectRatio: 1.126,
    imageScale: 1.0002
  },
  { 
    id: 37,
    nombre: "Revestimiento 3D Calicanto", 
    slug: "revestimiento-calicanto", 
    descripcion: "Textura natural contemporánea.", 
    descripcion_larga: "Revestimiento 3D Calicanto. Textura natural que evoca piedra y materiales rústicos. Acabado contemporáneo que aporta calidez. Ideal para espacios que buscan equilibrio entre naturaleza y modernidad.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/calicanto/calicanto-bl.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/calicanto/calicanto-ng.png",
    ], 
    categoria: "revestimientos-3d",
    aspectRatio: 1.126,
    imageScale: 1
  },
  { 
    id: 38,
    nombre: "Revestimiento 3D Cristal", 
    slug: "revestimiento-cristal", 
    descripcion: "Relieve elegante y sofisticado.", 
    descripcion_larga: "Revestimiento 3D Cristal. Relieve elegante que simula cristal facetado. Diseño sofisticado que refleja luz. Perfecto para espacios de lujo y ambientes que requieren presencia visual.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/cristal/cristal-bl.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/cristal/cristal-ng.png",

    ], 
    categoria: "revestimientos-3d",
    aspectRatio: 1.126,
    imageScale: 1.009
  },
  { 
    id: 39,
    nombre: "Revestimiento 3D Elite", 
    slug: "revestimiento-elite", 
    descripcion: "Diseño exclusivo con textura premium.", 
    descripcion_larga: "Revestimiento 3D Elite. Diseño exclusivo con textura premium. Acabado de lujo que aporta distinción. Ideal para proyectos de alto nivel y espacios que requieren exclusividad.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/elite/elite-bl.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/elite/elite-ng.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/elite/elite2x2-bl.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/elite/elite2x2-ng.png"
    ], 
    categoria: "revestimientos-3d",
    aspectRatio: 1.064,
    imageScale: 1
  },
  { 
    id: 29, 
    nombre: "Revestimiento 3D Evolución", 
    slug: "revestimiento-evolucion", 
    descripcion: "Relieve moderno con dinamismo visual.", 
    descripcion_larga: "Revestimiento 3D Evolución. Relieve moderno que transmite movimiento y dinamismo. Diseño contemporáneo que evoluciona visualmente. Perfecto para espacios innovadores.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/evolucion/evolucion-bl.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/evolucion/evolucion-ng.png",

    ], 
    categoria: "revestimientos-3d",
    aspectRatio: 1.064,
    imageScale: 1.1
  },
  { 
    id: 41,
    nombre: "Revestimiento 3D Ladrillo", 
    slug: "revestimiento-ladrillo", 
    descripcion: "Clásico diseño tipo ladrillo moderno.", 
    descripcion_larga: "Revestimiento 3D Ladrillo. Diseño clásico tipo ladrillo con acabado moderno. Textura que evoca construcción tradicional con estética contemporánea. Ideal para espacios industriales y lofts.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/ladrillo/ladrillo-bl.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/ladrillo/ladrillo-ng.png",
    ], 
    categoria: "revestimientos-3d",
    aspectRatio: 1.064,
    imageScale: 1.1
  },
  { 
    id: 42,
    nombre: "Revestimiento 3D Lucca", 
    slug: "revestimiento-lucca", 
    descripcion: "Textura arquitectónica elegante.", 
    descripcion_larga: "Revestimiento 3D Lucca. Textura arquitectónica elegante con líneas definidas. Diseño que aporta estructura y sofisticación. Perfecto para espacios que requieren presencia visual.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/lucca/lucca-bl.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/lucca/lucca-ng.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/lucca/lucca2x2-bl.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/lucca/lucca2x2-ng.png",

    ], 
    categoria: "revestimientos-3d" ,
    aspectRatio: 1.064,
    imageScale: 1
  },
  { 
    id: 43,
    nombre: "Revestimiento 3D Ola", 
    slug: "revestimiento-ola", 
    descripcion: "Movimiento visual fluido.", 
    descripcion_larga: "Revestimiento 3D Ola. Diseño con movimiento visual fluido que evoca olas. Relieve dinámico que crea profundidad. Ideal para espacios que buscan fluidez y movimiento.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/ola/ola-bl.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/ola/ola-ng.png",
    ], 
    categoria: "revestimientos-3d",
    aspectRatio:1.064,
    imageScale: 1.07
  },
  { 
    id: 33, 
    nombre: "Revestimiento 3D Órbita", 
    slug: "revestimiento-orbita", 
    descripcion: "Diseño circular impactante.", 
    descripcion_larga: "Revestimiento 3D Órbita. Diseño circular impactante con formas concéntricas. Relieve que crea profundidad visual. Perfecto para espacios que requieren presencia y dinamismo.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/orbita/orbita-bl.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/orbita/orbita-ng.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/orbita/orbita2x2-bl.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/orbita/orbita2x2-ng.png",
    ], 
    categoria: "revestimientos-3d",
    aspectRatio: 1.064,
    imageScale: 1.0099
  },
  { 
    id: 34, 
    nombre: "Revestimiento 3D Geométrico", 
    slug: "revestimiento-geometrico", 
    descripcion: "Patrones definidos contemporáneos.", 
    descripcion_larga: "Revestimiento 3D Geométrico. Patrones geométricos definidos con acabado contemporáneo. Diseño que aporta orden y modernidad. Ideal para espacios minimalistas y contemporáneos.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/geometrico/geometrico-bl.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/geometrico/geometrico-ng.png",
    ], 
    categoria: "revestimientos-3d",
    aspectRatio: 1.064,
    imageScale: 1.1
  },
  { 
    id: 46,
    nombre: "Revestimiento 3D Quadrat", 
    slug: "revestimiento-quadrat", 
    descripcion: "Diseño estructurado moderno.", 
    descripcion_larga: "Revestimiento 3D Quadrat. Diseño estructurado con formas cuadradas. Acabado moderno que aporta orden y sofisticación. Perfecto para espacios contemporáneos.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/quadrat/auadrat2x2-bl.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/quadrat/quadrat-bl.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/quadrat/quadrat-ng.png",
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/revestimientos-3D/quadrat/quadrat2x2-ng.png",
    ],
    categoria: "revestimientos-3d",
    aspectRatio: 1.064,
    imageScale: 1.1
  },

  /* MUEBLES DE MELAMINA */

  { 
    id: 47,
    nombre: "Closets", 
    slug: "closets", 
    descripcion: "Closets personalizados en melamina de 15mm.", 
    descripcion_larga: "Closets personalizados en melamina de 15mm de alta calidad. Diseño funcional que maximiza el espacio de almacenamiento. Acabado moderno con múltiples opciones de configuración. Ideal para dormitorios y espacios de almacenamiento.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/muebles-de-melamina/closets/closet1.png",
    ], 
    categoria: "muebles-melamina",
    subcategoria: "closets",
    aspectRatio: 1.3,
    imageScale: 1.15
  },
  { 
    id: 48,
    nombre: "Cocina en Melamina", 
    slug: "cocina-melamina", 
    descripcion: "Diseño funcional y moderno para cocinas.", 
    descripcion_larga: "Cocina en melamina de 15mm con diseño funcional y moderno. Estructura resistente y duradera. Múltiples opciones de configuración según necesidades. Acabado de calidad que facilita la limpieza y mantenimiento.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/muebles-de-melamina/cocinas/cocina1.png",

    ], 
    categoria: "muebles-melamina",
    subcategoria: "cocinas",
    aspectRatio: 1.3067,
    imageScale: 1.11
  },
  { 
    id: 49,
    nombre: "Walking Closet", 
    slug: "walking-closet", 
    descripcion: "Espacios organizados y elegantes.", 
    descripcion_larga: "Walking Closet en melamina. Espacios organizados y elegantes para guardarropa. Diseño que optimiza el almacenamiento. Acabado premium que aporta sofisticación. Ideal para espacios amplios.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/muebles-de-melamina/closets/walking-closet1.png",
    ], 
    categoria: "muebles-melamina",
    subcategoria: "closets",
    aspectRatio: 1.3,
    imageScale: 1.04
    
  },
  { 
    id: 39, 
    nombre: "Baño Flotante de Melamina", 
    slug: "bano-flotante-melamina", 
    descripcion: "Diseño moderno suspendido.", 
    descripcion_larga: "Baño flotante en melamina con diseño moderno suspendido. Estructura que crea sensación de amplitud. Acabado resistente a la humedad. Perfecto para baños contemporáneos.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/muebles-de-melamina/muebles-de-bano/muebles-bano1.png",
    ], 
    categoria: "muebles-melamina",
    subcategoria: "muebles-bano",
    aspectRatio: 1.3,
    imageScale: 1.1499
  },
  { 
    id: 51,
    nombre: "Centro de Entretenimiento", 
    slug: "centro-entretenimiento", 
    descripcion: "Soluciones modernas para sala.", 
    descripcion_larga: "Centro de entretenimiento en melamina. Soluciones modernas para organizar equipos audiovisuales. Diseño que combina funcionalidad y estética. Ideal para salas contemporáneas.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/muebles-de-melamina/muebles-de-entretenimiento/mueble-entretenimiento1.png",
    ], 
    categoria: "muebles-melamina",
    subcategoria: "muebles-entretenimiento",
    aspectRatio: 1.3,
    imageScale: 1.11  
  },
  { 
    id: 41, 
    nombre: "Librerías", 
    slug: "librerias", 
    descripcion: "Diseño práctico y decorativo.", 
    descripcion_larga: "Librerías en melamina con diseño práctico y decorativo. Estructura que permite múltiples configuraciones. Acabado que se adapta a cualquier estilo. Ideal para espacios que requieren almacenamiento y decoración.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/muebles-de-melamina/muebles-de-entretenimiento/libreria1.png"
      ], 
    categoria: "muebles-melamina",
    subcategoria: "muebles-entretenimiento",
    aspectRatio: 1.3,
    imageScale: 1.15
  },
  { 
    id: 53,
    nombre: "Recibidores", 
    slug: "recibidores", 
    descripcion: "Muebles elegantes para entradas.", 
    descripcion_larga: "Recibidores en melamina con diseño elegante. Muebles que crean primera impresión. Estructura funcional con acabado premium. Perfecto para entradas y espacios de transición.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/muebles-de-melamina/muebles-de-entretenimiento/recibidor1.png"
    ], 
    categoria: "muebles-melamina",
    subcategoria: "muebles-entretenimiento",
    aspectRatio: 1.3,
    imageScale: 1.15
  },
  { 
    id: 54,
    nombre: "Repisas", 
    slug: "repisas", 
    descripcion: "Soluciones flotantes modernas.", 
    descripcion_larga: "Repisas flotantes en melamina. Soluciones modernas que crean amplitud visual. Diseño minimalista que se adapta a cualquier espacio. Ideal para decoración y almacenamiento.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/muebles-de-melamina/muebles-de-entretenimiento/repisas1.png"
    ], 
    categoria: "muebles-melamina",
    subcategoria: "muebles-entretenimiento",
    aspectRatio: 1.3,
    imageScale: 1.119
  },
  { 
    id: 55,
    nombre: "Veladores", 
    slug: "veladores", 
    descripcion: "Complemento ideal para dormitorios.", 
    descripcion_larga: "Veladores en melamina. Complemento ideal para dormitorios y espacios de descanso. Diseño funcional con acabado moderno. Múltiples opciones de tamaño y configuración.",
    imagenes: [
      "https://ofygrgagyodbmifsozcy.supabase.co/storage/v1/object/public/Dkore/muebles-de-melamina/veladores/veladores1.png",
    ], 
    categoria: "muebles-melamina",
    subcategoria: "veladores",
    aspectRatio: 1.3,
    imageScale: 1.1
  },

  /* MATERIAL ELÉCTRICO */

  { 
    id: 56,
    nombre: "Caja de Embutir", 
    slug: "caja-embutir", 
    descripcion: "Base resistente para instalaciones eléctricas.", 
    descripcion_larga: "Caja de embutir para instalaciones eléctricas. Base resistente y duradera. Diseño que facilita la instalación de interruptores y tomacorrientes. Acabado que se adapta a cualquier ambiente.",
    imagenes: ["/imagenes/caja-embutir.jpg"], 
    categoria: "material-electrico" 
  },
  { 
    id: 57,
    nombre: "Conmutador", 
    slug: "conmutador", 
    descripcion: "Control de iluminación desde múltiples puntos.", 
    descripcion_larga: "Conmutador para control de iluminación desde múltiples puntos. Diseño moderno y funcional. Instalación sencilla. Ideal para espacios que requieren flexibilidad en el control de luz.",
    imagenes: ["/imagenes/conmutador.jpg"], 
    categoria: "material-electrico" 
  },
  { 
    id: 58,
    nombre: "Interruptor Simple", 
    slug: "interruptor-simple", 
    descripcion: "Diseño moderno y funcional.", 
    descripcion_larga: "Interruptor simple con diseño moderno y funcional. Control básico de iluminación. Acabado que se adapta a cualquier estilo decorativo. Instalación estándar.",
    imagenes: ["/imagenes/interruptor-simple.jpg"], 
    categoria: "material-electrico" 
  },
  { 
    id: 59,
    nombre: "Interruptor Doble", 
    slug: "interruptor-doble", 
    descripcion: "Control independiente para dos circuitos.", 
    descripcion_larga: "Interruptor doble para control independiente de dos circuitos. Diseño compacto y moderno. Ideal para espacios que requieren control múltiple. Acabado premium.",
    imagenes: ["/imagenes/interruptor-doble.jpg"], 
    categoria: "material-electrico" 
  },
  { 
    id: 60,
    nombre: "Interruptor Triple", 
    slug: "interruptor-triple", 
    descripcion: "Mayor versatilidad en iluminación.", 
    descripcion_larga: "Interruptor triple para mayor versatilidad en control de iluminación. Diseño que permite controlar tres circuitos independientes. Ideal para espacios amplios.",
    imagenes: ["/imagenes/interruptor-triple.jpg"], 
    categoria: "material-electrico" 
  },
  { 
    id: 61,
    nombre: "Tomacorriente Simple", 
    slug: "tomacorriente-simple", 
    descripcion: "Toma eléctrica segura y resistente.", 
    descripcion_larga: "Tomacorriente simple seguro y resistente. Diseño moderno que se adapta a cualquier ambiente. Acabado de calidad. Instalación estándar.",
    imagenes: ["/imagenes/tomacorriente-simple.jpg"], 
    categoria: "material-electrico" 
  },
  { 
    id: 62,
    nombre: "Timbre", 
    slug: "timbre", 
    descripcion: "Sistema de aviso moderno.", 
    descripcion_larga: "Timbre con sistema de aviso moderno. Diseño funcional y discreto. Instalación sencilla. Ideal para entradas y espacios de acceso.",
    imagenes: ["/imagenes/timbre.jpg"], 
    categoria: "material-electrico" 
  },
  { 
    id: 52, 
    nombre: "Toma Telefónica", 
    slug: "toma-telefonica", 
    descripcion: "Conector seguro para línea telefónica.", 
    descripcion_larga: "Toma telefónica con conector seguro para línea telefónica. Diseño moderno. Instalación estándar. Ideal para espacios que requieren conectividad telefónica.",
    imagenes: ["/imagenes/toma-telefonica.jpg"], 
    categoria: "material-electrico" 
  },
  { 
    id: 64,
    nombre: "Tomacorriente con Interruptor", 
    slug: "tomacorriente-con-interruptor", 
    descripcion: "Solución integrada práctica y moderna.", 
    descripcion_larga: "Tomacorriente con interruptor integrado. Solución práctica y moderna que combina dos funciones. Diseño compacto. Ideal para espacios que requieren control y acceso eléctrico.",
    imagenes: ["/imagenes/tomacorriente-interruptor.jpg"], 
    categoria: "material-electrico" 
  },
]




