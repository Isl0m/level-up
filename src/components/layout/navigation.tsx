"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { route } from "@/lib/config";
import { cn } from "@/lib/utils";

const navItems = [
  { href: route.home, label: "Home" },
  { href: route.course.self, label: "Courses" },
];

export function Navigation() {
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {navItems.map(({ href, label }) => (
        <NavItem href={href} key={href}>
          {label}
        </NavItem>
      ))}
    </nav>
  );
}

type NavItemProps = {
  href: string;
  children: ReactNode;
};

function NavItem({ href, children }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname.slice(1).match(href.slice(1) || "/home");
  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        !isActive && "text-muted-foreground"
      )}
    >
      {children}
    </Link>
  );
}
