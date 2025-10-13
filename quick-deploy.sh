#!/bin/bash

# Quick deployment script for Promptr
# This script helps you quickly deploy Promptr with proper configuration

set -e

echo "🚀 Promptr Quick Deployment Setup"
echo "=================================="
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from example..."
    cp .env.example .env
    echo "✅ .env file created!"
    echo ""
    echo "⚠️  IMPORTANT: Please edit the .env file with your actual credentials:"
    echo "   1. DATABASE_URL - Your MongoDB connection string"
    echo "   2. GOOGLE_GENERATIVE_AI_API_KEY - Your Google Gemini API key"
    echo "   3. NEXTAUTH_SECRET - Generate with: openssl rand -base64 32"
    echo "   4. NEXTAUTH_URL - Your deployment URL (or http://localhost:3000 for local)"
    echo ""
    read -p "Press Enter after you've edited the .env file..."
else
    echo "✅ .env file already exists!"
fi

echo ""
echo "🔍 Checking required environment variables..."

# Check if required variables are set
source .env

if [ -z "$DATABASE_URL" ] || [ "$DATABASE_URL" == "" ]; then
    echo "❌ DATABASE_URL is not set in .env file"
    exit 1
fi

if [ -z "$GOOGLE_GENERATIVE_AI_API_KEY" ] || [ "$GOOGLE_GENERATIVE_AI_API_KEY" == "" ]; then
    echo "❌ GOOGLE_GENERATIVE_AI_API_KEY is not set in .env file"
    exit 1
fi

if [ -z "$NEXTAUTH_SECRET" ] || [ "$NEXTAUTH_SECRET" == "" ]; then
    echo "❌ NEXTAUTH_SECRET is not set in .env file"
    echo "💡 Generate one with: openssl rand -base64 32"
    exit 1
fi

echo "✅ All required environment variables are set!"
echo ""

# Ask user for deployment type
echo "Choose deployment method:"
echo "  1) Docker (Recommended - includes frontend, backend, and MongoDB)"
echo "  2) Local Development (Frontend only)"
echo "  3) Exit"
echo ""
read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo ""
        echo "🐳 Starting Docker deployment..."
        
        # Check Docker availability
        if ! command -v docker &> /dev/null; then
            echo "❌ Docker is not installed. Please install Docker first."
            exit 1
        fi
        
        # Check Docker Compose
        if command -v docker-compose &> /dev/null; then
            DOCKER_COMPOSE="docker-compose"
        elif docker compose version &> /dev/null; then
            DOCKER_COMPOSE="docker compose"
        else
            echo "❌ Docker Compose is not installed."
            exit 1
        fi
        
        echo "✓ Using: $DOCKER_COMPOSE"
        echo ""
        echo "Building and starting services..."
        $DOCKER_COMPOSE up -d --build
        
        echo ""
        echo "✅ Deployment complete!"
        echo ""
        echo "🌐 Access your application at:"
        echo "   Frontend: http://localhost:3000"
        echo "   Backend API: http://localhost:8000"
        echo "   MongoDB: localhost:27017"
        echo ""
        echo "📊 Check status: ./docker-deploy.sh status"
        echo "📋 View logs: ./docker-deploy.sh logs"
        ;;
    
    2)
        echo ""
        echo "💻 Setting up local development environment..."
        
        # Check for package manager
        if command -v pnpm &> /dev/null; then
            PKG_MANAGER="pnpm"
        elif command -v npm &> /dev/null; then
            PKG_MANAGER="npm"
        else
            echo "❌ No package manager found. Please install Node.js and npm."
            exit 1
        fi
        
        echo "✓ Using: $PKG_MANAGER"
        echo ""
        
        # Install dependencies
        echo "📦 Installing dependencies..."
        if [ "$PKG_MANAGER" == "pnpm" ]; then
            pnpm install --no-frozen-lockfile
        else
            npm install
        fi
        
        echo ""
        echo "✅ Setup complete!"
        echo ""
        echo "🚀 To start the development server:"
        echo "   $PKG_MANAGER run dev"
        echo ""
        echo "⚠️  Note: This only runs the frontend. You'll need to deploy the backend separately."
        ;;
    
    3)
        echo "👋 Exiting..."
        exit 0
        ;;
    
    *)
        echo "❌ Invalid choice. Exiting..."
        exit 1
        ;;
esac

echo ""
echo "📚 For more deployment options, see DEPLOYMENT_COMPLETE.md"
echo ""
