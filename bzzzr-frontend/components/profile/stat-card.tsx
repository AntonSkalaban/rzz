import { cn } from "@/lib/utils"

interface StatCardProps {
  label: string
  value: string | number
  className?: string
}

export function StatCard({ label, value, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-3 bg-[var(--bg-secondary)] rounded-xl p-4 card-shadow transition-all duration-200 hover:card-shadow-hover",
        className,
      )}
    >
      <span className="text-[var(--accent-gold)] text-sm font-medium mb-1 text-center">{label}</span>
      <span className="text-[var(--text-primary)] text-lg font-bold text-center">{value}</span>
    </div>
  )
}
