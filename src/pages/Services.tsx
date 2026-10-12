import { useLang } from '../i18n'
import { PageHero } from '../components/PageHero'
import { Photo } from '../components/Photo'
import { Reveal } from '../components/Reveal'
import { Section, SectionHeading } from '../components/Section'
import { CtaBand } from '../components/CtaBand'
import { WhatsAppButton } from '../components/WhatsApp'
import { IconAlert } from '../components/Icons'
import { serviceIcons, serviceOrder } from '../lib/content'
import { photos } from '../lib/images'

export function Services() {
  const { t } = useLang()
  const s = t.services

  return (
    <>
      <PageHero eyebrow={s.hero.eyebrow} title={s.hero.title} lede={s.hero.lede} />

      {/* ---------- Service list ---------- */}
      <Section tone="white">
        <SectionHeading eyebrow={s.list.eyebrow} title={s.list.title} />

        <ul className="mt-14 grid gap-px bg-ivory-deep md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {serviceOrder.map((key, i) => {
            const service = t.servicesData[key]
            const Icon = serviceIcons[key]

            return (
              <Reveal as="li" key={key} delay={(i % 3) * 90} className="group bg-white">
                <article className="flex h-full flex-col p-8 transition-colors duration-500 group-hover:bg-ivory lg:p-10">
                  <div className="flex items-start justify-between gap-4">
                    <Icon className="h-8 w-8 shrink-0 text-gold transition-transform duration-600 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:-translate-y-1" />
                    <span className="font-display text-2xl text-ivory-deep transition-colors duration-500 group-hover:text-gold/40">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl leading-snug">{service.title}</h3>
                  <span
                    className="mt-4 block h-px w-8 bg-gold/50 transition-all duration-600 group-hover:w-16 group-hover:bg-gold"
                    aria-hidden="true"
                  />
                  <p className="mt-5 text-sm leading-relaxed text-muted text-pretty">{service.long}</p>
                </article>
              </Reveal>
            )
          })}
        </ul>
      </Section>

      {/* ---------- Fabric ---------- */}
      <Section tone="ivory">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={s.fabrics.eyebrow}
              title={s.fabrics.title}
              lede={s.fabrics.lede}
              align="start"
            />

            <Reveal delay={200} className="mt-10">
              <Photo
                src={photos.servicesHero}
                alt={t.galleryData.fabric3}
                kind="fabric"
                className="frame-gold aspect-[4/3] w-full"
              />
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ul className="grid gap-5 sm:grid-cols-2">
              {s.fabrics.items.map((item, i) => (
                <Reveal as="li" key={item.title} delay={i * 90}>
                  <div className="card h-full p-7">
                    <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden="true" />
                    <h3 className="mt-5 text-lg leading-snug">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted text-pretty">{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>

            {/* Honest note: stock varies, so we don't promise specifics */}
            <Reveal delay={360}>
              <p className="mt-6 flex items-start gap-3 border border-gold/30 bg-white p-5 text-sm leading-relaxed text-muted">
                <IconAlert className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {s.fabrics.note}
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------- Process ---------- */}
      <Section tone="white">
        <SectionHeading eyebrow={s.process.eyebrow} title={s.process.title} />

        <ol className="mt-14 grid gap-px bg-ivory-deep md:mt-20 md:grid-cols-2 lg:grid-cols-4">
          {t.about.approach.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 100} className="bg-white">
              <div className="h-full p-8 lg:p-9">
                <span className="font-display text-4xl text-gold/35">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 text-lg">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted text-pretty">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CtaBand
        title={s.cta.title}
        text={s.cta.text}
        primaryLabel={s.cta.primary}
        secondary={<WhatsAppButton className="btn btn-ghost-light">{s.cta.secondary}</WhatsAppButton>}
      />
    </>
  )
}
