"""
Chatbot Router
===============
AI chatbot endpoint powered by Ollama.
"""

from fastapi import APIRouter, Request
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.schemas.schemas import ChatRequest, ChatResponse
from app.services import chatbot_service

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)


@router.post("/chatbot", response_model=ChatResponse)
@limiter.limit("20/minute")
async def chat(
    request: Request,
    chat_request: ChatRequest,
):
    """
    AI chatbot endpoint.
    Answers questions about the portfolio owner's professional profile.
    Rate limited to 20 requests per minute per IP.
    """
    ip_address = request.client.host if request.client else None
    return await chatbot_service.generate_chat_response(chat_request, ip_address)
