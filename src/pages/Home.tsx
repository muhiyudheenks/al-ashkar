import { Link } from 'react-router-dom'
import { useLang } from '../i18n'
import { Photo } from '../components/Photo'
import { Reveal } from '../components/Reveal'
import { GoldDivider, Section, SectionHeading } from '../components/Section'
import { WhatsAppButton } from '../components/WhatsApp'
import { IconArrow, IconChevronDown } from '../components/Icons'
import { featuredServices, serviceIcons, valueIcons, valueOrder } from '../lib/content'
import { hasWhatsApp } from '../lib/site'
import { collectionPreview, photos, tileAspect } from '../lib/images'

export function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesPreview />
      <Values />
      <Statement />
      <CollectionPreview />
      <WhatsAppCta />
    </>
  )
}

/* ========================================================================
   Hero
   ======================================================================== */

function Hero() {
  const { t } = useLang()
  const h = t.home.hero

  return (
    <section className="relative isolate flex min-h-[calc(100svh-var(--nav-h))] items-center overflow-hidden bg-charcoal">
      {/* Woven texture and a soft vignette keep the charcoal from reading flat */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(247,243,235,.035) 0 1px, transparent 1px 10px)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(120% 90% at 50% 0%, rgba(58,58,58,.75) 0%, rgba(32,32,32,0) 60%)',
        }}
      />

      <div className="shell grid w-full items-center gap-14 py-16 md:py-20 lg:grid-cols-12 lg:gap-12 lg:py-24 xl:gap-16">
        {/* ---------- Text ---------- */}
        <div className="lg:col-span-7">
          <p className="fade eyebrow !text-gold-light">{h.eyebrow}</p>

          <h1
            className="rise mt-6 text-[2.75rem] leading-[1.08] text-white text-balance md:text-6xl lg:text-[4rem]"
            style={{ '--d': '120ms' } as React.CSSProperties}
          >
            {h.headline}
          </h1>

          <span
            className="rise mt-8 block h-px w-20 bg-gold"
            style={{ '--d': '240ms' } as React.CSSProperties}
            aria-hidden="true"
          />

          <p
            className="rise mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-ivory/80 text-pretty md:text-lg"
            style={{ '--d': '320ms' } as React.CSSProperties}
          >
            {h.lede}
          </p>

          <div
            className="rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            style={{ '--d': '420ms' } as React.CSSProperties}
          >
            <Link to="/contact" className="btn btn-gold">
              {h.primary}
              <IconArrow className="h-4 w-4 rtl:rotate-180" />
            </Link>
            <Link to="/gallery" className="btn btn-ghost-light">
              {h.secondary}
            </Link>
          </div>
        </div>

        {/* ---------- Image ----------
            Second in the DOM, so it sits below the text on small screens and
            beside it from `lg` up. Grid column order flips automatically in
            RTL, putting the image on the start side without any extra rules. */}
        <div className="fade lg:col-span-5" style={{ '--d': '520ms' } as React.CSSProperties}>
          {/* The column stays stretched and the box is pushed to the outer
              edge with logical auto-margins. `justify-self-end` would make the
              column shrink-to-fit, which collapses to zero width whenever the
              photograph is missing and the fallback artwork — which has no
              intrinsic size — is shown instead. */}
          <div className="relative ms-auto me-auto w-full max-w-[20rem] sm:max-w-[23rem] lg:me-0 lg:max-w-[26rem] xl:max-w-[28rem]">
            {/* Gold hairline frame, offset 16px toward the outer edge.
                Logical insets mirror it for RTL on their own. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-4 bottom-[-1rem] start-4 end-[-1rem] border border-gold/65"
            />

            {/* aspect-ratio reserves the box before the photo loads */}
            <Photo
              src={photos.hero}
              alt={h.imageAlt}
              kind="portrait"
              dark
              emphasis="hero"
              note={false}
              loading="eager"
              fetchPriority="high"
              width={880}
              height={1100}
              drift
              className="relative aspect-[4/5] w-full bg-charcoal-soft/40"
            />

            {/* Charcoal wash on the edge facing the headline. Only from `lg`,
                where the text actually sits beside the image — stacked on
                smaller screens it would just dim the photograph. */}
            <span
              aria-hidden="true"
              className="hero-wash pointer-events-none absolute inset-0 hidden lg:block"
            />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#services"
        className="fade absolute inset-x-0 bottom-6 mx-auto hidden w-fit flex-col items-center gap-2 text-ivory/55 transition-colors duration-400 hover:text-gold lg:flex"
        style={{ '--d': '900ms' } as React.CSSProperties}
      >
        <span className="text-[0.5625rem] tracking-[0.3em] uppercase">{h.scroll}</span>
        <IconChevronDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  )
}

/* ========================================================================
   Trust strip
   ======================================================================== */

