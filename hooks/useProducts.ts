"use client"

import { useState, useEffect } from 'react'
import { productos as productosData } from '@/data/productos'
import type { Producto } from '@/types'

/**
 * Hook para obtener todos los productos
 */
export function useProducts() {
  const [products, setProducts] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      setProducts(productosData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar productos')
    } finally {
      setLoading(false)
    }
  }, [])

  return { products, loading, error }
}

/**
 * Hook para obtener productos por categoría
 */
export function useProductsByCategory(categoria: string) {
  const [products, setProducts] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const filtered = productosData.filter(p => p.categoria === categoria)
      setProducts(filtered)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar productos')
    } finally {
      setLoading(false)
    }
  }, [categoria])

  return { products, loading, error }
}

/**
 * Hook para obtener un producto por slug
 */
export function useProductBySlug(slug: string) {
  const [product, setProduct] = useState<Producto | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const found = productosData.find(p => p.slug === slug)
      setProduct(found || null)
      if (!found) {
        setError('Producto no encontrado')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar producto')
    } finally {
      setLoading(false)
    }
  }, [slug])

  return { product, loading, error }
}

/**
 * Hook para obtener productos destacados
 */
export function useFeaturedProducts(limit: number = 6) {
  const [products, setProducts] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const featured = productosData
        .filter(p => p.destacado === true)
        .slice(0, limit)
      setProducts(featured)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar productos destacados')
    } finally {
      setLoading(false)
    }
  }, [limit])

  return { products, loading, error }
}

/**
 * Hook para buscar productos
 */
export function useSearchProducts(searchTerm: string) {
  const [products, setProducts] = useState<Producto[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!searchTerm || searchTerm.length < 2) {
      setProducts([])
      return
    }

    try {
      setLoading(true)
      const term = searchTerm.toLowerCase()
      const results = productosData.filter(p =>
        p.nombre.toLowerCase().includes(term) ||
        p.descripcion.toLowerCase().includes(term) ||
        p.categoria.toLowerCase().includes(term)
      )
      setProducts(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al buscar productos')
    } finally {
      setLoading(false)
    }
  }, [searchTerm])

  return { products, loading, error }
}
