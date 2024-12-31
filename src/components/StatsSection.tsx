const stats = [
    {
      number: "50K+",
      label: "Learners",
      description: "Mastering prompt engineering"
    },
    {
      number: "1M+",
      label: "Prompts Created",
      description: "Through hands-on practice"
    },
    {
      number: "95%",
      label: "Success Rate",
      description: "In skill improvement"
    },
    {
      number: "200+",
      label: "Exercises",
      description: "Real-world scenarios"
    }
  ];
  
  
  const StatsSection = () => {
    return (
      <section className="py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-indigo-500 mb-2">
                {stat.number}
              </div>
              <div className="text-xl font-semibold mb-1">{stat.label}</div>
              <p className="text-gray-400 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default StatsSection;
  