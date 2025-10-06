const CTASection = () => {
  return (
    <section className="relative">
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center md:p-16">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Master the Art of Prompt Engineering
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-xl">
          Join our community of learners and start crafting powerful, effective
          prompts through hands-on practice.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button className="rounded-lg bg-white px-8 py-3 font-semibold text-indigo-600 transition duration-200 hover:bg-gray-100">
            Start Learning Free
          </button>
          <button className="rounded-lg border-2 border-white bg-transparent px-8 py-3 font-semibold transition duration-200 hover:bg-white hover:text-indigo-600">
            View Curriculum
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
