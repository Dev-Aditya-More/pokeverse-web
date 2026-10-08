import Pokeball from "@/components/immersive/Pokeball";

/** Shown for the split second while a page's code chunk loads. */
const RouteFallback = () => (
  <div className="flex min-h-screen items-center justify-center" role="status" aria-label="Loading">
    <Pokeball className="h-12 w-12 animate-pokeball-wobble opacity-80" />
  </div>
);

export default RouteFallback;
