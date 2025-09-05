import Image from "next/image"
import { cn } from "@/lib/utils"
import { TonIcon } from "@/components/icons/ton-icon" // Import TonIcon

interface Transaction {
  id: number
  itemName: string
  itemImage: string
  price: number
  date: string
  type: "Покупка" | "Продажа"
  itemId: number
}

interface TransactionHistoryProps {
  transactions: Transaction[]
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  return (
    <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">История</h3>
      <div className="space-y-3">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between bg-[var(--bg-tertiary)] p-3 rounded-lg">
            <div className="flex items-center gap-3">
              <Image
                src={tx.itemImage || "/placeholder.svg?height=48&width=48&query=item thumbnail"}
                alt={tx.itemName}
                width={48}
                height={48}
                className="rounded-md"
              />
              <div>
                <p className="text-[var(--text-primary)] font-semibold">{tx.itemName}</p>
                <div className="flex items-center text-sm text-[var(--text-muted)]">
                  <TonIcon width={16} height={16} className="mr-1 text-[var(--accent-gold)]" /> {/* Adjusted size */}
                  <span>{tx.price}</span>
                  <span className="ml-2">{tx.date}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span
                className={cn("font-semibold", {
                  "text-[var(--success)]": tx.type === "Покупка",
                  "text-[var(--error)]": tx.type === "Продажа",
                })}
              >
                {tx.type}
              </span>
              <span className="text-[var(--text-muted)] text-sm">#{tx.itemId}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
