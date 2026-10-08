import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import screenshot1 from "@/assets/screenshot-1.webp";
import screenshot2 from "@/assets/screenshot-2.webp";
import screenshot3 from "@/assets/screenshot-3.webp";
import screenshot4 from "@/assets/screenshot-4.webp";
import screenshot5 from "@/assets/screenshot-5.webp";
import screenshot6 from "@/assets/screenshot-6.webp";
import screenshot7 from "@/assets/screenshot-7.webp";
import screenshot8 from "@/assets/screenshot-8.webp";

const screenshots = [
  {
    src: screenshot1,
    alt: "Dexverse app main interface showing Pokémon grid with search and filter options",
    title: "Discover & Browse",
    tag: "Home",
  },
  {
    src: screenshot2,
    alt: "Dexverse Pokémon detail view with artwork, abilities, and type effectiveness",
    title: "In-Depth Details",
    tag: "Detail View",
  },
  {
    src: screenshot3,
    alt: "Dexverse detailed Pokémon team screen displaying stats, abilities, and moves",
    title: "Build Unlimited Teams",
    tag: "Team Builder",
  },
  {
    src: screenshot4,
    alt: "Team analysis screen with charts and type coverage",
    title: "Team Analysis",
    tag: "Analytics",
  },
  {
    src: screenshot8,
    alt: "Choose your comfort theme screen with light and dark mode options",
    title: "Choose Your Theme",
    tag: "Themes",
  },
  {
    src: screenshot5,
    alt: "Relax and Play Mini Games",
    title: "Mini Games",
    tag: "Play",
  },
  {
    src: screenshot7,
    alt: "Legendaries from every region",
    title: "Dexverse Legends",
    tag: "Legendaries",
  },
  {
    src: screenshot6,
    alt: "Customise with Particle Effects",
    title: "Particle Effects",
    tag: "Customise",
  },
];

const ShotCard = ({ shot, index }: { shot: (typeof screenshots)[number]; index: number }) => (
  <figure className="group w-[240px] shrink-0 snap-center sm:w-[270px] lg:w-[300px]">
    {/* Store graphics already include a device frame, so just present them as cards. */}
    <div className="aspect-[9/16] overflow-hidden rounded-3xl border border-white/10 bg-card shadow-large transition-all duration-500 group-hover:-translate-y-2 group-hover:border-white/25 group-hover:rotate-[-1deg]">
      <img
        src={shot.src}
        alt={shot.alt}
        width={720}
        height={1280}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>
    <figcaption className="mt-5 flex items-center justify-between px-2">
      <span>
        <span className="mr-2 font-mono text-xs text-accent/70">{String(index + 1).padStart(2, "0")}</span>
        <span className="font-semibold">{shot.title}</span>
      </span>
      <span className="rounded-full border border-accent/20 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-accent/80">
        {shot.tag}
      </span>
    </figcaption>
  </figure>
);

const Heading = () => (
  <div className="mb-12 text-center lg:mb-0 lg:w-[380px] lg:shrink-0 lg:text-left">
    <span className="eyebrow mb-6">✦ App preview</span>
    <h2 className="mb-6 text-3xl font-extrabold sm:text-4xl md:text-5xl">
      Built for beauty. <span className="text-gradient-fire">Built for speed.</span>
    </h2>
    <p className="text-lg leading-relaxed text-muted-foreground">
      Every screen crafted with care — so exploring the Pokémon world feels as good as it looks.
    </p>
    <p className="mt-6 hidden text-xs font-semibold uppercase tracking-[0.3em] text-white/40 lg:block">
      Keep scrolling →
    </p>
  </div>
);

const ScreenshotsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth + 48));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, -distance]), {
    stiffness: 120,
    damping: 30,
  });

  return (
    <>
      {/* Desktop: vertical scroll drives a pinned horizontal gallery */}
      <section
        ref={sectionRef}
        className="relative hidden lg:block"
        style={{ height: `calc(100vh + ${distance}px)` }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div ref={trackRef} style={{ x }} className="flex items-center gap-10 pl-[max(3rem,calc((100vw-72rem)/2))] pr-12">
            <Heading />
            {screenshots.map((shot, i) => (
              <ShotCard key={shot.title} shot={shot} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mobile / tablet: native swipe */}
      <section className="py-16 lg:hidden">
        <div className="container mx-auto px-6">
          <Heading />
        </div>
        <div className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4">
          {screenshots.map((shot, i) => (
            <ShotCard key={shot.title} shot={shot} index={i} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ScreenshotsSection;
