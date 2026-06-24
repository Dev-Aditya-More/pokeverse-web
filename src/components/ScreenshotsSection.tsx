import { motion } from "framer-motion";
import screenshot1 from "@/assets/1.png";
import screenshot2 from "@/assets/2.png";
import screenshot3 from "@/assets/3.png";
import screenshot4 from "@/assets/4.png";
import screenshot5 from "@/assets/5.png";
import screenshot6 from "@/assets/6.png";
import screenshot7 from "@/assets/7.png";
import screenshot8 from "@/assets/8.png";

const screenshots = [
  {
    src: screenshot1,
    alt: "Dexverse app main interface showing Pokémon grid with search and filter options",
    title: "Discover & Browse",
    tag: "Home",
  },
  {
    src: screenshot2,
    alt: "Dexverse Pokémon detail view with artwork, abilities, and type effectiveness",
    title: "In-Depth Details",
    tag: "Detail View",
  },
  {
    src: screenshot3,
    alt: "Dexverse detailed Pokémon team screen displaying stats, abilities, and moves",
    title: "Build Unlimited Teams",
    tag: "Team Builder",
  },
  {
    src: screenshot4,
    alt: "Team analysis screen with charts and type coverage",
    title: "Team Analysis",
    tag: "Analytics",
  },
  {
    src: screenshot8,
    alt: "Choose your comfort theme screen with light and dark mode options",
    title: "Choose Your Theme",
    tag: "Themes",
  },
  {
    src: screenshot5,
    alt: "Relax and Play Mini Games",
    title: "Mini Games",
    tag: "Play",
  },
  {
    src: screenshot7,
    alt: "Legendaries from every region",
    title: "Dexverse Legends",
    tag: "Legendaries",
  },
  {
    src: screenshot6,
    alt: "Customise with Particle Effects",
    title: "Particle Effects",
    tag: "Customise",
  },
];

const ScreenshotsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 border border-accent/30 rounded-full text-xs font-semibold tracking-widest text-accent uppercase mb-6">
            ✦ App Preview
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Built for beauty. Built for speed.
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Every screen crafted with care — so exploring the Pokémon world feels as good as it looks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {screenshots.map((screenshot, index) => (
            <motion.div
              key={screenshot.title}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-2xl shadow-large bg-card hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="aspect-[3/4] overflow-hidden flex items-center justify-center bg-card">
                <img
                  src={screenshot.src}
                  alt={screenshot.alt}
                  className="w-full h-full object-contain transition-all duration-500 group-hover:scale-105"
                />
              </div>

              {/* Always-visible caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent pt-14 pb-4 px-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold text-sm leading-tight">
                    {screenshot.title}
                  </h3>
                  <span className="text-[10px] font-semibold tracking-wide text-accent/80 bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full shrink-0 ml-2">
                    {screenshot.tag}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScreenshotsSection;
