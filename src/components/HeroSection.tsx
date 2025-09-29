import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Github } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero text-primary-foreground overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.05%22%3E%3Cpath%20d=%22M30%2030c0-11.046-8.954-20-20-20s-20%208.954-20%2020%208.954%2020%2020%2020%2020-8.954%2020-20zm0%200c0%2011.046%208.954%2020%2020%2020s20-8.954%2020-20-8.954-20-20-20-20%208.954-20%2020z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

      {/* Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Pokeverse
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 font-light">
            Your ultimate Pokémon companion
          </p>
          <p className="text-lg md:text-xl mb-12 text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Discover, search, and collect your favorite Pokémon with the most
            comprehensive and user-friendly companion app available.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild variant="hero" size="xl" className="min-w-[200px]">
              <a href="#download">
                <Download className="mr-2 h-5 w-5" />
                Coming Soon
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="icon"
              className="w-12 h-12 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white rounded-full"
            >
              <a
                href="https://github.com/your-username/your-repo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-6 w-6" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <svg
          className="w-8 h-8 text-white/80 animate-bounce"
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
        <span className="text-base text-white/80 font-light tracking-wider mt-1">
          Scroll
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
