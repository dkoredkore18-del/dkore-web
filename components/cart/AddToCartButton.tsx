'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { CartItem, ConfiguracionMueble } from '@/types'
import { calcularPrecioMaceta, PRECIO_REVESTIMIENTO_3D, COLORES_ESTANDAR_MACETAS } from '@/lib/precios'

interface Props {
  producto: {
    id: number
    nombre: string
    slug: string
    imagenes: string[]
    categoria: string
  }
}

const COLORES_MACETA = ['Blanco', 'Negro', 'Champán', 'Otro color']
const COLORES_REVESTIMIENTO = ['Blanco', 'Negro', 'Gris', 'Beige', 'Otro color']

// Colores adicionales para el dropdown de "Otro color"
const COLORES_EXTRA_MACETA = [
  'Azul marino', 'Azul cielo', 'Verde oliva', 'Verde esmeralda',
  'Rojo', 'Naranja', 'Amarillo', 'Rosa', 'Morado', 'Terracota',
  'Gris claro', 'Gris oscuro', 'Café', 'Personalizado...',
]
const COLORES_EXTRA_REVESTIMIENTO = [
  'Azul marino', 'Azul cielo', 'Verde oliva', 'Verde esmeralda',
  'Rojo', 'Naranja', 'Amarillo', 'Rosa', 'Morado', 'Terracota',
  'Café', 'Personalizado...',
]
const TIPOS_MELAMINA = ['Normal', 'RH (Resistente a la Humedad)']
const COLORES_MELAMINA = [
  'Blanco Brillante', 'Blanco Mate', 'Negro Mate', 'Gris Claro',
  'Gris Oscuro', 'Roble Natural', 'Roble Oscuro', 'Wengue',
  'Cedro', 'Nogal', 'Cerezo', 'Pino',
]

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

