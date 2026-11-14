import { motion } from "framer-motion";
import { Check, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";
import Pokeball from "@/components/immersive/Pokeball";

const perks = ["Free to use, forever", "No sign-up required", "Works in any browser"];

const DownloadSection = () => {
  return (
    <section id="download" className="relative scroll-mt-24 py-16 md:py-28">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-dex-red/25 via-card to-primary/25 px-5 py-12 text-center sm:rounded-[2.5rem] sm:px-6 sm:py-16 shadow-large md:px-16 md:py-20"
        >
          {/* Big decorative Pokéball rings */}
          <Pokeball outline className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 text-white/[0.06] animate-spin-slow" />
          <Pokeball outline className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 text-white/[0.05] animate-spin-slower" />

          <div className="relative">
            <Pokeball className="mx-auto mb-6 h-16 w-16 animate-pokeball-wobble sm:mb-8 sm:h-20 sm:w-20" />
            <span className="eyebrow mb-6">✦ Android app temporarily unavailable</span>
            <h2 className="mx-auto mb-6 max-w-2xl text-3xl font-extrabold sm:text-4xl md:text-6xl">
              The app is taking a short break
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-white/75 sm:mb-10 sm:text-lg">
              The Dexverse Android app is temporarily unavailable. Until it&apos;s back, you can enjoy
              the full Dexverse experience right here on the website.
            </p>

            <Link
              to="/who-is-that-pokemon"
              className="group inline-flex items-center gap-3 whitespace-nowrap rounded-2xl bg-white px-6 py-4 text-base font-bold sm:px-8 sm:text-lg text-background shadow-large transition-transform duration-300 hover:scale-105"
            >
              <Gamepad2 className="h-5 w-5" />
              Play in your browser
            </Link>

            <ul className="mt-10 flex flex-col justify-center gap-4 sm:flex-row sm:gap-8">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center justify-center gap-2 text-sm text-white/70">
                  <Check className="h-4 w-4 shrink-0 text-accent" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadSection;
