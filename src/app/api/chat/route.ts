import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText, convertToCoreMessages } from "ai";

// Create Google AI instance
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || "",
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, userInfo } = await req.json();

    // Create system prompt based on user info
    const systemPrompt = userInfo
      ? `You are an encouraging prompt engineering expert and mentor. Consider this user profile:
Level: ${userInfo.level}
Expertise: ${userInfo.expertise}
Learning Style: ${userInfo.learningStyle}
Goals: ${userInfo.goals.join(", ")}

Your role is to:
1. Analyze prompts and provide constructive feedback
2. Highlight what works well
3. Frame improvements as growth opportunities
4. Connect feedback to their learning style and goals
5. Provide specific, actionable steps forward
6. Celebrate their progress and effort

When analyzing prompts, consider:
- Clarity and specificity
- Context and background information
- Desired output format
- Constraints and requirements
- Use of examples
- Tone and style guidance`
      : `You are a helpful and encouraging prompt engineering tutor. Help users improve their prompts by providing constructive feedback and suggestions.`;

    const result = await streamText({
      model: google("gemini-2.0-flash-exp"),
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...convertToCoreMessages(messages),
      ],
      temperature: 0.7,
      maxTokens: 2000,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

