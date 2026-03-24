// Generador de cotizaciones PDF para D'kore
// Paleta oficial: Negro #000 / #0a0a0a, Dorado #C5A059, Grises #1a1a1a / #1f1f1f / #2a2a2a
import { CartItem, ClienteData } from '@/types'

export const ENVIO_GRATIS_DESDE = 150
export const WHATSAPP_DKORE = '5930999215891'
export const VALIDEZ_DIAS = 15

// Logo real: 355 × 475 px → ratio portrait 0.7474
const LOGO_RATIO = 355 / 475
const LOGO_H = 34          // altura en mm
const LOGO_W = LOGO_H * LOGO_RATIO  // ≈ 25.4 mm — sin distorsión

function generarNumeroCotizacion(): string {
  const f = new Date()
  const y = f.getFullYear().toString().slice(-2)
  const m = String(f.getMonth() + 1).padStart(2, '0')
  const d = String(f.getDate()).padStart(2, '0')

  const KEY = 'dkore_cotizacion_seq'
  const actual = parseInt(localStorage.getItem(KEY) || '999', 10)
  const siguiente = actual + 1
  localStorage.setItem(KEY, String(siguiente))

  return `DK-${y}${m}${d}-${siguiente}`
}

function fechaFormato(date: Date): string {
  return date.toLocaleDateString('es-EC', { day: '2-digit', month: 'long', year: 'numeric' })
}

function descripcionItem(item: CartItem): string {
  const p: string[] = []
  if (item.color) p.push(`Color: ${item.color}`)
  if (item.configuracion) {
    const c = item.configuracion
    p.push(`${c.alto}m × ${c.profundidad}m × ${c.ancho}m`)
    p.push(`${c.tipoMelamina} · ${c.colorMelamina}`)
  }
  if (item.notaEspecial) p.push(item.notaEspecial)
  return p.join('  ·  ') || '—'
}

export interface PDFResult {
  blob: Blob
  numeroCotizacion: string
  fechaEmision: string
  fechaValidez: string
  subtotal: number
  total: number
}

