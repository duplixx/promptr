# Complete Deployment Guide for Promptr

This guide covers deploying both the frontend (Next.js) and backend (FastAPI) components of Promptr.

## Table of Contents
- [Environment Setup](#environment-setup)
- [Docker Deployment (Recommended)](#docker-deployment-recommended)
- [Vercel Deployment (Frontend Only)](#vercel-deployment-frontend-only)
- [Manual Deployment](#manual-deployment)
- [Troubleshooting](#troubleshooting)

## Environment Setup

Before deploying, you need to configure the following environment variables:

### Required Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Database - MongoDB connection string (required)
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/promptr"

# AI / Google Gemini API (required)
GOOGLE_GENERATIVE_AI_API_KEY="your_gemini_api_key"

# Authentication (NextAuth.js) - required
NEXTAUTH_SECRET="your_secret_key_generate_with_openssl_rand_-base64_32"

# For production deployment, set to your deployed URL
NEXTAUTH_URL="http://localhost:3000"

# GitHub OAuth (Optional - for GitHub authentication)
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""

# Skip environment validation during build (useful for Docker/CI)
SKIP_ENV_VALIDATION=true
```

### How to Get Required Values

1. **DATABASE_URL**: 
   - Use MongoDB Atlas (https://www.mongodb.com/cloud/atlas)
   - Create a cluster and get the connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/promptr`

2. **GOOGLE_GENERATIVE_AI_API_KEY**:
   - Visit Google AI Studio: https://makersuite.google.com/app/apikey
   - Create an API key
   - Copy the key

3. **NEXTAUTH_SECRET**:
   - Generate using: `openssl rand -base64 32`
   - This should be a random secure string

4. **NEXTAUTH_URL**:
   - For local: `http://localhost:3000`
   - For production: Your actual deployment URL (e.g., `https://your-app.vercel.app`)

## Docker Deployment (Recommended)

Docker deployment includes both frontend and backend services with MongoDB.

### Prerequisites
- Docker and Docker Compose installed
- `.env` file configured with your environment variables

### Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/duplixx/promptr.git
   cd promptr
   ```

2. **Create `.env` file**:
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

3. **Start all services**:
   ```bash
   docker-compose up -d
   ```

4. **Check status**:
   ```bash
   docker-compose ps
   ```

5. **View logs**:
   ```bash
   docker-compose logs -f
   ```

### Services

After deployment, the following services will be available:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **MongoDB**: localhost:27017

### Production Deployment with Docker

For production deployment, use the production Docker Compose configuration:

```bash
docker-compose -f docker-compose.prod.yml up -d
```

This configuration includes:
- Resource limits
- Health checks
- Nginx reverse proxy (optional)
- Optimized builds

### Stopping Services

```bash
docker-compose down
```

To remove volumes as well:
```bash
docker-compose down -v
```

## Vercel Deployment (Frontend Only)

Vercel is recommended for frontend-only deployment. You'll need to deploy the backend separately.

### Prerequisites
- Vercel account (https://vercel.com)
- GitHub repository
- MongoDB Atlas database
- Backend deployed separately (or use a backend service)

### Steps

1. **Push your code to GitHub**

2. **Import to Vercel**:
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables** in Vercel project settings:
   ```
   DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/promptr
   GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
   NEXTAUTH_SECRET=your_secret_key
   NEXTAUTH_URL=https://your-app.vercel.app
   SKIP_ENV_VALIDATION=true
   ```

4. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your application

5. **Update NEXTAUTH_URL**:
   - After first deployment, update `NEXTAUTH_URL` with your actual Vercel URL
   - Trigger a redeployment

### Backend Deployment for Vercel

When deploying frontend to Vercel, you need to deploy the backend separately:

**Option 1: Deploy backend to Heroku/Railway/Render**
- Push backend code to a separate repository
- Deploy using their Python/FastAPI support
- Update frontend API calls to point to backend URL

**Option 2: Use Docker for backend only**
- Deploy backend using Docker on a VPS
- Keep MongoDB on Atlas
- Update frontend to connect to backend URL

## Manual Deployment

### Frontend Manual Deployment

1. **Install dependencies**:
   ```bash
   pnpm install
   # or
   npm install
   ```

2. **Set environment variables**:
   ```bash
   # Create .env.local or .env file
   cp .env.example .env
   # Edit with your values
   ```

3. **Build the project**:
   ```bash
   SKIP_ENV_VALIDATION=true pnpm build
   # or
   SKIP_ENV_VALIDATION=true npm run build
   ```

4. **Start the server**:
   ```bash
   pnpm start
   # or
   npm start
   ```

### Backend Manual Deployment

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set environment variables**:
   ```bash
   export MONGODB_URL="mongodb+srv://username:password@cluster.mongodb.net/promptr"
   export DATABASE_NAME="promptr"
   export GOOGLE_GENERATIVE_AI_API_KEY="your_api_key"
   export SECRET_KEY="your_secret_key"
   export NEXTAUTH_SECRET="your_nextauth_secret"
   export NEXTAUTH_URL="http://localhost:3000"
   ```

5. **Run the server**:
   ```bash
   python run.py
   ```

## Troubleshooting

### Build Failures

**Issue**: Environment variable validation errors
- **Solution**: Set `SKIP_ENV_VALIDATION=true` in your environment or `.env` file

**Issue**: `Cannot find module` errors
- **Solution**: 
  ```bash
  rm -rf node_modules .next
  pnpm install
  pnpm build
  ```

**Issue**: Prisma client errors
- **Solution**:
  ```bash
  pnpm prisma generate
  pnpm build
  ```

### Runtime Issues

**Issue**: Database connection errors
- **Solution**: 
  - Verify `DATABASE_URL` is correct
  - Ensure MongoDB is accessible from your deployment platform
  - Check if IP whitelist is configured in MongoDB Atlas

**Issue**: NextAuth errors
- **Solution**: 
  - Ensure `NEXTAUTH_URL` matches your deployed URL exactly (including https://)
  - Verify `NEXTAUTH_SECRET` is set
  - Check that `DATABASE_URL` is accessible

**Issue**: API key errors
- **Solution**: 
  - Verify `GOOGLE_GENERATIVE_AI_API_KEY` is valid
  - Check API key permissions in Google AI Studio

### Docker Issues

**Issue**: Port conflicts
- **Solution**: Ensure ports 3000, 8000, and 27017 are available

**Issue**: Build failures in Docker
- **Solution**:
  ```bash
  docker-compose down
  docker system prune -a
  docker-compose build --no-cache
  docker-compose up -d
  ```

**Issue**: MongoDB connection from containers
- **Solution**: 
  - Verify all services are on the same network
  - Use service names (e.g., `mongodb`) not `localhost` in container URLs

## Environment Variable Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | Yes | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/promptr` |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Yes | Google Gemini API key | `AIza...` |
| `NEXTAUTH_SECRET` | Yes | NextAuth secret for sessions | Generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Yes (prod) | Full URL of deployed app | `https://your-app.vercel.app` |
| `AUTH_GITHUB_ID` | No | GitHub OAuth Client ID | `abc123...` |
| `AUTH_GITHUB_SECRET` | No | GitHub OAuth Client Secret | `secret...` |
| `SKIP_ENV_VALIDATION` | No | Skip env validation during build | `true` |

## Post-Deployment Checklist

- [ ] All environment variables are set correctly
- [ ] Frontend loads successfully
- [ ] Backend API is accessible
- [ ] Database connection is working
- [ ] Authentication works (login/signup)
- [ ] AI chat functionality works
- [ ] Check browser console for errors
- [ ] Monitor logs for issues
- [ ] Set up SSL/TLS for production (HTTPS)
- [ ] Configure custom domain (optional)

## Security Recommendations

1. **Never commit `.env` files** to version control
2. **Use strong secrets** for `NEXTAUTH_SECRET` and `SECRET_KEY`
3. **Change default MongoDB credentials** in production
4. **Enable MongoDB authentication** and IP whitelisting
5. **Use HTTPS** in production (set `NEXTAUTH_URL` to https://)
6. **Regularly rotate API keys** and secrets
7. **Keep dependencies updated**

## Support

For issues or questions:
- Check the [main README](README.md)
- Review [Docker documentation](DOCKER_DEPLOYMENT.md)
- Open an issue on GitHub

## Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Docker Documentation](https://docs.docker.com/)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)
