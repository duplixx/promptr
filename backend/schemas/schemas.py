from pydantic import BaseModel
from typing import List, Optional
from enum import Enum

class Difficulty(str, Enum):
    Easy = "Easy"
    Medium = "Medium"
    Hard = "Hard"

class QuestionType(str, Enum):
    Image_to_Prompt = "Image-to-Prompt"
    Text_to_Prompt = "Text-to-Prompt"
    Role_Playing = "Role-Playing"
    Creative = "Creative"

class ChallengeBase(BaseModel):
    title: str
    description: str
    difficulty: Difficulty
    question_type: QuestionType
    image_url: Optional[str] = None

class ChallengeCreate(ChallengeBase):
    pass

class Challenge(ChallengeBase):
    question_id: int

    class Config:
        orm_mode = True

class ChallengeResponse(BaseModel):
    challenges: List[Challenge]