import { FRAME_CONFIG } from "./data";

export interface PosterOptions {
  croppedImageSrc: string;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

export async function generatePosterCanvas({
  croppedImageSrc,
}: PosterOptions): Promise<{ blob: Blob; dataUrl: string }> {
  const [userImg, frameImg] = await Promise.all([
    loadImage(croppedImageSrc),
    loadImage(FRAME_CONFIG.frameSrc),
  ]);

  const canvas = document.createElement("canvas");
  const width = frameImg.naturalWidth || FRAME_CONFIG.dimensions.width;
  const height = frameImg.naturalHeight || FRAME_CONFIG.dimensions.height;

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not acquire 2D rendering context");
  }

  // Smooth image rendering
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Calculate coordinates from cutout config
  const parsePercent = (val: string, total: number) =>
    (parseFloat(val) / 100) * total;

  const top = parsePercent(FRAME_CONFIG.cutout.top, height);
  const left = parsePercent(FRAME_CONFIG.cutout.left, width);
  const right = parsePercent(FRAME_CONFIG.cutout.right, width);
  const bottom = parsePercent(FRAME_CONFIG.cutout.bottom, height);

  const drawWidth = width - left - right;
  const drawHeight = height - top - bottom;

  // Clip user image to rounded rectangle matching frame cutout
  const radius = 28;
  ctx.save();
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(left, top, drawWidth, drawHeight, radius);
  } else {
    ctx.rect(left, top, drawWidth, drawHeight);
  }
  ctx.clip();

  // Draw user's cropped photo behind frame window
  ctx.drawImage(userImg, left, top, drawWidth, drawHeight);
  ctx.restore();

  // Overlay the transparent frame
  ctx.drawImage(frameImg, 0, 0, width, height);

  const dataUrl = canvas.toDataURL("image/png");

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => {
      if (b) resolve(b);
      else reject(new Error("Canvas toBlob failed"));
    }, "image/png");
  });

  return { blob, dataUrl };
}
