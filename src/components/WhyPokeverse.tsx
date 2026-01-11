import { Card, CardContent } from "@/components/ui/card";
import { Zap, Shield, Users } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Instant search results and smooth navigation make finding information effortless."
  },
  {
    icon: Shield,
    title: "Reliable & Accurate",
    description: "All data is carefully curated and regularly updated to ensure accuracy and completeness."
  },
  {
    icon: Users,
    title: "User-Focused Design",
    description: "Built with trainers in mind, featuring an intuitive interface that gets out of your way."
  }
];

const WhyPokeverse = () => {
  return (
    <section className="py-24 bg-gradient-accent text-accent-foreground">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why choose Pokeverse?
            </h2>
            <p className="text-xl opacity-90 leading-relaxed">
              We've reimagined what a Pokémon companion app should be - simple, powerful, and delightful to use.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => (
              <Card 
                key={benefit.title}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-8">
                  <div className="mx-auto w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-2xl font-light mb-8 opacity-90">
              Be among the first trainers to experience the difference.
            </p>
            <div className="flex justify-center space-x-12 opacity-80">
              <div className="text-center">
                <div className="text-3xl font-bold text-white"> - </div>
                <div className="text-sm text-white/70">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white"> - </div>
                <div className="text-sm text-white/70">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white"> 1000+ </div>
                <div className="text-sm text-white/70">Pokémon</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPokeverse;
