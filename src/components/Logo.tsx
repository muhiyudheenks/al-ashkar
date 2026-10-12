import { Link } from 'react-router-dom'
import { useLang } from '../i18n'
import { BRAND_NAME } from '../lib/site'

type LogoProps = {
  /** 'light' renders for dark backgrounds (the footer). */
  tone?: 'dark' | 'light'
  className?: string
  withTagline?: boolean
}

/**
 * Text-based wordmark for Al Ashkar.
 *
 * The brand name is always rendered in Latin script as "Al Ashkar", in both
 * locales, so the spelling is identical everywhere. Gold is used only for the
 * monogram rule and the hairline flourishes.
 */
export function Logo({ tone = 'dark', className = '', withTagline = true }: LogoProps) {
  const { t } = useLang()
  const ink = tone === 'light' ? 'text-white' : 'text-charcoal'
  const sub = tone === 'light' ? 'text-ivory/60' : 'text-muted'

  return (
    <Link
      to="/"
      className={`group inline-flex min-w-0 shrink items-center gap-2.5 md:gap-3 ${className}`}
      aria-label={`${BRAND_NAME} — ${t.brand.tagline}`}
    >
      {/* Monogram */}
      <span
        aria-hidden="true"
        className="relative grid h-9 w-9 shrink-0 place-items-center border border-gold/45 transition-colors duration-500 group-hover:border-gold md:h-10 md:w-10"
      >
        <span className="font-display text-base leading-none text-gold md:text-[1.05rem]">A</span>
        <span className="absolute inset-x-1.5 bottom-1.5 h-px bg-gold/50 transition-colors duration-500 group-hover:bg-gold" />
      </span>

      {/* Wordmark — always Latin, always "Al Ashkar" */}
      <span className="flex flex-col leading-none" dir="ltr">
        <span
          className={`font-display text-lg tracking-[0.12em] whitespace-nowrap uppercase sm:text-[1.375rem] sm:tracking-[0.17em] ${ink} transition-colors duration-500 md:text-2xl`}
        >
          Al&nbsp;Ashkar
        </span>
        {withTagline && (
          <span
            className={`mt-1.5 hidden text-[0.5rem] font-medium tracking-[0.3em] whitespace-nowrap uppercase sm:block ${sub} md:text-[0.5625rem]`}
          >
            {t.brand.tagline}
          </span>
        )}
      </span>
    </Link>
  )
}
