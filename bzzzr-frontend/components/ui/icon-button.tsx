"use client"

import * as React from "react"
import { Button, type ButtonProps } from "./button"
import { cn } from "@/lib/utils"

interface IconButtonProps extends Omit<ButtonProps, "children"> {
  icon: React.ReactNode
  badge?: number | string
  badgeColor?: "error" | "success" | "warning" | "gold"
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, badge, badgeColor = "error", className, ...props }, ref) => {
    return (
      <div className="relative">
        <Button ref={ref} variant="secondary" size="icon" className={cn("relative", className)} {...props}>
          {icon}
        </Button>
        {badge && (
          <div
            className={cn(
              "absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full text-xs font-bold flex items-center justify-center",
              {
                "bg-[var(--error)] text-white": badgeColor === "error",
                "bg-[var(--success)] text-white": badgeColor === "success",
                "bg-[var(--warning)] text-black": badgeColor === "warning",
                "gradient-gold text-black": badgeColor === "gold",
              },
            )}
          >
            {badge}
          </div>
        )}
      </div>
    )
  },
)
IconButton.displayName = "IconButton"

export { IconButton }
