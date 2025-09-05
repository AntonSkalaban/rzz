"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { TonIcon } from "@/components/icons/ton-icon"
import { Badge, type BadgeProps } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import { useLanguage } from "@/context/language-context" // Импортируем useLanguage

export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary" | "mythic"

interface ItemDetailModalProps {
  item: {
    name: string
    rarity: Rarity
    id: number
    imageUrl?: string
    price?: number
  }
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onBuy?: (itemId: number) => void
  onPlaceForSale?: (itemId: number) => void
  onAddToCart?: (item: { name: string; rarity: Rarity; id: number; imageUrl?: string; price?: number }) => void
  variant?: "marketplace" | "my-item"
}

export function ItemDetailModal({
  item,
  isOpen,
  onOpenChange,
  onBuy,
  onPlaceForSale,
  onAddToCart,
  variant = "marketplace",
}: ItemDetailModalProps) {
  const rarityBadgeVariant = item.rarity as BadgeProps["variant"]
  const { t } = useLanguage() // Получаем функцию перевода

  const handleBuyClick = () => {
    if (onBuy && item.price) {
      onBuy(item.id)
    }
  }

  const handlePlaceForSaleClick = () => {
    if (onPlaceForSale) {
      onPlaceForSale(item.id)
    }
  }

  const handleAddToCartClick = () => {
    if (onAddToCart) {
      onAddToCart(item)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-xl gradient-bg-modal">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[var(--text-primary)]">{item.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative w-48 h-64 bg-[var(--bg-tertiary)] rounded-lg overflow-hidden">
            <Image
              src={item.imageUrl || "/placeholder.svg?height=256&width=192&query=item detail"}
              alt={item.name}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </div>
          <Badge variant={rarityBadgeVariant} className="capitalize text-base px-4 py-2">
            {item.rarity}
          </Badge>
          <span className="text-[var(--text-muted)] text-sm">#{item.id}</span>

          {variant === "marketplace" && typeof item.price === "number" && (
            <div className="flex items-center gap-2 text-2xl font-bold text-[var(--accent-gold)]">
              {t("itemDetailModal.price")}: <TonIcon width={24} height={24} /> {item.price}
            </div>
          )}
        </div>
        <div className="flex gap-2 mt-4">
          <Button variant="secondary" className="flex-1" onClick={() => onOpenChange(false)}>
            {t("itemDetailModal.close")}
          </Button>
          {variant === "marketplace" && typeof item.price === "number" && (
            <>
              <Button variant="secondary" className="flex-1" onClick={handleAddToCartClick}>
                <ShoppingCart className="w-5 h-5 mr-2" /> {t("itemDetailModal.addToCart")}
              </Button>
              <Button variant="primary" className="flex-1" onClick={handleBuyClick}>
                {t("itemDetailModal.buy")}
              </Button>
            </>
          )}
          {variant === "my-item" && (
            <>
              {typeof item.price === "number" && item.price > 0 ? (
                // Товар на продаже - показываем кнопку "Remove from sale"
                <Button variant="destructive" className="flex-1" onClick={handlePlaceForSaleClick}>
                  {t("itemDetailModal.removeFromSale")}
                </Button>
              ) : (
                // Товар не на продаже - показываем кнопку "Place for sale"
                <Button variant="gold" className="flex-1" onClick={handlePlaceForSaleClick}>
                  {t("itemDetailModal.placeForSale")}
                </Button>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
