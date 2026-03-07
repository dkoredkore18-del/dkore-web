import { createAdminClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

/**
 * API Route para subir imágenes de productos a Supabase Storage
 * 
 * Uso:
 * POST /api/upload-images
 * Body: { productFolder: "maceta-lunaris-mini" }
 */

export async function POST(request: NextRequest) {
  try {
    const { productFolder } = await request.json()

    if (!productFolder) {
      return NextResponse.json(
        { error: 'productFolder es requerido' },
        { status: 400 }
      )
    }

    // Ruta local de las imágenes
    const imagesPath = path.join(
      process.cwd(),
      '..',
      'dkore-web',
      'imagenes usadas',
      productFolder
    )

    // Verificar que la carpeta existe
    if (!fs.existsSync(imagesPath)) {
      return NextResponse.json(
        { error: `Carpeta no encontrada: ${imagesPath}` },
        { status: 404 }
      )
    }

    // Leer archivos de la carpeta
    const files = fs.readdirSync(imagesPath).filter(file => {
      const ext = path.extname(file).toLowerCase()
      return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext)
    })

    if (files.length === 0) {
      return NextResponse.json(
        { error: 'No se encontraron imágenes en la carpeta' },
        { status: 404 }
      )
    }

    // Crear cliente de Supabase
    const supabase = createAdminClient()
    const uploadedFiles: string[] = []

    // Subir cada imagen
    for (const file of files) {
      const filePath = path.join(imagesPath, file)
      const fileBuffer = fs.readFileSync(filePath)
      const fileName = `${productFolder}/${file}`

      const { data, error } = await supabase.storage
        .from('productos-imagenes')
        .upload(fileName, fileBuffer, {
          upsert: true,
          contentType: `image/${path.extname(file).slice(1)}`,
        })

      if (error) {
        console.error(`Error subiendo ${file}:`, error)
        continue
      }

      uploadedFiles.push(fileName)
    }

    // Obtener URLs públicas
    const publicUrls = uploadedFiles.map(fileName => {
      const { data } = supabase.storage
        .from('productos-imagenes')
        .getPublicUrl(fileName)
      return data.publicUrl
    })

    return NextResponse.json({
      success: true,
      productFolder,
      uploadedCount: uploadedFiles.length,
      totalFiles: files.length,
      urls: publicUrls,
    })
  } catch (error) {
    console.error('Error en upload-images:', error)
    return NextResponse.json(
      { error: 'Error al subir imágenes' },
      { status: 500 }
    )
  }
}
