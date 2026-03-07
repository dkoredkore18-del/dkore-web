"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface CTASectionProps {
  titulo: string
  descripcion: string
  textoBoton: string
  linkBoton: string
  className?: string
}

export default function CTASection({ 
  titulo, 
  descripcion, 
  textoBoton, 
  linkBoton,
  className = "bg-gradient-to-br from-gray-900 to-black"
}: CTASectionProps) {
  return (
    <section className={`${className} text-white py-24 px-6`}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {titulo}
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            {descripcion}
          </p>
          <Link
            href={linkBoton}
            className="inline-block bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-gray-200 transition-all duration-300"
          >
            {textoBoton}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
