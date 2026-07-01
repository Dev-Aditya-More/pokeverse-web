import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Dexverse?",
    answer:
      "Dexverse is a free Pokédex app for Android that lets you search and explore all 1000+ Pokémon. You can look up Pokémon stats, base stats, evolution chains, move sets, abilities, and type matchups — all in one fast, beautifully designed app.",
  },
  {
    question: "How many Pokémon does Dexverse include?",
    answer:
      "Dexverse includes all 1000+ Pokémon across every generation — from Generation 1 (Kanto) through the latest Pokémon titles. This includes regional forms, Mega Evolutions, Gigantamax forms, and Paradox Pokémon.",
  },
  {
    question: "Is Dexverse free to download?",
    answer:
      "Yes — Dexverse is completely free to download on Google Play. There are no in-app purchases, no subscriptions, and no sign-up required. Just install and start exploring.",
  },
  {
    question: "Can I search Pokémon by type, ability, or generation?",
    answer:
      "Absolutely. Dexverse has smart search and advanced filters that let you find any Pokémon by name, type (Fire, Water, Psychic, Dragon, etc.), ability, generation, base stat range, or rarity. You can even combine multiple filters at once.",
  },
  {
    question: "Does Dexverse work offline?",
    answer:
      "Yes. Once the app is installed you can browse Pokémon data without an internet connection. The full Pokédex is available offline, making it perfect for when you're on the go or playing handheld.",
  },
  {
    question: "Can I save my favorite Pokémon?",
    answer:
      "Yes. Dexverse lets you build your own personal collection by saving any Pokémon to your favorites list. Your collection is saved locally on your device and available anytime.",
  },
  {
    question: "Which Pokémon generations are in Dexverse?",
    answer:
      "All of them. Dexverse covers every mainline Pokémon generation: Kanto (Gen 1), Johto (Gen 2), Hoenn (Gen 3), Sinnoh (Gen 4), Unova (Gen 5), Kalos (Gen 6), Alola (Gen 7), Galar (Gen 8), and Paldea (Gen 9) — plus all regional variants and special forms.",
  },
  {
    question: "Is Dexverse available on iPhone or iOS?",
    answer:
      "Currently Dexverse is available for Android only on Google Play. An iOS version is planned for a future release.",
  },
];

const FaqSection = () => {
  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 border border-accent/30 rounded-full text-xs font-semibold tracking-widest text-accent uppercase mb-6">
              ✦ FAQ
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
              Frequently asked questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about Dexverse.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border/50 rounded-xl px-6 bg-card/40 backdrop-blur-sm"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
