"use client";

import { motion } from "framer-motion";
import { Edit3, Sparkles, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: Edit3,
    title: "Write Your Prompt",
    description: "Start by writing your prompt in our intuitive editor. Use our template suggestions or create your own from scratch.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Get AI Feedback",
    description: "Receive instant, intelligent analysis from Google Gemini. Get detailed scoring and actionable suggestions.",
    color: "from-purple-500 to-pink-500",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Improve & Master",
    description: "Apply the feedback, track your progress, and watch your prompt engineering skills grow exponentially.",
    color: "from-green-500 to-emerald-500",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative overflow-hidden py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center"
        >
          <h2 className="mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-5xl font-bold text-transparent">
            How It Works
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-400">
            Three simple steps to becoming a prompt engineering expert
          </p>
        </motion.div>

        {/* Steps */}
        <div className="mx-auto max-w-6xl space-y-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className={`grid gap-12 md:grid-cols-2 items-center ${isEven ? "" : "md:grid-flow-dense"}`}>
                  {/* Number & Icon */}
                  <div className={`${isEven ? "md:order-1" : "md:order-2"} flex justify-center`}>
                    <div className="relative">
                      {/* Large Number Background */}
                      <div className="absolute -left-4 -top-4 text-9xl font-bold text-gray-900/20">
                        {step.number}
                      </div>

                      {/* Icon Card */}
                      <div className="relative z-10">
                        <div className={`inline-flex rounded-3xl bg-gradient-to-br ${step.color} p-8 shadow-2xl`}>
                          <Icon className="h-20 w-20 text-white" />
                        </div>
                      </div>

                      {/* Glow Effect */}
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.color} opacity-20 blur-3xl`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={isEven ? "md:order-2" : "md:order-1"}>
                    <div className="space-y-4">
                      <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${step.color} px-4 py-1 text-sm font-semibold text-white`}>
                        Step {index + 1}
                      </div>

                      <h3 className="text-4xl font-bold text-white">
                        {step.title}
                      </h3>

                      <p className="text-lg leading-relaxed text-gray-400">
                        {step.description}
                      </p>

                      {index === steps.length - 1 && (
                        <Link href="/dashboard">
                          <Button className="mt-4 rounded-full bg-white text-black hover:bg-gray-200">
                            Get Started Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="mx-auto my-8 h-24 w-px bg-gradient-to-b from-gray-700 to-transparent md:hidden" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
