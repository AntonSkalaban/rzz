import { FiltersContent } from "./filters-content"

export function DesktopFiltersSidebar() {
  return (
    <aside className="hidden lg:block w-80 bg-[var(--bg-secondary)] rounded-xl overflow-hidden shrink-0">
      <FiltersContent />
    </aside>
  )
}
