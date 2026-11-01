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
  ChevronLeft,
  ChevronRight,
  Camera,
} from "lucide-react";
import { G_ONE_CANDIDATE, CONSTITUENCY_LGAS } from "@/lib/data";

const CANDIDATE_GALLERY = [
  {
    src: "/gone_hero.jpg",
    title: "Grassroots Mobilizer",
    subtitle: "G-ONE 2027 Official Campaign",
    badge: "Campaign Trail",
  },
  {
    src: "/gone_thumbs.jpg",
    title: "The People's Choice",
    subtitle: "Double Thumbs Up for Progress",
    badge: "SDP Official",
  },
  {
    src: "/gone_native.jpg",
    title: "Cultural Heritage & Leadership",
    subtitle: "Rooted in Imane, Olamaboro",
    badge: "Community Leader",
  },
  {
    src: "/gone_corporate.jpg",
    title: "Visionary Business Leader",
    subtitle: "CEO, G-One Luxury Homes & G1 Group",
    badge: "Private Sector",
  },
  {
    src: "/gone_standing.jpg",
    title: "Ready to Serve",
    subtitle: "House of Representatives 2027",
    badge: "Legislative Mission",
  },
];

export default function HomePage() {
  const [currentLgaIndex, setCurrentLgaIndex] = useState(0);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Cycle through constituency LGAs for spotlight
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLgaIndex((prev) => (prev + 1) % CONSTITUENCY_LGAS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const currentLga = CONSTITUENCY_LGAS[currentLgaIndex];

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION WITH CANDIDATE BACKGROUND */}
      <section className="relative min-h-[94vh] flex items-center overflow-hidden bg-gray-950 text-white">
        {/* Candidate Background Image (High-Res Orange Cap Photo) */}
        <div className="absolute inset-0 -z-20">
          <Image
            src="/gone_hero.jpg"
            alt={G_ONE_CANDIDATE.name}
            fill
            priority
            className="object-cover object-[center_20%] opacity-40 scale-105 transition-transform duration-1000"
          />
        </div>

        {/* Cinematic Backdrop Overlays */}
        <div className="absolute inset-0 z-0 bg-black/55 backdrop-blur-[1px]" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-emerald-950/95 via-emerald-900/75 to-black/50" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-950 via-transparent to-black/60" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top_left,rgba(0,108,67,0.45),transparent_55%)]" />

        <div className="relative z-20 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Campaign Tag Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-900/50 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-emerald-300 backdrop-blur-md shadow-lg shadow-emerald-950/30">
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
                for House of Representatives. Upload your photo, personalize your
                constituency details, and show your vote for progress!
              </p>

              {/* Key Slogan Pill */}
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2.5 border border-white/20 backdrop-blur-md">
                <span className="text-xs uppercase font-extrabold text-emerald-400 tracking-wider">
                  Motto:
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
                <div className="relative z-20 aspect-square w-full overflow-hidden rounded-3xl border-2 border-white/25 bg-gray-900 shadow-2xl shadow-emerald-950/80 transition-all hover:scale-[1.02]">
                  <Image
                    src="/poster_sample_gone.png"
                    alt="Official G-ONE Campaign Poster"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-black/85 p-3.5 backdrop-blur-md border border-white/15 text-center">
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
      <section className="relative overflow-hidden py-24 bg-white">
        {/* Subtle Ambient Candidate Watermark */}
        <div className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 h-[600px] w-[450px] opacity-[0.03] lg:opacity-[0.04] -z-0">
          <Image
            src="/gone_corporate.jpg"
            alt="G-ONE Agenda Background"
            fill
            className="object-cover object-top"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

      {/* 3 SIMPLE STEPS SECTION WITH "JOIN THE WINNING TEAM" CANDIDATE BACKGROUND */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="relative overflow-hidden bg-[#006C43] py-16 md:py-20 text-white shadow-xl">
          {/* Candidate Background Image (Prince Gowon Enenche Standing) */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/gone_standing.jpg"
              alt="Prince Gowon Enenche - Join the Winning Team"
              fill
              priority
              className="object-cover object-[center_20%] opacity-40 mix-blend-luminosity scale-105 transition-transform duration-700"
            />
          </div>
          {/* Green brand gradient overlay for high contrast and readability */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#006C43]/92 via-[#006C43]/75 to-[#006C43]/92" />
          <div className="absolute inset-0 z-10 bg-radial-gradient from-transparent via-[#006C43]/30 to-[#006C43]/80" />

          <div className="relative z-20 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-black tracking-tight sm:text-6xl md:text-7xl drop-shadow-md">
              Join the Winning Team
            </h2>
            <p className="mt-4 text-emerald-100 text-sm sm:text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Show your unreserved support for <strong className="text-white font-black">G-ONE</strong> with a personalized
              digital campaign poster in under 60 seconds.
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

      {/* FULL-WIDTH BANNER: IN GOD WE TRUST WITH CANDIDATE BACKGROUND */}
      <section className="relative w-full overflow-hidden bg-[#0A6FB8] py-24 md:py-32 text-white text-center shadow-xl">
        {/* Candidate Background Image (Prince Gowon Enenche Thumbs-up / Progress) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/gone_thumbs.jpg"
            alt="Prince Gowon Enenche - In God We Trust"
            fill
            priority
            className="object-cover object-[center_30%] opacity-40 mix-blend-luminosity scale-105 transition-transform duration-700"
          />
        </div>
        {/* Blue brand gradient overlay matching screenshot styling with enhanced contrast */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#074775]/92 via-[#0A6FB8]/75 to-[#074775]/92" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,rgba(10,111,184,0.4),rgba(7,71,117,0.85))]" />

        <div className="relative z-20 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-block rounded-full bg-white/10 px-5 py-1.5 text-xs font-black uppercase tracking-widest text-blue-100 mb-6 backdrop-blur-md border border-white/20">
            Progress · Unity · Integrity
          </div>
          <h2 className="text-5xl font-black uppercase tracking-wider sm:text-7xl lg:text-8xl drop-shadow-md">
            IN GOD WE TRUST
          </h2>
          <p className="mt-4 text-base md:text-xl lg:text-2xl text-blue-100 max-w-2xl mx-auto font-medium leading-relaxed">
            Dedicated to the peace, progress, and prosperity of our people.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-black text-[#0A6FB8] shadow-xl hover:bg-blue-50 active:scale-95 transition-all"
            >
              <Sparkles className="h-4 w-4" />
              <span>Generate Support Poster</span>
            </Link>
          </div>
        </div>
      </section>

      {/* MEET THE CANDIDATE & GALLERY SECTION */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Main Profile Card */}
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-50/60 p-8 shadow-sm md:p-14">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
              {/* Interactive Candidate Photo Display */}
              <div className="mx-auto w-full max-w-[340px] shrink-0 space-y-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border-2 border-emerald-500/30 shadow-2xl bg-gray-900">
                  <Image
                    src={CANDIDATE_GALLERY[activePhotoIndex].src}
                    alt={CANDIDATE_GALLERY[activePhotoIndex].title}
                    fill
                    className="object-cover object-top transition-all duration-500"
                  />
                  <div className="absolute top-3 right-3 rounded-full bg-primary px-3 py-1 text-xs font-black text-white shadow">
                    {CANDIDATE_GALLERY[activePhotoIndex].badge}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-black/75 p-3 backdrop-blur-md text-white text-center border border-white/10">
                    <p className="text-xs font-black">
                      {CANDIDATE_GALLERY[activePhotoIndex].title}
                    </p>
                    <p className="text-[10px] text-gray-300">
                      {CANDIDATE_GALLERY[activePhotoIndex].subtitle}
                    </p>
                  </div>
                </div>

                {/* Thumbnails to Switch Candidate Photos */}
                <div className="flex items-center justify-center gap-2 pt-1">
                  {CANDIDATE_GALLERY.map((photo, i) => (
                    <button
                      key={photo.src}
                      type="button"
                      onClick={() => setActivePhotoIndex(i)}
                      className={`relative h-12 w-12 overflow-hidden rounded-xl border-2 transition-all ${
                        activePhotoIndex === i
                          ? "border-primary scale-105 shadow-md ring-2 ring-primary/30"
                          : "border-gray-200 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.title}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Biography Details */}
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

      {/* GRASSROOTS EMPOWERMENT & CALL TO ACTION WITH NATIVE ATTIRE BACKGROUND */}
      <section className="relative overflow-hidden bg-emerald-950 py-20 text-white">
        {/* Subtle Candidate Native Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/gone_native.jpg"
            alt="Prince Gowon Enenche Grassroots Representation"
            fill
            className="object-cover object-[center_20%] opacity-20 mix-blend-luminosity"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-emerald-950 via-emerald-950/85 to-emerald-950/90" />

        <div className="relative z-20 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-800/60 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-emerald-300 border border-emerald-700/50 backdrop-blur-md">
            <Award className="h-4 w-4" />
            A New Era of Representation
          </span>
          <h2 className="text-3xl font-black sm:text-5xl tracking-tight">
            Stand for Progress. Stand with G-ONE.
          </h2>
          <p className="text-sm sm:text-base text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Every voice counts. Join tens of thousands of citizens across Ankpa,
            Omala, and Olamaboro Federal Constituency rallying behind Prince Gowon
            Enenche for House of Representatives in 2027.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-black text-white shadow-xl hover:bg-emerald-600 active:scale-95 transition-all"
            >
              <Sparkles className="h-4 w-4" />
              <span>Generate Your Free Poster</span>
            </Link>
            <Link
              href="/supporters"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-bold text-white hover:bg-white hover:text-gray-900 transition-all backdrop-blur-md"
            >
              <span>View Supporters Wall</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
