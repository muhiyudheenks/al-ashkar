import { Link } from 'react-router-dom'
import { Reveal } from './Reveal'
import { IconArrow } from './Icons'

/** Closing call-to-action band, shared by the inner pages. */
export function CtaBand({
  title,
  text,
  primaryLabel,
  primaryTo = '/contact',
  secondary,
}: {
  title: string
  text: string
  primaryLabel: string
  primaryTo?: string
  secondary?: React.ReactNode
}) {
  return (
    <section className="bg-charcoal">
      <div className="shell py-16 md:py-20">
        <Reveal className="flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-start">
          <div className="max-w-xl">
            <h2 className="text-3xl text-white text-balance md:text-[2.25rem]">{title}</h2>
            <p className="mt-4 text-ivory/70 text-pretty">{text}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link to={primaryTo} className="btn btn-gold">
              {primaryLabel}
              <IconArrow className="h-4 w-4 rtl:rotate-180" />
            </Link>
            {secondary}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
