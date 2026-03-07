"use client"

import { motion } from "framer-motion"
import CategoryCard from "@/components/products/CategoryCard"
import { CATEGORIAS } from "@/lib/constants"

export default function CatalogoPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Nuestros Productos
          </h1>
          <p className="text-xl text-gray-400">
            Explora nuestras categorías de productos premium
          </p>
        </motion.div>

        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-16"
          style={{
            marginBottom: '4rem'
          }}
        >
          {CATEGORIAS.map((categoria, index) => (
            <CategoryCard
              key={categoria.slug}
              titulo={categoria.nombre}
              descripcion={categoria.descripcion}
              imagen={categoria.portada}
              slug={categoria.slug}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
