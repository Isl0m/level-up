"use client";

import { PropsWithChildren } from "react";
import { ThemeProvider } from "next-themes";

export default function ClientProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
