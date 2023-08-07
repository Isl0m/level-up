import { ThemeToggle } from "../theme-toggle";

export function Header() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <div>
          <a href="/">Level Up</a>
        </div>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
