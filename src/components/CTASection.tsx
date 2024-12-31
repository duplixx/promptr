const CTASection = () => {
    return (
      <section className="relative">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Master the Art of Prompt Engineering
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of learners and start crafting powerful, effective prompts through hands-on practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition duration-200">
              Start Learning Free
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-indigo-600 px-8 py-3 rounded-lg font-semibold transition duration-200">
              View Curriculum
            </button>
          </div>
        </div>
      </section>
    );
  }
  
  
  export default CTASection;
  