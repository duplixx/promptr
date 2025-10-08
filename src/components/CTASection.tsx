"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Target } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShineBorder } from "@/components/ui/shine-border";

const CTASection = () => {
  return (
    <section className="relative overflow-hidden bg-black py-32">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl"
        >
          {/* Main CTA Card */}
          <ShineBorder
            color={["#FFA9AE", "#8D81FF", "#69E1FE"]}
            borderRadius={32}
            borderWidth={2}
            duration={10}
            className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-black"
          >
            <div className="relative p-12 text-center md:p-20">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-800/50 px-4 py-2 backdrop-blur-sm"
              >
                <Sparkles className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium text-gray-300">
                  Join 50,000+ learners today
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-4xl font-bold text-transparent md:text-6xl"
              >
                Ready to Master{" "}
                <span className="bg-gradient-to-r from-[#FFA9AE] via-[#8D81FF] to-[#69E1FE] bg-clip-text">
                  Prompt Engineering
                </span>
                ?
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mx-auto mb-8 max-w-2xl text-xl text-gray-400"
              >
                Start learning for free today. Get instant AI feedback, tackle
                real challenges, and join a community of engineers building the
                future.
              </motion.p>

              {/* Features Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3"
              >
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <Sparkles className="h-5 w-5 text-purple-400" />
                  <span>AI-Powered Feedback</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  <span>Real-Time Learning</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <Target className="h-5 w-5 text-green-400" />
                  <span>5 Challenge Levels</span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              >
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="group rounded-full bg-gradient-to-r from-[#FFA9AE] via-[#8D81FF] to-[#69E1FE] px-8 py-6 text-lg font-semibold text-white shadow-2xl transition-all hover:scale-105 hover:shadow-purple-500/50"
                  >
                    Start Learning Free
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>

                <Link href="/problems/1">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-2 border-gray-700 bg-transparent px-8 py-6 text-lg font-semibold text-white transition-all hover:border-gray-600 hover:bg-gray-800/50"
                  >
                    Try Challenges
                  </Button>
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-8 text-sm text-gray-500"
              >
                No credit card required • Free forever • 5-minute setup
              </motion.p>
            </div>
          </ShineBorder>

          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {[
              { label: "Active Learners", value: "50K+" },
              { label: "Prompts Analyzed", value: "1M+" },
              { label: "Success Rate", value: "95%" },
              { label: "Avg. Time to Master", value: "2 weeks" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-1 text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
