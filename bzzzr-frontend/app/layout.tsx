import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "BZZZR - Telegram MiniApp",
  description: "Decentralized marketplace for digital items",
    generator: 'v0.dev'
}

import ClientLayout from "./client-layout"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}


import './globals.css'