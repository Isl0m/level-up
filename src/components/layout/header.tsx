import { route } from "@/lib/config";

import { HeaderActins } from "./header-actions";
import { Navigation } from "./navigation";

export function Header() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <div>
          <a href={route.home}>Level Up</a>
        </div>
        <Navigation />
        <HeaderActins />
      </div>
    </header>
  );
}
