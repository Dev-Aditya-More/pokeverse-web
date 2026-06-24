import { Card, CardContent } from "@/components/ui/card";
import { Zap, Shield, Sparkles } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedStat({
  value,
  suffix,
  label,
  delay = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const isDecimal = !Number.isInteger(value);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 55;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const current = value * progress;
      if (step >= steps) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value, isDecimal]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
        {count}
        {suffix}
      </div>
      <div className="text-xs text-white/50 font-semibold tracking-widest uppercase mt-2">
        {label}
      </div>
    </motion.div>
  );
}

const benefits = [
  {
    icon: Zap,
    title: "Smooth and Fast",
    description:
      "Instant results, butter-smooth navigation — because great trainers can't afford to wait.",
  },
  {
    icon: Shield,
    title: "Reliable & Accurate",
    description:
      "Carefully curated data, always up to date. Trust every stat, every move, every time.",
  },
  {
    icon: Sparkles,
    title: "Delightful to Use",
    description:
      "An interface so intuitive it disappears — leaving just you, the data, and your Pokémon.",
  },
];

const WhyPokeverse = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Rich layered background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(222,58%,14%)] via-[hsl(222,50%,11%)] to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-accent opacity-25" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-accent opacity-15" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[420px] rounded-full bg-primary/8 blur-3xl pointer-events-none animate-glow-pulse" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-semibold tracking-widest text-white/75 uppercase mb-6">
              ✦ Why Trainers Love It
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Why choose Dexverse?
            </h2>
            <p className="text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
              We've reimagined what a Pokémon companion should be — simple, powerful, and impossible to put down.
            </p>
          </div>

          {/* Benefit cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
                className="h-full"
              >
                <Card className="bg-white/[0.07] backdrop-blur-sm border-white/15 text-center h-full hover:bg-white/[0.11] hover:border-white/25 transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-accent/30 to-accent/10 rounded-xl flex items-center justify-center mb-6 border border-accent/20 group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-white">
                      {benefit.title}
                    </h3>
                    <p className="text-white/65 leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Animated stats */}
          <div className="bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-2xl px-8 py-10">
            <p className="text-center text-xs text-white/40 uppercase tracking-widest font-semibold mb-8">
              Trusted by trainers worldwide
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-0">
              <div className="flex-1">
                <AnimatedStat value={8} suffix="k+" label="Downloads" delay={0} />
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/15" />
              <div className="flex-1">
                <AnimatedStat value={4.8} suffix="/5" label="Rating" delay={0.2} />
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/15" />
              <div className="flex-1">
                <AnimatedStat value={1000} suffix="+" label="Pokémon" delay={0.4} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPokeverse;
