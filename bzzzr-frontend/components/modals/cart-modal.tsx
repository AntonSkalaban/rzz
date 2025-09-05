"use client"

import type React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { TonIcon } from "@/components/icons/ton-icon"
import { EmptyState } from "@/components/empty-state"
import { useLanguage } from "@/context/language-context" // Импортируем useLanguage

interface CartItem {
  id: number
  name: string
  image: string
  price: number
}

interface CartModalProps {
  items: CartItem[]
  totalPrice: number
  onBuy: () => void
  trigger?: React.ReactNode
}

export function CartModal({ items, totalPrice, onBuy, trigger }: CartModalProps) {
  const isCartEmpty = items.length === 0
  const { t } = useLanguage() // Получаем функцию перевода

  return (
    <Dialog>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[var(--accent-gold)]">
            {t("cartModal.title")}
          </DialogTitle>
        </DialogHeader>
        {isCartEmpty ? (
          <EmptyState
            title={t("cartPage.emptyCartTitle")}
            description={t("cartPage.emptyCartDescription")}
            iconSrc="/images/sad-character.png"
            iconAlt="Sad character"
            className="py-4"
          />
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-[var(--bg-tertiary)] p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <Image
                    src={item.image || "/placeholder.svg?height=48&width=48&query=item thumbnail"}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="rounded-md"
                  />
                  <div>
                    <p className="text-[var(--text-primary)] font-semibold">{item.name}</p>
                    <span className="text-[var(--text-muted)] text-sm">#{item.id}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[var(--accent-gold)] font-bold">
                  <TonIcon width={16} height={16} />
                  <span>{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2 mt-4">
          <Button variant="secondary" className="flex-1" onClick={() => console.log("Close cart")}>
            {t("cartModal.close")}
          </Button>
          {!isCartEmpty && (
            <Button variant="primary" className="flex-1" onClick={onBuy}>
              {t("cartModal.buy")} {totalPrice} <TonIcon width={16} height={16} className="ml-1" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
