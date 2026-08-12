"""
Health Check Router
====================
System health and readiness endpoints.
"""

from fastapi import APIRouter

from app.config import get_settings
from app.schemas.schemas import HealthResponse

router = APIRouter()
settings = get_settings()


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """Check if the API is healthy and running."""
    return HealthResponse(
        status="healthy",
        version=settings.APP_VERSION,
        environment=settings.APP_ENV,
    )
