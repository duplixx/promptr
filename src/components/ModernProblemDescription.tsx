"use client";

import { Problem } from "@/types/problem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import {
  BookOpen,
  Code2,
  CheckCircle2,
  Lightbulb,
  Target,
} from "lucide-react";

interface ModernProblemDescriptionProps {
  problem: Problem;
}

export function ModernProblemDescription({
  problem,
}: ModernProblemDescriptionProps) {
  const getDifficultyStyles = () => {
    switch (problem.difficulty) {
      case "Easy":
        return {
          badge: "bg-green-500/20 text-green-400 border-green-500/30",
          gradient: "from-green-500 to-emerald-600",
        };
      case "Medium":
        return {
          badge: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
          gradient: "from-yellow-500 to-orange-600",
        };
      case "Hard":
        return {
          badge: "bg-red-500/20 text-red-400 border-red-500/30",
          gradient: "from-red-500 to-pink-600",
        };
      default:
        return {
          badge: "bg-gray-500/20 text-gray-400 border-gray-500/30",
          gradient: "from-gray-500 to-gray-600",
        };
    }
  };

  const styles = getDifficultyStyles();

  return (
    <ScrollArea className="h-full">
      <div className="space-y-6 p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${styles.gradient} font-bold text-white shadow-lg`}
                >
                  {problem.id}
                </div>
                <h1 className="bg-gradient-to-r from-[#FFA9AE] via-[#8D81FF] to-[#69E1FE] bg-clip-text text-3xl font-bold text-transparent">
                  {problem.title}
                </h1>
              </div>
            </div>
            <Badge
              variant="outline"
              className={`${styles.badge} shrink-0 border px-3 py-1 text-sm font-semibold`}
            >
              {problem.difficulty}
            </Badge>
          </div>
        </motion.div>

        {/* Description Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="border-gray-700/50 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <div className="rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-2">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                Problem Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap leading-relaxed text-gray-300">
                {problem.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Objectives Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <div className="rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 p-2">
                  <Target className="h-5 w-5 text-white" />
                </div>
                Your Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-cyan-300">
                Create a prompt that successfully handles all test cases below.
                Your prompt will be evaluated based on accuracy, consistency, and
                quality of outputs.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Examples */}
        {problem.examples.map((example, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
          >
            <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <div className="rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 p-2">
                    <Lightbulb className="h-5 w-5 text-white" />
                  </div>
                  Example {index + 1}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Input */}
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-semibold text-purple-400">
                      Input:
                    </span>
                  </div>
                  <div className="rounded-lg border border-purple-500/20 bg-gray-900/50 p-4 font-mono text-sm text-gray-300">
                    {example.input}
                  </div>
                </div>

                {/* Output */}
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span className="text-sm font-semibold text-green-400">
                      Expected Output:
                    </span>
                  </div>
                  <div className="rounded-lg border border-green-500/20 bg-gray-900/50 p-4 font-mono text-sm text-gray-300">
                    {example.output}
                  </div>
                </div>

                {/* Explanation */}
                {example.explanation && (
                  <div className="rounded-lg border border-indigo-500/20 bg-indigo-900/10 p-4">
                    <p className="text-sm italic text-indigo-300">
                      💡 {example.explanation}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Tips Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-orange-900/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <div className="rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600 p-2">
                  <Lightbulb className="h-5 w-5 text-white" />
                </div>
                Pro Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-yellow-300">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500">•</span>
                  <span>
                    Be specific and clear in your prompt instructions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500">•</span>
                  <span>
                    Include examples in your prompt to guide the AI
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500">•</span>
                  <span>
                    Define the desired output format and tone
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500">•</span>
                  <span>
                    Test with edge cases to ensure robustness
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </ScrollArea>
  );
}

