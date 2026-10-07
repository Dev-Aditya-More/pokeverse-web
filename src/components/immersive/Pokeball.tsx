import { useId } from "react";
import { cn } from "@/lib/utils";

interface PokeballProps {
  className?: string;
  /** Draw only the outline — used for decorative background rings. */
  outline?: boolean;
}

const Pokeball = ({ className, outline = false }: PokeballProps) => {
  // Unique gradient ids so several balls on one page don't share/clobber defs.
  const uid = useId().replace(/:/g, "");

  if (outline) {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
        <circle cx="50" cy="50" r="47" stroke="currentColor" strokeWidth="1.2" />
        <path d="M3 50h32M65 50h32" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="50" cy="50" r="7" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 100 100" className={cn("drop-shadow-xl", className)} aria-hidden="true">
      <defs>
        <linearGradient id={`pb-top-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff5a68" />
          <stop offset="100%" stopColor="#d61f36" />
        </linearGradient>
        <linearGradient id={`pb-bottom-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cfd6e6" />
        </linearGradient>
      </defs>
      <path d="M3 50a47 47 0 0 1 94 0z" fill={`url(#pb-top-${uid})`} />
      <path d="M3 50a47 47 0 0 0 94 0z" fill={`url(#pb-bottom-${uid})`} />
      <circle cx="50" cy="50" r="47" fill="none" stroke="#0b0f1c" strokeWidth="4" />
      <rect x="3" y="46" width="94" height="8" fill="#0b0f1c" />
      <circle cx="50" cy="50" r="15" fill="#0b0f1c" />
      <circle cx="50" cy="50" r="9" fill="#f4f6fb" />
      <ellipse cx="30" cy="24" rx="10" ry="5" fill="#ffffff" opacity="0.35" transform="rotate(-30 30 24)" />
    </svg>
  );
};

export default Pokeball;
