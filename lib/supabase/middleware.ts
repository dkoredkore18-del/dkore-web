import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Middleware de Supabase para manejar autenticación
 * 
 * Este middleware:
 * 1. Refresca la sesión del usuario si es necesario
 * 2. Protege rutas de admin
 * 3. Maneja cookies de autenticación
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // Refrescar sesión si es necesario
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Proteger rutas de admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!user) {
      // Redirigir a login si no está autenticado
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }

    // Verificar si es admin activo
    const { data: adminUser } = await supabase
      .from('usuarios_admin')
      .select('activo')
      .eq('id', user.id)
      .single()

    if (!adminUser || !adminUser.activo) {
      // Redirigir a home si no es admin o está inactivo
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }

  // Si está en login y ya está autenticado, redirigir a dashboard
  if (request.nextUrl.pathname === '/admin/login' && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
