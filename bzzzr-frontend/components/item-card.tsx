"use client"

import type React from "react"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"
import type { VariantProps } from "class-variance-authority"
import { TonIcon } from "@/components/icons/ton-icon"
import { useCart } from "@/context/cart-context" // Импортируем useCart
import { defaultMyItemImg } from "@/constants/constants"

export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary" | "mythic"

interface ItemCardProps {
  name: string
  rarity: Rarity
  id: number
  imageUrl?: string
  className?: string
  variant?: "marketplace" | "my-item"
  price?: number // Optional for my-item variant
  onPlaceForSale?: (itemId: number) => void // Callback for my-item variant
  onClick?: (item: { name: string; rarity: Rarity; id: number; imageUrl?: string; price?: number }) => void // New onClick prop
}

export function ItemCard({
  name,
  rarity,
  id,
  imageUrl,
  className,
  variant = "marketplace",
  price,
  onPlaceForSale,
  onClick,
}: ItemCardProps) {
  const rarityClass = `rarity-${rarity}`
  const rarityBadgeVariant = rarity as VariantProps<typeof Badge>["variant"]
  const { addToCart, cartItems } = useCart() // Получаем cartItems из контекста

  const isInCart = cartItems.some((item) => item.id === id) // Проверяем, есть ли товар в корзине

  const handleCardClick = () => {
    if (onClick) {
      onClick({ name, rarity, id, imageUrl, price })
    }
  }

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Предотвращаем срабатывание onClick карточки
    if (price !== undefined && !isInCart) {
      // Добавляем проверку !isInCart
      addToCart({ id, name, image: imageUrl || "/placeholder.svg", price, rarity })
    }
  }

  return (
    <div
      className={cn(
        "relative bg-[var(--bg-secondary)] rounded-xl p-2.5 transition-all duration-200 ease-in-out card-shadow cursor-pointer",
        rarityClass,
        "hover:-translate-y-1 hover:card-shadow-hover",
        className,
      )}
      onClick={handleCardClick}
    >
      {/* Изображение предмета */}
      <div className="relative w-full aspect-[3/4] bg-[var(--bg-tertiary)] rounded-lg overflow-hidden mb-2">
        <Image
          src={imageUrl || defaultMyItemImg}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
        {/* Пример золотого треугольника на изображении */}
        <div className="absolute inset-0 flex items-center justify-center">
          <TriangleIcon className="w-1/2 h-1/2 text-[var(--accent-gold)] opacity-70" />
        </div>
      </div>

      {/* Название и редкость - отцентрированы */}
      <div className="flex flex-col items-center text-center mb-2">
        <h3 className="text-base font-bold text-[var(--text-primary)] leading-tight">{name}</h3>
        <div className="flex items-center gap-1 mt-1">
          <Badge variant={rarityBadgeVariant} className="capitalize">
            {rarity}
          </Badge>
          <span className="text-[var(--text-muted)] text-xs font-mono">#{id}</span>
        </div>
      </div>

      {/* Нижняя часть карточки в зависимости от варианта */}
      {variant === "marketplace" && typeof price === "number" && (
        <div className="flex items-center justify-between gap-2">
          {/* Убран желтый контур */}
          <div className="flex-1 flex items-center justify-center gap-1 bg-[var(--bg-tertiary)] px-2 py-1.5 rounded-lg">
            <TonIcon width={16} height={16} className="text-[var(--text-primary)]" />
            <span className="text-base font-bold text-[var(--accent-gold)]">{price}</span>
          </div>
          <Button
            variant={isInCart ? "gold" : "secondary"}
            className={cn(
              "bg-[var(--bg-tertiary)] border-[var(--border-primary)] hover:border-[var(--accent-gold)] w-[47px]", // Добавлен py-1.5 для соответствия высоте блока цены, ширина изменена на 47px
              isInCart && "pointer-events-none opacity-70",
            )}
            onClick={handleAddToCartClick}
            disabled={isInCart}
          >
            <ShoppingCart className="w-5 h-5 text-[var(--accent-gold)]" />
          </Button>
        </div>
      )}

      {variant === "my-item" && (
        <div className="flex items-center justify-between gap-2">
          {typeof price === "number" && price > 0 ? (
            // Товар на продаже - показываем цену и кнопку "Remove from sale"
            <>
              <div className="flex items-center gap-1 text-[var(--accent-gold)] font-bold">
                <TonIcon width={16} height={16} />
                <span>{price}</span>
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation()
                  onPlaceForSale?.(id) // Используем ту же функцию для снятия с продажи
                }}
              >
                Remove from sale
              </Button>
            </>
          ) : (
            // Товар не на продаже - показываем кнопку "Place for sale"
            <>
              <TonIcon width={16} height={16} className="text-[var(--text-primary)]" />
              <Button
                variant="gold"
                size="sm"
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation()
                  onPlaceForSale?.(id)
                }}
              >
                Place for sale
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

// Вспомогательные иконки, если они не из Lucide React
function TriangleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2L2 22H22L12 2Z" />
    </svg>
  )
}
