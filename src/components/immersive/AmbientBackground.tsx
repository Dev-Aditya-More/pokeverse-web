import { useEffect, useRef } from "react";
import { TYPE_COLORS } from "@/data/typeChart";

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  color: string;
  phase: number;
}

const COLORS = Object.values(TYPE_COLORS);

/**
 * Fixed, site-wide backdrop: aurora gradients, a faint grid, drifting type-coloured
 * "energy" motes on a canvas, and a soft spotlight that follows the cursor.
 */
const AmbientBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;

    const seed = () => {
      const count = Math.round(Math.min(70, (width * height) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -Math.random() * 0.25 - 0.05,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }
        const twinkle = 0.45 + 0.55 * Math.sin(t / 900 + p.phase);
        ctx.globalAlpha = 0.25 + twinkle * 0.55;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };

    const loop = (t: number) => {
      draw(t);
      frame = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden && !reduceMotion) frame = requestAnimationFrame(loop);
    };

    const onPointer = (e: PointerEvent) => {
      spotlightRef.current?.style.setProperty("--mx", `${e.clientX}px`);
      spotlightRef.current?.style.setProperty("--my", `${e.clientY}px`);
    };

    resize();
    if (reduceMotion) draw(0);
    else frame = requestAnimationFrame(loop);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Aurora */}
      <div className="absolute -top-1/3 -left-1/4 h-[80vh] w-[80vw] rounded-full bg-[radial-gradient(closest-side,hsl(190_100%_55%/0.16),transparent)] blur-2xl animate-drift" style={{ animationDuration: "22s" }} />
      <div className="absolute -bottom-1/3 -right-1/4 h-[80vh] w-[80vw] rounded-full bg-[radial-gradient(closest-side,hsl(354_90%_58%/0.13),transparent)] blur-2xl animate-drift" style={{ animationDuration: "28s", animationDelay: "4s" }} />
      <div className="absolute top-1/3 left-1/3 h-[60vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,hsl(262_80%_60%/0.10),transparent)] blur-2xl animate-drift" style={{ animationDuration: "34s", animationDelay: "9s" }} />

      {/* Grid, faded toward the edges */}
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]" />

      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Cursor spotlight */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx, 50%) var(--my, 30%), hsl(190 100% 60% / 0.06), transparent 60%)",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(228_45%_3%/0.8))]" />
    </div>
  );
};

export default AmbientBackground;
