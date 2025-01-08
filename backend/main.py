from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from schemas.user import UserType
import google.generativeai as genai
import json
import uvicorn
from routers import problems

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(problems.router)
genai.configure(api_key="AIzaSyAOqw73yo8DkfoeYl4dY7mzwEKUPilBAIk")
model = genai.GenerativeModel('gemini-1.5-flash')

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    user_type: UserType

class PromptFeedback(BaseModel):
    label: str
    feedback: str
    tags: List[str]

@app.post("/analyze-prompt")
async def analyze_prompt(request: ChatRequest):
    try:
        prompt = request.messages[-1].content
        user_info = request.user_type

        analysis_prompt = f"""
        You are an encouraging prompt engineering expert and mentor. Consider this user profile:
        Level: {user_info.level}
        Expertise: {user_info.expertise}
        Learning Style: {user_info.learning_style}
        Goals: {', '.join(user_info.goals)}

        Analyze the following prompt and respond in this exact JSON format:
        {{
            "label": "<STRONG/MODERATE/WEAK>",
            "feedback": "<encouraging feedback highlighting strengths and growth areas>",
            "motivation": "<personalized motivational message based on user's progress>",
            "tags": ["tag1", "tag2", "tag3"],
            "response": "<your response to the prompt>",
            "learning_points": ["key lesson 1", "key lesson 2"],
            "improved_prompts": [
                {{
                    "title": "<improvement focus>",
                    "prompt": "<improved version 1>",
                    "reasoning": "<positive reinforcement of user's approach>"
                }},
                {{
                    "title": "<improvement focus>",
                    "prompt": "<improved version 2>",
                    "reasoning": "<connection to user's learning style>"
                }},
                {{
                    "title": "<improvement focus>",
                    "prompt": "<improved version 3>",
                    "reasoning": "<alignment with user's goals and growth>"
                }}
            ]
        }}
        
        Remember to:
        1. Highlight what works well in their prompt
        2. Frame improvements as growth opportunities
        3. Connect feedback to their learning style and goals
        4. Provide specific, actionable steps forward
        5. Celebrate their progress and effort
        """

        chat = model.start_chat(history=[])
        result = chat.send_message(f"{analysis_prompt}\nUser Prompt: {prompt}")

        try:
            response_text = result.text.strip()
            if response_text.startswith('```json'):
                response_text = response_text[7:-3]
            analysis = json.loads(response_text)
            
            return {
                "label": analysis["label"],
                "feedback": analysis["feedback"],
                "motivation": analysis["motivation"],
                "tags": analysis["tags"],
                "content": analysis["response"],
                "learning_points": analysis["learning_points"],
                "improved_prompts": analysis["improved_prompts"]
            }
        except json.JSONDecodeError:
            return {
                "label": "MODERATE",
                "feedback": "Let's explore your prompt together and make it even better!",
                "tags": ["growth-opportunity"],
                "content": result.text,
                "improved_prompts": [{"title": "Starting Point", "prompt": prompt}]
            }
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
