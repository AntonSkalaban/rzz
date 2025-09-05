"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import type { TradeItem } from "@/types/trade"
import { TonIcon } from "@/components/icons/ton-icon"
import { useLanguage } from "@/context/language-context"

interface TradeItemCardProps {
  trade: TradeItem
  className?: string
}

export function TradeItemCard({ trade, className }: TradeItemCardProps) {
  const { t } = useLanguage()

  return (
    <div
      className={cn(
        "bg-[var(--bg-secondary)] rounded-xl p-4 card-shadow flex flex-col md:flex-row gap-4 transition-all duration-200 hover:card-shadow-hover",
        className,
      )}
    >
      {trade.itemImage && (
        <div className="relative w-full md:w-24 h-24 shrink-0 rounded-lg overflow-hidden border border-[var(--border-primary)]">
          <Image
            src={trade.itemImage || "/placeholder.svg?height=96&width=96&query=trade item"}
            alt={trade.itemName}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover" }}
            className="rounded-lg"
          />
        </div>
      )}
      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">{trade.itemName}</h3>
        <div className="flex items-center text-sm text-[var(--text-muted)] mb-2">
          <TonIcon width={16} height={16} className="mr-1 text-[var(--accent-gold)]" />
          <span>{trade.price}</span>
          <span className="ml-2">{trade.date}</span>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span
            className={cn("font-semibold", {
              "text-[var(--success)]": trade.type === "Покупка",
              "text-[var(--error)]": trade.type === "Продажа",
            })}
          >
            {trade.type}
          </span>
          <span className="text-[var(--text-muted)] text-sm">#{trade.itemId}</span>
        </div>
      </div>
    </div>
  )
}
