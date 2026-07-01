import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ScreenshotsSection from "@/components/ScreenshotsSection";
import WhyPokeverse from "@/components/WhyPokeverse";
import DownloadSection from "@/components/DownloadSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <ScreenshotsSection />
      <WhyPokeverse />
      <DownloadSection />
      <FaqSection />
      <Footer />
    </div>
  );
};

export default Index;
