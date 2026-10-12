import type { ReactNode } from 'react'
import { useLang } from '../i18n'
import { hasWhatsApp, whatsappLink } from '../lib/site'
import { IconWhatsApp } from './Icons'

/**
 * A WhatsApp call-to-action.
 *
 * No number is ever invented, so when one is not configured this renders the
 * caller's `fallback` — or nothing at all. That keeps every page honest
 * instead of showing a dead link or a button that points back at the page
 * the visitor is already on.
 */
export function WhatsAppButton({
  message,
  className = 'btn btn-gold',
  children,
  fallback = null,
}: {
  message?: string
  className?: string
  children?: ReactNode
  fallback?: ReactNode
}) {
  const { t } = useLang()
  const href = whatsappLink(message)

  if (!href) return <>{fallback}</>

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      <IconWhatsApp className="h-4 w-4" />
      {children ?? t.home.whatsapp.cta}
    </a>
  )
}

/** Fixed floating WhatsApp bubble, shown only when a number is configured. */
export function FloatingWhatsApp() {
  const { t } = useLang()
  const href = whatsappLink()

  if (!hasWhatsApp || !href) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.home.whatsapp.cta}
      className="group fixed bottom-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_34px_-14px_rgba(32,32,32,0.6)] transition-all duration-500 ease-[cubic-bezier(.22,.61,.36,1)] end-5 hover:bg-gold hover:shadow-[0_18px_40px_-14px_rgba(197,161,91,0.75)] focus-visible:bg-gold md:bottom-7 md:h-16 md:w-16 md:end-7"
    >
      <span
        className="absolute inset-0 rounded-full border border-gold/40 transition-transform duration-700 group-hover:scale-110"
        aria-hidden="true"
      />
      <IconWhatsApp className="h-6 w-6 md:h-7 md:w-7" />
    </a>
  )
}
