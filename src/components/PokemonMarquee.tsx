import { POKEMON_NAMES } from "@/data/pokemonNames";
import { artworkUrl, pixelSpriteUrl } from "@/lib/sprites";

// An even spread across the national dex, so every generation shows up.
const ROW_SIZE = 22;
const pickRow = (offset: number) =>
  Array.from({ length: ROW_SIZE }, (_, i) => POKEMON_NAMES[(i * 47 + offset) % POKEMON_NAMES.length]);

const ROWS = [pickRow(0), pickRow(23)];

const PokemonMarquee = () => {
  return (
    <section aria-label="Pokémon from every generation" className="relative py-10">
      <p className="mb-6 px-6 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-[11px] sm:tracking-[0.3em]">
        From Bulbasaur to Pecharunt, every generation
      </p>
      <div className="mask-fade-x space-y-4 overflow-hidden">
        {ROWS.map((row, r) => (
          <div
            key={r}
            className={`flex w-max gap-4 hover:[animation-play-state:paused] ${
              r === 0 ? "animate-marquee" : "animate-marquee-reverse"
            }`}
          >
            {[...row, ...row].map((p, i) => (
              <div
                key={`${p.id}-${i}`}
                className="glass group flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 sm:h-24 sm:w-24"
                title={`#${p.id} ${p.name}`}
                aria-hidden={i >= row.length}
              >
                <img
                  src={pixelSpriteUrl(p.id)}
                  alt={i < row.length ? p.name : ""}
                  width={96}
                  height={96}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    // A few recent Pokémon lack a pixel sprite; fall back to official artwork.
                    const img = e.currentTarget;
                    if (!img.dataset.fallback) {
                      img.dataset.fallback = "1";
                      img.src = artworkUrl(p.id);
                    }
                  }}
                  className="pixelated h-16 w-16 transition-transform duration-300 group-hover:scale-125 sm:h-20 sm:w-20"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PokemonMarquee;
