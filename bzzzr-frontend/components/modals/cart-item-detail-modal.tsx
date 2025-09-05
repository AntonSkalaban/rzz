"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { TonIcon } from "@/components/icons/ton-icon"
import { Badge, type BadgeProps } from "@/components/ui/badge"

export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary" | "mythic"

interface CartItemDetailModalProps {
  item: {
    id: number
    name: string
    image: string
    price: number
    rarity?: Rarity // Добавим rarity для отображения в модалке
  } | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onBuySingleItem?: (itemId: number) => void
  onRemoveFromCart?: (itemId: number) => void
}

export function CartItemDetailModal({
  item,
  isOpen,
  onOpenChange,
  onBuySingleItem,
  onRemoveFromCart,
}: CartItemDetailModalProps) {
  if (!item) return null

  const rarityBadgeVariant = (item.rarity as BadgeProps["variant"]) || "default"

  const handleBuyClick = () => {
    if (onBuySingleItem) {
      onBuySingleItem(item.id)
      onOpenChange(false) // Закрыть модалку после покупки
    }
  }

  const handleRemoveClick = () => {
    if (onRemoveFromCart) {
      onRemoveFromCart(item.id)
      onOpenChange(false) // Закрыть модалку после удаления
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-xl gradient-bg-modal">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[var(--text-primary)]">{item.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative w-48 h-64 bg-[var(--bg-tertiary)] rounded-lg overflow-hidden border border-[var(--border-primary)]">
            <Image
              src={item.image || "/placeholder.svg?height=256&width=192&query=item detail"}
              alt={item.name}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </div>
          {item.rarity && (
            <Badge variant={rarityBadgeVariant} className="capitalize text-base px-4 py-2">
              {item.rarity}
            </Badge>
          )}
          <span className="text-[var(--text-muted)] text-sm">#{item.id}</span>

          <div className="flex items-center gap-2 text-2xl font-bold text-[var(--accent-gold)]">
            Price: <TonIcon width={24} height={24} /> {item.price}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button variant="secondary" className="flex-1" onClick={handleRemoveClick}>
            Remove from Cart
          </Button>
          <Button variant="primary" className="flex-1" onClick={handleBuyClick}>
            Buy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
