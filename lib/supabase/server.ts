import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Cliente de Supabase para uso en el servidor (Server Components, API Routes)
 * 
 * Uso en Server Component:
 * import { createClient } from '@/lib/supabase/server'
 * 
 * const supabase = await createClient()
 * const { data } = await supabase.from('productos').select('*')
 * 
 * Uso en API Route:
 * import { createClient } from '@/lib/supabase/server'
 * 
 * const supabase = await createClient()
 * const { data } = await supabase.from('productos').insert({ ... })
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // El método `setAll` fue llamado desde un Server Component.
            // Esto puede ser ignorado si tienes middleware refrescando
            // las cookies del usuario.
          }
        },
      },
    }
  )
}

/**
 * Cliente de Supabase con service role key para operaciones administrativas
 * ⚠️ SOLO usar en API Routes del servidor, NUNCA en el cliente
 */
export function createAdminClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return []
        },
        setAll() {},
      },
    }
  )
}
