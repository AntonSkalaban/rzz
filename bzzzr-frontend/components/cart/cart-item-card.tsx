"use client"

import type React from "react"

import Image from "next/image"
import { TonIcon } from "@/components/icons/ton-icon"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface CartItemCardProps {
  item: {
    id: number
    name: string
    image: string
    price: number
  }
  onClick?: (item: { id: number; name: string; image: string; price: number }) => void
  onRemove?: (itemId: number) => void
  className?: string
}

export function CartItemCard({ item, onClick, onRemove, className }: CartItemCardProps) {
  const handleCardClick = () => {
    if (onClick) {
      onClick(item)
    }
  }

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click when remove button is clicked
    if (onRemove) {
      onRemove(item.id)
    }
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between bg-[var(--bg-tertiary)] p-3 rounded-lg transition-all duration-200 hover:border-[var(--accent-gold)] cursor-pointer",
        className,
      )}
      onClick={handleCardClick}
    >
      <div className="flex items-center gap-3">
        <Image
          src={item.image || "/placeholder.svg?height=48&width=48&query=item thumbnail"}
          alt={item.name}
          width={48}
          height={48}
          className="rounded-md object-cover"
        />
        <div>
          <p className="text-[var(--text-primary)] font-semibold">{item.name}</p>
          <span className="text-[var(--text-muted)] text-sm">#{item.id}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-[var(--accent-gold)] font-bold">
          <TonIcon width={16} height={16} />
          <span>{item.price}</span>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-[var(--text-muted)] hover:text-[var(--error)]"
          onClick={handleRemoveClick}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
