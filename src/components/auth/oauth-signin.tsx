"use client";

import { useState } from "react";
import * as React from "react";
import { OAuthProviderType } from "next-auth/providers";
import { signIn } from "next-auth/react";

// import toast from "react-hot-toast";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

const oauthProviders = [
  { name: "Google", type: "google", icon: "google" },
  { name: "GitHub", type: "github", icon: "gitHub" },
] satisfies {
  name: string;
  type: OAuthProviderType;
  icon: keyof typeof Icons;
}[];

export function OAuthSignIn() {
  const [isLoading, setIsLoading] = useState<OAuthProviderType | null>(null);

  const oauthSignIn = async (providerType: OAuthProviderType) => {
    setIsLoading(providerType);
    const res = await signIn(providerType, {
      redirect: false,
      callbackUrl: "/",
    });
    if (res?.ok || !res?.error) {
      setIsLoading(null);
      return;
    }
    setIsLoading(null);
    // toast.error(res.error);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {oauthProviders.map((provider) => {
        const Icon = Icons[provider.icon];
        const isButtonLoading = isLoading === provider.type;
        return (
          <Button
            aria-label={`Sign in with ${provider.name}`}
            key={provider.name}
            variant="outline"
            type="button"
            disabled={isButtonLoading}
            onClick={() => oauthSignIn(provider.type)}
          >
            {isButtonLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icon className="mr-2 h-4 w-4" />
            )}
            {provider.name}
          </Button>
        );
      })}
    </div>
  );
}
