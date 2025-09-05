"use client"

import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Users, Clock } from "lucide-react"
import { useEffect, useState } from "react"
import type { Raffle } from "@/types/raffle"
import { TonIcon } from "@/components/icons/ton-icon"
import { useLanguage } from "@/context/language-context"

interface RaffleDetailModalProps {
  raffle: Raffle
  onJoinRaffle: (raffleId: string) => void
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

function formatTimeRemainingDetailed(endTime: Date): string {
  const now = new Date().getTime()
  const distance = endTime.getTime() - now

  if (distance < 0) {
    return "Ended"
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)

  const parts = []
  if (days > 0) parts.push(`${days} days`)
  if (hours > 0) parts.push(`${hours} hours`)
  if (minutes > 0) parts.push(`${minutes} minutes`)
  if (seconds > 0 && parts.length < 2) parts.push(`${seconds} seconds`)

  return parts.length > 0 ? parts.join(", ") + " remaining" : "Less than a second remaining"
}

export function RaffleDetailModal({ raffle, onJoinRaffle, isOpen, onOpenChange }: RaffleDetailModalProps) {
  const { t } = useLanguage()
  const [timeRemaining, setTimeRemaining] = useState(() => formatTimeRemainingDetailed(raffle.endTime))
  const [isJoining, setIsJoining] = useState(false)

  useEffect(() => {
    if (raffle.status !== "active") return

    const timer = setInterval(() => {
      setTimeRemaining(formatTimeRemainingDetailed(raffle.endTime))
      if (new Date().getTime() >= raffle.endTime.getTime()) {
        clearInterval(timer)
        onOpenChange(false)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [raffle.endTime, raffle.status, onOpenChange])

  const handleJoin = async () => {
    setIsJoining(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    onJoinRaffle(raffle.id)
    setIsJoining(false)
    onOpenChange(false)
  }

  const isEnded = raffle.status === "ended" || new Date().getTime() >= raffle.endTime.getTime()
  const canJoin = !isEnded && !raffle.userParticipated
  // Убираем проверку на isFull так как нет лимита участников

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-xl gradient-bg-modal">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[var(--text-primary)]">{raffle.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center text-center space-y-4">
          <Image
            src={raffle.imageUrl || "/placeholder.svg?height=180&width=180&query=raffle item large"}
            alt={raffle.name}
            width={180}
            height={180}
            className="rounded-lg"
          />
          <div className="flex items-center gap-2 text-xl font-bold text-[var(--accent-gold)]">
            {t("raffleDetailModal.prize")}: <TonIcon width={20} height={20} /> {raffle.prize}
          </div>

          {/* Entry Cost */}
          <div className="flex items-center gap-2 text-lg font-bold text-[var(--text-primary)]">
            {t("raffleDetailModal.entryCost")}:{" "}
            {raffle.costToJoin === 0 ? (
              <span className="text-[var(--success)]">{t("raffleCard.freeEntry")}</span>
            ) : (
              <div className="flex items-center gap-1 text-[var(--accent-gold)]">
                <TonIcon width={18} height={18} /> {raffle.costToJoin}
              </div>
            )}
          </div>

          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-[var(--text-secondary)] text-sm">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>
                  {t("raffleDetailModal.participants")}: {raffle.participants}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>
                  {t("raffleDetailModal.endsIn")}: {timeRemaining}
                </span>
              </div>
            </div>
            {/* Убираем Progress bar так как нет максимального лимита */}
          </div>

          {raffle.userParticipated && (
            <Badge variant="success" className="text-base px-4 py-2">
              {t("raffleDetailModal.youHaveJoined")}
            </Badge>
          )}
          {raffle.userWon && (
            <Badge variant="gold" className="text-base px-4 py-2">
              {t("raffleDetailModal.congratulations")}
            </Badge>
          )}
          {isEnded && !raffle.userParticipated && (
            <Badge variant="destructive" className="text-base px-4 py-2">
              {t("raffleDetailModal.raffleEnded")}
            </Badge>
          )}
          {/* Условия участия */}
          {canJoin && (
            <div className="w-full bg-[var(--bg-tertiary)] rounded-lg p-3 text-left">
              <h4 className="text-[var(--text-primary)] font-semibold mb-2">
                {t("raffleDetailModal.participationRequirements")}:
              </h4>
              <ul className="text-[var(--text-secondary)] text-sm space-y-1">
                <li>• {t("raffleDetailModal.subscribeChannel")}</li>
                <li>• {t("raffleDetailModal.boostChannel")}</li>
                {raffle.costToJoin > 0 && (
                  <li className="flex items-center gap-1">
                    • {t("raffleDetailModal.payEntry")}: <TonIcon width={14} height={14} /> {raffle.costToJoin}
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
        <div className="flex gap-2 mt-4">
          <Button variant="secondary" className="flex-1" onClick={() => onOpenChange(false)}>
            {t("raffleDetailModal.close")}
          </Button>
          {canJoin && (
            <Button variant="primary" className="flex-1" onClick={handleJoin} disabled={isJoining}>
              {isJoining
                ? "Joining..."
                : raffle.costToJoin === 0
                  ? t("raffleDetailModal.joinRaffle")
                  : `${t("raffleDetailModal.joinRaffle")} (${raffle.costToJoin} TON)`}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
