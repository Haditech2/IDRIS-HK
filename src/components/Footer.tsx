import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-10 py-12 lg:flex-row lg:items-end">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-gray-900">
                G-ONE & WADADA SUPPORT
              </span>
              <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                Official
              </span>
            </div>
            <nav className="mb-4 flex flex-wrap items-center gap-6 text-sm font-medium">
              <Link
                href="/"
                className="text-gray-600 transition-colors hover:text-primary"
              >
                Home
              </Link>
              <Link
                href="/generate"
                className="text-gray-600 transition-colors hover:text-primary"
              >
                Generate
              </Link>
              <Link
                href="/supporters"
                className="text-gray-600 transition-colors hover:text-primary"
              >
                Supporters
              </Link>
              <Link
                href="/statistics"
                className="text-gray-600 transition-colors hover:text-primary"
              >
                Statistics
              </Link>
            </nav>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} G-ONE (Prince Gowon Enenche) & Wadada
              Support Platform. All rights reserved.
            </p>
          </div>

          {/* Campaign Network Logos */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <div className="relative h-7 w-28 grayscale opacity-80 transition hover:grayscale-0 hover:opacity-100">
              <Image
                src="/wya_footer.png"
                alt="Youth Ambassadors"
                fill
                className="object-contain"
              />
            </div>
            <div className="relative h-6 w-28 grayscale opacity-80 transition hover:grayscale-0 hover:opacity-100">
              <Image
                src="/awa_footer.png"
                alt="Campaign Network"
                fill
                className="object-contain"
              />
            </div>
            <div className="relative h-8 w-28 grayscale opacity-80 transition hover:grayscale-0 hover:opacity-100">
              <Image
                src="/wtn_footer.png"
                alt="Transformation Network"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
