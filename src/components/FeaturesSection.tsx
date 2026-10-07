import { motion, type Variants } from "framer-motion";
import { Database, Filter, Heart, Search, Smartphone } from "lucide-react";
import SpotlightCard from "@/components/immersive/SpotlightCard";
import { TYPE_COLORS, TYPE_LIST, getContrastTextColor } from "@/data/typeChart";
import { artworkUrl } from "@/lib/sprites";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const TypeCloud = () => (
  <div className="mt-6 flex flex-wrap gap-1.5">
    {TYPE_LIST.map((t) => (
      <span
        key={t}
        className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide transition-transform duration-300 hover:scale-110"
        style={{ backgroundColor: TYPE_COLORS[t], color: getContrastTextColor(TYPE_COLORS[t]) }}
      >
        {t}
      </span>
    ))}
  </div>
);

const SearchMock = () => (
  <div className="mt-6 flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 font-mono text-sm">
    <Search className="h-4 w-4 text-accent" />
    <span className="text-white/80">garch</span>
    <span className="h-4 w-0.5 animate-pulse bg-accent" />
    <span className="ml-auto rounded-md bg-white/10 px-1.5 text-[10px] text-white/50">#445</span>
  </div>
);

const FilterMock = () => (
  <div className="mt-6 space-y-2">
    {[
      ["Speed", 82],
      ["Attack", 64],
      ["Sp. Def", 40],
    ].map(([label, pct]) => (
      <div key={label} className="flex items-center gap-3 text-[11px] text-white/60">
        <span className="w-14">{label}</span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-accent"
            initial={{ width: 0 }}
            whileInView={{ width: `${pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>
      </div>
    ))}
  </div>
);

const FavoritesMock = () => (
  <div className="mt-6 flex -space-x-3">
    {[25, 133, 700, 448, 6].map((id) => (
      <div key={id} className="h-12 w-12 rounded-full border-2 border-background bg-secondary p-1 transition-transform hover:-translate-y-1">
        <img src={artworkUrl(id)} alt="" loading="lazy" className="h-full w-full object-contain" />
      </div>
    ))}
  </div>
);

const features = [
  {
    icon: Database,
    title: "Complete Pokédex",
    description:
      "Every generation, every stat, every evolution chain — 1,025 Pokémon plus regional forms, Megas and Gigantamax.",
    visual: <TypeCloud />,
    className: "lg:col-span-2",
    glow: "hsl(190 100% 60% / 0.18)",
  },
  {
    icon: Search,
    title: "Smart Search",
    description: "Find any Pokémon instantly by name, type, generation or ability.",
    visual: <SearchMock />,
    glow: "hsl(45 96% 62% / 0.16)",
  },
  {
    icon: Filter,
    title: "Advanced Filters",
    description: "Slice the dex by stats, rarity and type combos.",
    visual: <FilterMock />,
    glow: "hsl(262 80% 65% / 0.18)",
  },
  {
    icon: Heart,
    title: "Favourites & Teams",
    description: "Curate your squad and analyse its type coverage.",
    visual: <FavoritesMock />,
    glow: "hsl(354 90% 60% / 0.18)",
  },
  {
    icon: Smartphone,
    title: "Made to feel good",
    description: "Themes, particle effects and smooth motion on every screen.",
    visual: (
      <div className="mt-6 flex gap-2">
        {["#ff5a68", "#3dd9ff", "#f7d02c", "#7ac74c"].map((c) => (
          <span key={c} className="h-8 w-8 rounded-full ring-2 ring-white/10" style={{ background: c, boxShadow: `0 0 18px ${c}88` }} />
        ))}
      </div>
    ),
    glow: "hsl(18 100% 60% / 0.18)",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="relative scroll-mt-24 py-28">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <span className="eyebrow mb-6">✦ Built for trainers</span>
          <h2 className="mx-auto mb-6 max-w-3xl text-4xl font-extrabold md:text-5xl">
            Your ultimate <span className="text-gradient-accent">Pokémon arsenal</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Powerful tools wrapped in a design that gets out of the way — so your focus stays on the
            Pokémon.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={i}
              variants={fadeUp}
              className={f.className}
            >
              <SpotlightCard glow={f.glow} className="h-full p-7">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <f.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{f.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{f.description}</p>
                {f.visual}
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
