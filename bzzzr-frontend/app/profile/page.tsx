import { StatCard } from "@/components/profile/stat-card"
import { TransactionHistory } from "@/components/profile/transaction-history"
import { Button } from "@/components/ui/button"
import { Wallet, Download, Upload, UserPlus, Copy } from "lucide-react"
import { TonIcon } from "@/components/icons/ton-icon" // Import TonIcon

const mockTransactions = [
  {
    id: 1,
    itemName: "Before the Chaos",
    itemImage: "/placeholder.svg?height=48&width=48",
    price: 137.3,
    date: "30 Июня 13:11",
    type: "Покупка",
    itemId: 10267,
  },
  {
    id: 2,
    itemName: "Before the Chaos",
    itemImage: "/placeholder.svg?height=48&width=48",
    price: 137.3,
    date: "30 Июня 13:11",
    type: "Покупка",
    itemId: 10267,
  },
  {
    id: 3,
    itemName: "Before the Chaos",
    itemImage: "/placeholder.svg?height=48&width=48",
    price: 137.3,
    date: "30 Июня 13:11",
    type: "Продажа",
    itemId: 10267,
  },
  {
    id: 4,
    itemName: "Before the Chaos",
    itemImage: "/placeholder.svg?height=48&width=48",
    price: 137.3,
    date: "30 Июня 13:11",

    type: "Покупка",
    itemId: 10267,
  },
]

export default function ProfilePage() {
  return (
    <div className="flex-1 rounded-xl p-4 gradient-bg-marketplace-page p-4 space-y-6">
      {/* Баланс */}
      <div className="bg-[var(--bg-secondary)] rounded-xl p-4 card-shadow text-center">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">Баланс</h2>
        <div className="flex items-center justify-center gap-2 mb-4">
          <TonIcon width={32} height={32} className="text-[var(--accent-gold)]" /> {/* Adjusted size */}
          <span className="text-4xl font-bold text-[var(--text-primary)]">1234.5</span>
        </div>
        <div className="grid grid-cols-5 gap-2 mb-6">
          <Button variant="secondary" size="icon-lg">
            <Wallet className="w-6 h-6 text-[var(--accent-gold)]" />
          </Button>
          <Button variant="secondary" size="icon-lg">
            <Download className="w-6 h-6 text-[var(--accent-gold)]" />
          </Button>
          <Button variant="secondary" size="icon-lg">
            <Upload className="w-6 h-6 text-[var(--accent-gold)]" />
          </Button>
          <Button variant="secondary" size="icon-lg">
            <UserPlus className="w-6 h-6 text-[var(--accent-gold)]" />
          </Button>
          <Button variant="secondary" size="icon-lg">
            <Copy className="w-6 h-6 text-[var(--accent-gold)]" />
          </Button>
        </div>

        {/* Commission Level */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-[var(--accent-gold)] mb-2">Commission level</h3>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <StatCard label="Total volume" value="16" />
            <StatCard label="Total volume" value="234 TON" />
            <StatCard label="Commission" value="6%" />
          </div>
          {/* Placeholder for progress bar/level indicator */}
          <div className="w-full h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
            <div className="gradient-gold h-full w-[60%]" /> {/* Example progress */}
          </div>
          <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1">
            <span>50</span>
            <span>10K</span>
          </div>
        </div>

        {/* Cashback Level */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-[var(--accent-gold)] mb-2">Cashback level</h3>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <StatCard label="Referrals" value="7" />
            <StatCard label="Frens volume" value="1345 TON" />
            <StatCard label="Ref.bonus" value="10%" />
          </div>
          {/* Placeholder for progress bar/level indicator */}
          <div className="w-full h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
            <div className="gradient-gold h-full w-[80%]" /> {/* Example progress */}
          </div>
          <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1">
            <span>20</span>
            <span>90</span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-[var(--bg-tertiary)] p-3 rounded-lg mb-4">
          <div className="flex items-center gap-2">
            <TonIcon width={20} height={20} className="text-[var(--accent-gold)]" /> {/* Adjusted size */}
            <span className="text-[var(--text-primary)] font-semibold">Cashback 23</span>
            <span className="text-[var(--text-muted)] text-sm">(min withdrawal 1 TON)</span>
          </div>
          <Button variant="secondary" size="icon">
            <Upload className="w-5 h-5 text-[var(--accent-gold)]" />
          </Button>
        </div>
      </div>

      {/* История операций */}
      <TransactionHistory transactions={mockTransactions} />
    </div>
  )
}
