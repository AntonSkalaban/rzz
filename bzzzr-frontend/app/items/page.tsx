"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ItemCard, type Rarity } from "@/components/item-card"
import { EmptyState } from "@/components/empty-state"
import { ItemDetailModal } from "@/components/modals/item-detail-modal"
import { SetPriceModal } from "@/components/modals/set-price-modal"
import { useLanguage } from "@/context/language-context"

const mockMyItems = [
  { name: "Believer", rarity: "legendary", id: 2478, price: 0, imageUrl: "/placeholder.svg?height=200&width=150" },
  { name: "Pixel Knight", rarity: "epic", id: 1024, price: 0, imageUrl: "/placeholder.svg?height=200&width=150" },
]

const mockOnSaleItems = [
  { name: "Void Walker", rarity: "mythic", id: 1, price: 150.0, imageUrl: "/placeholder.svg?height=200&width=150" },
  { name: "Forest Spirit", rarity: "rare", id: 567, price: 12.8, imageUrl: "/placeholder.svg?height=200&width=150" },
]

export default function ItemsPage() {
  const [activeTab, setActiveTab] = useState("not-for-sale")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<(typeof mockMyItems)[0] | null>(null)
  const [itemForPricing, setItemForPricing] = useState<(typeof mockMyItems)[0] | null>(null)
  const [items, setItems] = useState({
    notForSale: mockMyItems,
    onSale: mockOnSaleItems,
  })
  const { t } = useLanguage()

  const handlePlaceForSale = (itemId: number) => {
    // Найти товар для установки цены
    const item = [...items.notForSale, ...items.onSale].find((item) => item.id === itemId)
    if (item) {
      if (item.price === 0) {
        // Товар не на продаже - открываем модальное окно для установки цены
        setItemForPricing(item)
        setIsPriceModalOpen(true)
      } else {
        // Товар на продаже - убираем с продажи
        handleRemoveFromSale(itemId)
      }
    }
    setIsModalOpen(false)
  }

  const handleRemoveFromSale = (itemId: number) => {
    // Перемещаем товар из "на продаже" в "не на продаже"
    const itemToMove = items.onSale.find((item) => item.id === itemId)
    if (itemToMove) {
      setItems((prev) => ({
        notForSale: [...prev.notForSale, { ...itemToMove, price: 0 }],
        onSale: prev.onSale.filter((item) => item.id !== itemId),
      }))
    }
    console.log(`Item ${itemId} removed from sale.`)
  }

  const handleConfirmPrice = (itemId: number, price: number) => {
    // Перемещаем товар из "не на продаже" в "на продаже" с установленной ценой
    const itemToMove = items.notForSale.find((item) => item.id === itemId)
    if (itemToMove) {
      setItems((prev) => ({
        notForSale: prev.notForSale.filter((item) => item.id !== itemId),
        onSale: [...prev.onSale, { ...itemToMove, price }],
      }))
    }
    console.log(`Item ${itemId} placed for sale at ${price} TON`)
  }

  const handleItemClick = (item: (typeof mockMyItems)[0]) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const currentItems = activeTab === "not-for-sale" ? items.notForSale : items.onSale
  const isEmpty = currentItems.length === 0

  return (
    <div className="flex-1 rounded-xl p-4 gradient-bg-marketplace-page">
      <div className="p-4">
        <div className="flex flex-col gap-4 mb-4">
          <div className="relative">
            <Input variant="search" placeholder={t("itemsPage.searchByCharacteristics")} className="pr-10" />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
          </div>
        </div>

        <Tabs defaultValue="not-for-sale" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="not-for-sale">{t("itemsPage.notForSale")}</TabsTrigger>
            <TabsTrigger value="on-sale">{t("itemsPage.onSale")}</TabsTrigger>
          </TabsList>
          <TabsContent value="not-for-sale">
            {isEmpty ? (
              <EmptyState
                title={t("itemsPage.emptyVaultTitle")}
                description={t("itemsPage.emptyVaultDescription")}
                iconSrc="/images/empty-state-icon.png"
              />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-4">
                {currentItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    name={item.name}
                    rarity={item.rarity as Rarity}
                    id={item.id}
                    variant="my-item"
                    onPlaceForSale={handlePlaceForSale}
                    imageUrl={item.imageUrl}
                    onClick={handleItemClick}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="on-sale">
            {isEmpty ? (
              <EmptyState
                title={t("itemsPage.noItemsOnSaleTitle")}
                description={t("itemsPage.noItemsOnSaleDescription")}
                iconSrc="/images/empty-state-icon.png"
              />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-4">
                {currentItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    name={item.name}
                    rarity={item.rarity as Rarity}
                    id={item.id}
                    variant="my-item"
                    price={item.price}
                    onPlaceForSale={handlePlaceForSale}
                    imageUrl={item.imageUrl}
                    onClick={handleItemClick}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          onPlaceForSale={handlePlaceForSale}
          variant="my-item"
        />
      )}

      <SetPriceModal
        item={itemForPricing}
        isOpen={isPriceModalOpen}
        onOpenChange={setIsPriceModalOpen}
        onConfirm={handleConfirmPrice}
      />
    </div>
  )
}
