"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, SlidersHorizontal } from "lucide-react"
import { MobileFiltersSheet } from "./mobile-filters-sheet"

export function MarketplaceFilters() {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="relative flex-1">
        <Input variant="search" placeholder="поиск" className="pr-10" />
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
