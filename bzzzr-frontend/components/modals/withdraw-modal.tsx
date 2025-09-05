"use client"

import { useState } from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TonIcon } from "@/components/icons/ton-icon"
import { useLanguage } from "@/context/language-context" // Импортируем useLanguage

interface WithdrawModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function WithdrawModal({ isOpen, onOpenChange }: WithdrawModalProps) {
  const { t } = useLanguage() // Получаем функцию перевода
  const [amount, setAmount] = useState<number | string>("")
  const [address, setAddress] = useState<string>("")

  const handleWithdraw = () => {
    console.log("Withdraw amount:", amount, "to address:", address)
    onOpenChange(false)
    setAmount("")
    setAddress("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-xl gradient-bg-modal">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[var(--text-primary)]">
            {t("withdrawModal.title")}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="withdraw-amount" className="text-[var(--text-primary)]">
              {t("withdrawModal.amount")}
            </Label>
            <div className="relative mt-1">
              <TonIcon width={16} height={16} className="absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                id="withdraw-amount"
                type="number"
                placeholder="0.00"
                className="pl-8 text-[var(--accent-gold)]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="withdraw-address" className="text-[var(--text-primary)]">
              {t("withdrawModal.address")}
            </Label>
            <Input
              id="withdraw-address"
              type="text"
              placeholder="Your TON wallet address"
              className="mt-1"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button variant="secondary" className="flex-1" onClick={() => onOpenChange(false)}>
            {t("withdrawModal.cancel")}
          </Button>
          <Button variant="primary" className="flex-1" onClick={handleWithdraw}>
            {t("withdrawModal.confirm")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
