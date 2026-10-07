import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import Pokeball from "@/components/immersive/Pokeball";

const NotFound = () => {
  const location = useLocation();

  return (
    <PageLayout>
      <Helmet>
        <title>Page not found | Dexverse</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center">
        <Pokeball className="mb-8 h-24 w-24 animate-pokeball-wobble" />
        <h1 className="mb-4 text-5xl font-extrabold">404</h1>
        <p className="mb-2 text-xl">A wild empty page appeared!</p>
        <p className="mb-8 text-muted-foreground">
          Nothing lives at <code className="font-mono text-accent">{location.pathname}</code> — it may have fled.
        </p>
        <Link
          to="/"
          className="rounded-2xl bg-gradient-hero px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
        >
          Run back home
        </Link>
      </div>
    </PageLayout>
  );
};

export default NotFound;
