import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import screenshot1 from "@/assets/ss1.webp";
import screenshot2 from "@/assets/ss2.webp";
import screenshot3 from "@/assets/ss3.webp";
import screenshot4 from "@/assets/ss4.webp";
import screenshot5 from "@/assets/ss5.webp";
import screenshot6 from "@/assets/ss6.webp";
import screenshot7 from "@/assets/ss7.webp";
import screenshot8 from "@/assets/ss8.webp";

// `hue` is the dominant accent of each store graphic; it tints the stage glow.
const screenshots = [
  {
    src: screenshot1,
    alt: "Dexverse app main interface showing Pokémon grid with search and filter options",
    title: "Discover & Browse",
    tag: "Home",
    blurb: "Every Pokémon in one fast, searchable grid, filtered by type, region and generation.",
    hue: 7,
  },
  {
    src: screenshot2,
    alt: "Dexverse Pokémon detail view with artwork, abilities, and type effectiveness",
    title: "In-Depth Details",
    tag: "Detail View",
    blurb: "Stats, abilities, evolutions and shiny forms, all on one screen.",
    hue: 130,
  },
  {
    src: screenshot3,
    alt: "Dexverse detailed Pokémon team screen displaying stats, abilities, and moves",
    title: "Build Unlimited Teams",
    tag: "Team Builder",
    blurb: "Build as many teams as you like, with moves and abilities for every slot.",
    hue: 202,
  },
  {
    src: screenshot4,
    alt: "Team analysis screen with charts and type coverage",
    title: "Team Analysis",
    tag: "Analytics",
    blurb: "See your type coverage and weak spots before your rival does.",
    hue: 7,
  },
  {
    src: screenshot8,
    alt: "Choose your comfort theme screen with light and dark mode options",
    title: "Choose Your Theme",
    tag: "Themes",
    blurb: "Light, dark and everything in between. Make the Dex feel like yours.",
    hue: 127,
  },
  {
    src: screenshot5,
    alt: "Relax and Play Mini Games",
    title: "Mini Games",
    tag: "Play",
    blurb: "Take a break with quick Pokémon mini games built right in.",
    hue: 127,
  },
  {
    src: screenshot7,
    alt: "Legendaries from every region",
    title: "Dexverse Legends",
    tag: "Legendaries",
    blurb: "Legendary and Mythical Pokémon from every region, in one place.",
    hue: 352,
  },
  {
    src: screenshot6,
    alt: "Customise with Particle Effects",
    title: "Particle Effects",
    tag: "Customise",
    blurb: "Add particle effects that bring every screen to life.",
    hue: 202,
  },
];

type Shot = (typeof screenshots)[number];
const COUNT = screenshots.length;
const pad = (n: number) => String(n).padStart(2, "0");

/* ------------------------------------------------------------------ */
/* Coverflow stage: the active phone is front and centre, the rest fan */
/* out in 3D behind it.                                                */
/* ------------------------------------------------------------------ */

const TiltCard = ({ shot, interactive }: { shot: Shot; interactive: boolean }) => {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 180, damping: 18 };
  const rotateY = useSpring(useTransform(px, [0, 1], [-14, 14]), spring);
  const rotateX = useSpring(useTransform(py, [0, 1], [12, -12]), spring);
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, hsl(0 0% 100% / 0.22), transparent 55%)`;

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!interactive || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={interactive ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      className="relative h-full w-full"
    >
      <img
        src={shot.src}
        alt={shot.alt}
        width={720}
        height={1280}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="h-full w-full select-none rounded-[1.75rem] object-cover"
      />
      {interactive && (
        <motion.div
          aria-hidden
          style={{ background: glare }}
          className="pointer-events-none absolute inset-0 rounded-[1.75rem] mix-blend-overlay"
        />
      )}
    </motion.div>
  );
};

const Stage = ({
  active,
  onSelect,
  reduceMotion,
}: {
  active: number;
  onSelect: (i: number) => void;
  reduceMotion: boolean;
}) => (
  <div className="relative mx-auto aspect-[9/16] w-[220px] [perspective:1400px] sm:w-[260px] lg:w-[300px] xl:w-[320px]">
    {screenshots.map((shot, i) => {
      const d = i - active;
      const abs = Math.abs(d);
      const hidden = abs > 3;
      return (
        <motion.button
          key={shot.title}
          type="button"
          aria-label={`Show ${shot.title}`}
          aria-current={d === 0 ? "true" : undefined}
          tabIndex={d === 0 || hidden ? -1 : 0}
          onClick={() => onSelect(i)}
          initial={false}
          animate={{
            x: `${d * 62}%`,
            z: -abs * 160,
            rotateY: Math.max(-3, Math.min(3, d)) * -32,
            scale: d === 0 ? 1 : 0.9 - abs * 0.04,
            opacity: hidden ? 0 : 1 - abs * 0.22,
            filter: `blur(${abs * 1.5}px) brightness(${1 - abs * 0.18})`,
          }}
          transition={
            reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 22, mass: 0.9 }
          }
          style={{ zIndex: COUNT - abs, transformStyle: "preserve-3d", pointerEvents: hidden ? "none" : "auto" }}
          className={`absolute inset-0 rounded-[1.75rem] border shadow-large outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent ${
            d === 0 ? "cursor-default border-white/20" : "cursor-pointer border-white/10"
          }`}
        >
          <TiltCard shot={shot} interactive={d === 0 && !reduceMotion} />
        </motion.button>
      );
    })}
  </div>
);

/* Colour-shifting glow behind the stage, keyed to the active screen. */
const StageGlow = ({ hue }: { hue: number }) => (
  <motion.div
    aria-hidden
    initial={false}
    animate={{
      background: `radial-gradient(45% 50% at 50% 50%, hsl(${hue} 85% 50% / 0.28), transparent 70%)`,
    }}
    transition={{ duration: 0.9, ease: "easeOut" }}
    className="pointer-events-none absolute inset-0"
  />
);

/* Animated caption: tag, counter, title and blurb swap on change. */
const Caption = ({ active, align = "left" }: { active: number; align?: "left" | "center" }) => {
  const shot = screenshots[active];
  return (
    <div className={`relative min-h-[11rem] ${align === "center" ? "text-center" : ""}`} aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={`mb-4 flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
            <span
              className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
              style={{
                color: `hsl(${shot.hue} 90% 70%)`,
                borderColor: `hsl(${shot.hue} 90% 60% / 0.35)`,
                background: `hsl(${shot.hue} 90% 50% / 0.1)`,
              }}
            >
              {shot.tag}
            </span>
            <span className="font-mono text-xs text-white/40">
              {pad(active + 1)} / {pad(COUNT)}
            </span>
          </div>
          <h3 className="mb-3 text-2xl font-extrabold sm:text-3xl">{shot.title}</h3>
          <p className={`max-w-sm leading-relaxed text-muted-foreground ${align === "center" ? "mx-auto" : ""}`}>
            {shot.blurb}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Heading = ({ className = "" }: { className?: string }) => (
  <div className={className}>
    <span className="eyebrow mb-6">✦ App preview</span>
    <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl md:text-5xl lg:text-[2.6rem] lg:leading-[1.1]">
      Built for beauty. <span className="text-gradient-fire">Built for speed.</span>
    </h2>
  </div>
);

