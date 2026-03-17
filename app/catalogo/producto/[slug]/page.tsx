"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import ProductGallery from "@/components/products/ProductGallery"
import Loading from "@/components/ui/Loading"
import { useProductBySlug } from "@/hooks/useProducts"
import { CONTACTO } from "@/lib/constants"
import "@/app/styles/responsive-system.css"

export default function ProductoPage() {
  const params = useParams()
  const slug = params.slug as string

  const { product: producto, loading, error } = useProductBySlug(slug)

  if (loading) {
    return (
      <div className="product-page-container">
        <Loading />
      </div>
    )
  }

  if (error || !producto) {
    return (
      <div className="product-page-container">
        <div className="product-page-wrapper" style={{ textAlign: 'center' }}>
          <h1 className="product-title">
            Producto no encontrado
          </h1>
          <p style={{ color: '#d1d5db', marginBottom: '32px' }}>
            {error || "El producto que buscas no existe"}
          </p>
          <Link href="/catalogo">
            <button className="product-action-button">
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
    <main className="product-page-container">
      <div className="product-page-wrapper">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs">
          <Link href="/">
            <span>Inicio</span>
          </Link>
          <span>/</span>
          <Link href="/catalogo">
            <span>Catálogo</span>
          </Link>
          <span>/</span>
          <Link href={`/catalogo/${producto.categoria}`}>
            <span style={{ textTransform: 'capitalize' }}>
              {producto.categoria.replace(/-/g, " ")}
            </span>
          </Link>
          <span>/</span>
          <span className="current">{producto.nombre}</span>
        </nav>

        {/* Layout de 2 Columnas en Desktop, 1 en Móvil */}
        <div className="product-layout">
          {/* COLUMNA IZQUIERDA - GALERÍA */}
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

          {/* COLUMNA DERECHA - INFORMACIÓN */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="product-info"
          >
            {/* Nombre del Producto */}
            <div>
              <h1 className="product-title">
                {producto.nombre}
              </h1>
            </div>

            {/* Categoría */}
            <div className="product-category">
              {producto.categoria.replace(/-/g, " ")}
              {producto.subcategoria && ` / ${producto.subcategoria.replace(/-/g, " ")}`}
            </div>

            {/* Descripción Corta */}
            <p className="product-description-short">
              {producto.descripcion}
            </p>

            {/* Descripción Larga */}
            {producto.descripcion_larga && (
              <div className="product-description-long">
                <p>
                  {producto.descripcion_larga}
                </p>
              </div>
            )}

            {/* Especificaciones */}
            <div className="product-specs">
              <h3>Especificaciones</h3>
              <ul>
                <li>
                  • <strong>Categoría:</strong> {producto.categoria.replace(/-/g, " ")}
                </li>
                {producto.subcategoria && (
                  <li>
                    • <strong>Subcategoría:</strong> {producto.subcategoria.replace(/-/g, " ")}
                  </li>
                )}
                {producto.destacado && (
                  <li className="featured">
                    • <strong>⭐ Producto Destacado</strong>
                  </li>
                )}
              </ul>
            </div>

            {/* Botones de Acción */}
            <div className="product-actions">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="product-action-button"
              >
                Solicitar Cotización
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
