// One-off data generator (run manually: `node scripts/fetch-pokedex.mjs`).
// Pulls all 1025 base-form Pokémon from PokéAPI and writes:
//   public/data/pokedex/<slug>.json  – full detail for one Pokémon page
//   src/data/pokedexIndex.json       – slim list used by the hub page, links and the prerender script
// Output is committed, so builds never depend on PokéAPI being reachable.
import { mkdirSync, writeFileSync } from "node:fs";

const API = "https://pokeapi.co/api/v2";
const TOTAL = 1025;
const OUT_DIR = "public/data/pokedex";
mkdirSync(OUT_DIR, { recursive: true });

const titleCase = (s) => s.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
const english = (arr, key = "name") => arr.find((x) => x.language.name === "en")?.[key];
const idFromUrl = (url) => Number(url.split("/").filter(Boolean).at(-1));

const STAT_NAMES = {
  hp: "HP", attack: "Attack", defense: "Defense",
  "special-attack": "Sp. Atk", "special-defense": "Sp. Def", speed: "Speed",
};
const GEN_NUMBER = {
  "generation-i": 1, "generation-ii": 2, "generation-iii": 3, "generation-iv": 4, "generation-v": 5,
  "generation-vi": 6, "generation-vii": 7, "generation-viii": 8, "generation-ix": 9,
};

async function getJson(url, tries = 5) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return await res.json();
      if (res.status !== 429 && res.status < 500) throw new Error(`${res.status} ${url}`);
    } catch (err) {
      if (i === tries - 1) throw err;
    }
    await new Promise((r) => setTimeout(r, 500 * (i + 1)));
  }
  throw new Error(`Failed: ${url}`);
}

async function pool(items, size, fn) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: size }, async () => {
      while (next < items.length) {
        const i = next++;
        results[i] = await fn(items[i], i);
      }
    })
  );
  return results;
}

function describeEvolution(d) {
  if (!d) return "";
  const parts = [];
  if (d.min_level) parts.push(`Level ${d.min_level}`);
  if (d.item) parts.push(`Use ${titleCase(d.item.name)}`);
  if (d.held_item) parts.push(`Hold ${titleCase(d.held_item.name)}`);
  if (d.min_happiness) parts.push("High friendship");
  if (d.min_affection) parts.push("High affection");
  if (d.known_move) parts.push(`Know ${titleCase(d.known_move.name)}`);
  if (d.known_move_type) parts.push(`Know a ${titleCase(d.known_move_type.name)}-type move`);
  if (d.location) parts.push(`Level up at ${titleCase(d.location.name)}`);
  if (d.time_of_day) parts.push(`During the ${d.time_of_day}`);
  if (d.min_beauty) parts.push("High beauty");
  if (d.gender === 1) parts.push("Female");
  if (d.gender === 2) parts.push("Male");
  if (d.trigger?.name === "trade") parts.unshift("Trade");
  if (!parts.length && d.trigger?.name === "level-up") parts.push("Level up");
  return parts.join(", ");
}

// Flatten an evolution tree into [{id, from, how}] using species ids.
function flattenChain(node, from = null, out = []) {
  out.push({
    id: idFromUrl(node.species.url),
    from,
    how: from ? node.evolution_details.map(describeEvolution).filter(Boolean)[0] ?? "" : "",
  });
  for (const next of node.evolves_to) flattenChain(next, idFromUrl(node.species.url), out);
  return out;
}

const ids = Array.from({ length: TOTAL }, (_, i) => i + 1);
console.log(`Fetching ${TOTAL} Pokémon…`);

const raw = await pool(ids, 12, async (id) => {
  const [pokemon, species] = await Promise.all([
    getJson(`${API}/pokemon/${id}`),
    getJson(`${API}/pokemon-species/${id}`),
  ]);
  if (id % 100 === 0) console.log(`  ${id}/${TOTAL}`);
  return { pokemon, species };
});

const chainUrls = [...new Set(raw.map((r) => r.species.evolution_chain.url))];
console.log(`Fetching ${chainUrls.length} evolution chains…`);
const chains = Object.fromEntries(
  await pool(chainUrls, 12, async (url) => [url, flattenChain((await getJson(url)).chain)])
);

const nameById = Object.fromEntries(raw.map(({ pokemon, species }) => [pokemon.id, english(species.names) ?? titleCase(pokemon.name)]));
const slugById = Object.fromEntries(raw.map(({ pokemon }) => [pokemon.id, pokemon.name]));

const index = [];
for (const { pokemon, species } of raw) {
  const slug = pokemon.name;
  const types = pokemon.types.sort((a, b) => a.slot - b.slot).map((t) => t.type.name);
  const stats = pokemon.stats.map((s) => ({ name: STAT_NAMES[s.stat.name], value: s.base_stat }));

  // Level-up moves from the newest version group that has any for this Pokémon.
  const levelUp = pokemon.moves
    .map((m) => ({
      name: titleCase(m.move.name),
      details: m.version_group_details.filter((v) => v.move_learn_method.name === "level-up"),
    }))
    .filter((m) => m.details.length);
  const groupOrder = ["scarlet-violet", "sword-shield", "ultra-sun-ultra-moon", "omega-ruby-alpha-sapphire", "black-2-white-2"];
  const allGroups = new Set(levelUp.flatMap((m) => m.details.map((d) => d.version_group.name)));
  const group = groupOrder.find((g) => allGroups.has(g)) ?? [...allGroups].at(-1);
  const moves = levelUp
    .map((m) => ({ name: m.name, level: m.details.find((d) => d.version_group.name === group)?.level_learned_at }))
    .filter((m) => m.level !== undefined)
    .sort((a, b) => a.level - b.level || a.name.localeCompare(b.name));

  const flavor = species.flavor_text_entries.filter((f) => f.language.name === "en").at(-1)?.flavor_text;
  const evoRaw = chains[species.evolution_chain.url];
  const evolution = evoRaw.length > 1
    ? evoRaw.map((e) => ({ id: e.id, slug: slugById[e.id], name: nameById[e.id], from: e.from, how: e.how }))
    : [];

  const detail = {
    id: pokemon.id,
    slug,
    name: nameById[pokemon.id],
    genus: english(species.genera, "genus")?.replace(/ Pokémon$/, "") ?? "",
    types,
    generation: GEN_NUMBER[species.generation.name],
    height: pokemon.height / 10,
    weight: pokemon.weight / 10,
    abilities: pokemon.abilities
      .sort((a, b) => a.slot - b.slot)
      .map((a) => ({ name: titleCase(a.ability.name), hidden: a.is_hidden })),
    stats,
    total: stats.reduce((s, x) => s + x.value, 0),
    flavor: flavor ? flavor.replace(/[\n\f­]+/g, " ").replace(/\s+/g, " ").trim() : "",
    legendary: species.is_legendary,
    mythical: species.is_mythical,
    evolution,
    moves,
  };
  writeFileSync(`${OUT_DIR}/${slug}.json`, JSON.stringify(detail));
  index.push({ id: detail.id, slug, name: detail.name, types, generation: detail.generation, total: detail.total });
}

writeFileSync("src/data/pokedexIndex.json", JSON.stringify(index));
console.log(`Wrote ${index.length} Pokémon files.`);
