import { useQuery } from "@tanstack/react-query";

export interface PokemonSprite {
  id: number;
  name: string;
  artworkUrl: string;
}

async function fetchPokemon(id: number): Promise<PokemonSprite> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch pokemon ${id}`);
  const data = await res.json();
  const artworkUrl =
    data.sprites?.other?.["official-artwork"]?.front_default ?? data.sprites?.front_default;
  return { id: data.id, name: data.name, artworkUrl };
}

export function usePokemon(id: number) {
  return useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => fetchPokemon(id),
    staleTime: Infinity,
  });
}
