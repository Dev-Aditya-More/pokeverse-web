export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  readTime: string;
  updated: string;
  blocks: GuideBlock[];
  relatedSlugs: string[];
}

export const GUIDES: Guide[] = [
  {
    slug: "pokemon-type-chart-explained",
    title: "Pokémon Type Chart Explained: Every Strength & Weakness",
    metaTitle: "Pokémon Type Chart Explained — Strengths, Weaknesses & Resistances | Dexverse",
    description:
      "A complete breakdown of Pokémon type effectiveness — how the 18 types interact, dual-type math, and the matchups every trainer should memorize.",
    readTime: "6 min read",
    updated: "2026-09-06",
    relatedSlugs: ["ivs-vs-evs-explained", "pokemon-evolution-explained"],
    blocks: [
      {
        type: "p",
        text: "Type effectiveness is the single biggest factor in any Pokémon battle. Get the matchup right and a single hit can end the fight; get it wrong and your best Pokémon can faint without landing a scratch. Here's how the system actually works, and the matchups worth committing to memory.",
      },
      { type: "h2", text: "The four damage multipliers" },
      {
        type: "ul",
        items: [
          "Super effective (2×) — the attacking type hits a clear weakness.",
          "Not very effective (0.5×) — the defending type resists the attack.",
          "No effect (0×) — a small number of types are completely immune to certain attacks (e.g. Ground moves against Flying types).",
          "Normal damage (1×) — no type advantage either way.",
        ],
      },
      {
        type: "p",
        text: "Dual-type Pokémon multiply both interactions together. A Fire move against a Grass/Flying Pokémon deals 2× (Fire beats Grass) × 0.5× (Flying resists Fire) = 1× — normal damage, even though it looks like it should be a clean sweep on paper.",
      },
      { type: "h2", text: "Matchups worth memorizing first" },
      {
        type: "ul",
        items: [
          "Water beats Fire, Ground, and Rock — one of the most universally useful attacking types in the game.",
          "Electric beats Water and Flying, but does nothing to Ground types.",
          "Fighting hits Normal, Rock, Steel, Ice, and Dark hard, but Psychic and Flying types shrug it off.",
          "Fairy beats Dragon, Dark, and Fighting — the reason Fairy-types dethroned Dragon as the game's top-tier closer.",
          "Ghost and Normal have no effect on each other at all — a rare 0× immunity worth remembering.",
        ],
      },
      {
        type: "p",
        text: "Rather than memorizing all 18×18 combinations, most trainers learn the chart in clusters — starter-type triangles (Grass/Fire/Water), then the newer types (Dark, Steel, Fairy) that were added to balance them out.",
      },
      {
        type: "p",
        text: "Want to check a matchup on the fly instead of memorizing everything? Dexverse's free type chart tool lets you tap any of the 18 types and instantly see what it's strong against, weak against, resists, and takes extra damage from.",
      },
    ],
  },
  {
    slug: "pokemon-evolution-explained",
    title: "How Pokémon Evolution Works: Levels, Items, Trade & Friendship",
    metaTitle: "How Pokémon Evolution Works — Every Evolution Method Explained | Dexverse",
    description:
      "Every way a Pokémon can evolve — level-up thresholds, evolution stones, trade evolutions, friendship, time of day, and the weirder location-based methods.",
    readTime: "5 min read",
    updated: "2026-09-06",
    relatedSlugs: ["pokemon-generations-guide", "pokemon-type-chart-explained"],
    blocks: [
      {
        type: "p",
        text: "Evolution is Pokémon's core progression hook — but it isn't just \"level up enough and it happens.\" The series has layered on new evolution methods with almost every generation. Here's the full picture.",
      },
      { type: "h2", text: "Level-based evolution" },
      {
        type: "p",
        text: "The simplest method — a Pokémon evolves automatically once it reaches a set level (Charmander → Charmeleon at level 16, for example). Some level evolutions also require a condition on top of the level, like a specific time of day, weather, or location.",
      },
      { type: "h2", text: "Evolution stones" },
      {
        type: "p",
        text: "Items like the Fire Stone, Water Stone, Thunder Stone, and Moon Stone trigger instant evolution when used on a compatible Pokémon — no level requirement. This is how Eevee branches into Flareon, Vaporeon, and Jolteon.",
      },
      { type: "h2", text: "Trade evolutions" },
      {
        type: "p",
        text: "Some Pokémon (Machoke, Graveler, Haunter) only evolve when traded to another player — a mechanic originally designed to encourage trading between game versions. Some trade evolutions also require holding a specific item during the trade, like Metal Coat for Scyther → Scizor.",
      },
      { type: "h2", text: "Friendship evolution" },
      {
        type: "p",
        text: "A hidden friendship stat rises as you battle alongside a Pokémon, walk with it, and avoid it fainting. Once friendship crosses a threshold, certain Pokémon (Pichu, Golbat, Eevee → Umbreon/Espeon) evolve on their next level-up, often gated further by time of day.",
      },
      { type: "h2", text: "Newer and stranger methods" },
      {
        type: "ul",
        items: [
          "Location-based — evolving in a specific area, like Magneton at a Magnetic Field cave.",
          "Move-based — knowing a specific move when leveling up, like Piloswine learning Ancient Power.",
          "Stat-based — evolving depending on which stat is higher, like Tyrogue splitting into Hitmonlee, Hitmonchan, or Hitmontop.",
          "Region forms — Galarian, Alolan, and Hisuian evolutions swap the usual method for a region-specific twist entirely.",
        ],
      },
      {
        type: "p",
        text: "With this many branching paths, it's easy to miss an evolution method entirely. Dexverse's Pokédex lists the full evolution chain and exact trigger for every Pokémon, so you always know what's next.",
      },
    ],
  },
  {
    slug: "ivs-vs-evs-explained",
    title: "IVs vs EVs Explained: How Pokémon Stats Really Work",
    metaTitle: "IVs vs EVs Explained — How Pokémon Stats Really Work | Dexverse",
    description:
      "The difference between IVs and EVs, how they combine with base stats and nature to determine a Pokémon's final numbers, and how competitive trainers optimize them.",
    readTime: "7 min read",
    updated: "2026-09-06",
    relatedSlugs: ["pokemon-type-chart-explained", "pokemon-generations-guide"],
    blocks: [
      {
        type: "p",
        text: "Two Pokémon of the same species, the same level, can have noticeably different stats. That's not random — it's the result of four layered systems working together: base stats, IVs, EVs, and nature.",
      },
      { type: "h2", text: "Base stats — the species' ceiling" },
      {
        type: "p",
        text: "Every species has fixed base stats for HP, Attack, Defense, Special Attack, Special Defense, and Speed. These set the overall profile — a Blissey will always have huge HP and poor Attack no matter how it's trained, because that's baked into the species.",
      },
      { type: "h2", text: "IVs — the genetic lottery" },
      {
        type: "p",
        text: "Individual Values (IVs) are a hidden number from 0–31 rolled independently for each stat when a Pokémon is generated, functioning like genetics. A Pokémon with 31 IVs in every stat is called \"perfect\" — the theoretical best version of that species. IVs never change once a Pokémon exists (breeding aside).",
      },
      { type: "h2", text: "EVs — the training you control" },
      {
        type: "p",
        text: "Effort Values (EVs) are earned by defeating other Pokémon, and each species awards EVs in specific stats. A Pokémon can hold a maximum of 510 total EVs, capped at 252 in any single stat — meaning you can max out two stats and spread the rest, but never max everything at once. This is the main lever competitive players use to shape a Pokémon toward a role.",
      },
      { type: "h2", text: "Nature — the stat modifier" },
      {
        type: "p",
        text: "Each Pokémon has one of 25 natures, which boosts one stat by 10% and lowers another by 10% (a handful of neutral natures affect nothing). A Timid nature, for example, boosts Speed and lowers Attack — ideal for a fast special attacker that never plans to use physical moves.",
      },
      { type: "h2", text: "Putting it together" },
      {
        type: "p",
        text: "Final stat = base stat + IV + EV contribution, then scaled by level, with nature applied as a multiplier at the end (HP skips the nature step entirely). This is why competitive teams painstakingly breed for good natures and grind EVs — at high levels those hidden numbers add up to a meaningfully different Pokémon.",
      },
      {
        type: "p",
        text: "Dexverse's Pokédex shows every Pokémon's base stats at a glance, so you can spot at a glance where a species' natural strengths lie before you invest a single EV.",
      },
    ],
  },
  {
    slug: "pokemon-generations-guide",
    title: "Complete Guide to Pokémon Generations: Gen 1 to Gen 9",
    metaTitle: "Pokémon Generations Guide — Every Region from Kanto to Paldea | Dexverse",
    description:
      "Every Pokémon generation and region explained — from Kanto's original 151 to Paldea's open world, with what each generation introduced to the series.",
    readTime: "6 min read",
    updated: "2026-09-06",
    relatedSlugs: ["pokemon-evolution-explained", "ivs-vs-evs-explained"],
    blocks: [
      {
        type: "p",
        text: "Nine generations and over 1000 Pokémon later, it's easy to lose track of which region introduced what. Here's the full timeline.",
      },
      {
        type: "ul",
        items: [
          "Generation 1 — Kanto: the original 151, and the games that started it all.",
          "Generation 2 — Johto: introduced breeding, held items, and the Steel and Dark types.",
          "Generation 3 — Hoenn: added abilities, natures, and double battles.",
          "Generation 4 — Sinnoh: split physical/special moves by move type instead of by type category, and introduced the physical/special split we still use today.",
          "Generation 5 — Unova: a full reset with only new Pokémon at launch, plus seasons and rotation battles.",
          "Generation 6 — Kalos: introduced Mega Evolution and the Fairy type, and moved the series to full 3D.",
          "Generation 7 — Alola: replaced traditional Gyms with the Island Trial system and introduced regional variants.",
          "Generation 8 — Galar: introduced Dynamax/Gigantamax and the Wild Area's open-zone exploration.",
          "Generation 9 — Paldea: the series' first fully open-world region, with Terastallizing as its core new mechanic.",
        ],
      },
      { type: "h2", text: "Why generations matter for battling" },
      {
        type: "p",
        text: "Later generations don't just add Pokémon — they change the rules those Pokémon play by. The physical/special split in Gen 4 alone reshaped which Pokémon were viable, and the Fairy type's arrival in Gen 6 directly countered the Dragon types that had dominated competitive play for years.",
      },
      {
        type: "p",
        text: "Dexverse's Pokédex covers every generation from Kanto through Paldea in one place, including regional forms, Mega Evolutions, Gigantamax forms, and Paradox Pokémon — no need to jump between region-specific apps.",
      },
    ],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
