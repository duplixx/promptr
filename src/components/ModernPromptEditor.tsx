"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TestCase } from "@/types/problem";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Play,
  Sparkles,
  Code2,
  TrendingUp,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface TestResult {
  actualOutput: string;
  score: number;
  passed: boolean;
  feedback: string;
  suggestions: string[];
}

interface ModernPromptEditorProps {
  testCases: TestCase[];
  problemContext: string;
}

export function ModernPromptEditor({
  testCases,
  problemContext,
}: ModernPromptEditorProps) {
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState<(TestResult | null)[]>(
    new Array(testCases.length).fill(null)
  );
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState<number>(-1);

  const runTests = async () => {
    if (!prompt.trim()) return;

    setIsRunning(true);
    setResults(new Array(testCases.length).fill(null));

    const newResults: (TestResult | null)[] = [];

    for (let i = 0; i < testCases.length; i++) {
      setCurrentTest(i);
      try {
        const response = await fetch("/api/evaluate-prompt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt,
            testCase: testCases[i],
            problemContext,
          }),
        });

        if (!response.ok) throw new Error("Evaluation failed");

        const result: TestResult = await response.json();
        newResults.push(result);
        setResults([...newResults, ...new Array(testCases.length - newResults.length).fill(null)]);
      } catch (error) {
        console.error(`Test ${i + 1} failed:`, error);
        newResults.push({
          actualOutput: "Error evaluating test case",
          score: 0,
          passed: false,
          feedback: "Failed to evaluate this test case. Please try again.",
          suggestions: ["Check your internet connection", "Try again in a moment"],
        });
        setResults([...newResults, ...new Array(testCases.length - newResults.length).fill(null)]);
      }
    }

    setCurrentTest(-1);
    setIsRunning(false);
  };

  const overallScore =
    results.filter((r) => r !== null).length > 0
      ? Math.round(
          results.reduce((sum, r) => sum + (r?.score || 0), 0) /
            results.filter((r) => r !== null).length
        )
      : 0;

  const passedCount = results.filter((r) => r?.passed).length;

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-gray-900 via-gray-900 to-purple-950/20">
      {/* Header */}
      <div className="border-b border-gray-700/50 bg-gray-900/50 p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-2">
              <Code2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="bg-gradient-to-r from-[#FFA9AE] via-[#8D81FF] to-[#69E1FE] bg-clip-text font-bold text-transparent">
                Prompt Editor
              </h2>
              <p className="text-xs text-gray-400">
                Write and test your prompt below
              </p>
            </div>
          </div>
          {results.some((r) => r !== null) && (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-gray-400">Score</p>
                <p className="text-2xl font-bold text-indigo-400">
                  {overallScore}
                  <span className="text-sm text-gray-500">/100</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Passed</p>
                <p className="text-2xl font-bold text-green-400">
                  {passedCount}
                  <span className="text-sm text-gray-500">
                    /{testCases.length}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Prompt Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Write your prompt template here... Use {input} to reference the test case input.

Example:
You are an expert writer. Create a compelling product description for: {input}

Include:
- Key features and benefits
- Engaging marketing copy
- SEO-friendly keywords
- Professional tone"
            className="min-h-[300px] resize-none rounded-xl border-2 border-gray-700 bg-gray-800/50 font-mono text-sm text-white placeholder-gray-500 backdrop-blur-sm transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50"
          />
          <div className="mt-2 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              💡 Use placeholder like {"{input}"} to reference test inputs
            </p>
            <p className="text-xs text-gray-500">
              {prompt.length} characters
            </p>
          </div>
        </motion.div>

        {/* Run Tests Button */}
        <Button
          onClick={runTests}
          disabled={!prompt.trim() || isRunning}
          className="h-12 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-bold text-white shadow-lg transition-all hover:shadow-indigo-500/50 disabled:opacity-50"
        >
          {isRunning ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Running Test {currentTest + 1}/{testCases.length}...
            </>
          ) : (
            <>
              <Play className="mr-2 h-5 w-5" />
              Run All Test Cases
            </>
          )}
        </Button>

        {/* Test Results */}
        <ScrollArea className="flex-1">
          <div className="space-y-3">
            {testCases.map((testCase, index) => {
              const result = results[index];
              const isRunningThis = isRunning && currentTest === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    className={`border transition-all ${
                      result?.passed
                        ? "border-green-500/50 bg-gradient-to-br from-green-900/20 to-emerald-900/20"
                        : result && !result.passed
                          ? "border-red-500/50 bg-gradient-to-br from-red-900/20 to-pink-900/20"
                          : "border-gray-700/50 bg-gray-800/50"
                    } backdrop-blur-sm`}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-white">
                            Test Case {index + 1}
                          </span>
                          {isRunningThis && (
                            <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
                          )}
                        </div>
                        {result && (
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={`border-0 ${
                                result.passed
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {result.score}/100
                            </Badge>
                            {result.passed ? (
                              <CheckCircle2 className="h-5 w-5 text-green-400" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-400" />
                            )}
                          </div>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {/* Test Description */}
                      <div className="rounded-lg border border-gray-700/50 bg-gray-900/50 p-3">
                        <p className="text-xs text-gray-400">
                          {testCase.description}
                        </p>
                      </div>

                      {/* Input */}
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <Code2 className="h-3 w-3 text-indigo-400" />
                          <span className="text-xs font-semibold text-indigo-400">
                            Input:
                          </span>
                        </div>
                        <div className="rounded-lg border border-indigo-500/20 bg-gray-900/50 p-2 font-mono text-xs text-gray-300">
                          {testCase.input}
                        </div>
                      </div>

                      {/* Actual Output */}
                      <AnimatePresence>
                        {result && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <div className="mb-1 flex items-center gap-2">
                              <Sparkles className="h-3 w-3 text-purple-400" />
                              <span className="text-xs font-semibold text-purple-400">
                                Actual Output:
                              </span>
                            </div>
                            <div className="rounded-lg border border-purple-500/20 bg-gray-900/50 p-2 font-mono text-xs text-gray-300">
                              {result.actualOutput}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Feedback */}
                      <AnimatePresence>
                        {result && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`rounded-lg border p-3 ${
                              result.passed
                                ? "border-green-500/30 bg-green-900/10"
                                : "border-yellow-500/30 bg-yellow-900/10"
                            }`}
                          >
                            <div className="mb-2 flex items-center gap-2">
                              {result.passed ? (
                                <TrendingUp className="h-4 w-4 text-green-400" />
                              ) : (
                                <AlertCircle className="h-4 w-4 text-yellow-400" />
                              )}
                              <span
                                className={`text-xs font-semibold ${
                                  result.passed
                                    ? "text-green-400"
                                    : "text-yellow-400"
                                }`}
                              >
                                Feedback:
                              </span>
                            </div>
                            <p className="mb-2 text-xs text-gray-300">
                              {result.feedback}
                            </p>
                            {result.suggestions.length > 0 && (
                              <div className="mt-2">
                                <p className="mb-1 text-xs font-semibold text-gray-400">
                                  Suggestions:
                                </p>
                                <ul className="space-y-1">
                                  {result.suggestions.map((suggestion, idx) => (
                                    <li
                                      key={idx}
                                      className="text-xs text-gray-400"
                                    >
                                      • {suggestion}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

