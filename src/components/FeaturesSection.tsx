import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Heart, Database, Smartphone, Filter } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Database,
    title: "Complete Pokédex",
    description:
      "Explore every generation with detailed stats, types, evolutions, and hidden abilities at your fingertips."
  },
  {
    icon: Search,
    title: "Smart Search",
    description:
      "Instantly locate any Pokémon by name, type, generation, or ability with blazing-fast search."
  },
  {
    icon: Filter,
    title: "Advanced Filters",
    description:
      "Slice through the Pokédex with precision filters—narrow down by stats, rarity, or even custom tags."
  },
  {
    icon: Heart,
    title: "Personal Favorites",
    description:
      "Curate your own Pokémon collection and access your favorites instantly anytime."
  },
  {
    icon: Smartphone,
    title: "Clean Interface",
    description:
      "An elegant, intuitive design tailored for both casual fans and seasoned trainers."
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" }
  })
};

const FeaturesSection = () => {
  return (
    <section id = "features" className="relative py-28 bg-gradient-to-b from-background via-background/95 to-background">
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6">
            Everything you need
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Pokeverse blends powerful tools with elegant design to deliver the ultimate Pokémon companion.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
            >
              <Card className="group relative bg-card/60 backdrop-blur-lg border border-border/40 shadow-lg rounded-2xl p-6 
                               transition-all duration-300 hover:shadow-2xl hover:border-accent/60 hover:-translate-y-2">
                <CardHeader className="flex flex-col items-center">
                  {/* Icon wrapper */}
                  <div className="w-16 h-16 mb-5 rounded-2xl flex items-center justify-center 
                                  bg-gradient-to-tr from-accent to-accent/60 shadow-md 
                                  group-hover:scale-110 group-hover:shadow-accent/50 
                                  transition-transform duration-300 ease-out">
                    <feature.icon className="h-8 w-8 text-accent-foreground" />
                  </div>

                  {/* Title */}
                  <CardTitle className="text-xl font-semibold text-foreground text-center">
                    {feature.title}
                  </CardTitle>
                </CardHeader>

                {/* Description */}
                <CardContent className="text-center">
                  <CardDescription className="text-muted-foreground leading-relaxed text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;