from typing import List
from pydantic import BaseModel

class UserType(BaseModel):
    level: str
    expertise: str
    learning_style: str
    goals: List[str]