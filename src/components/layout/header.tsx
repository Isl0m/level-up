import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <div>
          <a href="/">Level Up</a>
        </div>
        <div className="flex items-center gap-4">
          <SignIn />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function SignIn() {
  return (
    <Button asChild variant={"link"}>
      <Link href={"/"}>Sign in</Link>
    </Button>
  );
}
