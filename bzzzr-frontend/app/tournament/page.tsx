"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Trophy } from "lucide-react"
import { Leaderboard } from "@/components/tournament/leaderboard"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"
import { useLanguage } from "@/context/language-context" // Импортируем useLanguage

const mockLeaderboardEntries = [
  { rank: 1, username: "CringeAI", score: 1031, avatarUrl: "/placeholder.svg?height=32&width=32" },
  { rank: 2, username: "Profik", score: 967, avatarUrl: "/placeholder.svg?height=32&width=32" },
  { rank: 3, username: "StellaArtua", score: 878, avatarUrl: "/placeholder.svg?height=32&width=32" },
  { rank: 4, username: "R0b0c0p", score: 865, avatarUrl: "/placeholder.svg?height=32&width=32" },
  { rank: 5, username: "Sameshit", score: 832, avatarUrl: "/placeholder.svg?height=32&width=32" },
  { rank: 6, username: "Sovercube", score: 793, avatarUrl: "/placeholder.svg?height=32&width=32" },
  { rank: 101, username: "Cristin", score: 0, avatarUrl: "/placeholder.svg?height=32&width=32" },
]

const mockAwards = [
  { rank: 1, name: "Genie Lamp", image: "/placeholder.svg?height=64&width=64" },
  { rank: 2, name: "Diamond Ring", image: "/placeholder.svg?height=64&width=64" },
  { rank: 3, name: "Love Candle", image: "/placeholder.svg?height=64&width=64" },
  { rank: "2-10", name: "Believer", image: "/placeholder.svg?height=64&width=64" },
  { rank: "11-25", name: "CNY", image: "/placeholder.svg?height=64&width=64" },
  { rank: "26-100", name: "Telegram", image: "/placeholder.svg?height=64&width=64" },
]

export default function TournamentPage() {
  const [activeTab, setActiveTab] = useState("by-volume")
  const { t } = useLanguage() // Получаем функцию перевода

  return (
    <div className="flex-1 rounded-xl p-4 gradient-bg-marketplace-page p-4 space-y-6">
      {/* Tabs for volume/quantity */}
      <Tabs defaultValue="by-volume" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="by-volume">{t("tournamentPage.byVolume")}</TabsTrigger>
          <TabsTrigger value="by-quantity">{t("tournamentPage.byQuantity")}</TabsTrigger>
        </TabsList>
        <TabsContent value="by-volume">
          {/* Tournament Info Card */}
          <div className="bg-[var(--bg-secondary)] rounded-xl p-4 card-shadow flex flex-col items-center text-center mb-6">
            <Trophy className="w-16 h-16 text-[var(--accent-gold)] mb-4" />
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">{t("tournamentPage.tournament")}</h2>
            <p className="text-[var(--text-secondary)] mb-4">{t("tournamentPage.tournamentDescriptionVolume")}</p>
            <span className="text-[var(--accent-gold)] font-semibold mb-4">{t("tournamentPage.soon")}</span>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="primary" className="w-full">
                  {t("tournamentPage.awards")}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[var(--bg-secondary)] border-[var(--border-primary)] text-[var(--text-primary)] rounded-xl p-6 max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl font-bold text-[var(--text-primary)] mb-4">
                    {t("tournamentPage.awards")}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {mockAwards.slice(0, 3).map((award) => (
                    <div key={award.rank} className="flex flex-col items-center text-center">
                      <Image
                        src={award.image || "/placeholder.svg"}
                        alt={award.name}
                        width={64}
                        height={64}
                        className="mb-2"
                      />
                      <span className="text-sm font-semibold text-[var(--text-primary)]">{award.name}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-3 mb-6">
                  {mockAwards.slice(3).map((award) => (
                    <div key={award.rank} className="flex items-center bg-[var(--bg-tertiary)] p-3 rounded-lg">
                      <span className="text-[var(--accent-gold)] font-bold mr-3">{award.rank}</span>
                      <Image
                        src={award.image || "/placeholder.svg"}
                        alt={award.name}
                        width={40}
                        height={40}
                        className="mr-2"
                      />
                      <span className="text-[var(--text-primary)]">{award.name}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[var(--text-muted)] text-sm text-center mb-6">
                  {t("tournamentPage.awardsDescription")}
                </p>
                <Button variant="primary" className="w-full">
                  {t("tournamentPage.nice")}
                </Button>
              </DialogContent>
            </Dialog>
          </div>

          {/* Leaderboard */}
          <Leaderboard entries={mockLeaderboardEntries} />
        </TabsContent>
        <TabsContent value="by-quantity">
          <div className="bg-[var(--bg-secondary)] rounded-xl p-4 card-shadow flex flex-col items-center text-center mb-6">
            <Trophy className="w-16 h-16 text-[var(--accent-gold)] mb-4" />
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
              {t("tournamentPage.tournamentByQuantity")}
            </h2>
            <p className="text-[var(--text-secondary)] mb-4">{t("tournamentPage.tournamentDescriptionQuantity")}</p>
            <p className="text-[var(--text-muted)] text-sm mb-4">{t("tournamentPage.tournamentNoteQuantity")}</p>
            <Button variant="primary" className="w-full">
              {t("tournamentPage.awards")}
            </Button>
          </div>
          <Leaderboard entries={mockLeaderboardEntries.sort((a, b) => b.score - a.score)} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
