"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { EmptyState } from "@/components/empty-state"
import type { TradeItem } from "@/types/trade"
import { TradeItemCard } from "@/components/trades/trade-item-card"
import { useLanguage } from "@/context/language-context"

const mockTrades: TradeItem[] = [
  {
    id: "trade-1",
    itemName: "Legendary Sword",
    itemImage: "/placeholder.svg?height=96&width=96",
    price: 100.5,
    date: "July 14, 2025 14:30",
    type: "Покупка",
    itemId: 1001,
  },
  {
    id: "trade-2",
    itemName: "Epic Shield",
    itemImage: "/placeholder.svg?height=96&width=96",
    price: 50.0,
    date: "July 13, 2025 10:00",
    type: "Продажа",
    itemId: 1002,
  },
  {
    id: "trade-3",
    itemName: "Rare Potion",
    itemImage: "/placeholder.svg?height=96&width=96",
    price: 10.2,
    date: "July 12, 2025 18:15",
    type: "Покупка",
    itemId: 1003,
  },
  {
    id: "trade-4",
    itemName: "Common Ring",
    itemImage: "/placeholder.svg?height=96&width=96",
    price: 1.5,
    date: "July 11, 2025 09:00",
    type: "Продажа",
    itemId: 1004,
  },
  {
    id: "trade-5",
    itemName: "Mythic Orb",
    itemImage: "/placeholder.svg?height=96&width=96",
    price: 250.0,
    date: "July 10, 2025 22:45",
    type: "Покупка",
    itemId: 1005,
  },
]

export default function TradesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { t } = useLanguage()

  const filteredTrades = useMemo(() => {
    return mockTrades.filter(
      (trade) =>
        trade.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trade.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trade.type.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm])

  return (
    <div className="flex-1 rounded-xl p-4 gradient-bg-marketplace-page p-4 space-y-6">
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">{t("tradeHistoryPage.title")}</h1>

      <div className="relative mb-4">
        <Input
          variant="search"
          placeholder={t("tradeHistoryPage.searchTrades")}
          className="pr-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
      </div>

      {filteredTrades.length === 0 ? (
        <EmptyState
          title={t("tradeHistoryPage.noTradesFound")}
          description={t("tradeHistoryPage.adjustSearch")}
          iconSrc="/placeholder.svg?height=120&width=120"
        />
      ) : (
        <div className="space-y-4">
          {filteredTrades.map((trade) => (
            <TradeItemCard key={trade.id} trade={trade} />
          ))}
        </div>
      )}
    </div>
  )
}
