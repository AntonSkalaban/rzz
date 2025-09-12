"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmptyState } from "@/components/empty-state"
import { RaffleCard } from "@/components/raffles/raffle-card"
import { RaffleDetailModal } from "@/components/modals/raffle-detail-modal"
import type { Raffle } from "@/types/raffle"
import { useLanguage } from "@/context/language-context"
import { useTelegram } from "@/providers/telegram-provider" // Импортируем useTelegram

const mockRaffles: Raffle[] = [
  {
    id: "raffle-1",
    name: "Legendary Sword Raffle",
    imageUrl: "/placeholder.svg?height=200&width=150",
    prize: 100,
    costToJoin: 5, // Paid raffle
    participants: 50,
    maxParticipants: 100,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days from now
    status: "active",
    userParticipated: false,
    createdByUserId: 99999, // Example: another user
  },
  {
    id: "raffle-2",
    name: "Epic Shield Giveaway",
    imageUrl: "/placeholder.svg?height=200&width=150",
    prize: 50,
    costToJoin: 0, // Free raffle
    participants: 120,
    maxParticipants: 150,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 12), // 12 hours from now
    status: "active",
    userParticipated: false,
    createdByUserId: 12345, // Example: current user
  },
  {
    id: "raffle-3",
    name: "Rare Potion Draw",
    imageUrl: "/placeholder.svg?height=200&width=150",
    prize: 10,
    costToJoin: 1, // Paid raffle
    participants: 20,
    maxParticipants: 20, // Full
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2 hours from now
    status: "active",
    userParticipated: true, // User participated
    createdByUserId: 99999,
  },
  {
    id: "raffle-4",
    name: "Mythic Orb Raffle (Ended)",
    imageUrl: "/placeholder.svg?height=200&width=150",
    prize: 200,
    costToJoin: 10, // Paid raffle
    participants: 99,
    maxParticipants: 100,
    endTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    status: "ended",
    userParticipated: false,
    createdByUserId: 12345, // Example: current user
  },
  {
    id: "raffle-5",
    name: "Drawing Raffle",
    imageUrl: "/placeholder.svg?height=200&width=150",
    prize: 75,
    costToJoin: 0, // Free raffle
    participants: 75,
    maxParticipants: 75,
    endTime: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    status: "drawing",
    userParticipated: true, // User participated
    userWon: true, // User won
    createdByUserId: 99999,
  },
  {
    id: "raffle-6",
    name: "Another Free Raffle",
    imageUrl: "/placeholder.svg?height=200&width=150",
    prize: 20,
    costToJoin: 0, // Free raffle
    participants: 10,
    maxParticipants: 50,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days from now
    status: "active",
    userParticipated: false,
    createdByUserId: 99999,
  },
]

export default function RafflesPage() {
  const [activeTab, setActiveTab] = useState("active-raffles")
  const [raffles, setRaffles] = useState<Raffle[]>(mockRaffles)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRaffle, setSelectedRaffle] = useState<Raffle | null>(null)
  const { t } = useLanguage()
  const { user } = useTelegram() // Получаем данные пользователя Telegram

  const handleViewDetails = (raffle: Raffle) => {
    setSelectedRaffle(raffle)
    setIsModalOpen(true)
  }

  const handleJoinRaffle = (raffleId: string) => {
    setRaffles((prevRaffles) =>
      prevRaffles.map((r) =>
        r.id === raffleId ? { ...r, userParticipated: true, participants: r.participants + 1 } : r,
      ),
    )
  }

  const filteredRaffles = useMemo(() => {
    return raffles.filter((raffle) => raffle.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [raffles, searchTerm])

  const activeRaffles = useMemo(() => {
    return filteredRaffles.filter((r) => r.status === "active" && new Date().getTime() < r.endTime.getTime())
  }, [filteredRaffles])

  const participatingRaffles = useMemo(() => {
    return filteredRaffles.filter((r) => r.userParticipated)
  }, [filteredRaffles])

  const freeRaffles = useMemo(() => {
    return filteredRaffles.filter((r) => r.costToJoin === 0)
  }, [filteredRaffles])

  const paidRaffles = useMemo(() => {
    return filteredRaffles.filter((r) => r.costToJoin > 0)
  }, [filteredRaffles])

  const myCreatedRaffles = useMemo(() => {
    // Assuming user.id is available and represents the current user's ID
    return filteredRaffles.filter((r) => r.createdByUserId === user?.id)
  }, [filteredRaffles, user?.id])

  const renderRaffleGrid = (items: Raffle[], emptyMessageKey: string, withDescription = false) => {
    if (items.length === 0) {
      return (
        <EmptyState
          title={t(emptyMessageKey)}
          description={withDescription ? t(emptyMessageKey) : ''}
          iconWidth={160}
          iconHeight={160}
          iconSrc="/images/sad-arab-character.png"
        />
      )
    }
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-4">
        {items.map((raffle) => (
          <RaffleCard key={raffle.id} raffle={raffle} onViewDetails={handleViewDetails} />
        ))}
      </div>
    )
  }

  return (
    <div className="flex-1 rounded-xl p-4 gradient-bg-marketplace-page">
      <div className="flex flex-col gap-4 mb-4">
        <div className="relative">
          <Input
            variant="search"
            placeholder={t("rafflesPage.searchRaffles")}
            className="pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
        </div>
      </div>

      <Tabs defaultValue="active-raffles" onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex w-full overflow-x-auto gap-1 pb-2">
          <TabsTrigger value="active-raffles">{t("rafflesPage.activeRaffles")}</TabsTrigger>
          <TabsTrigger value="participating-raffles">{t("rafflesPage.participatingRaffles")}</TabsTrigger>
          <TabsTrigger value="free-raffles">{t("rafflesPage.freeRaffles")}</TabsTrigger>
          <TabsTrigger value="paid-raffles">{t("rafflesPage.paidRaffles")}</TabsTrigger>
          <TabsTrigger value="my-created-raffles">{t("rafflesPage.myCreatedRaffles")}</TabsTrigger>
        </TabsList>

        <TabsContent value="active-raffles">
          {renderRaffleGrid(activeRaffles, "rafflesPage.noActiveRaffles")}
        </TabsContent>

        <TabsContent value="participating-raffles">
          {renderRaffleGrid(participatingRaffles, "rafflesPage.notJoinedRaffles")}
        </TabsContent>

        <TabsContent value="free-raffles">{renderRaffleGrid(freeRaffles, "rafflesPage.noFreeRaffles")}</TabsContent>

        <TabsContent value="paid-raffles">{renderRaffleGrid(paidRaffles, "rafflesPage.noPaidRaffles")}</TabsContent>

        <TabsContent value="my-created-raffles">
          {renderRaffleGrid(myCreatedRaffles, "rafflesPage.noCreatedRaffles")}
        </TabsContent>
      </Tabs>

      {selectedRaffle && (
        <RaffleDetailModal
          raffle={selectedRaffle}
          onJoinRaffle={handleJoinRaffle}
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}
    </div>
  )
}
