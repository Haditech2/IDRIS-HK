"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";
import { G_ONE_CANDIDATE } from "@/lib/data";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/generate", label: "Generate Poster" },
    { href: "/supporters", label: "Supporters Wall" },
    { href: "/statistics", label: "Constituency Stats" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md transition-all shadow-sm">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Brand Logo & Candidate Details */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm ring-1 ring-black/5 transition-transform group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Prince Gowon Enenche Official Logo"
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-2">
                <span className="font-black text-lg sm:text-xl tracking-tight text-gray-900">
                  {G_ONE_CANDIDATE.name}
                </span>
                <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-black text-primary border border-primary/20">
                  SDP
                </span>
              </div>
              <p className="text-xs font-semibold text-muted-foreground truncate max-w-[250px] sm:max-w-none">
                House of Reps · Ankpa, Omala, Olamaboro Constituency
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
                  className={`relative px-2 py-1 text-sm font-bold transition-colors duration-200 ${
                    isActive
                      ? "text-primary"
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
              className="hidden md:inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-900/10 transition-all hover:bg-emerald-700 active:scale-95"
            >
              <Sparkles className="h-4 w-4" />
              <span>Generate Poster</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex md:hidden items-center justify-center rounded-xl p-2 text-gray-700 hover:bg-gray-100 transition-colors"
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
                  className={`block rounded-xl px-4 py-3 text-base font-bold transition-colors ${
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
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-center text-sm font-bold text-white shadow hover:bg-emerald-700"
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