function TrustStrip() {
  const { t } = useLang()

  return (
    <div className="border-b border-ivory-deep bg-white">
      <div className="shell grid divide-y divide-ivory-deep md:grid-cols-3 md:divide-x md:divide-y-0 rtl:md:divide-x-reverse">
        {t.home.strip.map((item, i) => (
          <Reveal key={item.title} delay={i * 110} className="px-0 py-8 md:px-8 md:py-10">
            <div className="flex items-start gap-4">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" aria-hidden="true" />
              <div>
                <h3 className="text-lg">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

/* ========================================================================
   Featured services
   ======================================================================== */

function ServicesPreview() {
  const { t } = useLang()

  return (
    <Section id="services" tone="white">
      <SectionHeading
        eyebrow={t.home.services.eyebrow}
        title={t.home.services.title}
        lede={t.home.services.lede}
      />

      <ul className="mt-14 grid gap-px bg-ivory-deep sm:grid-cols-2 lg:grid-cols-4 md:mt-20">
        {featuredServices.map((key, i) => {
          const service = t.servicesData[key]
          const Icon = serviceIcons[key]

          return (
            <Reveal as="li" key={key} delay={i * 90} className="group bg-white">
              <Link
                to="/services"
                className="flex h-full flex-col p-8 transition-colors duration-500 hover:bg-ivory lg:p-9"
              >
                <Icon className="h-8 w-8 text-gold transition-transform duration-600 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:-translate-y-1" />

                <h3 className="mt-7 text-xl leading-snug">{service.title}</h3>

                <span
                  className="mt-4 block h-px w-8 bg-gold/50 transition-all duration-600 group-hover:w-14 group-hover:bg-gold"
                  aria-hidden="true"
                />

                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted text-pretty">
                  {service.short}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-[0.6875rem] tracking-[0.18em] text-gold-dark uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {t.home.services.cta}
                  <IconArrow className="h-3.5 w-3.5 rtl:rotate-180" />
                </span>
              </Link>
            </Reveal>
          )
        })}
      </ul>

      <div className="mt-14 flex justify-center">
        <Link to="/services" className="btn btn-outline">
          {t.home.services.cta}
        </Link>
      </div>
    </Section>
  )
}

/* ========================================================================
   Brand values
   ======================================================================== */

function Values() {
  const { t } = useLang()

  return (
    <Section tone="ivory">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow={t.home.values.eyebrow}
            title={t.home.values.title}
            lede={t.home.values.lede}
            align="start"
          />

          <Reveal delay={240} className="mt-10 hidden lg:block">
            <Photo
              src={photos.aboutCraft}
              alt={t.galleryData.detail1}
              kind="detail"
              className="frame-gold aspect-[4/3] w-full"
            />
          </Reveal>
        </div>

        <ul className="grid gap-px self-start bg-ivory-deep sm:grid-cols-2 lg:col-span-7">
          {valueOrder.map((key, i) => {
            const value = t.valuesData[key]
            const Icon = valueIcons[key]

            return (
              <Reveal as="li" key={key} delay={i * 100} className="bg-ivory">
                <div className="group h-full p-8 transition-colors duration-500 hover:bg-white lg:p-10">
                  <span className="inline-grid h-12 w-12 place-items-center border border-gold/35 transition-colors duration-500 group-hover:border-gold group-hover:bg-white">
                    <Icon className="h-5 w-5 text-gold" />
                  </span>

                  <h3 className="mt-6 text-xl">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted text-pretty">{value.text}</p>
                </div>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}

/* ========================================================================
   Statement band
   ======================================================================== */

function Statement() {
  const { t } = useLang()

  return (
    <section className="relative isolate overflow-hidden bg-charcoal">
      <Photo
        src={photos.statement}
        alt={t.galleryData.thobe2}
        kind="thobe"
        dark
        note={false}
        className="absolute inset-0 -z-10 opacity-35"
      />
      <div className="absolute inset-0 -z-10 bg-charcoal/55" aria-hidden="true" />

      <div className="shell py-20 text-center md:py-28">
        <Reveal>
          <GoldDivider />
          <blockquote className="mx-auto mt-8 max-w-3xl font-display text-2xl leading-snug text-ivory text-balance md:text-4xl">
            {t.home.statement}
          </blockquote>
          <GoldDivider className="mt-8" />
        </Reveal>
      </div>
    </section>
  )
}

/* ========================================================================
   Collection preview
   ======================================================================== */

function CollectionPreview() {
  const { t } = useLang()

  return (
    <Section tone="white">
      <SectionHeading
        eyebrow={t.home.collection.eyebrow}
        title={t.home.collection.title}
        lede={t.home.collection.lede}
      />

      <div className="mt-14 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-3 md:gap-5">
        {collectionPreview.map((item, i) => (
          <Reveal key={item.id} delay={i * 80}>
            <Link
              to="/gallery"
              className="group relative block overflow-hidden bg-ivory"
              aria-label={t.home.collection.cta}
            >
              <Photo
                src={item.src}
                alt={t.galleryData[item.altKey]}
                kind={item.kind}
                className={`${tileAspect} w-full`}
                imgClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.06]"
              />
              <span
                className="absolute inset-0 bg-charcoal/0 transition-colors duration-700 group-hover:bg-charcoal/15"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute inset-3 border border-white/0 transition-colors duration-700 group-hover:border-white/40"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <Link to="/gallery" className="btn btn-charcoal">
          {t.home.collection.cta}
          <IconArrow className="h-4 w-4 rtl:rotate-180" />
        </Link>
      </div>
    </Section>
  )
}

/* ========================================================================
   WhatsApp CTA
   ======================================================================== */

function WhatsAppCta() {
  const { t } = useLang()

  return (
    <Section tone="ivory">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">{t.home.whatsapp.eyebrow}</p>
        <h2 className="mt-4 text-3xl text-balance md:text-[2.6rem]">{t.home.whatsapp.title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] text-muted text-pretty">
          {t.home.whatsapp.text}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          {/* With no number configured the band still needs one clear
              action, so it falls back to the order form itself. */}
          <WhatsAppButton
            className="btn btn-gold"
            fallback={
              <Link to="/contact" className="btn btn-gold">
                {t.nav.order}
              </Link>
            }
          />
          {hasWhatsApp && (
            <Link to="/contact" className="btn btn-outline">
              {t.nav.order}
            </Link>
          )}
        </div>
      </Reveal>
    </Section>
  )
}
