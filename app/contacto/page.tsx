"use client"

import { useState } from "react"
import { FaWhatsapp, FaFacebookF, FaInstagram, FaEnvelope } from "react-icons/fa"
import "@/app/styles/responsive-system.css"

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
    <main className="contact-page-container">
      <div className="contact-page-wrapper">
        {/* COLUMNA IZQUIERDA - TEXTO */}
        <div className="contact-info">
          <div className="contact-header-accent">
            <div className="contact-header-accent-bar" />
            <h2 className="contact-header-subtitle">
              Cada proyecto es una firma
            </h2>
          </div>
          
          <h1 className="contact-header-title">
            La tuya comienza aquí.
          </h1>
          
          <div className="contact-description">
            <p>
              El diseño correcto no se encuentra: se construye con intención, carácter y precisión. Compártenos tu visión y recibe una propuesta creada exclusivamente para ti.
            </p>
          </div>

          <div className="contact-social-links">
            <a 
              href="https://www.facebook.com/dkore.decore.y.remodele/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-social-link"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a 
              href="https://www.instagram.com/dkore.dkore/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-social-link"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a 
              href="https://wa.me/5930998682900" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-social-link"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a 
              href="mailto:dkore.dkore.18@gmail.com"
              className="contact-social-link"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* COLUMNA DERECHA - FORMULARIO */}
        <div>
          <div className="contact-form-wrapper">
            {submitted ? (
              <div className="contact-success-message">
                <h3>¡Gracias!</h3>
                <p>Tu mensaje ha sido enviado correctamente.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                >
                  Enviar otro
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-form-group">
                  <label className="contact-form-label">
                    Nombres y Apellidos
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Nombre"
                    required
                    className="contact-form-input"
                  />
                </div>

                <div className="contact-form-group">
                  <label className="contact-form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="contact-form-input"
                  />
                </div>

                <div className="contact-form-group">
                  <label className="contact-form-label">
                    Número celular
                  </label>
                  <input
                    type="tel"
                    name="celular"
                    value={form.celular}
                    onChange={handleChange}
                    placeholder="Número celular"
                    required
                    className="contact-form-input"
                  />
                </div>

                <div className="contact-form-group">
                  <label className="contact-form-label">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    name="ciudad"
                    value={form.ciudad}
                    onChange={handleChange}
                    placeholder="Tu ciudad"
                    required
                    className="contact-form-input"
                  />
                </div>

                <div className="contact-form-group">
                  <label className="contact-form-label">
                    Mensaje
                  </label>
                  <textarea
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handleChange}
                    placeholder="Mensaje"
                    rows={3}
                    required
                    className="contact-form-textarea"
                  />
                </div>

                <div className="contact-form-submit-wrapper">
                  <button
                    type="submit"
                    disabled={loading}
                    className="contact-form-submit"
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
