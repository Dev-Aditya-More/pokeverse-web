import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import { TYPE_LIST, TYPE_COLORS, getTypeMatchups, getContrastTextColor, type PokemonType } from "@/data/typeChart";
import { cn } from "@/lib/utils";

function TypePill({
  type,
  selected,
  onClick,
}: {
  type: PokemonType;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: TYPE_COLORS[type], color: getContrastTextColor(TYPE_COLORS[type]) }}
      className={cn(
        "px-4 py-2 rounded-full text-sm font-semibold capitalize shadow-sm transition-transform hover:scale-105",
        selected && "ring-2 ring-offset-2 ring-foreground"
      )}
    >
      {type}
    </button>
  );
}

function MatchupList({ title, types }: { title: string; types: PokemonType[] }) {
  if (types.length === 0) return null;
  return (
    <div>
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {types.map((t) => (
          <TypePill key={t} type={t} />
        ))}
      </div>
    </div>
  );
}

const PokemonTypeChart = () => {
  const [selected, setSelected] = useState<PokemonType | null>(null);

  const matchups = useMemo(() => (selected ? getTypeMatchups(selected) : null), [selected]);

  return (
    <PageLayout>
      <Helmet>
        <title>Pokémon Type Chart — Strengths & Weaknesses for Every Type | Dexverse</title>
        <meta
          name="description"
          content="Full Pokémon type effectiveness chart. Tap any of the 18 types to see what it's strong against, weak against, resists, and weak to."
        />
        <link rel="canonical" href="https://dexverse.in/pokemon-type-chart" />
      </Helmet>

      <div className="container mx-auto px-6 py-16 max-w-3xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-3">Pokémon Type Chart</h1>
          <p className="text-muted-foreground leading-relaxed">
            Tap a type below to see its full matchup — what it hits hard, what shrugs it off,
            and what to watch out for.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {TYPE_LIST.map((type) => (
            <TypePill
              key={type}
              type={type}
              selected={selected === type}
              onClick={() => setSelected(selected === type ? null : type)}
            />
          ))}
        </div>

        {matchups && selected && (
          <div className="rounded-xl border border-border bg-card p-8 space-y-8">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Showing matchups for</span>
              <TypePill type={selected} />
            </div>
            <MatchupList title="Super effective against" types={matchups.strongAgainst} />
            <MatchupList title="Not very effective against" types={matchups.weakAgainst} />
            <MatchupList title="Weak to (takes extra damage)" types={matchups.weakTo} />
            <MatchupList title="Resists (takes less damage)" types={matchups.resists} />
          </div>
        )}

        {!selected && (
          <p className="text-center text-sm text-muted-foreground">
            Select a type above to see its strengths and weaknesses.
          </p>
        )}
      </div>
    </PageLayout>
  );
};

export default PokemonTypeChart;
