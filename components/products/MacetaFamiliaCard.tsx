"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import type { MacetaFamilia } from "@/lib/macetasFamilias"
import { etiquetaVariante } from "@/lib/macetasFamilias"

interface Props {
  familia: MacetaFamilia
  index: number
}

export default function MacetaFamiliaCard({ familia, index }: Props) {
  const portada = familia.variantes[0]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4), ease: "easeOut" }}
      style={{ width: '100%' }}
    >
      <Link href={`/catalogo/macetas-fibra-vidrio/${familia.slug}`}>
        <div
          style={{
            cursor: 'pointer',
            width: '100%',
          }}
        >
          {/* Imagen */}
          <div style={{
            position: 'relative',
            width: '100%',
            paddingBottom: `${(portada.aspectRatio || 1.3067) * 100}%`,
            overflow: 'hidden',
            borderRadius: '0.5rem',
            marginBottom: '0.875rem',
            backgroundColor: '#111',
          }}>
            <img
              src={portada.imagenes[0]}
              alt={familia.nombre}
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%', height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
                transform: `scale(${portada.imageScale || 1})`,
                transition: 'transform 0.6s ease-out',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = `scale(${(portada.imageScale || 1) * 1.08})`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = `scale(${portada.imageScale || 1})`
              }}
            />
          </div>

          {/* Nombre */}
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            color: 'white',
            marginBottom: '0.35rem',
            transition: 'color 0.2s',
          }}>
            {familia.nombre}
          </h3>

          {/* Descripción */}
          <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.5rem', lineHeight: 1.5 }}>
            {familia.descripcion}
          </p>

          {/* Chips de tamaños disponibles */}
          {familia.variantes.length > 1 && (
            <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
              {familia.variantes.map(v => (
                <span
                  key={v.slug}
                  style={{
                    fontSize: '0.7rem',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '0.25rem',
                    border: '1px solid #2a2a2a',
                    color: '#9ca3af',
                    backgroundColor: 'transparent',
                  }}
                >
                  {etiquetaVariante(v.slug)}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
