import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2, Swords } from "lucide-react";
import { motion } from "framer-motion";

const tools = [
  {
    icon: Gamepad2,
    title: "Who's That Pokémon?",
    description:
      "Guess the silhouette and build your streak. Every one of the 1000+ Pokémon can show up — free, unlimited rounds.",
    href: "/who-is-that-pokemon",
    cta: "Play Now",
  },
  {
    icon: Swords,
    title: "Pokémon Type Chart",
    description:
      "Tap any type to instantly see what it's strong against, weak against, resists, and weak to.",
    href: "/pokemon-type-chart",
    cta: "View Chart",
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

const PokemonToolsSection = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-background via-background/95 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 border border-accent/30 rounded-full text-xs font-semibold tracking-widest text-accent uppercase mb-6">
            ✦ Free Pokémon Tools
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6">
            More ways to play
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            No app required — try these free browser tools built on the same Pokémon data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              variants={cardVariants}
              className="h-full"
            >
              <Card className="group h-full bg-card/60 backdrop-blur-lg border border-border/40 shadow-lg rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:border-accent/60 hover:-translate-y-2">
                <CardHeader className="flex flex-col items-center pb-2">
                  <div className="w-16 h-16 mb-5 rounded-2xl flex items-center justify-center bg-gradient-to-tr from-accent to-accent/60 shadow-md group-hover:scale-110 transition-all duration-300 ease-out">
                    <tool.icon className="h-8 w-8 text-background" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground text-center">
                    {tool.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-2 flex flex-col items-center gap-5">
                  <CardDescription className="text-muted-foreground leading-relaxed text-base">
                    {tool.description}
                  </CardDescription>
                  <Button asChild>
                    <Link to={tool.href}>{tool.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PokemonToolsSection;
