# 🚀 Quick Deployment Reference

## Prerequisites
- MongoDB database (Atlas recommended)
- Google Gemini API key
- Docker (for Docker deployment)

## 1️⃣ Setup Environment Variables

```bash
# Copy example file
cp .env.example .env

# Edit .env and set these values:
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/promptr"
GOOGLE_GENERATIVE_AI_API_KEY="your_api_key_here"
NEXTAUTH_SECRET="run: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"
```

## 2️⃣ Choose Deployment Method

### 🐳 Docker (Recommended - Full Stack)
```bash
# Quick start
./quick-deploy.sh

# Or manually
docker compose up -d

# Check status
docker compose ps

# View logs
docker compose logs -f

# Stop services
docker compose down
```

**Access:**
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- MongoDB: localhost:27017

### ☁️ Vercel (Frontend Only)

1. Push to GitHub
2. Import to Vercel: https://vercel.com/new
3. Add environment variables in Vercel dashboard:
   - DATABASE_URL
   - GOOGLE_GENERATIVE_AI_API_KEY
   - NEXTAUTH_SECRET
   - NEXTAUTH_URL (use Vercel URL)
   - SKIP_ENV_VALIDATION=true
4. Deploy

**Note:** Backend must be deployed separately

### 💻 Local Development

```bash
# Install dependencies
pnpm install  # or npm install

# Generate Prisma client
pnpm prisma generate

# Start dev server
pnpm dev
```

**Access:** http://localhost:3000

## 🔑 Getting API Keys

### MongoDB Atlas
1. Visit https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Add to DATABASE_URL

### Google Gemini API
1. Visit https://makersuite.google.com/app/apikey
2. Create API key
3. Add to GOOGLE_GENERATIVE_AI_API_KEY

### NextAuth Secret
```bash
# Generate secure secret
openssl rand -base64 32
```

## 🛠️ Troubleshooting

### Build Errors
```bash
# Clear and rebuild
rm -rf node_modules .next
pnpm install
SKIP_ENV_VALIDATION=true pnpm build
```

### Docker Issues
```bash
# Clean restart
docker compose down -v
docker compose up -d --build
```

### Database Connection
- Check DATABASE_URL format
- Verify MongoDB Atlas IP whitelist (0.0.0.0/0 for development)
- Test connection string in MongoDB Compass

### Environment Variables
```bash
# Verify .env is loaded
cat .env

# For Docker, ensure .env exists in root
ls -la .env
```

## 📚 Full Documentation

- **Complete Guide:** [DEPLOYMENT_COMPLETE.md](DEPLOYMENT_COMPLETE.md)
- **Fix Summary:** [DEPLOYMENT_FIX_SUMMARY.md](DEPLOYMENT_FIX_SUMMARY.md)
- **Docker Guide:** [DOCKER_DEPLOYMENT.md](DOCKER_DEPLOYMENT.md)

## ✅ Post-Deployment Checklist

- [ ] Environment variables set correctly
- [ ] Frontend loads (http://localhost:3000)
- [ ] Backend responds (http://localhost:8000/health)
- [ ] Database connection works
- [ ] Can login/register
- [ ] AI chat works
- [ ] No console errors

## 🆘 Need Help?

1. Check [DEPLOYMENT_COMPLETE.md](DEPLOYMENT_COMPLETE.md) for detailed troubleshooting
2. Review environment variables in `.env`
3. Check Docker/application logs
4. Verify all services are running

---

**Quick Commands:**
```bash
# Start everything
./quick-deploy.sh

# Docker manual start
docker compose up -d

# Check status
docker compose ps

# Stop everything
docker compose down
```
