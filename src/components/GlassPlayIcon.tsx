interface Props {
  size?: "md" | "lg";
}

export function GlassPlayIcon({ size = "md" }: Props) {
  const dim = size === "lg" ? "h-28 w-28 sm:h-36 sm:w-36" : "h-20 w-20 sm:h-24 sm:w-24";
  return (
    <div
      className={`${dim} relative rounded-full flex items-center justify-center sgf-pulse`}
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(236,72,153,0.25))",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.4)",
        boxShadow:
          "0 0 40px rgba(236,72,153,0.7), inset 0 0 20px rgba(255,255,255,0.2)",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-1/2 w-1/2 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        fill="currentColor"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  );
}
