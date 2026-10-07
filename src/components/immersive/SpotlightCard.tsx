import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Any CSS colour; the glow that follows the cursor. */
  glow?: string;
}

/** Glass card with a radial highlight that tracks the pointer. */
const SpotlightCard = ({ glow = "hsl(190 100% 60% / 0.18)", className, children, ...props }: SpotlightCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--sy", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={cn(
        "glass group relative overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-large",
        className
      )}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(420px circle at var(--sx) var(--sy), ${glow}, transparent 65%)` }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

export default SpotlightCard;
