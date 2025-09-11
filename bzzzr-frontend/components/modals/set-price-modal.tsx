"use client"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { TonIcon } from "@/components/icons/ton-icon"
import { Badge, type BadgeProps } from "@/components/ui/badge"
import { useLanguage } from "@/context/language-context"

export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary" | "mythic"

interface SetPriceModalProps {
  item: {
    id: number
    name: string
    rarity: Rarity
    imageUrl?: string
  } | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (itemId: number, price: number) => void
}

export function SetPriceModal({ item, isOpen, onOpenChange, onConfirm }: SetPriceModalProps) {
  const { t } = useLanguage()
  const [price, setPrice] = useState<string>("")
  const [isConfirming, setIsConfirming] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Задержка для корректного отображения клавиатуры на мобильных устройствах
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
      
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!item) return null

  const priceNumber = Number.parseFloat(price) || 0
  const commissionRate = 0.05 // 5% комиссия
  const commission = priceNumber * commissionRate
  const youWillReceive = priceNumber - commission

  const rarityBadgeVariant = item.rarity as BadgeProps["variant"]

  const handleConfirm = async () => {
    if (priceNumber <= 0) return

    setIsConfirming(true)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Имитация API запроса
    onConfirm(item.id, priceNumber)
    setIsConfirming(false)
    setPrice("")
    onOpenChange(false)
  }

  const handleCancel = () => {
    setPrice("")
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-xl gradient-bg-modal">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[var(--text-primary)]">
            {t("setPriceModal.title")}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center text-center space-y-4">
          {/* Item Preview */}
          <div className="relative w-32 h-40 bg-[var(--bg-tertiary)] rounded-lg overflow-hidden">
            <Image
              src={item.imageUrl || "/placeholder.svg?height=160&width=128&query=item preview"}
              alt={item.name}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </div>

          <div className="text-center">
            <h3 className="text-lg font-bold text-[var(--text-primary)]">{item.name}</h3>
            <Badge variant={rarityBadgeVariant} className="capitalize mt-1">
              {item.rarity}
            </Badge>
            <span className="block text-[var(--text-muted)] text-sm mt-1">#{item.id}</span>
          </div>

          {/* Price Input */}
          <div className="w-full space-y-2">
            <Label htmlFor="sale-price" className="text-[var(--text-primary)]">
              {t("setPriceModal.salePrice")}
            </Label>
            <div className="relative">
              <TonIcon width={16} height={16} className="absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                ref={inputRef}
                id="sale-price"
                type="number"
                placeholder="0.00"
                className="pl-8 text-[var(--accent-gold)] text-center text-lg font-bold"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Price Breakdown */}
          {priceNumber > 0 && (
            <div className="w-full bg-[var(--bg-tertiary)] rounded-lg p-3 space-y-2">
              <h4 className="text-[var(--text-primary)] font-semibold text-sm">{t("setPriceModal.priceBreakdown")}:</h4>

              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-secondary)]">{t("setPriceModal.salePrice")}:</span>
                <div className="flex items-center gap-1 text-[var(--text-primary)]">
                  <TonIcon width={14} height={14} />
                  <span>{priceNumber.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-secondary)]">{t("setPriceModal.commission")} (5%):</span>
                <div className="flex items-center gap-1 text-[var(--error)]">
                  <TonIcon width={14} height={14} />
                  <span>-{commission.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-[var(--border-primary)] pt-2">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-[var(--text-primary)]">{t("setPriceModal.youWillReceive")}:</span>
                  <div className="flex items-center gap-1 text-[var(--success)]">
                    <TonIcon width={14} height={14} />
                    <span>{youWillReceive.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <Button variant="secondary" className="flex-1" onClick={handleCancel}>
            {t("setPriceModal.cancel")}
          </Button>
          <Button
            variant="primary"
            className="flex-1"
            onClick={handleConfirm}
            disabled={priceNumber <= 0 || isConfirming}
          >
            {isConfirming ? t("setPriceModal.confirming") : t("setPriceModal.confirm")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}