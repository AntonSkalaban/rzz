import { StatCard } from "@/components/profile/stat-card";
import { TransactionHistory } from "@/components/profile/transaction-history";
import { Button } from "@/components/ui/button";
import { Wallet, Download, Upload, UserPlus, Copy } from "lucide-react";
import { TonIcon } from "@/components/icons/ton-icon"; // Import TonIcon
import { LevelProgress } from "@/components/LevelProgress/LevelProgress";
import './styles.css';

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
];

const ResponsiveText = ({ children, asChild = false, className = '' }: ResponsiveTextProps) => {
  const Comp = asChild ? Slot : 'span';
  
  return (
    <Comp className={`responsive-text ${className}`}>
      {children}
    </Comp>
  );
};

const mockProgressBars = [
  {
    currentValue: 234,
    commissionRates: [
      {
        title: (
           <span className="flex align-middle" style={{gap: '4px'}}>
            <ResponsiveText>Volume</ResponsiveText>
            <TonIcon width={14} height={14} />
          </span>
        ),
        value: [50, 100, 250, 500, 1000, 2000, 3000, 4000, 5000, 10000],
      },
      {
        title: (
           <span className="flex align-middle" style={{gap: '4px'}}>
            <ResponsiveText>Rate</ResponsiveText>
            <span>%</span>
          </span>
        ),
        value: [2, 30, 40, 50, 60, 70, 75, 80, 85, 90],
      },
    ],
  },
  {
    currentValue: 1345,
    commissionRates: [
      {
        title: (
           <span className="flex align-middle" style={{gap: '4px'}}>
            <ResponsiveText>Volume</ResponsiveText>
            <TonIcon width={14} height={14} />
          </span>
        ),
        value: [50, 100, 250, 500, 1000, 2000, 3000, 4000, 5000, 10000],
      },
      {
        title: (
           <span className="flex align-middle" style={{gap: '4px'}}>
            <ResponsiveText>Rate </ResponsiveText>
            <span>%</span>
          </span>
        ),
        value: [2, 30, 40, 50, 60, 70, 75, 80, 85, 90],
      },
    ],
  },
];

const icons = [
  { id: 1, Component: Wallet },
  { id: 2, Component: Download },
  { id: 3, Component: Upload },
  { id: 4, Component: UserPlus },
  { id: 5, Component: Copy },
];

export default function ProfilePage() {
  return (
    <div className="flex-1 rounded-xl p-4 gradient-bg-marketplace-page p-4 space-y-6">
      {/* Баланс */}
      <div className="bg-[var(--bg-secondary)] rounded-xl p-4 card-shadow text-center">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">Баланс</h2>
        <div className="flex items-center justify-center gap-2 mb-4">
          <TonIcon width={32} height={32} className="text-[var(--accent-gold)]" />{" "}
          {/* Adjusted size */}
          <span className="text-4xl font-bold text-[var(--text-primary)]">1234.5</span>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-6 place-items-center">
          {icons.map(({ id, Component }) => (
            <Button
              key={id}
              variant="secondary"
              size="icon-lg"
              className="bg-[var(--bg-surface-primary)] rounded-xl card-shadow transition-all duration-200 hover:card-shadow-hover"
            >
              <Component className="w-6 h-6 text-[var(--accent-gold)]" />
            </Button>
          ))}
        </div>

        <LevelProgress
          title="Commission level"
          stats={[
            { label: "Total volume", value: "16" },
            { label: "Total volume", value: "234 TON" },
            { label: "Commission", value: "6%" },
          ]}
          progressData={mockProgressBars[0]}
        />

        <LevelProgress
          title="Cashback level"
          stats={[
            { label: "Referrals", value: "7" },
            { label: "Frens volume", value: "1345 TON" },
            { label: "Ref.bonus", value: "10%" },
          ]}
          progressData={mockProgressBars[1]}
        />

        <div className="flex items-center justify-between bg-[var(--bg-tertiary)] p-3 rounded-lg mb-4">
          <div className="flex items-center gap-2">
            <TonIcon width={20} height={20} className="text-[var(--accent-gold)]" />{" "}
            {/* Adjusted size */}
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
  );
}
