import Image from "next/image"
import { cn } from "@/lib/utils"
import type React from "react"

interface TonIconProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number
  height?: number
}

export function TonIcon({ width = 24, height = 24, className, ...props }: TonIconProps) {
  return (
    <div className={cn("relative flex items-center justify-center", className)} style={{ width, height }} {...props}>
      <Image src="/images/bzzzr-ton-icon.png" alt="TON Icon" width={width} height={height} className="object-contain" />
    </div>
  )
}
