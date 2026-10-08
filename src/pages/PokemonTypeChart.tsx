import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import {
  TYPE_LIST,
  TYPE_COLORS,
  getTypeMatchups,
  getMultiplier,
  getContrastTextColor,
  type PokemonType,
} from "@/data/typeChart";
import { cn } from "@/lib/utils";

function TypePill({
  type,
  selected,
  onClick,
  size = "md",
}: {
  type: PokemonType;
  selected?: boolean;
  onClick?: () => void;
  size?: "sm" | "md";
}) {
  const Comp = onClick ? "button" : "span";
  return (
    <Comp
      onClick={onClick}
      style={{ backgroundColor: TYPE_COLORS[type], color: getContrastTextColor(TYPE_COLORS[type]) }}
      className={cn(
        "inline-block rounded-full font-bold uppercase tracking-wide shadow-sm transition-all duration-300",
        size === "md" ? "px-4 py-2 text-xs" : "px-2.5 py-1 text-[10px]",
        onClick && "hover:scale-105 hover:shadow-lg",
        selected && "ring-2 ring-white ring-offset-2 ring-offset-background scale-105"
      )}
      {...(onClick ? { "aria-pressed": selected } : {})}
    >
      {type}
    </Comp>
  );
}

function MatchupList({ title, types }: { title: string; types: PokemonType[] }) {
  if (types.length === 0) return null;
  return (
    <div>
      <h3 className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-3">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {types.map((t) => (
          <TypePill key={t} type={t} size="sm" />
        ))}
      </div>
    </div>
  );
}

const MULT_LABEL: Record<number, string> = { 0: "0", 0.25: "¼", 0.5: "½", 1: "", 2: "2", 4: "4" };
const MULT_CLASS: Record<number, string> = {
  0: "bg-zinc-900 text-zinc-400",
  0.25: "bg-red-900/80 text-red-200",
  0.5: "bg-red-600/70 text-white",
  1: "bg-white/[0.03]",
  2: "bg-green-500/80 text-white",
  4: "bg-green-400 text-black",
};

/** Single-type explorer: what one type hits and what hits it. */
const TypeExplorer = () => {
  const [selected, setSelected] = useState<PokemonType | null>(null);
  const matchups = useMemo(() => (selected ? getTypeMatchups(selected) : null), [selected]);

  return (
    <section className="mb-20">
      <div className="flex flex-wrap justify-center gap-2.5 mb-10">
        {TYPE_LIST.map((type) => (
          <TypePill
            key={type}
            type={type}
            selected={selected === type}
            onClick={() => setSelected(selected === type ? null : type)}
          />
        ))}
      </div>

      {matchups && selected ? (
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-5 sm:p-8 grid gap-6 sm:gap-8 sm:grid-cols-2"
          style={{ boxShadow: `0 0 80px -20px ${TYPE_COLORS[selected]}` }}
        >
          <div className="sm:col-span-2 flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Showing matchups for</span>
            <TypePill type={selected} />
          </div>
          <MatchupList title="Super effective against" types={matchups.strongAgainst} />
          <MatchupList title="Not very effective against" types={matchups.weakAgainst} />
          <MatchupList title="Weak to (takes extra damage)" types={matchups.weakTo} />
          <MatchupList title="Resists (takes less damage)" types={matchups.resists} />
        </motion.div>
      ) : (
        <p className="text-center text-sm text-muted-foreground">
          Select a type above to see its strengths and weaknesses.
        </p>
      )}
    </section>
  );
};

