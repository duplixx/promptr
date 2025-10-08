"use client";

import { motion } from "framer-motion";
import { 
  Sparkles, 
  MessageSquare, 
  Target, 
  TrendingUp, 
  Zap,
  Brain,
  CheckCircle2,
  Code2
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Feedback",
    description: "Get instant, intelligent feedback on your prompts from Google Gemini",
    gradient: "from-yellow-500 via-orange-500 to-red-500",
    className: "md:col-span-2",
  },
  {
    icon: MessageSquare,
    title: "Real-Time Streaming",
    description: "Watch AI responses appear word-by-word with live streaming",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    className: "md:col-span-1",
  },
  {
    icon: Target,
    title: "Challenge Mode",
    description: "Test your skills with 5 curated problems from Easy to Hard",
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    className: "md:col-span-1",
  },
  {
    icon: Brain,
    title: "Smart Learning",
    description: "Personalized learning path based on your skill level and goals",
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    className: "md:col-span-2",
  },
  {
    icon: Code2,
    title: "Detailed Analysis",
    description: "Comprehensive scoring and suggestions for every test case",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    className: "md:col-span-2",
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description: "Visual metrics and completion badges to monitor growth",
    gradient: "from-orange-500 via-red-500 to-pink-500",
    className: "md:col-span-1",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-black" />
      
      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center"
        >
          <h2 className="mb-4 bg-gradient-to-r from-[#FFA9AE] via-[#8D81FF] to-[#69E1FE] bg-clip-text text-5xl font-bold text-transparent">
            Everything You Need
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-400">
            A complete platform for mastering prompt engineering with AI-powered tools
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-4 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "group relative overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-black p-8 backdrop-blur-sm transition-all duration-300 hover:border-gray-700 hover:shadow-2xl",
                  feature.className
                )}
              >
                {/* Gradient Orb */}
                <div className={cn(
                  "absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br opacity-20 blur-3xl transition-opacity duration-300 group-hover:opacity-30",
                  feature.gradient
                )} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={cn(
                    "mb-6 inline-flex rounded-2xl bg-gradient-to-br p-4",
                    feature.gradient
                  )}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-2xl font-bold text-white">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400">
                    {feature.description}
                  </p>

                  {/* Checkmark */}
                  <CheckCircle2 className="mt-4 h-5 w-5 text-green-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className={cn(
                    "absolute inset-0 rounded-3xl bg-gradient-to-br opacity-10",
                    feature.gradient
                  )} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400">
            And many more features coming soon...
          </p>
        </motion.div>
      </div>
    </section>
  );
}
