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
    <div className="flex flex-col max-h-screen text-gray-100 w-full">
      <Header />
      <main className="flex-1">
        <div className="py-2">
          <GradientBackground>
            <MaxWidthWrapper>
              <HeroSection />
            </MaxWidthWrapper>
          </GradientBackground>
        </div>
        
        {/* <div className="py-16 bg-gray-900">
          <MaxWidthWrapper>
            <StatsSection />
          </MaxWidthWrapper>
        </div> */}

        <div className="">
          <MaxWidthWrapper>
            <FeaturesSection />
          </MaxWidthWrapper>
        </div>

        {/* <div className="py-16 bg-gray-900">
          <MaxWidthWrapper>
            <HowItWorksSection />
          </MaxWidthWrapper>
        </div> */}
{/* 
        <div className="py-20">
          <MaxWidthWrapper>
            <TestimonialsSection />
          </MaxWidthWrapper>
        </div> */}
{/* 
        <div className="py-16 bg-black">
          <MaxWidthWrapper>
            <PricingSection />
          </MaxWidthWrapper>
        </div> */}
{/* 
        <div className="py-20">
          <MaxWidthWrapper>
            <CTASection />
          </MaxWidthWrapper>
        </div> */}
      </main>
      <Footer />
    </div>
  );
}
