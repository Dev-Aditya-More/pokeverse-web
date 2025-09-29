import { Button } from "@/components/ui/button";
import { Download, Bell } from "lucide-react";

const DownloadSection = () => {
  return (
    <section className="py-24 bg-gradient-feature">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Get Pokeverse today
          </h2>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Ready to enhance your Pokémon journey? Download Pokeverse and start
            exploring the world of Pokémon like never before.
          </p>

          <div className="bg-card rounded-2xl shadow-large p-8 md:p-12 mb-12">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-accent-light rounded-full text-accent text-sm font-medium mb-6">
                <Bell className="w-4 h-4 mr-2" />
                Coming Soon
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Be the first to know
              </h3>
              <p className="text-muted-foreground mb-8">
                Pokeverse is launching soon on the Google Play. Sign up to get
                notified when it's available — or try it early via APK download.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                variant="hero"
                size="xl"
                className="min-w-[200px]"
              >
                <a href="mailto:aditya1875more@gmail.com?subject=Notify%20Me%20-%20Pokeverse&body=I%20want%20to%20be%20notified%20when%20Pokeverse%20launches.">
                  <Download className="mr-2 h-5 w-5" />
                  Notify Me
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="xl"
                className="min-w-[200px]"
              >
                <a href="#features">View Features</a>
              </Button>
            </div>

            <div className="mt-8 text-sm text-muted-foreground">
              <p>Free download • No ads • Regular updates</p>
            </div>
          </div>

          {/* Download Options */}
          <div className="space-y-6">
            {/* Google Play placeholder */}
            <div className="opacity-50">
              <p className="text-sm text-muted-foreground mb-4">
                Available soon on
              </p>
              <div className="flex justify-center space-x-4">
                <div className="w-40 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">
                    Google Play
                  </span>
                </div>
              </div>
            </div>

            {/* Direct APK Download */}
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Or download the APK now
              </p>
              <Button
                asChild
                size="xl"
                className="min-w-[220px] bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <a
                  href="https://github.com/Dev-Aditya-More/PokeVerse/releases"
                  download
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download APK
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
