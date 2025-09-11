"use client"

import { useState, useEffect, useRef } from "react"
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

//co,
export function SetPriceModal({ item, isOpen, onOpenChange, onConfirm }: SetPriceModalProps) {
  const { t } = useLanguage()
  const [price, setPrice] = useState<string>("")
  const [isConfirming, setIsConfirming] = useState(false)
  const [keyboardHeight, setKeyboardHeight] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleResize = () => {
      if (window.visualViewport) {
        const newKeyboardHeight = window.innerHeight - window.visualViewport.height
        setKeyboardHeight(newKeyboardHeight)
      }
    }

    const handleFocus = () => {
      setTimeout(() => {
        handleResize()
      }, 100)
    }

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize)
    }

    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
        inputRef.current.addEventListener('focus', handleFocus)
      }
    }, 300)

    document.body.style.overflow = 'hidden'

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize)
      }
      if (inputRef.current) {
        inputRef.current.removeEventListener('focus', handleFocus)
      }
      document.body.style.overflow = ''
      clearTimeout(timer)
      setKeyboardHeight(0) // Сбрасываем высоту при закрытии
    }
  }, [isOpen])

  if (!item) return null

  const priceNumber = Number.parseFloat(price) || 0
  const commissionRate = 0.05
  const commission = priceNumber * commissionRate
  const youWillReceive = priceNumber - commission

  const rarityBadgeVariant = item.rarity as BadgeProps["variant"]

  const handleConfirm = async () => {
    if (priceNumber <= 0) return

    setIsConfirming(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
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
      <DialogContent 
        className="max-w-sm rounded-xl gradient-bg-modal"
        style={{
          // ИСПРАВЛЕНО: Правильное позиционирование
          position: 'fixed',
          left: '50%',
          bottom: keyboardHeight > 0 ? `${keyboardHeight}px` : 'auto',
          top: keyboardHeight > 0 ? 'auto' : '50%',
          transform: keyboardHeight > 0 ? 'translateX(-50%)' : 'translate(-50%, -50%)',
          transition: 'bottom 0.3s ease, transform 0.3s ease'
        }}
      >
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