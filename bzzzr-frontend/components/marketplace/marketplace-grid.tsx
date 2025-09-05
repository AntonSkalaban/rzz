"use client"

import { ItemCard, type Rarity } from "@/components/item-card"
import { ItemDetailModal } from "@/components/modals/item-detail-modal"
import { useState } from "react"
import { useCart } from "@/context/cart-context" // Импортируем useCart

const mockItems = [
  { name: "Believer", rarity: "legendary", id: 2478, price: 53.5, imageUrl: "/placeholder.svg?height=200&width=150" },
  { name: "Pixel Knight", rarity: "epic", id: 1024, price: 25.0, imageUrl: "/placeholder.svg?height=200&width=150" },
  { name: "Void Walker", rarity: "mythic", id: 1, price: 150.0, imageUrl: "/placeholder.svg?height=200&width=150" },
  { name: "Forest Spirit", rarity: "rare", id: 567, price: 12.8, imageUrl: "/placeholder.svg?height=200&width=150" },
  { name: "Common Sword", rarity: "common", id: 8912, price: 1.2, imageUrl: "/placeholder.svg?height=200&width=150" },
  {
    name: "Uncommon Shield",
    rarity: "uncommon",
    id: 7345,
    price: 3.5,
    imageUrl: "/placeholder.svg?height=200&width=150",
  },
  { name: "Believer", rarity: "legendary", id: 2479, price: 54.0, imageUrl: "/placeholder.svg?height=200&width=150" },
  { name: "Pixel Mage", rarity: "epic", id: 1025, price: 28.0, imageUrl: "/placeholder.svg?height=200&width=150" },
]

export function MarketplaceGrid() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<(typeof mockItems)[0] | null>(null)
  const { addToCart } = useCart() // Получаем функцию addToCart

  const handleItemClick = (item: (typeof mockItems)[0]) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleBuyItem = (itemId: number) => {
    console.log(`Buying item with ID: ${itemId}`)
    // Implement actual purchase logic here
    setIsModalOpen(false) // Close modal after action
  }

  const handleAddToCartFromModal = (item: (typeof mockItems)[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      image: item.imageUrl || "/placeholder.svg",
      price: item.price || 0,
      rarity: item.rarity,
    })
    setIsModalOpen(false) // Закрываем модалку после добавления в корзину
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {mockItems.map((item) => (
          <ItemCard
            key={item.id}
            name={item.name}
            rarity={item.rarity as Rarity}
            id={item.id}
            price={item.price}
            imageUrl={item.imageUrl}
            onClick={handleItemClick}
          />
        ))}
      </div>

      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          onBuy={handleBuyItem}
          onAddToCart={handleAddToCartFromModal} // Передаем функцию добавления в корзину
          variant="marketplace"
        />
      )}
    </>
  )
}
