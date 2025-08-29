import ChosenBySection from "@/app/landing page compoenents/ChosenBySection";
import FaqSection from "@/app/landing page compoenents/FAQSection";
import Features2 from "@/app/landing page compoenents/Features2";
import FeaturesSection from "@/app/landing page compoenents/FeaturesSection";
import Footer from "@/app/landing page compoenents/Footer";
import HeroSection from "@/app/landing page compoenents/HeroSection";
import LandingNavbar from "@/app/landing page compoenents/Navbar";

import PricingSection from "@/app/landing page compoenents/PricingSection";

export default function Home() {
  return (
    <div className="w-full relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <LandingNavbar />
      <HeroSection />
      <ChosenBySection />
      <FeaturesSection />
      <Features2 />
      <PricingSection />
      <FaqSection />
      <Footer />
    </div>
  );
}
