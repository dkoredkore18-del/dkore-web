"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import ProductGallery from "@/components/products/ProductGallery"
import Loading from "@/components/ui/Loading"
import { useProductBySlug } from "@/hooks/useProducts"
import { CONTACTO } from "@/lib/constants"
import "./product-responsive.css"

export default function ProductoPage() {
  const params = useParams()
  const slug = params.slug as string

  const { product: producto, loading, error } = useProductBySlug(slug)

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'black', paddingTop: '96px' }}>
        <Loading />
      </div>
    )
  }

  if (error || !producto) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'black', paddingTop: '96px', paddingLeft: '24px', paddingRight: '24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>
            Producto no encontrado
          </h1>
          <p style={{ color: '#d1d5db', marginBottom: '32px' }}>
            {error || "El producto que buscas no existe"}
          </p>
          <Link href="/catalogo">
            <button style={{
              backgroundColor: 'white',
              color: 'black',
              padding: '12px 32px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem'
            }}>
              Volver al catálogo
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const whatsappMessage = `Hola, estoy interesado en el producto: ${producto.nombre}`
  const whatsappUrl = `${CONTACTO.whatsappUrl}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <main style={{
      backgroundColor: 'black',
      color: 'white',
      minHeight: '100vh',
      paddingTop: '96px',
      paddingBottom: '96px',
      paddingLeft: '24px',
      paddingRight: '24px'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Breadcrumbs */}
        <nav style={{ marginBottom: '32px', fontSize: '0.875rem', color: '#9ca3af' }}>
          <Link href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>
            <span style={{ cursor: 'pointer', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'white'} onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}>
              Inicio
            </span>
          </Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <Link href="/catalogo" style={{ color: '#9ca3af', textDecoration: 'none' }}>
            <span style={{ cursor: 'pointer', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'white'} onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}>
              Catálogo
            </span>
          </Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <Link href={`/catalogo/${producto.categoria}`} style={{ color: '#9ca3af', textDecoration: 'none' }}>
            <span style={{ cursor: 'pointer', transition: 'color 0.3s', textTransform: 'capitalize' }} onMouseEnter={(e) => e.currentTarget.style.color = 'white'} onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}>
              {producto.categoria.replace(/-/g, " ")}
            </span>
          </Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: 'white' }}>{producto.nombre}</span>
        </nav>

        {/* Layout de 2 Columnas en Desktop, 1 en Móvil */}
        <div className="product-layout">
          {/* COLUMNA IZQUIERDA - GALERÍA (60%) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ProductGallery
              imagenes={producto.imagenes}
              nombre={producto.nombre}
            />
          </motion.div>

          {/* COLUMNA DERECHA - INFORMACIÓN (40%) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}
          >
            {/* Nombre del Producto */}
            <div>
              <h1 style={{
                fontSize: 'clamp(1.875rem, 5vw, 2.5rem)',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '8px',
                lineHeight: '1.2'
              }}>
                {producto.nombre}
              </h1>
            </div>

            {/* Categoría */}
            <div style={{
              fontSize: '0.875rem',
              color: '#d1d5db',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '8px'
            }}>
              {producto.categoria.replace(/-/g, " ")}
              {producto.subcategoria && ` / ${producto.subcategoria.replace(/-/g, " ")}`}
            </div>

            {/* Descripción Corta */}
            <p style={{
              fontSize: '1rem',
              color: '#e5e7eb',
              lineHeight: '1.6',
              marginBottom: '16px'
            }}>
              {producto.descripcion}
            </p>

            {/* Descripción Larga */}
            {producto.descripcion_larga && (
              <div style={{ marginBottom: '24px' }}>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#d1d5db',
                  lineHeight: '1.6'
                }}>
                  {producto.descripcion_larga}
                </p>
              </div>
            )}

            {/* Especificaciones */}
            <div style={{
              borderTop: '1px solid #374151',
              paddingTop: '24px',
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '16px'
              }}>
                Especificaciones
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <li style={{ color: '#d1d5db', fontSize: '0.95rem' }}>
                  • <strong>Categoría:</strong> {producto.categoria.replace(/-/g, " ")}
                </li>
                {producto.subcategoria && (
                  <li style={{ color: '#d1d5db', fontSize: '0.95rem' }}>
                    • <strong>Subcategoría:</strong> {producto.subcategoria.replace(/-/g, " ")}
                  </li>
                )}
                {producto.destacado && (
                  <li style={{ color: '#fbbf24', fontSize: '0.95rem' }}>
                    • <strong>⭐ Producto Destacado</strong>
                  </li>
                )}
              </ul>
            </div>

            {/* Botones de Acción */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginTop: '24px'
            }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <button style={{
                  width: '100%',
                  backgroundColor: 'white',
                  color: 'black',
                  padding: '12px 32px',
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6'
                  e.currentTarget.style.transform = 'scale(1.02)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white'
                  e.currentTarget.style.transform = 'scale(1)'
                }}>
                  Solicitar Cotización
                </button>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Productos Relacionados (para después) */}
        {/* <RelatedProducts categoria={producto.categoria} currentSlug={producto.slug} /> */}
      </div>
    </main>
  )
}
