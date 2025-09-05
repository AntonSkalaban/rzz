"use client"

import type React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { TonIcon } from "@/components/icons/ton-icon" // Import TonIcon

interface ConfirmPurchaseModalProps {
  itemName: string
  itemImage: string
  itemId: number
  price: number
  onConfirm: () => void
  trigger?: React.ReactNode // Optional trigger element
}

export function ConfirmPurchaseModal({
  itemName,
  itemImage,
  itemId,
  price,
  onConfirm,
  trigger,
}: ConfirmPurchaseModalProps) {
  return (
    <Dialog>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[var(--text-primary)]">
            Confirm Purchase
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center text-center space-y-4">
          <Image
            src={itemImage || "/placeholder.svg?height=120&width=120&query=item image"}
            alt={itemName}
            width={120}
            height={120}
            className="rounded-lg"
          />
          <h3 className="text-xl font-bold text-[var(--text-primary)]">{itemName}</h3>
          <span className="text-[var(--text-muted)] text-sm">#{itemId}</span>
          <div className="flex items-center gap-2 text-xl font-bold text-[var(--accent-gold)]">
            Price: <TonIcon width={20} height={20} /> {price} {/* Adjusted size */}
          </div>
          <p className="text-[var(--text-secondary)]">Are you sure you want to buy this gift?</p>
        </div>
        <div className="flex gap-2 mt-4">
          <Button variant="secondary" className="flex-1" onClick={() => console.log("Cancel")}>
            Cancel
          </Button>
          <Button variant="primary" className="flex-1" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
