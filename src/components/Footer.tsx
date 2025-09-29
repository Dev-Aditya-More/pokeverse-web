import { Github, Mail, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">Pokeverse</h3>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Built with passion and ❤️ for the Pokémon community. Bringing
              trainers closer to their favorite Pokémon with beautiful,
              intuitive design.
            </p>
          </div>

          <div className="flex justify-center space-x-6 mb-8">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:text-primary hover:bg-primary-foreground/10"
            >
              <a
                href="https://github.com/Dev-Aditya-More"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:text-primary hover:bg-primary-foreground/10"
            >
              <a
                href="https://twitter.com/Adityaastwt"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:text-primary hover:bg-primary-foreground/10"
            >
              <a href="mailto:aditya1875more@gmail.com">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </Button>
          </div>

          <div className="border-t border-primary-foreground/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-primary-foreground/60 text-sm">
                <p>© 2024 Pokeverse. Aditya More.</p>
              </div>
              <div className="flex space-x-6 text-sm">
                <a
                  href="#"
                  className="text-primary-foreground/60 hover:text-primary-foreground transition-smooth"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-primary-foreground/60 hover:text-primary-foreground transition-smooth"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-primary-foreground/60 hover:text-primary-foreground transition-smooth"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 text-xs text-primary-foreground/40">
            <p>
              Pokémon and related characters are trademarks of Nintendo, Game
              Freak, and Creatures Inc.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
