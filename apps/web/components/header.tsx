"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@workspace/ui/components/sheet";
import { Menu } from "lucide-react";

const navLinks = [
  { href: "/lane-hire", label: "Lane Hire" },
  { href: "/group-sessions", label: "Group Sessions" },
  { href: "/bowling-machine", label: "Bowling Machine" },
  { href: "/side-arm", label: "Side Arm" },
  { href: "/coaching", label: "Coaching" },
  { href: "/birthday-parties", label: "Birthday Parties" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/NGCA-transparent-logo.png"
              alt="Next Gen Cricket Academy"
              className="h-10 w-auto"
            />
            <span className="hidden lg:inline font-bold text-lg">Next Gen Cricket Academy</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.slice(0, 6).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Button asChild size="sm">
              <Link href="/lane-hire">Book Now</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-6 mt-8">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <img
                    src="/NGCA-transparent-logo.png"
                    alt="Next Gen Cricket Academy"
                    className="h-8 w-auto"
                  />
                  <span className="font-bold text-lg">Next Gen Cricket</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <Button asChild className="w-full mt-4">
                  <Link href="/lane-hire" onClick={() => setIsOpen(false)}>
                    Book Now
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}