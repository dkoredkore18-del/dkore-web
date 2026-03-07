"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import type { Producto } from "@/data/productos"

interface ProductGridProps {
  productos: Producto[]
}

export default function ProductGrid({ productos }: ProductGridProps) {
  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full"
    >
      {productos.map((producto, index) => (
        <motion.div
          key={producto.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: Math.min(index * 0.1, 1.5),
            ease: "easeOut"
          }}
          style={{
            width: '100%'
          }}
        >
          <Link href={`/catalogo/producto/${producto.slug}`}>
            <div 
              style={{
                cursor: 'pointer',
                width: '100%'
              }}
            >
              {/* Contenedor de imagen con aspect ratio fijo */}
              <div style={{
                position: 'relative',
                width: '100%',
                paddingBottom: `${((producto.aspectRatio || 1.3067) * 100)}%`,
                overflow: 'hidden',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
                backgroundColor: '#f3f4f6'
              }}>
                <img
                  src={producto.imagenes[0]}
                  alt={producto.nombre}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    transform: `scale(${producto.imageScale || 1})`,
                    transition: 'transform 0.7s ease-out'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = `scale(${(producto.imageScale || 1) * 1.1})`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = `scale(${producto.imageScale || 1})`
                  }}
                />
              </div>
              
              <h3 
                style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '0.25rem',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#059669'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#1f2937'}
              >
                {producto.nombre}
              </h3>
              <p 
                style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  lineHeight: '1.5'
                }}
              >
                {producto.descripcion}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
