"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"
import en from "@/locales/en.json"
import ru from "@/locales/ru.json"

type Language = "en" | "ru"
type Translations = typeof en

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [translations, setTranslations] = useState<Translations>(en)

  useEffect(() => {
    setTranslations(language === "en" ? en : ru)
    console.log("Language changed to:", language) // Лог при изменении языка
  }, [language])

  const toggleLanguage = useCallback(() => {
    setLanguage((prevLang) => {
      const newLang = prevLang === "en" ? "ru" : "en"
      console.log("Attempting to toggle language to:", newLang) // Лог при попытке переключения
      return newLang
    })
  }, [])

  const t = useCallback(
    (key: string): string => {
      const keys = key.split(".")
      let current: any = translations
      for (const k of keys) {
        if (current && typeof current === "object" && k in current) {
          current = current[k]
        } else {
          return key // Return the key itself if not found
        }
      }
      return typeof current === "string" ? current : key
    },
    [translations],
  )

  return <LanguageContext.Provider value={{ language, toggleLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
