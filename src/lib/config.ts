/**
 * Application configuration
 */

export const config = {
  // Backend API URL
  backendUrl: process.env.BACKEND_URL || 'http://localhost:8000',
  
  // Next.js API routes
  apiUrl: process.env.NEXT_PUBLIC_API_URL || '',
  
  // Authentication
  auth: {
    tokenKey: 'auth_token',
    sessionKey: 'user_session',
  },
  
  // API endpoints
  endpoints: {
    auth: {
      login: '/api/auth/login',
      register: '/api/auth/register',
    },
    user: {
      me: '/api/user/me',
      profile: '/api/user/profile',
      session: '/api/user/session',
    },
    ai: {
      analyzePrompt: '/api/ai/analyze-prompt',
      generateProblems: '/api/ai/generate-problems',
    },
  },
} as const;
