"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { CATEGORIAS, SUBCATEGORIAS_MELAMINA } from "@/lib/constants"
import { useProducts } from "@/hooks/useProducts"
import CartButton from "@/components/cart/CartButton"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  
  // Desktop hover states
  const [productosHover, setProductosHover] = useState(false)
  const [catalogoHover, setCatalogoHover] = useState(false)
  const [melaminaHover, setMelaminaHover] = useState(false)
  
  // Mobile click states
  const [mobileProductos, setMobileProductos] = useState(false)
  const [mobileCatalogo, setMobileCatalogo] = useState(false)
  const [mobileMelamina, setMobileMelamina] = useState(false)

  const { products } = useProducts()
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Close search on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close search on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false)
    }
    document.addEventListener("keydown", handleEsc)
    return () => document.removeEventListener("keydown", handleEsc)
  }, [])

  const filteredProducts = products.filter(p =>
    p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      {/* NAVBAR */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '100px',
          zIndex: 50,
          backgroundColor: scrolled ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
          boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.3)' : 'none',
          transition: 'all 0.3s'
        }}
      >
        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 1.5rem',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative'
          }}
        >
          {/* IZQUIERDA - Logo */}
          <Link href="/">
            <Image
              src="/logo.png"
              alt="D'kore"
              width={scrolled ? 60 : 70}
              height={scrolled ? 60 : 70}
              style={{ transition: 'all 0.3s', position: 'relative', zIndex: 10 }}
            />
          </Link>

          {/* CENTRO - Desktop Menu */}
          {isDesktop && (
            <ul 
              style={{
                display: 'flex',
                gap: '2.5rem',
                fontSize: '1.25rem',
                letterSpacing: '0.05em',
                alignItems: 'center',
                color: 'white',
                listStyle: 'none',
                margin: 0,
                padding: 0,
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            >
              <li>
                <Link 
                  href="/" 
                  style={{ 
                    transition: 'color 0.3s', 
                    textDecoration: 'none', 
                    color: 'white',
                    whiteSpace: 'nowrap'
                  }} 
                  onMouseEnter={(e) => e.currentTarget.style.color = '#d1d5db'} 
                  onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                >
                  Inicio
                </Link>
              </li>

              <li
                onMouseEnter={() => setProductosHover(true)}
                onMouseLeave={() => {
                  setProductosHover(false)
                  setCatalogoHover(false)
                  setMelaminaHover(false)
                }}
                style={{ position: 'relative' }}
              >
                <span 
                  style={{ 
                    cursor: 'pointer', 
                    transition: 'color 0.3s', 
                    color: 'white',
                    whiteSpace: 'nowrap'
                  }} 
                  onMouseEnter={(e) => e.currentTarget.style.color = '#d1d5db'} 
                  onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                >
                  Productos ▼
                </span>
              </li>

              <li>
                <Link 
                  href="/nuestro-equipo" 
                  style={{ 
                    transition: 'color 0.3s', 
                    textDecoration: 'none', 
                    color: 'white',
                    whiteSpace: 'nowrap'
                  }} 
                  onMouseEnter={(e) => e.currentTarget.style.color = '#d1d5db'} 
                  onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                >
                  Nuestro equipo
                </Link>
              </li>

              <li>
                <Link 
                  href="/contacto" 
                  style={{ 
                    transition: 'color 0.3s', 
                    textDecoration: 'none', 
                    color: 'white',
                    whiteSpace: 'nowrap'
                  }} 
                  onMouseEnter={(e) => e.currentTarget.style.color = '#d1d5db'} 
                  onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                >
                  Contacto
                </Link>
              </li>
            </ul>
          )}

          {/* DERECHA - Buscador + Carrito + Hamburguesa (mobile) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative', zIndex: 10 }}>
            {/* Buscador */}
            <button
              onClick={() => setSearchOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer',
                transition: 'color 0.3s',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#d1d5db'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>

            {/* Carrito */}
            <CartButton />

            {/* Hamburguesa - Solo Mobile */}
            {!isDesktop && (
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{
                  fontSize: '1.5rem',
                  color: 'white',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem'
                }}
              >
                {mobileOpen ? "✕" : "☰"}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Desktop Dropdown - Productos */}
      {isDesktop && (
        <AnimatePresence>
          {productosHover && (
            <div
              onMouseEnter={() => setProductosHover(true)}
              onMouseLeave={() => {
                setProductosHover(false)
                setCatalogoHover(false)
                setMelaminaHover(false)
              }}
              style={{
                position: 'fixed',
                top: '100px',
                left: '50%',
                marginLeft: '-7rem',
                zIndex: 300,
                width: '50rem',
                minHeight: '250px'
              }}
            >
              {/* Menú 1: Catálogo */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '14rem',
                  backgroundColor: 'rgba(0,0,0,0.95)',
                  borderRadius: '0.5rem',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                  overflow: 'hidden'
                }}
              >
                <Link
                  href="/catalogo"
                  onMouseEnter={() => setCatalogoHover(true)}
                  style={{
                    display: 'flex',
                    padding: '0.75rem 1rem',
                    color: 'white',
                    cursor: 'pointer',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'background 0.2s',
                    textDecoration: 'none'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  onClick={() => setProductosHover(false)}
                >
                  Catálogo
                  <span>▶</span>
                </Link>
              </motion.div>

              {/* Menú 2: Categorías */}
              <AnimatePresence>
                {catalogoHover && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setCatalogoHover(true)}
                    onMouseLeave={(e) => {
                      // Solo cerrar si el cursor no se mueve hacia Menu 3
                      const rect = e.currentTarget.getBoundingClientRect()
                      const isMovingToMenu3 = e.clientX > rect.right
                      if (!isMovingToMenu3) {
                        setCatalogoHover(false)
                        setMelaminaHover(false)
                      }
                    }}
                    style={{
                      position: 'absolute',
                      left: '14rem',
                      top: 0,
                      width: '18rem',
                      backgroundColor: 'rgba(0,0,0,0.95)',
                      borderRadius: '0.5rem',
                      boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                      overflow: 'hidden'
                    }}
                  >
                    {CATEGORIAS.map((cat) => (
                      <div key={cat.slug}>
                        {cat.slug === "muebles-melamina" ? (
                          <div
                            onMouseEnter={() => setMelaminaHover(true)}
                            style={{
                              padding: '0.75rem 1rem',
                              color: 'white',
                              cursor: 'pointer',
                              display: 'flex',
                              justifyContent: 'space-between',
                              transition: 'background 0.2s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            {cat.nombre}
                            <span>▶</span>
                          </div>
                        ) : (
                          <Link
                            href={`/catalogo/${cat.slug}`}
                            style={{
                              display: 'block',
                              padding: '0.75rem 1rem',
                              color: 'white',
                              transition: 'background 0.2s',
                              textDecoration: 'none'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            onClick={() => {
                              setProductosHover(false)
                              setCatalogoHover(false)
                            }}
                          >
                            {cat.nombre}
                          </Link>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Menú 3: Melamina */}
              <AnimatePresence>
                {melaminaHover && catalogoHover && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setMelaminaHover(true)}
                    onMouseLeave={() => setMelaminaHover(false)}
                    style={{
                      position: 'absolute',
                      left: '32rem',
                      top: 0,
                      width: '16rem',
                      backgroundColor: 'rgba(0,0,0,0.95)',
                      borderRadius: '0.5rem',
                      boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                      overflow: 'hidden'
                    }}
                  >
                    {SUBCATEGORIAS_MELAMINA.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/catalogo/muebles-melamina/${sub.slug}`}
                        style={{
                          display: 'block',
                          padding: '0.75rem 1rem',
                          color: 'white',
                          transition: 'background 0.2s',
                          textDecoration: 'none'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        onClick={() => {
                          setProductosHover(false)
                          setCatalogoHover(false)
                          setMelaminaHover(false)
                        }}
                      >
                        {sub.nombre}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </AnimatePresence>
      )}

      {/* Mobile Menu */}
      {!isDesktop && (
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'fixed',
                top: '100px',
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0,0,0,0.95)',
                zIndex: 300,
                overflow: 'hidden'
              }}
            >
              <div style={{ padding: '1.5rem', color: 'white' }}>
                <Link href="/" onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '0.75rem 0', color: 'white', textDecoration: 'none' }}>
                  Inicio
                </Link>

                <div>
                  <button
                    onClick={() => setMobileProductos(!mobileProductos)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '0.75rem 0',
                      background: 'none',
                      border: 'none',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      textAlign: 'left'
                    }}
                  >
                    Productos
                    <span>{mobileProductos ? "▲" : "▼"}</span>
                  </button>

                  {mobileProductos && (
                    <div style={{ paddingLeft: '1rem', marginTop: '0.5rem' }}>
                      <button
                        onClick={() => setMobileCatalogo(!mobileCatalogo)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '0.75rem 0',
                          background: 'none',
                          border: 'none',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          textAlign: 'left'
                        }}
                      >
                        Catálogo
                        <span>{mobileCatalogo ? "▲" : "▼"}</span>
                      </button>

                      {mobileCatalogo && (
                        <div style={{ paddingLeft: '1rem', marginTop: '0.5rem' }}>
                          {CATEGORIAS.map((cat) => (
                            <div key={cat.slug}>
                              {cat.slug === "muebles-melamina" ? (
                                <>
                                  <button
                                    onClick={() => setMobileMelamina(!mobileMelamina)}
                                    style={{
                                      width: '100%',
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      padding: '0.75rem 0',
                                      background: 'none',
                                      border: 'none',
                                      color: 'white',
                                      cursor: 'pointer',
                                      fontSize: '1rem',
                                      textAlign: 'left'
                                    }}
                                  >
                                    {cat.nombre}
                                    <span>{mobileMelamina ? "▲" : "▼"}</span>
                                  </button>

                                  {mobileMelamina && (
                                    <div style={{ paddingLeft: '1rem', marginTop: '0.5rem' }}>
                                      {SUBCATEGORIAS_MELAMINA.map((sub) => (
                                        <Link
                                          key={sub.slug}
                                          href={`/catalogo/muebles-melamina/${sub.slug}`}
                                          onClick={() => setMobileOpen(false)}
                                          style={{ display: 'block', padding: '0.75rem 0', color: 'white', textDecoration: 'none' }}
                                        >
                                          {sub.nombre}
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                </>
                              ) : (
                                <Link
                                  href={`/catalogo/${cat.slug}`}
                                  onClick={() => setMobileOpen(false)}
                                  style={{ display: 'block', padding: '0.75rem 0', color: 'white', textDecoration: 'none' }}
                                >
                                  {cat.nombre}
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <Link href="/nuestro-equipo" onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '0.75rem 0', color: 'white', textDecoration: 'none' }}>
                  Nuestro equipo
                </Link>

                <Link href="/contacto" onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '0.75rem 0', color: 'white', textDecoration: 'none' }}>
                  Contacto
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.8)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingTop: '10vh'
            }}
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              ref={searchRef}
              initial={{ scale: 0.9, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '90%',
                maxWidth: '600px',
                backgroundColor: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
              }}
            >
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1.125rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  outline: 'none',
                  marginBottom: '1rem'
                }}
              />

              {searchQuery && (
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.slice(0, 8).map((product) => (
                      <Link
                        key={product.id}
                        href={`/catalogo/producto/${product.slug}`}
                        onClick={() => {
                          setSearchOpen(false)
                          setSearchQuery("")
                        }}
                        style={{
                          display: 'flex',
                          gap: '1rem',
                          padding: '1rem',
                          borderRadius: '0.5rem',
                          transition: 'background 0.2s',
                          cursor: 'pointer',
                          textDecoration: 'none',
                          color: 'inherit'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <Image
                          src={product.imagenes[0]}
                          alt={product.nombre}
                          width={60}
                          height={60}
                          style={{ borderRadius: '0.5rem', objectFit: 'cover' }}
                        />
                        <div>
                          <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{product.nombre}</h4>
                          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{product.descripcion}</p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
                      No se encontraron productos
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
