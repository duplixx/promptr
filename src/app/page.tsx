import { Header } from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import GradientBackground from "@/components/ui/gradient-background";

export default function LandingPage() {
  return (
    <div className="min-h-screen text-gray-100">
      <Header />
      <main>
        <div className="py-12">
          <GradientBackground>
            <MaxWidthWrapper>
              <HeroSection />
            </MaxWidthWrapper>
          </GradientBackground>
        </div>
        <div className="py-12">
          <MaxWidthWrapper>
            <FeaturesSection />
          </MaxWidthWrapper>
        </div>
        <div className="py-12">
          <HowItWorksSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
