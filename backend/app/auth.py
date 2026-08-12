"""
Authentication Module
======================
Basic authentication for admin-only endpoints.
Uses HTTP Basic Auth for simplicity; upgrade to JWT for production.
"""

import secrets

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials

from app.config import get_settings

security = HTTPBasic()
settings = get_settings()


async def verify_admin(
    credentials: HTTPBasicCredentials = Depends(security),
) -> str:
    """
    Verify admin credentials using constant-time comparison
    to prevent timing attacks.

    Returns:
        The admin username if verified.

    Raises:
        HTTPException 401 if credentials are invalid.
    """
    is_correct_username = secrets.compare_digest(
        credentials.username.encode("utf-8"),
        settings.ADMIN_USERNAME.encode("utf-8"),
    )
    is_correct_password = secrets.compare_digest(
        credentials.password.encode("utf-8"),
        settings.ADMIN_PASSWORD.encode("utf-8"),
    )

    if not (is_correct_username and is_correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin credentials",
            headers={"WWW-Authenticate": "Basic"},
        )

    return credentials.username
