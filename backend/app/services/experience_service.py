"""
Experience Service
===================
Business logic for experience-related operations.
"""

from typing import List

from loguru import logger

from app.schemas.schemas import ExperienceCreate
from app.services.static_data import EXPERIENCES_DATA


async def get_all_experiences() -> List[dict]:
    """Fetch all experiences ordered by display order."""
    experiences = sorted(EXPERIENCES_DATA, key=lambda item: (
        item["order"], item["start_date"], item["company"]))
    logger.info(f"Fetched {len(experiences)} experiences")
    return experiences


async def create_experience(exp_data: ExperienceCreate) -> dict:
    """Create a new experience entry."""
    experience = exp_data.model_dump()
    EXPERIENCES_DATA.append(experience)
    logger.info(
        f"Created experience: {experience['role']} @ {experience['company']}")
    return experience
