import { Zap, Code, Lightbulb } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-center text-3xl font-bold text-transparent">
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

        <BentoGrid className="mx-auto max-w-7xl md:auto-rows-[28rem]">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={cn(
                "group/bento text-2xl transition-all duration-300 hover:shadow-2xl",
                "bg-second",
                "border-second/30 border backdrop-blur-2xl backdrop-filter", // Increased blur from xl to 2xl
                "overflow-hidden rounded-2xl",
                "hover:border-second hover:shadow-second/30",
                "bg-opacity-30",
                item.className,
              )}
            />
          ))}
        </BentoGrid>
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
