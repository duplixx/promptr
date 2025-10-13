# 🐳 Promptr Docker Deployment

This repository includes complete Docker configuration for deploying the Promptr application with both frontend (Next.js) and backend (FastAPI) services.

## 📁 Docker Files Structure

```
promptr/
├── docker-compose.yml          # Development Docker Compose
├── docker-compose.prod.yml     # Production Docker Compose
├── Dockerfile.frontend         # Frontend Dockerfile
├── backend/
│   ├── Dockerfile              # Backend Dockerfile
│   └── .dockerignore           # Backend Docker ignore
├── .dockerignore               # Frontend Docker ignore
├── nginx.conf                  # Nginx configuration
├── docker-deploy.sh            # Deployment script
└── DOCKER_DEPLOYMENT.md        # Detailed deployment guide
```

## 🚀 Quick Start

### 1. Prerequisites

- Docker and Docker Compose installed
- Google Generative AI API key

### 2. Environment Setup

Create a `.env` file in the root directory:

```bash
# Google AI Configuration
GOOGLE_GENERATIVE_AI_API_KEY=your-google-ai-api-key-here

# MongoDB Configuration
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=your-secure-password-here
DATABASE_NAME=promptr

# JWT Configuration
SECRET_KEY=your-super-secret-jwt-key-here
ACCESS_TOKEN_EXPIRE_MINUTES=30

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here

# Server Configuration
HOST=0.0.0.0
PORT=8000
DEBUG=false
```

### 3. Deploy with Script

```bash
# Make script executable (if not already)
chmod +x docker-deploy.sh

# Start all services
./docker-deploy.sh start

# Check status
./docker-deploy.sh status

# View logs
./docker-deploy.sh logs
```

### 4. Manual Deployment

```bash
# Development
docker-compose up --build

# Production
docker-compose -f docker-compose.prod.yml up --build -d
```

## 🏗️ Services Architecture

### Frontend (Next.js)
- **Port**: 3000
- **Image**: Custom build with standalone output
- **Features**: SSR, API routes, authentication

### Backend (FastAPI)
- **Port**: 8000
- **Image**: Python 3.11 slim
- **Features**: REST API, MongoDB integration, Google AI

### MongoDB
- **Port**: 27017
- **Image**: mongo:7.0
- **Features**: Authentication, persistent storage

### Nginx (Production)
- **Port**: 80/443
- **Features**: Reverse proxy, SSL termination, rate limiting

## 🔧 Development vs Production

### Development (`docker-compose.yml`)
- Hot reloading enabled
- Debug mode on
- Volume mounts for live code changes
- Basic security

### Production (`docker-compose.prod.yml`)
- Optimized builds
- Resource limits
- Health checks
- Nginx reverse proxy
- Enhanced security
- SSL/TLS support

## 📊 Monitoring & Health Checks

### Health Endpoints
- Backend: `http://localhost:8000/health`
- Frontend: `http://localhost:3000`

### Docker Commands
```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs -f [service]

# Execute commands in containers
docker-compose exec backend bash
docker-compose exec frontend sh
```

## 🔒 Security Features

### Production Security
- Non-root containers
- Resource limits
- Rate limiting
- Security headers
- SSL/TLS support
- Environment variable isolation

### Security Headers
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Strict-Transport-Security (HTTPS)

## 🛠️ Troubleshooting

### Common Issues

1. **Port Conflicts**
   ```bash
   # Check port usage
   lsof -i :3000
   lsof -i :8000
   lsof -i :27017
   ```

2. **Build Failures**
   ```bash
   # Clear Docker cache
   docker system prune -a
   docker-compose build --no-cache
   ```

3. **MongoDB Connection Issues**
   ```bash
   # Check MongoDB logs
   docker-compose logs mongodb
   
   # Test connection
   docker-compose exec mongodb mongosh
   ```

4. **API Key Issues**
   ```bash
   # Verify environment variables
   docker-compose exec backend env | grep GOOGLE
   ```

### Debug Commands

```bash
# Container shell access
docker-compose exec backend bash
docker-compose exec frontend sh

# Database access
docker-compose exec mongodb mongosh

# Network inspection
docker network ls
docker network inspect promptr_promptr-network
```

## 📈 Scaling & Performance

### Resource Limits
- Backend: 1GB RAM limit, 512MB reservation
- Frontend: 1GB RAM limit, 512MB reservation
- MongoDB: 1GB RAM limit, 512MB reservation

### Optimization Tips
1. Use production Docker Compose for better performance
2. Enable MongoDB indexes for faster queries
3. Configure Nginx caching for static assets
4. Use CDN for frontend assets in production

## 🔄 Backup & Recovery

### MongoDB Backup
```bash
# Create backup
docker-compose exec mongodb mongodump --out /backup

# Restore backup
docker-compose exec mongodb mongorestore /backup
```

### Volume Backup
```bash
# Backup volumes
docker run --rm -v promptr_mongodb_data:/data -v $(pwd):/backup alpine tar czf /backup/mongodb-backup.tar.gz -C /data .
```

## 📝 Environment Variables Reference

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google AI API key | - | ✅ |
| `MONGO_ROOT_USERNAME` | MongoDB root username | admin | ❌ |
| `MONGO_ROOT_PASSWORD` | MongoDB root password | - | ✅ |
| `SECRET_KEY` | JWT secret key | - | ✅ |
| `NEXTAUTH_SECRET` | NextAuth secret | - | ✅ |
| `NEXTAUTH_URL` | Application URL | http://localhost:3000 | ❌ |

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section
2. Review Docker logs
3. Verify environment variables
4. Check network connectivity

## 📚 Additional Resources

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Docker Deployment](https://nextjs.org/docs/deployment#docker-image)
- [FastAPI Docker Deployment](https://fastapi.tiangolo.com/deployment/docker/)
- [MongoDB Docker Hub](https://hub.docker.com/_/mongo)
