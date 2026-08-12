"""
Certifications Router
=====================
API endpoints for certifications.
"""

from typing import List

from fastapi import APIRouter, Depends

from app.schemas.schemas import CertificationResponse, CertificationCreate
from app.services import certifications_service
from app.auth import verify_admin

router = APIRouter()


@router.get("/certifications", response_model=List[CertificationResponse])
async def get_certifications():
    """Fetch all certifications."""
    return await certifications_service.get_all_certifications()


@router.post("/certifications", response_model=CertificationResponse, status_code=201)
async def create_certification(
    cert_data: CertificationCreate,
    _admin: str = Depends(verify_admin),
):
    """Create a new certification (admin only)."""
    return await certifications_service.create_certification(cert_data)
