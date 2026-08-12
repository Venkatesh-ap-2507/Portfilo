# AI Portfolio Website

Production-ready AI-powered portfolio website with React frontend, FastAPI backend, PostgreSQL database, and Ollama chatbot.

## Tech Stack
- **Generative AI:** Ollama, AWS Bedrock, Claude, LangChain, LangGraph, Prompt Engineering, Function Calling, Tool Calling, RAG, Multi-Agent Systems
- **Backend:** Python, FastAPI, Django, Flask, REST APIs, PostgreSQL, MySQL, SQLAlchemy, Pydantic, JWT
- **Cloud:** AWS EC2, Amazon S3, Amazon ECS, Amazon RDS, IAM, CloudWatch, Docker, GitHub Actions
- **AI Infrastructure:** FAISS, ChromaDB, Embeddings, Semantic Search, Vector Database, Structured Output, LLM Guardrails, Hallucination Mitigation

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local dev)
- Python 3.11+ (for local dev)
- PostgreSQL 16 (for local dev)

### Run with Docker
```bash
docker-compose up --build
```

### Run Locally

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables
Copy `.env.example` files in both `backend/` and `frontend/` directories.
For the chatbot, set `OLLAMA_HOST`, `OLLAMA_MODEL`, and `OLLAMA_API_KEY`. Ollama Cloud requests go to `https://ollama.com/api/chat`, and the model must be cloud-supported.

## Architecture
```
React (Vite) → Nginx (Reverse Proxy) → FastAPI → PostgreSQL
                                          ↓
                                      Ollama API
```

## API Endpoints
| Method | Endpoint       | Description                |
|--------|---------------|----------------------------|
| GET    | /api/projects  | List all projects          |
| GET    | /api/skills    | List all skills            |
| GET    | /api/experience| List all experiences       |
| POST   | /api/contact   | Submit contact form        |
| POST   | /api/chatbot   | AI chatbot interaction     |
| GET    | /api/health    | Health check               |

## License
MIT
