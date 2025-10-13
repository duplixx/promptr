/**
 * API service functions for backend communication
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

export interface User {
  id: string;
  email: string;
  name?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  level: string;
  expertise: string;
  learning_style: string;
  goals: string[];
  is_personalized: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserCreate {
  email: string;
  name?: string;
  password?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserProfileCreate {
  level: string;
  expertise: string;
  learning_style: string;
  goals: string[];
}

export interface UserProfileUpdate {
  level?: string;
  expertise?: string;
  learning_style?: string;
  goals?: string[];
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface SessionData {
  user: User;
  profile?: UserProfile;
  subscription?: {
    tier: 'free' | 'pro' | 'business';
    features: string[];
    limits: {
      dailyAnalyses: number;
      monthlyAnalyses: number;
      apiCalls: number;
    };
    expiresAt?: string;
  };
  progress?: {
    userId: string;
    totalXp: number;
    skills: Array<{
      skillId: string;
      category: string;
      level: number;
      maxLevel: number;
      xpEarned: number;
      unlocked: boolean;
    }>;
    achievements: string[];
    lastUpdated: string;
  };
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Get authentication token from localStorage
 */
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

/**
 * Set authentication token in localStorage
 */
function setAuthToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('auth_token', token);
}

/**
 * Remove authentication token from localStorage
 */
function removeAuthToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('auth_token');
}

/**
 * Get headers with authentication token
 */
function getAuthHeaders(): HeadersInit {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

/**
 * Handle API response and errors
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Unknown error' })) as { detail?: string };
    const errorMessage = errorData.detail ?? 'Request failed';
    throw new ApiError(response.status, errorMessage);
  }
  return response.json() as Promise<T>;
}

/**
 * User Authentication APIs
 */
export const authApi = {
  /**
   * Register a new user
   */
  async register(userData: UserCreate): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleResponse<User>(response);
  },

  /**
   * Login user and get access token
   */
  async login(loginData: UserLogin): Promise<TokenResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    });
    const tokenData = await handleResponse<TokenResponse>(response);
    setAuthToken(tokenData.access_token);
    return tokenData;
  },

  /**
   * Logout user
   */
  logout(): void {
    removeAuthToken();
  },

  /**
   * Get current user information
   */
  async getCurrentUser(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/api/user/me`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleResponse<User>(response);
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return getAuthToken() !== null;
  },
};

/**
 * User Profile APIs
 */
export const profileApi = {
  /**
   * Get user profile
   */
  async getProfile(): Promise<UserProfile> {
    const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleResponse<UserProfile>(response);
  },

  /**
   * Create or update user profile
   */
  async createProfile(profileData: UserProfileCreate): Promise<UserProfile> {
    const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData),
    });
    return handleResponse<UserProfile>(response);
  },

  /**
   * Update user profile (partial update)
   */
  async updateProfile(profileData: UserProfileUpdate): Promise<UserProfile> {
    const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData),
    });
    return handleResponse<UserProfile>(response);
  },

  /**
   * Get complete session data (user + profile + subscription + progress)
   */
  async getSessionData(): Promise<SessionData> {
    const response = await fetch(`${API_BASE_URL}/api/user/session`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleResponse<SessionData>(response);
  },
};

/**
 * Subscription APIs
 */
export const subscriptionApi = {
  /**
   * Get user subscription
   */
  async getSubscription(): Promise<SessionData['subscription']> {
    const response = await fetch(`${API_BASE_URL}/subscriptions/me`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleResponse<SessionData['subscription']>(response);
  },

  /**
   * Upgrade subscription
   */
  async upgradeSubscription(tier: 'pro' | 'business'): Promise<SessionData['subscription']> {
    const response = await fetch(`${API_BASE_URL}/subscriptions/upgrade`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ tier }),
    });
    return handleResponse<SessionData['subscription']>(response);
  },
};

/**
 * Progress APIs
 */
export const progressApi = {
  /**
   * Get user progress
   */
  async getProgress(): Promise<SessionData['progress']> {
    const response = await fetch(`${API_BASE_URL}/progress/me`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleResponse<SessionData['progress']>(response);
  },

  /**
   * Add XP to a skill
   */
  async addXpToSkill(skillId: string, xpAmount: number): Promise<SessionData['progress']> {
    const response = await fetch(`${API_BASE_URL}/progress/add-xp`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ skillId, xpAmount }),
    });
    return handleResponse<SessionData['progress']>(response);
  },

  /**
   * Get skill category progress
   */
  async getSkillCategoryProgress(category: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/progress/skills/${category}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  /**
   * Get overall progress
   */
  async getOverallProgress(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/progress/overall`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

/**
 * AI Analysis APIs
 */
export const aiApi = {
  /**
   * Analyze a prompt with AI feedback
   */
  async analyzePrompt(messages: Array<{ role: string; content: string }>, userType: {
    level: string;
    expertise: string;
    learning_style: string;
    goals: string[];
  }): Promise<unknown> {
    const response = await fetch(`${API_BASE_URL}/analyze-prompt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages,
        user_type: userType,
      }),
    });
    return handleResponse<unknown>(response);
  },

  /**
   * Generate personalized practice problems
   */
  async generateProblems(userType: {
    level: string;
    expertise: string;
    learning_style: string;
    goals: string[];
  }): Promise<unknown> {
    const response = await fetch(`${API_BASE_URL}/generate-problems`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userType),
    });
    return handleResponse<unknown>(response);
  },
};

/**
 * Utility functions
 */
export const apiUtils = {
  /**
   * Check if error is an API error
   */
  isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError;
  },

  /**
   * Get error message from any error
   */
  getErrorMessage(error: unknown): string {
    if (apiUtils.isApiError(error)) {
      return error.message;
    }
    if (error instanceof Error) {
      return error.message;
    }
    return 'An unexpected error occurred';
  },

  /**
   * Handle API errors with user-friendly messages
   */
  handleError(error: unknown): string {
    if (apiUtils.isApiError(error)) {
      switch (error.status) {
        case 401:
          return 'Authentication required. Please login again.';
        case 403:
          return 'You do not have permission to perform this action.';
        case 404:
          return 'The requested resource was not found.';
        case 422:
          return 'Invalid data provided. Please check your input.';
        case 500:
          return 'Server error. Please try again later.';
        default:
          return error.message;
      }
    }
    return apiUtils.getErrorMessage(error);
  },
};
