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
    popular: false,
  },
  {
    name: "Professional",
    price: "$19",
    features: [
      "Advanced prompt techniques",
      "Personalized feedback",
      "Unlimited exercises",
      "Real-world scenarios",
      "Progress tracking",
    ],
    cta: "Level Up Now",
    popular: true,
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
      "Dedicated mentor",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section className="py-16">
      <div className="mb-12 text-center">
        <h2 className="mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-4xl font-bold text-transparent">
          Simple, Transparent Pricing
        </h2>
        <p className="text-xl text-gray-400">
          Choose the plan that's right for you
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-lg bg-gray-800 p-8 ${
              plan.popular ? "ring-2 ring-indigo-500" : ""
            }`}
          >
            {plan.popular && (
              <span className="rounded-full bg-indigo-500 px-3 py-1 text-sm font-medium text-white">
                Most Popular
              </span>
            )}
            <h3 className="mt-4 text-2xl font-bold">{plan.name}</h3>
            <p className="mb-6 mt-4 text-4xl font-bold">{plan.price}</p>
            <ul className="mb-8 space-y-4">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white transition duration-200 hover:bg-indigo-700">
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
