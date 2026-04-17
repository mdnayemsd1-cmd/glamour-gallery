export const GALLERY_KEY = "sgf_images";
export const GALLERY_EVENT = "sgf_images_changed";
export const ADSTERRA_AD_URL =
  "https://www.profitablecpmratenetwork.com/j9t55qa2h3?key=f995d1e045b0250be42388c3deb2a1c1";

export function getImages(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(GALLERY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((u) => typeof u === "string") : [];
  } catch {
    return [];
  }
}

export function setImages(images: string[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(GALLERY_KEY, JSON.stringify(images));
  window.dispatchEvent(new CustomEvent(GALLERY_EVENT));
}

export function addImages(urls: string[]): string[] {
  const current = getImages();
  const next = [...current, ...urls];
  setImages(next);
  return next;
}

export function removeImage(index: number): string[] {
  const current = getImages();
  const next = current.filter((_, i) => i !== index);
  setImages(next);
  return next;
}

export function clearImages(): void {
  setImages([]);
}

export function openAd(): void {
  if (typeof window === "undefined") return;
  window.open(ADSTERRA_AD_URL, "_blank", "noopener,noreferrer");
}
