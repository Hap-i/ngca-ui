"use client";

import { useState, useEffect } from "react";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Show sticky CTA after scrolling past hero (approx 500px)
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't show on contact and about pages
  if (pathname === "/contact" || pathname === "/about") {
    return null;
  }

  // Different CTA text based on page
  const getCTAText = () => {
    if (pathname === "/lane-hire") return "Book Now";
    if (pathname === "/group-sessions") return "Join Session";
    if (pathname === "/bowling-machine") return "Book Machine";
    if (pathname === "/side-arm") return "Book Session";
    if (pathname === "/coaching") return "Enquire Now";
    if (pathname === "/birthday-parties") return "Plan Party";
    return "Book a Lane";
  };

  const getCTALink = () => {
    if (pathname.startsWith("/lane-hire")) return "/lane-hire";
    if (pathname.startsWith("/group-sessions")) return "/group-sessions";
    if (pathname.startsWith("/bowling-machine")) return "/bowling-machine";
    if (pathname.startsWith("/side-arm")) return "/side-arm";
    if (pathname.startsWith("/coaching")) return "/coaching";
    if (pathname.startsWith("/birthday-parties")) return "/birthday-parties";
    return "/lane-hire";
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transform transition-transform duration-300 lg:hidden ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-background border-t shadow-lg px-4 py-3">
        <Button asChild className="w-full h-12 text-base font-semibold">
          <Link href={getCTALink()}>{getCTAText()}</Link>
        </Button>
      </div>
      {/* Spacer to prevent content from being hidden */}
      <div className="h-14 lg:hidden" />
    </div>
  );
}