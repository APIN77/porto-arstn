'use client'

import { createContext, useContext, useState, useEffect, createElement, type ReactNode } from 'react'
import { type Language, type Translations, getTranslation } from '@/i18n'

type LanguageContextType = {
  lang: Language
  setLang: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: getTranslation('en'),
})

const STORAGE_KEY = 'portfolio-lang'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null
    if (stored === 'en' || stored === 'id') {
      setLangState(stored)
    }
    setMounted(true)
  }, [])

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    localStorage.setItem(STORAGE_KEY, newLang)
  }

  const t = getTranslation(lang)

  if (!mounted) {
    return createElement('div', { style: { visibility: 'hidden' } }, children)
  }

  return createElement(LanguageContext.Provider, { value: { lang, setLang, t } }, children)
}

export function useLanguage() {
  return useContext(LanguageContext)
}
