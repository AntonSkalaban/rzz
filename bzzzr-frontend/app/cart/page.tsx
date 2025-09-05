"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TonIcon } from "@/components/icons/ton-icon"
import { EmptyState } from "@/components/empty-state"
import { useRouter } from "next/navigation"
import { CartItemCard } from "@/components/cart/cart-item-card"
import { CartItemDetailModal } from "@/components/modals/cart-item-detail-modal"
import { cn } from "@/lib/utils"
import { useCart } from "@/context/cart-context"
import { useLanguage } from "@/context/language-context" // Импортируем useLanguage

export default function CartPage() {
  const router = useRouter()
  const { cartItems, removeFromCart, totalPrice, clearCart } = useCart()
  const { t } = useLanguage() // Получаем функцию перевода

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<(typeof cartItems)[0] | null>(null)

  const isCartEmpty = cartItems.length === 0

  const handleItemClick = (item: (typeof cartItems)[0]) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleRemoveFromCart = (itemId: number) => {
    removeFromCart(itemId)
    console.log(`Товар с ID ${itemId} удален из корзины.`)
  }

  const handleBuyAll = () => {
    console.log("Покупка всех товаров совершена!")
    // Здесь будет логика покупки всех товаров
    clearCart() // Очищаем корзину после покупки
  }

  const handleBuySingleItem = (itemId: number) => {
    console.log(`Покупка товара с ID ${itemId} совершена!`)
    // Здесь будет логика покупки одного товара
    removeFromCart(itemId) // Удаляем товар из корзины после покупки
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-[var(--bg-primary)] p-4">
      <h1 className="text-center text-2xl font-bold text-[var(--accent-gold)] mb-6">{t("cartPage.title")}</h1>

      <div className={cn("flex-1", { "backdrop-blur-sm": isModalOpen })}>
        {isCartEmpty ? (
          <EmptyState
            title={t("cartPage.emptyCartTitle")}
            description={t("cartPage.emptyCartDescription")}
            iconSrc="/images/sad-arab-character.png"
            iconAlt="Sad character"
            className="flex-1 flex flex-col justify-center items-center"
            iconWidth={200}
            iconHeight={200}
            iconClassName="mb-2"
          >
            <Button onClick={() => router.push("/")} className="mt-4">
              {t("cartPage.goToMarketplace")}
            </Button>
          </EmptyState>
        ) : (
          <>
            <div className="space-y-4 flex-1">
              {cartItems.map((item) => (
                <CartItemCard key={item.id} item={item} onClick={handleItemClick} onRemove={handleRemoveFromCart} />
              ))}
            </div>
            <div className="flex gap-2 mt-6">
              <Button variant="secondary" className="flex-1" onClick={() => router.back()}>
                {t("cartPage.continueShopping")}
              </Button>
              <Button variant="primary" className="flex-1" onClick={handleBuyAll}>
                {t("cartPage.buyAll")} {totalPrice} <TonIcon width={16} height={16} className="ml-1" />
              </Button>
            </div>
          </>
        )}
      </div>

      {selectedItem && (
        <CartItemDetailModal
          item={selectedItem}
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          onBuySingleItem={handleBuySingleItem}
          onRemoveFromCart={handleRemoveFromCart}
        />
      )}
    </div>
  )
}
