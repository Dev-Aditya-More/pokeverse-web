import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Heart, Database, Smartphone, Filter } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Database,
    number: "01",
    title: "Complete Pokédex",
    description:
      "Every generation, every stat, every evolution chain. The most complete Pokémon data — always at your fingertips.",
  },
  {
    icon: Search,
    number: "02",
    title: "Smart Search",
    description:
      "Find any Pokémon instantly by name, type, generation, or ability. Results so fast it almost feels like cheating.",
  },
  {
    icon: Filter,
    number: "03",
    title: "Advanced Filters",
    description:
      "Slice through 1000+ Pokémon with precision — narrow by stats, rarity, type combo, or custom tags.",
  },
  {
    icon: Heart,
    number: "04",
    title: "Personal Favorites",
    description:
      "Curate your own squad. Save the ones you love and access your collection anytime, anywhere.",
  },
  {
    icon: Smartphone,
    number: "05",
    title: "Beautiful Interface",
    description:
      "Pixel-perfect design built for every screen. Feels native. Looks stunning. Works flawlessly.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-28 bg-gradient-to-b from-background via-background/95 to-background">
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 border border-accent/30 rounded-full text-xs font-semibold tracking-widest text-accent uppercase mb-6">
            ✦ Built for Trainers
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6">
            Your ultimate Pokémon arsenal
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Dexverse blends powerful tools with stunning design — so your focus stays on the Pokémon, not the app.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              variants={cardVariants}
              className="h-full"
            >
              <Card className="group relative bg-card/60 backdrop-blur-lg border border-border/40 shadow-lg rounded-2xl p-6
                               transition-all duration-300 hover:shadow-2xl hover:border-accent/60 hover:-translate-y-2
                               hover:shadow-accent/10 h-full overflow-hidden">
                <CardHeader className="flex flex-col items-center pb-2">
                  {/* Card number */}
                  <span className="text-xs font-bold tracking-widest text-accent/50 mb-3 self-start font-mono">
                    {feature.number}
                  </span>

                  {/* Icon */}
                  <div
                    className="w-16 h-16 mb-5 rounded-2xl flex items-center justify-center
                                bg-gradient-to-tr from-accent to-accent/60 shadow-md
                                group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-accent/30
                                transition-all duration-300 ease-out"
                  >
                    <feature.icon className="h-8 w-8 text-background" />
                  </div>

                  <CardTitle className="text-xl font-semibold text-foreground text-center">
                    {feature.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="text-center pt-2">
                  <CardDescription className="text-muted-foreground leading-relaxed text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-accent rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
