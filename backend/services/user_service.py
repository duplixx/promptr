from typing import Optional, List, Dict, Any
from datetime import datetime, timedelta
from bson import ObjectId
from database import users_collection, user_profiles_collection, user_sessions_collection
from schemas.user import UserCreate, UserProfileCreate, UserProfileUpdate, UserResponse, UserProfileResponse
from auth import get_password_hash, verify_password, create_access_token
import json

class UserService:
    """Service class for user-related operations."""
    
    @staticmethod
    async def create_user(user_data: UserCreate) -> Dict[str, Any]:
        """Create a new user."""
        # Check if user already exists
        existing_user = await users_collection.find_one({"email": user_data.email})
        if existing_user:
            raise ValueError("User with this email already exists")
        
        # Hash password if provided
        hashed_password = None
        if user_data.password:
            hashed_password = get_password_hash(user_data.password)
        
        # Create user document
        user_doc = {
            "email": user_data.email,
            "name": user_data.name,
            "hashed_password": hashed_password,
            "is_active": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        result = await users_collection.insert_one(user_doc)
        user_doc["_id"] = result.inserted_id
        
        return {
            "id": str(result.inserted_id),
            "email": user_doc["email"],
            "name": user_doc["name"],
            "is_active": user_doc["is_active"],
            "created_at": user_doc["created_at"],
            "updated_at": user_doc["updated_at"]
        }
    
    @staticmethod
    async def get_user_by_email(email: str) -> Optional[Dict[str, Any]]:
        """Get user by email."""
        user = await users_collection.find_one({"email": email})
        if user:
            user["id"] = str(user["_id"])
            del user["_id"]
        return user
    
    @staticmethod
    async def get_user_by_id(user_id: str) -> Optional[Dict[str, Any]]:
        """Get user by ID."""
        user = await users_collection.find_one({"_id": ObjectId(user_id)})
        if user:
            user["id"] = str(user["_id"])
            del user["_id"]
        return user
    
    @staticmethod
    async def authenticate_user(email: str, password: str) -> Optional[Dict[str, Any]]:
        """Authenticate user with email and password."""
        user = await users_collection.find_one({"email": email})
        if not user:
            return None
        
        if not user.get("hashed_password"):
            return None
        
        if not verify_password(password, user["hashed_password"]):
            return None
        
        user["id"] = str(user["_id"])
        del user["_id"]
        del user["hashed_password"]
        return user
    
    @staticmethod
    async def create_user_profile(user_id: str, profile_data: UserProfileCreate) -> Dict[str, Any]:
        """Create or update user profile."""
        # Check if profile already exists
        existing_profile = await user_profiles_collection.find_one({"user_id": user_id})
        
        profile_doc = {
            "user_id": user_id,
            "level": profile_data.level,
            "expertise": profile_data.expertise,
            "learning_style": profile_data.learning_style,
            "goals": profile_data.goals,
            "is_personalized": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        if existing_profile:
            # Update existing profile
            await user_profiles_collection.update_one(
                {"user_id": user_id},
                {"$set": {
                    "level": profile_data.level,
                    "expertise": profile_data.expertise,
                    "learning_style": profile_data.learning_style,
                    "goals": profile_data.goals,
                    "is_personalized": True,
                    "updated_at": datetime.utcnow()
                }}
            )
            profile_doc["id"] = str(existing_profile["_id"])
        else:
            # Create new profile
            result = await user_profiles_collection.insert_one(profile_doc)
            profile_doc["id"] = str(result.inserted_id)
        
        return profile_doc
    
    @staticmethod
    async def get_user_profile(user_id: str) -> Optional[Dict[str, Any]]:
        """Get user profile by user ID."""
        profile = await user_profiles_collection.find_one({"user_id": user_id})
        if profile:
            profile["id"] = str(profile["_id"])
            del profile["_id"]
        return profile
    
    @staticmethod
    async def update_user_profile(user_id: str, profile_data: UserProfileUpdate) -> Optional[Dict[str, Any]]:
        """Update user profile."""
        update_data = {}
        
        if profile_data.level is not None:
            update_data["level"] = profile_data.level
        if profile_data.expertise is not None:
            update_data["expertise"] = profile_data.expertise
        if profile_data.learning_style is not None:
            update_data["learning_style"] = profile_data.learning_style
        if profile_data.goals is not None:
            update_data["goals"] = profile_data.goals
        
        if not update_data:
            return await UserService.get_user_profile(user_id)
        
        update_data["updated_at"] = datetime.utcnow()
        
        result = await user_profiles_collection.update_one(
            {"user_id": user_id},
            {"$set": update_data}
        )
        
        if result.modified_count > 0:
            return await UserService.get_user_profile(user_id)
        return None
    
    @staticmethod
    async def create_user_session(user_id: str, session_data: Dict[str, Any], expires_in_hours: int = 24) -> str:
        """Create a user session."""
        expires_at = datetime.utcnow() + timedelta(hours=expires_in_hours)
        
        session_doc = {
            "user_id": user_id,
            "session_data": session_data,
            "created_at": datetime.utcnow(),
            "expires_at": expires_at
        }
        
        result = await user_sessions_collection.insert_one(session_doc)
        return str(result.inserted_id)
    
    @staticmethod
    async def get_user_session(session_id: str) -> Optional[Dict[str, Any]]:
        """Get user session by session ID."""
        session = await user_sessions_collection.find_one({"_id": ObjectId(session_id)})
        if session and session["expires_at"] > datetime.utcnow():
            session["id"] = str(session["_id"])
            del session["_id"]
            return session
        return None
    
    @staticmethod
    async def delete_user_session(session_id: str) -> bool:
        """Delete a user session."""
        result = await user_sessions_collection.delete_one({"_id": ObjectId(session_id)})
        return result.deleted_count > 0
    
    @staticmethod
    async def get_user_with_profile(user_id: str) -> Optional[Dict[str, Any]]:
        """Get user with their profile data."""
        user = await UserService.get_user_by_id(user_id)
        if not user:
            return None
        
        profile = await UserService.get_user_profile(user_id)
        user["profile"] = profile
        return user
