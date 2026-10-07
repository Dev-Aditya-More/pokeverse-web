import type { PokemonType } from "@/data/typeChart";

// PokeAPI's sprite repo is a static CDN, so these URLs need no API call.
const SPRITE_BASE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

export const artworkUrl = (id: number) => `${SPRITE_BASE}/other/official-artwork/${id}.png`;
export const pixelSpriteUrl = (id: number) => `${SPRITE_BASE}/${id}.png`;

export interface ShowcasePokemon {
  id: number;
  name: string;
  types: PokemonType[];
}

// Hand-picked fan favourites across every generation for the hero rotation.
export const SHOWCASE: ShowcasePokemon[] = [
  { id: 6, name: "Charizard", types: ["fire", "flying"] },
  { id: 384, name: "Rayquaza", types: ["dragon", "flying"] },
  { id: 658, name: "Greninja", types: ["water", "dark"] },
  { id: 448, name: "Lucario", types: ["fighting", "steel"] },
  { id: 249, name: "Lugia", types: ["psychic", "flying"] },
  { id: 94, name: "Gengar", types: ["ghost", "poison"] },
  { id: 445, name: "Garchomp", types: ["dragon", "ground"] },
  { id: 197, name: "Umbreon", types: ["dark"] },
  { id: 1007, name: "Koraidon", types: ["fighting", "dragon"] },
  { id: 25, name: "Pikachu", types: ["electric"] },
];
