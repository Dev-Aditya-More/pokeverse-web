import PageLayout from "@/components/PageLayout";

const TermsOfService = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-6 py-16 max-w-3xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Terms of Service</h1>
          <p className="text-muted-foreground text-sm">Last updated: June 25, 2026</p>
        </div>

        <div className="space-y-8 text-foreground">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By downloading, installing, or using the Dexverse application ("App"), you agree to
              be bound by these Terms of Service ("Terms"). If you do not agree to these Terms,
              please do not use the App.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              Dexverse is a free Pokédex application that allows users to browse, search, and learn
              about Pokémon using data provided by PokéAPI (pokeapi.co). The App is provided "as
              is" for personal, non-commercial use.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Pokémon, Pokédex, and all related names, characters, and imagery are trademarks of{" "}
              <span className="font-medium text-foreground">
                Nintendo, Game Freak, and The Pokémon Company
              </span>
              . Dexverse is an independent fan-made application and is not affiliated with,
              endorsed by, or sponsored by Nintendo or The Pokémon Company.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The Dexverse application code, design, and branding are the intellectual property of
              Aditya More. You may not reproduce, distribute, or create derivative works of the App
              without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Permitted Use</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              You may use Dexverse solely for personal, non-commercial purposes. You agree not to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Reverse engineer, decompile, or disassemble any part of the App</li>
              <li>Use the App for any unlawful purpose</li>
              <li>
                Redistribute, resell, or sublicense access to the App or its content
              </li>
              <li>
                Attempt to gain unauthorized access to any systems or networks related to the App
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Third-Party Data</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pokémon data displayed in Dexverse is sourced from PokéAPI, a free and open Pokémon
              data API. We are not responsible for the accuracy, completeness, or availability of
              data provided by PokéAPI or any other third-party source.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              Dexverse is provided "as is" and "as available" without warranties of any kind,
              express or implied. We do not warrant that the App will be error-free, uninterrupted,
              or free of viruses or other harmful components. Your use of the App is at your sole
              risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the maximum extent permitted by applicable law, Aditya More shall not be liable
              for any indirect, incidental, special, consequential, or punitive damages arising from
              your use of or inability to use the App, even if advised of the possibility of such
              damages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Modifications to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to update these Terms at any time. Changes will be posted on
              this page with a revised "Last updated" date. Continued use of the App after any
              changes constitutes your acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms are governed by and construed in accordance with the laws of India.
              Any disputes arising under these Terms shall be subject to the exclusive jurisdiction
              of the courts of India.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms, please contact us:
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

export default TermsOfService;
