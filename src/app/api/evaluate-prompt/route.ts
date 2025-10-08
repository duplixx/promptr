import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? "",
});

export const maxDuration = 30;

interface TestCase {
  input: string;
  expectedOutput: string;
  description: string;
}

interface EvaluationRequest {
  prompt: string;
  testCase: TestCase;
  problemContext: string;
}

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    const { prompt, testCase, problemContext } = body as EvaluationRequest;

    if (!prompt || !testCase) {
      return new Response(
        JSON.stringify({ error: "Prompt and test case are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const evaluationPrompt = `You are an expert prompt engineering evaluator. 

Problem Context: ${problemContext}

User's Prompt Template:
${prompt}

Test Case Input:
${testCase.input}

Expected Output Characteristics:
${testCase.expectedOutput}

Test Case Description:
${testCase.description}

Your task:
1. Apply the user's prompt template to the test case input
2. Generate the actual output that would result from this prompt
3. Evaluate how well it matches the expected output characteristics
4. Provide a score from 0-100
5. Give specific, actionable feedback

Respond in the following JSON format:
{
  "actualOutput": "The generated output from applying the prompt to the input",
  "score": 85,
  "passed": true,
  "feedback": "Detailed feedback on what worked well and what could be improved",
  "suggestions": ["Specific suggestion 1", "Specific suggestion 2"]
}`;

    const result = await generateText({
      model: google("gemini-2.0-flash-exp"),
      prompt: evaluationPrompt,
      temperature: 0.3,
      maxTokens: 1500,
    });

    // Parse the JSON response from the AI
    try {
      const evaluation: unknown = JSON.parse(result.text);
      return new Response(JSON.stringify(evaluation), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch {
      // If JSON parsing fails, return a formatted response
      return new Response(
        JSON.stringify({
          actualOutput: result.text,
          score: 50,
          passed: false,
          feedback:
            "Unable to parse AI response. Please try running the test again.",
          suggestions: ["Refine your prompt to be more specific"],
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Evaluation error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to evaluate prompt",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

