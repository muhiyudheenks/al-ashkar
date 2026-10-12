/**
 * Site configuration.
 *
 * Every real-world business detail (phone, WhatsApp, address, hours, socials)
 * is read from environment variables and left EMPTY by default — none of it is
 * invented here. Fill in `.env.local` with Al Ashkar's real details and the UI
 * will display them automatically; anything left blank is hidden or shown as
 * "details to be added" rather than faked.
 */

const env = import.meta.env

/** Trim and treat blank/placeholder strings as "not configured". */
function cfg(value: unknown): string {
  const s = typeof value === 'string' ? value.trim() : ''
  return s.length > 0 ? s : ''
}

export const BRAND_NAME = 'Al Ashkar'

export const site = {
  name: BRAND_NAME,

  /** Digits only, including country code, e.g. "9665XXXXXXXX". */
  whatsapp: cfg(env.VITE_WHATSAPP_NUMBER),
  phone: cfg(env.VITE_PHONE),
  email: cfg(env.VITE_EMAIL),
  /** Free-text address — write it exactly as the shop gives it. */
  address: cfg(env.VITE_ADDRESS),
  /** Free-text opening hours. */
  hours: cfg(env.VITE_HOURS),
  /** Optional Google Maps place/share link. */
  mapsUrl: cfg(env.VITE_MAPS_URL),

  social: {
    instagram: cfg(env.VITE_INSTAGRAM_URL),
    x: cfg(env.VITE_X_URL),
    snapchat: cfg(env.VITE_SNAPCHAT_URL),
    tiktok: cfg(env.VITE_TIKTOK_URL),
  },
} as const

export const hasWhatsApp = site.whatsapp.length > 0

/** Digits only — what wa.me expects. */
const waNumber = site.whatsapp.replace(/\D/g, '')

/**
 * Build a wa.me link. Returns null when no number is configured, so callers
 * can render a disabled/explanatory state instead of a broken link.
 */
export function whatsappLink(message?: string): string | null {
  if (!waNumber) return null
  const base = `https://wa.me/${waNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export function telLink(): string | null {
  const digits = site.phone.replace(/[^\d+]/g, '')
  return digits ? `tel:${digits}` : null
}

export function mailLink(): string | null {
  return site.email ? `mailto:${site.email}` : null
}

export const socialLinks = Object.entries(site.social)
  .filter(([, url]) => url.length > 0)
  .map(([key, url]) => ({ key: key as keyof typeof site.social, url }))
