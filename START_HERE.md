# 🚀 Deployment Setup - Start Here!

Welcome to the Promptr deployment guide! This document will help you get started quickly.

## 🎯 What You Need

Before deploying, gather these:

1. **MongoDB Database** - Get a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. **Google Gemini API Key** - Create at [Google AI Studio](https://makersuite.google.com/app/apikey)
3. **Generated Secret** - Run: `openssl rand -base64 32`

## 🏃 Quick Start (3 Steps)

### Step 1: Configure Environment

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your credentials
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/promptr"
GOOGLE_GENERATIVE_AI_API_KEY="your_api_key_here"
NEXTAUTH_SECRET="your_generated_secret_here"
NEXTAUTH_URL="http://localhost:3000"
```

### Step 2: Validate Setup

```bash
# Check if everything is configured correctly
./validate-deployment.sh
```

### Step 3: Deploy!

Choose one method:

```bash
# Option A: Interactive deployment (Recommended)
./quick-deploy.sh

# Option B: Docker directly
docker compose up -d

# Option C: Local development
pnpm install
pnpm dev
```

## 📚 Documentation Map

Choose the guide that fits your needs:

| Document | When to Use |
|----------|-------------|
| **This file (START_HERE.md)** | First time setup |
| [QUICK_DEPLOY_REFERENCE.md](QUICK_DEPLOY_REFERENCE.md) | Quick command reference |
| [DEPLOYMENT_COMPLETE.md](DEPLOYMENT_COMPLETE.md) | Comprehensive guide for all platforms |
| [DEPLOYMENT_FIX_SUMMARY.md](DEPLOYMENT_FIX_SUMMARY.md) | What was fixed/changed |
| [DOCKER_DEPLOYMENT.md](DOCKER_DEPLOYMENT.md) | Docker-specific details |

## 🛠️ Available Scripts

```bash
./validate-deployment.sh    # Check your setup before deploying
./quick-deploy.sh          # Interactive guided deployment
./docker-deploy.sh         # Docker management (start/stop/logs)
```

## 🌐 Access Your Application

After deployment:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## ✅ Verification Checklist

After deployment, verify:

- [ ] Frontend loads at http://localhost:3000
- [ ] Can create an account / login
- [ ] AI chat responds to prompts
- [ ] No errors in browser console
- [ ] Backend health check: http://localhost:8000/health

## 🆘 Having Issues?

1. **Run validation**: `./validate-deployment.sh`
2. **Check logs**: `docker compose logs -f`
3. **Review**: [DEPLOYMENT_COMPLETE.md](DEPLOYMENT_COMPLETE.md) - Troubleshooting section
4. **GitHub Issues**: Open an issue if problems persist

## 🎓 Deployment Options Explained

### 🐳 Docker (Recommended)
**Best for**: Complete local setup with all services

**Includes**: Frontend + Backend + MongoDB

**Command**: `docker compose up -d`

**Pros**: 
- Everything included
- Easy to start/stop
- Consistent environment

### ☁️ Vercel (Frontend Only)
**Best for**: Production frontend deployment

**Includes**: Frontend only (backend deployed separately)

**Steps**: See [DEPLOYMENT_COMPLETE.md](DEPLOYMENT_COMPLETE.md)

**Pros**:
- Free tier available
- Automatic SSL
- Global CDN

### 💻 Local Development
**Best for**: Development and testing

**Includes**: Frontend only (connects to remote backend)

**Command**: `pnpm dev`

**Pros**:
- Fast reload
- Easy debugging
- No Docker needed

## 📖 Next Steps

1. ✅ Complete the 3-step Quick Start above
2. 📚 Read [QUICK_DEPLOY_REFERENCE.md](QUICK_DEPLOY_REFERENCE.md) for common commands
3. 🐳 Learn Docker commands in [DOCKER_DEPLOYMENT.md](DOCKER_DEPLOYMENT.md)
4. 🌐 Deploy to production with [DEPLOYMENT_COMPLETE.md](DEPLOYMENT_COMPLETE.md)

## 🔐 Security Reminders

- ✅ Never commit `.env` files to Git
- ✅ Use strong, unique secrets
- ✅ Change default MongoDB passwords
- ✅ Use HTTPS in production
- ✅ Regularly rotate API keys

## 🤝 Need More Help?

- 📖 [Full Documentation](DEPLOYMENT_COMPLETE.md)
- 🐛 [Report Issues](https://github.com/duplixx/promptr/issues)
- 💬 Check existing GitHub Issues

---

**Ready to deploy?** Start with: `./validate-deployment.sh` then `./quick-deploy.sh` 🚀
