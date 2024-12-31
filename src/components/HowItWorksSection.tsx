export default function HowItWorksSection() {
    return (
      <section id="how-it-works" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <StepCard
            number={1}
            title="Write Your Prompt"
            description="Enter your prompt in our interactive editor."
          />
          <StepCard
            number={2}
            title="Get Instant Analysis"
            description="Our AI evaluates your prompt's effectiveness."
          />
          <StepCard
            number={3}
            title="Improve and Learn"
            description="Apply suggestions and watch your skills grow."
          />
        </div>
      </section>
    )
  }
  
  function StepCard({ number, title, description }: { number: number; title: string; description: string }) {
    return (
      <div className="text-center">
        <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
          {number}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    )
  }