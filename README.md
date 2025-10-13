# 🧠 Prompt Engineering Learning Path 🚀

![Promptr Main Image](assets/main.png)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/duplixx/promptr)

Welcome to the most mind-bending, AI-whispering, prompt-perfecting learning experience this side of the singularity!

## 🌟 What's This All About?

Ever wanted to sweet-talk an AI? Well, you've come to the right place! Our Prompt Engineering Learning Path is like a gym for your AI communication skills. By the end, you'll be flexing those prompt muscles and making ChatGPT blush!

## ✨ NEW: Modern AI Dashboard

We've completely revamped the dashboard with cutting-edge AI technology! 🎉

### 🚀 What's New?
- **🌊 Real-time Streaming**: Watch AI responses appear instantly with Vercel AI SDK
- **🎨 Beautiful UI**: Modern gradient design with smooth animations
- **💬 Smart Chat**: Powered by Google Gemini 2.0 with personalized feedback
- **📊 Profile Tracking**: Monitor your learning journey with an intelligent sidebar
- **⚡ Prompt Suggestions**: Quick-start templates to get you inspired
- **📱 Fully Responsive**: Perfect experience on any device

**[📖 Read the Dashboard Guide](DASHBOARD_GUIDE.md)** | **[⚡ Quick Start in 5 Minutes](QUICK_START.md)**

## ✨ NEW: AI-Powered Challenge Mode

Challenge your prompt engineering skills with our revamped Challenge Mode! 🎯

### 🚀 What's New in Challenges?
- **🤖 AI Evaluation**: Real-time feedback powered by Google Gemini
- **📊 Detailed Scoring**: 0-100 scores with actionable suggestions
- **🎨 Modern UI**: Beautiful gradients and smooth animations
- **🏆 Progress Tracking**: Visual progress bars and completion badges
- **💡 Smart Feedback**: Learn what works and what doesn't
- **🎯 5 Challenges**: From Easy to Hard difficulty levels

**[📖 Challenge Mode Guide](CHALLENGE_MODE_GUIDE.md)** | **[🎯 Try Challenges](/problems/1)**

## 🎯 Features

- 🤖 Interactive ChatGPT-style interface powered by Vercel AI SDK
- 🧩 15 modules covering everything from "Hello, AI" to "Inception-level prompt inception"
- 🏋️‍♀️ Hands-on labs (No, you can't ask the AI to do them for you)
- 🌈 Beginner to Advanced paths (From "What's a prompt?" to "I am become prompt, destroyer of writer's block")
- 🎭 Role-playing exercises (Pretend you're Shakespeare asking GPT-4 for gardening tips)
- ⚡ Real-time streaming responses with Google Gemini
- 🎨 Modern, gradient-based dark theme
- 💾 Personalized learning profiles

## 🚀 Quick Start

1. **Clone this repo** (Time travel not included)
   ```bash
   git clone https://github.com/duplixx/promptr.git
   cd promptr
   ```

2. **Get your Google AI API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create an API key
   - Copy it for the next step

3. **Set up environment variables**
   ```bash
   # Create .env.local file
   echo "GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here" > .env.local
   ```

4. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open the app**
   - Homepage: [http://localhost:3000](http://localhost:3000)
   - Dashboard: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

**🎉 That's it! Start your journey to prompt mastery!**

> 💡 **First time?** Check out our [5-Minute Quick Start Guide](QUICK_START.md)

## 🗺️ Learning Path

1. **Beginner**: Learn to crawl (AI-assisted, of course)
2. **Intermediate**: Walk amongst the prompts
3. **Advanced**: Run circles around those pesky AI models
4. **God Mode**: Achieve prompt enlightenment (Disclaimer: May cause spontaneous haiku generation)

## 🛠️ Tech Stack

### Frontend
- [Next.js 14](https://nextjs.org/) - Because we're living in the future
- [React 18](https://reactjs.org/) - For UI wizardry
- [TypeScript](https://www.typescriptlang.org/) - For those who like their types static and their errors caught early
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Making things pretty (and accessible!)
- [Framer Motion](https://www.framer.com/motion/) - Smooth, powerful animations

### AI & Backend
- **[Vercel AI SDK](https://sdk.vercel.ai/)** - Modern AI streaming framework ⚡
- **[Google Gemini 2.0](https://ai.google.dev/)** - State-of-the-art AI model
- [FastAPI](https://fastapi.tiangolo.com/) - High-performance Python backend (optional)
- [NextAuth.js](https://next-auth.js.org/) - Authentication solution

### Database & Storage
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Prisma](https://www.prisma.io/) - Next-generation ORM

## 🚀 Deployment

### 📚 Complete Deployment Guide

For comprehensive deployment instructions covering both frontend and backend, see our **[Complete Deployment Guide](DEPLOYMENT_COMPLETE.md)**.

The guide covers:
- 🐳 Docker deployment (recommended for full-stack)
- ☁️ Vercel deployment (frontend)
- 🔧 Manual deployment
- 🔑 Environment variable setup
- 🛠️ Troubleshooting

### Quick Deploy Options

**Option 1: Quick Deploy Script**
```bash
./quick-deploy.sh
```

**Option 2: Docker (Full Stack)**
```bash
# Ensure .env file is configured
docker compose up -d
```

**Option 3: Vercel (Frontend Only)**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/duplixx/promptr)

### Deploy to Vercel (Recommended for Frontend)

The easiest way to deploy this Next.js app is to use [Vercel](https://vercel.com):

1. **Push your code to GitHub** (if you haven't already)

2. **Import your repository to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js

3. **Configure Environment Variables:**
   Add the following environment variables in your Vercel project settings:
   ```
   DATABASE_URL=your_mongodb_connection_string
   GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
   NEXTAUTH_SECRET=your_nextauth_secret (generate with: openssl rand -base64 32)
   NEXTAUTH_URL=https://your-deployment-url.vercel.app
   SKIP_ENV_VALIDATION=true
   ```

4. **Deploy!**
   - Click "Deploy"
   - Vercel will build and deploy your application
   - Your app will be live at `https://your-project.vercel.app`

### Deploy to Other Platforms

See [DEPLOYMENT_COMPLETE.md](DEPLOYMENT_COMPLETE.md) for detailed instructions on:
- Docker deployment (includes backend and MongoDB)
- Railway deployment
- AWS EC2 deployment
- Manual deployment options

### Environment Variables

Make sure to set these environment variables in your deployment platform:

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | MongoDB connection string | Yes |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google Gemini API key for AI features | Yes |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js (generate with `openssl rand -base64 32`) | Yes |
| `NEXTAUTH_URL` | Your deployed app URL | Yes (production only) |
| `SKIP_ENV_VALIDATION` | Skip env validation during build | Recommended for deployment |

## 🤝 Contributing

Found a bug? Want to add a feature? Have a prompt so good it made your AI assistant giggle? We welcome contributions! Check out our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Remember: With great prompt comes great responsibility!

## 📜 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details. (No, you can't prompt the AI to change the license terms)

## 🙏 Acknowledgments

- Gemini, for making us believe in the power of language models (and occasionally doubt our own existence)
- Coffee, for fueling late-night prompt engineering sessions
- Our AI overlords, for their benevolence in allowing us to create this project

Now go forth and prompt like you've never prompted before! May your tokens be plentiful and your hallucinations be minimal. Happy learning! 🎉
