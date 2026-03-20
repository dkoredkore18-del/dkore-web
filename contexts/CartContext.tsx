'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { CartItem } from '@/types'

interface CartContextType {
  items: CartItem[]
  totalItems: number
  subtotal: number
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    try {
      const saved = localStorage.getItem('dkore-cart')
      if (saved) setItems(JSON.parse(saved))
    } catch {}
  }, [])

  // Persistir en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('dkore-cart', JSON.stringify(items))
  }, [items])

  const totalItems = items.reduce((sum, item) => sum + item.cantidad, 0)

  const subtotal = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0)

  function addItem(newItem: CartItem) {
    setItems(prev => {
      // Si ya existe el mismo producto con mismo color/config, aumenta cantidad
      const existing = prev.find(
        i => i.productoId === newItem.productoId && i.color === newItem.color
      )
      if (existing) {
        return prev.map(i =>
          i.id === existing.id ? { ...i, cantidad: i.cantidad + newItem.cantidad } : i
        )
      }
      return [...prev, newItem]
    })
  }

  function removeItem(id: string) {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  function updateQuantity(id: string, quantity: number) {
    if (quantity <= 0) return removeItem(id)
    setItems(prev => prev.map(i => i.id === id ? { ...i, cantidad: quantity } : i))
  }

  function clearCart() {
    setItems([])
  }

  return (
    <CartContext.Provider value={{ items, totalItems, subtotal, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider')
  return ctx
}
