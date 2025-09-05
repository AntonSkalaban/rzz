import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TonIcon } from "@/components/icons/ton-icon"
import Image from "next/image" // Import Image component

interface LeaderboardEntry {
  rank: number
  username: string
  avatarUrl?: string
  score: number
}

interface LeaderboardProps {
  entries: LeaderboardEntry[]
}

export function Leaderboard({ entries }: LeaderboardProps) {
  return (
    <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4 text-center">Leaderboard</h3>
      <div className="space-y-3">
        {entries.map((entry) => (
          <div key={entry.rank} className="flex items-center justify-between bg-[var(--bg-tertiary)] p-3 rounded-lg">
            <div className="flex items-center gap-3">
              {entry.rank <= 3 ? (
                <div className="relative w-8 h-8 flex items-center justify-center">
                  {entry.rank === 1 && (
                    <Image
                      src="/images/medal-1.png"
                      alt="Gold Medal"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  )}
                  {entry.rank === 2 && (
                    <Image
                      src="/images/medal-2.png"
                      alt="Silver Medal"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  )}
                  {entry.rank === 3 && (
                    <Image
                      src="/images/medal-3.png"
                      alt="Bronze Medal"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  )}
                </div>
              ) : (
                <div className="w-8 h-8 flex items-center justify-center text-[var(--text-primary)] font-bold text-sm">
                  {entry.rank}
                </div>
              )}
              <Avatar size="sm">
                <AvatarImage src={entry.avatarUrl || "/placeholder.svg?height=32&width=32&query=user avatar"} />
                <AvatarFallback>{entry.username[0]}</AvatarFallback>
              </Avatar>
              <span className="text-[var(--text-primary)] font-semibold">{entry.username}</span>
            </div>
            <div className="flex items-center gap-1">
              <TonIcon width={16} height={16} className="text-[var(--accent-gold)]" />
              <span className="text-[var(--accent-gold)] font-bold">{entry.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Удалены старые SVG компоненты медалей, так как теперь используются изображения
