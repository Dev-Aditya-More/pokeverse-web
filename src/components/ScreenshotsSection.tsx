import screenshot1 from "@/assets/1.png";
import screenshot2 from "@/assets/2.png";
import screenshot3 from "@/assets/3.png";
import screenshot4 from "@/assets/4.png";
import screenshot5 from "@/assets/5.png";
import screenshot6 from "@/assets/6.png";


const screenshots = [
  {
    src: screenshot1,
    alt: "Pokeverse app main interface showing Pokémon grid with search and filter options",
    title: "Discover & Browse"
  },
  {
    src: screenshot2,
    alt: "Detailed Pokémon team screen displaying stats, abilities, and moves",
    title: "Team Information"
  },
  {
    src: screenshot3,
    alt: "Customise with Particle Effects",
    title: "Settings Info"
  },
  {
    src: screenshot4,
    alt: "Pokémon detail view with artwork, abilities, and type effectiveness",
    title: "In-Depth Details"
  },
  {
    src: screenshot5,
    alt: "Mega Evolutions at their very best",
    title: "Pokemon mega evolutions"
  },
  {
    src: screenshot6,
    alt: "Unleash Legendary powers",
    title: "Pokeverse Legends"
  }
];

const ScreenshotsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            See it in action
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience the clean, intuitive interface that makes exploring the Pokémon world a joy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {screenshots.map((screenshot, index) => (
            <div 
              key={screenshot.title}
              className="group relative overflow-hidden rounded-2xl shadow-large bg-card animate-scale-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="aspect-[3/4] overflow-hidden flex items-center justify-center bg-card">
                <img 
                  src={screenshot.src} 
                  alt={screenshot.alt}
                  className="w-full h-full object-contain transition-smooth group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth">
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {screenshot.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScreenshotsSection;