"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  Users,
  ShieldCheck,
  TrendingUp,
  Share2,
} from "lucide-react";
import { CAMPAIGNS, LGA_STATS } from "@/lib/data";

export default function HomePage() {
  const [activeCampaign, setActiveCampaign] = useState<"gone" | "wadada">("gone");
  const [currentLgaIndex, setCurrentLgaIndex] = useState(0);

  // Cycle through LGAs for statistics spotlight
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLgaIndex((prev) => (prev + 1) % LGA_STATS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const currentLga = LGA_STATS[currentLgaIndex];
  const campaign = CAMPAIGNS[activeCampaign];

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gray-950 text-white">
        {/* Candidate Background Image */}
        <div className="absolute inset-0 -z-20">
          <Image
            src={activeCampaign === "gone" ? "/media_user.jpg" : "/candidate.png"}
            alt={campaign.candidateName}
            fill
            priority
            className="object-cover object-top opacity-55 transition-opacity duration-700"
          />
        </div>

        {/* Cinematic Backdrop Overlays */}
        <div className="absolute inset-0 z-0 bg-black/55 backdrop-blur-[2px]" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-emerald-950/95 via-emerald-900/60 to-black/30" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-950 via-transparent to-black/40" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top_left,rgba(0,108,67,0.35),transparent_50%)]" />

        <div className="relative z-20 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Campaign Tag Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>
                  {activeCampaign === "gone"
                    ? "Kogi 2027 · A Voice of Representation"
                    : "Nasarawa 2027 · In God We Trust"}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                Generate Your <br />
                <span className="text-emerald-400">
                  {activeCampaign === "gone" ? "G-ONE" : "Wadada"} Support
                </span>{" "}
                <br />
                Poster Here
              </h1>

              {/* Description */}
              <p className="max-w-xl text-base text-gray-200 sm:text-lg lg:text-xl leading-relaxed">
                {activeCampaign === "gone"
                  ? "Join thousands of proud supporters across Ankpa, Omala, and Olamaboro Federal Constituency. Generate your personalized campaign poster and show your vote for Prince Gowon Enenche (G-ONE) under SDP."
                  : "Join millions of supporters across Nasarawa State. Generate your personalized campaign poster and share your support for Sen. Ahmed Aliyu Wadada."}
              </p>

              {/* Campaign Switcher Pill */}
              <div className="flex items-center gap-2 pt-2">
                <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">
                  Campaign Frame:
                </span>
                <div className="inline-flex rounded-xl bg-white/10 p-1 backdrop-blur-md border border-white/15">
                  <button
                    type="button"
                    onClick={() => setActiveCampaign("gone")}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                      activeCampaign === "gone"
                        ? "bg-primary text-white shadow-md"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Prince Gowon Enenche (G-ONE)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCampaign("wadada")}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                      activeCampaign === "wadada"
                        ? "bg-royal text-white shadow-md"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Sen. Wadada 2027
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href={`/generate?campaign=${activeCampaign}`}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-bold text-white shadow-xl transition-all hover:bg-emerald-600 hover:shadow-emerald-900/40 active:scale-95"
                >
                  <Sparkles className="h-5 w-5" />
                  <span>Generate My Poster</span>
                </Link>

                <Link
                  href="/supporters"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-md transition-all hover:bg-white hover:text-gray-900"
                >
                  <span>View Supporters</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Showcase Column (3D Poster Stack) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative mx-auto h-[460px] w-full max-w-[340px] sm:h-[540px] sm:max-w-[400px]">
                {/* Background Shadow Cards */}
                <div className="absolute -left-3 top-8 w-[92%] opacity-40 transition-transform duration-500 animate-float-reverse">
                  <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-2xl">
                    <Image
                      src={
                        activeCampaign === "gone"
                          ? "/poster_sample_gone.png"
                          : "/poster_sample.png"
                      }
                      alt="Campaign Poster Background"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="absolute -right-3 top-5 w-[92%] opacity-60 transition-transform duration-500 animate-float">
                  <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-2xl">
                    <Image
                      src={
                        activeCampaign === "gone"
                          ? "/poster_sample_gone.png"
                          : "/poster_sample.png"
                      }
                      alt="Campaign Poster Mid"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Main Prominent Card */}
                <div className="relative z-20 aspect-square w-full overflow-hidden rounded-3xl border-2 border-white/20 bg-gray-900 shadow-2xl shadow-emerald-950/80 transition-all hover:scale-[1.02]">
                  <Image
                    src={
                      activeCampaign === "gone"
                        ? "/poster_sample_gone.png"
                        : "/poster_sample.png"
                    }
                    alt="Official Campaign Poster Sample"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-black/75 p-3 backdrop-blur-md border border-white/10 text-center">
                    <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      {activeCampaign === "gone"
                        ? "Ankpa, Omala, Olamaboro Constituency"
                        : "Nasarawa State 2027"}
                    </p>
                    <p className="text-sm font-black text-white">
                      {campaign.candidateName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/70 flex flex-col items-center gap-1">
          <span className="text-xs font-medium uppercase tracking-widest text-white/60">
            Scroll Down
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </div>
      </section>

      {/* STATISTICS COUNTER SECTION */}
      <section className="py-20 bg-gray-50 border-b border-gray-200">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-primary">
                <TrendingUp className="h-3.5 w-3.5" />
                Live Campaign Engagement
              </span>
              <h2 className="mt-4 text-5xl font-black tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                28,540+
              </h2>
              <p className="mt-2 text-2xl font-semibold text-gray-600">
                Posters Generated Across Constituencies
              </p>
              <p className="mt-4 max-w-lg text-sm text-gray-500 leading-relaxed">
                Supporters from every ward are raising their voices. Choose your
                candidate frame, upload your picture, and stand together for
                progress and true representation.
              </p>
            </div>

            {/* Rotating LGA Spotlight Card */}
            <div className="relative">
              <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
                <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      Spotlight Local Government
                    </span>
                    <h3 className="text-2xl font-black text-gray-900">
                      {currentLga.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {currentLga.constituency} · {currentLga.state} State
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-black text-primary">
                      {currentLga.count.toLocaleString()}
                    </p>
                    <p className="text-xs font-medium text-muted-foreground uppercase">
                      Posters Created
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1 font-semibold text-emerald-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Updating dynamically
                  </span>
                  <Link
                    href="/statistics"
                    className="font-bold text-primary hover:underline"
                  >
                    View All LGAs →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 SIMPLE STEPS SECTION */}
      <section className="py-20 bg-white">
        <div className="bg-[#006C43] py-12 text-white">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
              Join the Winning Team
            </h2>
            <p className="mt-3 text-emerald-100 text-sm sm:text-base font-medium max-w-xl mx-auto">
              Show your unreserved support for G-ONE & Wadada with a personalized
              digital campaign poster in under 60 seconds.
            </p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-16">
          <div className="grid items-center gap-16 lg:grid-cols-5">
            {/* Steps List */}
            <div className="lg:col-span-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                In 3 Simple Steps
              </span>
              <h3 className="mt-2 text-4xl font-black text-gray-900">
                Generate Yours Today
              </h3>

              <div className="mt-10 space-y-8">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">
                      1. Select Campaign & Upload Image
                    </h4>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                      Choose between Prince Gowon Enenche (G-ONE) or Sen. Wadada,
                      then upload your favorite clear photo from your device.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">
                      2. Crop & Live Preview
                    </h4>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                      Adjust your zoom and reposition your picture inside the
                      designated frame. See exactly how your poster looks in
                      real-time.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">
                      3. Generate, Download & Share
                    </h4>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                      Download your high-resolution customized poster instantly
                      and share directly to WhatsApp, Facebook, and X (Twitter).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Visual Card */}
            <div className="lg:col-span-2 flex justify-center">
              <div className="w-full max-w-md">
                <Link href="/generate" className="group block">
                  <div className="relative aspect-square overflow-hidden rounded-3xl border border-gray-200 shadow-xl transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl">
                    <Image
                      src="/add_image.png"
                      alt="Generate Campaign Poster"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                      <div className="text-white">
                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                          Interactive Studio
                        </p>
                        <p className="text-xl font-black">
                          Open Poster Generator
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/generate"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-emerald-700 active:scale-95"
                >
                  <Sparkles className="h-5 w-5" />
                  <span>Generate My Poster Now</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FULL-WIDTH BANNER: IN GOD WE TRUST */}
      <section className="w-full bg-[#0A6FB8] py-20 md:py-28 text-white text-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-blue-100 mb-4 backdrop-blur-md">
            Progress · Unity · Integrity
          </div>
          <h2 className="text-5xl font-black uppercase tracking-wider md:text-7xl lg:text-8xl">
            IN GOD WE TRUST
          </h2>
          <p className="mt-4 text-base md:text-lg text-blue-100 max-w-2xl mx-auto font-medium">
            Dedicated to the peace, progress, and prosperity of our people.
          </p>
        </div>
      </section>

      {/* CANDIDATE SHOWCASE & DEVELOPER SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Prince Gowon Enenche Profile Card */}
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-sm md:p-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-center">
              <div className="mx-auto w-full max-w-[260px] shrink-0 md:mx-0">
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-gray-100 shadow-md">
                  <Image
                    src="/candidate_gone.png"
                    alt="Prince Gowon Enenche"
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <div className="flex-1 text-left space-y-4">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-primary">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  House of Representatives Candidate
                </div>
                <h3 className="text-3xl font-black text-gray-900 md:text-4xl">
                  Prince Gowon Enenche (G-ONE)
                </h3>
                <p className="text-sm font-bold uppercase tracking-wider text-primary">
                  Ankpa, Omala, Olamaboro Federal Constituency · SDP
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  A visionary youth leader, philanthropist, and champion of
                  grassroots development. Prince Gowon Enenche is running to give
                  the good people of Ankpa, Omala, and Olamaboro a vibrant,
                  accountable, and people-centered voice in the Federal House of
                  Representatives.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <Link
                    href="/generate?campaign=gone"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white shadow hover:bg-emerald-700"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Generate G-ONE Poster</span>
                  </Link>
                  <Link
                    href="/supporters?campaign=gone"
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    <span>Constituency Supporters</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Platform & Developer Bio Card */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm md:p-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-center">
              <div className="mx-auto w-full max-w-[220px] shrink-0 md:mx-0">
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-gray-100 shadow-md">
                  <Image
                    src="/developer.jpg"
                    alt="Sulaiman Hamza Abdulwahab"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 text-left space-y-3">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
                  Platform Architecture & Development
                </p>
                <h4 className="text-2xl font-black text-gray-900 md:text-3xl">
                  Sulaiman Hamza Abdulwahab
                </h4>
                <p className="text-sm font-medium text-gray-700">
                  Chairman, Wadada Transformation Network & Lafia Central
                  Movement
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  This digital grassroots platform was engineered to give every
                  citizen, youth ambassador, and community advocate the power to
                  generate and share authentic campaign materials with zero
                  technical barrier.
                </p>
                <div className="pt-2">
                  <a
                    href="https://facebook.com/ibnAbdulw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-bold text-gray-800 shadow-sm transition hover:bg-gray-50"
                  >
                    <Share2 className="h-3.5 w-3.5 text-primary" />
                    <span>Follow @ibnAbdulw on Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
