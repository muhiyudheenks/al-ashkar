import { Link } from 'react-router-dom'
import { useLang } from '../i18n'
import { Logo } from './Logo'
import { WhatsAppButton } from './WhatsApp'
import {
  IconInstagram,
  IconMail,
  IconPhone,
  IconPin,
  IconSnapchat,
  IconTikTok,
  IconX,
} from './Icons'
import { BRAND_NAME, mailLink, site, socialLinks, telLink } from '../lib/site'

const socialIcons = {
  instagram: IconInstagram,
  x: IconX,
  snapchat: IconSnapchat,
  tiktok: IconTikTok,
}

export function Footer() {
  const { t } = useLang()
  const year = new Date().getFullYear()

  const explore = [
    { to: '/', label: t.nav.home },
    { to: '/about', label: t.nav.about },
    { to: '/gallery', label: t.nav.gallery },
    { to: '/contact', label: t.nav.contact },
  ]

  const services = [
    { to: '/services', label: t.servicesData.custom.title },
    { to: '/services', label: t.servicesData.fabric.title },
    { to: '/services', label: t.servicesData.alteration.title },
    { to: '/services', label: t.servicesData.express.title },
  ]

  const tel = telLink()
  const mail = mailLink()

  return (
    <footer className="bg-charcoal text-ivory">
      <div className="h-px w-full bg-gradient-to-r from-gold/0 via-gold/70 to-gold/0" aria-hidden="true" />

      <div className="shell grid gap-12 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-12 lg:gap-10">
        {/* Brand */}
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/65 text-pretty">
            {t.footer.about}
          </p>

          {socialLinks.length > 0 && (
            <ul className="mt-7 flex items-center gap-3">
              {socialLinks.map(({ key, url }) => {
                const Icon = socialIcons[key]
                return (
                  <li key={key}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={key}
                      className="grid h-10 w-10 place-items-center border border-white/15 text-ivory/70 transition-colors duration-400 hover:border-gold hover:text-gold"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Explore */}
        <FooterColumn title={t.footer.explore} className="lg:col-span-2">
          {explore.map((item) => (
            <li key={item.label}>
              <Link to={item.to} className="footer-link">
                {item.label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        {/* Services */}
        <FooterColumn title={t.footer.services} className="lg:col-span-3">
          {services.map((item) => (
            <li key={item.label}>
              <Link to={item.to} className="footer-link">
                {item.label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        {/* Contact */}
        <div className="lg:col-span-3">
          <h3 className="text-[0.6875rem] font-medium tracking-[0.24em] text-gold-light uppercase">
            {t.footer.contactTitle}
          </h3>
          <span className="mt-4 block h-px w-10 bg-gold/50" aria-hidden="true" />

          <ul className="mt-5 space-y-3.5 text-sm text-ivory/70">
            {site.address && (
              <li className="flex gap-3">
                <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span className="whitespace-pre-line">{site.address}</span>
              </li>
            )}
            {tel && (
              <li className="flex gap-3">
                <IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={tel} dir="ltr" className="transition-colors duration-300 hover:text-gold">
                  {site.phone}
                </a>
              </li>
            )}
            {mail && (
              <li className="flex gap-3">
                <IconMail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={mail} dir="ltr" className="break-all transition-colors duration-300 hover:text-gold">
                  {site.email}
                </a>
              </li>
            )}
          </ul>

          <WhatsAppButton className="btn btn-outline mt-6 w-full !border-gold/60 !text-ivory hover:!bg-gold hover:!text-white" />
        </div>
      </div>

      {/* Base bar */}
      <div className="border-t border-white/10">
        <div className="shell flex flex-col items-center justify-between gap-3 py-6 text-center md:flex-row md:text-start">
          <p className="text-xs tracking-wide text-ivory/50">
            © {year} {BRAND_NAME}. {t.footer.rights}
          </p>
          <p className="text-xs tracking-[0.18em] text-gold/70 uppercase">{t.footer.credit}</p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  children,
  className = '',
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <h3 className="text-[0.6875rem] font-medium tracking-[0.24em] text-gold-light uppercase">
        {title}
      </h3>
      <span className="mt-4 block h-px w-10 bg-gold/50" aria-hidden="true" />
      <ul className="mt-5 space-y-3 text-sm">{children}</ul>
    </div>
  )
}
