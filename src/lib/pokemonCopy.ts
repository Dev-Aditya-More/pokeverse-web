// Text used for Pokémon page titles, meta descriptions and the intro paragraph.
// Kept dependency-free (type imports only) so scripts/prerender-heads.mjs can reuse it
// and the static HTML matches what React renders.
import type { DefensiveProfile, PokemonType } from "@/data/typeChart";

export interface PokemonDetail {
  id: number;
  slug: string;
  name: string;
  genus: string;
  types: PokemonType[];
  generation: number;
  height: number; // metres
  weight: number; // kilograms
  abilities: { name: string; hidden: boolean }[];
  stats: { name: string; value: number }[];
  total: number;
  flavor: string;
  legendary: boolean;
  mythical: boolean;
  evolution: { id: number; slug: string; name: string; from: number | null; how: string }[];
  moves: { name: string; level: number }[];
}

export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const typeLabel = (types: string[]) => types.map(cap).join("/");

export const dexNumber = (id: number) => `#${String(id).padStart(4, "0")}`;

export function joinList(items: string[]): string {
  if (items.length <= 1) return items.join("");
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`;
}

export function pokemonMetaTitle(p: PokemonDetail): string {
  return `${p.name} (${dexNumber(p.id)}) — Stats, Weaknesses & Evolution | Dexverse`;
}

export function pokemonMetaDescription(p: PokemonDetail, profile: DefensiveProfile): string {
  const weak = profile.weakTo.map((w) => cap(w.type));
  const parts = [
    `${p.name} is a ${typeLabel(p.types)}-type Pokémon with a base stat total of ${p.total}.`,
    weak.length ? `Weak to ${joinList(weak)}.` : "",
    "See full base stats, abilities, evolution chain and moveset.",
  ];
  return parts.filter(Boolean).join(" ");
}

export function pokemonIntro(p: PokemonDetail, profile: DefensiveProfile): string {
  const kind = p.legendary ? "Legendary " : p.mythical ? "Mythical " : "";
  const article = /^[aeiou]/i.test(`${kind}${typeLabel(p.types)}`) ? "an" : "a";
  const best = [...p.stats].sort((a, b) => b.value - a.value)[0];
  const abilities = p.abilities.filter((a) => !a.hidden).map((a) => a.name);
  const hidden = p.abilities.find((a) => a.hidden)?.name;
  const weak = profile.weakTo.map((w) => `${cap(w.type)}${w.multiplier === 4 ? " (4x)" : ""}`);
  const sentences = [
    `${p.name} (${dexNumber(p.id)}) is ${article} ${kind}${typeLabel(p.types)}-type ${p.genus ? `${p.genus} ` : ""}Pokémon introduced in Generation ${p.generation}.`,
    `It stands ${p.height} m tall, weighs ${p.weight} kg and has a base stat total of ${p.total}, with its highest base stat in ${best.name} (${best.value}).`,
    `Its ${abilities.length > 1 ? "abilities are" : "ability is"} ${joinList(abilities)}${hidden ? `, with ${hidden} as its Hidden Ability` : ""}.`,
    weak.length ? `${p.name} is weak to ${joinList(weak)} attacks.` : `${p.name} has no type weaknesses.`,
  ];
  if (profile.immuneTo.length) {
    sentences.push(`It is immune to ${joinList(profile.immuneTo.map(cap))}-type moves.`);
  }
  return sentences.join(" ");
}
