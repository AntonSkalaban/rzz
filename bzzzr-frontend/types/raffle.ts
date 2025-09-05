export interface Raffle {
  id: string
  name: string
  imageUrl: string
  prize: number // In TON (reward)
  costToJoin: number // In TON (entry fee) - NEW
  participants: number
  maxParticipants: number
  endTime: Date
  status: "active" | "ended" | "drawing"
  userParticipated: boolean
  userWon?: boolean // Only relevant if status is 'ended' and userParticipated is true
  createdByUserId?: number // NEW: For 'My Created' raffles
}
