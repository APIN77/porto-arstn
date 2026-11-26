import { en } from './en'
import { id } from './id'

export type Language = 'en' | 'id'
export type Translations = typeof en

export const translations: Record<Language, Translations> = { en, id }

export function getTranslation(lang: Language): Translations {
  return translations[lang]
}
