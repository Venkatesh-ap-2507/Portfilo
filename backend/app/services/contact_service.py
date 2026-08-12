"""
Contact Service
================
Business logic for contact form operations with input sanitization.
"""

from email.message import EmailMessage
import smtplib

import bleach
from loguru import logger

from app.config import get_settings
from app.schemas.schemas import ContactCreate


settings = get_settings()


def sanitize_input(text: str) -> str:
    """Sanitize user input to prevent XSS and injection attacks."""
    return bleach.clean(text, tags=[], strip=True).strip()


def _build_contact_email(contact: dict) -> EmailMessage:
    """Build a plain-text email for the portfolio owner."""
    recipient = settings.CONTACT_RECEIVER_EMAIL
    sender = settings.CONTACT_SENDER_EMAIL or settings.SMTP_USERNAME or recipient
    subject = contact.get("subject") or "New contact form submission"

    message = EmailMessage()
    message["Subject"] = f"[Portfolio Contact] {subject}"
    message["From"] = sender
    message["To"] = recipient
    message.set_content(
        "You received a new contact form submission from the portfolio website.\n\n"
        f"Name: {contact['name']}\n"
        f"Email: {contact['email']}\n"
        f"Subject: {contact.get('subject') or 'N/A'}\n"
        f"IP Address: {contact.get('ip_address') or 'N/A'}\n\n"
        f"Message:\n{contact['message']}\n"
    )
    return message


def send_contact_email(contact: dict) -> None:
    """Send the contact submission to the configured recipient email."""
    if not settings.SMTP_HOST:
        raise RuntimeError("SMTP_HOST is not configured")
    if not settings.CONTACT_RECEIVER_EMAIL:
        raise RuntimeError("CONTACT_RECEIVER_EMAIL is not configured")

    message = _build_contact_email(contact)

    with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=15) as server:
        if settings.SMTP_USE_TLS:
            server.starttls()
        if settings.SMTP_USERNAME and settings.SMTP_PASSWORD:
            server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
        server.send_message(message)


async def create_contact_message(
    contact_data: ContactCreate,
    ip_address: str | None = None,
) -> dict:
    """
    Create a new contact message with sanitized input.
    Stores the sender's IP for rate-limiting and abuse prevention.
    """
    contact = {
        "name": sanitize_input(contact_data.name),
        "email": contact_data.email,
        "subject": sanitize_input(contact_data.subject) if contact_data.subject else None,
        "message": sanitize_input(contact_data.message),
        "ip_address": ip_address,
    }
    logger.info(
        f"New contact message from {contact['name']} ({contact['email']})")
    send_contact_email(contact)
    logger.info(f"Contact email sent to {settings.CONTACT_RECEIVER_EMAIL}")
    return contact