/** Defensive calculator for any one- or two-type combination. */
const DualTypeCalculator = () => {
  const [types, setTypes] = useState<PokemonType[]>(["dragon", "flying"]);

  const toggle = (t: PokemonType) =>
    setTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : prev.length < 2 ? [...prev, t] : [prev[1], t]
    );

  const groups = useMemo(() => {
    const byMult = new Map<number, PokemonType[]>();
    if (types.length === 0) return byMult;
    for (const attacker of TYPE_LIST) {
      const mult = types.reduce((acc, def) => acc * getMultiplier(attacker, def), 1);
      if (mult === 1) continue;
      byMult.set(mult, [...(byMult.get(mult) ?? []), attacker]);
    }
    return byMult;
  }, [types]);

  const rows: [number, string][] = [
    [4, "4×: double weakness"],
    [2, "2×: weak to"],
    [0.5, "½×: resists"],
    [0.25, "¼×: double resist"],
    [0, "0×: immune"],
  ];

  return (
    <section className="mb-20" aria-labelledby="dual-type-heading">
      <h2 id="dual-type-heading" className="text-2xl md:text-3xl font-extrabold mb-3">
        Dual-type weakness calculator
      </h2>
      <p className="text-muted-foreground mb-6">
        Pick up to two types to see exactly what a Pokémon with that typing is weak to, resists, and is
        immune to. Multipliers stack, so a double weakness takes 4× damage.
      </p>
      <div className="flex flex-wrap gap-2 mb-8">
        {TYPE_LIST.map((t) => (
          <TypePill key={t} type={t} size="sm" selected={types.includes(t)} onClick={() => toggle(t)} />
        ))}
      </div>

      <div className="glass rounded-3xl p-5 sm:p-8 space-y-5">
        <div className="flex flex-wrap items-center gap-2 pb-5 border-b border-white/10">
          <span className="text-sm text-muted-foreground mr-1">Defending as</span>
          {types.length ? types.map((t) => <TypePill key={t} type={t} />) : <span className="text-sm">Pick a type</span>}
        </div>
        {rows.map(([mult, label]) => {
          const list = groups.get(mult);
          if (!list?.length) return null;
          return (
            <div key={mult} className="grid gap-3 sm:grid-cols-[180px_1fr] sm:items-center">
              <span
                className={cn(
                  "text-sm font-semibold",
                  mult > 1 ? "text-green-400" : mult === 0 ? "text-zinc-400" : "text-red-400"
                )}
              >
                {label}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {list.map((t) => (
                  <TypePill key={t} type={t} size="sm" />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

/** The classic full attack-vs-defence grid. */
const FullChart = () => {
  const [hover, setHover] = useState<{ row: number; col: number } | null>(null);

  return (
    <section aria-labelledby="full-chart-heading">
      <h2 id="full-chart-heading" className="text-2xl md:text-3xl font-extrabold mb-3">
        Full Pokémon type chart (18×18)
      </h2>
      <p className="text-muted-foreground mb-6">
        Rows are the attacking move's type, columns are the defending Pokémon's type. Green cells deal
        2× damage, red cells ½×, and black cells 0× (no effect). Blank cells are normal 1× damage.
      </p>
      <p className="mb-2 text-xs text-muted-foreground sm:hidden">← Swipe the chart sideways →</p>
      <div className="glass rounded-3xl p-2 sm:p-5 overflow-x-auto overscroll-x-contain">
        <table className="border-separate border-spacing-[2px] sm:border-spacing-[3px] text-[10px] sm:text-[11px] mx-auto">
          <caption className="sr-only">
            Pokémon type effectiveness chart: attacking type by row, defending type by column
          </caption>
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-[hsl(228_38%_10%)] p-1 text-[8px] sm:text-[9px] font-semibold text-muted-foreground text-left">
                ATK ↓ / DEF →
              </th>
              {TYPE_LIST.map((t, col) => (
                <th key={t} scope="col" className="p-0">
                  <div
                    className={cn(
                      "h-14 w-6 sm:h-16 sm:w-7 rounded-md flex items-end justify-center pb-1 transition-opacity",
                      hover && hover.col !== col && "opacity-40"
                    )}
                    style={{ backgroundColor: TYPE_COLORS[t] }}
                  >
                    <span
                      className="[writing-mode:vertical-rl] rotate-180 text-[9px] font-bold uppercase"
                      style={{ color: getContrastTextColor(TYPE_COLORS[t]) }}
                    >
                      {t}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody onMouseLeave={() => setHover(null)}>
            {TYPE_LIST.map((attacker, row) => (
              <tr key={attacker}>
                <th scope="row" className="sticky left-0 z-10 p-0 bg-[hsl(228_38%_10%)]">
                  <div
                    className={cn(
                      "w-[60px] sm:w-[72px] rounded-md px-1.5 sm:px-2 py-1 text-left text-[8px] sm:text-[9px] font-bold uppercase transition-opacity",
                      hover && hover.row !== row && "opacity-40"
                    )}
                    style={{ backgroundColor: TYPE_COLORS[attacker], color: getContrastTextColor(TYPE_COLORS[attacker]) }}
                  >
                    {attacker}
                  </div>
                </th>
                {TYPE_LIST.map((defender, col) => {
                  const m = getMultiplier(attacker, defender);
                  const active = hover && (hover.row === row || hover.col === col);
                  return (
                    <td
                      key={defender}
                      onMouseEnter={() => setHover({ row, col })}
                      title={`${attacker} → ${defender}: ${m}×`}
                      className={cn(
                        "h-6 w-6 sm:h-7 sm:w-7 rounded-md text-center font-bold transition-all",
                        MULT_CLASS[m],
                        active && "ring-1 ring-white/40",
                        hover?.row === row && hover?.col === col && "scale-125 ring-2 ring-white"
                      )}
                    >
                      {MULT_LABEL[m]}
                      <span className="sr-only">{m === 1 ? "1×" : "×"}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const PokemonTypeChart = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>Pokémon Type Chart — Strengths & Weaknesses for Every Type | Dexverse</title>
        <meta
          name="description"
          content="Full Pokémon type effectiveness chart for all 18 types, plus a dual-type weakness calculator. See what every type is strong against, weak to, resists, and is immune to."
        />
        <link rel="canonical" href="https://dexverse.in/pokemon-type-chart" />
      </Helmet>

      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="mb-12 text-center">
          <span className="eyebrow mb-5">✦ Gen 6 – Gen 9</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">Pokémon Type Chart</h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Tap a type to see its full matchup: what it hits hard, what shrugs it off, and what to
            watch out for. Want the theory? Read{" "}
            <Link to="/guides/pokemon-type-chart-explained" className="text-accent hover:underline">
              the type chart explained
            </Link>
            .
          </p>
        </div>

        <TypeExplorer />
        <DualTypeCalculator />
        <FullChart />
      </div>
    </PageLayout>
  );
};

export default PokemonTypeChart;
