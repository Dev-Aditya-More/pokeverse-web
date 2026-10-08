import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import SpotlightCard from "@/components/immersive/SpotlightCard";
import { TYPE_COLORS, TYPE_LIST } from "@/data/typeChart";
import { artworkUrl } from "@/lib/sprites";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const SilhouettePreview = () => (
  <div className="relative mb-6 flex h-48 items-center justify-center overflow-hidden rounded-2xl bg-[repeating-conic-gradient(from_0deg,hsl(45_96%_62%/0.18)_0deg_10deg,transparent_10deg_20deg)]">
    <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,hsl(228_38%_9%)_75%)]" />
    <img
      src={artworkUrl(94)}
      alt=""
      loading="lazy"
      className="relative h-40 w-40 object-contain brightness-0 transition-all duration-700 group-hover:scale-110 group-hover:brightness-100"
    />
    <span className="absolute bottom-3 right-4 font-display text-4xl font-black text-accent-yellow/90 [text-shadow:0_3px_0_hsl(222_75%_35%)]">
      ?
    </span>
  </div>
);

const TypeGridPreview = () => (
  <div className="mb-6 grid h-48 grid-cols-6 gap-1.5 rounded-2xl p-3">
    {TYPE_LIST.map((t, i) => (
      <span
        key={t}
        className="rounded-lg transition-transform duration-500 group-hover:scale-90"
        style={{ backgroundColor: TYPE_COLORS[t], transitionDelay: `${i * 20}ms` }}
      />
    ))}
  </div>
);

const GuidesPreview = () => (
  <div className="mb-6 flex h-48 flex-col justify-center gap-2.5 rounded-2xl p-4">
    {["Type chart explained", "Evolution methods", "IVs vs EVs", "Every generation"].map((title, i) => (
      <div
        key={title}
        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm transition-transform duration-500 group-hover:translate-x-2"
        style={{ transitionDelay: `${i * 60}ms` }}
      >
        <BookOpen className="h-4 w-4 text-accent" />
        {title}
      </div>
    ))}
  </div>
);

const tools = [
  {
    title: "Who's That Pokémon?",
    description: "Guess the silhouette, build your streak. All 1,025 Pokémon, unlimited rounds.",
    href: "/who-is-that-pokemon",
    cta: "Play now",
    preview: <SilhouettePreview />,
    glow: "hsl(45 96% 62% / 0.18)",
  },
  {
    title: "Pokémon Type Chart",
    description: "The full 18×18 matchup grid plus a dual-type weakness calculator.",
    href: "/pokemon-type-chart",
    cta: "Open chart",
    preview: <TypeGridPreview />,
    glow: "hsl(190 100% 60% / 0.18)",
  },
  {
    title: "Trainer Guides",
    description: "Battle mechanics explained clearly — no prior knowledge assumed.",
    href: "/guides",
    cta: "Start reading",
    preview: <GuidesPreview />,
    glow: "hsl(354 90% 60% / 0.18)",
  },
];

const PokemonToolsSection = () => {
  return (
    <section className="relative py-16 md:py-28">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <span className="eyebrow mb-6">✦ Free in your browser</span>
          <h2 className="mb-6 text-3xl font-extrabold sm:text-4xl md:text-5xl">
            More ways to <span className="text-gradient-fire">play</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            No install needed — jump straight into these free tools built on the same Pokémon data.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={i}
              variants={fadeUp}
            >
              <Link to={tool.href} className="block h-full">
                <SpotlightCard glow={tool.glow} className="h-full p-5">
                  {tool.preview}
                  <h3 className="mb-2 text-xl font-bold">{tool.title}</h3>
                  <p className="mb-5 leading-relaxed text-muted-foreground">{tool.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    {tool.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </SpotlightCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PokemonToolsSection;
