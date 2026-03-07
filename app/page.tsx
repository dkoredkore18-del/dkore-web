"use client"

import HeroCarousel from "@/components/home/HeroCarousel"
import Footer from "@/components/layout/Footer"

export default function Home() {
  const slides = [
    {
      titulo: "Mesas en Piedra Sinterizada",
      subtitulo: "Elegancia y durabilidad en cada detalle",
      imagen: "https://pfvgoumghwtkrinhxgwa.supabase.co/storage/v1/object/public/productos-imagenes/portadas-de-catalogos/portada-mesas-piedra-sinterizada.png",
      categoria: "mesas-piedra-sinterizada"
    },
    {
      titulo: "Muebles de Melamina",
      subtitulo: "Diseño moderno y funcional a medida",
      imagen: "https://pfvgoumghwtkrinhxgwa.supabase.co/storage/v1/object/public/productos-imagenes/portadas-de-catalogos/portada-muebles-melamina.png",
      categoria: "muebles-melamina"
    },
    {
      titulo: "Revestimientos 3D",
      subtitulo: "Transforma tus paredes con textura y estilo",
      imagen: "https://pfvgoumghwtkrinhxgwa.supabase.co/storage/v1/object/public/productos-imagenes/portadas-de-catalogos/portada-revestimientos3D.png",
      categoria: "revestimientos-3d"
    },
    {
      titulo: "Macetas en Fibra de Vidrio",
      subtitulo: "Resistencia y belleza para tus espacios",
      imagen: "https://pfvgoumghwtkrinhxgwa.supabase.co/storage/v1/object/public/productos-imagenes/portadas-de-catalogos/portada-macetas.png",
      categoria: "macetas-fibra-vidrio"
    }
  ]

  return (
    <>
      <div className="min-h-screen bg-black">
        {/* Hero Carousel */}
        <HeroCarousel slides={slides} autoPlayInterval={7000} />
      </div>
      
      {/* Footer con gap */}
      <div style={{ marginTop: '4rem', backgroundColor: 'black' }}>
        <Footer />
      </div>
    </>
  )
}
