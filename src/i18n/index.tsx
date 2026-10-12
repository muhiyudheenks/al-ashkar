import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { en, type Dictionary } from './en'
import { ar } from './ar'

export type Lang = 'en' | 'ar'

const dictionaries: Record<Lang, Dictionary> = { en, ar }

const STORAGE_KEY = 'al-ashkar:lang'

type LanguageValue = {
  lang: Lang
  dir: 'ltr' | 'rtl'
  isRTL: boolean
  t: Dictionary
  setLang: (lang: Lang) => void
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageValue | null>(null)

function readInitialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'ar') return stored
  } catch {
    /* storage unavailable (private mode, blocked cookies) — fall through */
  }
  try {
    if (navigator.language?.toLowerCase().startsWith('ar')) return 'ar'
  } catch {
    /* ignore */
  }
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang)

  const t = dictionaries[lang]
  const dir = t.dir

  // Keep the document in sync so CSS logical properties and the RTL font
  // stack apply to the whole page, not just the React tree.
  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = dir
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
  }, [lang, dir])

  const setLang = useCallback((next: Lang) => setLangState(next), [])
  const toggleLang = useCallback(
    () => setLangState((prev) => (prev === 'en' ? 'ar' : 'en')),
    [],
  )

  const value = useMemo<LanguageValue>(
    () => ({ lang, dir, isRTL: dir === 'rtl', t, setLang, toggleLang }),
    [lang, dir, t, setLang, toggleLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang(): LanguageValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>')
  return ctx
}

/** Fill `{token}` placeholders in a translated string. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in values ? String(values[key]) : `{${key}}`,
  )
}
