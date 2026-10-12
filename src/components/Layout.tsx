import { Outlet } from 'react-router-dom'
import { useLang } from '../i18n'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { FloatingWhatsApp } from './WhatsApp'
import { ScrollToTop } from './ScrollToTop'

export function Layout() {
  const { t } = useLang()

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <a href="#main" className="skip-link">
        {t.nav.skip}
      </a>

      <ScrollToTop />
      <Navbar />

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
