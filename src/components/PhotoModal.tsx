import { useEffect } from "react";
import { GlassPlayIcon } from "./GlassPlayIcon";
import { openAd } from "@/lib/gallery";
import { X } from "lucide-react";

interface Props {
  src: string | null;
  onClose: () => void;
}

export function PhotoModal({ src, onClose }: Props) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sgf-fade-in">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white"
      >
        <X className="h-5 w-5" />
      </button>
      <div className="relative max-h-full max-w-5xl w-full">
        <img
          src={src}
          alt=""
          className="block mx-auto max-h-[90vh] w-auto max-w-full rounded-2xl shadow-[0_0_60px_rgba(236,72,153,0.5)]"
        />
        <button
          type="button"
          onClick={openAd}
          aria-label="Play"
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
        >
          <GlassPlayIcon size="lg" />
        </button>
      </div>
    </div>
  );
}
