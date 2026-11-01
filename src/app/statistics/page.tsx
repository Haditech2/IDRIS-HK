"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TrendingUp, BarChart3, MapPin, Sparkles, Award } from "lucide-react";
import { LGA_STATS } from "@/lib/data";

export default function StatisticsPage() {
  const [selectedState, setSelectedState] = useState<"all" | "Kogi" | "Nasarawa">(
    "all"
  );

  const filteredStats = LGA_STATS.filter((item) => {
    if (selectedState !== "all" && item.state !== selectedState) return false;
    return true;
  });

  const totalPosters = filteredStats.reduce((sum, item) => sum + item.count, 0);
  const maxCount = Math.max(...filteredStats.map((item) => item.count));

  return (
    <div className="min-h-screen bg-gray-50/70 py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-gray-200">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <TrendingUp className="h-3.5 w-3.5" />
              Campaign Mobilization Analytics
            </span>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              Campaign Statistics
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-xl">
              Real-time breakdown of poster creation and digital grassroots
              support across federal constituencies and local government areas.
            </p>
          </div>

          <Link
            href="/generate"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-emerald-700 active:scale-95 self-start md:self-auto"
          >
            <Sparkles className="h-4 w-4" />
            <span>Generate Poster</span>
          </Link>
        </div>

        {/* Highlight KPI Cards */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Total Mobilized Posters
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BarChart3 className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-4 text-4xl font-black text-gray-900">
              {totalPosters.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-emerald-600 font-semibold">
              ↑ 18.4% increase this week
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Active Local Governments
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal/10 text-royal">
                <MapPin className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-4 text-4xl font-black text-gray-900">
              {filteredStats.length} LGAs
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Coverage across Kogi & Nasarawa
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Top Performing Constituency
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                <Award className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-4 text-2xl font-black text-gray-900">
              Ankpa / Lafia Central
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Highest volunteer sharing rate
            </p>
          </div>
        </div>

        {/* State Filter */}
        <div className="my-8 flex items-center justify-between">
          <div className="inline-flex rounded-xl bg-white p-1 border border-gray-200 shadow-sm">
            <button
              type="button"
              onClick={() => setSelectedState("all")}
              className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                selectedState === "all"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              All Constituencies
            </button>
            <button
              type="button"
              onClick={() => setSelectedState("Kogi")}
              className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                selectedState === "Kogi"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Kogi State (G-ONE Federal Constituency)
            </button>
            <button
              type="button"
              onClick={() => setSelectedState("Nasarawa")}
              className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                selectedState === "Nasarawa"
                  ? "bg-royal text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Nasarawa State (Wadada 2027)
            </button>
          </div>
        </div>

        {/* LGA Breakdown Table / Progress Bars */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Local Government Area Distribution
          </h2>

          <div className="space-y-6">
            {filteredStats.map((item) => {
              const percentage = Math.round((item.count / maxCount) * 100);

              return (
                <div key={item.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">{item.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({item.constituency})
                      </span>
                    </div>
                    <span className="font-mono font-bold text-primary">
                      {item.count.toLocaleString()} posters
                    </span>
                  </div>

                  <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        item.state === "Kogi" ? "bg-primary" : "bg-royal"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
