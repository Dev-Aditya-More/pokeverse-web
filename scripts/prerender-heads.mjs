// Post-build: give every route its own static <head> (title, description, canonical, OG)
// and regenerate sitemap.xml. Without this, every URL ships the homepage's canonical and
// meta tags until JavaScript runs, which confuses crawlers and link previews.
//
// Output is dist/<route>.html; vercel.json's "cleanUrls" serves it at /<route>.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

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

const routes = [
  {
    path: "/",
    lastmod: today,
    changefreq: "weekly",
    priority: "1.0",
  },
  {
    path: "/who-is-that-pokemon",
    title: "Who's That Pokémon? — Free Silhouette Guessing Game | Dexverse",
    description:
      "Play Who's That Pokémon? for free. Guess the silhouette from all 1000+ Pokémon and build your streak. No sign-up, unlimited rounds.",
    lastmod: today,
    changefreq: "weekly",
    priority: "0.8",
  },
  {
    path: "/pokemon-type-chart",
    title: "Pokémon Type Chart — Strengths & Weaknesses for Every Type | Dexverse",
    description:
      "Full Pokémon type effectiveness chart for all 18 types, plus a dual-type weakness calculator. See what every type is strong against, weak to, resists, and is immune to.",
    lastmod: today,
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    path: "/guides",
    title: "Pokémon Guides — Types, Evolution, Stats & More | Dexverse",
    description:
      "Free Pokémon guides covering type matchups, evolution methods, IVs and EVs, and every generation from Kanto to Paldea, written by the Dexverse team.",
    lastmod: guides.map((g) => g.lastmod).sort().at(-1),
    changefreq: "weekly",
    priority: "0.8",
  },
  ...guides,
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
