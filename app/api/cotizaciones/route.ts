import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'dkore.dkore.18@gmail.com'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { numeroCotizacion, fechaEmision, fechaValidez, cliente, items, subtotal, total } = body

    // 1. Guardar en Supabase
    try {
      const supabase = createAdminClient()
      const { error: dbError } = await supabase.from('cotizaciones').insert({
        numero_cotizacion: numeroCotizacion,
        fecha_emision: fechaEmision,
        fecha_validez: fechaValidez,
        cliente_nombres: cliente.nombres,
        cliente_apellidos: cliente.apellidos,
        cliente_cedula: cliente.cedula,
        cliente_telefono: cliente.telefono,
        cliente_direccion: cliente.direccion,
        items,
        subtotal,
        total,
      })
      if (dbError) console.error('[Supabase error]', dbError.message)
      else console.log('[Supabase] cotizacion guardada:', numeroCotizacion)
    } catch (dbErr) {
      console.error('[Supabase exception]', dbErr)
    }

    // 2. Enviar email (independiente del guardado)
    try {
      const itemsHtml = (items || []).map((item: any) => `
        <tr>
          <td style="padding:6px 10px;border-bottom:1px solid #eee">${item.nombre}</td>
          <td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:center">${item.cantidad}</td>
          <td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:right">${item.precio > 0 ? `$${(item.precio * item.cantidad).toFixed(2)}` : 'A cotizar'}</td>
        </tr>
      `).join('')

      const waLink = `https://wa.me/593${(cliente.telefono || '').replace(/^0/, '')}?text=${encodeURIComponent(`Hola ${cliente.nombres}, soy D'kore. Te contactamos por tu cotizacion ${numeroCotizacion}.`)}`

      const { error: emailError } = await resend.emails.send({
        from: "D'kore Cotizaciones <onboarding@resend.dev>",
        to: ADMIN_EMAIL,
        subject: `Nueva cotizacion ${numeroCotizacion} - ${cliente.nombres} ${cliente.apellidos}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:20px">
            <div style="background:#080808;padding:20px;border-radius:8px 8px 0 0;border-left:4px solid #C5A059">
              <h1 style="color:#C5A059;margin:0;font-size:22px">D'KORE</h1>
              <p style="color:#9ca3af;margin:4px 0 0;font-size:13px">Nueva cotizacion generada</p>
            </div>
            <div style="background:white;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb">
              <h2 style="color:#111;font-size:16px;margin:0 0 16px">Cotizacion ${numeroCotizacion}</h2>
              <p style="color:#6b7280;font-size:13px;margin:0 0 4px">Emision: ${fechaEmision} | Valida hasta: ${fechaValidez}</p>
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0">
              <h3 style="color:#111;font-size:14px;margin:0 0 10px">Datos del cliente</h3>
              <table style="width:100%;font-size:13px;color:#374151">
                <tr><td style="padding:3px 0;color:#9ca3af;width:130px">Nombre:</td><td><strong>${cliente.nombres} ${cliente.apellidos}</strong></td></tr>
                <tr><td style="padding:3px 0;color:#9ca3af">Cedula:</td><td>${cliente.cedula}</td></tr>
                <tr><td style="padding:3px 0;color:#9ca3af">Telefono:</td><td>${cliente.telefono}</td></tr>
                <tr><td style="padding:3px 0;color:#9ca3af">Direccion:</td><td>${cliente.direccion}</td></tr>
              </table>
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0">
              <h3 style="color:#111;font-size:14px;margin:0 0 10px">Productos solicitados</h3>
              <table style="width:100%;border-collapse:collapse;font-size:13px">
                <thead>
                  <tr style="background:#f3f4f6">
                    <th style="padding:8px 10px;text-align:left;color:#6b7280">Producto</th>
                    <th style="padding:8px 10px;text-align:center;color:#6b7280">Cant.</th>
                    <th style="padding:8px 10px;text-align:right;color:#6b7280">Subtotal</th>
                  </tr>
                </thead>
                <tbody>${itemsHtml}</tbody>
              </table>
              <div style="margin-top:16px;text-align:right">
                <p style="font-size:18px;font-weight:bold;color:#C5A059;margin:0">Total: $${Number(total).toFixed(2)}</p>
              </div>
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0">
              <a href="${waLink}" style="display:inline-block;background:#25D366;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:13px">
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        `,
      })

      if (emailError) console.error('[Resend error]', emailError)
      else console.log('[Resend] email enviado a:', ADMIN_EMAIL)
    } catch (emailErr) {
      console.error('[Resend exception]', emailErr)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[API cotizaciones error]', err)
    return NextResponse.json({ ok: false, error: 'Error interno' }, { status: 500 })
  }
}
