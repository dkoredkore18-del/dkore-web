"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function NuestroEquipo() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO SECTION */}
      <section 
        style={{
          paddingTop: '120px',
          paddingBottom: '80px',
          paddingLeft: '24px',
          paddingRight: '24px',
          textAlign: 'center'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            maxWidth: '900px',
            margin: '0 auto'
          }}
        >
          <h1 
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              lineHeight: '1.2'
            }}
          >
            Nuestro Equipo
          </h1>
          <p 
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: '#d1d5db',
              lineHeight: '1.6',
              marginBottom: '2rem'
            }}
          >
            Conoce quiénes somos, qué hacemos y por qué transformamos espacios con pasión, diseño y precisión.
          </p>
        </motion.div>
      </section>

      {/* DIVIDER */}
      <div 
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          paddingLeft: '24px',
          paddingRight: '24px',
          marginBottom: '80px'
        }}
      >
        <div 
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, #e5e7eb, transparent)',
            width: '100%'
          }}
        />
      </div>

      {/* ¿A QUÉ NOS DEDICAMOS? */}
      <section 
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          paddingLeft: '24px',
          paddingRight: '24px',
          paddingBottom: '120px'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '32px'
            }}
          >
            <div 
              style={{
                width: '4px',
                height: '32px',
                backgroundColor: '#e5e7eb'
              }}
            />
            <h2 
              style={{
                fontSize: '1.875rem',
                fontWeight: '600',
                color: 'white'
              }}
            >
              ¿A qué nos dedicamos?
            </h2>
          </div>
          
          <p 
            style={{
              fontSize: '1.125rem',
              lineHeight: '1.8',
              color: '#d1d5db',
              maxWidth: '800px'
            }}
          >
            En D'kore diseñamos y fabricamos muebles de melamina a medida, macetas en fibra de vidrio y soluciones decorativas que transforman espacios. Nos especializamos en acabados modernos, funcionales y personalizados que reflejan la identidad de cada cliente.
          </p>
        </motion.div>
      </section>

      {/* NUESTRA FILOSOFÍA */}
      <section 
        style={{
          backgroundColor: '#6a6565',
          paddingTop: '120px',
          paddingBottom: '120px',
          paddingLeft: '24px',
          paddingRight: '24px'
        }}
      >
        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto'
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '32px'
              }}
            >
              <div 
                style={{
                  width: '4px',
                  height: '32px',
                  backgroundColor: '#e5e7eb'
                }}
              />
              <h2 
                style={{
                  fontSize: '1.875rem',
                  fontWeight: '600',
                  color: 'white'
                }}
              >
                Nuestra filosofía
              </h2>
            </div>
            
            <p 
              style={{
                fontSize: '1.125rem',
                lineHeight: '1.8',
                color: '#d1d5db',
                maxWidth: '800px'
              }}
            >
              Creemos en la autenticidad, en el diseño funcional y en la libertad de crear espacios que reflejen personalidad. Cada proyecto es único y lo trabajamos con compromiso y atención al detalle, buscando siempre superar las expectativas de nuestros clientes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* NUESTROS VALORES */}
      <section 
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          paddingLeft: '24px',
          paddingRight: '24px',
          paddingTop: '120px',
          paddingBottom: '120px'
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            fontSize: '2.25rem',
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: '80px',
            color: 'white'
          }}
        >
          Nuestros Valores
        </motion.h2>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '48px'
          }}
        >
          {[
            {
              title: "Calidad",
              description: "Materiales resistentes y acabados profesionales en cada proyecto. Garantizamos durabilidad y excelencia en todo lo que hacemos."
            },
            {
              title: "Diseño",
              description: "Propuestas modernas y personalizadas adaptadas a cada espacio. Escuchamos tus ideas y las transformamos en realidad."
            },
            {
              title: "Compromiso",
              description: "Cumplimos tiempos y garantizamos resultados que superan expectativas. Tu satisfacción es nuestro éxito."
            }
          ].map((valor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{
                padding: '40px',
                borderTop: '2px solid #e5e7eb',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#6a6565'
                e.currentTarget.style.borderRadius = '8px'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <h3 
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#e5e7eb'
                }}
              >
                {valor.title}
              </h3>
              <p 
                style={{
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: '#d1d5db'
                }}
              >
                {valor.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section 
        style={{
          backgroundColor: '#6a6565',
          paddingTop: '120px',
          paddingBottom: '120px',
          paddingLeft: '24px',
          paddingRight: '24px',
          textAlign: 'center'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}
        >
          <h2 
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 'bold',
              marginBottom: '32px',
              color: 'white',
              lineHeight: '1.2'
            }}
          >
            Trabajemos juntos
          </h2>

          <p 
            style={{
              fontSize: '1.125rem',
              lineHeight: '1.8',
              color: '#d1d5db',
              marginBottom: '48px'
            }}
          >
            Si tienes un proyecto en mente o quieres transformar tu espacio, estaremos encantados de ayudarte a hacerlo realidad.
          </p>

          <Link href="/contacto">
            <button 
              style={{
                backgroundColor: 'white',
                color: 'black',
                padding: '16px 48px',
                borderRadius: '9999px',
                fontWeight: '600',
                fontSize: '1.125rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6'
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              Ir a Contacto
            </button>
          </Link>
        </motion.div>
      </section>
    </main>
  )
}