"use client"

import { PropsWithChildren } from "react"
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"

export function ClientProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
    </ThemeProvider>
  )
}
