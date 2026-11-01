"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Users, Filter, Clock } from "lucide-react";
import { INITIAL_SUPPORTERS, Supporter, CAMPAIGNS } from "@/lib/data";

export default function SupportersPage() {
  const [supporters, setSupporters] = useState<Supporter[]>(INITIAL_SUPPORTERS);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedCampaign, setSelectedCampaign] = useState<string>("all");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("g_one_supporters");
      if (stored) {
        const parsed: Supporter[] = JSON.parse(stored);
        // Deduplicate
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
    if (selectedCampaign !== "all" && item.campaignId !== selectedCampaign) {
      return false;
    }
    if (selectedFilter !== "all" && item.lga !== selectedFilter) {
      return false;
    }
    return true;
  });

  // Unique LGAs from current supporters list
  const availableLgas = Array.from(
    new Set(supporters.map((item) => item.lga))
  ).sort();

  return (
    <div className="min-h-screen bg-gray-50/70 py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-gray-200">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <Users className="h-3.5 w-3.5" />
              Grassroots Solidarity
            </span>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              Our Supporters
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-xl">
              Thousands of proud citizens across Ankpa, Omala, Olamaboro, and
              beyond have generated their campaign solidarity posters.
            </p>
          </div>

          <Link
            href="/generate"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-emerald-700 active:scale-95 self-start md:self-auto"
          >
            <Sparkles className="h-4 w-4" />
            <span>Join the Wall (Generate Poster)</span>
          </Link>
        </div>

        {/* Filters Bar */}
        <div className="my-8 flex flex-wrap items-center justify-between gap-4">
          {/* Campaign Filter */}
          <div className="inline-flex rounded-xl bg-white p-1 border border-gray-200 shadow-sm">
            <button
              type="button"
              onClick={() => setSelectedCampaign("all")}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                selectedCampaign === "all"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              All Campaigns
            </button>
            <button
              type="button"
              onClick={() => setSelectedCampaign("gone")}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                selectedCampaign === "gone"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Prince Gowon Enenche (G-ONE)
            </button>
            <button
              type="button"
              onClick={() => setSelectedCampaign("wadada")}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                selectedCampaign === "wadada"
                  ? "bg-royal text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Wadada 2027
            </button>
          </div>

          {/* LGA Select Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 shadow-sm focus:border-primary focus:outline-none"
            >
              <option value="all">All Local Governments</option>
              {availableLgas.map((lga) => (
                <option key={lga} value={lga}>
                  {lga}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Supporters Gallery Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
          {filteredSupporters.map((supporter) => {
            const campaignData = CAMPAIGNS[supporter.campaignId] || CAMPAIGNS.gone;

            return (
              <div
                key={supporter.id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
              >
                {/* Poster Image */}
                <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                  <Image
                    src={supporter.imageUrl || "/poster_sample_gone.png"}
                    alt={`${supporter.name} Campaign Poster`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-md">
                    {supporter.campaignId === "gone" ? "G-ONE" : "Wadada"}
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-3.5 space-y-1">
                  <p className="font-bold text-sm text-gray-900 truncate">
                    {supporter.name}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="font-semibold text-primary">
                      {supporter.lga}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Recently
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredSupporters.length === 0 && (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white py-16 text-center">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-base font-bold text-gray-900">
              No posters found for this filter
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Be the first to create one for this constituency!
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
