"use client"

import { useState } from "react"
import { FaWhatsapp, FaFacebookF, FaInstagram, FaEnvelope } from "react-icons/fa"

export default function ContactoPage() {
  const [form, setForm] = useState({ 
    nombre: "", 
    email: "", 
    celular: "",
    ciudad: "",
    mensaje: "" 
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error('Error al enviar el mensaje')
      }

      setSubmitted(true)
      setForm({ nombre: "", email: "", celular: "", ciudad: "", mensaje: "" })
    } catch (error: any) {
      console.error('Error:', error)
      alert(`Error al enviar el mensaje: ${error?.message || 'Por favor intenta de nuevo.'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main 
      style={{
        minHeight: '100vh',
        backgroundColor: 'black',
        paddingTop: '96px',
        paddingBottom: '96px',
        paddingLeft: '24px',
        paddingRight: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div 
        style={{
          maxWidth: '1280px',
          width: '100%',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '64px',
          alignItems: 'center'
        }}
      >
        {/* COLUMNA IZQUIERDA - TEXTO */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            color: 'white'
          }}
        >
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '16px'
            }}
          >
            <div 
              style={{
                width: '8px',
                height: '48px',
                backgroundColor: '#e5e7eb'
              }}
            />
            <h2 
              style={{
                fontSize: '1.875rem',
                fontWeight: '300',
                color: 'white'
              }}
            >
              Cada proyecto es una firma
            </h2>
          </div>
          
          <h1 
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 'bold',
              lineHeight: '1.2',
              marginBottom: '16px'
            }}
          >
            La tuya comienza aquí.
          </h1>
          
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <p 
              style={{
                fontSize: '1.125rem',
                color: '#d1d5db',
                lineHeight: '1.6'
              }}
            >
              El diseño correcto no se encuentra: se construye con intención, carácter y precisión. Compártenos tu visión y recibe una propuesta creada exclusivamente para ti.
            </p>
          </div>

          <div 
            style={{
              display: 'flex',
              gap: '24px',
              marginTop: '16px'
            }}
          >
            <a 
              href="https://www.facebook.com/dkore.decore.y.remodele/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: 'white',
                fontSize: '1.5rem',
                transition: 'color 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#e5e7eb'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
            >
              <FaFacebookF />
            </a>
            <a 
              href="https://www.instagram.com/dkore.dkore/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: 'white',
                fontSize: '1.5rem',
                transition: 'color 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#e5e7eb'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
            >
              <FaInstagram />
            </a>
            <a 
              href="https://wa.me/5930998682900" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: 'white',
                fontSize: '1.5rem',
                transition: 'color 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#e5e7eb'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
            >
              <FaWhatsapp />
            </a>
            <a 
              href="mailto:dkore.dkore.18@gmail.com"
              style={{
                color: 'white',
                fontSize: '1.5rem',
                transition: 'color 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#e5e7eb'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* COLUMNA DERECHA - FORMULARIO */}
        <div>
          <div 
            style={{
              border: '1.5px solid white',
              padding: '40px',
              backgroundColor: 'black'
            }}
          >
            {submitted ? (
              <div 
                style={{
                  textAlign: 'center',
                  paddingTop: '80px',
                  paddingBottom: '80px',
                  color: 'white'
                }}
              >
                <h3 
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '16px'
                  }}
                >
                  ¡Gracias!
                </h3>
                <p>Tu mensaje ha sido enviado correctamente.</p>
                <button 
                  onClick={() => setSubmitted(false)} 
                  style={{
                    marginTop: '24px',
                    textDecoration: 'underline',
                    fontWeight: 'bold',
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Enviar otro
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: 'white' }}>
                <div>
                  <label 
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                      marginBottom: '8px'
                    }}
                  >
                    Nombres y Apellidos
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Nombre"
                    required
                    style={{
                      width: '100%',
                      border: '1px solid #4b5563',
                      padding: '10px',
                      outline: 'none',
                      backgroundColor: 'black',
                      color: 'white',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'white'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#4b5563'}
                  />
                </div>

                <div>
                  <label 
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                      marginBottom: '8px'
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    style={{
                      width: '100%',
                      border: '1px solid #4b5563',
                      padding: '10px',
                      outline: 'none',
                      backgroundColor: 'black',
                      color: 'white',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'white'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#4b5563'}
                  />
                </div>

                <div>
                  <label 
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                      marginBottom: '8px'
                    }}
                  >
                    Número celular
                  </label>
                  <input
                    type="tel"
                    name="celular"
                    value={form.celular}
                    onChange={handleChange}
                    placeholder="Número celular"
                    required
                    style={{
                      width: '100%',
                      border: '1px solid #4b5563',
                      padding: '10px',
                      outline: 'none',
                      backgroundColor: 'black',
                      color: 'white',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'white'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#4b5563'}
                  />
                </div>

                <div>
                  <label 
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                      marginBottom: '8px'
                    }}
                  >
                    Ciudad
                  </label>
                  <input
                    type="text"
                    name="ciudad"
                    value={form.ciudad}
                    onChange={handleChange}
                    placeholder="Tu ciudad"
                    required
                    style={{
                      width: '100%',
                      border: '1px solid #4b5563',
                      padding: '10px',
                      outline: 'none',
                      backgroundColor: 'black',
                      color: 'white',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'white'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#4b5563'}
                  />
                </div>

                <div>
                  <label 
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                      marginBottom: '8px'
                    }}
                  >
                    Mensaje
                  </label>
                  <textarea
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handleChange}
                    placeholder="Mensaje"
                    rows={3}
                    required
                    style={{
                      width: '100%',
                      border: '1px solid #4b5563',
                      padding: '10px',
                      outline: 'none',
                      backgroundColor: 'black',
                      color: 'white',
                      resize: 'none',
                      transition: 'border-color 0.3s',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'white'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#4b5563'}
                  />
                </div>

                <div 
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '8px'
                  }}
                >
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      border: '2px solid white',
                      paddingLeft: '48px',
                      paddingRight: '48px',
                      paddingTop: '8px',
                      paddingBottom: '8px',
                      fontSize: '1.125rem',
                      fontWeight: 'bold',
                      backgroundColor: 'transparent',
                      color: 'white',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      transition: 'all 0.3s',
                      opacity: loading ? 0.5 : 1
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        e.currentTarget.style.backgroundColor = 'white'
                        e.currentTarget.style.color = 'black'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!loading) {
                        e.currentTarget.style.backgroundColor = 'transparent'
                        e.currentTarget.style.color = 'white'
                      }
                    }}
                  >
                    {loading ? 'Enviando...' : 'Enviar'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
