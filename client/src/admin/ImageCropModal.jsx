import { useMemo, useState } from "react";
import { X } from "lucide-react";

const OUTPUT_WIDTH = 1200;
const OUTPUT_HEIGHT = 900;

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

export default function ImageCropModal({ src, onCancel, onApplyOriginal, onApplyCropped }) {
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isApplying, setIsApplying] = useState(false);

  const previewStyle = useMemo(
    () => ({
      transform: `translate(${offsetX}px, ${offsetY}px) scale(${zoom})`,
    }),
    [offsetX, offsetY, zoom]
  );

  const applyCrop = async () => {
    setIsApplying(true);
    try {
      const image = await loadImage(src);
      const canvas = document.createElement("canvas");
      canvas.width = OUTPUT_WIDTH;
      canvas.height = OUTPUT_HEIGHT;
      const context = canvas.getContext("2d");

      const baseScale = Math.max(OUTPUT_WIDTH / image.naturalWidth, OUTPUT_HEIGHT / image.naturalHeight);
      const drawWidth = image.naturalWidth * baseScale * zoom;
      const drawHeight = image.naturalHeight * baseScale * zoom;
      const drawX = (OUTPUT_WIDTH - drawWidth) / 2 + offsetX * 3;
      const drawY = (OUTPUT_HEIGHT - drawHeight) / 2 + offsetY * 3;

      context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
      const croppedData = canvas.toDataURL("image/jpeg", 0.9);
      onApplyCropped(croppedData);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-slate-950/80 p-3 backdrop-blur-sm sm:items-center sm:p-5">
      <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-slate-900 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white">Crop Machinery Image</h3>
            <p className="text-xs text-slate-400">Adjust frame, zoom and position before saving.</p>
          </div>
          <button type="button" onClick={onCancel} className="rounded-md border border-slate-600 p-1.5 text-slate-300 hover:bg-white/5">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden">
            <img src={src} alt="Crop preview" className="absolute inset-0 h-full w-full object-cover transition-transform duration-150" style={previewStyle} />
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">Zoom</label>
            <input type="range" min="1" max="2.5" step="0.05" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} className="w-full" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">Horizontal</label>
            <input type="range" min="-120" max="120" step="1" value={offsetX} onChange={(event) => setOffsetX(Number(event.target.value))} className="w-full" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">Vertical</label>
            <input type="range" min="-120" max="120" step="1" value={offsetY} onChange={(event) => setOffsetY(Number(event.target.value))} className="w-full" />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" onClick={applyCrop} disabled={isApplying} className="rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-200 disabled:opacity-70">
            {isApplying ? "Applying..." : "Apply Crop"}
          </button>
          <button type="button" onClick={onApplyOriginal} className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-200 hover:bg-white/5">
            Use Original
          </button>
          <button type="button" onClick={onCancel} className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-200 hover:bg-white/5">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
