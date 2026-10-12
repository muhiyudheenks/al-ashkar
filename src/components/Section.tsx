import type { ReactNode } from 'react'

/* -------------------------------------------------------------------------
   Shared section primitives — one source of truth for rhythm and headings.
   ------------------------------------------------------------------------- */

export function Section({
  children,
  tone = 'white',
  className = '',
  id,
}: {
  children: ReactNode
  tone?: 'white' | 'ivory' | 'charcoal'
  className?: string
  id?: string
}) {
  const bg =
    tone === 'ivory' ? 'bg-ivory' : tone === 'charcoal' ? 'bg-charcoal text-ivory' : 'bg-white'

  return (
    <section id={id} className={`section ${bg} ${className}`}>
      <div className="shell">{children}</div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'center',
  tone = 'dark',
}: {
  eyebrow?: string
  title: string
  lede?: string
  align?: 'center' | 'start'
  tone?: 'dark' | 'light'
}) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-start'
  const titleTone = tone === 'light' ? 'text-white' : 'text-charcoal'
  const ledeTone = tone === 'light' ? 'text-ivory/75' : 'text-muted'

  return (
    <div className={`flex flex-col ${alignment}`}>
      {eyebrow && (
        <p className={`eyebrow rise ${tone === 'light' ? 'text-gold-light' : ''}`}>{eyebrow}</p>
      )}

      <h2
        className={`rise mt-4 max-w-3xl text-3xl text-balance md:text-[2.6rem] lg:text-5xl ${titleTone}`}
        style={{ '--d': '70ms' } as React.CSSProperties}
      >
        {title}
      </h2>

      <span
        className="rise mt-6 block h-px w-14 bg-gold"
        style={{ '--d': '140ms' } as React.CSSProperties}
        aria-hidden="true"
      />

      {lede && (
        <p
          className={`rise mt-6 max-w-2xl text-[1.0625rem] text-pretty ${ledeTone}`}
          style={{ '--d': '200ms' } as React.CSSProperties}
        >
          {lede}
        </p>
      )}
    </div>
  )
}

/** A thin gold divider with a centred diamond. */
export function GoldDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <span className="rule-gold h-px w-16 md:w-24" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
      <span className="rule-gold h-px w-16 md:w-24" />
    </div>
  )
}
