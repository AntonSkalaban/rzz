"use client"

import { Inter } from "next/font/google"
import "./globals.css"
import { TelegramProvider } from "@/providers/telegram-provider"
import { Header } from "@/components/layout/header"
import { Navigation } from "@/components/layout/navigation"
import { CartProvider } from "@/context/cart-context"
import { LanguageProvider } from "@/context/language-context" // Импортируем LanguageProvider
import React from "react"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  React.useEffect(() => {
    // disableDoubleTapZoom() // Закомментируйте эту строку
  }, [])

  return (
    <html lang="en">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js" async />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={inter.className}>
        <TelegramProvider>
          <CartProvider>
            <LanguageProvider>
              {/* Оборачиваем в LanguageProvider */}
              <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
                <Header />
                <Navigation />
                <main className="flex-1">{children}</main>
              </div>
            </LanguageProvider>
          </CartProvider>
        </TelegramProvider>
      </body>
    </html>
  )
}
