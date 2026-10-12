import type { ReactNode } from 'react'

/**
 * The compact ivory page header used by every inner page, so Home's full
 * hero and the rest of the site share one visual language.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string
  title: string
  lede: string
  children?: ReactNode
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-ivory-deep bg-ivory">
      {/* Faint woven texture, drawn rather than photographed */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.55]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(32,32,32,.028) 0 1px, transparent 1px 9px)',
        }}
      />

      <div className="shell py-16 md:py-24 lg:py-28">
        <div className="max-w-3xl">
          <p className="fade eyebrow">{eyebrow}</p>

          <h1
            className="rise mt-5 text-[2.25rem] leading-[1.1] text-balance md:text-5xl lg:text-[3.5rem]"
            style={{ '--d': '90ms' } as React.CSSProperties}
          >
            {title}
          </h1>

          <span
            className="rise mt-7 block h-px w-16 bg-gold"
            style={{ '--d': '180ms' } as React.CSSProperties}
            aria-hidden="true"
          />

          <p
            className="rise mt-7 max-w-2xl text-[1.0625rem] leading-relaxed text-muted text-pretty"
            style={{ '--d': '260ms' } as React.CSSProperties}
          >
            {lede}
          </p>

          {children && <div className="rise mt-9" style={{ '--d': '340ms' } as React.CSSProperties}>{children}</div>}
        </div>
      </div>
    </section>
  )
}