export async function generarCotizacionPDF(
  cliente: ClienteData,
  items: CartItem[]
): Promise<PDFResult> {
  const { default: jsPDF } = await import('jspdf')
  const { default: autoTable } = await import('jspdf-autotable')

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const numeroCotizacion = generarNumeroCotizacion()
  const hoy = new Date()
  const validezDate = new Date(hoy)
  validezDate.setDate(validezDate.getDate() + VALIDEZ_DIAS)
  const emision = fechaFormato(hoy)
  const validez = fechaFormato(validezDate)

  const W = doc.internal.pageSize.getWidth()
  const H = doc.internal.pageSize.getHeight()

  // ── Paleta (colores oficiales D'kore) ───────────────────
  // Negros / fondos
  const C_NEGRO:    [number,number,number] = [8, 8, 8]       // #080808 ≈ #000
  const C_NEGRO3:   [number,number,number] = [31, 31, 31]    // #1f1f1f — bordes
  // Dorado
  const C_DORADO:   [number,number,number] = [197, 160, 89]  // #C5A059 — color principal
  const C_DORADO_L: [number,number,number] = [220, 190, 120] // versión clara para acentos
  // Blancos / grises claros (para texto sobre negro)
  const C_BLANCO:   [number,number,number] = [255, 255, 255]
  const C_GRIS_L:   [number,number,number] = [245, 244, 241] // fondo secciones claras
  const C_GRIS_M:   [number,number,number] = [156, 163, 175] // #9ca3af — texto secundario web
  const C_GRIS_D:   [number,number,number] = [75, 85, 99]    // #4b5563 — texto terciario web
  const C_TEXTO:    [number,number,number] = [40, 38, 35]    // texto oscuro sobre fondo claro

  // ════════════════════════════════════════════════════════
  // HEADER — negro con acento dorado
  // ════════════════════════════════════════════════════════
  const HEADER_H = 54

  doc.setFillColor(...C_NEGRO)
  doc.rect(0, 0, W, HEADER_H, 'F')

  // Franja dorada izquierda (acento)
  doc.setFillColor(...C_DORADO)
  doc.rect(0, 0, 4, HEADER_H, 'F')

  // Línea dorada inferior
  doc.setFillColor(...C_DORADO)
  doc.rect(0, HEADER_H, W, 0.7, 'F')

  // ── Logo (proporciones correctas 355×475) ──
  try {
    const imgBlob = await fetch('/logo.png').then(r => r.blob())
    const dataUrl = await new Promise<string>((resolve) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.readAsDataURL(imgBlob)
    })
    const logoX = 10
    const logoY = (HEADER_H - LOGO_H) / 2
    doc.addImage(dataUrl, 'PNG', logoX, logoY, LOGO_W, LOGO_H)
  } catch {
    doc.setTextColor(...C_DORADO)
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.text("D'KORE", 12, 30)
  }

  // Separador vertical fino entre logo y texto
  doc.setFillColor(...C_NEGRO3)
  doc.rect(10 + LOGO_W + 5, 12, 0.3, HEADER_H - 24, 'F')

  // Tagline
  doc.setTextColor(...C_GRIS_M)
  doc.setFontSize(6.5)
  doc.setFont('helvetica', 'italic')
  doc.text('Diseno & Personalidad', 10, HEADER_H - 5)

  // Título COTIZACIÓN
  doc.setTextColor(...C_DORADO)
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text('COTIZACIÓN', W - 10, 22, { align: 'right' })

  // Datos del documento
  doc.setFontSize(7.5)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...C_GRIS_M)
  doc.text(`N° ${numeroCotizacion}`, W - 10, 31, { align: 'right' })
  doc.text(`Emision: ${emision}`, W - 10, 38, { align: 'right' })
  doc.text(`Valida hasta: ${validez}`, W - 10, 45, { align: 'right' })

  // ════════════════════════════════════════════════════════
  // DATOS DEL CLIENTE
  // ════════════════════════════════════════════════════════
  let y = HEADER_H + 12

  // Título sección con acento dorado
  doc.setFillColor(...C_DORADO)
  doc.rect(10, y, 3, 7, 'F')
  doc.setTextColor(...C_TEXTO)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('DATOS DEL CLIENTE', 16, y + 5)

  y += 11

  // Tarjeta cliente
  doc.setFillColor(...C_GRIS_L)
  doc.roundedRect(10, y, W - 20, 30, 2, 2, 'F')
  doc.setDrawColor(...C_NEGRO3)
  doc.setLineWidth(0.2)
  doc.roundedRect(10, y, W - 20, 30, 2, 2, 'S')

  const campo = (label: string, valor: string, cx: number, cy: number) => {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(6.5)
    doc.setTextColor(...C_GRIS_D)
    doc.text(label, cx, cy)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(...C_TEXTO)
    const lines = doc.splitTextToSize(valor || '—', 80)
    doc.text(lines[0], cx, cy + 5)
  }

  const c1 = 16, c2 = W / 2 + 4
  campo('NOMBRES Y APELLIDOS', `${cliente.nombres} ${cliente.apellidos}`, c1, y + 7)
  campo('CEDULA', cliente.cedula, c2, y + 7)
  campo('TELEFONO', cliente.telefono, c1, y + 20)
  campo('DIRECCION', cliente.direccion, c2, y + 20)

  y += 38

  // ════════════════════════════════════════════════════════
  // TABLA DE PRODUCTOS
  // ════════════════════════════════════════════════════════
  doc.setFillColor(...C_DORADO)
  doc.rect(10, y, 3, 7, 'F')
  doc.setTextColor(...C_TEXTO)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('DETALLE DE PRODUCTOS', 16, y + 5)

  y += 10

  const rows = items.map((item, i) => {
    const pu = item.precio > 0
      ? `$${item.precio.toFixed(2)}${item.categoria === 'muebles-melamina' ? '/ml' : ''}`
      : 'A cotizar'
    const st = item.precio > 0 ? `$${(item.precio * item.cantidad).toFixed(2)}` : 'A cotizar'
    return [String(i + 1), item.nombre, descripcionItem(item), String(item.cantidad), pu, st]
  })

  autoTable(doc, {
    startY: y,
    head: [['#', 'Producto', 'Descripción', 'Cant.', 'P. Unit.', 'Subtotal']],
    body: rows,
    theme: 'plain',
    styles: {
      fontSize: 7.5,
      cellPadding: { top: 4, bottom: 4, left: 3, right: 3 },
      textColor: C_TEXTO,
      lineColor: [220, 218, 214],
      lineWidth: 0.25,
    },
    headStyles: {
      fillColor: C_NEGRO,
      textColor: C_BLANCO,
      fontStyle: 'bold',
      fontSize: 7,
      cellPadding: { top: 5, bottom: 5, left: 3, right: 3 },
    },
    columnStyles: {
      0: { cellWidth: 8, halign: 'center', fontStyle: 'bold' },
      1: { cellWidth: 42, fontStyle: 'bold' },
      2: { cellWidth: 66, textColor: C_GRIS_D, fontSize: 7 },
      3: { cellWidth: 12, halign: 'center' },
      4: { cellWidth: 24, halign: 'right' },
      5: { cellWidth: 24, halign: 'right', fontStyle: 'bold' },
    },
    alternateRowStyles: { fillColor: [250, 249, 246] },
    margin: { left: 10, right: 10 },
  })

  // ════════════════════════════════════════════════════════
  // TOTALES
  // ════════════════════════════════════════════════════════
  const subtotal = items.reduce((s, i) => s + i.precio * i.cantidad, 0)
  const total = subtotal
  const envioGratis = total >= ENVIO_GRATIS_DESDE

  const endY = (doc as any).lastAutoTable.finalY
  let ty = endY + 6

  // Caja totales
  const boxW = 72, boxX = W - 10 - boxW
  doc.setFillColor(...C_GRIS_L)
  doc.roundedRect(boxX, ty, boxW, 30, 2, 2, 'F')
  doc.setDrawColor(...C_NEGRO3)
  doc.setLineWidth(0.2)
  doc.roundedRect(boxX, ty, boxW, 30, 2, 2, 'S')

  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...C_GRIS_D)
  doc.text('Subtotal:', boxX + 5, ty + 8)
  doc.setTextColor(...C_TEXTO)
  doc.text(`$${subtotal.toFixed(2)}`, W - 14, ty + 8, { align: 'right' })

  doc.setTextColor(...C_GRIS_D)
  doc.text('Envio:', boxX + 5, ty + 16)
  if (envioGratis) {
    doc.setTextColor(34, 197, 94)  // verde
    doc.text('Gratis', W - 14, ty + 16, { align: 'right' })
  } else {
    doc.setTextColor(...C_GRIS_M)
    doc.text('A coordinar', W - 14, ty + 16, { align: 'right' })
  }

  // Línea dorada divisora
  doc.setDrawColor(...C_DORADO)
  doc.setLineWidth(0.5)
  doc.line(boxX + 5, ty + 20, W - 14, ty + 20)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C_DORADO)
  doc.text('TOTAL', boxX + 5, ty + 27)
  doc.setTextColor(...C_NEGRO)
  doc.text(`$${total.toFixed(2)}`, W - 14, ty + 27, { align: 'right' })

  // ════════════════════════════════════════════════════════
  // NOTA ENVÍO
  // ════════════════════════════════════════════════════════
  ty += 38
  doc.setFillColor(envioGratis ? 240 : 250, envioGratis ? 248 : 247, envioGratis ? 228 : 240)
  doc.roundedRect(10, ty, W - 20, 15, 2, 2, 'F')
  doc.setFillColor(...C_DORADO)
  doc.roundedRect(10, ty, 3, 15, 1, 1, 'F')
  doc.setDrawColor(...C_DORADO_L)
  doc.setLineWidth(0.25)
  doc.roundedRect(10, ty, W - 20, 15, 2, 2, 'S')

  doc.setFontSize(7.5)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C_DORADO)
  doc.text(envioGratis ? 'Envio gratuito incluido en tu pedido' : 'Informacion de envio', 17, ty + 6)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...C_GRIS_D)
  const notaTxt = envioGratis
    ? `Tu pedido califica para envio gratuito dentro de la ciudad de Cuenca.`
    : `Costo de envio a coordinar. Pedidos desde $${ENVIO_GRATIS_DESDE.toFixed(2)} USD incluyen envio gratuito en Cuenca.`
  doc.text(notaTxt, 17, ty + 12, { maxWidth: W - 32 })

  // ════════════════════════════════════════════════════════
  // FOOTER
  // ════════════════════════════════════════════════════════
  doc.setFillColor(...C_NEGRO)
  doc.rect(0, H - 16, W, 16, 'F')
  doc.setFillColor(...C_DORADO)
  doc.rect(0, H - 16, W, 0.5, 'F')

  doc.setFontSize(7.5)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...C_DORADO)
  doc.text("D'KORE", W / 2, H - 9, { align: 'center' })
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...C_GRIS_M)
  doc.text('Diseno & Personalidad  ·  www.dkore.com.ec  ·  Cuenca, Ecuador', W / 2, H - 4, { align: 'center' })

  const blob = doc.output('blob')
  return { blob, numeroCotizacion, fechaEmision: emision, fechaValidez: validez, subtotal, total }
}
