"use client";

import { WalletBalanceCard } from "@/components/wallet/wallet-balance-card";
import { TransactionHistory } from "@/components/profile/transaction-history";
import { StatCard } from "@/components/profile/stat-card";
import { Button } from "@/components/ui/button";
import { TonIcon } from "@/components/icons/ton-icon";
import { Upload } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { useLanguage } from "@/context/language-context";
import { LevelProgress } from "@/components/LevelProgress/LevelProgress";
import { Slot } from "@radix-ui/react-slot";
import './styles.css';
// Mock data for demonstration
const MOCK_BALANCE = 1234.5;
const MOCK_WALLET_ADDRESS = "EQCD39VS5XJ...EXAMPLE";

const mockTransactions = [
  {
    id: 1,
    itemName: "Before the Chaos",
    itemImage: "/placeholder.svg?height=48&width=48",
    price: 137.3,
    date: "30 Июня 13:11",
    type: "Покупка" as const,
    itemId: 10267,
  },
  {
    id: 2,
    itemName: "Pixel Knight Skin",
    itemImage: "/placeholder.svg?height=48&width=48",
    price: 50.0,
    date: "29 Июня 10:00",
    type: "Продажа" as const,
    itemId: 10268,
  },
  {
    id: 3,
    itemName: "TON Deposit",
    itemImage: "/placeholder.svg?height=48&width=48",
    price: 200.0,
    date: "28 Июня 09:30",
    type: "Покупка" as const,
    itemId: 0,
  },
  {
    id: 4,
    itemName: "Void Walker",
    itemImage: "/placeholder.svg?height=48&width=48",
    price: 150.0,
    date: "27 Июня 18:45",
    type: "Покупка" as const,
    itemId: 1,
  },
];


interface ResponsiveTextProps {
  children: ReactNode;
  asChild?: boolean;
  className?: string;
}


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

export default function WalletPage() {
  const { t } = useLanguage();
  const [currentBalance, setCurrentBalance] = useState(MOCK_BALANCE);
  const [currentAddress, setCurrentAddress] = useState(MOCK_WALLET_ADDRESS);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  // Mock wallet connection status
  useEffect(() => {
    // В реальном приложении здесь будет проверка подключения кошелька
    setIsWalletConnected(true);
  }, []);

  return (
    <div className="flex-1 rounded-xl p-4 gradient-bg-marketplace-page space-y-6">
      <WalletBalanceCard
        balance={currentBalance}
        walletAddress={currentAddress}
        isConnected={isWalletConnected}
      />
      <Button
        variant="secondary"
        onClick={() => setIsWalletConnected((prev) => !prev)}
        className="w-full mb-6"
      >
        {isWalletConnected ? t("walletPage.disconnectWallet") : t("walletPage.simulateConnect")}
      </Button>

      <LevelProgress
        title={t("walletPage.commissionLevel")}
        stats={[
          { label: t("walletPage.totalVolume"), value: "16" },
          { label: t("walletPage.volumeTON"), value: "234 TON" },
          { label: t("walletPage.commission"), value: "6%" },
        ]}
        progressData={mockProgressBars[0]}
      />

      <LevelProgress
        title={t("walletPage.cashbackLevel")}
        stats={[
          { label: t("walletPage.referrals"), value: "7" },
          { label: t("walletPage.frensVolume"), value: "1345 TON" },
          { label: t("walletPage.refBonus"), value: "10%" },
        ]}
        progressData={mockProgressBars[1]}
      />

      {/* Cashback Withdrawal */}
      <div className="bg-[var(--bg-secondary)] rounded-xl p-4 card-shadow">
        <div className="flex items-center justify-between bg-[var(--bg-tertiary)] p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <TonIcon width={20} height={20} className="text-[var(--accent-gold)]" />
            <span className="text-[var(--text-primary)] font-semibold">
              {t("walletPage.cashback")} 23
            </span>
            <span className="text-[var(--text-muted)] text-sm">
              ({t("walletPage.minWithdrawal")} 1 TON)
            </span>
          </div>
          <Button variant="secondary" size="icon">
            <Upload className="w-5 h-5 text-[var(--accent-gold)]" />
          </Button>
        </div>
      </div>

      <TransactionHistory transactions={mockTransactions} />
    </div>
  );
}
