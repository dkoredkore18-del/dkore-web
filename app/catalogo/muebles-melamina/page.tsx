"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
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
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem',
            width: '100%'
          }}
        >
          {SUBCATEGORIAS_MELAMINA.map((sub, index) => (
            <motion.div
              key={sub.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: Math.min(index * 0.1, 0.5)
              }}
            >
              <Link href={`/catalogo/muebles-melamina/${sub.slug}`}>
                <div 
                  style={{
                    cursor: 'pointer',
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                    backgroundColor: '#1f2937',
                    transition: 'transform 0.3s, box-shadow 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)'
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* Placeholder Image */}
                  <div 
                    style={{
                      position: 'relative',
                      width: '100%',
                      paddingBottom: '75%',
                      backgroundColor: '#374151',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden'
                    }}
                  >
                    {sub.portada ? (
                      <img
                        src={sub.portada}
                        alt={sub.nombre}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center'
                        }}
                      />
                    ) : (
                      <div 
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          textAlign: 'center',
                          color: '#9ca3af',
                          fontSize: '3rem'
                        }}
                      >
                        🪑
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div style={{ padding: '1.5rem' }}>
                    <h3 
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        color: '#fff',
                        marginBottom: '0.5rem'
                      }}
                    >
                      {sub.nombre}
                    </h3>
                    <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                      Ver productos →
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
