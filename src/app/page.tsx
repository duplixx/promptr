import { Header } from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import GradientBackground from "@/components/ui/gradient-background";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import StatsSection from "@/components/StatsSection";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col text-gray-100">
      <Header />
      <main className="flex-1">
        {/* Hero Section with Gradient Background */}
        <div className="relative">
          <GradientBackground>
              <HeroSection />
          </GradientBackground>
        </div>

        {/* Stats Section */}
        <StatsSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Testimonials - Coming Soon */}
        {/* <TestimonialsSection /> */}

        {/* Pricing - Coming Soon */}
        {/* <PricingSection /> */}

        {/* CTA Section - Coming Soon */}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
