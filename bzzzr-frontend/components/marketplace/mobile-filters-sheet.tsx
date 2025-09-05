"use client"

import type React from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { FiltersContent } from "./filters-content"

interface MobileFiltersSheetProps {
  trigger: React.ReactNode
}

export function MobileFiltersSheet({ trigger }: MobileFiltersSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        side="bottom" // Изменено на "bottom" для появления снизу
        className="fixed inset-0 z-50 rounded-xl bg-[var(--bg-secondary)] p-0 // Занимает весь экран, закругленные углы
        data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
        data-[state=closed]:slide-out-to-bottom-full data-[state=open]:slide-in-from-bottom-full // Анимация снизу
        sm:max-w-lg sm:mx-auto sm:my-auto sm:rounded-xl // Для центрирования на больших экранах, если нужно
        "
        onOpenAutoFocus={(event) => event.preventDefault()} // Предотвращаем автоматическую фокусировку
      >
        <FiltersContent />
      </SheetContent>
    </Sheet>
  )
}
