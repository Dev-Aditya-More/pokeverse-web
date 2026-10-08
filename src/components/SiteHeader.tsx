import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import Pokeball from "@/components/immersive/Pokeball";
import { PLAY_STORE_URL } from "@/lib/links";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { to: "/#features", label: "Features" },
  { to: "/who-is-that-pokemon", label: "Play" },
  { to: "/pokemon-type-chart", label: "Type Chart" },
  { to: "/guides", label: "Guides" },
];

const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <nav
        aria-label="Main"
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl px-4 transition-all duration-500",
          scrolled || open ? "glass shadow-large" : "bg-transparent"
        )}
      >
        <Link to="/" className="group flex items-center gap-2.5" aria-label="Dexverse home">
          <Pokeball className="h-7 w-7 transition-transform duration-500 group-hover:rotate-[360deg]" />
          <span className="font-display text-lg font-bold tracking-tight">Dexverse</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-white/5",
                  isActive && !link.to.includes("#") && "text-foreground bg-white/10"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-gradient-hero px-4 py-2 text-sm font-semibold text-white shadow-medium transition-transform hover:scale-105 sm:inline-flex"
          >
            <Download className="h-4 w-4" />
            Get the app
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass mx-auto mt-2 max-w-6xl rounded-2xl p-3 shadow-large md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-base font-medium hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-hero px-4 py-3 font-semibold text-white"
          >
            <Download className="h-4 w-4" />
            Get the app for free
          </a>
        </motion.div>
      )}

      {/* Reading / scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 h-[2px] origin-left bg-gradient-accent"
      />
    </header>
  );
};

export default SiteHeader;
