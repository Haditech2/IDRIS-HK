"use client";

import React from "react";
import Link from "next/link";
import { TrendingUp, BarChart3, MapPin, Sparkles, Award, ShieldCheck } from "lucide-react";
import { CONSTITUENCY_LGAS, G_ONE_CANDIDATE } from "@/lib/data";

export default function StatisticsPage() {
  const totalPosters = CONSTITUENCY_LGAS.reduce((sum, item) => sum + item.count, 0);
  const maxCount = Math.max(...CONSTITUENCY_LGAS.map((item) => item.count));
  const totalWards = CONSTITUENCY_LGAS.reduce((sum, item) => sum + item.wards.length, 0);

  return (
    <div className="min-h-screen bg-gray-50/70 py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-gray-200">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <TrendingUp className="h-3.5 w-3.5" />
              Constituency Grassroots Data
            </span>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              Campaign Mobilization Statistics
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-xl">
              Real-time grassroots engagement metrics for Prince Gowon Enenche (G-ONE)
              across Ankpa, Omala, and Olamaboro Federal Constituency.
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
              ↑ High digital engagement across all 3 LGAs
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Constituency Wards Reached
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-4 text-4xl font-black text-gray-900">
              {totalWards} Wards
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Ankpa (11) · Omala (10) · Olamaboro (10)
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Official Candidate
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Award className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-4 text-xl font-black text-gray-900">
              {G_ONE_CANDIDATE.name}
            </p>
            <p className="mt-1 text-xs text-primary font-bold">
              {G_ONE_CANDIDATE.party} · House of Representatives
            </p>
          </div>
        </div>

        {/* LGA Breakdown */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm space-y-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900">
              Local Government Area Distribution
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Solidarity poster creation volume by LGA in the Federal Constituency
            </p>
          </div>

          <div className="space-y-6">
            {CONSTITUENCY_LGAS.map((item) => {
              const percentage = Math.round((item.count / maxCount) * 100);

              return (
                <div key={item.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-gray-900 text-base">
                        {item.name} LGA
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({item.wards.length} electoral wards)
                      </span>
                    </div>
                    <span className="font-mono font-black text-primary">
                      {item.count.toLocaleString()} posters
                    </span>
                  </div>

                  <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-700"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Wards List per LGA */}
          <div className="pt-6 border-t border-gray-100 grid gap-6 md:grid-cols-3">
            {CONSTITUENCY_LGAS.map((lga) => (
              <div key={lga.name} className="rounded-2xl bg-gray-50 p-4 border border-gray-100 space-y-2">
                <p className="font-black text-sm text-gray-900 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>{lga.name} LGA Wards</span>
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {lga.wards.map((w) => (
                    <span
                      key={w}
                      className="rounded-md bg-white px-2 py-0.5 text-[10px] font-semibold text-gray-700 border border-gray-200"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
