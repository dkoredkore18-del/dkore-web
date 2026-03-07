"use client"

import Link from "next/link"
import Image from "next/image"
import { FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Columna 1: Información */}
          <div>
            <Image 
              src="/logo.png" 
              alt="D'kore Logo" 
              width={120} 
              height={120}
              className="mb-4"
            />
            <p className="text-gray-400 mb-4">Decore y Remodele</p>
            <div className="space-y-2 text-sm text-gray-400">
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt /> Cuenca, Ecuador
              </p>
              <p className="flex items-center gap-2">
                <FaPhone /> +593 99 868 2900
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope /> dkore.dkore.18@gmail.com
              </p>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="hover:text-white transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/nuestro-equipo" className="hover:text-white transition-colors">
                  Quiénes Somos
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Redes Sociales */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Síguenos</h3>
            <div className="flex gap-12">
              <a 
                href="https://www.facebook.com/dkore.decore.y.remodele/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#1f2937',
                  color: 'white',
                  fontSize: '1.75rem',
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'white'
                  e.currentTarget.style.color = '#000'
                  e.currentTarget.style.transform = 'scale(1.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#1f2937'
                  e.currentTarget.style.color = 'white'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <FaFacebook />
              </a>
              <a 
                href="https://www.instagram.com/dkore.dkore/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#1f2937',
                  color: 'white',
                  fontSize: '1.75rem',
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'white'
                  e.currentTarget.style.color = '#000'
                  e.currentTarget.style.transform = 'scale(1.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#1f2937'
                  e.currentTarget.style.color = 'white'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>© 2024 D'kore. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
