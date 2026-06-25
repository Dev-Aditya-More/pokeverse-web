import PageLayout from "@/components/PageLayout";

const PrivacyPolicy = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-6 py-16 max-w-3xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-muted-foreground text-sm">Last updated: June 25, 2026</p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              Dexverse ("we", "our", or "us") is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, and safeguard information when you use the
              Dexverse Pokédex application ("App"). By using Dexverse, you agree to the practices
              described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Dexverse is designed to respect your privacy. We collect minimal data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">Usage Data:</span> Anonymous,
                aggregated analytics such as app crashes, feature usage frequency, and device
                type — used solely to improve app stability and experience.
              </li>
              <li>
                <span className="font-medium text-foreground">Favorites & Preferences:</span>{" "}
                Data you save locally on your device (e.g., favorited Pokémon, display settings).
                This data never leaves your device.
              </li>
              <li>
                <span className="font-medium text-foreground">No Account Required:</span> Dexverse
                does not require you to create an account and does not collect personally
                identifiable information (PII) such as your name, email, or phone number.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              Dexverse uses the{" "}
              <span className="font-medium text-foreground">PokéAPI (pokeapi.co)</span> to fetch
              Pokémon data. All requests to PokéAPI are made on your behalf and are governed by
              PokéAPI's own privacy practices. We do not share any personal data with PokéAPI, as
              no personal data is collected by Dexverse in the first place.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Data Storage & Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              Any preferences or favorites you save are stored locally on your device using standard
              platform storage mechanisms. We do not transmit this data to external servers. We
              implement reasonable technical measures to protect any analytics data we do collect
              from unauthorized access or disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Dexverse does not knowingly collect personal information from children under the age
              of 13. The App does not require registration and does not collect PII, making it safe
              for users of all ages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be reflected on
              this page with an updated "Last updated" date. Continued use of the App after changes
              constitutes your acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions or concerns about this Privacy Policy, please reach out:
            </p>
            <div className="mt-3 p-4 rounded-lg bg-muted text-sm space-y-1">
              <p>
                <span className="font-medium">Email:</span>{" "}
                <a
                  href="mailto:aditya1875more@gmail.com"
                  className="text-primary hover:underline"
                >
                  aditya1875more@gmail.com
                </a>
              </p>
              <p>
                <span className="font-medium">GitHub:</span>{" "}
                <a
                  href="https://github.com/Dev-Aditya-More"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  github.com/Dev-Aditya-More
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default PrivacyPolicy;
