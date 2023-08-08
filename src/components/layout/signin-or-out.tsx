"use client";
import { Button } from "@ui/button";
import Link from "next/link";

import { signOut, useSession } from "next-auth/react";
export function SignInOrOut() {
  const { status } = useSession();
  return status === "authenticated" ? <SignOut /> : <SignIn />;
}

function SignIn() {
  return (
    <Button asChild variant={"link"}>
      <Link href={"/signin"}>Sign in</Link>
    </Button>
  );
}

function SignOut() {
  return (
    <Button variant={"link"} onClick={() => signOut({ redirect: false })}>
      Sign Out
    </Button>
  );
}
