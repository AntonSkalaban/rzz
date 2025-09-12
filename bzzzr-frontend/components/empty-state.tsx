import Image from "next/image"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  title: string
  description: string
  iconSrc?: string
  iconAlt?: string
  className?: string
  iconWidth?: number // Добавлен пропс для ширины иконки
  iconHeight?: number // Добавлен пропс для высоты иконки
  iconClassName?: string // Добавлен пропс для классов иконки
}

export function EmptyState({
  title,
  description,
  iconSrc,
  iconAlt,
  className,
  iconWidth = 120, // Значение по умолчанию
  iconHeight = 120, // Значение по умолчанию
  iconClassName, // Используем новый пропс
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center py-12 px-4", className)}>
      {iconSrc && (
        <Image
          src={iconSrc || "/placeholder.svg"}
          alt={iconAlt || "Empty state icon"}
          width={iconWidth} // Используем iconWidth
          height={iconHeight} // Используем iconHeight
          className={cn("animate-gold-pulse", iconClassName)} // Применяем iconClassName
        />
      )}
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">{title}</h2>
      {description && <p className="text-[var(--text-secondary)] max-w-md">{description}</p>}
    </div>
  )
}
