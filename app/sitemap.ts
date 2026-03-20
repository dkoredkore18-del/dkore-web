import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.dkore.com.ec'
  const now = new Date()

  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/catalogo`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/catalogo/macetas`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/catalogo/revestimientos`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/catalogo/muebles-melamina`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/catalogo/mesas`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contacto`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/nuestro-equipo`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/carrito`, lastModified: now, changeFrequency: 'never', priority: 0.3 },
  ]
}
