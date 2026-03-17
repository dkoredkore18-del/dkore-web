"use client"

import { useState, useEffect } from "react"

interface Props {
  imagenes: string[]
  nombre: string
}

export default function ProductGallery({ imagenes, nombre }: Props) {
  const [imagenActiva, setImagenActiva] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  // Auto-rotación cada 5 segundos
  useEffect(() => {
    if (!autoPlay || imagenes.length <= 1) return

    const intervalo = setInterval(() => {
      setImagenActiva((prev) => (prev + 1) % imagenes.length)
    }, 5000)

    return () => clearInterval(intervalo)
  }, [autoPlay, imagenes.length])

  const handlePrevious = () => {
    setAutoPlay(false)
    setImagenActiva((prev) => (prev - 1 + imagenes.length) % imagenes.length)
  }

  const handleNext = () => {
    setAutoPlay(false)
    setImagenActiva((prev) => (prev + 1) % imagenes.length)
  }

  const handleThumbnailClick = (index: number) => {
    setAutoPlay(false)
    setImagenActiva(index)
  }

  const handleMouseEnter = () => {
    setAutoPlay(false)
  }

  const handleMouseLeave = () => {
    setAutoPlay(true)
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: '24px',
      '@media (min-width: 768px)': {
        flexDirection: 'row'
      }
    }}>

      {/* Contenedor principal con flechas */}
      <div 
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, order: -1 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >

        {/* Contenedor de imagen con flechas */}
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          maxWidth: '600px', 
          aspectRatio: '1',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center'
        }}>
          
          {/* Imagen principal */}
          <div style={{ 
            width: '100%', 
            height: '100%', 
            border: '1px solid #374151', 
            borderRadius: '12px', 
            overflow: 'hidden', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <img
              src={imagenes[imagenActiva]}
              alt={nombre}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                display: 'block',
                transition: 'opacity 0.3s ease'
              }}
            />
          </div>

          {/* Flecha Izquierda */}
          {imagenes.length > 1 && (
            <button
              onClick={handlePrevious}
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0, 0, 0, 0.5)',
                border: 'none',
                color: 'white',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                transition: 'background 0.3s',
                zIndex: 10
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)'}
            >
              ←
            </button>
          )}

          {/* Flecha Derecha */}
          {imagenes.length > 1 && (
            <button
              onClick={handleNext}
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0, 0, 0, 0.5)',
                border: 'none',
                color: 'white',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                transition: 'background 0.3s',
                zIndex: 10
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)'}
            >
              →
            </button>
          )}
        </div>

        {/* Indicador de progreso */}
        {imagenes.length > 1 && (
          <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>
            {imagenActiva + 1} / {imagenes.length}
          </div>
        )}

      </div>

      {/* Miniaturas - horizontales en móvil, verticales en desktop */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row',
        gap: '16px', 
        overflowX: 'auto',
        paddingBottom: '8px',
        '@media (min-width: 768px)': {
          flexDirection: 'column',
          overflowX: 'visible',
          minWidth: '100px'
        }
      }}>
        {imagenes.map((img, index) => (
          <div
            key={index}
            onClick={() => handleThumbnailClick(index)}
            style={{
              cursor: 'pointer',
              border: imagenActiva === index ? '2px solid black' : '2px solid #d1d5db',
              borderRadius: '8px',
              overflow: 'hidden',
              transition: 'all 0.2s',
              transform: imagenActiva === index ? 'scale(1.1)' : 'scale(1)',
              width: '80px',
              height: '80px',
              flexShrink: 0
            }}
          >
            <img
              src={img}
              alt={`${nombre} - ${index}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          </div>
        ))}
      </div>

    </div>
  )
}
