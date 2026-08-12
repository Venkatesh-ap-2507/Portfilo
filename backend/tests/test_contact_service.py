import pytest

from app.schemas.schemas import ContactCreate
from app.services import contact_service


class DummySMTP:
    last_instance = None

    def __init__(self, host, port, timeout=15):
        self.host = host
        self.port = port
        self.timeout = timeout
        self.started_tls = False
        self.login_args = None
        self.sent_message = None
        DummySMTP.last_instance = self

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc, tb):
        return False

    def starttls(self):
        self.started_tls = True

    def login(self, username, password):
        self.login_args = (username, password)

    def send_message(self, message):
        self.sent_message = message


@pytest.mark.asyncio
async def test_create_contact_message_sends_email(monkeypatch):
    monkeypatch.setattr(contact_service.settings,
                        "SMTP_HOST", "smtp.example.com")
    monkeypatch.setattr(contact_service.settings, "SMTP_PORT", 587)
    monkeypatch.setattr(contact_service.settings,
                        "SMTP_USERNAME", "sender@example.com")
    monkeypatch.setattr(contact_service.settings, "SMTP_PASSWORD", "secret")
    monkeypatch.setattr(contact_service.settings, "SMTP_USE_TLS", True)
    monkeypatch.setattr(contact_service.settings,
                        "CONTACT_RECEIVER_EMAIL", "owner@example.com")
    monkeypatch.setattr(contact_service.settings,
                        "CONTACT_SENDER_EMAIL", "no-reply@example.com")
    monkeypatch.setattr(contact_service.smtplib, "SMTP", DummySMTP)

    contact = await contact_service.create_contact_message(
        ContactCreate(
            name="John Doe",
            email="john@example.com",
            subject="Project inquiry",
            message="I would like to know more about your work.",
        ),
        ip_address="127.0.0.1",
    )

    smtp = DummySMTP.last_instance
    assert smtp is not None
    assert smtp.host == "smtp.example.com"
    assert smtp.port == 587
    assert smtp.started_tls is True
    assert smtp.login_args == ("sender@example.com", "secret")
    assert smtp.sent_message is not None
    assert smtp.sent_message["To"] == "owner@example.com"
    assert smtp.sent_message["From"] == "no-reply@example.com"
    assert "John Doe" in smtp.sent_message.get_content()
    assert contact["email"] == "john@example.com"
