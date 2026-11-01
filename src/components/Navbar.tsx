"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/generate", label: "Generate" },
    { href: "/supporters", label: "Supporters" },
    { href: "/statistics", label: "Statistics" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/85 backdrop-blur-md transition-all">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Brand Logo & Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition-transform group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="G-ONE & Wadada Support"
                width={48}
                height={48}
                priority
                className="object-contain p-1"
              />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-gray-900">
                  G-ONE 2027
                </span>
                <span className="hidden sm:inline-block rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                  SDP
                </span>
              </div>
              <p className="text-xs font-medium text-muted-foreground">
                Progress · In God We Trust
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-2 py-1 text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? "text-primary font-bold"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute left-0 -bottom-1 h-0.5 w-full rounded-full bg-primary transition-all duration-300" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/generate"
              className="hidden md:inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-light active:scale-95"
            >
              <Sparkles className="h-4 w-4" />
              <span>Generate Poster</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex md:hidden items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-gray-200 bg-white md:hidden animate-in slide-in-from-top duration-200">
          <div className="space-y-1 px-4 pt-3 pb-6 sm:px-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-base font-semibold transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3">
              <Link
                href="/generate"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-center text-sm font-bold text-white shadow hover:bg-primary-light"
              >
                <Sparkles className="h-4 w-4" />
                <span>Generate Poster Now</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
