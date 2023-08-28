"use client"

import { ThemeToggle } from "@components/theme-toggle"

import { HeaderAuth } from "./header-auth"

export const HeaderActins = () => {
  return (
    <div className="flex items-center gap-4">
      <HeaderAuth />
      <ThemeToggle />
    </div>
  )
}
