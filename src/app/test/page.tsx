"use client";

import { useState } from "react";
import { useUserStore } from "@/lib/simple-store";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function TestPage() {
  const { 
    isAuthenticated, 
    user, 
    profile, 
    isLoading, 
    error, 
    login, 
    register, 
    logout, 
    createProfile 
  } = useUserStore();
  
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("testpass123");
  const [name, setName] = useState("Test User");

  const handleLogin = async () => {
    try {
      await login(email, password);
      console.log("Login successful");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegister = async () => {
    try {
      await register(email, name, password);
      console.log("Registration successful");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleCreateProfile = async () => {
    try {
      await createProfile({
        level: "beginner",
        expertise: "Software Development",
        learning_style: "visual",
        goals: ["Learn prompt engineering", "Improve coding skills"]
      });
      console.log("Profile created successfully");
    } catch (error) {
      console.error("Profile creation failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Integration Test</h1>
        
        {/* Status */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Status</h2>
          <div className="space-y-2 text-gray-300">
            <p>Authenticated: {isAuthenticated ? "✅ Yes" : "❌ No"}</p>
            <p>Loading: {isLoading ? "⏳ Yes" : "✅ No"}</p>
            <p>User: {user ? `${user.name} (${user.email})` : "None"}</p>
            <p>Profile: {profile ? `${profile.level} - ${profile.expertise}` : "None"}</p>
            {error && <p className="text-red-400">Error: {error}</p>}
          </div>
        </div>

        {/* Authentication */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Authentication</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="text-white block">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-white block">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700"
              />
            </div>
            <div>
              <label htmlFor="name" className="text-white block">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700"
              />
            </div>
            <div className="flex gap-4">
              <button 
                onClick={handleLogin} 
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Login
              </button>
              <button 
                onClick={handleRegister} 
                disabled={isLoading}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                Register
              </button>
              <button 
                onClick={logout}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 border border-gray-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Profile Management */}
        {isAuthenticated && (
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Profile Management</h2>
            <button 
              onClick={handleCreateProfile} 
              disabled={isLoading}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
            >
              Create Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
