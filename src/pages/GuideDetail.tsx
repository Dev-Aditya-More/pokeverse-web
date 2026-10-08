import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import { getGuideBySlug } from "@/data/guides";

const GuideDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const guide = slug ? getGuideBySlug(slug) : undefined;

  if (!guide) {
    return <Navigate to="/guides" replace />;
  }

  const related = guide.relatedSlugs
    .map((s) => getGuideBySlug(s))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  const url = `https://dexverse.in/guides/${guide.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    author: { "@type": "Organization", name: "Dexverse" },
    publisher: { "@type": "Organization", name: "Dexverse", logo: { "@type": "ImageObject", url: "https://dexverse.in/favicon.ico" } },
    dateModified: guide.updated,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <PageLayout>
      <Helmet>
        <title>{guide.metaTitle}</title>
        <meta name="description" content={guide.description} />
        <link rel="canonical" href={url} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <article className="container mx-auto px-5 sm:px-6 py-10 sm:py-16 max-w-3xl">
        <Link
          to="/guides"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 inline-block"
        >
          ← All Guides
        </Link>

        <header className="mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">{guide.title}</h1>
          <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">{guide.description}</p>
          <p className="text-xs uppercase tracking-wide text-accent font-semibold mt-4">
            {guide.readTime} · Updated {guide.updated}
          </p>
        </header>

        <div className="prose-content space-y-6">
          {guide.blocks.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2 key={i} className="text-xl sm:text-2xl font-bold mt-10 mb-2">
                  {block.text}
                </h2>
              );
            }
            if (block.type === "table") {
              return (
                <div key={i} className="glass overflow-x-auto rounded-2xl">
                  <table className="w-full text-left text-[13px] sm:text-sm">
                    <caption className="sr-only">{block.caption}</caption>
                    <thead>
                      <tr className="border-b border-white/10">
                        {block.head.map((h) => (
                          <th key={h} scope="col" className="px-3 py-3 font-semibold text-foreground sm:px-4">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, r) => (
                        <tr key={r} className="border-b border-white/5 last:border-0">
                          {row.map((cell, c) => (
                            <td key={c} className={c === 0 ? "px-3 py-2.5 align-top font-semibold text-foreground sm:px-4" : "px-3 py-2.5 align-top text-muted-foreground sm:px-4"}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }
            if (block.type === "ul") {
              return (
                <ul key={i} className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="text-muted-foreground leading-relaxed">
                {block.text}
              </p>
            );
          })}
        </div>

        {related.length > 0 && (
          <div className="mt-16 pt-8 border-t border-border">
            <h2 className="text-xl font-bold mb-5">Related guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/guides/${r.slug}`}
                  className="block glass rounded-2xl p-5 hover:border-accent/60 hover:shadow-md transition-all"
                >
                  <p className="font-semibold mb-1">{r.title}</p>
                  <p className="text-sm text-muted-foreground">{r.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 glass rounded-2xl p-6 text-center">
          <p className="text-muted-foreground mb-4">
            Put what you just read to the test with Dexverse's free Pokémon tools.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/pokemon-type-chart"
              className="text-sm font-semibold text-accent hover:underline"
            >
              Pokémon Type Chart →
            </Link>
            <Link
              to="/who-is-that-pokemon"
              className="text-sm font-semibold text-accent hover:underline"
            >
              Who's That Pokémon? →
            </Link>
          </div>
        </div>
      </article>
    </PageLayout>
  );
};

export default GuideDetail;
