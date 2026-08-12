# Deployment Guide

Complete guide for deploying the AI Portfolio Website locally, with Docker, and on cloud platforms.

---

## 1. Running Locally (Development)

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 16
- Git

### Backend Setup

```bash
# Clone and navigate
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate
# Activate (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your values (DATABASE_URL, OLLAMA_HOST, OLLAMA_MODEL, OLLAMA_API_KEY, etc.)

# Run database migrations
alembic upgrade head

# Seed sample data
python -m app.seed

# Start development server
uvicorn app.main:app --reload --port 8000
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env .env.local
# Edit VITE_API_URL if needed

# Start development server
npm run dev
```

Backend runs at `http://localhost:8000`, Frontend at `http://localhost:5173`.
API docs available at `http://localhost:8000/api/docs`.

---

## 2. Running with Docker

### Prerequisites
- Docker & Docker Compose

### Quick Start

```bash
# From project root
cp .env.example .env
# Edit .env with your values

# Build and start all services
docker-compose up --build

# Run migrations inside container
docker exec -it portfolio_backend alembic upgrade head

# Seed data
docker exec -it portfolio_backend python -m app.seed
```

### Services
| Service  | URL                          |
|----------|------------------------------|
| Frontend | http://localhost:3000         |
| Backend  | http://localhost:8000         |
| Nginx    | http://localhost:80           |
| Postgres | localhost:5432               |
| API Docs | http://localhost:8000/api/docs|

### Useful Docker Commands

```bash
# Stop all services
docker-compose down

# View logs
docker-compose logs -f backend

# Rebuild specific service
docker-compose up --build backend

# Remove volumes (reset database)
docker-compose down -v
```

---

## 3. Deploy on AWS EC2

### Step 1: Launch EC2 Instance
- AMI: Ubuntu 22.04 LTS
- Instance type: t3.small (minimum)
- Security Group: Allow ports 22, 80, 443
- Storage: 20 GB minimum

### Step 2: Server Setup

```bash
# SSH into your instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo apt install docker-compose-plugin -y

# Logout and login again for docker group to take effect
exit
```

### Step 3: Deploy

```bash
# Clone your repository
git clone https://github.com/yourusername/ai-portfolio.git
cd ai-portfolio

# Configure environment
cp .env.example .env
nano .env  # Set production values

# Set APP_ENV=production in backend/.env
# Set OLLAMA_HOST, OLLAMA_MODEL, and OLLAMA_API_KEY
# Set strong SECRET_KEY and ADMIN_PASSWORD

# Build and start
docker compose up -d --build

# Run migrations
docker exec portfolio_backend alembic upgrade head
docker exec portfolio_backend python -m app.seed
```

### Step 4: Domain + SSL (with Certbot)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

Update nginx.conf to uncomment the HTTPS server block and set your domain.

---

## 4. Deploy on Render

### Backend (Web Service)
1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your repo, select `backend/` as root directory
4. Settings:
   - Runtime: Python 3
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables in Render dashboard
6. Add a PostgreSQL database from Render dashboard
7. Copy the database URL to `DATABASE_URL` env var

### Frontend (Static Site)
1. New Static Site on Render
2. Root directory: `frontend/`
3. Build Command: `npm install && npm run build`
4. Publish Directory: `dist`
5. Add env var: `VITE_API_URL=https://your-backend.onrender.com/api`

---

## 5. Deploy on Railway

### One-Click Deploy
1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub repo
3. Railway auto-detects Docker services
4. Add PostgreSQL plugin from Railway dashboard
5. Set environment variables in Railway dashboard
6. Railway provides automatic HTTPS

### Manual Setup

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

---

## 6. Deploy Frontend on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set Framework Preset: Vite
4. Root Directory: `frontend`
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Environment Variables:
   - `VITE_API_URL` = `https://your-backend-url.com/api`
8. Deploy

Vercel provides automatic HTTPS, CDN, and preview deployments.

---

## 7. Domain + SSL Setup

### Domain Configuration
1. Purchase domain from Namecheap, GoDaddy, Cloudflare, etc.
2. Add DNS records:
   - A Record: `@` → Your server IP
   - A Record: `www` → Your server IP
   - CNAME: `api` → Your backend server (if separate)

### SSL with Let's Encrypt (self-managed servers)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Generate certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Certificates auto-renew via cron
sudo certbot renew --dry-run
```

### SSL with Cloudflare (recommended)
1. Add your domain to Cloudflare
2. Change nameservers at your registrar
3. Enable "Full (Strict)" SSL mode
4. Cloudflare handles SSL automatically with free certificates

---

## Environment Variables Checklist (Production)

| Variable | Example | Required |
|----------|---------|----------|
| `APP_ENV` | `production` | Yes |
| `APP_DEBUG` | `false` | Yes |
| `SECRET_KEY` | `<random-64-char-string>` | Yes |
| `DATABASE_URL` | `postgresql+asyncpg://...` | Yes |
| `OPENAI_API_KEY` | `sk-...` | Yes |
| `OPENAI_MODEL` | `gpt-4o` | Yes |
| `CORS_ORIGINS` | `https://yourdomain.com` | Yes |
| `ADMIN_USERNAME` | `admin` | Yes |
| `ADMIN_PASSWORD` | `<strong-password>` | Yes |
| `LOG_LEVEL` | `INFO` | No |
| `VITE_API_URL` | `https://yourdomain.com/api` | Yes (frontend) |

### Generate a strong SECRET_KEY:
```bash
python -c "import secrets; print(secrets.token_urlsafe(64))"
```

---

## Production Checklist

- [ ] Set `APP_ENV=production` and `APP_DEBUG=false`
- [ ] Use a strong, unique `SECRET_KEY`
- [ ] Use a strong `ADMIN_PASSWORD`
- [ ] Set `CORS_ORIGINS` to your actual domain only
- [ ] Enable HTTPS with valid SSL certificate
- [ ] Set up database backups
- [ ] Configure log rotation
- [ ] Set up monitoring (health check endpoint: `/api/health`)
- [ ] Test rate limiting on chatbot and contact endpoints
- [ ] Remove or disable API docs in production (automatic when `APP_DEBUG=false`)
