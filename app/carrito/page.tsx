'use client'

import React, { useState, useRef } from 'react'
import { useCart } from '@/contexts/CartContext'
import { ClienteData } from '@/types'
import { generarCotizacionPDF, ENVIO_GRATIS_DESDE, WHATSAPP_DKORE, PDFResult } from '@/lib/generarPDF'
import Link from 'next/link'

function validarCedula(cedula: string): boolean {
  if (!/^\d{10}$/.test(cedula)) return false
  const provincia = parseInt(cedula.slice(0, 2))
  if (provincia < 1 || provincia > 24) return false
  if (parseInt(cedula[2]) >= 6) return false
  const coef = [2, 1, 2, 1, 2, 1, 2, 1, 2]
  const suma = coef.reduce((acc, c, i) => {
    let val = c * parseInt(cedula[i])
    if (val >= 10) val -= 9
    return acc + val
  }, 0)
  const digitoVerificador = suma % 10 === 0 ? 0 : 10 - (suma % 10)
  return digitoVerificador === parseInt(cedula[9])
}

const inputStyle: React.CSSProperties = {
  width: '100%', background: '#1a1a1a', border: '1px solid #333',
  borderRadius: '8px', padding: '11px 14px', color: 'white',
  fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
  color: '#9ca3af', fontSize: '0.8rem', display: 'block', marginBottom: '6px',
}

