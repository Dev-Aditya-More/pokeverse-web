// Post-build: give every route its own static <head> (title, description, canonical, OG)
// and regenerate sitemap.xml. Without this, every URL ships the homepage's canonical and
// meta tags until JavaScript runs, which confuses crawlers and link previews.
//
// Output is dist/<route>.html; vercel.json's "cleanUrls" serves it at /<route>.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { transformSync } from "esbuild";

const SITE = "https://dexverse.in";
const DIST = "dist";
const today = new Date().toISOString().slice(0, 10);

// Guide metadata lives in TypeScript; pull the fields we need with a strict regex and
// fail loudly if the shape ever drifts, rather than silently shipping wrong tags.
const guidesSrc = readFileSync("src/data/guides.ts", "utf8");
const guideRe =
  /slug: "([^"]+)",\s*title: "[^"]*",\s*metaTitle: "([^"]+)",\s*description:\s*"([^"]+)",\s*readTime: "[^"]*",\s*updated: "([^"]+)"/g;
const guides = [...guidesSrc.matchAll(guideRe)].map(([, slug, title, description, updated]) => ({
  path: `/guides/${slug}`,
  title,
  description,
  lastmod: updated,
  changefreq: "monthly",
  priority: "0.7",
}));
const expected = (guidesSrc.match(/^\s+slug: "/gm) ?? []).length;
if (guides.length !== expected) {
  throw new Error(`prerender-heads: parsed ${guides.length} guides but found ${expected} slugs in guides.ts`);
}

// Pokémon pages: reuse the app's own type chart and copy helpers (single source of truth) by
// transpiling the TypeScript on the fly, then render the main content into static HTML so
// crawlers see real text before any JavaScript runs.
const importTs = async (file) => {
  const { code } = transformSync(readFileSync(file, "utf8"), { loader: "ts", format: "esm" });
  return import(`data:text/javascript;base64,${Buffer.from(code).toString("base64")}`);
};
const typeChart = await importTs("src/data/typeChart.ts");
const copy = await importTs("src/lib/pokemonCopy.ts");
const pokedexIndex = JSON.parse(readFileSync("src/data/pokedexIndex.json", "utf8"));

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const artwork = (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

function pokemonRoute(entry) {
  const p = JSON.parse(readFileSync(join("public/data/pokedex", `${entry.slug}.json`), "utf8"));
  const profile = typeChart.getDefensiveProfile(p.types);
  const typeList = (items) => items.map((i) => `<li>${esc(copy.cap(i.type ?? i))}${i.multiplier ? ` (${i.multiplier}x)` : ""}</li>`).join("");
  const group = (label, items) => (items.length ? `<h3>${label}</h3><ul>${typeList(items)}</ul>` : "");
  const evo = p.evolution.length
    ? `<h2>${esc(p.name)} evolution chain</h2><ul>${p.evolution
        .map((e) => `<li><a href="/pokemon/${e.slug}">${esc(e.name)}</a>${e.how ? ` — ${esc(e.how)}` : ""}</li>`)
        .join("")}</ul>`
    : "";
  const body = `<main><article>
<p><a href="/pokemon">Pokédex</a></p>
<h1>${esc(p.name)} Stats, Weaknesses &amp; Evolution</h1>
<img src="${artwork(p.id)}" alt="${esc(p.name)} official artwork" width="475" height="475">
<p>${esc(copy.pokemonIntro(p, profile))}</p>
${p.flavor ? `<p><em>${esc(p.flavor)}</em></p>` : ""}
<h2>${esc(p.name)} base stats</h2>
<ul>${p.stats.map((s) => `<li>${esc(s.name)}: ${s.value}</li>`).join("")}<li>Total: ${p.total}</li></ul>
<h2>Abilities</h2>
<ul>${p.abilities.map((a) => `<li>${esc(a.name)}${a.hidden ? " (Hidden)" : ""}</li>`).join("")}</ul>
<h2>${esc(p.name)} type weaknesses &amp; resistances</h2>
${group("Weak to", profile.weakTo)}${group("Resists", profile.resists)}${group("Immune to", profile.immuneTo)}
${evo}
${p.moves.length ? `<h2>${esc(p.name)} level-up moveset</h2><ul>${p.moves.map((m) => `<li>${m.level === 0 ? "Evolve" : `Lv. ${m.level}`}: ${esc(m.name)}</li>`).join("")}</ul>` : ""}
</article></main>`;
  const url = `${SITE}/pokemon/${p.slug}`;
  return {
    path: `/pokemon/${p.slug}`,
    title: copy.pokemonMetaTitle(p),
    description: copy.pokemonMetaDescription(p, profile),
    image: artwork(p.id),
    body,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebPage", "@id": url, url, name: copy.pokemonMetaTitle(p), description: copy.pokemonMetaDescription(p, profile), primaryImageOfPage: artwork(p.id), isPartOf: { "@type": "WebSite", name: "Dexverse", url: SITE } },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Dexverse", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Pokédex", item: `${SITE}/pokemon` },
          { "@type": "ListItem", position: 3, name: p.name, item: url },
        ] },
      ],
    },
    lastmod: today,
    changefreq: "monthly",
    priority: "0.6",
  };
}
const pokemonRoutes = pokedexIndex.map(pokemonRoute);
const hubBody = `<main><h1>Pokédex: all ${pokedexIndex.length} Pokémon</h1><p>Every Pokémon from Generation 1 to 9. Pick one for its base stats, abilities, weaknesses, evolution chain and level-up moves.</p><ul>${pokedexIndex
  .map((e) => `<li><a href="/pokemon/${e.slug}">${copy.dexNumber(e.id)} ${esc(e.name)}</a></li>`)
  .join("")}</ul></main>`;

const routes = [
  {
    path: "/",
    lastmod: today,
    changefreq: "weekly",
    priority: "1.0",
  },
  {
    path: "/who-is-that-pokemon",
    title: "Who's That Pokémon? Free Silhouette Quiz Game | Dexverse",
    description:
      "Guess the Pokémon from its silhouette. Free quiz with 1000+ Pokémon, no sign-up, unlimited rounds. How long can your streak get?",
    lastmod: today,
    changefreq: "weekly",
    priority: "0.8",
  },
  {
    path: "/pokemon-type-chart",
    title: "Pokémon Type Chart & Weakness Calculator (All 18 Types)",
    description:
      "Interactive Pokémon type chart with a dual-type weakness calculator. See what every type is super effective against, weak to, resists and is immune to.",
    lastmod: today,
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    path: "/guides",
    title: "Pokémon Guides: Types, Evolution, IVs & EVs | Dexverse",
    description:
      "Beginner-friendly Pokémon guides on type matchups, evolution methods, IVs and EVs, and every generation from Kanto to Paldea.",
    lastmod: guides.map((g) => g.lastmod).sort().at(-1),
    changefreq: "weekly",
    priority: "0.8",
  },
  ...guides,
  {
    path: "/pokemon",
    title: "Pokédex: All 1025 Pokémon – Stats & Weaknesses | Dexverse",
    description:
      "Browse the full Pokédex from Bulbasaur to Pecharunt. Open any Pokémon for base stats, abilities, type weaknesses, evolutions and moves.",
    body: hubBody,
    lastmod: today,
    changefreq: "weekly",
    priority: "0.9",
  },
  ...pokemonRoutes,
  {
    path: "/contact",
    title: "Contact Dexverse — Feedback, Bugs & Feature Requests",
    description: "Get in touch with the Dexverse team for feedback, bug reports, or feature requests for the free Pokédex app.",
    lastmod: "2026-07-01",
    changefreq: "yearly",
    priority: "0.4",
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy | Dexverse",
    description: "How the Dexverse Pokédex app and website handle your data.",
    lastmod: "2026-07-01",
    changefreq: "yearly",
    priority: "0.3",
  },
  {
    path: "/terms-of-service",
    title: "Terms of Service | Dexverse",
    description: "The terms for using the Dexverse Pokédex app and website.",
    lastmod: "2026-07-01",
    changefreq: "yearly",
    priority: "0.3",
  },
];

const escapeAttr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const template = readFileSync(join(DIST, "index.html"), "utf8");

function replaceOrThrow(html, re, replacement, label) {
  if (!re.test(html)) throw new Error(`prerender-heads: could not find ${label} in index.html`);
  return html.replace(re, replacement);
}

for (const route of routes) {
  if (route.path === "/") continue; // the template already describes the homepage
  const url = `${SITE}${route.path}`;
  const title = escapeAttr(route.title);
  const desc = escapeAttr(route.description);
  let html = template;
  html = replaceOrThrow(html, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`, "<title>");
  html = replaceOrThrow(html, /<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${desc}" />`, "description");
  html = replaceOrThrow(html, /<link rel="canonical"[^>]*\/>/, `<link rel="canonical" href="${url}" />`, "canonical");
  html = replaceOrThrow(html, /<meta property="og:url"[^>]*\/>/, `<meta property="og:url" content="${url}" />`, "og:url");
  html = replaceOrThrow(html, /<meta property="og:title"[^>]*\/>/, `<meta property="og:title" content="${title}" />`, "og:title");
  html = replaceOrThrow(html, /<meta\s+property="og:description"[\s\S]*?\/>/, `<meta property="og:description" content="${desc}" />`, "og:description");
  html = replaceOrThrow(html, /<meta name="twitter:title"[^>]*\/>/, `<meta name="twitter:title" content="${title}" />`, "twitter:title");
  html = replaceOrThrow(html, /<meta\s+name="twitter:description"[\s\S]*?\/>/, `<meta name="twitter:description" content="${desc}" />`, "twitter:description");
  // The homepage FAQ schema doesn't describe other pages' content.
  html = html.replace(/<!-- FAQ Structured Data -->\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, "");

  if (route.image) {
    html = html.replace(/<meta\s+property="og:image"[\s\S]*?\/>/, `<meta property="og:image" content="${route.image}" />`);
    html = html.replace(/<meta\s+name="twitter:image"[\s\S]*?\/>/, `<meta name="twitter:image" content="${route.image}" />`);
  }
  if (route.jsonLd) {
    html = html.replace("</head>", `<script type="application/ld+json">${JSON.stringify(route.jsonLd)}</script></head>`);
  }
  if (route.body) {
    html = replaceOrThrow(html, /<div id="root"><\/div>/, () => `<div id="root">${route.body}</div>`, '<div id="root">');
  }

  const out = join(DIST, `${route.path.slice(1)}.html`);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE}${r.path}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;
writeFileSync(join(DIST, "sitemap.xml"), sitemap);

console.log(`prerender-heads: wrote ${routes.length - 1} route heads and sitemap.xml (${routes.length} URLs)`);
