"use client"

import { useEffect, useState } from "react"
import { CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface CartNotificationProps {
  message: string
  visible: boolean
  onClose: () => void
}

export function CartNotification({ message, visible, onClose }: CartNotificationProps) {
  const [show, setShow] = useState(visible)

  useEffect(() => {
    setShow(visible)
    if (visible) {
      const timer = setTimeout(() => {
        setShow(false)
        // Даем время для анимации исчезновения, затем вызываем onClose
        setTimeout(onClose, 300) // Соответствует длительности transition-out
      }, 3000) // Уведомление исчезнет через 3 секунды
      return () => clearTimeout(timer)
    }
  }, [visible, onClose])

  return (
    <div
      className={cn(
        "fixed bottom-4 left-1/2 -translate-x-1/2 z-50 p-4 rounded-xl shadow-lg flex items-center gap-3 transition-all duration-300 ease-in-out",
        "bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)]",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
      )}
    >
      {message.includes("added") ? (
        <CheckCircle className="w-6 h-6 text-[var(--success)]" />
      ) : (
        <XCircle className="w-6 h-6 text-[var(--warning)]" />
      )}
      <span className="font-medium">{message}</span>
    </div>
  )
}
