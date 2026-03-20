'use client'

import { useCart } from '@/contexts/CartContext'
import { useCartDrawer } from '@/contexts/CartDrawerContext'

export default function CartButton() {
  const { totalItems } = useCart()
  const { openDrawer } = useCartDrawer()

  return (
    <button
      onClick={openDrawer}
      aria-label="Ver carrito"
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        position: 'relative', display: 'inline-flex',
        alignItems: 'center', padding: '0.5rem',
      }}
    >
      <svg
        width="24" height="24" viewBox="0 0 24 24"
        fill="none" stroke="white" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round"
      >
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
      {totalItems > 0 && (
        <span style={{
          position: 'absolute', top: '0px', right: '0px',
          background: '#C5A059', color: 'black',
          borderRadius: '50%', width: '18px', height: '18px',
          fontSize: '11px', fontWeight: '700',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          lineHeight: 1,
        }}>
          {totalItems > 9 ? '9+' : totalItems}
        </span>
      )}
    </button>
  )
}

