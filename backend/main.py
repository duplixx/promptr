from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import List, Optional
from schemas.user import (
    UserType, UserCreate, UserResponse, UserLogin, Token, 
    UserProfileCreate, UserProfileUpdate, UserProfileResponse, SessionData
)
from services.user_service import UserService
from database import create_indexes
from auth import create_access_token
import google.generativeai as genai
import json
import uvicorn
import os

app = FastAPI(title="Promptr API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# Startup event
@app.on_event("startup")
async def startup_event():
    """Create database indexes on startup."""
    await create_indexes()

api_key = os.environ.get('GOOGLE_GENERATIVE_AI_API_KEY')
if not api_key:
    raise RuntimeError("Missing required environment variable: 'GOOGLE_GENERATIVE_AI_API_KEY'")
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-2.0-flash')

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

# Authentication dependency
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get current user from JWT token."""
    from auth import verify_token
    
    token = credentials.credentials
    payload = verify_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user = await UserService.get_user_by_id(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return user

# User Management Endpoints
@app.post("/users/register", response_model=UserResponse)
async def register_user(user_data: UserCreate):
    """Register a new user."""
    try:
        user = await UserService.create_user(user_data)
        return UserResponse(**user)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/users/login", response_model=Token)
async def login_user(login_data: UserLogin):
    """Login user and return access token."""
    user = await UserService.authenticate_user(login_data.email, login_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": user["id"]})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me", response_model=UserResponse)
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    """Get current user information."""
    return UserResponse(**current_user)

@app.get("/users/me/profile", response_model=UserProfileResponse)
async def get_user_profile(current_user: dict = Depends(get_current_user)):
    """Get current user's profile."""
    profile = await UserService.get_user_profile(current_user["id"])
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return UserProfileResponse(**profile)

@app.post("/users/me/profile", response_model=UserProfileResponse)
async def create_user_profile(
    profile_data: UserProfileCreate,
    current_user: dict = Depends(get_current_user)
):
    """Create or update user profile."""
    try:
        profile = await UserService.create_user_profile(current_user["id"], profile_data)
        return UserProfileResponse(**profile)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to create profile")

@app.put("/users/me/profile", response_model=UserProfileResponse)
async def update_user_profile(
    profile_data: UserProfileUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update user profile."""
    try:
        profile = await UserService.update_user_profile(current_user["id"], profile_data)
        if not profile:
            raise HTTPException(status_code=404, detail="Profile not found")
        return UserProfileResponse(**profile)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to update profile")

@app.get("/users/me/session")
async def get_user_session_data(current_user: dict = Depends(get_current_user)):
    """Get user session data with profile."""
    try:
        user_with_profile = await UserService.get_user_with_profile(current_user["id"])
        if not user_with_profile:
            raise HTTPException(status_code=404, detail="User not found")
        
        return {
            "user": UserResponse(**user_with_profile),
            "profile": UserProfileResponse(**user_with_profile["profile"]) if user_with_profile.get("profile") else None
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to get session data")

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



@app.post("/generate-problems")
async def generate_problems(user_info: UserType):
    try:
        problems_prompt = f"""
        Generate 5 prompt engineering practice problems tailored for a:
        Level: {user_info.level}
        Expertise: {user_info.expertise}
        Learning Style: {user_info.learning_style}
        Goals: {', '.join(user_info.goals)}

        Return the problems in this exact JSON format:
        {{
            "problems": [
                {{
                    "id": number,
                    "title": "string",
                    "difficulty": "Easy/Medium/Hard",
                    "description": "detailed problem description",
                    "examples": [{{
                        "input": "string",
                        "output": "string",
                        "explanation": "string"
                    }}],
                    "testCases": [{{
                        "input": "string",
                        "expectedOutput": "string",
                        "description": "string"
                    }}]
                }}
            ]
        }}
        """

        chat = model.start_chat(history=[])
        result = chat.send_message(problems_prompt)
        return json.loads(result.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
