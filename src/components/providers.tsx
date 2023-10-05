"use client";

import { PropsWithChildren } from "react";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

import TRPCProvider from "@/app/_trpc/Provider";

export default function ClientProviders({ children }: PropsWithChildren) {
  return (
    <TRPCProvider>
      <NextAuthSessionProvider>
        <Toaster richColors />
        {children}
      </NextAuthSessionProvider>
    </TRPCProvider>
  );
}
