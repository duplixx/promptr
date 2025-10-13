# Docker Deployment Guide

This guide explains how to deploy the Promptr application using Docker Compose.

## Prerequisites

- Docker and Docker Compose installed
- Google Generative AI API key

## Environment Setup

1. Create a `.env` file in the root directory with the following variables:

```bash
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
```

## Deployment

### 1. Build and Start Services

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up --build -d
```

### 2. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **MongoDB**: localhost:27017

### 3. View Logs

```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs frontend
docker-compose logs backend
docker-compose logs mongodb
```

### 4. Stop Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: This will delete all data)
docker-compose down -v
```

## Services

### Frontend (Next.js)
- **Port**: 3000
- **Build**: Multi-stage Docker build with standalone output
- **Dependencies**: Node.js 18, pnpm

### Backend (FastAPI)
- **Port**: 8000
- **Build**: Python 3.11 slim image
- **Dependencies**: FastAPI, MongoDB, Google AI

### MongoDB
- **Port**: 27017
- **Image**: mongo:7.0
- **Authentication**: admin/password123
- **Database**: promptr

## Production Considerations

1. **Security**: Change all default passwords and secrets
2. **Environment Variables**: Use proper environment variable management
3. **SSL/TLS**: Configure reverse proxy with SSL certificates
4. **Monitoring**: Add health checks and monitoring
5. **Backup**: Implement MongoDB backup strategy
6. **Scaling**: Consider using Docker Swarm or Kubernetes for production

## Troubleshooting

### Common Issues

1. **Port Conflicts**: Ensure ports 3000, 8000, and 27017 are available
2. **API Key**: Verify Google Generative AI API key is set correctly
3. **MongoDB Connection**: Check MongoDB container is running and accessible
4. **Build Failures**: Clear Docker cache with `docker system prune -a`

### Debug Commands

```bash
# Check container status
docker-compose ps

# Execute commands in running containers
docker-compose exec backend bash
docker-compose exec frontend sh

# View container logs
docker-compose logs -f backend
```

## Development

For development with hot reloading:

```bash
# Run only specific services
docker-compose up mongodb backend

# Run frontend locally with npm/pnpm
pnpm dev
```
