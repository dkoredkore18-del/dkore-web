"use client"

import { useState, useEffect } from "react"
import "@/app/styles/responsive-system.css"

interface Props {
  imagenes: string[]
  nombre: string
}

export default function ProductGallery({ imagenes, nombre }: Props) {
  const [imagenActiva, setImagenActiva] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

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
    <div className="gallery-container">
      <div 
        className="flex-column"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="gallery-main-wrapper">
          <div className="gallery-main-image">
            <img
              src={imagenes[imagenActiva]}
              alt={nombre}
            />
          </div>

          {imagenes.length > 1 && (
            <button
              onClick={handlePrevious}
              className="gallery-nav-button prev"
              aria-label="Previous image"
            >
              ←
            </button>
          )}

          {imagenes.length > 1 && (
            <button
              onClick={handleNext}
              className="gallery-nav-button next"
              aria-label="Next image"
            >
              →
            </button>
          )}
        </div>

        {imagenes.length > 1 && (
          <div className="gallery-progress">
            {imagenActiva + 1} / {imagenes.length}
          </div>
        )}
      </div>

      <div className="gallery-thumbnails">
        {imagenes.map((img, index) => (
          <div
            key={index}
            className={`gallery-thumbnail ${imagenActiva === index ? 'active' : ''}`}
            onClick={() => handleThumbnailClick(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleThumbnailClick(index)
              }
            }}
          >
            <img
              src={img}
              alt={`${nombre} - ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
