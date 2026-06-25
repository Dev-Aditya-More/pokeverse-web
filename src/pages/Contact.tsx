import { Github, Mail, Twitter, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "aditya1875more@gmail.com",
    href: "mailto:aditya1875more@gmail.com",
    description: "Best for support questions or feedback",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/Dev-Aditya-More",
    href: "https://github.com/Dev-Aditya-More",
    description: "Report bugs or browse the source code",
  },
  {
    icon: Twitter,
    label: "X (Twitter)",
    value: "@Dexverse_App",
    href: "https://x.com/Dexverse_App",
    description: "Follow for updates and announcements",
  },
];

const faqs = [
  {
    q: "How do I report a bug?",
    a: "Open an issue on our GitHub repository with a clear description of the problem, steps to reproduce it, and your device/OS version.",
  },
  {
    q: "Can I request a new feature?",
    a: "Absolutely! Submit a feature request via GitHub Issues. We read every suggestion and prioritize based on community interest.",
  },
  {
    q: "Is Dexverse affiliated with Nintendo or The Pokémon Company?",
    a: "No. Dexverse is an independent fan-made app. Pokémon data is sourced from PokéAPI. All Pokémon trademarks belong to Nintendo, Game Freak, and The Pokémon Company.",
  },
  {
    q: "How can I support the project?",
    a: "Star the repository on GitHub, leave a review on the app store, or share Dexverse with fellow trainers. It means a lot!",
  },
];

const Contact = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-6 py-16 max-w-3xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">Contact</h1>
          <p className="text-muted-foreground leading-relaxed">
            Have a question, found a bug, or just want to say hi? We'd love to hear from you.
            Choose the channel that works best for you below.
          </p>
        </div>

        {/* Contact cards */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold mb-5">Get in Touch</h2>
          <div className="grid gap-4 sm:grid-cols-1">
            {contactLinks.map(({ icon: Icon, label, value, href, description }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors group"
              >
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground">{label}</p>
                  <p className="text-sm text-primary truncate">{value}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* GitHub issues CTA */}
        <section className="mb-14 rounded-xl border border-border bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <MessageCircle className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground">Found a bug or have a suggestion?</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              GitHub Issues is the fastest way to get a response and track progress.
            </p>
          </div>
          <Button asChild className="shrink-0">
            <a
              href="https://github.com/Dev-Aditya-More/PokeVerse/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open an Issue
            </a>
          </Button>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-semibold mb-5">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {faqs.map(({ q, a }) => (
              <div key={q} className="border-b border-border pb-5 last:border-0 last:pb-0">
                <p className="font-medium text-foreground mb-1.5">{q}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Contact;
