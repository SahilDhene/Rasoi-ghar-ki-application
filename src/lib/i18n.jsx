import { createContext, useContext, useState } from 'react'
import { translations } from './translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem('rasoi-lang') ?? 'en')

  function setLang(code) {
    setLangState(code)
    localStorage.setItem('rasoi-lang', code)
  }

  // t('greeting', { name }) → "Hey Sahil"; falls back to English, then the key itself
  function t(key, vars = {}) {
    let text = (translations[lang] ?? translations.en)[key] ?? translations.en[key] ?? key
    Object.entries(vars).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, v)
    })
    return text
  }

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
}

export function useLang() {
  return useContext(LanguageContext)
}
