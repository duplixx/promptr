"use client";
interface UserInfo {
  level: string;
  expertise: string;
  learningStyle: string;
  goals: string[];
}

const analyzePrompt = async (
  prompt: string,
  userInfo: UserInfo,
): Promise<string> => {
  // This is still a placeholder function. In a real application, this would be
  // replaced with a call to an AI model or more sophisticated analysis.
  const wordCount = prompt.split(" ").length;
  const hasContext = prompt.toLowerCase().includes("context");
  const hasSpecificRequest =
    prompt.toLowerCase().includes("please") ||
    prompt.toLowerCase().includes("can you");

  let analysis = "Here's an analysis of your prompt based on your profile:\n\n";

  // Analyze based on user level
  if (userInfo.level === "beginner") {
    if (wordCount < 15) {
      analysis +=
        "- As a beginner, try to provide more details in your prompt. Aim for at least 15-20 words.\n";
    } else {
      analysis +=
        "- Good job on providing a detailed prompt! As you progress, you'll learn to balance detail and conciseness.\n";
    }
  } else if (userInfo.level === "intermediate") {
    if (wordCount > 50) {
      analysis +=
        "- Your prompt is quite detailed. As an intermediate user, try to focus on the most important elements.\n";
    } else if (wordCount < 20) {
      analysis +=
        "- Your prompt is concise, which can be good. Make sure you're not omitting important details.\n";
    } else {
      analysis += "- Your prompt length seems appropriate for your level.\n";
    }
  } else if (userInfo.level === "advanced") {
    if (wordCount > 30) {
      analysis +=
        "- As an advanced user, consider if you can achieve the same result with a more concise prompt.\n";
    } else {
      analysis +=
        "- Your prompt is concise, which is often good for advanced users. Ensure it still contains all necessary information.\n";
    }
  }

  // Analyze based on learning style
  if (userInfo.learningStyle === "visual") {
    analysis +=
      "- Consider incorporating visual elements or descriptions in your prompts when appropriate.\n";
  } else if (userInfo.learningStyle === "auditory") {
    analysis +=
      "- Try to think about how you might describe your desired output verbally when crafting prompts.\n";
  } else if (userInfo.learningStyle === "kinesthetic") {
    analysis +=
      "- Consider how your prompt might relate to practical, hands-on applications.\n";
  }

  // Analyze based on goals
  if (userInfo.goals.includes("Improve writing skills")) {
    analysis +=
      "- To improve writing skills, try experimenting with different writing styles in your prompts.\n";
  }
  if (userInfo.goals.includes("Learn advanced techniques")) {
    analysis +=
      "- To learn advanced techniques, try incorporating more complex instructions or constraints in your prompts.\n";
  }
  if (userInfo.goals.includes("Increase efficiency")) {
    analysis +=
      "- To increase efficiency, focus on making your prompts as clear and specific as possible.\n";
  }
  if (userInfo.goals.includes("Explore creative applications")) {
    analysis +=
      "- To explore creative applications, don't be afraid to use unusual combinations or unconventional ideas in your prompts.\n";
  }

  // General analysis
  if (!hasContext) {
    analysis +=
      "- Consider adding more context to your prompt for better results.\n";
  }
  if (!hasSpecificRequest) {
    analysis +=
      "- Try to make your request more specific for better results.\n";
  }

  return analysis;
};

export default analyzePrompt;
