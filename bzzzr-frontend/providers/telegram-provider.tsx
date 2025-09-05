"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { getTelegramWebApp, type TelegramWebApp, type TelegramUser } from "@/lib/telegram"

interface TelegramContextType {
  webApp: TelegramWebApp | null
  user: TelegramUser | null
  isLoading: boolean
  isReady: boolean
}

const TelegramContext = createContext<TelegramContextType>({
  webApp: null,
  user: null,
  isLoading: true,
  isReady: false,
})

export const useTelegram = () => {
  const context = useContext(TelegramContext)
  if (!context) {
    throw new Error("useTelegram must be used within TelegramProvider")
  }
  return context
}

interface TelegramProviderProps {
  children: ReactNode
}

export function TelegramProvider({ children }: TelegramProviderProps) {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null)
  const [user, setUser] = useState<TelegramUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const initTelegram = () => {
      const tg = getTelegramWebApp()

      if (tg) {
        setWebApp(tg)
        setUser(tg.initDataUnsafe.user || null)

        // Настройка темы приложения
        tg.ready()
        tg.expand()

        // Настройка цветов под BZZZR тему
        tg.headerColor = "#0a0a0a"
        tg.backgroundColor = "#0a0a0a"

        setIsReady(true)
      } else {
        // Для разработки - создаем мок-пользователя
        const mockUser: TelegramUser = {
          id: 12345,
          first_name: "Test",
          last_name: "User",
          username: "testuser",
          language_code: "en",
        }
        setUser(mockUser)
        setIsReady(true)
      }

      setIsLoading(false)
    }

    // Проверяем, загружен ли Telegram WebApp SDK
    if (typeof window !== "undefined") {
      if (window.Telegram?.WebApp) {
        initTelegram()
      } else {
        // Ждем загрузки SDK
        const checkTelegram = setInterval(() => {
          if (window.Telegram?.WebApp) {
            clearInterval(checkTelegram)
            initTelegram()
          }
        }, 100)

        // Таймаут для разработки
        setTimeout(() => {
          clearInterval(checkTelegram)
          if (!webApp) {
            initTelegram()
          }
        }, 2000)
      }
    }
  }, [webApp])

  const value: TelegramContextType = {
    webApp,
    user,
    isLoading,
    isReady,
  }

  return <TelegramContext.Provider value={value}>{children}</TelegramContext.Provider>
}
