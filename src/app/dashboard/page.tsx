"use client";

import { useEffect, useState, useRef } from "react";
import { useUserStore } from "@/lib/simple-store";
import UserInputModal from "./_components/UserInputModal";
import AuthModal from "@/components/AuthModal";
import ModernChatInterface from "./_components/ModernChatInterface";
import SkillTree from "@/components/SkillTree";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogOut, User, Award, Target, BookOpen, TrendingUp, X, Crown, Zap, Building } from "lucide-react";

export default function DashboardPage() {
  const { 
    isAuthenticated, 
    hasCompletedOnboarding, 
    profile, 
    user, 
    subscription,
    progress,
    logout, 
    loadUserData 
  } = useUserStore();
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const profileCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load user data on mount
    void loadUserData();
  }, [loadUserData]); // Empty dependency array to run only once on mount

  // Handle click outside to close profile card
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileCardRef.current && !profileCardRef.current.contains(event.target as Node)) {
        setShowProfileCard(false);
      }
    };

    if (showProfileCard) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileCard]);

  const handleLogout = () => {
    logout();
  };

  const toggleProfileCard = () => {
    setShowProfileCard(!showProfileCard);
  };

  // Debug logging
  console.log('Dashboard Debug:', {
    isAuthenticated,
    hasCompletedOnboarding,
    profile,
    user,
    subscription,
    progress
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to Promptr</h1>
          <p className="text-gray-400 mb-8">Sign in to start your AI learning journey</p>
          <Button
            onClick={() => setShowAuthModal(true)}
            className="bg-gradient-to-r from-[#FFA9AE] via-[#8D81FF] to-[#69E1FE] text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-all"
          >
            Get Started
          </Button>
        </div>
        
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {!hasCompletedOnboarding ? (
        <>
          {/* Header for onboarding */}
          <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                  {user && (
                    <p className="text-gray-400">Welcome back, {user.name ?? user.email}</p>
                  )}
                </div>
                
                <div className="flex items-center gap-4 relative">
                  <Button
                    variant="outline"
                    onClick={toggleProfileCard}
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>

                  {/* Profile Card */}
                  {showProfileCard && profile && (
                    <div
                      ref={profileCardRef}
                      className="absolute top-12 right-0 z-50 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-xl backdrop-blur-sm"
                    >
                      <Card className="border-0 bg-transparent">
                        <CardContent className="p-4">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">Your Profile</h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowProfileCard(false)}
                              className="text-gray-400 hover:text-white"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* User Info */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                                {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                              </div>
                              <div>
                                <p className="text-white font-medium">{user?.name || 'User'}</p>
                                <p className="text-gray-400 text-sm">{user?.email}</p>
                              </div>
                            </div>

                            {/* Profile Details */}
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Award className="h-4 w-4 text-indigo-400" />
                                <span className="text-gray-300 text-sm">Level:</span>
                                <Badge variant="outline" className="border-indigo-500/30 bg-indigo-900/20 text-indigo-300">
                                  {profile.level}
                                </Badge>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Target className="h-4 w-4 text-purple-400" />
                                <span className="text-gray-300 text-sm">Expertise:</span>
                                <span className="text-white text-sm">{profile.expertise}</span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-cyan-400" />
                                <span className="text-gray-300 text-sm">Learning Style:</span>
                                <span className="text-white text-sm capitalize">{profile.learningStyle}</span>
                              </div>
                            </div>

                            {/* Goals */}
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="h-4 w-4 text-emerald-400" />
                                <span className="text-gray-300 text-sm">Goals:</span>
                              </div>
                              <div className="space-y-1">
                                {profile.goals.map((goal, index) => (
                                  <div key={index} className="text-white text-sm bg-gray-800/50 rounded px-2 py-1">
                                    {goal}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Subscription Status */}
                            <div className="pt-3 border-t border-gray-700">
                              <div className="flex items-center gap-2 mb-2">
                                {(!subscription || subscription.tier === 'free') && <User className="h-4 w-4 text-gray-400" />}
                                {subscription?.tier === 'pro' && <Crown className="h-4 w-4 text-yellow-400" />}
                                {subscription?.tier === 'business' && <Building className="h-4 w-4 text-blue-400" />}
                                <span className="text-gray-300 text-sm">Plan:</span>
                                <Badge 
                                  variant="outline" 
                                  className={`${
                                    (!subscription || subscription.tier === 'free')
                                      ? 'border-gray-500/30 bg-gray-900/20 text-gray-300'
                                      : subscription.tier === 'pro'
                                      ? 'border-yellow-500/30 bg-yellow-900/20 text-yellow-300'
                                      : 'border-blue-500/30 bg-blue-900/20 text-blue-300'
                                  }`}
                                >
                                  {subscription?.tier?.toUpperCase() || 'FREE'}
                                </Badge>
                              </div>
                              <div className="text-xs text-gray-400">
                                {(!subscription || subscription.tier === 'free') && (
                                  <span>Daily analyses: {subscription?.limits?.dailyAnalyses || 5}/5</span>
                                )}
                                {subscription?.tier === 'pro' && (
                                  <span>Unlimited analyses • Advanced features</span>
                                )}
                                {subscription?.tier === 'business' && (
                                  <span>Team features • API access • Custom integrations</span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="mt-4 pt-3 border-t border-gray-700 space-y-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setShowProfileCard(false);
                                setShowProfileModal(true);
                              }}
                              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                            >
                              Edit Profile
                            </Button>
                            
                            {(!subscription || subscription.tier === 'free') && (
                              <Button
                                size="sm"
                                onClick={() => {
                                  setShowProfileCard(false);
                                  // TODO: Open upgrade modal
                                  console.log('Upgrade to Pro');
                                }}
                                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600"
                              >
                                <Crown className="h-4 w-4 mr-2" />
                                Upgrade to Pro
                              </Button>
                            )}
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setShowProfileCard(false);
                                // TODO: Open skill tree modal
                                console.log('View Skill Tree');
                              }}
                              className="w-full border-emerald-600 text-emerald-300 hover:bg-emerald-800"
                            >
                              <TrendingUp className="h-4 w-4 mr-2" />
                              View Progress
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content for onboarding */}
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Complete Your Profile</h2>
              <p className="text-gray-400 mb-8">
                Let&apos;s personalize your learning experience
              </p>
              <Button
                onClick={() => setShowProfileModal(true)}
                className="bg-gradient-to-r from-[#FFA9AE] via-[#8D81FF] to-[#69E1FE] text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-all"
              >
                Complete Profile
              </Button>
            </div>
          </div>
        </>
      ) : (
        /* Full-screen Chat Interface */
        <ModernChatInterface />
      )}

      {/* Modals */}
      <UserInputModal 
        isOpen={showProfileModal} 
        onClose={() => setShowProfileModal(false)} 
      />
    </div>
  );
}
