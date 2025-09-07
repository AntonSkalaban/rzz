"use client";

import { Button } from "@/components/ui/button";
import { TonIcon } from "@/components/icons/ton-icon";
import { DepositModal } from "@/components/modals/deposit-modal";
import { WithdrawModal } from "@/components/modals/withdraw-modal";
import { ConnectWalletModal } from "@/components/modals/connect-wallet-modal";
import { Download, Upload, UserPlus, Copy } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/context/language-context";

interface WalletBalanceCardProps {
  balance: number;
  walletAddress: string;
  isConnected?: boolean;
}

export function WalletBalanceCard({
  balance,
  walletAddress,
  isConnected = false,
}: WalletBalanceCardProps) {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const { t } = useLanguage();

  const handleCopyReferralLink = () => {
    const referralLink = `https://t.me/bzzzr_bot?start=ref_${walletAddress}`;
    navigator.clipboard.writeText(referralLink);
    alert(t("walletPage.referralLinkCopied"));
  };

  const handleInviteFriend = () => {
    const referralLink = `https://t.me/bzzzr_bot?start=ref_${walletAddress}`;
    const shareText = t("walletPage.inviteMessage");
    const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(
      referralLink
    )}&text=${encodeURIComponent(shareText)}`;
    window.open(telegramShareUrl, "_blank");
  };

  const handleConnectWallet = () => {
    if (!isConnected) {
      setIsConnectModalOpen(true);
    }
  };

  const handleDeposit = () => {
    if (isConnected) {
      setIsDepositModalOpen(true);
    } else {
      setIsConnectModalOpen(true);
    }
  };

  const handleWithdraw = () => {
    if (isConnected) {
      setIsWithdrawModalOpen(true);
    } else {
      setIsConnectModalOpen(true);
    }
  };

  return (
    <div className="bg-[var(--bg-secondary)] rounded-xl p-4 card-shadow text-center">
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
        {t("walletPage.myBalance")}
      </h2>

      {isConnected ? (
        <>
          <div className="flex items-center justify-center gap-2 mb-4">
            <TonIcon width={32} height={32} className="text-[var(--accent-gold)]" />
            <span className="text-4xl font-bold text-[var(--text-primary)]">
              {balance.toFixed(2)}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-4 place-items-center">
            <Button
              variant="secondary"
              size="icon-lg"
              onClick={handleDeposit}
              className="bg-[var(--bg-secondary)] rounded-xl card-shadow transition-all duration-200 hover:card-shadow-hover"
            >
              <Download className="w-6 h-6 text-[var(--accent-gold)]" />
              <span className="sr-only">{t("walletPage.deposit")}</span>
            </Button>
            <Button
              variant="secondary"
              size="icon-lg"
              onClick={handleWithdraw}
              className="bg-[var(--bg-secondary)] rounded-xl card-shadow transition-all duration-200 hover:card-shadow-hover"
            >
              <Upload className="w-6 h-6 text-[var(--accent-gold)]" />
              <span className="sr-only">{t("walletPage.withdraw")}</span>
            </Button>
            <Button
              variant="secondary"
              size="icon-lg"
              onClick={handleInviteFriend}
              className="bg-[var(--bg-secondary)] rounded-xl card-shadow transition-all duration-200 hover:card-shadow-hover"
            >
              <UserPlus className="w-6 h-6 text-[var(--accent-gold)]" />
              <span className="sr-only">{t("walletPage.inviteFriend")}</span>
            </Button>
            <Button
              variant="secondary"
              size="icon-lg"
              onClick={handleCopyReferralLink}
              className="bg-[var(--bg-secondary)] rounded-xl card-shadow transition-all duration-200 hover:card-shadow-hover"
            >
              <Copy className="w-6 h-6 text-[var(--accent-gold)]" />
              <span className="sr-only">{t("walletPage.copyReferralLink")}</span>
            </Button>
          </div>

          <div className="text-xs text-[var(--text-muted)] mb-2">
            {t("walletPage.walletAddress")}: {walletAddress}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center gap-2 mb-4">
            <TonIcon width={32} height={32} className="text-[var(--text-muted)]" />
            <span className="text-4xl font-bold text-[var(--text-muted)]">---.--</span>
          </div>

          <Button variant="primary" className="w-full mb-4" onClick={handleConnectWallet}>
            {t("walletPage.connectWallet")}
          </Button>

          <p className="text-sm text-[var(--text-secondary)]">
            {t("walletPage.connectWalletDescription")}
          </p>
        </>
      )}

      <DepositModal isOpen={isDepositModalOpen} onOpenChange={setIsDepositModalOpen} />
      <WithdrawModal isOpen={isWithdrawModalOpen} onOpenChange={setIsWithdrawModalOpen} />
      <ConnectWalletModal isOpen={isConnectModalOpen} onOpenChange={setIsConnectModalOpen} />
    </div>
  );
}
