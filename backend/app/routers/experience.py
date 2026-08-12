"""
Experience Router
==================
API endpoints for work experience.
"""

from typing import List

from fastapi import APIRouter, Depends

from app.schemas.schemas import ExperienceResponse, ExperienceCreate
from app.services import experience_service
from app.auth import verify_admin

router = APIRouter()


@router.get("/experience", response_model=List[ExperienceResponse])
async def get_experiences():
    """Fetch all work experiences."""
    return await experience_service.get_all_experiences()


@router.post("/experience", response_model=ExperienceResponse, status_code=201)
async def create_experience(
    exp_data: ExperienceCreate,
    _admin: str = Depends(verify_admin),
):
    """Create a new experience entry (admin only)."""
    return await experience_service.create_experience(exp_data)
