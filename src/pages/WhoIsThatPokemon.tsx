import { useState, useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { toast } from "sonner";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePokemon } from "@/hooks/usePokemon";
import { POKEMON_NAMES } from "@/data/pokemonNames";
import { Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
          toast.success(`New record: streak of ${newStreak}!`, {
            action: { label: "Share", onClick: () => handleShare() },
          });
        } else {
          toast.success(`Correct! It's ${round.name}!`);
        }
      } else {
        setStreak(0);
        toast.error(`Nope, that was ${round.name}.`);
      }
    },
    [revealed, round.name, streak, bestStreak]
  );

  const handleNext = useCallback(() => {
    setRound(pickRound());
    setRevealed(false);
  }, []);

  const handleShare = useCallback(async () => {
    const scoreToShare = Math.max(streak, bestStreak);
    const shareUrl = "https://dexverse.in/who-is-that-pokemon";
    const text = `I just hit a streak of ${scoreToShare} on Who's That Pokémon? on Dexverse! Think you can beat it?`;

    if (navigator.share) {
      try {
        await navigator.share({ title: "Who's That Pokémon? | Dexverse", text, url: shareUrl });
      } catch {
        // user cancelled the share sheet, nothing to do
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(`${text} ${shareUrl}`);
      toast.success("Score copied to clipboard. Go paste it somewhere!");
    } catch {
      toast.error("Couldn't copy. Try sharing manually.");
    }
  }, [streak, bestStreak]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (!revealed && ["1", "2", "3", "4"].includes(e.key)) {
        handleGuess(round.choices[Number(e.key) - 1]);
      } else if (revealed && e.key === "Enter") {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [revealed, round.choices, handleGuess, handleNext]);

  return (
    <PageLayout>
      <Helmet>
        <title>Who's That Pokémon? — Free Silhouette Guessing Game | Dexverse</title>
        <meta
          name="description"
          content="Play Who's That Pokémon? for free. Guess the silhouette from all 1000+ Pokémon and build your streak. No sign-up, unlimited rounds."
        />
        <link rel="canonical" href="https://dexverse.in/who-is-that-pokemon" />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-12 max-w-3xl">
        <div className="mb-5 sm:mb-8 text-center">
          <div className="hidden sm:block">
            <span className="eyebrow mb-4">✦ Free browser game</span>
          </div>
          <h1 className="text-[1.7rem] sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-4">
            Who's That <span className="text-accent-yellow [text-shadow:0_4px_0_hsl(222_75%_35%)]">Pokémon?</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Guess the silhouette and keep your streak alive. Pick from the four names below;
            there's always another Pokémon waiting.
          </p>
        </div>

        <div className="flex justify-center items-center gap-3 sm:gap-4 mb-4 sm:mb-6 text-sm">
          <div className="glass rounded-2xl px-4 py-2 sm:px-6 sm:py-3 text-center min-w-[80px] sm:min-w-[96px]">
            <motion.p
              key={streak}
              initial={{ scale: 1.5, color: "#f7d02c" }}
              animate={{ scale: 1, color: "#3dd9ff" }}
              className="font-display text-xl sm:text-2xl font-bold"
            >
              {streak}
            </motion.p>
            <p className="text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Streak</p>
          </div>
          <div className="glass rounded-2xl px-4 py-2 sm:px-6 sm:py-3 text-center min-w-[80px] sm:min-w-[96px]">
            <p className="font-display text-xl sm:text-2xl font-bold text-foreground">{bestStreak}</p>
            <p className="text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Best</p>
          </div>
          {bestStreak > 0 && (
            <Button variant="outline" size="sm" onClick={handleShare} className="gap-2 rounded-full glass">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          )}
        </div>

        <div className="relative overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] border border-white/10 p-4 sm:p-10 flex flex-col items-center shadow-large bg-[hsl(222_75%_30%)]">
          {/* Classic TV-show sunburst */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[38%] h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow bg-[repeating-conic-gradient(from_0deg,hsl(45_96%_62%/0.35)_0deg_9deg,transparent_9deg_18deg)]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,transparent_10%,hsl(222_75%_22%/0.9)_70%)]" />

          <div className="relative flex h-44 w-44 min-[400px]:h-52 min-[400px]:w-52 sm:h-72 sm:w-72 items-center justify-center">
            {revealed && (
              <motion.div
                key={`flash-${round.id}`}
                initial={{ opacity: 0.9, scale: 0.4 }}
                animate={{ opacity: 0, scale: 2 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 rounded-full bg-white"
              />
            )}
            {isLoading || !pokemon ? (
              <Skeleton className="w-3/4 h-3/4 rounded-full bg-white/10" />
            ) : (
              <motion.img
                key={round.id}
                src={pokemon.artworkUrl}
                alt={revealed ? round.name : "Mystery Pokémon silhouette"}
                initial={{ filter: "brightness(0)", scale: 0.85, opacity: 0 }}
                animate={{
                  filter: revealed ? "brightness(1)" : "brightness(0)",
                  scale: revealed ? 1.05 : 1,
                  opacity: 1,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
                draggable={false}
              />
            )}
          </div>

          <div className="relative h-8 sm:h-10 mt-1 sm:mt-2">
            {revealed && (
              <motion.p
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="font-display text-xl sm:text-3xl font-black text-accent-yellow [text-shadow:0_3px_0_hsl(222_75%_25%)]"
              >
                It's {round.name}!
              </motion.p>
            )}
          </div>

          <div className="relative grid grid-cols-2 gap-2 sm:gap-3 mt-3 sm:mt-6 w-full max-w-lg">
            {round.choices.map((choice, i) => {
              const isAnswer = choice === round.name;
              return (
                <button
                  key={choice}
                  disabled={revealed}
                  onClick={() => handleGuess(choice)}
                  className={cn(
                    "group flex min-h-[48px] items-center justify-center sm:justify-start gap-3 rounded-2xl border px-2 sm:px-4 py-2.5 sm:py-3.5 text-center sm:text-left text-sm sm:text-base font-semibold leading-tight break-words transition-all duration-300",
                    !revealed && "border-white/15 bg-black/25 hover:bg-white/15 hover:border-white/40 hover:-translate-y-0.5",
                    revealed && isAnswer && "border-green-400/70 bg-green-500/25 text-white",
                    revealed && !isAnswer && "border-white/5 bg-black/20 opacity-50"
                  )}
                >
                  <kbd className="hidden sm:inline-flex h-6 w-6 items-center justify-center rounded-md bg-white/10 font-mono text-xs text-white/60">
                    {i + 1}
                  </kbd>
                  {choice}
                </button>
              );
            })}
          </div>

          <div className="relative h-12 sm:h-14 mt-3 sm:mt-6 flex items-center">
            {revealed && (
              <Button onClick={handleNext} size="lg" className="rounded-full bg-white text-background hover:bg-white/90 font-bold">
                Next Pokémon <span className="ml-2 hidden sm:inline text-xs opacity-60">Enter ↵</span>
              </Button>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground hidden sm:block">
          Tip: press <kbd className="font-mono">1</kbd>–<kbd className="font-mono">4</kbd> to guess and{" "}
          <kbd className="font-mono">Enter</kbd> for the next Pokémon.
        </p>
      </div>
    </PageLayout>
  );
};

export default WhoIsThatPokemon;
