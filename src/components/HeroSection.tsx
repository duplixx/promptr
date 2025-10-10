"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, CheckCircle2, TrendingUp } from "lucide-react";
import Link from "next/link";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { DotPattern } from "@/components/ui/dot-pattern";
import { ShineBorder } from "@/components/ui/shine-border";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const stats = [
    { value: "100K+", label: "Prompts Generated" },
    { value: "5K+", label: "Active Learners" },
    { value: "95%", label: "Success Rate" },
  ];

  const features = [
    "AI-Powered Feedback",
    "Real-time Streaming",
    "Progress Tracking",
    "Challenge Mode",
  ];

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black px-4 py-20 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        )}
      />

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div className="text-center" {...fadeIn}>
          {/* Badge */}
          <motion.div

            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 flex justify-center mt-8"
          >
            <AnimatedGradientText
              className="bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-clip-text text-transparent"
            >
              <span className="bg-gradient-to-r from-white to-black bg-clip-text text-transparent">
                Pre-YC W24 • Backed by Industry Leaders
              </span>
            </AnimatedGradientText>
          </motion.div>

          {/* Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent sm:text-6xl lg:text-7xl"
          >
            Master Prompt Engineering
            <br />
            <span className="bg-gradient-to-r from-[#FFA9AE] via-[#8D81FF] to-[#69E1FE] bg-clip-text text-transparent">
              10x Faster
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-10"
          >
            <AnimatedShinyText className="text-xl sm:text-2xl">
              Learn, practice, and perfect your AI prompting skills with
              real-time feedback from Google Gemini. Join thousands mastering the
              future of AI interaction.
            </AnimatedShinyText>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/dashboard">
              <Button
                size="lg"
                className="group relative h-14 overflow-hidden rounded-full bg-white px-8 text-lg font-semibold text-black hover:text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
              >
                <span className="relative z-10 flex items-center">
                  Start Learning Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </Link>
            <Link href="/problems/1">
              <Button
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-gray-700 bg-transparent px-8 text-lg font-semibold text-white hover:border-white hover:bg-white hover:text-black"
              >
                Try Challenge Mode
              </Button>
            </Link>
          </motion.div>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-16 flex flex-wrap items-center justify-center gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-2 text-sm text-gray-400"
              >
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                {feature}
              </motion.div>
            ))}
          </motion.div>

          {/* Demo Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="grid grid-cols-1 gap-6 lg:grid-cols-3"
          >
            {/* Dashboard Preview */}
            <ShineBorder
              className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black"
              color={["#8B5CF6", "#EC4899", "#EAB308"]}
              borderRadius={16}
            >
              <div className="space-y-3 p-6">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500" />
                  <div className="space-y-1">
                    <div className="h-3 w-20 rounded bg-gray-800" />
                    <div className="h-2 w-16 rounded bg-gray-800" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full rounded bg-gray-800" />
                  <div className="h-2 w-3/4 rounded bg-gray-800" />
                  <div className="h-2 w-5/6 rounded bg-gray-800" />
                </div>
                <div className="flex gap-2">
                  <div className="h-6 w-16 rounded-full bg-gray-800" />
                  <div className="h-6 w-20 rounded-full bg-gray-800" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-400">
                    Interactive Dashboard
                  </p>
                </div>
              </div>
            </ShineBorder>

            {/* Challenge Mode Preview */}
            <ShineBorder
              className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black"
              color={["#10B981", "#3B82F6", "#8B5CF6"]}
              borderRadius={16}
            >
              <div className="space-y-3 p-6">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <span className="text-sm font-semibold text-white">
                      Challenge #1
                    </span>
                  </div>
                  <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs text-green-400">
                    Easy
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full rounded bg-gray-800" />
                  <div className="h-2 w-4/5 rounded bg-gray-800" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-gray-800">
                    <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500" />
                  </div>
                  <span className="text-xs text-gray-400">75%</span>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-400">
                    AI-Powered Challenges
                  </p>
                </div>
              </div>
            </ShineBorder>

            {/* Stats Preview */}
            <ShineBorder
              className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black"
              color={["#F59E0B", "#EF4444", "#EC4899"]}
              borderRadius={16}
            >
              <div className="space-y-4 p-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                  <span className="text-sm font-semibold text-white">
                    Your Progress
                  </span>
                </div>
                <div className="space-y-3">
                  {stats.map((stat, i) => (
                    <div key={i} className="flex items-center justify-between gap-2">
                      <span className="text-xs text-gray-400">{stat.label}</span>
                      <span className="text-lg font-bold text-white">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-400">
                    Track Your Growth
                  </p>
                </div>
              </div>
            </ShineBorder>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-16 text-center"
          >
            <p className="mb-4 text-sm text-gray-500">
              Trusted by engineers from
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-40 grayscale">
              <span className="text-2xl font-bold text-white">Google</span>
              <span className="text-2xl font-bold text-white">Microsoft</span>
              <span className="text-2xl font-bold text-white">OpenAI</span>
              <span className="text-2xl font-bold text-white">Meta</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
