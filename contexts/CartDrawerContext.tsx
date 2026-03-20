'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface CartDrawerContextType {
  drawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
}

const CartDrawerContext = createContext<CartDrawerContextType | null>(null)

export function CartDrawerProvider({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  return (
    <CartDrawerContext.Provider value={{
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
    }}>
      {children}
    </CartDrawerContext.Provider>
  )
}

export function useCartDrawer() {
  const ctx = useContext(CartDrawerContext)
  if (!ctx) throw new Error('useCartDrawer debe usarse dentro de CartDrawerProvider')
  return ctx
}
