"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TestCase } from "@/types/problem";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";

interface PromptEditorProps {
  testCases: TestCase[];
}

export function PromptEditor({ testCases }: PromptEditorProps) {
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState<
    { success: boolean; output: string }[]
  >([]);
  const [isRunning, setIsRunning] = useState(false);

  const runTests = async () => {
    setIsRunning(true);
    // Simulate API call to test the prompt
    const simulatedResults = testCases.map((testCase) => ({
      success: Math.random() > 0.5,
      output: "Generated output would appear here...",
    }));

    // Artificial delay to simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setResults(simulatedResults);
    setIsRunning(false);
  };

  return (
    <div className="flex h-full flex-col p-4">
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Write your prompt here..."
        className="focus:border-second mb-4 h-1/2 min-h-[450px] flex-1 resize-none rounded-xl border-2 border-white bg-gray-700 font-mono text-white dark:text-white"
      />
      <div className="scroll-none flex-1 space-y-4 overflow-auto">
        {testCases.map((testCase, index) => (
          <Card
            key={index}
            className="scroll-none border-none bg-gray-700 text-white"
          >
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">
                Test Case {index + 1}
                {results[index] && (
                  <Badge
                    variant={results[index].success ? "default" : "destructive"}
                    className="ml-2"
                  >
                    {results[index].success ? (
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                    ) : (
                      <XCircle className="mr-1 h-3 w-3" />
                    )}
                    {results[index].success ? "Passed" : "Failed"}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="py-2 text-sm">
              <div className="space-y-2">
                <div>
                  <div className="mb-1 font-mono text-xs text-white">
                    Input:
                  </div>
                  <div className="rounded-md bg-gray-500 p-2 font-mono">
                    {testCase.input}
                  </div>
                </div>
                {results[index] && (
                  <div>
                    <div className="font-mono text-xs text-white">Output:</div>
                    <div className="rounded-md bg-gray-500 p-2 font-mono">
                      {results[index].output}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-4">
        <Button
          onClick={runTests}
          className="bg-second w-full"
          disabled={!prompt.trim() || isRunning}
        >
          {isRunning ? "Running Tests..." : "Run Test Cases"}
        </Button>
      </div>
    </div>
  );
}
