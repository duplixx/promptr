import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi, profileApi, apiUtils, type User, type UserProfileCreate, type UserProfileUpdate } from './api';

export interface UserProfile {
  level: string;
  expertise: string;
  learningStyle: string;
  goals: string[];
}

interface UserState {
  // User data
  user: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setOnboardingComplete: (completed: boolean) => void;
  
  // API Actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  loadUserData: () => Promise<void>;
  createProfile: (profileData: UserProfileCreate) => Promise<void>;
  updateProfile: (profileData: UserProfileUpdate) => Promise<void>;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
      // Initial state
      user: null,
      profile: null,
      isAuthenticated: false,
      hasCompletedOnboarding: false,
      isLoading: false,
      error: null,

      // Basic setters
      setUser: (user) => set({ user }),
      setProfile: (profile) => set({ profile }),
      setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      setOnboardingComplete: (completed) => set({ hasCompletedOnboarding: completed }),

      // API Actions
      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          
          await authApi.login({ email, password });
          const user = await authApi.getCurrentUser();
          
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          });
          
          // Try to load profile
          try {
            const sessionData = await profileApi.getSessionData();
            if (sessionData.profile) {
              set({ 
                profile: {
                  level: sessionData.profile.level,
                  expertise: sessionData.profile.expertise,
                  learningStyle: sessionData.profile.learning_style,
                  goals: sessionData.profile.goals,
                },
                hasCompletedOnboarding: true
              });
            }
          } catch {
            // Profile doesn't exist yet, that's okay
            console.log('No profile found, user needs to complete onboarding');
          }
        } catch (error) {
          const errorMessage = apiUtils.handleError(error);
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },

      register: async (email: string, name: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          
          await authApi.register({ email, name, password });
          
          // Auto-login after registration
          await get().login(email, password);
        } catch (error) {
          const errorMessage = apiUtils.handleError(error);
          set({ error: errorMessage, isLoading: false });
          throw error; // Re-throw the original error
        }
      },

      logout: () => {
        authApi.logout();
        set({
          user: null,
          profile: null,
          isAuthenticated: false,
          hasCompletedOnboarding: false,
          error: null,
        });
      },

      loadUserData: async () => {
        try {
          set({ isLoading: true, error: null });
          
          if (!authApi.isAuthenticated()) {
            set({ isLoading: false });
            return;
          }

          const sessionData = await profileApi.getSessionData();
          
          set({
            user: sessionData.user,
            isAuthenticated: true,
            profile: sessionData.profile ? {
              level: sessionData.profile.level,
              expertise: sessionData.profile.expertise,
              learningStyle: sessionData.profile.learning_style,
              goals: sessionData.profile.goals,
            } : null,
            hasCompletedOnboarding: !!sessionData.profile,
            isLoading: false,
          });
        } catch (error) {
          const errorMessage = apiUtils.handleError(error);
          set({ error: errorMessage, isLoading: false });
          
          // If it's an auth error, logout
          if (apiUtils.isApiError(error) && error.status === 401) {
            get().logout();
          }
        }
      },

      createProfile: async (profileData: UserProfileCreate) => {
        try {
          set({ isLoading: true, error: null });
          
          const profile = await profileApi.createProfile(profileData);
          
          set({
            profile: {
              level: profile.level,
              expertise: profile.expertise,
              learningStyle: profile.learning_style,
              goals: profile.goals,
            },
            hasCompletedOnboarding: true,
            isLoading: false,
          });
        } catch (error) {
          const errorMessage = apiUtils.handleError(error);
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },

      updateProfile: async (profileData: UserProfileUpdate) => {
        try {
          set({ isLoading: true, error: null });
          
          const profile = await profileApi.updateProfile(profileData);
          
          set({
            profile: {
              level: profile.level,
              expertise: profile.expertise,
              learningStyle: profile.learning_style,
              goals: profile.goals,
            },
            isLoading: false,
          });
        } catch (error) {
          const errorMessage = apiUtils.handleError(error);
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },

      clearUser: () => {
        authApi.logout();
        set({
          user: null,
          profile: null,
          isAuthenticated: false,
          hasCompletedOnboarding: false,
          error: null,
        });
      },
    })
);