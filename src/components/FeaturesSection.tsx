import { Zap, Code, Lightbulb } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Platform Features
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <FeatureCard
            icon={<Zap className="mb-4 h-12 w-12 text-yellow-400" />}
            title="Real-time Feedback"
            description="Get instant analysis on your prompts' strength and areas for improvement."
          />
          <FeatureCard
            icon={<Code className="mb-4 h-12 w-12 text-green-400" />}
            title="Interactive Exercises"
            description="Practice with hands-on exercises designed to enhance your skills."
          />
          <FeatureCard
            icon={<Lightbulb className="mb-4 h-12 w-12 text-purple-400" />}
            title="AI-Powered Suggestions"
            description="Receive intelligent suggestions to optimize your prompts for better results."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg bg-gray-700 p-6">
      {icon}
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}
