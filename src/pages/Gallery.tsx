import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { fill, useLang } from '../i18n'
import { PageHero } from '../components/PageHero'
import { Photo } from '../components/Photo'
import { Reveal } from '../components/Reveal'
import { CtaBand } from '../components/CtaBand'
import { WhatsAppButton } from '../components/WhatsApp'
import { IconArrow, IconClose } from '../components/Icons'
import { gallery, tileAspect, type GalleryCategory } from '../lib/images'

type Filter = 'all' | GalleryCategory

const filterOrder: Filter[] = ['all', 'thobes', 'fabrics', 'details', 'atelier']

export function Gallery() {
  const { t } = useLang()
  const g = t.gallery

  const [filter, setFilter] = useState<Filter>('all')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const items = useMemo(
    () => (filter === 'all' ? gallery : gallery.filter((i) => i.category === filter)),
    [filter],
  )

  const close = useCallback(() => setOpenIndex(null), [])
  const step = useCallback(
    (delta: number) =>
      setOpenIndex((current) =>
        current === null ? null : (current + delta + items.length) % items.length,
      ),
    [items.length],
  )

  return (
    <>
      <PageHero eyebrow={g.hero.eyebrow} title={g.hero.title} lede={g.hero.lede} />

      <section className="section bg-white">
        <div className="shell">
          {/* ---------- Filters ---------- */}
          <div
            role="tablist"
            aria-label={g.hero.eyebrow}
            className="flex flex-wrap items-center justify-center gap-2 md:gap-3"
          >
            {filterOrder.map((key) => {
              const active = filter === key
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setFilter(key)
                    setOpenIndex(null)
                  }}
                  className={`border px-5 py-2.5 text-[0.75rem] font-medium tracking-[0.14em] uppercase transition-all duration-400 ease-[cubic-bezier(.22,.61,.36,1)] ${
                    active
                      ? 'border-gold bg-gold text-white'
                      : 'border-ivory-deep text-muted hover:border-gold/60 hover:text-gold-dark'
                  }`}
                >
                  {g.filters[key]}
                </button>
              )
            })}
          </div>

          {/* ---------- Grid ---------- */}
          {items.length === 0 ? (
            <p className="mt-16 text-center text-muted">{g.empty}</p>
          ) : (
            <ul className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
              {items.map((item, i) => (
                <Reveal as="li" key={item.id} delay={(i % 8) * 60}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    aria-label={`${t.galleryData[item.altKey]} — ${g.lightbox.open}`}
                    className="group relative block w-full overflow-hidden bg-ivory text-start"
                  >
                    <Photo
                      src={item.src}
                      alt={t.galleryData[item.altKey]}
                      kind={item.kind}
                      className={`${tileAspect} w-full`}
                      imgClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.07]"
                    />

                    <span
                      className="absolute inset-0 bg-charcoal/0 transition-colors duration-700 group-hover:bg-charcoal/25"
                      aria-hidden="true"
                    />
                    <span
                      className="pointer-events-none absolute inset-3 border border-white/0 transition-colors duration-700 group-hover:border-white/45"
                      aria-hidden="true"
                    />
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 text-[0.625rem] tracking-[0.2em] text-white uppercase opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      {g.lightbox.open}
                    </span>
                  </button>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </section>

      {openIndex !== null && items[openIndex] && (
        <Lightbox
          index={openIndex}
          total={items.length}
          item={items[openIndex]}
          onClose={close}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
        />
      )}

      <CtaBand
        title={g.cta.title}
        text={g.cta.text}
        primaryLabel={g.cta.primary}
        secondary={<WhatsAppButton className="btn btn-ghost-light">{g.cta.secondary}</WhatsAppButton>}
      />
    </>
  )
}

/* ========================================================================
   Lightbox
   ======================================================================== */

function Lightbox({
  index,
  total,
  item,
  onClose,
  onPrev,
  onNext,
}: {
  index: number
  total: number
  item: (typeof gallery)[number]
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const { t, isRTL } = useLang()
  const g = t.gallery
  const closeRef = useRef<HTMLButtonElement>(null)
  const restoreTo = useRef<Element | null>(null)

  useEffect(() => {
    restoreTo.current = document.activeElement
    closeRef.current?.focus()

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      // Arrow keys follow reading direction
      if (e.key === 'ArrowRight') (isRTL ? onPrev : onNext)()
      if (e.key === 'ArrowLeft') (isRTL ? onNext : onPrev)()
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKey)
      ;(restoreTo.current as HTMLElement | null)?.focus?.()
    }
  }, [onClose, onNext, onPrev, isRTL])

  const alt = t.galleryData[item.altKey]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fade fixed inset-0 z-[60] flex flex-col bg-charcoal/95 backdrop-blur-sm"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 p-4 md:p-6">
        <p className="text-[0.6875rem] tracking-[0.2em] text-ivory/60 uppercase" dir="ltr">
          {fill(g.lightbox.counter, { current: index + 1, total })}
        </p>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={g.lightbox.close}
          className="grid h-11 w-11 place-items-center border border-white/20 text-ivory transition-colors duration-400 hover:border-gold hover:text-gold"
        >
          <IconClose className="h-5 w-5" />
        </button>
      </div>

      {/* Stage */}
      <div className="flex min-h-0 flex-1 items-center justify-center gap-3 px-4 pb-4 md:gap-6 md:px-6">
        <LightboxArrow label={g.lightbox.prev} onClick={onPrev} direction="prev" />

        <figure className="flex min-h-0 flex-1 flex-col items-center justify-center">
          {/* A fixed stage: the placeholder needs a real box to paint into,
              and a real photograph is contained inside the same frame. */}
          <Photo
            src={item.src}
            alt={alt}
            kind={item.kind}
            dark
            loading="eager"
            className="h-[58svh] w-full max-w-3xl md:h-[64svh]"
            imgClassName="object-contain"
          />
          <figcaption className="mt-5 max-w-xl text-center text-sm text-ivory/70 text-pretty">
            {alt}
          </figcaption>
        </figure>

        <LightboxArrow label={g.lightbox.next} onClick={onNext} direction="next" />
      </div>
    </div>
  )
}

function LightboxArrow({
  label,
  onClick,
  direction,
}: {
  label: string
  onClick: () => void
  direction: 'prev' | 'next'
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-11 w-11 shrink-0 place-items-center border border-white/20 text-ivory transition-colors duration-400 hover:border-gold hover:text-gold md:h-14 md:w-14"
    >
      <IconArrow
        className={`h-5 w-5 ${direction === 'prev' ? 'rotate-180 rtl:rotate-0' : 'rtl:rotate-180'}`}
      />
    </button>
  )
}
