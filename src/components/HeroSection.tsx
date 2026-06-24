import { Button } from "@/components/ui/button";
import { Download, Github, Star } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero text-primary-foreground overflow-hidden">
      {/* Animated drifting orbs */}
      <div
        className="absolute top-1/4 left-[12%] w-80 h-80 rounded-full bg-accent/12 blur-3xl animate-drift pointer-events-none"
        style={{ animationDuration: "11s" }}
      />
      <div
        className="absolute bottom-1/3 right-[10%] w-96 h-96 rounded-full blur-3xl animate-drift pointer-events-none"
        style={{
          background: "hsl(18 100% 60% / 0.10)",
          animationDelay: "3.5s",
          animationDuration: "13s",
        }}
      />
      <div
        className="absolute top-[58%] left-[52%] w-56 h-56 rounded-full bg-primary/20 blur-3xl animate-drift pointer-events-none"
        style={{ animationDelay: "7s", animationDuration: "9s" }}
      />

      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto animate-fade-in">

          {/* Live badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white/90 mb-10 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-dot shadow-[0_0_8px_rgba(74,222,128,0.9)]" />
            <Star className="w-3.5 h-3.5 text-accent fill-accent" />
            Now live on Google Play
          </div>

          {/* Brand — shimmer gradient */}
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 leading-none">
            <span className="shimmer-text">Dexverse</span>
          </h1>

          {/* Statement */}
          <p className="text-2xl md:text-3xl font-medium mb-10 text-primary-foreground/95 leading-snug">
            Your Pokémon journey, leveled up.
          </p>

          {/* Supporting copy */}
          <p className="text-base md:text-lg text-primary-foreground/70 max-w-xl mx-auto mb-14 leading-relaxed">
            The complete Pokédex experience — smart search, team building, and legendary encounters. Crafted for trainers who demand more.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Button asChild variant="hero" size="xl" className="min-w-[220px] glow-cyan">
              <a href="#download">
                <Download className="mr-2 h-5 w-5" />
                Download Now
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="icon"
              className="w-12 h-12 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:scale-110 rounded-full transition-all duration-300"
            >
              <a
                href="https://github.com/Dev-Aditya-More/PokeVerse"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dexverse on GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator — line + label */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-white/45 tracking-[0.35em] uppercase font-medium">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent animate-glow-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;