export default function AddToCartButton({ producto }: Props) {
  const { addItem } = useCart()
  const [modalAbierto, setModalAbierto] = useState(false)
  const [agregado, setAgregado] = useState(false)

  // Macetas
  const [colorMaceta, setColorMaceta] = useState('Blanco')
  const [colorExtraMaceta, setColorExtraMaceta] = useState('')       // seleccionado del dropdown
  const [colorPersonalizado, setColorPersonalizado] = useState('')   // solo si elige "Personalizado..."
  const [cantidadMaceta, setCantidadMaceta] = useState(1)

  // Revestimientos
  const [colorRevestimiento, setColorRevestimiento] = useState('')
  const [colorExtraRevestimiento, setColorExtraRevestimiento] = useState('')
  const [colorRevestimientoPersonalizado, setColorRevestimientoPersonalizado] = useState('')
  const [cantidadRevestimiento, setCantidadRevestimiento] = useState(1)

  // Muebles
  const [config, setConfig] = useState<ConfiguracionMueble>({
    alto: 0, profundidad: 0, ancho: 0,
    tipoMelamina: TIPOS_MELAMINA[0],
    colorMelamina: '',
  })
  const [notaMueble, setNotaMueble] = useState('')
  const [errorMueble, setErrorMueble] = useState('')

  // Mesas
  const [cantidadMesa, setCantidadMesa] = useState(1)

  const esMaceta = producto.categoria === 'macetas-fibra-vidrio'
  const esRevestimiento = producto.categoria === 'revestimientos-3d'
  const esMueble = producto.categoria === 'muebles-melamina'
  const esMesa = producto.categoria === 'mesas-piedra-sinterizada'

  function cerrar() {
    setModalAbierto(false)
    setErrorMueble('')
  }

  function mostrarAgregado() {
    setAgregado(true)
    cerrar()
    setTimeout(() => setAgregado(false), 2500)
  }

  function handleConfirmar() {
    if (esMaceta) {
      let colorFinal = colorMaceta
      if (colorMaceta === 'Otro color') {
        colorFinal = colorExtraMaceta === 'Personalizado...' ? colorPersonalizado.trim() : colorExtraMaceta
      }
      if (colorMaceta === 'Otro color' && !colorFinal) return
      const esEstandar = COLORES_ESTANDAR_MACETAS.includes(colorFinal.toLowerCase())
      addItem({
        id: uid(),
        productoId: producto.id,
        nombre: producto.nombre,
        slug: producto.slug,
        imagen: producto.imagenes[0] ?? '',
        categoria: producto.categoria,
        precio: calcularPrecioMaceta(producto.slug, colorFinal),
        precioBase: calcularPrecioMaceta(producto.slug, 'blanco'),
        cantidad: cantidadMaceta,
        color: colorFinal,
        colorEsEstandar: esEstandar,
      })
      mostrarAgregado()
    }

    if (esRevestimiento) {
      let colorFinal = colorRevestimiento
      if (colorRevestimiento === 'Otro color') {
        colorFinal = colorExtraRevestimiento === 'Personalizado...' ? colorRevestimientoPersonalizado.trim() : colorExtraRevestimiento
      }
      if (!colorFinal) return
      addItem({
        id: uid(),
        productoId: producto.id,
        nombre: producto.nombre,
        slug: producto.slug,
        imagen: producto.imagenes[0] ?? '',
        categoria: producto.categoria,
        precio: PRECIO_REVESTIMIENTO_3D,
        precioBase: PRECIO_REVESTIMIENTO_3D,
        cantidad: cantidadRevestimiento,
        color: colorFinal,
      })
      mostrarAgregado()
    }

    if (esMueble) {
      if (!config.alto || !config.profundidad || !config.ancho) {
        setErrorMueble('Ingresa todas las medidas.')
        return
      }
      if (!config.colorMelamina) {
        setErrorMueble('Selecciona un color de melamina.')
        return
      }
      addItem({
        id: uid(),
        productoId: producto.id,
        nombre: producto.nombre,
        slug: producto.slug,
        imagen: producto.imagenes[0] ?? '',
        categoria: producto.categoria,
        precio: 0,
        precioBase: 0,
        cantidad: 1,
        configuracion: config,
        notaEspecial: notaMueble || undefined,
      })
      mostrarAgregado()
    }

    if (esMesa) {
      addItem({
        id: uid(),
        productoId: producto.id,
        nombre: producto.nombre,
        slug: producto.slug,
        imagen: producto.imagenes[0] ?? '',
        categoria: producto.categoria,
        precio: 0,
        precioBase: 0,
        cantidad: cantidadMesa,
      })
      mostrarAgregado()
    }
  }

  // ── Estilos reutilizables ──
  const labelStyle: React.CSSProperties = {
    color: '#d1d5db', fontSize: '0.8rem', display: 'block', marginBottom: '6px',
  }
  const inputStyle: React.CSSProperties = {
    width: '100%', background: '#1a1a1a', border: '1px solid #444',
    borderRadius: '6px', padding: '9px 10px', color: 'white',
    fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box',
  }
  const counterBtn: React.CSSProperties = {
    width: 36, height: 36, borderRadius: 6, border: '1px solid #444',
    background: 'transparent', color: 'white', cursor: 'pointer', fontSize: '1.2rem',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  }

  return (
    <>
      {/* Botón principal */}
      <button
        onClick={() => setModalAbierto(true)}
        style={{
          padding: '14px 24px', borderRadius: '8px', border: 'none',
          background: agregado ? '#16a34a' : '#C5A059',
          color: 'black', cursor: 'pointer', fontSize: '1rem',
          fontWeight: '700', width: '100%', transition: 'background 0.3s',
        }}
      >
        {agregado ? '✓ Añadido al carrito' : 'Añadir al carrito'}
      </button>

      {/* Modal flotante */}
      {modalAbierto && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) cerrar() }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '16px',
          }}
        >
          <div style={{
            background: '#141414', borderRadius: '14px',
            border: '1px solid #2a2a2a',
            padding: '28px', width: '100%', maxWidth: '460px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
            display: 'flex', flexDirection: 'column', gap: '18px',
            maxHeight: '90vh', overflowY: 'auto',
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ color: 'white', fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>
                  {producto.nombre}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.8rem', margin: '4px 0 0' }}>
                  {esMueble ? 'Configura tu mueble' :
                   esMesa ? 'Añadir a cotización' :
                   'Selecciona las opciones'}
                </p>
              </div>
              <button onClick={cerrar} style={{
                background: 'none', border: 'none', color: '#6b7280',
                cursor: 'pointer', fontSize: '1.4rem', lineHeight: 1, padding: '0 0 0 12px',
              }}>×</button>
            </div>

            {/* ── MACETAS ── */}
            {esMaceta && (
              <>
                <div>
                  <label style={labelStyle}>Color</label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {COLORES_MACETA.map(c => (
                      <button key={c} onClick={() => setColorMaceta(c)} style={{
                        padding: '7px 14px', borderRadius: '20px', cursor: 'pointer',
                        fontSize: '0.8rem', fontWeight: '500',
                        border: colorMaceta === c ? '2px solid #C5A059' : '1px solid #444',
                        background: colorMaceta === c ? '#1f1f1f' : 'transparent',
                        color: colorMaceta === c ? '#C5A059' : '#9ca3af',
                        transition: 'all 0.2s',
                      }}>
                        {c}
                        {c === 'Otro color' && (
                          <span style={{ fontSize: '0.68rem', marginLeft: '4px', color: '#6b7280' }}>+5%</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                {colorMaceta === 'Otro color' && (
                  <div>
                    <label style={labelStyle}>Selecciona el color</label>
                    <select
                      value={colorExtraMaceta}
                      onChange={e => { setColorExtraMaceta(e.target.value); setColorPersonalizado('') }}
                      autoFocus
                      style={inputStyle}
                    >
                      <option value="">Elige un color...</option>
                      {COLORES_EXTRA_MACETA.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    {colorExtraMaceta === 'Personalizado...' && (
                      <input
                        type="text"
                        placeholder="Describe el color exacto..."
                        value={colorPersonalizado}
                        onChange={e => setColorPersonalizado(e.target.value)}
                        style={{ ...inputStyle, marginTop: '8px' }}
                        autoFocus
                      />
                    )}
                  </div>
                )}
                <div>
                  <label style={labelStyle}>Cantidad</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button onClick={() => setCantidadMaceta(q => Math.max(1, q - 1))} style={counterBtn}>−</button>
                    <span style={{ color: 'white', minWidth: 28, textAlign: 'center', fontSize: '1rem' }}>{cantidadMaceta}</span>
                    <button onClick={() => setCantidadMaceta(q => q + 1)} style={counterBtn}>+</button>
                  </div>
                </div>
              </>
            )}

            {/* ── REVESTIMIENTOS ── */}
            {esRevestimiento && (
              <>
                <div>
                  <label style={labelStyle}>Color del revestimiento</label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {COLORES_REVESTIMIENTO.map(c => (
                      <button key={c} onClick={() => setColorRevestimiento(c)} style={{
                        padding: '7px 14px', borderRadius: '20px', cursor: 'pointer',
                        fontSize: '0.8rem', fontWeight: '500',
                        border: colorRevestimiento === c ? '2px solid #C5A059' : '1px solid #444',
                        background: colorRevestimiento === c ? '#1f1f1f' : 'transparent',
                        color: colorRevestimiento === c ? '#C5A059' : '#9ca3af',
                        transition: 'all 0.2s',
                      }}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                {colorRevestimiento === 'Otro color' && (
                  <div>
                    <label style={labelStyle}>Selecciona el color</label>
                    <select
                      value={colorExtraRevestimiento}
                      onChange={e => { setColorExtraRevestimiento(e.target.value); setColorRevestimientoPersonalizado('') }}
                      autoFocus
                      style={inputStyle}
                    >
                      <option value="">Elige un color...</option>
                      {COLORES_EXTRA_REVESTIMIENTO.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    {colorExtraRevestimiento === 'Personalizado...' && (
                      <input
                        type="text"
                        placeholder="Describe el color exacto..."
                        value={colorRevestimientoPersonalizado}
                        onChange={e => setColorRevestimientoPersonalizado(e.target.value)}
                        style={{ ...inputStyle, marginTop: '8px' }}
                        autoFocus
                      />
                    )}
                  </div>
                )}
                <div>
                  <label style={labelStyle}>Cantidad de paneles</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button onClick={() => setCantidadRevestimiento(q => Math.max(1, q - 1))} style={counterBtn}>−</button>
                    <span style={{ color: 'white', minWidth: 28, textAlign: 'center', fontSize: '1rem' }}>{cantidadRevestimiento}</span>
                    <button onClick={() => setCantidadRevestimiento(q => q + 1)} style={counterBtn}>+</button>
                  </div>
                </div>
              </>
            )}

            {/* ── MUEBLES ── */}
            {esMueble && (
              <>
                <div>
                  <label style={labelStyle}>Medidas (en metros)</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                    {(['alto', 'profundidad', 'ancho'] as const).map(campo => (
                      <div key={campo}>
                        <label style={{ ...labelStyle, marginBottom: '4px' }}>
                          {campo.charAt(0).toUpperCase() + campo.slice(1)}
                        </label>
                        <input
                          type="number" min="0" step="0.01" placeholder="0.00"
                          value={config[campo] || ''}
                          onChange={e => {
                            setConfig(p => ({ ...p, [campo]: parseFloat(e.target.value) || 0 }))
                            setErrorMueble('')
                          }}
                          style={inputStyle}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Tipo de melamina</label>
                  <select value={config.tipoMelamina} onChange={e => setConfig(p => ({ ...p, tipoMelamina: e.target.value }))} style={inputStyle}>
                    {TIPOS_MELAMINA.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Color de melamina</label>
                  <select
                    value={config.colorMelamina}
                    onChange={e => { setConfig(p => ({ ...p, colorMelamina: e.target.value })); setErrorMueble('') }}
                    style={inputStyle}
                  >
                    <option value="">Selecciona un color...</option>
                    {COLORES_MELAMINA.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <p style={{ color: '#4b5563', fontSize: '0.72rem', marginTop: '5px' }}>
                    Próximamente podrás ver las texturas disponibles
                  </p>
                </div>
                <div>
                  <label style={labelStyle}>Observaciones (opcional)</label>
                  <textarea
                    placeholder="Ej: con cajones, puertas corredizas, sin manijas..."
                    value={notaMueble}
                    onChange={e => setNotaMueble(e.target.value)}
                    rows={2}
                    style={{ ...inputStyle, resize: 'none' }}
                  />
                </div>
                {errorMueble && (
                  <p style={{ color: '#f87171', fontSize: '0.8rem', margin: 0 }}>{errorMueble}</p>
                )}
              </>
            )}

            {/* ── MESAS ── */}
            {esMesa && (
              <>
                <p style={{ color: '#9ca3af', fontSize: '0.85rem', margin: 0 }}>
                  El precio se calcula según el tipo de piedra y base seleccionada. Recibirás la cotización por WhatsApp.
                </p>
                <div>
                  <label style={labelStyle}>Cantidad</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button onClick={() => setCantidadMesa(q => Math.max(1, q - 1))} style={counterBtn}>−</button>
                    <span style={{ color: 'white', minWidth: 28, textAlign: 'center', fontSize: '1rem' }}>{cantidadMesa}</span>
                    <button onClick={() => setCantidadMesa(q => q + 1)} style={counterBtn}>+</button>
                  </div>
                </div>
              </>
            )}

            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              <button onClick={cerrar} style={{
                flex: 1, padding: '11px', borderRadius: '8px',
                border: '1px solid #333', background: 'transparent',
                color: '#9ca3af', cursor: 'pointer', fontSize: '0.875rem',
              }}>
                Cancelar
              </button>
              <button
                onClick={handleConfirmar}
                disabled={
                  (esRevestimiento && !colorRevestimiento) ||
                  (esRevestimiento && colorRevestimiento === 'Otro color' && !colorExtraRevestimiento) ||
                  (esRevestimiento && colorRevestimiento === 'Otro color' && colorExtraRevestimiento === 'Personalizado...' && !colorRevestimientoPersonalizado.trim()) ||
                  (esMaceta && colorMaceta === 'Otro color' && !colorExtraMaceta) ||
                  (esMaceta && colorMaceta === 'Otro color' && colorExtraMaceta === 'Personalizado...' && !colorPersonalizado.trim())
                }
                style={{
                  flex: 2, padding: '11px', borderRadius: '8px', border: 'none',
                  background: (
                    (esRevestimiento && !colorRevestimiento) ||
                    (esRevestimiento && colorRevestimiento === 'Otro color' && !colorExtraRevestimiento) ||
                    (esRevestimiento && colorRevestimiento === 'Otro color' && colorExtraRevestimiento === 'Personalizado...' && !colorRevestimientoPersonalizado.trim()) ||
                    (esMaceta && colorMaceta === 'Otro color' && !colorExtraMaceta) ||
                    (esMaceta && colorMaceta === 'Otro color' && colorExtraMaceta === 'Personalizado...' && !colorPersonalizado.trim())
                  ) ? '#555' : '#C5A059',
                  color: 'black',
                  cursor: (
                    (esRevestimiento && !colorRevestimiento) ||
                    (esRevestimiento && colorRevestimiento === 'Otro color' && !colorExtraRevestimiento) ||
                    (esRevestimiento && colorRevestimiento === 'Otro color' && colorExtraRevestimiento === 'Personalizado...' && !colorRevestimientoPersonalizado.trim()) ||
                    (esMaceta && colorMaceta === 'Otro color' && !colorExtraMaceta) ||
                    (esMaceta && colorMaceta === 'Otro color' && colorExtraMaceta === 'Personalizado...' && !colorPersonalizado.trim())
                  ) ? 'not-allowed' : 'pointer',
                  fontSize: '0.875rem', fontWeight: '700',
                }}
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
