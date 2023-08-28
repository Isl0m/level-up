"use client"

import { PropsWithChildren } from "react"
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"

import TRPCProvider from "@/app/_trpc/Provider"

export function ClientProviders({ children }: PropsWithChildren) {
  return (
    <TRPCProvider>
      <NextAuthSessionProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </NextAuthSessionProvider>
    </TRPCProvider>
  )
}
