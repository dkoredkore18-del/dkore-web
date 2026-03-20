import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = join(__dirname, '../components/cart/CartDrawer.tsx')

const content = `'use client'
import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, totalItems, removeItem, updateQuantity } = useCart()
  const badge: React.CSSProperties = {
    background: '#C5A059', color: 'black', borderRadius: '20px',
    padding: '2px 10px', fontSize: '0.75rem', fontWeight: '700',
  }
  const qtyBtn: React.CSSProperties = {
    width: 28, height: 28, borderRadius: '6px', border: '1px solid #333',
    background: 'transparent', color: 'white', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  }
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 99998, background: 'rgba(0,0,0,0.6)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />
      <div
        style={{
          position: 'fixed', top: 0, right: 0, zIndex: 99999,
          width: '100%', maxWidth: '400px', height: '100%',
          background: '#000', borderLeft: '1px solid #1f1f1f',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px', borderBottom: '1px solid #1f1f1f',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: 'white', fontSize: '1.1rem', fontWeight: '700' }}>
              Carrito
            </span>
            {totalItems > 0 && (
              <span style={badge}>
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', color: '#6b7280',
              cursor: 'pointer', fontSize: '1.5rem', lineHeight: 1,
            }}
          >
            &times;
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          {items.length === 0 ? (
            <div
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', height: '100%', gap: '16px', color: '#4b5563',
              }}
            >
              <p style={{ fontSize: '0.95rem' }}>Tu carrito está vacío</p>
              <button
                onClick={onClose}
                style={{
                  padding: '10px 20px', borderRadius: '8px',
                  border: '1px solid #333', background: 'transparent',
                  color: '#9ca3af', cursor: 'pointer',
                }}
              >
                Ver catálogo
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {items.map(item => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex', gap: '14px', alignItems: 'flex-start',
                    padding: '14px', borderRadius: '10px',
                    background: '#1a1a1a', border: '1px solid #222',
                  }}
                >
                  <div
                    style={{
                      width: '72px', height: '72px', flexShrink: 0,
                      borderRadius: '8px', overflow: 'hidden', background: '#111',
                    }}
                  >
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        color: 'white', fontSize: '0.875rem', fontWeight: '600',
                        margin: '0 0 4px', overflow: 'hidden',
                        textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}
                    >
                      {item.nombre}
                    </p>
                    {item.color && (
                      <p style={{ color: '#9ca3af', fontSize: '0.75rem', margin: '0 0 2px' }}>
                        Color: {item.color}
                      </p>
                    )}
                    {item.configuracion && (
                      <p style={{ color: '#9ca3af', fontSize: '0.72rem', margin: '0 0 2px' }}>
                        {item.configuracion.alto}m &times; {item.configuracion.profundidad}m &times; {item.configuracion.ancho}m
                      </p>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                        style={qtyBtn}
                      >
                        &minus;
                      </button>
                      <span style={{ color: 'white', minWidth: '20px', textAlign: 'center' }}>
                        {item.cantidad}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                        style={qtyBtn}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{
                      background: 'none', border: 'none', color: '#4b5563',
                      cursor: 'pointer', fontSize: '1.1rem', flexShrink: 0,
                    }}
                    title="Eliminar"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div
            style={{
              padding: '20px 24px', borderTop: '1px solid #1f1f1f',
              display: 'flex', flexDirection: 'column', gap: '10px',
            }}
          >
            <Link href="/carrito" onClick={onClose}>
              <button
                style={{
                  width: '100%', padding: '14px', borderRadius: '8px',
                  border: 'none', background: '#C5A059', color: 'black',
                  cursor: 'pointer', fontSize: '1rem', fontWeight: '700',
                }}
              >
                Solicitar cotización
              </button>
            </Link>
            <button
              onClick={onClose}
              style={{
                width: '100%', padding: '11px', borderRadius: '8px',
                border: '1px solid #333', background: 'transparent',
                color: '#9ca3af', cursor: 'pointer', fontSize: '0.875rem',
              }}
            >
              Seguir viendo productos
            </button>
          </div>
        )}
      </div>
    </>
  )
}
`

writeFileSync(out, content, 'utf8')
console.log('Written:', out)
