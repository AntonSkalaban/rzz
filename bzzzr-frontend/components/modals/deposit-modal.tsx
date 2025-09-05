"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TonIcon } from "@/components/icons/ton-icon"
import { useLanguage } from "@/context/language-context"

interface DepositModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function DepositModal({ isOpen, onOpenChange }: DepositModalProps) {
  const { t } = useLanguage()
  const [amount, setAmount] = useState<number | string>("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleDeposit = async () => {
    if (!amount || Number(amount) <= 0) return

    setIsProcessing(true)

    try {
      // В реальном приложении здесь будет:
      // 1. Открытие TonKeeper для подтверждения транзакции
      // 2. Ожидание подтверждения транзакции
      // 3. Автоматическое пополнение баланса после подтверждения

      console.log("Opening TonKeeper for deposit:", amount)

      // Имитация процесса
      await new Promise((resolve) => setTimeout(resolve, 2000))

      alert(t("depositModal.depositSuccess", { amount }))
      onOpenChange(false)
      setAmount("")
    } catch (error) {
      alert(t("depositModal.depositError"))
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-xl gradient-bg-modal">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[var(--text-primary)]">
            {t("depositModal.title")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center text-sm text-[var(--text-secondary)]">{t("depositModal.description")}</div>

          <div>
            <Label htmlFor="deposit-amount" className="text-[var(--text-primary)]">
              {t("depositModal.amount")}
            </Label>
            <div className="relative mt-1">
              <TonIcon width={16} height={16} className="absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                id="deposit-amount"
                type="number"
                placeholder="0.00"
                className="pl-8 text-[var(--accent-gold)] text-center text-lg font-bold"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="0.01"
                disabled={isProcessing}
              />
            </div>
          </div>

          {/* Quick amount buttons */}
          <div className="grid grid-cols-4 gap-2">
            {[10, 50, 100, 500].map((quickAmount) => (
              <Button
                key={quickAmount}
                variant="secondary"
                size="sm"
                onClick={() => setAmount(quickAmount)}
                disabled={isProcessing}
              >
                {quickAmount}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button variant="secondary" className="flex-1" onClick={() => onOpenChange(false)} disabled={isProcessing}>
            {t("depositModal.cancel")}
          </Button>
          <Button
            variant="primary"
            className="flex-1"
            onClick={handleDeposit}
            disabled={!amount || Number(amount) <= 0 || isProcessing}
          >
            {isProcessing ? t("depositModal.processing") : t("depositModal.confirm")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
