"use client";

import { cn } from "@/lib/utils";
import { ProblemsListItem } from "@/types/problem";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Target,
  Home,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ModernProblemSidebarProps {
  problems: ProblemsListItem[];
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export function ModernProblemSidebar({
  problems,
  isSidebarOpen,
  setIsSidebarOpen,
}: ModernProblemSidebarProps) {
  const pathname = usePathname();

  const solvedCount = problems.filter((p) => p.solved).length;
  const totalCount = problems.length;
  const progress = (solvedCount / totalCount) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "from-green-500 to-emerald-600";
      case "Medium":
        return "from-yellow-500 to-orange-600";
      case "Hard":
        return "from-red-500 to-pink-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: -320 }}
        animate={{ x: 0, width: isSidebarOpen ? "320px" : "70px" }}
        exit={{ x: -320 }}
        transition={{ duration: 0.3 }}
        className="relative flex h-full flex-col border-r border-gray-700/50 bg-gradient-to-b from-gray-900 via-gray-900 to-indigo-950/20"
      >
        {/* Header */}
        <div className="border-b border-gray-700/50 bg-gray-900/50 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-2">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="bg-gradient-to-r from-[#FFA9AE] via-[#8D81FF] to-[#69E1FE] bg-clip-text text-lg font-bold text-transparent">
                    Challenges
                  </h2>
                  <p className="text-xs text-gray-400">
                    {solvedCount}/{totalCount} Solved
                  </p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="shrink-0 text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              {isSidebarOpen ? (
                <ChevronLeft className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Progress Section */}
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="border-b border-gray-700/50 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-300">
                Overall Progress
              </span>
              <span className="text-sm font-bold text-indigo-400">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
              />
            </div>
            {solvedCount === totalCount && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-3 flex items-center gap-2 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-2"
              >
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span className="text-xs font-semibold text-yellow-400">
                  All Challenges Complete!
                </span>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Problems List */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {problems.map((problem, index) => {
              const isActive = pathname === `/problems/${problem.id}`;
              return (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/problems/${problem.id}`}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "group relative w-full justify-start overflow-hidden transition-all",
                        isActive
                          ? "bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border-l-2 border-indigo-500"
                          : "hover:bg-gray-800/50"
                      )}
                    >
                      {isSidebarOpen ? (
                        <div className="flex w-full items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
                                problem.solved
                                  ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white"
                                  : `bg-gradient-to-br ${getDifficultyColor(problem.difficulty)} text-white`
                              )}
                            >
                              {problem.solved ? (
                                <CheckCircle2 className="h-4 w-4" />
                              ) : (
                                problem.id
                              )}
                            </div>
                            <div className="flex flex-col items-start">
                              <span
                                className={cn(
                                  "text-sm font-medium",
                                  isActive
                                    ? "text-white"
                                    : "text-gray-300 group-hover:text-white"
                                )}
                              >
                                {problem.title}
                              </span>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className={cn(
                              "shrink-0 border-0 text-xs",
                              problem.difficulty === "Easy" &&
                                "bg-green-500/20 text-green-400",
                              problem.difficulty === "Medium" &&
                                "bg-yellow-500/20 text-yellow-400",
                              problem.difficulty === "Hard" &&
                                "bg-red-500/20 text-red-400"
                            )}
                          >
                            {problem.difficulty}
                          </Badge>
                        </div>
                      ) : (
                        <div
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold",
                            problem.solved
                              ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white"
                              : `bg-gradient-to-br ${getDifficultyColor(problem.difficulty)} text-white`
                          )}
                        >
                          {problem.solved ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            problem.id
                          )}
                        </div>
                      )}
                    </Button>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-700/50 bg-gray-900/50 p-3 backdrop-blur-sm">
          <div className="space-y-2">
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="w-full justify-start border-gray-700 bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <Home className="mr-2 h-4 w-4" />
                {isSidebarOpen && "Back to Dashboard"}
              </Button>
            </Link>
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="rounded-lg bg-gradient-to-br from-indigo-900/30 to-purple-900/30 p-3"
              >
                <div className="mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-indigo-400" />
                  <span className="text-xs font-semibold text-indigo-400">
                    Pro Tip
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  Test your prompts with multiple approaches to find the most
                  effective one!
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

