export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "table"; caption: string; head: string[]; rows: string[][] };

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
      "A complete breakdown of Pokémon type effectiveness: how the 18 types interact, dual-type math, and the matchups every trainer should memorize.",
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
          "Super effective (2×): the attacking type hits a clear weakness.",
          "Not very effective (0.5×): the defending type resists the attack.",
          "No effect (0×): a small number of types are completely immune to certain attacks (e.g. Ground moves against Flying types).",
          "Normal damage (1×): no type advantage either way.",
        ],
      },
      {
        type: "p",
        text: "Dual-type Pokémon multiply both interactions together. A Fire move against a Grass/Flying Pokémon deals 2× (Fire beats Grass) × 0.5× (Flying resists Fire) = 1×, normal damage, even though it looks like it should be a clean sweep on paper.",
      },
      { type: "h2", text: "Matchups worth memorizing first" },
      {
        type: "ul",
        items: [
          "Water beats Fire, Ground, and Rock, making it one of the most universally useful attacking types in the game.",
          "Electric beats Water and Flying, but does nothing to Ground types.",
          "Fighting hits Normal, Rock, Steel, Ice, and Dark hard, but Psychic and Flying types shrug it off.",
          "Fairy beats Dragon, Dark, and Fighting. It's the reason Fairy-types dethroned Dragon as the game's top-tier closer.",
          "Ghost and Normal have no effect on each other at all, a rare 0× immunity worth remembering.",
        ],
      },
      {
        type: "p",
        text: "Rather than memorizing all 18×18 combinations, most trainers learn the chart in clusters: starter-type triangles (Grass/Fire/Water), then the newer types (Dark, Steel, Fairy) that were added to balance them out.",
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
      "Every way a Pokémon can evolve: level-up thresholds, evolution stones, trade evolutions, friendship, time of day, and the weirder location-based methods.",
    readTime: "5 min read",
    updated: "2026-09-06",
    relatedSlugs: ["pokemon-generations-guide", "pokemon-type-chart-explained"],
    blocks: [
      {
        type: "p",
        text: "Evolution is Pokémon's core progression hook, but it isn't just \"level up enough and it happens.\" The series has layered on new evolution methods with almost every generation. Here's the full picture.",
      },
      { type: "h2", text: "Level-based evolution" },
      {
        type: "p",
        text: "The simplest method: a Pokémon evolves automatically once it reaches a set level (Charmander → Charmeleon at level 16, for example). Some level evolutions also require a condition on top of the level, like a specific time of day, weather, or location.",
      },
      { type: "h2", text: "Evolution stones" },
      {
        type: "p",
        text: "Items like the Fire Stone, Water Stone, Thunder Stone, and Moon Stone trigger instant evolution when used on a compatible Pokémon, with no level requirement. This is how Eevee branches into Flareon, Vaporeon, and Jolteon.",
      },
      { type: "h2", text: "Trade evolutions" },
      {
        type: "p",
        text: "Some Pokémon (Machoke, Graveler, Haunter) only evolve when traded to another player, a mechanic originally designed to encourage trading between game versions. Some trade evolutions also require holding a specific item during the trade, like Metal Coat for Scyther → Scizor.",
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
          "Location-based: evolving in a specific area, like Magneton at a Magnetic Field cave.",
          "Move-based: knowing a specific move when leveling up, like Piloswine learning Ancient Power.",
          "Stat-based: evolving depending on which stat is higher, like Tyrogue splitting into Hitmonlee, Hitmonchan, or Hitmontop.",
          "Region forms: Galarian, Alolan, and Hisuian evolutions swap the usual method for a region-specific twist entirely.",
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
        text: "Two Pokémon of the same species, the same level, can have noticeably different stats. That's not random. It's the result of four layered systems working together: base stats, IVs, EVs, and nature.",
      },
      { type: "h2", text: "Base stats: the species' ceiling" },
      {
        type: "p",
        text: "Every species has fixed base stats for HP, Attack, Defense, Special Attack, Special Defense, and Speed. These set the overall profile. A Blissey will always have huge HP and poor Attack no matter how it's trained, because that's baked into the species.",
      },
      { type: "h2", text: "IVs: the genetic lottery" },
      {
        type: "p",
        text: "Individual Values (IVs) are a hidden number from 0–31 rolled independently for each stat when a Pokémon is generated, functioning like genetics. A Pokémon with 31 IVs in every stat is called \"perfect\", the theoretical best version of that species. IVs never change once a Pokémon exists (breeding aside).",
      },
      { type: "h2", text: "EVs: the training you control" },
      {
        type: "p",
        text: "Effort Values (EVs) are earned by defeating other Pokémon, and each species awards EVs in specific stats. A Pokémon can hold a maximum of 510 total EVs, capped at 252 in any single stat, meaning you can max out two stats and spread the rest, but never max everything at once. This is the main lever competitive players use to shape a Pokémon toward a role.",
      },
      { type: "h2", text: "Nature: the stat modifier" },
      {
        type: "p",
        text: "Each Pokémon has one of 25 natures, which boosts one stat by 10% and lowers another by 10% (a handful of neutral natures affect nothing). A Timid nature, for example, boosts Speed and lowers Attack, ideal for a fast special attacker that never plans to use physical moves.",
      },
      { type: "h2", text: "Putting it together" },
      {
        type: "p",
        text: "Final stat = base stat + IV + EV contribution, then scaled by level, with nature applied as a multiplier at the end (HP skips the nature step entirely). This is why competitive teams painstakingly breed for good natures and grind EVs: at high levels those hidden numbers add up to a meaningfully different Pokémon.",
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
      "Every Pokémon generation and region explained, from Kanto's original 151 to Paldea's open world, with what each generation introduced to the series.",
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
          "Generation 1 (Kanto): the original 151, and the games that started it all.",
          "Generation 2 (Johto): introduced breeding, held items, and the Steel and Dark types.",
          "Generation 3 (Hoenn): added abilities, natures, and double battles.",
          "Generation 4 (Sinnoh): introduced the physical/special split, so each move became physical or special on its own, instead of every move of a type sharing one category.",
          "Generation 5 (Unova): a full reset with only new Pokémon at launch, plus seasons and rotation battles.",
          "Generation 6 (Kalos): introduced Mega Evolution and the Fairy type, and moved the series to full 3D.",
          "Generation 7 (Alola): replaced traditional Gyms with the Island Trial system and introduced regional variants.",
          "Generation 8 (Galar): introduced Dynamax/Gigantamax and the Wild Area's open-zone exploration.",
          "Generation 9 (Paldea): the series' first fully open-world region, with Terastallizing as its core new mechanic.",
        ],
      },
      { type: "h2", text: "Why generations matter for battling" },
      {
        type: "p",
        text: "Later generations don't just add Pokémon. They change the rules those Pokémon play by. The physical/special split in Gen 4 alone reshaped which Pokémon were viable, and the Fairy type's arrival in Gen 6 directly countered the Dragon types that had dominated competitive play for years.",
      },
      {
        type: "p",
        text: "Dexverse's Pokédex covers every generation from Kanto through Paldea in one place, including regional forms, Mega Evolutions, Gigantamax forms, and Paradox Pokémon, so there's no need to jump between region-specific apps.",
      },
    ],
  },
  {
    slug: "pokemon-nature-chart",
    title: "Pokémon Nature Chart: All 25 Natures and Their Stat Effects",
    metaTitle: "Pokémon Nature Chart — All 25 Natures, Boosts & Drops | Dexverse",
    description:
      "The complete Pokémon nature chart: every nature's raised and lowered stat, the five neutral natures, and how to pick the right nature for your Pokémon.",
    readTime: "4 min read",
    updated: "2026-10-08",
    relatedSlugs: ["ivs-vs-evs-explained", "pokemon-team-building-guide"],
    blocks: [
      {
        type: "p",
        text: "Every Pokémon has one of 25 natures. Twenty of them raise one stat by 10% and lower another by 10%; the other five are neutral and change nothing. HP is never affected. Natures were introduced in Generation 3 and work the same way in every game since.",
      },
      { type: "h2", text: "The full nature chart" },
      {
        type: "table",
        caption: "All 25 Pokémon natures with the stat each one raises and lowers",
        head: ["Nature", "Raises (+10%)", "Lowers (−10%)"],
        rows: [
          ["Adamant", "Attack", "Sp. Atk"],
          ["Brave", "Attack", "Speed"],
          ["Lonely", "Attack", "Defense"],
          ["Naughty", "Attack", "Sp. Def"],
          ["Bold", "Defense", "Attack"],
          ["Impish", "Defense", "Sp. Atk"],
          ["Lax", "Defense", "Sp. Def"],
          ["Relaxed", "Defense", "Speed"],
          ["Modest", "Sp. Atk", "Attack"],
          ["Mild", "Sp. Atk", "Defense"],
          ["Quiet", "Sp. Atk", "Speed"],
          ["Rash", "Sp. Atk", "Sp. Def"],
          ["Calm", "Sp. Def", "Attack"],
          ["Careful", "Sp. Def", "Sp. Atk"],
          ["Gentle", "Sp. Def", "Defense"],
          ["Sassy", "Sp. Def", "Speed"],
          ["Hasty", "Speed", "Defense"],
          ["Jolly", "Speed", "Sp. Atk"],
          ["Naive", "Speed", "Sp. Def"],
          ["Timid", "Speed", "Attack"],
          ["Bashful", "None", "None (neutral)"],
          ["Docile", "None", "None (neutral)"],
          ["Hardy", "None", "None (neutral)"],
          ["Quirky", "None", "None (neutral)"],
          ["Serious", "None", "None (neutral)"],
        ],
      },
      { type: "h2", text: "How to choose a nature" },
      {
        type: "p",
        text: "The rule of thumb: raise the stat your Pokémon wins with, and lower the one it never uses. A physical attacker almost never needs Special Attack, so it can safely drop it.",
      },
      {
        type: "ul",
        items: [
          "Physical attackers: Adamant (more power) or Jolly (more speed). Both lower Sp. Atk.",
          "Special attackers: Modest (more power) or Timid (more speed). Both lower Attack.",
          "Physical walls: Bold for special-only users, Impish for physical attackers.",
          "Special walls: Calm for special-only users, Careful for physical attackers.",
          "Trick Room teams: Brave or Quiet, because lower Speed is an advantage there.",
        ],
      },
      { type: "h2", text: "Changing a nature with Mints" },
      {
        type: "p",
        text: "Since Pokémon Sword and Shield, Mints let you swap which stats a nature affects without breeding a new Pokémon. The Pokémon keeps its original nature's name, but its stats follow the Mint. A Serious Mint makes any Pokémon neutral.",
      },
      {
        type: "p",
        text: "A nature's 10% compounds with IVs and EVs, so it matters most at high levels. Read our IVs vs EVs guide to see how all three fit together.",
      },
    ],
  },
  {
    slug: "tera-types-explained",
    title: "Tera Types Explained: How Terastallizing Works in Pokémon Scarlet & Violet",
    metaTitle: "Tera Types Explained — Terastal STAB, Stellar & Strategy | Dexverse",
    description:
      "How Terastallizing works in Pokémon Scarlet and Violet: Tera type defense, STAB bonuses, Tera Blast, the Stellar type, and how to change a Tera type.",
    readTime: "5 min read",
    updated: "2026-10-08",
    relatedSlugs: ["pokemon-type-chart-explained", "pokemon-team-building-guide"],
    blocks: [
      {
        type: "p",
        text: "Terastallizing is Generation 9's signature mechanic. Once per battle, one of your Pokémon can transform into its Tera Type, which can change its weaknesses, strengthen its attacks, or both. It's the reason a Pokémon's typing in Scarlet and Violet is never quite certain until the battle starts.",
      },
      { type: "h2", text: "What a Tera Type is" },
      {
        type: "p",
        text: "Every Pokémon in Scarlet and Violet has a Tera Type. Usually it matches one of its normal types, but it can be any of the 18 types. You need a charged Tera Orb to Terastallize, and using it drains the Orb until you recharge it at a Pokémon Center.",
      },
      { type: "h2", text: "What changes when you Terastallize" },
      {
        type: "ul",
        items: [
          "Defense: the Pokémon becomes purely its Tera Type, losing its original weaknesses and resistances.",
          "Attack: it keeps its usual 1.5× STAB on moves of its original types, and gains STAB on moves of its Tera Type.",
          "Double STAB: if the Tera Type matches one of its original types, that type's STAB rises from 1.5× to 2×.",
          "Weak moves get a floor: moves of the Tera Type with less than 60 base power are boosted to 60. Multi-hit and priority moves don't get this boost.",
          "Tera Blast becomes the Tera Type, and turns physical if the user's Attack is higher than its Special Attack.",
        ],
      },
      { type: "h2", text: "Defensive vs offensive Tera" },
      {
        type: "p",
        text: "A defensive Tera turns a bad matchup into a good one. Picture a Dragon/Ground Pokémon like Garchomp staring down an Ice attack: going Tera Steel or Tera Water flips a 4× weakness into a resistance. An offensive Tera does the opposite and doubles down. A Pokémon that Terastallizes into its own main type hits much harder with 2× STAB.",
      },
      {
        type: "p",
        text: "The classic example is Dragonite with Tera Normal. Its Extreme Speed gets STAB, and its Ice and Dragon weaknesses vanish, leaving it weak only to Fighting.",
      },
      { type: "h2", text: "The Stellar Tera Type" },
      {
        type: "p",
        text: "The Indigo Disk DLC added the Stellar Tera Type. A Stellar Pokémon keeps its original types on defense. On offense, the first move of each type gets a one-time boost: 2× for its original types and 1.2× for other types. Stellar Tera Blast is super effective against any Terastallized target.",
      },
      { type: "h2", text: "How to change a Tera Type" },
      {
        type: "p",
        text: "Collect 50 Tera Shards of the type you want and bring them to the Treasure Eatery in Medali to change a Pokémon's Tera Type. Tera Shards drop from Tera Raid Battles. Higher-star raids give more shards.",
      },
      {
        type: "p",
        text: "Terastallizing rewrites a Pokémon's matchups mid-fight, so know the underlying type chart cold. Our Pokémon type chart includes a dual-type calculator for checking any combination.",
      },
    ],
  },
  {
    slug: "pokemon-team-building-guide",
    title: "How to Build a Pokémon Team: A Beginner's Team-Building Guide",
    metaTitle: "How to Build a Pokémon Team — Beginner Team Building Guide | Dexverse",
    description:
      "Build a balanced Pokémon team step by step: roles, type coverage, shared weaknesses, speed control, and the checklist to run before every battle.",
    readTime: "6 min read",
    updated: "2026-10-08",
    relatedSlugs: ["pokemon-type-chart-explained", "pokemon-nature-chart"],
    blocks: [
      {
        type: "p",
        text: "Six strong Pokémon don't automatically make a strong team. What wins is how they cover for each other: one Pokémon's weakness should be another's resistance, and every threat you'll face should have an answer. Whether you're planning a playthrough or your first competitive team, the process is the same.",
      },
      { type: "h2", text: "1. Start with a core you love" },
      {
        type: "p",
        text: "Pick one or two Pokémon you want to build around. Your starter, a favourite, or a powerful legendary all work. Everything else on the team exists to support them and patch their weaknesses.",
      },
      { type: "h2", text: "2. Give every slot a job" },
      {
        type: "ul",
        items: [
          "Sweeper: a fast, hard-hitting Pokémon that cleans up weakened opponents.",
          "Tank or wall: soaks up hits and switches into attacks your other Pokémon fear.",
          "Pivot: uses moves like U-turn or Volt Switch to keep momentum.",
          "Support: sets up screens, hazards, or status like Thunder Wave and Will-O-Wisp.",
          "Wincon: the one Pokémon whose game plan your whole team is built to enable.",
        ],
      },
      { type: "h2", text: "3. Check for shared weaknesses" },
      {
        type: "p",
        text: "This is the most common beginner mistake. If three of your six Pokémon are weak to Ground, a single Earthquake user can sweep you. Write down each Pokémon's weaknesses and make sure no type hits more than two of them super-effectively, and that each weakness has at least one teammate that resists it.",
      },
      {
        type: "p",
        text: "Fire, Water and Grass is the classic example. Each covers the others' weaknesses, which is why so many teams are built around a variation of it.",
      },
      { type: "h2", text: "4. Cover the type chart on offense" },
      {
        type: "p",
        text: "Your team's moves together should hit as many types as possible for super-effective damage. Coverage moves fill gaps, like a Water type carrying an Ice move for Dragons and Grass types. Avoid stacking four moves of the same type on one Pokémon.",
      },
      { type: "h2", text: "5. Mix physical and special attackers" },
      {
        type: "p",
        text: "A team of only physical attackers is shut down by one Intimidate user or one Will-O-Wisp burn. Balance physical and special damage so a single defensive Pokémon can't wall you.",
      },
      { type: "h2", text: "6. Plan for speed" },
      {
        type: "p",
        text: "Moving first wins games. Include at least one naturally fast Pokémon, a priority move like Extreme Speed or Sucker Punch, or speed control such as Thunder Wave, Icy Wind, Tailwind or Trick Room.",
      },
      { type: "h2", text: "The pre-battle checklist" },
      {
        type: "ul",
        items: [
          "No single attacking type hits three or more of your Pokémon super-effectively.",
          "Every common weakness has a teammate that resists it.",
          "You have both physical and special damage.",
          "You have an answer to faster threats.",
          "Every Pokémon has a clear role.",
        ],
      },
      {
        type: "p",
        text: "The Dexverse app's team builder runs this analysis for you. It rates your team, shows type coverage out of 18, and lists every shared weakness so you can fix gaps before the battle starts.",
      },
    ],
  },
  {
    slug: "best-pokemon-of-each-type",
    title: "Best Pokémon of Every Type: 18 Top Picks for Your Team",
    metaTitle: "Best Pokémon of Every Type — Top Pick for All 18 Types | Dexverse",
    description:
      "Our pick for the best Pokémon of every type, from Normal to Fairy, with the stats, abilities and typings that make each one a team-carrying choice.",
    readTime: "5 min read",
    updated: "2026-10-08",
    relatedSlugs: ["pokemon-team-building-guide", "pokemon-type-chart-explained"],
    blocks: [
      {
        type: "p",
        text: "Best is always a little subjective, and it shifts with every game and every metagame. These picks favour Pokémon that are strong, reliable, and useful in both a playthrough and a battle, with one standout choice for each of the 18 types.",
      },
      {
        type: "table",
        caption: "The best Pokémon of each of the 18 types and why",
        head: ["Type", "Pick", "Why it stands out"],
        rows: [
          ["Normal", "Snorlax", "Enormous HP (160 base) and strong Attack (110 base). It can take a hit and hit back."],
          ["Fire", "Arcanine", "Fast and powerful (555 base stat total), with Intimidate to weaken physical attackers."],
          ["Water", "Gyarados", "Intimidate plus Dragon Dance make it one of the best setup sweepers."],
          ["Grass", "Venusaur", "Grass/Poison typing is bulky and resists many common attacks."],
          ["Electric", "Jolteon", "130 base Speed lets it outrun almost everything."],
          ["Ice", "Baxcalibur", "Dragon/Ice with a huge 145 base Attack."],
          ["Fighting", "Lucario", "Fighting/Steel with strong physical and special moves."],
          ["Poison", "Toxapex", "Elite defenses (152 Def, 142 Sp. Def) and Regenerator."],
          ["Ground", "Garchomp", "Dragon/Ground pseudo-legendary: fast, strong and bulky."],
          ["Flying", "Corviknight", "Flying/Steel resists a long list of types. A superb wall."],
          ["Psychic", "Alakazam", "135 base Sp. Atk and 120 base Speed."],
          ["Bug", "Scizor", "Bug/Steel, weak only to Fire, with Technician-boosted Bullet Punch."],
          ["Rock", "Tyranitar", "Rock/Dark powerhouse whose Sand Stream boosts its Sp. Def."],
          ["Ghost", "Gengar", "Fast (110 Speed) and hard-hitting (130 Sp. Atk)."],
          ["Dragon", "Dragonite", "Multiscale halves damage at full HP, so it can set up safely."],
          ["Dark", "Kingambit", "Dark/Steel, with Supreme Overlord growing stronger as teammates faint."],
          ["Steel", "Metagross", "135 base Attack, a 600 base stat total and Clear Body."],
          ["Fairy", "Gardevoir", "Psychic/Fairy special attacker with 125 base Sp. Atk."],
        ],
      },
      { type: "h2", text: "How we chose" },
      {
        type: "p",
        text: "We weighed base stats, typing, abilities and how easy each Pokémon is to use well. Several picks, including Scizor, Corviknight and Kingambit, earn their spot as much from their typing as from their raw numbers. A good dual type can matter more than a high stat total.",
      },
      { type: "h2", text: "Building around these picks" },
      {
        type: "p",
        text: "A team of six favourites still needs to cover each other's weaknesses. Garchomp and Dragonite, for example, are both 4× weak to Ice. Our team-building guide walks through how to balance a team, and the type chart's dual-type calculator shows exactly what each pick fears.",
      },
    ],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
