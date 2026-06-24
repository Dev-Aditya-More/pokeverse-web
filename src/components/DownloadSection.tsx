import { Button } from "@/components/ui/button";
import { Download, Check } from "lucide-react";

const perks = [
  "Free to download, forever",
  "Regular updates with new features",
];

const DownloadSection = () => {
  return (
    <section id="download" className="py-24 bg-gradient-to-b from-background to-secondary/40">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 border border-accent/30 rounded-full text-xs font-semibold tracking-widest text-accent uppercase mb-8">
            ✦ Join 8k+ Trainers
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to start your journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Carry the complete Pokédex in your pocket — beautifully designed for trainers who care about every detail.
          </p>

          {/* Main card */}
          <div className="bg-card rounded-2xl shadow-large p-8 md:p-12 mb-10 border border-border/30 relative overflow-hidden">
            {/* Inner glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-28 bg-accent/6 blur-3xl rounded-full pointer-events-none" />

            <h3 className="text-2xl font-semibold text-foreground mb-3 relative">
              Available on Google Play
            </h3>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto relative">
              Free download. No sign-up required. Start exploring in seconds.
            </p>

            <Button
              asChild
              size="xl"
              className="min-w-[240px] bg-primary text-primary-foreground hover:bg-primary/90 relative group hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-primary/25"
            >
              <a
                href="https://play.google.com/store/apps/details?id=com.aditya1875.pokeverse.play"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="mr-2 h-5 w-5 group-hover:animate-float" />
                Get it on Google Play
              </a>
            </Button>
          </div>

          {/* Perks list */}
          <div className="flex flex-col sm:flex-row justify-center gap-5 sm:gap-8">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-accent shrink-0" />
                {perk}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
