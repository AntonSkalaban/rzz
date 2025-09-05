"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useLanguage } from "@/context/language-context"

interface EarnPointsInfoModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function EarnPointsInfoModal({ isOpen, onOpenChange }: EarnPointsInfoModalProps) {
  const { t } = useLanguage()

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-xl gradient-bg-modal p-3">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-[var(--text-primary)]">
            {t("tasksPage.earnPointsTitle")}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center text-center space-y-2 overflow-y-auto max-h-[70vh]">
          <Image
            src="/images/market-stalls.png"
            alt="Market stalls with various items"
            width={600}
            height={100}
            className="mx-auto mb-2 object-contain w-full max-h-[100px]"
          />
          <p className="text-[var(--text-secondary)] text-sm">{t("tasksPage.earnPointsDescriptionLong")}</p>
          <div className="space-y-1 mb-2">
            <div className="bg-[var(--bg-tertiary)] p-3 rounded-lg text-left">
              <p className="text-[var(--text-primary)] font-semibold">{t("tasksPage.subscribe")}</p>
              <p className="text-[var(--text-muted)] text-sm">{t("tasksPage.pointsForSubscribe")}</p>
            </div>
            <div className="bg-[var(--bg-tertiary)] p-3 rounded-lg text-left">
              <p className="text-[var(--text-primary)] font-semibold">{t("tasksPage.inviteFriends")}</p>
              <p className="text-[var(--text-muted)] text-sm">{t("tasksPage.pointsForFriend")}</p>
            </div>
            <div className="bg-[var(--bg-tertiary)] p-3 rounded-lg text-left">
              <p className="text-[var(--text-primary)] font-semibold">{t("tasksPage.buySellItems")}</p>
              <p className="text-[var(--text-muted)] text-sm">{t("tasksPage.pointsForTradingVolume")}</p>
            </div>
            <div className="bg-[var(--bg-tertiary)] p-3 rounded-lg text-left">
              <p className="text-[var(--text-primary)] font-semibold">{t("tasksPage.boostChannel")}</p>
              <p className="text-[var(--text-muted)] text-sm">{t("tasksPage.pointsForBoost")}</p>
            </div>
            <div className="bg-[var(--bg-tertiary)] p-3 rounded-lg text-left">
              <p className="text-[var(--text-primary)] font-semibold">{t("tasksPage.addItems")}</p>
              <p className="text-[var(--text-muted)] text-sm">{t("tasksPage.pointsForAddItems")}</p>
            </div>
            <div className="bg-[var(--bg-tertiary)] p-3 rounded-lg text-left">
              <p className="text-[var(--text-primary)] font-semibold">{t("tasksPage.registrationOnSite")}</p>
              <p className="text-[var(--text-muted)] text-sm">{t("tasksPage.pointsForRegistration")}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button variant="primary" className="flex-1" onClick={() => onOpenChange(false)}>
            {t("tasksPage.continue")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
