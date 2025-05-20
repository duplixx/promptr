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
        <h2 className="bg-gradient-to-r from-[#FFA9AE] via-second to-[#69E1FE] text-6xl font-bold mb-4 text-center text-transparent bg-clip-text">
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
              plan.popular ? "ring-second ring-2" : ""
            }`}
          >
            {plan.popular && (
              <span className="bg-second rounded-full px-3 py-1 text-sm font-medium text-white">
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
            <button className="w-full rounded-lg bg-second px-4 py-2 text-black transition duration-300 hover:scale-105">
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
