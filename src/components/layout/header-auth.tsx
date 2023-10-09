"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

import { route } from "@/lib/config";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import { Button } from "@ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";

export function HeaderAuth() {
  const { status, data } = useSession();
  return status === "authenticated" ? (
    <DropdownAvatar
      imageSrc={data.user.image || undefined}
      fallbackText={data.user.name?.[0] || undefined}
      isAdmin={data.user.role === "admin"}
    />
  ) : (
    <SignIn />
  );
}

type DropdownAvatarProps = {
  imageSrc?: string;
  fallbackText?: string;
  isAdmin: boolean;
};

function DropdownAvatar({
  imageSrc,
  fallbackText,
  isAdmin,
}: DropdownAvatarProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={imageSrc} />
          <AvatarFallback className="select-none">
            {fallbackText}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild className="hover:cursor-pointer">
          <Link href={route.profile.self}>Profile</Link>
        </DropdownMenuItem>
        {isAdmin && (
          <DropdownMenuItem asChild className="hover:cursor-pointer">
            <Link href={route.dashboard.self}>Dashboard</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SignIn() {
  return (
    <Button asChild variant={"link"}>
      <Link href={route.signin}>Sign in</Link>
    </Button>
  );
}

function SignOut() {
  return (
    <Button
      variant={"link"}
      size={"sm"}
      onClick={() => signOut({ redirect: false })}
      className="hover:no-underline"
    >
      Sign Out <LogOut className="ml-2 h-4 w-4" />
    </Button>
  );
}
