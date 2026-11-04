import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import PageLayout from "@/components/PageLayout";
import RouteFallback from "@/components/RouteFallback";
import NotFound from "@/pages/NotFound";
import { TYPE_COLORS, getContrastTextColor, getDefensiveProfile, type PokemonType } from "@/data/typeChart";
import {
  dexNumber,
  pokemonIntro,
  pokemonMetaDescription,
  pokemonMetaTitle,
  type PokemonDetail as Pokemon,
} from "@/lib/pokemonCopy";
import { artworkUrl } from "@/lib/sprites";
import indexData from "@/data/pokedexIndex.json";

export const TypeBadge = ({ type }: { type: PokemonType }) => (
  <Link
    to={`/pokemon?type=${type}`}
    style={{ backgroundColor: TYPE_COLORS[type], color: getContrastTextColor(TYPE_COLORS[type]) }}
    className="inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide shadow-sm"
  >
    {type}
  </Link>
);

async function fetchPokemon(slug: string): Promise<Pokemon | null> {
  const res = await fetch(`/data/pokedex/${slug}.json`);
  const type = res.headers.get("content-type") ?? "";
  // Unknown slugs fall through to the SPA rewrite and come back as HTML, not JSON.
  if (!res.ok || !type.includes("json")) return null;
  return res.json();
}

const STAT_MAX = 255;

