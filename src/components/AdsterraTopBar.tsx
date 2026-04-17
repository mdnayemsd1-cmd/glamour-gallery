import { useEffect, useRef } from "react";

export function AdsterraTopBar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    if (container.dataset.loaded === "1") return;
    container.dataset.loaded = "1";
    const s = document.createElement("script");
    s.src =
      "https://pl26115179.profitablecpmratenetwork.com/73/64/27/736427f18d1ceb3b967b0d6fc044970b.js";
    s.async = true;
    container.appendChild(s);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] flex justify-center items-center bg-black/60 backdrop-blur-sm border-b border-pink-500/20 min-h-[60px]"
      ref={ref}
    />
  );
}
