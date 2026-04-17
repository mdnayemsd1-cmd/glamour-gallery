import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { AdsterraTopBar } from "@/components/AdsterraTopBar";
import { PhotoCard } from "@/components/PhotoCard";
import { PhotoModal } from "@/components/PhotoModal";
import { SecretAdminTap } from "@/components/SecretAdminTap";
import { ADSTERRA_AD_URL, GALLERY_EVENT, getImages } from "@/lib/gallery";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SuperGirlfred" },
      { name: "description", content: "SuperGirlfred — premium gallery" },
      { property: "og:title", content: "SuperGirlfred" },
      { property: "og:description", content: "SuperGirlfred — premium gallery" },
    ],
  }),
  component: Index,
});

function Index() {
  const [images, setImagesState] = useState<string[]>([]);
  const [openSrc, setOpenSrc] = useState<string | null>(null);

  useEffect(() => {
    setImagesState(getImages());
    const sync = () => setImagesState(getImages());
    window.addEventListener(GALLERY_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(GALLERY_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  // Back-button hijack -> Adsterra ad
  useEffect(() => {
    const SENTINEL = "sgf-back";
    history.pushState({ sgf: SENTINEL }, "");
    const onPop = () => {
      window.location.href = ADSTERRA_AD_URL;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return (
    <div className="relative min-h-screen sgf-animated-bg overflow-x-hidden">
      {/* Dark texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(0,0,0,0.4), rgba(0,0,0,0.85))",
        }}
      />

      <AdsterraTopBar />
      <SecretAdminTap />

      <main className="relative z-10 pt-24 pb-16 px-4 max-w-2xl mx-auto">
        <header className="mb-8 text-left">
          <Logo />
          <p className="mt-2 text-pink-200/80 text-sm tracking-wide">
            Exclusive · Premium · For You
          </p>
        </header>

        <section className="flex flex-col gap-6">
          {images.length === 0 ? (
            <div className="rounded-2xl border border-pink-500/20 bg-black/40 backdrop-blur-md p-10 text-center text-pink-100/70">
              No photos yet. Check back soon 💕
            </div>
          ) : (
            images.map((src, i) => (
              <PhotoCard key={`${src}-${i}`} src={src} onOpen={() => setOpenSrc(src)} />
            ))
          )}
        </section>
      </main>

      <PhotoModal src={openSrc} onClose={() => setOpenSrc(null)} />
    </div>
  );
}
