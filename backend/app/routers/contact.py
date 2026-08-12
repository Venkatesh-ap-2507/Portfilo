"""
Contact Router
===============
API endpoint for contact form submissions.
"""

from fastapi import APIRouter, Request
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.schemas.schemas import ContactCreate, ContactSuccess
from app.services import contact_service

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)


@router.post("/contact", response_model=ContactSuccess, status_code=201)
@limiter.limit("5/hour")
async def submit_contact(
    request: Request,
    contact_data: ContactCreate,
):
    """
    Submit a contact form message.
    Rate limited to 5 requests per hour per IP.
    """
    ip_address = request.client.host if request.client else None
    await contact_service.create_contact_message(contact_data, ip_address)
    return ContactSuccess()
