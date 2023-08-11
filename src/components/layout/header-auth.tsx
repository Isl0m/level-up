"use client"

import Link from "next/link"
import { LogOut } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

import { route } from "@/lib/config"
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar"
import { Button } from "@ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu"

export function HeaderAuth() {
  const { status, data } = useSession()
  return status === "authenticated" ? (
    <DropdownAvatar
      imageSrc={data.user.image || undefined}
      fallbackText={data.user.name?.[0] || undefined}
    />
  ) : (
    <SignIn />
  )
}

function DropdownAvatar({
  imageSrc,
  fallbackText,
}: {
  imageSrc?: string
  fallbackText?: string
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={imageSrc} />
          <AvatarFallback>{fallbackText}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={route.profile}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function SignIn() {
  return (
    <Button asChild variant={"link"}>
      <Link href={route.signin}>Sign in</Link>
    </Button>
  )
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
  )
}
