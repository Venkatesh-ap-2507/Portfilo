"""
Certifications Service
======================
Business logic for certification-related operations.
"""

from typing import List

from loguru import logger

from app.schemas.schemas import CertificationCreate
from app.services.static_data import CERTIFICATIONS_DATA


async def get_all_certifications() -> List[dict]:
    """Fetch all certifications sorted by order."""
    certs = sorted(CERTIFICATIONS_DATA, key=lambda item: item["order"])
    logger.info(f"Fetched {len(certs)} certifications")
    return certs


async def create_certification(cert_data: CertificationCreate) -> dict:
    """Create a new certification."""
    cert = cert_data.model_dump()
    CERTIFICATIONS_DATA.append(cert)
    logger.info(f"Created certification: {cert['title']}")
    return cert
