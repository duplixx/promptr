# Deployment Guide - Promptr Frontend

This guide provides detailed instructions for deploying the Promptr frontend to various platforms.

## Prerequisites

Before deploying, ensure you have:
- A MongoDB database (MongoDB Atlas recommended for production)
- A Google Gemini API key
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Quick Deploy with Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/duplixx/promptr)

### Step-by-Step Vercel Deployment

1. **Sign up/Login to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up or log in with your GitHub account

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js configuration

3. **Configure Environment Variables**
   
   In the Vercel project settings, add:

   ```env
   # Database
   DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/promptr

   # AI API
   GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key

   # Authentication
   NEXTAUTH_SECRET=your_secret_key_here
   NEXTAUTH_URL=https://your-app.vercel.app

   # Optional: Skip env validation during build
   SKIP_ENV_VALIDATION=true
   ```

   To generate `NEXTAUTH_SECRET`:
   ```bash
   openssl rand -base64 32
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Your app will be live!

5. **Custom Domain (Optional)**
   - Go to Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

## Deploy to Netlify

1. **Connect Repository**
   - Log in to [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository

2. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

3. **Environment Variables**
   
   Add the same environment variables as Vercel in Site Settings → Environment Variables

4. **Deploy**
   - Click "Deploy site"
   - Your site will be live at `https://your-site.netlify.app`

## Deploy with Docker

### Build and Run Locally

1. **Create Dockerfile** (if not exists):

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ENV SKIP_ENV_VALIDATION true

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

2. **Build Docker Image**:
```bash
docker build -t promptr-frontend .
```

3. **Run Container**:
```bash
docker run -p 3000:3000 \
  -e DATABASE_URL="your_mongodb_url" \
  -e GOOGLE_GENERATIVE_AI_API_KEY="your_api_key" \
  -e NEXTAUTH_SECRET="your_secret" \
  -e NEXTAUTH_URL="http://localhost:3000" \
  promptr-frontend
```

### Deploy to Docker Hub

```bash
# Tag image
docker tag promptr-frontend your-username/promptr-frontend:latest

# Push to Docker Hub
docker push your-username/promptr-frontend:latest
```

## Deploy to Railway

1. **Connect Repository**
   - Visit [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"

2. **Configure**
   - Railway auto-detects Next.js
   - Add environment variables in Variables section

3. **Deploy**
   - Click "Deploy"
   - Get your deployment URL

## Deploy to AWS (EC2)

1. **Launch EC2 Instance**
   - Ubuntu 22.04 LTS recommended
   - t2.micro or larger

2. **SSH into Instance and Setup**:
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone repository
git clone https://github.com/duplixx/promptr.git
cd promptr

# Install dependencies
npm install

# Build
SKIP_ENV_VALIDATION=true npm run build

# Create ecosystem file for PM2
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'promptr',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      DATABASE_URL: 'your_mongodb_url',
      GOOGLE_GENERATIVE_AI_API_KEY: 'your_api_key',
      NEXTAUTH_SECRET: 'your_secret',
      NEXTAUTH_URL: 'http://your-ec2-ip:3000'
    }
  }]
}
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

3. **Configure Security Group**
   - Open port 3000 (or 80/443 with nginx)

## Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google Gemini API key | `AIza...` |
| `NEXTAUTH_SECRET` | NextAuth secret for sessions | Generate with: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Full URL of your deployed app | `https://promptr.vercel.app` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SKIP_ENV_VALIDATION` | Skip environment validation during build | `false` |
| `NODE_ENV` | Environment mode | `production` |

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify authentication works
- [ ] Test AI prompt analysis functionality
- [ ] Check responsive design on mobile
- [ ] Monitor error logs
- [ ] Set up analytics (optional)
- [ ] Configure custom domain (optional)
- [ ] Set up SSL certificate (handled automatically on Vercel/Netlify)

## Troubleshooting

### Build Failures

**Issue**: `Cannot find module` errors
- **Solution**: Delete `node_modules` and `.next`, then reinstall:
  ```bash
  rm -rf node_modules .next
  npm install
  npm run build
  ```

**Issue**: Environment variable errors
- **Solution**: Ensure all required env vars are set. Use `SKIP_ENV_VALIDATION=true` for build if needed.

### Runtime Issues

**Issue**: Database connection errors
- **Solution**: Verify `DATABASE_URL` is correct and MongoDB is accessible from deployment platform

**Issue**: NextAuth errors
- **Solution**: Ensure `NEXTAUTH_URL` matches your deployed URL exactly (including https://)

## Monitoring and Logs

### Vercel
- View logs in Vercel dashboard → Your Project → Deployments → Click deployment

### Netlify  
- View logs in Netlify dashboard → Site → Deploys → Click deployment

### Docker
```bash
docker logs [container-id]
```

### PM2 (EC2)
```bash
pm2 logs promptr
```

## Support

For deployment issues:
- Check [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- Visit our [GitHub Issues](https://github.com/duplixx/promptr/issues)
- Consult platform-specific documentation

Happy Deploying! 🚀
