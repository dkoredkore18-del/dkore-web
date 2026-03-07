"use client"

import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import Link from "next/link"
import ProductGrid from "@/components/products/ProductGrid"
import Loading from "@/components/ui/Loading"
import { useProductsByCategory } from "@/hooks/useProducts"
import { CATEGORIAS } from "@/lib/constants"
import type { Producto } from "@/types"

export default function CategoriaPage() {
  const params = useParams()
  const categoria = params.categoria as string

  const { products, loading, error } = useProductsByCategory(categoria)
  
  // Encontrar información de la categoría
  const categoriaInfo = CATEGORIAS.find(c => c.slug === categoria)

  if (!categoriaInfo) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-black mb-4">
            Categoría no encontrada
          </h1>
          <Link href="/catalogo" className="text-blue-600 hover:underline">
            Volver al catálogo
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
          <span className="text-white">{categoriaInfo.nombre}</span>
        </nav>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {categoriaInfo.nombre}
          </h1>
          <p className="text-xl text-gray-400">
            {categoriaInfo.descripcion}
          </p>
        </motion.div>

        {/* Productos */}
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="text-center text-red-500">
            <p>Error al cargar productos: {error}</p>
            <Link href="/catalogo" className="text-blue-400 hover:underline mt-4 inline-block">
              Volver al catálogo
            </Link>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-400">
            <p className="text-xl mb-4">No hay productos disponibles en esta categoría</p>
            <Link href="/catalogo" className="text-blue-400 hover:underline">
              Ver otras categorías
            </Link>
          </div>
        ) : (
          <ProductGrid productos={products as Producto[]} />
        )}
      </div>
    </div>
  )
}
