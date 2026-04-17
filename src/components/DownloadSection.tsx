import { Button } from "@/components/ui/button";
import { Download, Bell, Store } from "lucide-react";

const DownloadSection = () => {
  return (
    <section id="download" className="py-24 bg-gradient-feature">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Get Dexverse today
          </h2>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Explore Pokémon data, stats, and regions with a fast, beautifully
            crafted experience — built for fans who care about details.
          </p>

          {/* Main Card */}
          <div className="bg-card rounded-2xl shadow-large p-8 md:p-12 mb-14">
            {/* Available Now - Google Play */}
            <div className="mb-10">
              <div className="inline-flex items-center px-4 py-2 bg-accent-light rounded-full text-accent text-sm font-medium mb-6">
                <Store className="w-4 h-4 mr-2" />
                Available now
              </div>

              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Download from Google Play
              </h3>

              <p className="text-muted-foreground mb-8">
                Dexverse is now live on Google Play. Download it and start
                building your teams today.
              </p>

              <Button
                asChild
                size="xl"
                className="min-w-[240px] bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <a
                  href="https://play.google.com/store/apps/details?id=com.aditya1875.pokeverse.play"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Get it on Google Play
                </a>
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Free download • No ads • Regular updates
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
