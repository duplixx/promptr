from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
from datetime import datetime
import os
from typing import Optional

# MongoDB connection
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "promptr")

# Async MongoDB client
client = AsyncIOMotorClient(MONGODB_URL)
database = client[DATABASE_NAME]

# Collections
users_collection = database.users
user_profiles_collection = database.user_profiles
user_sessions_collection = database.user_sessions

# Sync client for operations that need it
sync_client = MongoClient(MONGODB_URL)
sync_database = sync_client[DATABASE_NAME]

# Create indexes
async def create_indexes():
    """Create database indexes for better performance."""
    try:
        # Users collection indexes
        try:
            await users_collection.create_index("email", unique=True)
        except Exception:
            pass  # Index might already exist
        
        try:
            await users_collection.create_index("created_at")
        except Exception:
            pass
        
        # User profiles collection indexes
        try:
            await user_profiles_collection.create_index("user_id", unique=True)
        except Exception:
            pass
        
        try:
            await user_profiles_collection.create_index("created_at")
        except Exception:
            pass
        
        # User sessions collection indexes
        try:
            await user_sessions_collection.create_index("user_id")
        except Exception:
            pass
        
        try:
            await user_sessions_collection.create_index("expires_at")
        except Exception:
            pass
        
        print("✅ Database indexes created successfully")
                
    except Exception as e:
        print(f"Warning: Some indexes may not have been created: {e}")
        # Continue startup even if some indexes fail

# Database dependency
async def get_database():
    """Get database instance."""
    return database

# Collection dependencies
async def get_users_collection():
    """Get users collection."""
    return users_collection

async def get_user_profiles_collection():
    """Get user profiles collection."""
    return user_profiles_collection

async def get_user_sessions_collection():
    """Get user sessions collection."""
    return user_sessions_collection
