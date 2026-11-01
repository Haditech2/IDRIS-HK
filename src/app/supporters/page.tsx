"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Users, Filter, Clock, MapPin } from "lucide-react";
import { INITIAL_SUPPORTERS, Supporter, CONSTITUENCY_LGAS, G_ONE_CANDIDATE } from "@/lib/data";

export default function SupportersPage() {
  const [supporters, setSupporters] = useState<Supporter[]>(INITIAL_SUPPORTERS);
  const [selectedLga, setSelectedLga] = useState<string>("all");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("g_one_supporters");
      if (stored) {
        const parsed: Supporter[] = JSON.parse(stored);
        const combined = [...parsed, ...INITIAL_SUPPORTERS];
        const unique = Array.from(
          new Map(combined.map((item) => [item.id, item])).values()
        );
        setSupporters(unique);
      }
    } catch (e) {
      console.warn("Could not load supporters from storage:", e);
    }
  }, []);

  const filteredSupporters = supporters.filter((item) => {
    if (selectedLga !== "all" && item.lga !== selectedLga) {
      return false;
    }
    return true;
  });

  return (
    <div className="relative min-h-screen bg-gray-50/70 overflow-hidden">
      {/* Background Watermark */}
      <div className="pointer-events-none absolute -right-24 top-60 h-[800px] w-[500px] opacity-[0.03] lg:opacity-[0.05] -z-10">
        <Image
          src="/gone_standing.jpg"
          alt="G-ONE Background"
          fill
          className="object-cover object-top"
        />
      </div>

      {/* Hero Header with Thumbs-up Candidate Background */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-950 via-primary to-emerald-900 py-16 text-white shadow-lg">
        {/* Candidate Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/gone_thumbs.jpg"
            alt="Prince Gowon Enenche Thumbs Up"
            fill
            priority
            className="object-cover object-[center_35%] opacity-25 mix-blend-luminosity"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-emerald-950/90 via-primary/80 to-emerald-950/90" />

        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-emerald-200 border border-white/20 backdrop-blur-md">
                <Users className="h-3.5 w-3.5" />
                The G-1 Movement Wall
              </span>
              <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
                Constituency Supporters Wall
              </h1>
              <p className="text-sm sm:text-base text-emerald-100 max-w-xl leading-relaxed">
                See constituents from Ankpa, Omala, and Olamaboro standing united
                for Prince Gowon Enenche (G-ONE) for House of Representatives.
              </p>
            </div>

            <Link
              href="/generate"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-black text-primary shadow-xl transition hover:bg-emerald-50 active:scale-95 self-start md:self-auto"
            >
              <Sparkles className="h-4 w-4" />
              <span>Join the Wall (Generate Poster)</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters Bar */}
        <div className="my-8 flex flex-wrap items-center justify-between gap-4">
          {/* LGA Tabs */}
          <div className="inline-flex rounded-xl bg-white p-1 border border-gray-200 shadow-sm">
            <button
              type="button"
              onClick={() => setSelectedLga("all")}
              className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                selectedLga === "all"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              All Constituency LGAs ({supporters.length})
            </button>
            {CONSTITUENCY_LGAS.map((lga) => (
              <button
                key={lga.name}
                type="button"
                onClick={() => setSelectedLga(lga.name)}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                  selectedLga === lga.name
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {lga.name} LGA
              </button>
            ))}
          </div>

          <div className="text-xs font-bold text-muted-foreground">
            Showing {filteredSupporters.length} Supporters
          </div>
        </div>

        {/* Supporters Gallery Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
          {filteredSupporters.map((supporter) => (
            <div
              key={supporter.id}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
            >
              {/* Poster Image */}
              <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                <Image
                  src={supporter.imageUrl || "/poster_sample_gone.png"}
                  alt={`${supporter.name} G-ONE Campaign Poster`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 rounded-full bg-primary/90 px-2 py-0.5 text-[10px] font-black text-white backdrop-blur-md">
                  SDP
                </div>
              </div>

              {/* Card Info */}
              <div className="p-3.5 space-y-1">
                <p className="font-black text-sm text-gray-900 truncate">
                  {supporter.name}
                </p>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="font-bold text-primary flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {supporter.lga}
                    {supporter.ward && ` · ${supporter.ward}`}
                  </span>
                  <span className="flex items-center gap-1 text-[10px]">
                    <Clock className="h-3 w-3" />
                    Active
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSupporters.length === 0 && (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white py-16 text-center">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-base font-bold text-gray-900">
              No posters found for {selectedLga} LGA yet
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Be the first to create one and represent your ward!
            </p>
            <div className="mt-6">
              <Link
                href="/generate"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Generate Poster</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
