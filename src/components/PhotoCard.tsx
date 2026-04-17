import { GlassPlayIcon } from "./GlassPlayIcon";

interface Props {
  src: string;
  onOpen: () => void;
}

export function PhotoCard({ src, onOpen }: Props) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block w-full overflow-hidden rounded-2xl border border-pink-500/20 bg-black/40 shadow-[0_10px_40px_-10px_rgba(236,72,153,0.5)] transition-transform duration-300 hover:scale-[1.01] sgf-fade-in"
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        className="block w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <GlassPlayIcon />
      </div>
    </button>
  );
}
