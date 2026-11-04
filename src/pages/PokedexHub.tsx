import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import { TYPE_COLORS, TYPE_LIST, getContrastTextColor, type PokemonType } from "@/data/typeChart";
import { cap, dexNumber } from "@/lib/pokemonCopy";
import { pixelSpriteUrl } from "@/lib/sprites";
import { cn } from "@/lib/utils";
import indexData from "@/data/pokedexIndex.json";

interface Entry {
  id: number;
  slug: string;
  name: string;
  types: PokemonType[];
  generation: number;
  total: number;
}
const ALL = indexData as Entry[];
const GENERATIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const PAGE_SIZE = 120;

const PokedexHub = () => {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE_SIZE);

  const type = TYPE_LIST.find((t) => t === params.get("type")) ?? null;
  const gen = Number(params.get("gen")) || null;

  const setFilter = (key: "type" | "gen", value: string | null) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
    setLimit(PAGE_SIZE);
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL.filter(
      (p) =>
        (!type || p.types.includes(type)) &&
        (!gen || p.generation === gen) &&
        (!q || p.name.toLowerCase().includes(q) || String(p.id) === q)
    );
  }, [query, type, gen]);

  const heading = type ? `${cap(type)}-type Pokémon` : "Pokédex: all 1025 Pokémon";

  return (
    <PageLayout>
      <Helmet>
        <title>Pokédex — Stats, Weaknesses & Evolution for All 1025 Pokémon | Dexverse</title>
        <meta
          name="description"
          content="Browse every Pokémon from Bulbasaur to Pecharunt. Open any entry for base stats, abilities, type weaknesses, evolution chain and moveset."
        />
        <link rel="canonical" href="https://dexverse.in/pokemon" />
      </Helmet>

      <div className="container mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-16">
        <h1 className="text-3xl font-bold sm:text-4xl">{heading}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Every Pokémon from Generation 1 to 9. Pick one for its base stats, abilities, weaknesses, evolution chain and
          level-up moves.
        </p>

        <label className="mt-8 block">
          <span className="sr-only">Search Pokémon by name or number</span>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLimit(PAGE_SIZE);
            }}
            placeholder="Search by name or number…"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-accent"
          />
        </label>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by type">
          {TYPE_LIST.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={type === t}
              onClick={() => setFilter("type", type === t ? null : t)}
              style={{ backgroundColor: TYPE_COLORS[t], color: getContrastTextColor(TYPE_COLORS[t]) }}
              className={cn(
                "rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide transition-all",
                type === t ? "ring-2 ring-white ring-offset-2 ring-offset-background" : type ? "opacity-50" : ""
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter by generation">
          {GENERATIONS.map((g) => (
            <button
              key={g}
              type="button"
              aria-pressed={gen === g}
              onClick={() => setFilter("gen", gen === g ? null : String(g))}
              className={cn(
                "rounded-full border border-white/10 px-3 py-1 text-xs font-semibold",
                gen === g ? "bg-accent text-accent-foreground" : "bg-white/5 text-muted-foreground hover:text-foreground"
              )}
            >
              Gen {g}
            </button>
          ))}
        </div>

        <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
          {results.length} Pokémon
        </p>

        <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {results.slice(0, limit).map((p) => (
            <li key={p.id}>
              <Link
                to={`/pokemon/${p.slug}`}
                className="glass flex items-center gap-3 rounded-2xl p-3 transition-all hover:border-accent/60"
              >
                <img src={pixelSpriteUrl(p.id)} alt="" width={56} height={56} loading="lazy" className="h-14 w-14 [image-rendering:pixelated]" />
                <span className="min-w-0">
                  <span className="block text-[11px] text-muted-foreground">{dexNumber(p.id)}</span>
                  <span className="block truncate text-sm font-semibold">{p.name}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {results.length > limit && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setLimit((l) => l + PAGE_SIZE)}
              className="rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-semibold hover:bg-white/10"
            >
              Show more
            </button>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default PokedexHub;
