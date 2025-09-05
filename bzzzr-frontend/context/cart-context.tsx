"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { CartNotification } from "@/components/ui/cart-notification" // Импортируем уведомление

export type CartItem = {
  id: number
  name: string
  image: string
  price: number
  rarity?: string // Добавим rarity для полноты данных
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: number) => void
  clearCart: () => void
  totalPrice: number
  cartItemsCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [notification, setNotification] = useState<{ message: string; visible: boolean } | null>(null)

  // Загрузка корзины из localStorage при монтировании
  useEffect(() => {
    const storedCart = localStorage.getItem("bzzzr_cart")
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
  }, [])

  // Сохранение корзины в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem("bzzzr_cart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      // Проверяем, есть ли уже такой товар в корзине (по ID)
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        // Если товар уже есть, можно обновить его количество или просто проигнорировать
        // В данном случае, просто не добавляем дубликат, если это уникальные предметы
        setNotification({ message: `${item.name} is already in your cart!`, visible: true })
        return prevItems
      } else {
        setNotification({ message: `${item.name} added to cart!`, visible: true })
        return [...prevItems, item]
      }
    })
  }

  const removeFromCart = (itemId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0)
  const cartItemsCount = cartItems.length

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    totalPrice,
    cartItemsCount,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
      {notification && (
        <CartNotification
          message={notification.message}
          visible={notification.visible}
          onClose={() => setNotification(null)}
        />
      )}
    </CartContext.Provider>
  )
}
