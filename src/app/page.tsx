"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Tractor,
  GraduationCap,
  HeartPulse,
  Globe,
  Award,
} from "lucide-react";
import { G_ONE_CANDIDATE, CONSTITUENCY_LGAS } from "@/lib/data";

export default function HomePage() {
  const [currentLgaIndex, setCurrentLgaIndex] = useState(0);

  // Cycle through constituency LGAs for spotlight
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLgaIndex((prev) => (prev + 1) % CONSTITUENCY_LGAS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const currentLga = CONSTITUENCY_LGAS[currentLgaIndex];

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gray-950 text-white">
        {/* Candidate Background Image */}
        <div className="absolute inset-0 -z-20">
          <Image
            src="/candidate_gone.png"
            alt={G_ONE_CANDIDATE.name}
            fill
            priority
            className="object-cover object-top opacity-45"
          />
        </div>

        {/* Cinematic Backdrop Overlays */}
        <div className="absolute inset-0 z-0 bg-black/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-emerald-950/95 via-emerald-900/65 to-black/40" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-950 via-transparent to-black/50" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top_left,rgba(0,108,67,0.4),transparent_50%)]" />

        <div className="relative z-20 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Campaign Tag Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-900/40 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Ankpa, Omala, Olamaboro Federal Constituency · SDP</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                Generate Your <br />
                <span className="text-emerald-400">G-ONE Support</span> <br />
                Poster Here
              </h1>

              {/* Description */}
              <p className="max-w-xl text-base text-gray-200 sm:text-lg lg:text-xl leading-relaxed">
                Join thousands of proud constituents and supporters standing with{" "}
                <strong className="text-white">
                  {G_ONE_CANDIDATE.name} ({G_ONE_CANDIDATE.moniker})
                </strong>{" "}
                for House of Representatives. Generate your customized campaign
                poster and declare your vote for true progress and representation!
              </p>

              {/* Key Slogan Pill */}
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 border border-white/15 backdrop-blur-md">
                <span className="text-xs uppercase font-extrabold text-emerald-400 tracking-wider">
                  Slogan:
                </span>
                <span className="text-xs sm:text-sm font-black text-white">
                  {G_ONE_CANDIDATE.slogan} — {G_ONE_CANDIDATE.subSlogan}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/generate"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-black text-white shadow-xl shadow-emerald-950/60 transition-all hover:bg-emerald-600 hover:scale-[1.02] active:scale-95"
                >
                  <Sparkles className="h-5 w-5" />
                  <span>Generate My Poster</span>
                </Link>

                <Link
                  href="/supporters"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition-all hover:bg-white hover:text-gray-900"
                >
                  <span>View Supporters Wall</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Showcase Column (3D Poster Stack) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative mx-auto h-[460px] w-full max-w-[340px] sm:h-[540px] sm:max-w-[400px]">
                {/* Background Shadow Cards */}
                <div className="absolute -left-3 top-8 w-[92%] opacity-40 animate-float-reverse">
                  <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-2xl">
                    <Image
                      src="/poster_sample_gone.png"
                      alt="G-ONE Campaign Poster Background"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="absolute -right-3 top-5 w-[92%] opacity-60 animate-float">
                  <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-2xl">
                    <Image
                      src="/poster_sample_gone.png"
                      alt="G-ONE Campaign Poster Mid"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Main Prominent Card */}
                <div className="relative z-20 aspect-square w-full overflow-hidden rounded-3xl border-2 border-white/20 bg-gray-900 shadow-2xl shadow-emerald-950/80 transition-all hover:scale-[1.02]">
                  <Image
                    src="/poster_sample_gone.png"
                    alt="Official G-ONE Campaign Poster"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-black/80 p-3 backdrop-blur-md border border-white/15 text-center">
                    <p className="text-[11px] font-black text-emerald-400 uppercase tracking-wider">
                      {G_ONE_CANDIDATE.constituency}
                    </p>
                    <p className="text-sm font-black text-white">
                      {G_ONE_CANDIDATE.name} · SDP
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/70 flex flex-col items-center gap-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
            Scroll Down
          </span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      </section>

      {/* CONSTITUENCY ENGAGEMENT & STATISTICS COUNTER SECTION */}
      <section className="py-20 bg-gray-50 border-b border-gray-200">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-primary">
                <TrendingUp className="h-3.5 w-3.5" />
                Live Constituency Mobilization
              </span>
              <h2 className="mt-4 text-5xl font-black tracking-tight text-gray-900 sm:text-6xl">
                19,490+
              </h2>
              <p className="mt-2 text-2xl font-bold text-gray-700">
                Posters Generated by Constituents
              </p>
              <p className="mt-4 max-w-lg text-sm text-gray-600 leading-relaxed">
                Across every ward in Ankpa, Omala, and Olamaboro, youth, women,
                and community leaders are rising in unity for a voice that truly
                represents them in the 10th National Assembly.
              </p>
            </div>

            {/* Rotating LGA Spotlight Card */}
            <div className="relative">
              <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
                <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-primary">
                      Constituency LGA Spotlight
                    </span>
                    <h3 className="text-3xl font-black text-gray-900">
                      {currentLga.name} LGA
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {currentLga.wards.length} Wards · Kogi State
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-black text-primary">
                      {currentLga.count.toLocaleString()}
                    </p>
                    <p className="text-xs font-bold text-muted-foreground uppercase">
                      Solidarity Posters
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1.5 font-bold text-emerald-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Community Count
                  </span>
                  <Link
                    href="/statistics"
                    className="font-bold text-primary hover:underline"
                  >
                    View All Constituency Stats →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 CORE LEGISLATIVE PILLARS */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">
              Legislative Agenda
            </span>
            <h2 className="text-3xl font-black text-gray-900 sm:text-5xl">
              A Blueprint for Genuine Progress
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              The four foundational pillars of Prince Gowon Enenche&apos;s mission
              to transform Ankpa, Omala, and Olamaboro Federal Constituency.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {G_ONE_CANDIDATE.pillars.map((pillar, idx) => {
              const icons = [Cpu, Tractor, GraduationCap, HeartPulse];
              const IconComp = icons[idx] || ShieldCheck;

              return (
                <div
                  key={pillar.title}
                  className="rounded-3xl border border-gray-200 bg-gray-50/60 p-8 shadow-sm transition-all hover:bg-white hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-md shadow-emerald-900/20">
                    <IconComp className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-lg font-black text-gray-900">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3 SIMPLE STEPS SECTION */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="bg-[#006C43] py-12 text-white">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
              Claim Your Campaign Poster
            </h2>
            <p className="mt-3 text-emerald-100 text-sm sm:text-base font-medium max-w-xl mx-auto">
              Customized with your photo, local government, and ward in under 60
              seconds.
            </p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-16">
          <div className="grid items-center gap-16 lg:grid-cols-5">
            {/* Steps List */}
            <div className="lg:col-span-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Instant Online Studio
              </span>
              <h3 className="mt-2 text-4xl font-black text-gray-900">
                Generate in 3 Simple Steps
              </h3>

              <div className="mt-10 space-y-8">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">
                      1. Upload Your Photo
                    </h4>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                      Choose any clear portrait from your phone, laptop, or
                      tablet.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">
                      2. Zoom, Position & Live Preview
                    </h4>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                      Use the interactive crop slider to position your face
                      inside the official G-ONE SDP frame cutout.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">
                      3. Download & Share Everywhere
                    </h4>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                      Download the high-resolution poster to your device and set
                      it as your WhatsApp DP or share to social media.
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
                      src="/poster_sample_gone.png"
                      alt="Generate G-ONE Campaign Poster"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                      <div className="text-white">
                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                          Official Studio
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
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-black text-white shadow-lg shadow-emerald-950/20 transition-all hover:bg-emerald-700 active:scale-95"
                >
                  <Sparkles className="h-5 w-5" />
                  <span>Generate My G-ONE Poster Now</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FULL-WIDTH BANNER */}
      <section className="w-full bg-[#006C43] py-20 md:py-28 text-white text-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-emerald-200 mb-4 backdrop-blur-md">
            The G-1 Movement · Progress For All
          </div>
          <h2 className="text-4xl font-black uppercase tracking-wider md:text-6xl lg:text-7xl">
            I RESERVED FOR HIM MY VOTE
          </h2>
          <p className="mt-4 text-base md:text-lg text-emerald-100 max-w-2xl mx-auto font-medium">
            Progress · In God We Trust · Social Democratic Party (SDP)
          </p>
        </div>
      </section>

      {/* MEET THE CANDIDATE SECTION */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-50/50 p-8 shadow-sm md:p-14">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
              <div className="mx-auto w-full max-w-[320px] shrink-0">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border-2 border-emerald-500/20 shadow-xl">
                  <Image
                    src="/candidate_gone.png"
                    alt={G_ONE_CANDIDATE.name}
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute top-3 right-3 rounded-full bg-primary px-3 py-1 text-xs font-black text-white shadow">
                    SDP
                  </div>
                </div>
              </div>

              <div className="flex-1 text-left space-y-4">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-primary">
                  <ShieldCheck className="h-4 w-4" />
                  House of Representatives Candidate
                </div>
                <h3 className="text-3xl font-black text-gray-900 md:text-4xl">
                  {G_ONE_CANDIDATE.name} ({G_ONE_CANDIDATE.moniker})
                </h3>
                <p className="text-sm font-extrabold uppercase tracking-wider text-primary">
                  {G_ONE_CANDIDATE.constituency} · SDP
                </p>

                <p className="text-sm text-gray-700 leading-relaxed">
                  Prince Gowon Enenche hails from <strong>Imane in Olamaboro LGA</strong>,
                  Kogi State. A Political Science graduate of Kogi State
                  University, he built a distinguished career across the Nigerian
                  banking and financial services sector before establishing the
                  successful <strong>G1 Group of Companies</strong>, with flagship
                  investments in real estate (G-One Luxury Homes), mining, and
                  agribusiness.
                </p>

                <p className="text-sm text-gray-700 leading-relaxed">
                  Driven by genuine compassion and community solidarity, Prince
                  Enenche has spearheaded extensive grassroots empowerment
                  initiatives—from distributing operational tricycles to youths
                  for sustainable livelihood, to providing vehicles and welfare
                  support to community organizations across Ankpa, Omala, and
                  Olamaboro.
                </p>

                <div className="pt-3 flex flex-wrap gap-4">
                  <Link
                    href="/generate"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow hover:bg-emerald-700"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Generate Support Poster</span>
                  </Link>

                  <a
                    href={G_ONE_CANDIDATE.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 shadow-sm"
                  >
                    <Globe className="h-4 w-4 text-primary" />
                    <span>Official Campaign Website</span>
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
