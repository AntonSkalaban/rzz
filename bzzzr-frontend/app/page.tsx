import { DesktopFiltersSidebar } from "@/components/marketplace/desktop-filters-sidebar"
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters"
import { MarketplaceGrid } from "@/components/marketplace/marketplace-grid"

export default function MarketplacePage() {
  return (
    <div className="flex gap-6 p-4">
      {/* Sidebar - виден только на десктопе */}
      <DesktopFiltersSidebar />

      {/* Основной контент */}
      <div className="flex-1 gradient-bg-marketplace-page rounded-xl p-4">
        {/* Фильтры для мобильных и планшетов */}
        <div className="lg:hidden mb-4">
          <MarketplaceFilters />
        </div>
        <MarketplaceGrid />
      </div>
    </div>
  )
}
