import React from "react";
import Link from "next/link";
import Image from "next/image";
import { G_ONE_CANDIDATE } from "@/lib/data";
import { ShieldCheck, Globe, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-12 lg:gap-16">
          {/* Brand & Campaign Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <Image
                  src="/logo.png"
                  alt="Prince Gowon Enenche Official Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-black text-2xl tracking-tight text-gray-900">
                  G-ONE 2027
                </span>
                <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-black text-primary border border-primary/20">
                  SDP OFFICIAL
                </span>
              </div>
            </div>
            <p className="text-sm font-semibold text-gray-700">
              {G_ONE_CANDIDATE.name} ({G_ONE_CANDIDATE.moniker})
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-md">
              A transformative grassroots platform dedicated to effective,
              accountable, and people-centered representation for the good people
              of Ankpa, Omala, and Olamaboro Federal Constituency, Kogi State.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={G_ONE_CANDIDATE.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-100 transition"
              >
                <Globe className="h-3.5 w-3.5 text-primary" />
                <span>Visit g-one-chi.vercel.app</span>
                <ExternalLink className="h-3 w-3 text-gray-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-black uppercase tracking-wider text-gray-900">
              Navigation
            </p>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 transition hover:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/generate"
                  className="text-gray-600 transition hover:text-primary"
                >
                  Generate Poster
                </Link>
              </li>
              <li>
                <Link
                  href="/supporters"
                  className="text-gray-600 transition hover:text-primary"
                >
                  Supporters Wall
                </Link>
              </li>
              <li>
                <Link
                  href="/statistics"
                  className="text-gray-600 transition hover:text-primary"
                >
                  Constituency Statistics
                </Link>
              </li>
            </ul>
          </div>

          {/* Constituency Coverage */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-black uppercase tracking-wider text-gray-900">
              Federal Constituency
            </p>
            <ul className="space-y-2 text-xs font-medium text-gray-600">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                <span>Ankpa Local Government Area</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                <span>Omala Local Government Area</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                <span>Olamaboro Local Government Area</span>
              </li>
            </ul>
            <p className="text-[11px] text-muted-foreground pt-1">
              Social Democratic Party (SDP) · Kogi State, Nigeria
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {G_ONE_CANDIDATE.movementName} &{" "}
            {G_ONE_CANDIDATE.name} Campaign Organization. All rights reserved.
          </p>
          <p className="font-semibold text-gray-600">
            Progress · In God We Trust · I Reserved For Him My Vote
          </p>
        </div>
      </div>
    </footer>
  );
}
