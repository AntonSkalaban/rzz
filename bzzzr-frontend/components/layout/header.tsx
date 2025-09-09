"use client"

import Image from "next/image"
import Link from "next/link"

import { useTelegram } from "@/providers/telegram-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IconButton } from "@/components/ui/icon-button"
import { Wallet, Headphones, Globe, ShoppingCart, Trophy } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useLanguage } from "@/context/language-context"

export function Header() {
  const { user } = useTelegram()
  const { cartItemsCount } = useCart()
  const { t, toggleLanguage, language } = useLanguage() // Добавляем 'language' из контекста

  console.log("Header rendered. Current language:", t("header.language"))

  return (
    <header className="flex items-center justify-between p-4 bg-[var(--bg-primary)] border-b border-[var(--border-primary)]">
      {/* Левая часть - Аватар и баланс */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar size="lg" variant="gold">
            <AvatarImage
              src={user?.photo_url || "/placeholder.svg?height=48&width=48&query=user avatar"}
              alt={user?.first_name || "U"}
            />
            <AvatarFallback className="gradient-gold text-black font-bold">
              {user?.first_name?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
          {/* Золотая звезда-рамка вокруг аватара */}
          <div className="absolute -inset-1 bg-gradient-gold rounded-full opacity-20 animate-gold-pulse" />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-[var(--bg-secondary)] px-3 py-1.5 rounded-lg">
            <div className="w-4 h-4 bg-gradient-gold rounded-full flex items-center justify-center">
              <Image src="/images/bzzzr-ton-icon.png" alt="TON Icon" width={16} height={16} className="w-4 h-4" />
            </div>
            <span className="text-[var(--text-primary)] font-semibold">1234.5</span>
          </div>
        </div>
      </div>

      {/* Правая часть - Иконки функций */}
      <div className="flex items-center gap-2">
        <Link href="/wallet">
          <IconButton icon={<Wallet className="w-5 h-5 text-[var(--accent-gold)]" />} aria-label={t("header.wallet")} />
        </Link>
        <Link href="/tournament">
          <IconButton
            icon={<Trophy className="w-5 h-5 text-[var(--accent-gold)]" />}
            aria-label={t("header.tournament")}
          />
        </Link>
        <IconButton
          icon={<Headphones className="w-5 h-5 text-[var(--accent-gold)]" />}
          aria-label={t("header.support")}
        />
        <IconButton
        style={{width: 'max-content',padding: '0 8px'}}
          icon={
            <div className="flex items-center gap-1" >
              <Globe className="w-5 h-5 text-[var(--accent-gold)]" />
              <span className="text-[var(--text-primary)] text-sm font-medium">{language.toUpperCase()}</span>{" "}
              {/* Добавляем видимый индикатор языка */}
            </div>
          }
          onClick={() => {
            console.log("Globe button clicked!")
            toggleLanguage()
          }}
          aria-label={t("header.language")}
        />
        <Link href="/cart">
          <IconButton
            icon={<ShoppingCart className="w-5 h-5 text-[var(--accent-gold)]" />}
            badge={cartItemsCount > 0 ? cartItemsCount : undefined}
            badgeColor="error"
            aria-label={t("header.cart")}
          />
        </Link>
      </div>
    </header>
  )
}
