"""
Project Service
================
Business logic for project-related operations.
"""

from typing import List
from uuid import UUID

from loguru import logger

from app.schemas.schemas import ProjectCreate
from app.services.static_data import PROJECTS_DATA


async def get_all_projects() -> List[dict]:
    """Fetch all projects ordered by display order."""
    projects = sorted(PROJECTS_DATA, key=lambda item: (
        item["order"], item["title"]))
    logger.info(f"Fetched {len(projects)} projects")
    return projects


async def get_featured_projects() -> List[dict]:
    """Fetch only featured projects."""
    return [project for project in PROJECTS_DATA if project.get("featured")]


async def get_project_by_id(project_id: UUID) -> dict | None:
    """Fetch a single project by ID."""
    return next((project for project in PROJECTS_DATA if project.get("id") == str(project_id)), None)


async def create_project(project_data: ProjectCreate) -> dict:
    """Create a new project."""
    project = project_data.model_dump()
    PROJECTS_DATA.append(project)
    logger.info(f"Created project: {project['title']}")
    return project
