"use client"

import type React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface InsufficientFundsModalProps {
  trigger?: React.ReactNode // Optional trigger element
}

export function InsufficientFundsModal({ trigger }: InsufficientFundsModalProps) {
  return (
    <Dialog>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="sr-only">Insufficient Funds</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center text-center space-y-4">
          <Image
            src="/images/sad-arab-character.png"
            alt="Sad character"
            width={200} // Увеличено
            height={200} // Увеличено
            className="mb-2" // Уменьшен отступ
          />
          <p className="text-xl font-bold text-[var(--text-primary)]">Not enough funds on the balance.</p>
        </div>
        <div className="flex justify-center mt-4">
          <Button variant="secondary" className="w-full" onClick={() => console.log("Cancel")}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
