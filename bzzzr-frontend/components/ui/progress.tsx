"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const progressVariants = cva("relative h-2 w-full overflow-hidden rounded-full", {
  variants: {
    variant: {
      default: "bg-[var(--bg-tertiary)]",
      gold: "bg-[var(--bg-tertiary)]",
      success: "bg-[var(--bg-tertiary)]",
    },
    size: {
      sm: "h-1",
      default: "h-2",
      lg: "h-3",
      xl: "h-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

const progressIndicatorVariants = cva("h-full w-full flex-1 transition-all duration-300 ease-out", {
  variants: {
    variant: {
      default: "gradient-gold",
      gold: "gradient-gold",
      success: "bg-[var(--success)]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, variant, size, value, ...props }, ref) => (
    <ProgressPrimitive.Root ref={ref} className={cn(progressVariants({ variant, size, className }))} {...props}>
      <ProgressPrimitive.Indicator
        className={cn(progressIndicatorVariants({ variant }))}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  ),
)
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress, progressVariants }
