const testimonials = [
  {
    name: "Sarah Chen",
    role: "AI Product Manager",
    content:
      "Promptr's hands-on approach helped me master prompt engineering in weeks. The interactive exercises and real-world scenarios are brilliant.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
  },
  {
    name: "James Wilson",
    role: "ML Engineer",
    content:
      "The structured learning path and immediate feedback on prompt crafting have dramatically improved my ability to work with AI models.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
  },
  {
    name: "Maria Garcia",
    role: "NLP Researcher",
    content:
      "From basic completions to complex chain-of-thought prompting, Promptr's practical exercises made learning engaging and effective.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16">
      <div className="mb-12 text-center">
        <h2 className="mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-4xl font-bold text-transparent">
          Loved by Users
        </h2>
        <p className="text-xl text-gray-400">
          See what our users have to say about their experience
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="rounded-lg bg-gray-800 p-6 shadow-lg">
            <div className="mb-4 flex items-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="mr-4 h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-gray-300">{testimonial.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
