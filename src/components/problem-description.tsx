import { Problem } from "@/types/problem";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProblemDescriptionProps {
  problem: Problem;
}

export function ProblemDescription({ problem }: ProblemDescriptionProps) {
  return (
    <div className="h-full overflow-auto scroll-none">
      <div className="p-4 space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-white">
            {problem.id}. {problem.title}
          </h1>
          <div className="mt-2">
            <Badge
              variant={
                problem.difficulty === "Easy"
                  ? "default"
                  : problem.difficulty === "Medium"
                    ? "secondary"
                    : "destructive"
              }
            >
              {problem.difficulty}
            </Badge>
          </div>
        </div>
        <Card className="bg-gray-700 border-none text-white">
          <CardHeader>
            <CardTitle className="text-2xl">Problem Description</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap">{problem.description}</div>
          </CardContent>
        </Card>
        {problem.examples.map((example, index) => (
          <Card key={index} className="bg-gray-700 border-none text-white">
            <CardHeader>
              <CardTitle className="text-2xl">Example {index + 1}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="font-mono text-sm text-white">
                  Input:
                </div>
                <div className="rounded-md bg-gray-500 p-4 font-mono">
                  {example.input}
                </div>
              </div>
              <div>
                <div className="font-mono text-sm text-white">
                  Output:
                </div>
                <div className="rounded-md bg-gray-500 p-4 font-mono">
                  {example.output}
                </div>
              </div>
              {example.explanation && (
                <div>
                  <div className="font-mono text-sm text-white">
                    Explanation:
                  </div>
                  <div className="rounded-md bg-gray-500 p-4">
                    {example.explanation}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
