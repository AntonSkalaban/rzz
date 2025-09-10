"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { TradeItem } from "@/types/trade";
import { TonIcon } from "@/components/icons/ton-icon";
import { useLanguage } from "@/context/language-context";
import { ItemPriceWithDate, TransactionTypeBadge } from "../ListItem/ListItem";

interface TradeItemCardProps {
  trade: TradeItem;
  className?: string;
}

export function TradeItemCard({ trade, className }: TradeItemCardProps) {
  const { t } = useLanguage();

  return (
    <div
      className={cn(
        "bg-[var(--bg-secondary)] rounded-xl p-4 card-shadow flex flex-col flex-row gap-4 transition-all duration-200 hover:card-shadow-hover",
        className
      )}
    >
      {trade.itemImage && (
        <div className="relative w-full w-24 h-24 shrink-0 rounded-lg overflow-hidden border border-[var(--border-primary)]">
          <Image
            src={trade.itemImage || "/placeholder.svg?height=96&width=96&query=trade item"}
            alt={trade.itemName}
            fill
            sizes="33vw"
            style={{ objectFit: "cover" }}
            className="rounded-lg"
          />
        </div>
      )}
      <div className="w-full flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">{trade.itemName}</h3>

          <ItemPriceWithDate price={trade.price} date={trade.date} />
        </div>
        <div className="flex items-center justify-between mt-auto">
          <TransactionTypeBadge type={trade.type} />
          <span className="text-[var(--text-muted)] text-sm">#{trade.itemId}</span>
        </div>
      </div>
    </div>
  );
}
