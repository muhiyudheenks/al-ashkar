import { Outlet } from 'react-router-dom'
import { useLang } from '../i18n'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { FloatingWhatsApp } from './WhatsApp'
import { ScrollToTop } from './ScrollToTop'
import { MessageCircle } from 'lucide-react'

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
      {/* <a href="https://wa.me/+919809147713" target="_blank" rel="noreferrer" aria-label="WhatsApp"
        className="animate-pulse-ring fixed bottom-6 end-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-navy-foreground shadow-lift transition-transform hover:scale-110">
        <MessageCircle className="h-6 w-6" />
      </a> */}
      <a
        href="https://wa.me/919809147713"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="animate-pulse-ring fixed bottom-6 end-6 z-50 grid h-14 w-14 place-items-center rounded-full border-2 border-[#25D366] bg-transparent text-[#25D366] shadow-lift transition hover:scale-110 hover:bg-[#25D366] hover:text-white"
      >
        <MessageCircle className="h-6 w-6" />
      </a><a
        href="https://wa.me/+966598549571"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="animate-pulse-ring fixed bottom-6 end-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  )
}
