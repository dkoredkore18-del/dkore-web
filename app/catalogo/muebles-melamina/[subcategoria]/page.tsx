"use client"

import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import Link from "next/link"
import ProductGrid from "@/components/products/ProductGrid"
import Loading from "@/components/ui/Loading"
import { useProductsByCategory } from "@/hooks/useProducts"
import { SUBCATEGORIAS_MELAMINA } from "@/lib/constants"
import type { Producto } from "@/types"

export default function SubcategoriaPage() {
  const params = useParams()
  const subcategoria = params.subcategoria as string

  const { products, loading, error } = useProductsByCategory("muebles-melamina")
  
  // Encontrar información de la subcategoría
  const subcategoriaInfo = SUBCATEGORIAS_MELAMINA.find(s => s.slug === subcategoria)

  // Filtrar productos por subcategoría
  const productosSubcategoria = products.filter(p => p.subcategoria === subcategoria)

  if (!subcategoriaInfo) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-black mb-4">
            Subcategoría no encontrada
          </h1>
          <Link href="/catalogo/muebles-melamina" className="text-blue-600 hover:underline">
            Volver a Muebles de Melamina
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm text-gray-400">
          <Link href="/" className="hover:text-white">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/catalogo" className="hover:text-white">Catálogo</Link>
          <span className="mx-2">/</span>
          <Link href="/catalogo/muebles-melamina" className="hover:text-white">Muebles de Melamina</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{subcategoriaInfo.nombre}</span>
        </nav>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {subcategoriaInfo.nombre}
          </h1>
          <p className="text-xl text-gray-400">
            Diseños personalizados en melamina de alta calidad
          </p>
        </motion.div>

        {/* Productos */}
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="text-center text-red-500">
            <p>Error al cargar productos: {error}</p>
            <Link href="/catalogo/muebles-melamina" className="text-blue-400 hover:underline mt-4 inline-block">
              Volver a Muebles de Melamina
            </Link>
          </div>
        ) : productosSubcategoria.length === 0 ? (
          <div className="text-center text-gray-400">
            <p className="text-xl mb-4">No hay productos disponibles en esta subcategoría</p>
            <Link href="/catalogo/muebles-melamina" className="text-blue-400 hover:underline">
              Ver todos los muebles de melamina
            </Link>
          </div>
        ) : (
          <ProductGrid productos={productosSubcategoria as Producto[]} />
        )}
      </div>
    </div>
  )
}
