import { Link } from 'react-router-dom'
import { useLang } from '../i18n'
import { GoldDivider } from '../components/Section'
import { IconArrow } from '../components/Icons'

export function NotFound() {
  const { t } = useLang()

  return (
    <section className="grid min-h-[70svh] place-items-center bg-ivory">
      <div className="shell py-20 text-center">
        <p className="font-display text-6xl text-gold/50 md:text-7xl">404</p>
        <GoldDivider className="mt-6" />
        <h1 className="mt-7 text-3xl text-balance md:text-5xl">{t.notFound.title}</h1>
        <p className="mx-auto mt-5 max-w-md text-muted text-pretty">{t.notFound.text}</p>

        <Link to="/" className="btn btn-gold mt-9">
          {t.notFound.cta}
          <IconArrow className="h-4 w-4 rtl:rotate-180" />
        </Link>
      </div>
    </section>
  )
}
