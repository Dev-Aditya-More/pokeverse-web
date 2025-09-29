import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Heart, Database, Smartphone, Filter } from "lucide-react";

const features = [
  {
    icon: Database,
    title: "Complete Pokédex",
    description: "Access detailed information about all Pokémon across every generation with comprehensive stats, types, and evolution chains."
  },
  {
    icon: Search,
    title: "Smart Search",
    description: "Find any Pokémon instantly with our powerful search functionality. Search by name, type, generation, or abilities."
  },
  {
    icon: Filter,
    title: "Advanced Filters",
    description: "Filter Pokémon by type, generation, stats, and more to find exactly what you're looking for with precision."
  },
  {
    icon: Heart,
    title: "Personal Favorites",
    description: "Save your favorite Pokémon to your personal collection and access them quickly whenever you need."
  },
  {
    icon: Smartphone,
    title: "Clean Interface",
    description: "Enjoy a beautiful, intuitive interface designed for both casual fans and serious trainers with seamless navigation."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gradient-feature">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Everything you need
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Pokeverse combines powerful features with elegant design to create the perfect Pokémon companion experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="group hover:shadow-medium transition-smooth bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-bounce">
                  <feature.icon className="h-8 w-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;