const PokemonDetail = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const { data: p, isLoading } = useQuery({
    queryKey: ["pokedex", slug],
    queryFn: () => fetchPokemon(slug),
    staleTime: Infinity,
  });

  const profile = useMemo(() => (p ? getDefensiveProfile(p.types) : null), [p]);

  if (isLoading) return <RouteFallback />;
  if (!p || !profile) return <NotFound />;

  const url = `https://dexverse.in/pokemon/${p.slug}`;
  const title = pokemonMetaTitle(p);
  const description = pokemonMetaDescription(p, profile);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: title,
        description,
        isPartOf: { "@type": "WebSite", name: "Dexverse", url: "https://dexverse.in" },
        primaryImageOfPage: artworkUrl(p.id),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Dexverse", item: "https://dexverse.in/" },
          { "@type": "ListItem", position: 2, name: "Pokédex", item: "https://dexverse.in/pokemon" },
          { "@type": "ListItem", position: 3, name: p.name, item: url },
        ],
      },
    ],
  };

  const roots = p.evolution.filter((e) => e.from === null);
  const renderEvolution = (id: number, depth = 0): JSX.Element => {
    const node = p.evolution.find((e) => e.id === id)!;
    const children = p.evolution.filter((e) => e.from === id);
    return (
      <li key={id}>
        <div className={depth ? "mt-2 flex flex-wrap items-center gap-2" : "flex flex-wrap items-center gap-2"}>
          {node.how && <span className="text-xs text-muted-foreground">→ {node.how}:</span>}
          {node.id === p.id ? (
            <span className="font-semibold text-accent">{node.name}</span>
          ) : (
            <Link to={`/pokemon/${node.slug}`} className="font-semibold text-foreground hover:text-accent hover:underline">
              {node.name}
            </Link>
          )}
        </div>
        {children.length > 0 && (
          <ul className="mt-2 space-y-1 border-l border-white/10 pl-4">
            {children.map((c) => renderEvolution(c.id, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <PageLayout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={artworkUrl(p.id)} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <article className="container mx-auto max-w-4xl px-5 py-10 sm:px-6 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <Link to="/pokemon" className="hover:text-foreground">← Pokédex</Link>
        </nav>

        <header className="grid items-center gap-8 sm:grid-cols-[220px_1fr]">
          <img
            src={artworkUrl(p.id)}
            alt={`${p.name} official artwork`}
            width={475}
            height={475}
            className="mx-auto h-48 w-48 object-contain drop-shadow-2xl sm:h-56 sm:w-56"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {dexNumber(p.id)} · Generation {p.generation}
              {p.legendary ? " · Legendary" : p.mythical ? " · Mythical" : ""}
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-5xl">{p.name} Stats, Weaknesses &amp; Evolution</h1>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.types.map((t) => (
                <TypeBadge key={t} type={t} />
              ))}
            </div>
            <p className="mt-5 leading-relaxed text-muted-foreground">{pokemonIntro(p, profile)}</p>
            {p.flavor && <p className="mt-3 text-sm italic text-muted-foreground">“{p.flavor}”</p>}
          </div>
        </header>

        <section className="mt-12" aria-labelledby="stats-heading">
          <h2 id="stats-heading" className="mb-4 text-2xl font-bold">{p.name} base stats</h2>
          <div className="glass space-y-3 rounded-2xl p-5">
            {p.stats.map((s) => (
              <div key={s.name} className="grid grid-cols-[72px_40px_1fr] items-center gap-3 text-sm">
                <span className="text-muted-foreground">{s.name}</span>
                <span className="font-semibold tabular-nums">{s.value}</span>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${Math.min(100, (s.value / STAT_MAX) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="grid grid-cols-[72px_40px_1fr] gap-3 border-t border-white/10 pt-3 text-sm font-semibold">
              <span>Total</span>
              <span className="tabular-nums">{p.total}</span>
            </div>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="about-heading">
          <h2 id="about-heading" className="mb-4 text-2xl font-bold">Abilities &amp; size</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="glass rounded-2xl p-5">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Abilities</h3>
              <ul className="space-y-1">
                {p.abilities.map((a) => (
                  <li key={a.name}>
                    {a.name}
                    {a.hidden && <span className="ml-2 text-xs text-muted-foreground">(Hidden)</span>}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-2xl p-5">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Size</h3>
              <p>Height: {p.height} m</p>
              <p>Weight: {p.weight} kg</p>
            </div>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="weakness-heading">
          <h2 id="weakness-heading" className="mb-4 text-2xl font-bold">{p.name} type weaknesses &amp; resistances</h2>
          <div className="glass space-y-5 rounded-2xl p-5">
            {[
              { label: "Weak to", items: profile.weakTo.map((w) => ({ type: w.type, note: `${w.multiplier}x` })) },
              { label: "Resists", items: profile.resists.map((r) => ({ type: r.type, note: `${r.multiplier}x` })) },
              { label: "Immune to", items: profile.immuneTo.map((type) => ({ type, note: "0x" })) },
            ]
              .filter((g) => g.items.length)
              .map((g) => (
                <div key={g.label}>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{g.label}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {g.items.map((i) => (
                      <li key={i.type} className="flex items-center gap-1.5">
                        <TypeBadge type={i.type} />
                        <span className="text-xs text-muted-foreground">{i.note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            <p className="text-sm text-muted-foreground">
              Want to compare other matchups? Try the{" "}
              <Link to="/pokemon-type-chart" className="text-accent hover:underline">Pokémon type chart</Link>.
            </p>
          </div>
        </section>

        {p.evolution.length > 0 && (
          <section className="mt-12" aria-labelledby="evo-heading">
            <h2 id="evo-heading" className="mb-4 text-2xl font-bold">{p.name} evolution chain</h2>
            <ul className="glass rounded-2xl p-5">{roots.map((r) => renderEvolution(r.id))}</ul>
          </section>
        )}

        {p.moves.length > 0 && (
          <section className="mt-12" aria-labelledby="moves-heading">
            <h2 id="moves-heading" className="mb-4 text-2xl font-bold">{p.name} level-up moveset</h2>
            <div className="glass overflow-x-auto rounded-2xl">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">Moves {p.name} learns by levelling up</caption>
                <thead>
                  <tr className="border-b border-white/10">
                    <th scope="col" className="px-4 py-3 font-semibold">Level</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Move</th>
                  </tr>
                </thead>
                <tbody>
                  {p.moves.map((m) => (
                    <tr key={`${m.level}-${m.name}`} className="border-b border-white/5 last:border-0">
                      <td className="px-4 py-2 tabular-nums text-muted-foreground">{m.level === 0 ? "Evolve" : m.level}</td>
                      <td className="px-4 py-2">{m.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <div className="mt-12 flex items-center justify-between text-sm">
          {p.id > 1 ? <AdjacentLink id={p.id - 1} dir="prev" /> : <span />}
          {p.id < 1025 ? <AdjacentLink id={p.id + 1} dir="next" /> : <span />}
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          Data from PokéAPI. Pokémon and all related names are trademarks of Nintendo, Game Freak and The Pokémon Company; Dexverse
          is an independent fan project.
        </p>
      </article>
    </PageLayout>
  );
};

const AdjacentLink = ({ id, dir }: { id: number; dir: "prev" | "next" }) => {
  const entry = (indexData as { id: number; slug: string; name: string }[])[id - 1];
  return (
    <Link to={`/pokemon/${entry.slug}`} className="text-muted-foreground hover:text-foreground">
      {dir === "prev" ? `← ${dexNumber(id)} ${entry.name}` : `${dexNumber(id)} ${entry.name} →`}
    </Link>
  );
};

export default PokemonDetail;
