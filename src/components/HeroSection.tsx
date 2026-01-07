import { Button } from "@/components/ui/button";
import { Download, Github } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero text-primary-foreground overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.05%22%3E%3Cpath%20d=%22M30%2030c0-11.046-8.954-20-20-20s-20%208.954-20%2020%208.954%2020%2020%2020%2020-8.954%2020-20zm0%200c0%2011.046%208.954%2020%2020%2020s20-8.954%2020-20-8.954-20-20-20-20%208.954-20%2020z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-25" />

      {/* Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Brand */}
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6">
            Pokeverse
          </h1>

          {/* Statement */}
          <p className="text-2xl md:text-3xl font-medium mb-10 text-primary-foreground/95 leading-snug">
            Explore the legends like never before.
          </p>

          {/* Supporting copy */}
          <p className="text-base md:text-lg text-primary-foreground/70 max-w-xl mx-auto mb-14 leading-relaxed">
            Discover, search, and collect your favorite Pokémon through a fast,
            thoughtfully designed companion built for true fans.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Button asChild variant="hero" size="xl" className="min-w-[220px]">
              <a href="#download">
                <Download className="mr-2 h-5 w-5" />
                Download Now
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="icon"
              className="w-12 h-12 bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-full"
            >
              <a
                href="https://github.com/Dev-Aditya-More/PokeVerse"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pokeverse on GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <svg
          className="w-7 h-7 text-white/70 animate-bounce"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
        <span className="text-sm text-white/60 tracking-widest mt-1">
          SCROLL
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