export default function CarritoPage() {
  const { items, removeItem, updateQuantity } = useCart()
  const [seleccionados, setSeleccionados] = useState<Set<string>>(() => new Set(items.map(i => i.id)))
  const [cliente, setCliente] = useState<ClienteData>({ nombres: '', apellidos: '', cedula: '', telefono: '', direccion: '' })
  const [errores, setErrores] = useState<Partial<ClienteData>>({})
  const [generando, setGenerando] = useState(false)
  const [resultado, setResultado] = useState<PDFResult | null>(null)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const pdfRef = useRef<HTMLIFrameElement>(null)

  const itemsSeleccionados = items.filter(i => seleccionados.has(i.id))

  function toggleSeleccion(id: string) {
    setSeleccionados(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
    setResultado(null)
    setPdfUrl(null)
  }

  function validar(): boolean {
    const e: Partial<ClienteData> = {}
    if (!cliente.nombres.trim()) e.nombres = 'Requerido'
    if (!cliente.apellidos.trim()) e.apellidos = 'Requerido'
    if (!cliente.cedula.trim()) {
      e.cedula = 'Requerido'
    } else if (!validarCedula(cliente.cedula.trim())) {
      e.cedula = 'Cedula invalida'
    }
    if (!cliente.telefono.trim()) e.telefono = 'Requerido'
    if (!cliente.direccion.trim()) e.direccion = 'Requerido'
    setErrores(e)
    return Object.keys(e).length === 0
  }

  async function handleGenerar() {
    if (!validar() || itemsSeleccionados.length === 0) return
    setGenerando(true)
    try {
      const res = await generarCotizacionPDF(cliente, itemsSeleccionados)
      setResultado(res)
      setPdfUrl(URL.createObjectURL(res.blob))

      // Guardar en Supabase + enviar email al admin
      fetch('/api/cotizaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          numeroCotizacion: res.numeroCotizacion,
          fechaEmision: res.fechaEmision,
          fechaValidez: res.fechaValidez,
          cliente: cliente,
          items: itemsSeleccionados.map(function(i) { return { nombre: i.nombre, cantidad: i.cantidad, precio: i.precio || 0 } }),
          subtotal: res.subtotal,
          total: res.total,
        }),
      }).catch(function(err) { console.error('[API cotizaciones]', err) })
    } catch (err) {
      console.error('Error generando PDF:', err)
    } finally {
      setGenerando(false)
    }
  }

  function handleDescargar() {
    if (!resultado || !pdfUrl) return
    const a = document.createElement('a')
    a.href = pdfUrl
    a.download = `Cotizacion-DKore-${resultado.numeroCotizacion}.pdf`
    a.click()
  }

  function handleWhatsApp() {
    if (!resultado) return
    const nombre = `${cliente.nombres} ${cliente.apellidos}`.trim()
    const msg = encodeURIComponent(
      `Hola! Soy ${nombre} y acabo de generar una cotizacion en D'kore.\n\n` +
      `Cotizacion N ${resultado.numeroCotizacion}\n` +
      `Valida hasta: ${resultado.fechaValidez}\n` +
      `Total: ${resultado.total.toFixed(2)} USD\n\n` +
      `Adjunto el PDF con el detalle. Podrian confirmarme disponibilidad? Gracias!`
    )
    window.open(`https://wa.me/${WHATSAPP_DKORE}?text=${msg}`, '_blank')
  }

  if (items.length === 0) {
    return (
      <main style={{ minHeight: '100vh', background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', paddingTop: '80px' }}>
        <p style={{ color: '#6b7280', fontSize: '1rem' }}>Tu carrito esta vacio</p>
        <Link href="/catalogo">
          <button style={{ padding: '12px 28px', borderRadius: '8px', border: 'none', background: '#C5A059', color: 'black', cursor: 'pointer', fontWeight: '700' }}>Ver catalogo</button>
        </Link>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', background: '#000', paddingTop: '90px', paddingBottom: '60px' }}>
      <div className="carrito-grid" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 16px' }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h1 style={{ color: 'white', fontSize: '1.4rem', fontWeight: '700', margin: '0 0 4px' }}>Mi carrito</h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', gap: '12px' }}>
              <p style={{ color: '#6b7280', fontSize: '0.82rem', margin: 0 }}>Selecciona los productos para cotizar</p>
              <button
                onClick={() => {
                  const todos = items.every(i => seleccionados.has(i.id))
                  setSeleccionados(todos ? new Set() : new Set(items.map(i => i.id)))
                  setResultado(null)
                  setPdfUrl(null)
                }}
                style={{ background: 'none', border: '1px solid #333', borderRadius: '6px', color: '#9ca3af', cursor: 'pointer', fontSize: '0.78rem', padding: '5px 12px', flexShrink: 0, whiteSpace: 'nowrap' }}
              >
                {items.every(i => seleccionados.has(i.id)) ? 'Deseleccionar todo' : 'Seleccionar todo'}
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {items.map(item => {
                const checked = seleccionados.has(item.id)
                return (
                  <div key={item.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '14px', borderRadius: '12px', background: checked ? '#111' : '#0a0a0a', border: `1px solid ${checked ? '#2a2a2a' : '#1a1a1a'}`, opacity: checked ? 1 : 0.5, transition: 'all 0.2s' }}>
                    <div onClick={() => toggleSeleccion(item.id)} style={{ width: 20, height: 20, borderRadius: '5px', flexShrink: 0, marginTop: '2px', border: `2px solid ${checked ? '#C5A059' : '#444'}`, background: checked ? '#C5A059' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                      {checked && <span style={{ color: 'black', fontSize: '12px', fontWeight: '900', lineHeight: 1 }}>&#10003;</span>}
                    </div>
                    <div style={{ width: '64px', height: '64px', flexShrink: 0, borderRadius: '8px', overflow: 'hidden', background: '#1a1a1a' }}>
                      <img src={item.imagen} alt={item.nombre} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ color: 'white', fontSize: '0.875rem', fontWeight: '600', margin: '0 0 3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.nombre}</p>
                      {item.color && <p style={{ color: '#9ca3af', fontSize: '0.75rem', margin: '0 0 2px' }}>Color: {item.color}</p>}
                      {item.configuracion && (
                        <p style={{ color: '#9ca3af', fontSize: '0.72rem', margin: '0 0 2px' }}>
                          {item.configuracion.alto}m x {item.configuracion.profundidad}m x {item.configuracion.ancho}m - {item.configuracion.tipoMelamina}
                        </p>
                      )}
                      {item.notaEspecial && <p style={{ color: '#6b7280', fontSize: '0.72rem', margin: '0 0 2px' }}>{item.notaEspecial}</p>}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                        <button onClick={() => updateQuantity(item.id, item.cantidad - 1)} style={{ width: 26, height: 26, borderRadius: '5px', border: '1px solid #333', background: 'transparent', color: 'white', cursor: 'pointer' }}>-</button>
                        <span style={{ color: 'white', minWidth: '20px', textAlign: 'center', fontSize: '0.875rem' }}>{item.cantidad}</span>
                        <button onClick={() => updateQuantity(item.id, item.cantidad + 1)} style={{ width: 26, height: 26, borderRadius: '5px', border: '1px solid #333', background: 'transparent', color: 'white', cursor: 'pointer' }}>+</button>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: '#4b5563', cursor: 'pointer', fontSize: '1.1rem', flexShrink: 0 }} title="Eliminar">x</button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="carrito-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {!resultado && (
            <div style={{ background: '#0d0d0d', borderRadius: '14px', border: '1px solid #1f1f1f', padding: '20px' }}>
              <h2 style={{ color: 'white', fontSize: '1rem', fontWeight: '700', margin: '0 0 16px' }}>Tus datos</h2>
              <div className="form-grid" style={{ display: 'grid', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Nombres *</label>
                  <input style={{ ...inputStyle, borderColor: errores.nombres ? '#f87171' : '#333' }} value={cliente.nombres}
                    onChange={e => { setCliente(p => ({ ...p, nombres: e.target.value })); setErrores(p => ({ ...p, nombres: '' })) }}
                    placeholder="Juan Carlos" />
                  {errores.nombres && <p style={{ color: '#f87171', fontSize: '0.72rem', marginTop: '4px' }}>{errores.nombres}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Apellidos *</label>
                  <input style={{ ...inputStyle, borderColor: errores.apellidos ? '#f87171' : '#333' }} value={cliente.apellidos}
                    onChange={e => { setCliente(p => ({ ...p, apellidos: e.target.value })); setErrores(p => ({ ...p, apellidos: '' })) }}
                    placeholder="Perez Garcia" />
                  {errores.apellidos && <p style={{ color: '#f87171', fontSize: '0.72rem', marginTop: '4px' }}>{errores.apellidos}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Cedula *</label>
                  <input
                    style={{ ...inputStyle, borderColor: errores.cedula ? '#f87171' : cliente.cedula.length === 10 && validarCedula(cliente.cedula) ? '#22c55e' : '#333' }}
                    value={cliente.cedula} inputMode="numeric"
                    onChange={e => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 10)
                      setCliente(p => ({ ...p, cedula: val }))
                      setErrores(p => ({ ...p, cedula: '' }))
                    }}
                    placeholder="0102030405" maxLength={10} />
                  {errores.cedula
                    ? <p style={{ color: '#f87171', fontSize: '0.72rem', marginTop: '4px' }}>{errores.cedula}</p>
                    : cliente.cedula.length === 10 && validarCedula(cliente.cedula)
                      ? <p style={{ color: '#22c55e', fontSize: '0.72rem', marginTop: '4px' }}>Cedula valida</p>
                      : null
                  }
                </div>
                <div>
                  <label style={labelStyle}>Telefono *</label>
                  <input style={{ ...inputStyle, borderColor: errores.telefono ? '#f87171' : '#333' }} value={cliente.telefono}
                    onChange={e => { setCliente(p => ({ ...p, telefono: e.target.value.replace(/\D/g, '').slice(0, 15) })); setErrores(p => ({ ...p, telefono: '' })) }}
                    placeholder="0998765432" inputMode="numeric" maxLength={15} />
                  {errores.telefono && <p style={{ color: '#f87171', fontSize: '0.72rem', marginTop: '4px' }}>{errores.telefono}</p>}
                </div>
                <div className="form-full">
                  <label style={labelStyle}>Direccion *</label>
                  <input style={{ ...inputStyle, borderColor: errores.direccion ? '#f87171' : '#333' }} value={cliente.direccion}
                    onChange={e => { setCliente(p => ({ ...p, direccion: e.target.value })); setErrores(p => ({ ...p, direccion: '' })) }}
                    placeholder="Av. Solano y Remigio Crespo, Cuenca" />
                  {errores.direccion && <p style={{ color: '#f87171', fontSize: '0.72rem', marginTop: '4px' }}>{errores.direccion}</p>}
                </div>
              </div>
            </div>
          )}

          {pdfUrl && (
            <div style={{ background: '#0d0d0d', borderRadius: '14px', border: '1px solid #2a2a2a', overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid #1f1f1f', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: 'white', fontWeight: '700', fontSize: '0.875rem', margin: 0 }}>Cotizacion generada</p>
                  <p style={{ color: '#6b7280', fontSize: '0.75rem', margin: '2px 0 0' }}>N {resultado?.numeroCotizacion} - Valida hasta {resultado?.fechaValidez}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button onClick={() => { setResultado(null); setPdfUrl(null) }} style={{ background: 'none', border: '1px solid #333', borderRadius: '6px', color: '#9ca3af', cursor: 'pointer', fontSize: '0.72rem', padding: '4px 10px' }}>Editar datos</button>
                  <span style={{ background: '#16a34a22', color: '#4ade80', fontSize: '0.72rem', padding: '3px 8px', borderRadius: '20px', border: '1px solid #16a34a44' }}>Lista</span>
                </div>
              </div>
              <iframe ref={pdfRef} src={pdfUrl} style={{ width: '100%', height: '480px', border: 'none', background: 'white' }} title="Preview cotizacion" />
            </div>
          )}

          <div style={{ background: '#0d0d0d', borderRadius: '14px', border: '1px solid #1f1f1f', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {!resultado ? (
              <button onClick={handleGenerar} disabled={generando || itemsSeleccionados.length === 0}
                style={{ width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: itemsSeleccionados.length === 0 ? '#333' : '#C5A059', color: itemsSeleccionados.length === 0 ? '#666' : 'black', cursor: itemsSeleccionados.length === 0 ? 'not-allowed' : 'pointer', fontWeight: '700', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                {generando
                  ? <><span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid #000', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />Generando...</>
                  : 'Generar cotizacion'}
              </button>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button onClick={handleDescargar} style={{ width: '100%', padding: '13px', borderRadius: '10px', border: 'none', background: '#C5A059', color: 'black', cursor: 'pointer', fontWeight: '700', fontSize: '0.9rem' }}>Descargar cotizacion</button>
                <button onClick={handleWhatsApp} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: 'none', background: '#25D366', color: 'white', cursor: 'pointer', fontWeight: '700', fontSize: '0.9rem' }}>Enviar por WhatsApp</button>
              </div>
            )}
            <p style={{ color: '#4b5563', fontSize: '0.72rem', textAlign: 'center', margin: 0 }}>La cotizacion tiene validez de 15 dias desde su emision</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .carrito-grid { display: grid; grid-template-columns: 1fr 400px; gap: 32px; align-items: start; }
        .carrito-sidebar { position: sticky; top: 100px; }
        .form-grid { grid-template-columns: 1fr 1fr; }
        .form-full { grid-column: 1 / -1; }
        @media (max-width: 900px) { .carrito-grid { grid-template-columns: 1fr 340px; gap: 20px; } }
        @media (max-width: 640px) {
          .carrito-grid { grid-template-columns: 1fr; gap: 24px; }
          .carrito-sidebar { position: static; }
          .form-grid { grid-template-columns: 1fr; }
          .form-full { grid-column: 1; }
        }
      `}</style>
    </main>
  )
}