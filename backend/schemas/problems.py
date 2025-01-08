from enum import Enum
from typing import Optional

class Difficulty(Enum):
    Easy = "Easy"
    Medium = "Medium"
    Hard = "Hard"

class QuestionType(Enum):
    Image_to_Prompt = "Image-to-Prompt"
    Text_to_Prompt = "Text-to-Prompt"
    Role_Playing = "Role-Playing"
    Creative = "Creative"

class Challenge:
    def __init__(self, 
                 question_id: int, 
                 title: str, 
                 description: str, 
                 difficulty: Difficulty, 
                 question_type: QuestionType, 
                 created_at: str,
                 image_url: Optional[str] = None):
        self.question_id = question_id
        self.title = title
        self.description = description
        self.difficulty = difficulty
        self.question_type = question_type
        self.created_at = created_at
        self.image_url = image_url