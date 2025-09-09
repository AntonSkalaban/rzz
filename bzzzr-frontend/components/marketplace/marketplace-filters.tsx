"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, SlidersHorizontal } from "lucide-react"
import { MobileFiltersSheet } from "./mobile-filters-sheet"
import { useLanguage } from "@/context/language-context"

export function MarketplaceFilters() {
  const { t } = useLanguage()

  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="relative flex-1">
        <Input variant="search" placeholder={t('common.searchPlaceholder')} className="pr-10" />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
      </div>
      <MobileFiltersSheet
        trigger={
          <Button variant="secondary" size="icon-default" className="shrink-0">
            <SlidersHorizontal className="w-5 h-5" />
            <span className="sr-only">Filters</span>
          </Button>
        }
      />
    </div>
  )
}
