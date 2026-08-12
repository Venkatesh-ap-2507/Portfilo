"""
Skill Service
==============
Business logic for skill-related operations.
"""

from typing import List

from loguru import logger

from app.schemas.schemas import SkillCreate
from app.services.static_data import SKILLS_DATA


async def get_all_skills() -> List[dict]:
    """Fetch all skills grouped by category."""
    skills = sorted(SKILLS_DATA, key=lambda item: (
        item["category"], item["order"], item["name"]))
    logger.info(f"Fetched {len(skills)} skills")
    return skills


async def get_skills_by_category(category: str) -> List[dict]:
    """Fetch skills filtered by category."""
    return [skill for skill in SKILLS_DATA if skill.get("category") == category]


async def create_skill(skill_data: SkillCreate) -> dict:
    """Create a new skill."""
    skill = skill_data.model_dump()
    SKILLS_DATA.append(skill)
    logger.info(f"Created skill: {skill['name']}")
    return skill
