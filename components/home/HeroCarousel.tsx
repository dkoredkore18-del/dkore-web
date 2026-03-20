"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface Slide {
  titulo: string
  subtitulo: string
  imagen: string
  categoria: string
}

interface HeroCarouselProps {
  slides: Slide[]
  autoPlayInterval?: number
}

export default function HeroCarousel({ slides, autoPlayInterval = 4000 }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, autoPlayInterval)
    return () => clearInterval(timer)
  }, [slides.length, autoPlayInterval])

  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % slides.length)
  const goToPrevious = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  const goToSlide = (index: number) => setCurrentIndex(index)

  return (
    <div 
      className="relative w-full bg-black" 
      style={{ 
        height: 'calc(100vh - 80px)',
        minHeight: '500px',
        maxHeight: '900px'
      }}
    >
      {/* Slides Container */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1
          }}
        >
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image
              src={slides[currentIndex].imagen}
              alt={slides[currentIndex].titulo}
              fill
              priority={currentIndex === 0}
              style={{
                objectFit: isMobile ? 'contain' : 'cover',
                objectPosition: 'center'
              }}
              sizes="100vw"
            />
          </div>
          
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.4), rgba(0,0,0,0.6))',
              zIndex: 2
            }}
          />
          
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingBottom: '140px',
              paddingLeft: '24px',
              paddingRight: '24px',
              zIndex: 3
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                textAlign: 'center',
                color: 'white',
                maxWidth: '56rem',
                width: '100%'
              }}
            >
              <h1 
                style={{
                  fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  textShadow: '0 25px 50px rgba(0,0,0,0.5)'
                }}
              >
                {slides[currentIndex].titulo}
              </h1>
              <p 
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                  marginBottom: '2rem',
                  color: '#e5e5e5',
                  textShadow: '0 10px 30px rgba(0,0,0,0.5)'
                }}
              >
                {slides[currentIndex].subtitulo}
              </p>
              <Link href={`/catalogo/${slides[currentIndex].categoria}`}>
                <button 
                  style={{
                    backgroundColor: 'white',
                    color: 'black',
                    padding: '1rem 2.5rem',
                    borderRadius: '9999px',
                    fontWeight: '600',
                    fontSize: '1.125rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                    e.currentTarget.style.backgroundColor = '#f3f4f6'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.backgroundColor = 'white'
                  }}
                >
                  Ver productos
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Left Arrow - OUTSIDE AnimatePresence */}
      <button
        onClick={goToPrevious}
        style={{
          position: 'absolute',
          left: '1.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          backgroundColor: 'white',
          color: 'black',
          padding: 'clamp(0.5rem, 2vw, 1rem)',
          borderRadius: '9999px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
          e.currentTarget.style.backgroundColor = '#f3f4f6'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
          e.currentTarget.style.backgroundColor = 'white'
        }}
        aria-label="Slide anterior"
      >
        <svg 
          width="clamp(16px, 4vw, 24px)" 
          height="clamp(16px, 4vw, 24px)" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow - OUTSIDE AnimatePresence */}
      <button
        onClick={goToNext}
        style={{
          position: 'absolute',
          right: '1.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          backgroundColor: 'white',
          color: 'black',
          padding: 'clamp(0.5rem, 2vw, 1rem)',
          borderRadius: '9999px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
          e.currentTarget.style.backgroundColor = '#f3f4f6'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
          e.currentTarget.style.backgroundColor = 'white'
        }}
        aria-label="Siguiente slide"
      >
        <svg 
          width="clamp(16px, 4vw, 24px)" 
          height="clamp(16px, 4vw, 24px)" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots - OUTSIDE AnimatePresence */}
      <div 
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          display: 'flex',
          gap: '0.75rem'
        }}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: index === currentIndex ? '3rem' : '0.75rem',
              height: '0.75rem',
              backgroundColor: index === currentIndex ? 'white' : 'rgba(255,255,255,0.7)',
              border: 'none',
              borderRadius: '9999px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}
            onMouseEnter={(e) => {
              if (index !== currentIndex) {
                e.currentTarget.style.backgroundColor = 'white'
                e.currentTarget.style.transform = 'scale(1.25)'
              }
            }}
            onMouseLeave={(e) => {
              if (index !== currentIndex) {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.7)'
                e.currentTarget.style.transform = 'scale(1)'
              }
            }}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
