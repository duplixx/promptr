#!/usr/bin/env python3
"""
Test script for Promptr Backend API
Run with: python test_api.py
"""

import asyncio
import httpx
import json
from datetime import datetime

BASE_URL = "http://localhost:8000"

async def test_api():
    """Test the API endpoints."""
    async with httpx.AsyncClient() as client:
        print("🚀 Testing Promptr Backend API")
        print("=" * 50)
        
        # Test 1: Health check (if we add one)
        print("\n1. Testing server availability...")
        try:
            response = await client.get(f"{BASE_URL}/docs")
            print(f"✅ Server is running (Status: {response.status_code})")
        except Exception as e:
            print(f"❌ Server not available: {e}")
            return
        
        # Test 2: User Registration
        print("\n2. Testing user registration...")
        user_data = {
            "email": "test@example.com",
            "name": "Test User",
            "password": "testpassword123"
        }
        
        try:
            response = await client.post(f"{BASE_URL}/users/register", json=user_data)
            if response.status_code == 200:
                user = response.json()
                print(f"✅ User registered successfully: {user['email']}")
                user_id = user['id']
            else:
                print(f"❌ Registration failed: {response.status_code} - {response.text}")
                return
        except Exception as e:
            print(f"❌ Registration error: {e}")
            return
        
        # Test 3: User Login
        print("\n3. Testing user login...")
        login_data = {
            "email": "test@example.com",
            "password": "testpassword123"
        }
        
        try:
            response = await client.post(f"{BASE_URL}/users/login", json=login_data)
            if response.status_code == 200:
                token_data = response.json()
                token = token_data['access_token']
                print(f"✅ Login successful, token received")
            else:
                print(f"❌ Login failed: {response.status_code} - {response.text}")
                return
        except Exception as e:
            print(f"❌ Login error: {e}")
            return
        
        # Test 4: Get User Info
        print("\n4. Testing get user info...")
        headers = {"Authorization": f"Bearer {token}"}
        
        try:
            response = await client.get(f"{BASE_URL}/users/me", headers=headers)
            if response.status_code == 200:
                user_info = response.json()
                print(f"✅ User info retrieved: {user_info['email']}")
            else:
                print(f"❌ Get user info failed: {response.status_code} - {response.text}")
        except Exception as e:
            print(f"❌ Get user info error: {e}")
        
        # Test 5: Create User Profile
        print("\n5. Testing create user profile...")
        profile_data = {
            "level": "beginner",
            "expertise": "Software Development",
            "learning_style": "visual",
            "goals": ["Learn prompt engineering", "Improve coding skills"]
        }
        
        try:
            response = await client.post(f"{BASE_URL}/users/me/profile", json=profile_data, headers=headers)
            if response.status_code == 200:
                profile = response.json()
                print(f"✅ Profile created successfully: {profile['level']} level")
            else:
                print(f"❌ Profile creation failed: {response.status_code} - {response.text}")
        except Exception as e:
            print(f"❌ Profile creation error: {e}")
        
        # Test 6: Get User Profile
        print("\n6. Testing get user profile...")
        try:
            response = await client.get(f"{BASE_URL}/users/me/profile", headers=headers)
            if response.status_code == 200:
                profile = response.json()
                print(f"✅ Profile retrieved: {profile['level']} - {profile['expertise']}")
            else:
                print(f"❌ Get profile failed: {response.status_code} - {response.text}")
        except Exception as e:
            print(f"❌ Get profile error: {e}")
        
        # Test 7: Update User Profile
        print("\n7. Testing update user profile...")
        update_data = {
            "level": "intermediate",
            "goals": ["Master prompt engineering", "Build AI applications"]
        }
        
        try:
            response = await client.put(f"{BASE_URL}/users/me/profile", json=update_data, headers=headers)
            if response.status_code == 200:
                profile = response.json()
                print(f"✅ Profile updated: {profile['level']} level")
            else:
                print(f"❌ Profile update failed: {response.status_code} - {response.text}")
        except Exception as e:
            print(f"❌ Profile update error: {e}")
        
        # Test 8: Get Session Data
        print("\n8. Testing get session data...")
        try:
            response = await client.get(f"{BASE_URL}/users/me/session", headers=headers)
            if response.status_code == 200:
                session_data = response.json()
                print(f"✅ Session data retrieved: User + Profile")
            else:
                print(f"❌ Get session failed: {response.status_code} - {response.text}")
        except Exception as e:
            print(f"❌ Get session error: {e}")
        
        print("\n" + "=" * 50)
        print("🎉 API testing completed!")

if __name__ == "__main__":
    asyncio.run(test_api())
