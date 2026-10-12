import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useLang } from '../i18n'
import { Logo } from './Logo'
import { IconClose, IconGlobe } from './Icons'

export function Navbar() {
  const { t, lang } = useLang()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const links = [
    { to: '/', label: t.nav.home },
    { to: '/about', label: t.nav.about },
    { to: '/services', label: t.nav.services },
    { to: '/gallery', label: t.nav.gallery },
    { to: '/contact', label: t.nav.contact },
  ]

  /* Close the drawer whenever the route changes. */
  useEffect(() => setOpen(false), [pathname])

  /* A hairline shadow appears only once the page has moved. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Drawer: lock scroll, trap Escape, return focus to the toggle. */
  useEffect(() => {
    if (!open) return

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    // Move focus into the panel so keyboard users land in the menu.
    panelRef.current?.querySelector<HTMLElement>('a, button')?.focus()

    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-500 ${
        scrolled ? 'shadow-[0_1px_0_0_rgba(32,32,32,0.07),0_10px_30px_-26px_rgba(32,32,32,0.35)]' : ''
      }`}
    >
      {/* Hairline gold rule along the very top edge */}
      <div className="h-[2px] w-full bg-gradient-to-r from-gold/0 via-gold to-gold/0" aria-hidden="true" />

      <div className="shell flex h-[var(--nav-h)] items-center justify-between gap-4">
        <Logo />

        {/* ---------- Desktop navigation ---------- */}
        <nav aria-label={t.nav.menu} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === '/'} className="group relative block px-4 py-2">
                  {({ isActive }) => (
                    <>
                      <span
                        className={`text-[0.8125rem] font-medium tracking-[0.14em] uppercase transition-colors duration-400 ${
                          isActive ? 'text-gold-dark' : 'text-charcoal group-hover:text-gold-dark'
                        } ${lang === 'ar' ? 'text-[0.9375rem] tracking-normal normal-case' : ''}`}
                      >
                        {link.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-4 -bottom-0.5 h-px bg-gold transition-transform duration-500 ease-[cubic-bezier(.22,.61,.36,1)] ${
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* ---------- Right-hand controls ---------- */}
        <div className="flex items-center gap-2 md:gap-3">
          <LanguageSwitch />

          <NavLink to="/contact" className="btn btn-gold hidden !px-6 !py-3 !text-[0.6875rem] xl:inline-flex">
            {t.nav.order}
          </NavLink>

          {/* Hamburger */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.nav.close : t.nav.menu}
            className="grid h-11 w-11 shrink-0 place-items-center border border-ivory-deep text-charcoal transition-colors duration-400 hover:border-gold/60 lg:hidden"
          >
            {open ? (
              <IconClose className="h-5 w-5" />
            ) : (
              <span className="flex flex-col items-center gap-[5px]" aria-hidden="true">
                <span className="block h-px w-5 bg-charcoal" />
                <span className="block h-px w-5 bg-charcoal" />
                <span className="block h-px w-3 bg-gold" />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ---------- Mobile drawer ---------- */}
      <div
        className={`fixed inset-x-0 top-[calc(var(--nav-h)+2px)] bottom-0 z-40 lg:hidden ${
          open ? '' : 'pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        {/* Scrim */}
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-charcoal/35 transition-opacity duration-500 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div
          ref={panelRef}
          id="mobile-nav"
          className={`absolute inset-x-0 top-0 max-h-full overflow-y-auto border-b border-ivory-deep bg-white transition-transform duration-500 ease-[cubic-bezier(.22,.61,.36,1)] ${
            open ? 'translate-y-0' : '-translate-y-4 opacity-0'
          }`}
        >
          <nav aria-label={t.nav.menu} className="shell py-6">
            <ul className="flex flex-col divide-y divide-ivory-deep">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    tabIndex={open ? 0 : -1}
                    className={({ isActive }) =>
                      `flex items-center justify-between py-4 text-lg transition-colors duration-300 ${
                        isActive ? 'text-gold-dark' : 'text-charcoal'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="font-display tracking-wide">{link.label}</span>
                        <span
                          aria-hidden="true"
                          className={`h-1.5 w-1.5 rotate-45 transition-opacity duration-300 ${
                            isActive ? 'bg-gold opacity-100' : 'opacity-0'
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            <NavLink
              to="/contact"
              tabIndex={open ? 0 : -1}
              className="btn btn-gold mt-7 w-full"
              onClick={() => setOpen(false)}
            >
              {t.nav.order}
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------------ */

function LanguageSwitch() {
  const { t, toggleLang } = useLang()

  return (
    <button
      type="button"
      onClick={toggleLang}
      lang={t.nav.switchTo === 'English' ? 'en' : 'ar'}
      aria-label={t.nav.switchLabel}
      className="group inline-flex shrink-0 items-center gap-1.5 border border-ivory-deep px-2.5 py-2.5 text-charcoal transition-colors duration-400 hover:border-gold/60 hover:text-gold-dark md:gap-2 md:px-4"
    >
      <IconGlobe className="hidden h-4 w-4 text-gold transition-transform duration-500 group-hover:rotate-12 sm:block" />
      <span className="text-[0.6875rem] font-medium tracking-[0.08em] whitespace-nowrap md:text-[0.75rem] md:tracking-[0.1em]">
        {t.nav.switchTo}
      </span>
    </button>
  )
}
