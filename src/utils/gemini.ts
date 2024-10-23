import { GoogleGenerativeAI } from "@google/generative-ai";
let conversation = null;
export function initializeChat(message) {
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const model = new GoogleGenerativeAI(geminiApiKey).getGenerativeModel({
    model: "gemini-1.5-flash-latest",
  });

  const initHistory = [
    {
      role: "user",
      parts: [message],
    },
    {
      role: "model",
      parts: "Hi, I am Sam. How can I help you.",
    },
  ];
  conversation = model.startChat({
    history: initHistory,
    generationConfig: {
      maxOutputTokens: 350,
    },
  });
  conversation._apiKey = null;
  return conversation;
}

export async function sendMessage(message) {
  const geminiApiKey = process.env.GEMINI_API_KEY;
  console.log(geminiApiKey);
  const response = {
    text: "Something went wrong",
    conversation: null,
  };
  if (!conversation) {
    console.log("Conversation Eror");
    return response;
  }

  try {
    conversation._apiKey = geminiApiKey;
    const result = await conversation.sendMessage(message);
    response.text = await result.response.text();
    response.conversation = conversation;
    return response;
  } catch (error) {
    response.conversation = conversation;
    return response;
  }
}
