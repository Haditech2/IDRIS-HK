"use client";

import React, { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Download,
  Share2,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";
import { CAMPAIGNS, CampaignConfig } from "@/lib/data";

function SuccessContent() {
  const searchParams = useSearchParams();
  const campaignId = (searchParams.get("campaign") as "gone" | "wadada") || "gone";
  const supporterName = searchParams.get("name") || "Supporter";
  const lga = searchParams.get("lga") || "Constituency";

  const campaign: CampaignConfig = CAMPAIGNS[campaignId] || CAMPAIGNS.gone;

  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Load poster image from sessionStorage
    const savedPoster = sessionStorage.getItem("latest_poster");
    if (savedPoster) {
      setPosterUrl(savedPoster);
    } else {
      setPosterUrl(
        campaignId === "gone"
          ? "/poster_sample_gone.png"
          : "/poster_sample.png"
      );
    }
  }, [campaignId]);

  const shareText = `I just generated my official campaign support poster for ${campaign.candidateName} (${campaign.office})! Generate yours today at https://wadada-support.vercel.app/`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      window.location.origin || "https://wadada-support.vercel.app/"
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadAgain = () => {
    if (!posterUrl) return;
    const link = document.createElement("a");
    link.href = posterUrl;
    link.download = `${campaignId}-support-poster.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50/70 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Success Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-primary shadow-sm ring-8 ring-emerald-50">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
            Poster Successfully Generated!
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-lg mx-auto">
            Thank you, <strong className="text-gray-900">{supporterName}</strong>{" "}
            from <strong className="text-gray-900">{lga}</strong>, for standing
            with {campaign.candidateName}.
          </p>
        </div>

        {/* Poster Showcase Card */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 shadow-xl">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            {/* Poster Image */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative aspect-square w-full max-w-[380px] overflow-hidden rounded-2xl border-2 border-emerald-500/20 shadow-2xl">
                {posterUrl ? (
                  <Image
                    src={posterUrl}
                    alt="Generated Campaign Poster"
                    fill
                    priority
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gray-100">
                    <Sparkles className="h-8 w-8 text-primary animate-spin" />
                  </div>
                )}
              </div>
            </div>

            {/* Action Tools */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Official Poster Ready
                </span>
                <h2 className="mt-1 text-2xl font-black text-gray-900">
                  Share Your Voice Everywhere
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Your poster has been saved to your downloads. Post it as your
                  WhatsApp DP, Instagram story, and Facebook cover to mobilize
                  our constituency!
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadAgain}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white shadow transition-all hover:bg-emerald-700 active:scale-95"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Again</span>
                </button>

                {/* Direct Share Options */}
                <div className="grid grid-cols-2 gap-3">
                  {/* WhatsApp */}
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      shareText
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#20ba59]"
                  >
                    <span>WhatsApp</span>
                  </a>

                  {/* Facebook */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      "https://wadada-support.vercel.app/"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#1877F2] py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#1565d8]"
                  >
                    <span>Facebook</span>
                  </a>

                  {/* X (Twitter) */}
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      shareText
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-black py-3 text-xs font-bold text-white shadow-sm transition hover:bg-gray-800"
                  >
                    <span>X (Twitter)</span>
                  </a>

                  {/* Copy Link */}
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-3 text-xs font-bold text-gray-700 shadow-sm transition hover:bg-gray-50"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Back to Generator */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                <Link
                  href="/generate"
                  className="inline-flex items-center gap-1.5 font-bold text-primary hover:underline"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Design Another Poster</span>
                </Link>
                <Link
                  href="/supporters"
                  className="font-bold text-gray-600 hover:text-gray-900 hover:underline"
                >
                  View Wall of Supporters →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
