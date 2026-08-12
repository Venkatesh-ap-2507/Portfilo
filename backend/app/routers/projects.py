"""
Projects Router
================
API endpoints for portfolio projects.
"""

from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status

from app.schemas.schemas import ProjectResponse, ProjectCreate
from app.services import project_service
from app.auth import verify_admin

router = APIRouter()


@router.get("/projects", response_model=List[ProjectResponse])
async def get_projects():
    """Fetch all portfolio projects."""
    return await project_service.get_all_projects()


@router.get("/projects/featured", response_model=List[ProjectResponse])
async def get_featured_projects():
    """Fetch only featured projects."""
    return await project_service.get_featured_projects()


@router.get("/projects/{project_id}", response_model=ProjectResponse)
async def get_project(project_id: UUID):
    """Fetch a single project by ID."""
    project = await project_service.get_project_by_id(project_id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )
    return project


@router.post("/projects", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
async def create_project(
    project_data: ProjectCreate,
    _admin: str = Depends(verify_admin),
):
    """Create a new project (admin only)."""
    return await project_service.create_project(project_data)
