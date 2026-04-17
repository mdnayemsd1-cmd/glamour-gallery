import { useNavigate } from "@tanstack/react-router";
import { useRef } from "react";

export function SecretAdminTap() {
  const navigate = useNavigate();
  const count = useRef(0);
  const last = useRef(0);

  const handleTap = () => {
    const now = Date.now();
    if (now - last.current > 600) count.current = 0;
    last.current = now;
    count.current += 1;
    if (count.current >= 7) {
      count.current = 0;
      navigate({ to: "/admin" });
    }
  };

  return (
    <button
      type="button"
      aria-hidden="true"
      tabIndex={-1}
      onClick={handleTap}
      className="fixed bottom-0 right-0 z-[9998] h-20 w-24 opacity-0"
    />
  );
}
