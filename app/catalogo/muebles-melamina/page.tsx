"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import CategoryCard from "@/components/products/CategoryCard"
import { SUBCATEGORIAS_MELAMINA } from "@/lib/constants"

export default function MueblesMelaminaPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm text-gray-400">
          <Link href="/" className="hover:text-white">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/catalogo" className="hover:text-white">Catálogo</Link>
          <span className="mx-2">/</span>
          <span className="text-white">Muebles de Melamina</span>
        </nav>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Muebles de Melamina
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Diseño moderno y funcional a medida. Explora nuestras categorías de muebles personalizados en melamina de alta calidad.
          </p>
        </motion.div>

        {/* Subcategorías Grid */}
        <div 
          className="subcategoria-grid-responsive"
        >
          {SUBCATEGORIAS_MELAMINA.map((sub, index) => (
            <CategoryCard
              key={sub.slug}
              titulo={sub.nombre}
              descripcion={sub.descripcion}
              imagen={sub.portada}
              slug={`muebles-melamina/${sub.slug}`}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
