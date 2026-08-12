"""
Skills Router
==============
API endpoints for technical skills.
"""

from typing import List, Optional

from fastapi import APIRouter, Depends, Query

from app.schemas.schemas import SkillResponse, SkillCreate
from app.services import skill_service
from app.auth import verify_admin

router = APIRouter()


@router.get("/skills", response_model=List[SkillResponse])
async def get_skills(
    category: Optional[str] = Query(None, description="Filter by category"),
):
    """Fetch all skills, optionally filtered by category."""
    if category:
        return await skill_service.get_skills_by_category(category)
    return await skill_service.get_all_skills()


@router.post("/skills", response_model=SkillResponse, status_code=201)
async def create_skill(
    skill_data: SkillCreate,
    _admin: str = Depends(verify_admin),
):
    """Create a new skill (admin only)."""
    return await skill_service.create_skill(skill_data)
