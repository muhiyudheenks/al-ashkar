import { Link } from 'react-router-dom'
import { useLang } from '../i18n'
import { PageHero } from '../components/PageHero'
import { Photo } from '../components/Photo'
import { Reveal } from '../components/Reveal'
import { Section, SectionHeading } from '../components/Section'
import { CtaBand } from '../components/CtaBand'
import { valueIcons, valueOrder } from '../lib/content'
import { photos } from '../lib/images'

export function About() {
  const { t } = useLang()
  const a = t.about

  return (
    <>
      <PageHero eyebrow={a.hero.eyebrow} title={a.hero.title} lede={a.hero.lede} />

      {/* ---------- The craft ---------- */}
      <Section tone="white">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Photo
              src={photos.aboutAtelier}
              alt={t.galleryData.atelier2}
              kind="atelier"
              className="aspect-[4/5] w-full"
            />
          </Reveal>

          <Reveal delay={140}>
            <p className="eyebrow">{a.craft.eyebrow}</p>
            <h2 className="mt-4 text-3xl text-balance md:text-[2.5rem]">{a.craft.title}</h2>
            <span className="mt-6 block h-px w-14 bg-gold" aria-hidden="true" />

            <div className="mt-7 space-y-5 text-[1.0625rem] leading-relaxed text-muted text-pretty">
              {a.craft.body.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------- Values ---------- */}
      <Section tone="ivory">
        <SectionHeading eyebrow={a.values.eyebrow} title={a.values.title} />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 md:mt-18">
          {valueOrder.map((key, i) => {
            const value = t.valuesData[key]
            const Icon = valueIcons[key]

            return (
              <Reveal as="li" key={key} delay={i * 100}>
                <div className="card h-full p-8">
                  <span className="inline-grid h-12 w-12 place-items-center border border-gold/35">
                    <Icon className="h-5 w-5 text-gold" />
                  </span>
                  <h3 className="mt-6 text-xl">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted text-pretty">{value.text}</p>
                </div>
              </Reveal>
            )
          })}
        </ul>
      </Section>

      {/* ---------- How we work ---------- */}
      <Section tone="white">
        <SectionHeading eyebrow={a.approach.eyebrow} title={a.approach.title} />

        <ol className="mt-14 grid gap-10 md:mt-20 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {a.approach.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 110} className="relative">
              {/* Connector rule between steps on wide screens */}
              {i < a.approach.steps.length - 1 && (
                <span
                  className="absolute top-5 hidden h-px bg-ivory-deep lg:block start-[3.25rem] end-[-2rem]"
                  aria-hidden="true"
                />
              )}

              <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-gold bg-white font-display text-sm text-gold-dark">
                {String(i + 1).padStart(2, '0')}
              </span>

              <h3 className="mt-6 text-xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted text-pretty">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CtaBand
        title={a.cta.title}
        text={a.cta.text}
        primaryLabel={a.cta.primary}
        secondary={
          <Link to="/services" className="btn btn-ghost-light">
            {a.cta.secondary}
          </Link>
        }
      />
    </>
  )
}
