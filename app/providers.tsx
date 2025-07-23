"use client"

import React from "react"
import { ThemeProvider } from "next-themes"
import { GroveProvider } from "@/lib/stores/grove-store"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <GroveProvider>{children}</GroveProvider>
    </ThemeProvider>
  )
}
