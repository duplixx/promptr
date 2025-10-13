#!/bin/bash

# Deployment Validation Script for Promptr
# This script checks if your deployment setup is correct

echo "🔍 Promptr Deployment Validation"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check counter
CHECKS_PASSED=0
CHECKS_FAILED=0
WARNINGS=0

# Function to print results
print_success() {
    echo -e "${GREEN}✓${NC} $1"
    ((CHECKS_PASSED++))
}

print_error() {
    echo -e "${RED}✗${NC} $1"
    ((CHECKS_FAILED++))
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
    ((WARNINGS++))
}

print_info() {
    echo -e "ℹ $1"
}

# Check 1: .env file exists
echo "📋 Checking environment configuration..."
if [ -f .env ]; then
    print_success ".env file exists"
else
    print_error ".env file not found"
    print_info "   Run: cp .env.example .env"
    echo ""
    exit 1
fi

# Check 2: Load and validate environment variables
source .env 2>/dev/null || true

# Check DATABASE_URL
if [ ! -z "$DATABASE_URL" ]; then
    print_success "DATABASE_URL is set"
    if [[ "$DATABASE_URL" == mongodb+srv://* ]] || [[ "$DATABASE_URL" == mongodb://* ]]; then
        print_success "DATABASE_URL format looks correct"
    else
        print_warning "DATABASE_URL format may be incorrect (should start with mongodb:// or mongodb+srv://)"
    fi
else
    print_error "DATABASE_URL is not set"
fi

# Check GOOGLE_GENERATIVE_AI_API_KEY
if [ ! -z "$GOOGLE_GENERATIVE_AI_API_KEY" ]; then
    print_success "GOOGLE_GENERATIVE_AI_API_KEY is set"
    if [ ${#GOOGLE_GENERATIVE_AI_API_KEY} -gt 20 ]; then
        print_success "API key length looks valid"
    else
        print_warning "API key seems too short"
    fi
else
    print_error "GOOGLE_GENERATIVE_AI_API_KEY is not set"
fi

# Check NEXTAUTH_SECRET
if [ ! -z "$NEXTAUTH_SECRET" ]; then
    print_success "NEXTAUTH_SECRET is set"
    if [ ${#NEXTAUTH_SECRET} -ge 32 ]; then
        print_success "NEXTAUTH_SECRET length is adequate"
    else
        print_warning "NEXTAUTH_SECRET should be at least 32 characters (generate with: openssl rand -base64 32)"
    fi
else
    print_error "NEXTAUTH_SECRET is not set"
fi

# Check NEXTAUTH_URL
if [ ! -z "$NEXTAUTH_URL" ]; then
    print_success "NEXTAUTH_URL is set"
else
    print_error "NEXTAUTH_URL is not set"
fi

echo ""
echo "🐳 Checking Docker environment..."

# Check Docker installation
if command -v docker &> /dev/null; then
    print_success "Docker is installed ($(docker --version | cut -d' ' -f3 | tr -d ','))"
else
    print_warning "Docker is not installed (required for Docker deployment)"
fi

# Check Docker Compose
if command -v docker-compose &> /dev/null; then
    print_success "Docker Compose V1 is available ($(docker-compose --version | cut -d' ' -f3 | tr -d ','))"
elif docker compose version &> /dev/null; then
    print_success "Docker Compose V2 is available ($(docker compose version --short))"
else
    print_warning "Docker Compose is not installed (required for Docker deployment)"
fi

echo ""
echo "📦 Checking project files..."

# Check important files
files_to_check=(
    "package.json"
    "docker-compose.yml"
    "Dockerfile.frontend"
    "backend/Dockerfile"
    "backend/requirements.txt"
    "prisma/schema.prisma"
)

for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        print_success "$file exists"
    else
        print_error "$file is missing"
    fi
done

# Check if scripts are executable
echo ""
echo "🔧 Checking deployment scripts..."

scripts=(
    "docker-deploy.sh"
    "quick-deploy.sh"
)

for script in "${scripts[@]}"; do
    if [ -f "$script" ]; then
        if [ -x "$script" ]; then
            print_success "$script is executable"
        else
            print_warning "$script exists but is not executable (run: chmod +x $script)"
        fi
    else
        print_error "$script is missing"
    fi
done

# Check Node.js and package manager
echo ""
echo "📚 Checking development environment..."

if command -v node &> /dev/null; then
    print_success "Node.js is installed ($(node --version))"
else
    print_warning "Node.js is not installed (required for local development)"
fi

if command -v pnpm &> /dev/null; then
    print_success "pnpm is installed ($(pnpm --version))"
elif command -v npm &> /dev/null; then
    print_success "npm is installed ($(npm --version))"
    print_info "   Note: Project uses pnpm, consider installing it (npm install -g pnpm)"
else
    print_warning "No package manager found"
fi

# Check if dependencies are installed
if [ -d "node_modules" ]; then
    print_success "Dependencies are installed"
else
    print_warning "Dependencies not installed (run: pnpm install or npm install)"
fi

# Final summary
echo ""
echo "=================================="
echo "📊 Validation Summary"
echo "=================================="
echo -e "${GREEN}Passed:${NC}   $CHECKS_PASSED"
echo -e "${RED}Failed:${NC}   $CHECKS_FAILED"
echo -e "${YELLOW}Warnings:${NC} $WARNINGS"
echo ""

if [ $CHECKS_FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ Your setup looks good!${NC}"
    echo ""
    echo "🚀 Ready to deploy! Run one of:"
    echo "   ./quick-deploy.sh            (Interactive deployment)"
    echo "   docker compose up -d         (Docker deployment)"
    echo "   pnpm dev                     (Local development)"
    echo ""
else
    echo -e "${RED}✗ Please fix the errors above before deploying${NC}"
    echo ""
    echo "📚 For help, see:"
    echo "   DEPLOYMENT_COMPLETE.md       (Full guide)"
    echo "   QUICK_DEPLOY_REFERENCE.md    (Quick reference)"
    echo ""
    exit 1
fi

if [ $WARNINGS -gt 0 ]; then
    echo -e "${YELLOW}⚠ There are $WARNINGS warnings to review${NC}"
    echo ""
fi
