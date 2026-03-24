"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import ProductGallery from "@/components/products/ProductGallery"
import AddToCartButton from "@/components/cart/AddToCartButton"
import { getMacetaFamilia, etiquetaVariante } from "@/lib/macetasFamilias"
import { CONTACTO } from "@/lib/constants"
import "@/app/styles/responsive-system.css"

export default function MacetaFamiliaPage() {
  const params = useParams()
  const familiaSlug = params.familia as string
  const familia = getMacetaFamilia(familiaSlug)

  const [varianteIdx, setVarianteIdx] = useState(0)

  if (!familia) {
    return (
      <div className="product-page-container">
        <div className="product-page-wrapper" style={{ textAlign: 'center' }}>
          <h1 className="product-title">Producto no encontrado</h1>
          <Link href="/catalogo/macetas-fibra-vidrio">
            <button className="product-action-button">Volver a Macetas</button>
          </Link>
        </div>
      </div>
    )
  }

  const producto = familia.variantes[varianteIdx]
  const whatsappUrl = `${CONTACTO.whatsappUrl}?text=${encodeURIComponent(`Hola, estoy interesado en: ${producto.nombre}`)}`

  return (
    <main className="product-page-container">
      <div className="product-page-wrapper">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs">
          <Link href="/"><span>Inicio</span></Link>
          <span>/</span>
          <Link href="/catalogo"><span>Catálogo</span></Link>
          <span>/</span>
          <Link href="/catalogo/macetas-fibra-vidrio"><span>Macetas</span></Link>
          <span>/</span>
          <span className="current">{familia.nombre}</span>
        </nav>

        <div className="product-layout">
          {/* GALERÍA — cambia con la variante seleccionada */}
          <AnimatePresence mode="wait">
            <motion.div
              key={producto.slug}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
            >
              <ProductGallery imagenes={producto.imagenes} nombre={producto.nombre} />
            </motion.div>
          </AnimatePresence>

          {/* INFO */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="product-info"
          >
            <h1 className="product-title">{familia.nombre}</h1>
            <div className="product-category">Macetas en Fibra de Vidrio</div>

            {/* SELECTOR DE TAMAÑOS */}
            {familia.variantes.length > 1 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ color: '#9ca3af', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  Tamaño — <span style={{ color: '#C5A059' }}>{etiquetaVariante(producto.slug)}</span>
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {familia.variantes.map((v, i) => {
                    const activo = i === varianteIdx
                    return (
                      <button
                        key={v.slug}
                        onClick={() => setVarianteIdx(i)}
                        style={{
                          padding: '0.4rem 1rem',
                          borderRadius: '0.375rem',
                          border: activo ? '1.5px solid #C5A059' : '1.5px solid #2a2a2a',
                          backgroundColor: activo ? 'rgba(197,160,89,0.12)' : 'transparent',
                          color: activo ? '#C5A059' : '#9ca3af',
                          fontSize: '0.875rem',
                          fontWeight: activo ? 600 : 400,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => {
                          if (!activo) {
                            e.currentTarget.style.borderColor = '#C5A059'
                            e.currentTarget.style.color = '#C5A059'
                          }
                        }}
                        onMouseLeave={e => {
                          if (!activo) {
                            e.currentTarget.style.borderColor = '#2a2a2a'
                            e.currentTarget.style.color = '#9ca3af'
                          }
                        }}
                      >
                        {etiquetaVariante(v.slug)}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Nombre variante activa */}
            <AnimatePresence mode="wait">
              <motion.div
                key={producto.slug + '-info'}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <p className="product-description-short">{producto.descripcion}</p>
                {producto.descripcion_larga && (
                  <div className="product-description-long">
                    <p>{producto.descripcion_larga}</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Especificaciones */}
            <div className="product-specs">
              <h3>Especificaciones</h3>
              <ul>
                <li>• <strong>Material:</strong> Fibra de vidrio</li>
                <li>• <strong>Tamaño:</strong> {etiquetaVariante(producto.slug)}</li>
                {producto.destacado && (
                  <li className="featured">• <strong>Producto Destacado</strong></li>
                )}
              </ul>
            </div>

            {/* Botones */}
            <div className="product-actions">
              <AddToCartButton producto={producto} />
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
