import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GUIDES } from "@/data/guides";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const Guides = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>Pokémon Guides — Types, Evolution, Stats & More | Dexverse</title>
        <meta
          name="description"
          content="Free Pokémon guides covering type matchups, evolution methods, IVs and EVs, and every generation from Kanto to Paldea — written by the Dexverse team."
        />
        <link rel="canonical" href="https://dexverse.in/guides" />
      </Helmet>

      <div className="container mx-auto px-6 py-16 max-w-5xl">
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 border border-accent/30 rounded-full text-xs font-semibold tracking-widest text-accent uppercase mb-6">
            ✦ Free Pokémon Guides
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Learn the mechanics behind every battle
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Type matchups, evolution methods, stat mechanics, and the full generation timeline —
            explained clearly, with no prior knowledge assumed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {GUIDES.map((guide, index) => (
            <motion.div
              key={guide.slug}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              variants={cardVariants}
              className="h-full"
            >
              <Link to={`/guides/${guide.slug}`} className="block h-full">
                <Card className="group h-full bg-card/60 backdrop-blur-lg border border-border/40 shadow-lg rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:border-accent/60 hover:-translate-y-2">
                  <CardHeader className="pb-2">
                    <div className="w-12 h-12 mb-4 rounded-xl flex items-center justify-center bg-gradient-to-tr from-accent to-accent/60 shadow-md group-hover:scale-110 transition-all duration-300 ease-out">
                      <BookOpen className="h-6 w-6 text-background" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground">
                      {guide.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-muted-foreground leading-relaxed text-base mb-4">
                      {guide.description}
                    </CardDescription>
                    <p className="text-xs uppercase tracking-wide text-accent font-semibold">
                      {guide.readTime}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Guides;
