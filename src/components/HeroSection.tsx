import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ChevronDown, Download, Gamepad2, Star } from "lucide-react";
import Pokeball from "@/components/immersive/Pokeball";
import { SHOWCASE, artworkUrl } from "@/lib/sprites";
import { TYPE_COLORS, getContrastTextColor } from "@/data/typeChart";
import { PLAY_STORE_URL } from "@/lib/links";

const ROTATE_MS = 4200;

const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const current = SHOWCASE[index];
  const aura = TYPE_COLORS[current.types[0]];
  const aura2 = TYPE_COLORS[current.types[1] ?? current.types[0]];

  // Mouse parallax for the stage
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18 });
  const sy = useSpring(my, { stiffness: 80, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [10, -10]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [-8, 8]);
  const artX = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const artY = useTransform(sy, [-0.5, 0.5], [-12, 12]);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % SHOWCASE.length), ROTATE_MS);
    return () => clearInterval(t);
  }, [paused, reduceMotion]);

  // Warm the cache for the next artwork so the swap never flashes empty.
  useEffect(() => {
    const next = SHOWCASE[(index + 1) % SHOWCASE.length];
    const img = new Image();
    img.src = artworkUrl(next.id);
  }, [index]);

  const onPointerMove = (e: React.PointerEvent) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16">
      <div className="container mx-auto grid items-center gap-12 px-6 lg:grid-cols-[1.05fr_1fr]">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center lg:text-left"
        >
          <div className="glass mb-6 inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-medium text-white/90 sm:mb-8 sm:gap-2.5 sm:px-4 sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.9)] animate-pulse-dot" />
            <Star className="h-3.5 w-3.5 fill-accent-yellow text-accent-yellow" />
            Free on Google Play<span className="hidden min-[360px]:inline"> · 10k+ trainers</span>
          </div>

          <h1 className="mb-6 font-display font-extrabold leading-[0.95]">
            <span className="block text-[clamp(2.6rem,12.5vw,4.5rem)] sm:text-7xl xl:text-8xl shimmer-text">Dexverse</span>
            <span className="mt-4 block text-2xl font-bold text-white/95 sm:text-3xl xl:text-4xl">
              The Pokédex that feels <span className="text-gradient-fire">alive.</span>
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-base sm:mb-10 leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
            All 1,025 Pokémon from Kanto to Paldea — stats, evolutions, movesets and type
            matchups, plus a team builder and mini games. A free Pokédex app for Android, built
            by a trainer, for trainers.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full max-w-xs items-center whitespace-nowrap sm:w-auto sm:min-w-[230px] justify-center gap-2.5 rounded-2xl bg-gradient-hero px-8 py-4 text-base font-semibold text-white glow-red transition-transform duration-300 hover:scale-105"
            >
              <Download className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
              Get it on Google Play
            </a>
            <Link
              to="/who-is-that-pokemon"
              className="glass inline-flex w-full max-w-xs items-center justify-center gap-2.5 whitespace-nowrap rounded-2xl px-6 py-4 sm:w-auto text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Gamepad2 className="h-5 w-5 text-accent" />
              Play in your browser
            </Link>
          </div>

          <dl className="mt-10 flex justify-center gap-6 sm:mt-12 sm:gap-12 lg:justify-start">
            {[
              ["1,025", "Pokémon"],
              ["18", "Types"],
              ["9", "Generations"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-2xl font-bold text-white sm:text-3xl">{value}</dd>
                <dd className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* Dex stage */}
        <div
          ref={stageRef}
          onPointerMove={onPointerMove}
          onPointerLeave={() => {
            mx.set(0);
            my.set(0);
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[460px] lg:max-w-[540px] [perspective:1200px]"
        >
          <motion.div style={{ rotateX, rotateY }} className="relative h-full w-full [transform-style:preserve-3d]">
            {/* Aura */}
            <motion.div
              className="absolute inset-[8%] rounded-full blur-3xl"
              animate={{
                background: `radial-gradient(circle, ${aura}66 0%, ${aura2}33 45%, transparent 70%)`,
              }}
              transition={{ duration: 1.2 }}
            />

            {/* Rings */}
            <Pokeball outline className="absolute inset-0 h-full w-full text-white/[0.07] animate-spin-slower" />
            <div className="absolute inset-[9%] rounded-full border border-dashed border-white/10 animate-spin-slow" />
            <motion.div
              className="absolute inset-[18%] rounded-full border-2"
              animate={{ borderColor: `${aura}55`, boxShadow: `0 0 60px ${aura}33, inset 0 0 60px ${aura}22` }}
              transition={{ duration: 1.2 }}
            />

            {/* Artwork */}
            <motion.div style={{ x: artX, y: artY }} className="absolute inset-[10%]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.id}
                  src={artworkUrl(current.id)}
                  alt={`${current.name} official artwork`}
                  width={475}
                  height={475}
                  initial={{ opacity: 0, scale: 0.6, filter: "brightness(0) blur(6px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "brightness(1) blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.15, filter: "brightness(3) blur(10px)" }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full w-full object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)] animate-float"
                  draggable={false}
                />
              </AnimatePresence>
            </motion.div>

            {/* Dex entry card */}
            <div className="glass absolute bottom-[4%] left-1/2 w-[78%] -translate-x-1/2 rounded-2xl px-5 py-4 shadow-large sm:left-auto sm:right-0 sm:w-auto sm:min-w-[230px] sm:translate-x-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="font-mono text-xs text-muted-foreground">
                    No. {String(current.id).padStart(4, "0")}
                  </p>
                  <p className="font-display text-xl font-bold">{current.name}</p>
                  <div className="mt-2 flex gap-1.5">
                    {current.types.map((t) => (
                      <span
                        key={t}
                        className="rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide"
                        style={{ backgroundColor: TYPE_COLORS[t], color: getContrastTextColor(TYPE_COLORS[t]) }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Selector dots */}
          <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 gap-1.5" role="tablist" aria-label="Featured Pokémon">
            {SHOWCASE.map((p, i) => (
              <button
                key={p.id}
                role="tab"
                aria-selected={i === index}
                aria-label={`Show ${p.name}`}
                onClick={() => setIndex(i)}
                className="group p-1"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-500 ${
                    i === index ? "w-6 bg-white" : "w-1.5 bg-white/25 group-hover:bg-white/50"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <a
        href="#features"
        aria-label="Scroll to features"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center text-white/50 transition-colors hover:text-white lg:flex"
      >
        <span className="text-[10px] font-semibold tracking-[0.3em]">SCROLL</span>
        <ChevronDown className="mt-1 h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
};

export default HeroSection;
