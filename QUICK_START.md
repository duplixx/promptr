# 🚀 Quick Start Guide - New Dashboard

## ⚡ 5-Minute Setup

### Step 1: Get Your API Key (2 minutes)

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the generated key

### Step 2: Configure Environment (1 minute)

Create a `.env.local` file in the project root:

```bash
# Create the file
touch .env.local

# Add your API key
echo "GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here" >> .env.local
```

Or manually create `.env.local` with:
```env
GOOGLE_GENERATIVE_AI_API_KEY=your_actual_api_key_here
```

### Step 3: Start the Server (2 minutes)

```bash
# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
```

### Step 4: Open Dashboard

Navigate to: **http://localhost:3000/dashboard**

That's it! 🎉

---

## 🎯 First Use

1. **Profile Setup**: Fill out the modal with your:
   - Skill level (Beginner/Intermediate/Advanced)
   - Expertise area
   - Learning style
   - Goals

2. **Try a Prompt**: Either:
   - Click on a suggested prompt
   - Or type your own

3. **Watch the Magic**: See AI responses stream in real-time!

---

## 🎨 What You'll See

### Main Interface
- **Left Sidebar**: Your profile and learning stats
- **Center Area**: Chat messages
- **Bottom**: Input box for your prompts
- **Top Right**: Profile menu

### Key Features
- ✨ Real-time streaming responses
- 🎨 Beautiful gradient design
- 📱 Fully responsive
- 🌙 Dark mode
- 💬 Markdown support
- 🎯 Smart prompt suggestions

---

## 🔧 Troubleshooting

### "API Key not found"
- ✅ Check `.env.local` exists
- ✅ Verify the key is correct
- ✅ Restart the dev server

### "Can't connect to API"
- ✅ Ensure dev server is running
- ✅ Check browser console for errors
- ✅ Verify `http://localhost:3000/api/chat` is accessible

### "Modal won't show"
- ✅ Clear browser cache
- ✅ Open in incognito mode
- ✅ Check localStorage

---

## 📚 Learn More

- Full Documentation: `DASHBOARD_GUIDE.md`
- Technical Changes: `DASHBOARD_CHANGES.md`
- Main README: `README.md`

---

## 🎓 Pro Tips

1. **Use Shift+Enter** for multi-line prompts
2. **Click suggestions** to try example prompts
3. **Toggle sidebar** for more chat space
4. **Try Challenge Mode** for practice problems

---

## 💡 Example Prompts to Try

```
1. "Explain quantum computing to a 10-year-old"

2. "Write a React component for a animated button with hover effects"

3. "Create a product description for an eco-friendly water bottle"

4. "Help me debug this error: [paste your error]"

5. "Generate 5 startup ideas combining AI and education"
```

---

**Ready to master prompt engineering? Start chatting! 💬**

Need help? Check the full guide or create an issue.

