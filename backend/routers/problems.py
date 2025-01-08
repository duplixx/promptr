from fastapi import APIRouter, HTTPException
from typing import List
from schemas.problems import Challenge
from database import get_database
from bson import ObjectId

router = APIRouter()

db = get_database()
challenges_collection = db["challenges"]

@router.get("/challenges", response_model=List[Challenge])
async def get_challenges():
    challenges = list(challenges_collection.find())
    return challenges

@router.post("/challenges", response_model=Challenge)
async def create_challenge(challenge: Challenge):
    challenge_id = challenges_collection.insert_one(challenge.dict()).inserted_id
    new_challenge = challenges_collection.find_one({"_id": ObjectId(challenge_id)})
    return new_challenge

@router.put("/challenges/{challenge_id}", response_model=Challenge)
async def update_challenge(challenge_id: str, challenge: Challenge):
    result = challenges_collection.update_one(
        {"_id": ObjectId(challenge_id)},
        {"$set": challenge.dict()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Challenge not found")
    updated_challenge = challenges_collection.find_one({"_id": ObjectId(challenge_id)})
    return updated_challenge

@router.delete("/challenges/{challenge_id}")
async def delete_challenge(challenge_id: str):
    result = challenges_collection.delete_one({"_id": ObjectId(challenge_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Challenge not found")
    return {"detail": "Challenge deleted"}