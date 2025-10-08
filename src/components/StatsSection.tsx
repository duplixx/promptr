"use client";

import { motion } from "framer-motion";
import { NumberTicker } from "@/components/ui/number-ticker";
import { TrendingUp, Users, Zap, Target } from "lucide-react";

const stats = [
  {
    value: 50000,
    suffix: "+",
    label: "Active Learners",
    description: "Mastering AI prompting daily",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
  },
  {
    value: 1000000,
    suffix: "+",
    label: "Prompts Analyzed",
    description: "With real-time AI feedback",
    icon: Zap,
    color: "from-purple-500 to-pink-500",
  },
  {
    value: 95,
    suffix: "%",
    label: "Success Rate",
    description: "In skill improvement",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
  },
  {
    value: 200,
    suffix: "+",
    label: "Challenges",
    description: "Real-world scenarios",
    icon: Target,
    color: "from-orange-500 to-red-500",
  },
];

const StatsSection = () => {
  return (
    <section className="relative overflow-hidden py-20 px-8">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-4xl font-bold text-transparent">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-gray-400">
            Join the growing community mastering prompt engineering
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-black p-8 backdrop-blur-sm transition-all duration-300 hover:border-gray-700 hover:shadow-2xl">
                  {/* Icon */}
                  <div className={`mb-4 inline-flex rounded-lg bg-gradient-to-br ${stat.color} p-3`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Number */}
                  <div className="mb-2 flex items-baseline">
                    <span className={`bg-gradient-to-br ${stat.color} bg-clip-text text-5xl font-bold text-transparent`}>
                      <NumberTicker value={stat.value} delay={index * 0.2} />
                      {stat.suffix}
                    </span>
                  </div>

                  {/* Label */}
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400">{stat.description}</p>

                  {/* Hover Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
