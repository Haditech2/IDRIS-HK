"use client";

import React, { useState, useRef, useCallback, Suspense } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cropper from "react-easy-crop";
import confetti from "canvas-confetti";
import {
  Upload,
  Image as ImageIcon,
  Sparkles,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  AlertCircle,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import {
  G_ONE_CANDIDATE,
  FRAME_CONFIG,
  CONSTITUENCY_LGAS,
  Supporter,
} from "@/lib/data";
import { generatePosterCanvas } from "@/lib/generatePoster";

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

function GenerateContent() {
  const router = useRouter();

  // Image & Crop state
  const [rawImage, setRawImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null);
  const [croppedImageResult, setCroppedImageResult] = useState<string | null>(null);

  // Form inputs
  const [supporterName, setSupporterName] = useState("");
  const [selectedLga, setSelectedLga] = useState("");
  const [ward, setWard] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [formError, setFormError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get available wards for the selected LGA
  const currentLgaData = CONSTITUENCY_LGAS.find((l) => l.name === selectedLga);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFormError("Please select a valid image file (JPG, PNG, WEBP)");
      return;
    }

    setFormError("");
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setRawImage(result);
      setCroppedImageResult(null);
      setZoom(1);
      setCrop({ x: 0, y: 0 });
    };
    reader.readAsDataURL(file);
  };

  // Generate cropped preview when crop finishes
  const onCropComplete = useCallback(
    async (_croppedArea: CropArea, croppedPixels: CropArea) => {
      setCroppedAreaPixels(croppedPixels);
      if (!rawImage) return;

      try {
        const image = new window.Image();
        image.src = rawImage;
        await new Promise((res) => {
          image.onload = res;
        });

        const canvas = document.createElement("canvas");
        canvas.width = croppedPixels.width;
        canvas.height = croppedPixels.height;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.drawImage(
            image,
            croppedPixels.x,
            croppedPixels.y,
            croppedPixels.width,
            croppedPixels.height,
            0,
            0,
            croppedPixels.width,
            croppedPixels.height
          );
          setCroppedImageResult(canvas.toDataURL("image/png"));
        }
      } catch (err) {
        console.error("Crop error:", err);
      }
    },
    [rawImage]
  );

  // Trigger file dialog
  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  // Generate and Download
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!croppedImageResult) {
      setFormError("Please upload and position your photo first.");
      return;
    }

    if (!selectedLga) {
      setFormError("Please select your Local Government Area (Ankpa, Omala, or Olamaboro).");
      return;
    }

    setFormError("");
    setIsGenerating(true);

    try {
      // Generate full resolution composited poster (1024x1024)
      const { blob, dataUrl } = await generatePosterCanvas({
        croppedImageSrc: croppedImageResult,
      });

      // Trigger instant browser download
      const fileName = `g-one-poster-${Date.now()}.png`;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Trigger Confetti celebration!
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });

      // Save supporter record in localStorage
      const newSupporter: Supporter = {
        id: `g1-sup-${Date.now()}`,
        name: supporterName || "Constituent Supporter",
        lga: selectedLga,
        ward: ward || undefined,
        imageUrl: dataUrl,
        posterUrl: dataUrl,
        createdAt: new Date().toISOString(),
      };

      try {
        const existing = JSON.parse(
          localStorage.getItem("g_one_supporters") || "[]"
        );
        localStorage.setItem(
          "g_one_supporters",
          JSON.stringify([newSupporter, ...existing])
        );
        sessionStorage.setItem("latest_poster", dataUrl);
        sessionStorage.setItem("latest_supporter", JSON.stringify(newSupporter));
      } catch (storageErr) {
        console.warn("Storage warning:", storageErr);
      }

      // Navigate to success page
      router.push(
        `/generate/success?id=${newSupporter.id}&name=${encodeURIComponent(
          newSupporter.name
        )}&lga=${encodeURIComponent(newSupporter.lga)}${
          ward ? `&ward=${encodeURIComponent(ward)}` : ""
        }`
      );
    } catch (err) {
      console.error("Poster generation failed:", err);
      setFormError("Failed to render poster. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/70 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Official Campaign Poster Studio
          </span>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-gray-900 sm:text-5xl">
            Design Your G-ONE Poster
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Upload your picture, adjust framing, select your constituency ward, and
            download a high-resolution campaign poster instantly.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 border border-gray-200 shadow-sm text-xs font-bold text-gray-700">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span>{G_ONE_CANDIDATE.name}</span>
            <span className="text-gray-400">·</span>
            <span>{G_ONE_CANDIDATE.constituency}</span>
            <span className="text-gray-400">·</span>
            <span className="text-primary font-black">SDP</span>
          </div>
        </div>

        {/* Studio Grid: Controls on Left, Sticky Preview on Right */}
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Controls & Inputs (Left: 7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Upload & Crop Card */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h2 className="text-xl font-black text-gray-900">
                    Step 1: Your Photo
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Upload a clear front-facing portrait for the best result
                  </p>
                </div>
                {rawImage && (
                  <button
                    type="button"
                    onClick={triggerUpload}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Change Image
                  </button>
                )}
              </div>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="photo-upload"
              />

              {/* Upload Box or Cropper Canvas */}
              <div className="mt-6">
                {!rawImage ? (
                  <div
                    onClick={triggerUpload}
                    className="group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/50 p-12 text-center cursor-pointer transition-all hover:border-primary hover:bg-emerald-50/30"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5 group-hover:scale-110 transition-transform">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <p className="mt-4 text-base font-bold text-gray-900">
                      Click to upload your photo
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      JPG, PNG, or WEBP from your phone or PC
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700">
                      Choose From Device
                    </span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Easy-Crop Viewport */}
                    <div className="relative h-[380px] w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-900 shadow-inner">
                      <Cropper
                        image={rawImage}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        cropShape="rect"
                        showGrid={false}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                      />
                    </div>

                    {/* Zoom Controls */}
                    <div className="flex items-center gap-4 rounded-xl bg-gray-100 p-3">
                      <button
                        type="button"
                        onClick={() => setZoom((z) => Math.max(1, z - 0.1))}
                        className="rounded-lg p-1.5 text-gray-600 hover:bg-white hover:text-gray-900 transition"
                      >
                        <ZoomOut className="h-4 w-4" />
                      </button>
                      <input
                        type="range"
                        min={1}
                        max={3}
                        step={0.05}
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="w-full accent-primary cursor-pointer"
                      />
                      <button
                        type="button"
                        onClick={() => setZoom((z) => Math.min(3, z + 0.1))}
                        className="rounded-lg p-1.5 text-gray-600 hover:bg-white hover:text-gray-900 transition"
                      >
                        <ZoomIn className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-center text-xs text-muted-foreground">
                      Drag photo to position · Use slider to zoom in/out
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Step 2: Information & Constituency Form */}
            <form
              onSubmit={handleGenerate}
              className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm space-y-6"
            >
              <div className="pb-4 border-b border-gray-100">
                <h2 className="text-xl font-black text-gray-900">
                  Step 2: Supporter Constituency Info
                </h2>
                <p className="text-xs text-muted-foreground">
                  Attach your name and local government to show grassroots solidarity
                </p>
              </div>

              {/* Supporter Name Input */}
              <div className="space-y-2">
                <label
                  htmlFor="supporter-name"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Your Name / Title (Optional)
                </label>
                <input
                  id="supporter-name"
                  type="text"
                  placeholder="e.g. Comrade David Oche"
                  value={supporterName}
                  onChange={(e) => setSupporterName(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* LGA Dropdown */}
              <div className="space-y-2">
                <label
                  htmlFor="lga-select"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Local Government Area <span className="text-red-500">*</span>
                </label>
                <select
                  id="lga-select"
                  value={selectedLga}
                  onChange={(e) => {
                    setSelectedLga(e.target.value);
                    setWard("");
                    if (formError) setFormError("");
                  }}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                >
                  <option value="">-- Select LGA in Constituency --</option>
                  {CONSTITUENCY_LGAS.map((lga) => (
                    <option key={lga.name} value={lga.name}>
                      {lga.name} Local Government Area
                    </option>
                  ))}
                </select>
              </div>

              {/* Ward Dropdown / Input */}
              <div className="space-y-2">
                <label
                  htmlFor="ward-input"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Ward (Optional)
                </label>
                {currentLgaData ? (
                  <select
                    id="ward-select"
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                  >
                    <option value="">-- Select Ward in {selectedLga} --</option>
                    {currentLgaData.wards.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id="ward-input"
                    type="text"
                    placeholder="Select your LGA first or type ward"
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                )}
              </div>

              {/* Error Message */}
              {formError && (
                <div className="flex items-center gap-2 rounded-xl bg-red-50 p-4 text-xs font-semibold text-red-700 border border-red-200">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isGenerating || !rawImage}
                className={`w-full rounded-2xl py-4 text-base font-black text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                  isGenerating || !rawImage
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary hover:bg-emerald-700 active:scale-95 shadow-emerald-950/20"
                }`}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    <span>Rendering High-Res G-ONE Poster...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    <span>Generate & Download Poster</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Live Sticky Preview (Right: 5 cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-4">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Live Poster Preview
                </span>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                  100% Matching Frame
                </span>
              </div>

              {/* Composite Preview Container */}
              <div className="relative mt-4 aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 shadow-md">
                {/* 1. Cropped user photo positioned inside frame cutout */}
                {croppedImageResult ? (
                  <div
                    className="absolute overflow-hidden"
                    style={{
                      top: FRAME_CONFIG.cutout.top,
                      left: FRAME_CONFIG.cutout.left,
                      right: FRAME_CONFIG.cutout.right,
                      bottom: FRAME_CONFIG.cutout.bottom,
                      borderRadius: FRAME_CONFIG.cutout.borderRadius,
                    }}
                  >
                    <Image
                      src={croppedImageResult}
                      alt="Supporter Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-gray-400">
                    <ImageIcon className="h-12 w-12 text-gray-300 mb-2" />
                    <p className="text-xs font-medium">
                      Your photo will appear here inside the official G-ONE campaign frame
                    </p>
                  </div>
                )}

                {/* 2. Official Transparent Frame Overlay */}
                <Image
                  src={FRAME_CONFIG.frameSrc}
                  alt="Official G-ONE Campaign Frame"
                  fill
                  priority
                  className="pointer-events-none absolute inset-0 object-contain z-10"
                />
              </div>

              {/* Candidate Metadata Summary */}
              <div className="mt-4 rounded-xl bg-gray-50 p-3.5 text-center border border-gray-100 space-y-1">
                <p className="text-xs font-black text-gray-900">
                  {G_ONE_CANDIDATE.name} ({G_ONE_CANDIDATE.moniker})
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {G_ONE_CANDIDATE.office} · {G_ONE_CANDIDATE.constituency}
                </p>
                <p className="text-[10px] font-bold text-primary">
                  {G_ONE_CANDIDATE.slogan} · {G_ONE_CANDIDATE.party}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GeneratePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      }
    >
      <GenerateContent />
    </Suspense>
  );
}
