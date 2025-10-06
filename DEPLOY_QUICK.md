# 🚀 Quick Deployment Guide

## One-Click Deploy to Vercel

Click the button below to deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/duplixx/promptr&env=DATABASE_URL,GOOGLE_GENERATIVE_AI_API_KEY,NEXTAUTH_SECRET,NEXTAUTH_URL&envDescription=Required%20environment%20variables%20for%20Promptr&envLink=https://github.com/duplixx/promptr/blob/main/DEPLOYMENT.md)

## Pre-Deployment Checklist

Before deploying, make sure you have:

- [ ] MongoDB database URL (get free tier at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- [ ] Google Gemini API key (get from [Google AI Studio](https://makersuite.google.com/app/apikey))
- [ ] NextAuth secret (generate: `openssl rand -base64 32`)

## Step-by-Step Deployment

### Option 1: Vercel (Recommended - Takes 5 minutes)

1. Click the "Deploy with Vercel" button above
2. Sign in to Vercel with GitHub
3. Add required environment variables:
   ```
   DATABASE_URL=mongodb+srv://...
   GOOGLE_GENERATIVE_AI_API_KEY=AIza...
   NEXTAUTH_SECRET=your_secret_here
   NEXTAUTH_URL=https://your-app.vercel.app (will be provided after initial deploy)
   ```
4. Click "Deploy"
5. Wait ~2 minutes for build
6. Update `NEXTAUTH_URL` with your deployment URL
7. ✅ Done! Your app is live

### Option 2: Netlify (Alternative)

1. Go to [Netlify](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Add environment variables (same as Vercel)
6. Deploy!

### Option 3: Docker (For Self-Hosting)

```bash
# Build
docker build -t promptr .

# Run
docker run -p 3000:3000 \
  -e DATABASE_URL="your_mongodb_url" \
  -e GOOGLE_GENERATIVE_AI_API_KEY="your_api_key" \
  -e NEXTAUTH_SECRET="your_secret" \
  promptr
```

## Environment Variables Quick Reference

| Variable | Where to Get | Required |
|----------|--------------|----------|
| `DATABASE_URL` | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) | ✅ Yes |
| `GOOGLE_GENERATIVE_AI_API_KEY` | [Google AI Studio](https://makersuite.google.com/app/apikey) | ✅ Yes |
| `NEXTAUTH_SECRET` | Generate: `openssl rand -base64 32` | ✅ Yes |
| `NEXTAUTH_URL` | Your deployed app URL | ✅ Yes (production) |

## Post-Deployment

After deploying:

1. ✅ Test authentication at `/sign-in`
2. ✅ Test AI chat at `/dashboard`
3. ✅ Verify all pages load correctly
4. ✅ Check mobile responsiveness
5. ✅ Set up custom domain (optional)

## Troubleshooting

**Build fails?**
- Check all environment variables are set correctly
- Try adding `SKIP_ENV_VALIDATION=true` to build environment

**Database connection fails?**
- Verify MongoDB connection string is correct
- Check IP whitelist in MongoDB Atlas (allow all: `0.0.0.0/0`)

**NextAuth errors?**
- Ensure `NEXTAUTH_URL` matches your deployed URL exactly
- Regenerate `NEXTAUTH_SECRET` if needed

## Need Help?

- 📖 [Full Deployment Guide](./DEPLOYMENT.md)
- 🐛 [Report Issues](https://github.com/duplixx/promptr/issues)
- 💬 [Discussions](https://github.com/duplixx/promptr/discussions)

## Automated Deployment (GitHub Actions)

This repository includes a GitHub Actions workflow for automated deployment to Vercel.

### Setup:

1. Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):
   - `VERCEL_TOKEN` - Get from [Vercel account settings](https://vercel.com/account/tokens)
   - `VERCEL_ORG_ID` - Run `vercel link` in your local repo to get this
   - `VERCEL_PROJECT_ID` - Also from `vercel link` command

2. Push to `main` branch to trigger automatic deployment

The workflow is configured in `.github/workflows/deploy.yml`

---

Happy Deploying! 🎉
