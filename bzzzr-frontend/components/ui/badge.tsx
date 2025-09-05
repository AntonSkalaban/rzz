"use client"

import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[var(--bg-secondary)] text-[var(--text-primary)]",
        secondary: "border-transparent bg-[var(--bg-tertiary)] text-[var(--text-secondary)]",
        destructive: "border-transparent bg-[var(--error)] text-white",
        outline: "text-[var(--text-primary)] border-[var(--border-primary)]",
        // Варианты для редкости предметов - теперь с прозрачным фоном и цветным текстом
        common: "border-transparent bg-transparent text-[var(--rare-common)]",
        uncommon: "border-transparent bg-transparent text-[var(--rare-uncommon)]",
        rare: "border-transparent bg-transparent text-[var(--rare-rare)]",
        epic: "border-transparent bg-transparent text-[var(--rare-epic)]",
        legendary: "border-transparent bg-transparent text-[var(--rare-legendary)]",
        mythic: "border-transparent bg-transparent text-[var(--rare-mythic)]",
        gold: "border-transparent bg-transparent text-[var(--accent-gold)]", // Для золотого также прозрачный фон и золотой текст
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
