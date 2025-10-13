#!/bin/bash

# Docker deployment script for Promptr

set -e

echo "🐳 Promptr Docker Deployment Script"
echo "=================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed (V2 or V1)
if command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE="docker-compose"
elif docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✓ Using: $DOCKER_COMPOSE"

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cat > .env << EOF
# Database
DATABASE_URL=mongodb://admin:password123@mongodb:27017/promptr?authSource=admin

# Google AI Configuration
GOOGLE_GENERATIVE_AI_API_KEY=your-google-ai-api-key-here

# MongoDB Configuration (for Docker Compose)
MONGODB_URL=mongodb://admin:password123@mongodb:27017/promptr?authSource=admin
DATABASE_NAME=promptr

# JWT Configuration
SECRET_KEY=your-super-secret-jwt-key-here-change-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=30

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-change-in-production

# Server Configuration
HOST=0.0.0.0
PORT=8000
DEBUG=false
EOF
    echo "📝 Please edit .env file with your actual configuration values."
    echo "   Especially set your GOOGLE_GENERATIVE_AI_API_KEY"
    read -p "Press Enter to continue after editing .env file..."
fi

# Function to show usage
show_usage() {
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  start     - Start all services"
    echo "  stop      - Stop all services"
    echo "  restart   - Restart all services"
    echo "  build     - Build all services"
    echo "  logs      - Show logs for all services"
    echo "  clean     - Stop and remove all containers and volumes"
    echo "  status    - Show status of all services"
    echo ""
}

# Function to start services
start_services() {
    echo "🚀 Starting Promptr services..."
    $DOCKER_COMPOSE up -d
    echo "✅ Services started successfully!"
    echo ""
    echo "🌐 Application URLs:"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend API: http://localhost:8000"
    echo "   MongoDB: localhost:27017"
    echo ""
    echo "📊 Check status with: $0 status"
    echo "📋 View logs with: $0 logs"
}

# Function to stop services
stop_services() {
    echo "🛑 Stopping Promptr services..."
    $DOCKER_COMPOSE down
    echo "✅ Services stopped successfully!"
}

# Function to restart services
restart_services() {
    echo "🔄 Restarting Promptr services..."
    $DOCKER_COMPOSE down
    $DOCKER_COMPOSE up -d
    echo "✅ Services restarted successfully!"
}

# Function to build services
build_services() {
    echo "🔨 Building Promptr services..."
    $DOCKER_COMPOSE build --no-cache
    echo "✅ Services built successfully!"
}

# Function to show logs
show_logs() {
    echo "📋 Showing logs for all services..."
    $DOCKER_COMPOSE logs -f
}

# Function to clean up
clean_up() {
    echo "🧹 Cleaning up Promptr services and data..."
    $DOCKER_COMPOSE down -v --remove-orphans
    docker system prune -f
    echo "✅ Cleanup completed successfully!"
}

# Function to show status
show_status() {
    echo "📊 Promptr services status:"
    echo "=========================="
    $DOCKER_COMPOSE ps
    echo ""
    echo "🔍 Health checks:"
    echo "   Backend: $(curl -s http://localhost:8000/health 2>/dev/null | grep -o '"status":"healthy"' || echo "❌ Not responding")"
    echo "   Frontend: $(curl -s http://localhost:3000 2>/dev/null | grep -q "html" && echo "✅ Responding" || echo "❌ Not responding")"
}

# Main script logic
case "${1:-start}" in
    start)
        start_services
        ;;
    stop)
        stop_services
        ;;
    restart)
        restart_services
        ;;
    build)
        build_services
        ;;
    logs)
        show_logs
        ;;
    clean)
        clean_up
        ;;
    status)
        show_status
        ;;
    help|--help|-h)
        show_usage
        ;;
    *)
        echo "❌ Unknown command: $1"
        echo ""
        show_usage
        exit 1
        ;;
esac
