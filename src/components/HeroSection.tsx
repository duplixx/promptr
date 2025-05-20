"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import TypewriterPrompt from "@/components/ui/prompt-animation";
import Link from "next/link";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const promptVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.section
      className="flex min-h-screen items-center justify-center p-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-8xl flex w-full flex-col rounded-3xl p-10 lg:flex-row">
        <motion.div
          className="mb-8 flex-1 pr-8 text-left lg:mb-0"
          variants={itemVariants}
        >
          <motion.h1
            className="mb-4 bg-gradient-to-r from-[#FFA9AE] via-[#8D81FF] to-[#69E1FE] bg-clip-text text-6xl font-bold leading-tight text-transparent lg:text-8xl"
            variants={itemVariants}
          >
            Master the Art of Prompt Engineering
          </motion.h1>
          <motion.p className="mb-6 text-xl text-white" variants={itemVariants}>
            Learn, practice, and perfect your prompt engineering skills with our
            interactive platform. Get real-time feedback and improve your AI
            interactions.
          </motion.p>
          <motion.div className="flex items-center" variants={itemVariants}>
            <Link href="/dashboard">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="rounded-[40px] bg-[#8D81FF] px-8 py-8 text-lg font-semibold text-black transition-all duration-300 ease-in-out" variant={"ghost"}>
                  Start Learning Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div className="flex-1" variants={itemVariants}>
          <motion.div className="h-full rounded-xl border border-second/50 shadow-lg shadow-second/30 bg-black p-4 text-white">
            <motion.div
              className="mb-4 flex items-center"
              variants={promptVariants}
            >
              <div className="mr-2 h-3 w-3 rounded-full bg-second"></div>
              <span className="text-sm">Practice your prompts...</span>
            </motion.div>
            <div className="mb-4 space-y-2">
              <motion.div
                className="rounded-full bg-gray-800 px-4 py-2 text-sm"
                variants={promptVariants}
                whileHover={{ x: 10, transition: { duration: 0.2 } }}
              >
                Generate a creative story about a time-traveling chef
              </motion.div>
              <motion.div
                className="rounded-full bg-gray-800 px-4 py-2 text-sm"
                variants={promptVariants}
                whileHover={{ x: 10, transition: { duration: 0.2 } }}
              >
                Explain quantum computing to a 10-year-old
              </motion.div>
            </div>
            <div className="mt-72">
              <TypewriterPrompt />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
