/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WHATSAPP_NUMBER?: string
  readonly VITE_PHONE?: string
  readonly VITE_EMAIL?: string
  readonly VITE_ADDRESS?: string
  readonly VITE_HOURS?: string
  readonly VITE_MAPS_URL?: string
  readonly VITE_INSTAGRAM_URL?: string
  readonly VITE_X_URL?: string
  readonly VITE_SNAPCHAT_URL?: string
  readonly VITE_TIKTOK_URL?: string
  readonly VITE_SUPABASE_URL?: string
  readonly VITE_SUPABASE_ANON_KEY?: string
  readonly VITE_SUPABASE_ORDERS_TABLE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
