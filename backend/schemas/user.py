from typing import List, Optional, Dict, Any
from pydantic import BaseModel, EmailStr
from datetime import datetime
from enum import Enum

class SubscriptionTier(str, Enum):
    FREE = "free"
    PRO = "pro"
    BUSINESS = "business"

class SubscriptionLimits(BaseModel):
    daily_analyses: int
    monthly_analyses: int
    api_calls: int

class SubscriptionCreate(BaseModel):
    tier: SubscriptionTier
    features: List[str]
    limits: SubscriptionLimits
    expires_at: Optional[datetime] = None

class SubscriptionResponse(BaseModel):
    id: str
    user_id: str
    tier: SubscriptionTier
    features: List[str]
    limits: SubscriptionLimits
    expires_at: Optional[datetime]
    is_active: bool
    created_at: datetime
    updated_at: datetime

class SkillProgress(BaseModel):
    skill_id: str
    category: str
    level: int
    max_level: int
    xp_earned: int
    unlocked: bool

class UserProgress(BaseModel):
    user_id: str
    total_xp: int
    skills: List[SkillProgress]
    achievements: List[str]
    last_updated: datetime

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
    user: UserResponse
    profile: Optional[UserProfileResponse] = None
    subscription: Optional[SubscriptionResponse] = None
    progress: Optional[UserProgress] = None