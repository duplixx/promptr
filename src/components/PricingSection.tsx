const plans = [
    {
      name: "Explorer",
      price: "$0",
      features: [
        "Basic prompt templates",
        "Community challenges",
        "Limited practice exercises",
        "Access to learning resources",
      ],
      cta: "Start Learning",
      popular: false
    },
    {
      name: "Professional",
      price: "$19",
      features: [
        "Advanced prompt techniques",
        "Personalized feedback",
        "Unlimited exercises",
        "Real-world scenarios",
        "Progress tracking"
      ],
      cta: "Level Up Now",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Custom learning paths",
        "Team analytics",
        "Private workshops",
        "Custom use cases",
        "API access",
        "Dedicated mentor"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];
  
  
  const PricingSection = () => {
    return (
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-400">Choose the plan that's right for you</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-gray-800 rounded-lg p-8 ${
                plan.popular ? 'ring-2 ring-indigo-500' : ''
              }`}
            >
              {plan.popular && (
                <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold mt-4">{plan.name}</h3>
              <p className="text-4xl font-bold mt-4 mb-6">{plan.price}</p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition duration-200">
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default PricingSection;
  