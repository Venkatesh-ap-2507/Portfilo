"""
FastAPI Main Application
========================
Entry point for the AI Portfolio Backend API.
Configures middleware, routers, and lifecycle events.
"""

from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from loguru import logger
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

from app.config import get_settings
from app.logging_config import setup_logging
from app.routers import projects, skills, experience, contact, chatbot, health, resume, certifications


# ── Settings ──────────────────────────────────────────────
settings = get_settings()

# ── Rate Limiter ──────────────────────────────────────────
limiter = Limiter(key_func=get_remote_address)


# ── Lifecycle ─────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application startup and shutdown events."""
    setup_logging()
    logger.info(f"Starting {settings.APP_NAME} v{settings.APP_VERSION}")
    logger.info("Application started successfully")
    yield
    logger.info("Application shut down gracefully")


# ── App Instance ──────────────────────────────────────────
app = FastAPI(
    title=settings.APP_NAME,
    description="AI-powered portfolio website API with chatbot",
    version=settings.APP_VERSION,
    docs_url="/api/docs" if settings.APP_DEBUG else None,
    redoc_url="/api/redoc" if settings.APP_DEBUG else None,
    openapi_url="/api/openapi.json" if settings.APP_DEBUG else None,
    lifespan=lifespan,
)

# ── Rate Limiter State ────────────────────────────────────
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)


# ── CORS Middleware ───────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["X-Request-ID"],
    max_age=600,
)


# ── Global Exception Handler ─────────────────────────────
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Catch-all exception handler for unhandled errors."""
    logger.error(f"Unhandled exception: {exc} | Path: {request.url.path}")
    return JSONResponse(
        status_code=500,
        content={
            "detail": "An internal server error occurred.",
            "type": "internal_error",
        },
    )


# ── Request Logging Middleware ────────────────────────────
@app.middleware("http")
async def log_requests(request: Request, call_next):
    """Log all incoming requests and their response status."""
    logger.info(f"→ {request.method} {request.url.path}")
    response = await call_next(request)
    logger.info(
        f"← {request.method} {request.url.path} | Status: {response.status_code}")
    return response


# ── Register Routers ─────────────────────────────────────
app.include_router(health.router, prefix="/api", tags=["Health"])
app.include_router(projects.router, prefix="/api", tags=["Projects"])
app.include_router(skills.router, prefix="/api", tags=["Skills"])
app.include_router(experience.router, prefix="/api", tags=["Experience"])
app.include_router(certifications.router, prefix="/api",
                   tags=["Certifications"])
app.include_router(contact.router, prefix="/api", tags=["Contact"])
app.include_router(chatbot.router, prefix="/api", tags=["Chatbot"])
app.include_router(resume.router, prefix="/api", tags=["Resume"])

# ── Mount Static Files ────────────────────────────────────
docs_path = Path(__file__).parent / "docs"
if docs_path.exists():
    app.mount("/api/docs-files",
              StaticFiles(directory=str(docs_path)), name="docs")
