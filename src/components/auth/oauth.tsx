"use client";

import { signIn, signOut } from "next-auth/react";

export function GitHubOAuthButton() {
  return (
    <button onClick={() => signIn("github", { redirect: false })}>
      GitHub
    </button>
  );
}

export function GoogleOAuthButton() {
  return (
    <button onClick={() => signIn("google", { redirect: false })}>
      Google
    </button>
  );
}

export function LogOutButton() {
  return <button onClick={() => signOut()}>SignOut</button>;
}
