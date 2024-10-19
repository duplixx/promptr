import { Zap, Code, Lightbulb } from "lucide-react"

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Platform Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap className="w-12 h-12 mb-4 text-yellow-400" />}
            title="Real-time Feedback"
            description="Get instant analysis on your prompts' strength and areas for improvement."
          />
          <FeatureCard
            icon={<Code className="w-12 h-12 mb-4 text-green-400" />}
            title="Interactive Exercises"
            description="Practice with hands-on exercises designed to enhance your skills."
          />
          <FeatureCard
            icon={<Lightbulb className="w-12 h-12 mb-4 text-purple-400" />}
            title="AI-Powered Suggestions"
            description="Receive intelligent suggestions to optimize your prompts for better results."
          />
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, description }: { icon: JSX.Element; title: string; description: string }) {
  return (
    <div className="bg-gray-700 p-6 rounded-lg">
      {icon}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}