/* ------------------------------------------------------------------ */
/* Desktop: the section pins and scrolling steps through each screen.  */
/* ------------------------------------------------------------------ */

const Chapters = ({
  active,
  progress,
  onSelect,
}: {
  active: number;
  progress: MotionValue<number>;
  onSelect: (i: number) => void;
}) => (
  <ol className="relative mt-8 space-y-1 border-l border-white/10">
    <motion.span
      aria-hidden
      style={{ scaleY: progress }}
      className="absolute -left-px top-0 h-full w-px origin-top bg-accent"
    />
    {screenshots.map((shot, i) => (
      <li key={shot.title}>
        <button
          type="button"
          onClick={() => onSelect(i)}
          className={`flex w-full items-center gap-3 py-1.5 pl-5 text-left text-sm transition-all duration-300 ${
            i === active ? "translate-x-1 text-foreground" : "text-white/35 hover:text-white/70"
          }`}
        >
          <span className="font-mono text-[11px]">{pad(i + 1)}</span>
          <span className="font-medium">{shot.title}</span>
        </button>
      </li>
    ))}
  </ol>
);

const DesktopShowcase = ({ reduceMotion }: { reduceMotion: boolean }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(COUNT - 1, Math.max(0, Math.floor(v * COUNT))));
  });

  // Jump the page so the pinned section lands on the chosen screen.
  const goTo = useCallback((i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * ((i + 0.5) / COUNT), behavior: "smooth" });
  }, []);

  return (
    <section ref={sectionRef} className="relative hidden lg:block" style={{ height: `${COUNT * 70 + 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <StageGlow hue={screenshots[active].hue} />
        <div className="container relative mx-auto grid grid-cols-[minmax(0,420px)_1fr] items-center gap-12 px-12">
          <div>
            <Heading />
            <Caption active={active} />
            <Chapters active={active} progress={progress} onSelect={goTo} />
          </div>
          <div className="relative flex h-[min(78vh,640px)] items-center justify-center">
            <Stage active={active} onSelect={goTo} reduceMotion={reduceMotion} />
          </div>
        </div>
        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30">
          Scroll to explore · click a screen to jump
        </p>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/* Mobile / tablet: swipeable coverflow with autoplay.                 */
/* ------------------------------------------------------------------ */

const AUTOPLAY_MS = 4200;

const MobileShowcase = ({ reduceMotion }: { reduceMotion: boolean }) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(reduceMotion);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  const select = useCallback((i: number) => {
    setActive((i + COUNT) % COUNT);
    setPaused(true);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % COUNT), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [active, paused, inView]);

  return (
    <section ref={rootRef} className="relative overflow-hidden py-16 lg:hidden">
      <StageGlow hue={screenshots[active].hue} />
      <div className="container relative mx-auto px-6">
        <Heading className="text-center" />
      </div>

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.25}
        onDragEnd={(_, info) => {
          if (info.offset.x < -50 || info.velocity.x < -400) select(active + 1);
          else if (info.offset.x > 50 || info.velocity.x > 400) select(active - 1);
        }}
        className="relative my-10 touch-pan-y"
      >
        <Stage active={active} onSelect={select} reduceMotion={reduceMotion} />
      </motion.div>

      <div className="container relative mx-auto px-6">
        <Caption active={active} align="center" />
        <div className="mt-2 flex justify-center gap-2" role="tablist" aria-label="App screens">
          {screenshots.map((shot, i) => (
            <button
              key={shot.title}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={shot.title}
              onClick={() => select(i)}
              className={`relative h-1.5 overflow-hidden rounded-full bg-white/15 transition-all duration-300 ${
                i === active ? "w-8" : "w-1.5"
              }`}
            >
              {i === active && (
                <motion.span
                  key={`${active}-${paused}`}
                  className="absolute inset-0 origin-left bg-accent"
                  initial={{ scaleX: paused ? 1 : 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: paused ? 0 : AUTOPLAY_MS / 1000, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

const ScreenshotsSection = () => {
  const reduceMotion = !!useReducedMotion();
  return (
    <>
      <DesktopShowcase reduceMotion={reduceMotion} />
      <MobileShowcase reduceMotion={reduceMotion} />
    </>
  );
};

export default ScreenshotsSection;
