import { useState, useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { toast } from "sonner";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePokemon } from "@/hooks/usePokemon";
import { POKEMON_NAMES } from "@/data/pokemonNames";

const BEST_STREAK_KEY = "dexverse-whos-that-pokemon-best-streak";

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pickRound() {
  const correctIndex = Math.floor(Math.random() * POKEMON_NAMES.length);
  const correct = POKEMON_NAMES[correctIndex];

  const decoyPool = POKEMON_NAMES.filter((p) => p.id !== correct.id);
  const decoys: typeof POKEMON_NAMES = [];
  while (decoys.length < 3) {
    const candidate = decoyPool[Math.floor(Math.random() * decoyPool.length)];
    if (!decoys.some((d) => d.id === candidate.id)) decoys.push(candidate);
  }

  return { id: correct.id, name: correct.name, choices: shuffle([correct.name, ...decoys.map((d) => d.name)]) };
}

const WhoIsThatPokemon = () => {
  const [round, setRound] = useState(pickRound);
  const [revealed, setRevealed] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const { data: pokemon, isLoading } = usePokemon(round.id);

  useEffect(() => {
    const stored = localStorage.getItem(BEST_STREAK_KEY);
    if (stored) setBestStreak(parseInt(stored, 10) || 0);
  }, []);

  const handleGuess = useCallback(
    (guess: string) => {
      if (revealed) return;
      setRevealed(true);

      if (guess === round.name) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        if (newStreak > bestStreak) {
          setBestStreak(newStreak);
          localStorage.setItem(BEST_STREAK_KEY, String(newStreak));
        }
        toast.success(`Correct! It's ${round.name}!`);
      } else {
        setStreak(0);
        toast.error(`Nope — that was ${round.name}.`);
      }
    },
    [revealed, round.name, streak, bestStreak]
  );

  const handleNext = useCallback(() => {
    setRound(pickRound());
    setRevealed(false);
  }, []);

  return (
    <PageLayout>
      <Helmet>
        <title>Who's That Pokémon? — Free Silhouette Guessing Game | Dexverse</title>
        <meta
          name="description"
          content="Play Who's That Pokémon? for free — guess the silhouette from all 1000+ Pokémon and build your streak. No sign-up, unlimited rounds."
        />
        <link rel="canonical" href="https://dexverse.in/who-is-that-pokemon" />
      </Helmet>

      <div className="container mx-auto px-6 py-16 max-w-2xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-3">Who's That Pokémon?</h1>
          <p className="text-muted-foreground leading-relaxed">
            Guess the silhouette and keep your streak alive. Pick from the four names below —
            there's always another Pokémon waiting.
          </p>
        </div>

        <div className="flex justify-center gap-8 mb-8 text-sm">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{streak}</p>
            <p className="text-muted-foreground uppercase tracking-wide text-xs">Streak</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{bestStreak}</p>
            <p className="text-muted-foreground uppercase tracking-wide text-xs">Best</p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-8 flex flex-col items-center">
          {isLoading || !pokemon ? (
            <Skeleton className="w-56 h-56 rounded-lg" />
          ) : (
            <motion.img
              key={round.id}
              src={pokemon.artworkUrl}
              alt={revealed ? round.name : "Mystery Pokémon silhouette"}
              initial={{ filter: "brightness(0)" }}
              animate={{ filter: revealed ? "brightness(1)" : "brightness(0)" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-56 h-56 object-contain"
            />
          )}

          <div className="grid grid-cols-2 gap-3 mt-8 w-full max-w-md">
            {round.choices.map((choice) => (
              <Button
                key={choice}
                variant={
                  revealed
                    ? choice === round.name
                      ? "default"
                      : "outline"
                    : "outline"
                }
                disabled={revealed}
                onClick={() => handleGuess(choice)}
                className="h-auto py-3 hover:bg-primary/10 hover:border-primary hover:text-foreground"
              >
                {choice}
              </Button>
            ))}
          </div>

          {revealed && (
            <Button onClick={handleNext} className="mt-6">
              Next Pokémon
            </Button>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default WhoIsThatPokemon;
