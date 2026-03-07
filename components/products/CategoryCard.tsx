"use client"

import Link from "next/link"
import { motion } from "framer-motion"

interface CategoryCardProps {
  titulo: string
  descripcion: string
  imagen: string
  slug: string
  index: number
}

export default function CategoryCard({ 
  titulo, 
  descripcion, 
  imagen, 
  slug, 
  index 
}: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: Math.min(index * 0.1, 0.3),
        ease: "easeOut"
      }}
      style={{ width: '100%' }}
    >
      <Link href={`/catalogo/${slug}`}>
        <div 
          style={{
            position: 'relative',
            width: '100%',
            height: '400px',
            overflow: 'hidden',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}
        >
          {/* Imagen */}
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <img
              src={imagen}
              alt={titulo}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            />
          </div>
          
          {/* Gradient Overlay */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent)',
              pointerEvents: 'none'
            }}
          />
          
          {/* Content */}
          <div 
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '2rem',
              color: 'white'
            }}
          >
            <h3 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {titulo}
            </h3>
            <p style={{ color: '#e5e7eb' }}>
              {descripcion}
            </p>
          </div>

          {/* Hover Overlay */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0)',
              transition: 'background-color 0.3s',
              pointerEvents: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0)'
            }}
          />
        </div>
      </Link>
    </motion.div>
  )
}
