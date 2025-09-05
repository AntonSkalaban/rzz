"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useState, useLayoutEffect, useRef } from "react"
import { useLanguage } from "@/context/language-context" // Импортируем useLanguage

const navigationItems = [
  { href: "/", translationKey: "navigation.marketplace" },
  { href: "/items", translationKey: "navigation.myItems" },
  { href: "/raffles", translationKey: "navigation.raffles" },
  { href: "/trades", translationKey: "navigation.trades" },
  { href: "/tasks", translationKey: "navigation.tasks" },
]

export function Navigation() {
  const pathname = usePathname()
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 })
  const itemRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({})
  const { t, language } = useLanguage() // Получаем функцию перевода и текущий язык

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const currentPath = pathname === "/" ? "/" : pathname
      const activeLink = itemRefs.current[currentPath]

      if (activeLink) {
        const newWidth = activeLink.offsetWidth
        if (newWidth > 0) {
          setIndicatorStyle({
            left: activeLink.offsetLeft,
            width: newWidth,
            opacity: 1, // Делаем видимым, как только позиция определена
          })
        } else {
          // Если ширина 0, скрываем индикатор, пока не получим корректные размеры
          setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }))
        }
      } else {
        // Если активная ссылка не найдена, скрываем индикатор
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }))
      }
    }

    let animationFrameId: number | null = null

    const scheduleUpdate = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      animationFrameId = requestAnimationFrame(updateIndicator)
    }

    // Вызываем обновление при монтировании и изменении pathname или языка
    scheduleUpdate()

    // Обновляем при изменении размера окна
    window.addEventListener("resize", scheduleUpdate)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      window.removeEventListener("resize", scheduleUpdate)
    }
  }, [pathname, t, language]) // Перезапускаем эффект при изменении пути, функции перевода или языка

  const linkPaddingClass = language === "en" ? "px-4" : "px-3" // Определяем класс отступа в зависимости от языка

  return (
    <nav
      key={pathname + language} // Добавлен key для принудительного перемонтирования при смене языка
      className="relative flex items-center gap-0.5 p-2 bg-[var(--bg-primary)] border-b border-[var(--border-primary)] overflow-x-auto"
    >
      {/* Анимированный индикатор */}
      <div
        className="absolute top-1 bottom-1 rounded-lg gradient-gold transition-all duration-300 ease-out z-0"
        style={indicatorStyle}
      />

      {navigationItems.map((item) => {
        const isActive = pathname === item.href || (item.href === "/" && pathname === "/")

        return (
          <Link
            key={item.href}
            href={item.href}
            ref={(el) => (itemRefs.current[item.href] = el)}
            className={cn(
              "relative flex items-center justify-center py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 z-10",
              linkPaddingClass, // Применяем класс отступа, зависящий от языка
              isActive
                ? "text-black" // Текст становится черным, когда активен
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]",
            )}
          >
            {t(item.translationKey)}
          </Link>
        )
      })}
    </nav>
  )
}
