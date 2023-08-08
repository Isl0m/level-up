import { ThemeToggle } from "../theme-toggle";

import { SignInOrOut } from "./signin-or-out";

export async function Header() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <div>
          <a href="/">Level Up</a>
        </div>
        <div className="flex items-center gap-4">
          <SignInOrOut />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
