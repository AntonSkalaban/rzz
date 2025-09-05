"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { useLanguage } from "@/context/language-context"

interface ConnectWalletModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function ConnectWalletModal({ isOpen, onOpenChange }: ConnectWalletModalProps) {
  const { t } = useLanguage()

  const handleConnectTonKeeper = () => {
    // В реальном приложении здесь будет интеграция с TonKeeper
    console.log("Connecting to TonKeeper...")

    // Имитация подключения кошелька
    setTimeout(() => {
      alert(t("connectWalletModal.walletConnected"))
      onOpenChange(false)
    }, 1000)
  }

  const handleConnectTonWallet = () => {
    // Альтернативный кошелек
    console.log("Connecting to TON Wallet...")

    setTimeout(() => {
      alert(t("connectWalletModal.walletConnected"))
      onOpenChange(false)
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-xl gradient-bg-modal">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[var(--text-primary)]">
            {t("connectWalletModal.title")}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center text-center space-y-4">
          <Wallet className="w-16 h-16 text-[var(--accent-gold)]" />
          <p className="text-[var(--text-secondary)]">{t("connectWalletModal.message")}</p>

          <div className="w-full space-y-3">
            {/* TonKeeper Button */}
            <Button
              variant="primary"
              className="w-full flex items-center gap-3 justify-start px-4"
              onClick={handleConnectTonKeeper}
            >
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TK</span>
              </div>
              <span className="flex-1 text-left">TonKeeper</span>
            </Button>

            {/* TON Wallet Button */}
            <Button
              variant="secondary"
              className="w-full flex items-center gap-3 justify-start px-4"
              onClick={handleConnectTonWallet}
            >
              <div className="w-8 h-8 bg-[var(--accent-gold)] rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">TON</span>
              </div>
              <span className="flex-1 text-left">TON Wallet</span>
            </Button>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button variant="secondary" className="flex-1" onClick={() => onOpenChange(false)}>
            {t("connectWalletModal.cancel")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
