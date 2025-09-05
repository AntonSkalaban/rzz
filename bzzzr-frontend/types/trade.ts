export interface TradeItem {
  id: string
  itemName: string
  itemImage: string
  price: number
  date: string // e.g., "30 Июня 13:11"
  type: "Покупка" | "Продажа" // "Buy" or "Sell"
  itemId: number
}
