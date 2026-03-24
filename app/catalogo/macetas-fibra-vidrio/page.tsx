"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import MacetaFamiliaCard from "@/components/products/MacetaFamiliaCard"
import { getMacetasFamilias } from "@/lib/macetasFamilias"

export default function MacetasPage() {
  const familias = getMacetasFamilias()

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm text-gray-400">
          <Link href="/" className="hover:text-white">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/catalogo" className="hover:text-white">Catálogo</Link>
          <span className="mx-2">/</span>
          <span className="text-white">Macetas en Fibra de Vidrio</span>
        </nav>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Macetas en Fibra de Vidrio
          </h1>
          <p className="text-xl text-gray-400">
            Resistencia y belleza para tus espacios
          </p>
        </motion.div>

        {/* Grid de familias */}
        <div className="product-grid-responsive">
          {familias.map((familia, index) => (
            <MacetaFamiliaCard key={familia.slug} familia={familia} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
