import { Github, Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import Pokeball from "@/components/immersive/Pokeball";
import { CONTACT_EMAIL, GITHUB_URL, PLAY_STORE_URL, TWITTER_URL } from "@/lib/links";

const COLUMNS = [
  {
    heading: "Play & learn",
    links: [
      { to: "/who-is-that-pokemon", label: "Who's That Pokémon?" },
      { to: "/pokemon-type-chart", label: "Pokémon Type Chart" },
      { to: "/guides", label: "Pokémon Guides" },
    ],
  },
  {
    heading: "Guides",
    links: [
      { to: "/guides/pokemon-type-chart-explained", label: "Type chart explained" },
      { to: "/guides/pokemon-evolution-explained", label: "Evolution methods" },
      { to: "/guides/ivs-vs-evs-explained", label: "IVs vs EVs" },
      { to: "/guides/pokemon-generations-guide", label: "Every generation" },
    ],
  },
  {
    heading: "Dexverse",
    links: [
      { to: "/contact", label: "Contact" },
      { to: "/privacy-policy", label: "Privacy Policy" },
      { to: "/terms-of-service", label: "Terms of Service" },
    ],
  },
];

const SOCIALS = [
  { href: GITHUB_URL, label: "GitHub", icon: Github },
  { href: TWITTER_URL, label: "X (Twitter)", icon: Twitter },
  { href: `mailto:${CONTACT_EMAIL}`, label: "Email", icon: Mail },
];

const Footer = () => {
  return (
    <footer className="relative mt-12 border-t border-white/10 bg-background/60 backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-accent opacity-40" />
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link to="/" className="mb-4 inline-flex items-center gap-2.5">
              <Pokeball className="h-8 w-8" />
              <span className="font-display text-xl font-bold">Dexverse</span>
            </Link>
            <p className="mb-6 max-w-sm leading-relaxed text-muted-foreground">
              Built with passion and ❤️ for the Pokémon community — a free Pokédex app for Android.
            </p>
            <div className="mb-6 flex gap-2">
              {SOCIALS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="glass inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:border-accent/40 hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                  <span className="sr-only">{label}</span>
                </a>
              ))}
            </div>
            <a
              href="https://www.producthunt.com/products/dexverse?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-dexverse"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1187111&theme=dark"
                alt="Dexverse - Explore legends like never before! | Product Hunt"
                width="250"
                height="54"
                loading="lazy"
              />
            </a>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Dexverse · Aditya More</p>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent hover:underline"
          >
            Download free on Google Play →
          </a>
        </div>
        <p className="mt-6 text-center text-xs text-white/35 md:text-left">
          Pokémon and related names are trademarks of Nintendo, Game Freak and The Pokémon Company.
          Dexverse is a fan project and is not affiliated with them. Data from PokéAPI.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
