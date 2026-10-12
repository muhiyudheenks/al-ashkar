import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Supabase client.
 *
 * Created only when both env vars are present. When they are missing the app
 * stays fully usable: the order form falls back to WhatsApp instead of
 * throwing at import time.
 */

const url = (import.meta.env.VITE_SUPABASE_URL ?? '').trim()
const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? '').trim()

export const isSupabaseConfigured = url.length > 0 && anonKey.length > 0

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url, anonKey)
  : null

/** Table that receives thobe order requests. */
export const ORDERS_TABLE =
  (import.meta.env.VITE_SUPABASE_ORDERS_TABLE ?? '').trim() || 'thobe_orders'

export type ThobeOrderPayload = {
  full_name: string
  phone: string
  email: string | null
  city: string | null
  service: string
  collar_style: string | null
  fabric: string | null
  quantity: number
  needed_by: string | null
  measurements: Record<string, number> | null
  notes: string | null
  whatsapp_consent: boolean
  language: string
}

export type SubmitResult =
  | { status: 'ok' }
  | { status: 'not-configured' }
  | { status: 'error'; message: string }

export async function submitThobeOrder(payload: ThobeOrderPayload): Promise<SubmitResult> {
  if (!supabase) return { status: 'not-configured' }

  const { error } = await supabase.from(ORDERS_TABLE).insert(payload)

  if (error) {
    return { status: 'error', message: error.message }
  }
  return { status: 'ok' }
}
