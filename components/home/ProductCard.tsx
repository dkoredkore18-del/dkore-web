"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface ProductCardProps {
  titulo: string
  descripcion: string
  imagen: string
  link: string
  index?: number
}

export default function ProductCard({ 
  titulo, 
  descripcion, 
  imagen, 
  link, 
  index = 0 
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <Link href={link} className="group block">
        <div style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          overflow: 'hidden',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          transition: 'box-shadow 0.5s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            height: '256px',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#f3f4f6'
          }}>
            <img
              src={imagen}
              alt={titulo}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.7s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            />
          </div>
          <div style={{ padding: '1.5rem' }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'black',
              marginBottom: '0.75rem'
            }}>
              {titulo}
            </h3>
            <p style={{
              color: '#4b5563',
              marginBottom: '1rem'
            }}>
              {descripcion}
            </p>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              color: 'black',
              fontWeight: '600'
            }}>
              Ver más →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
