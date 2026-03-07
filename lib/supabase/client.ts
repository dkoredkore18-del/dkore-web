import { createBrowserClient } from '@supabase/ssr'

/**
 * Cliente de Supabase para uso en el navegador (componentes client-side)
 * 
 * Uso:
 * import { supabase } from '@/lib/supabase/client'
 * 
 * const { data, error } = await supabase
 *   .from('productos')
 *   .select('*')
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Exportar instancia por defecto
export const supabase = createClient()
