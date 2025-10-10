from typing import List, Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserType(BaseModel):
    level: str
    expertise: str
    learning_style: str
    goals: List[str]

class UserProfileCreate(BaseModel):
    level: str
    expertise: str
    learning_style: str
    goals: List[str]

class UserProfileUpdate(BaseModel):
    level: Optional[str] = None
    expertise: Optional[str] = None
    learning_style: Optional[str] = None
    goals: Optional[List[str]] = None

class UserProfileResponse(BaseModel):
    id: str
    user_id: str
    level: str
    expertise: str
    learning_style: str
    goals: List[str]
    is_personalized: bool
    created_at: datetime
    updated_at: datetime

class UserCreate(BaseModel):
    email: EmailStr
    name: Optional[str] = None
    password: Optional[str] = None

class UserResponse(BaseModel):
    id: str
    email: str
    name: Optional[str]
    is_active: bool
    created_at: datetime
    updated_at: datetime

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class SessionData(BaseModel):
    user_id: int
    profile_data: Optional[UserProfileResponse] = None
    preferences: Optional[dict] = None