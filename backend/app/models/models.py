"""
SQLAlchemy Models
=================
Database models for the portfolio application.
"""

import uuid
from datetime import datetime

from sqlalchemy import Column, String, Text, Integer, Boolean, DateTime, Float, ARRAY
from sqlalchemy.dialects.postgresql import UUID

from app.database import Base


class Project(Base):
    """Project model - stores portfolio projects."""

    __tablename__ = "projects"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(200), nullable=False, index=True)
    description = Column(Text, nullable=False)
    long_description = Column(Text, nullable=True)
    tech_stack = Column(ARRAY(String), nullable=False, default=[])
    image_url = Column(String(500), nullable=True)
    github_url = Column(String(500), nullable=True)
    live_url = Column(String(500), nullable=True)
    category = Column(String(100), nullable=True)
    featured = Column(Boolean, default=False)
    order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow,
                        onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<Project {self.title}>"


class Skill(Base):
    """Skill model - stores technical skills."""

    __tablename__ = "skills"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), nullable=False, index=True)
    # e.g., "Backend", "Frontend", "AI/ML"
    category = Column(String(100), nullable=False)
    proficiency = Column(Integer, default=80)  # 0-100
    icon = Column(String(100), nullable=True)  # Icon name or URL
    order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Skill {self.name}>"


class Experience(Base):
    """Experience model - stores work experience."""

    __tablename__ = "experiences"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    company = Column(String(200), nullable=False)
    role = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    tech_used = Column(ARRAY(String), nullable=False, default=[])
    start_date = Column(String(20), nullable=False)  # "Jan 2023"
    end_date = Column(String(20), nullable=True)  # null = Present
    is_current = Column(Boolean, default=False)
    location = Column(String(200), nullable=True)
    order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Experience {self.role} @ {self.company}>"


class ContactMessage(Base):
    """Contact message model - stores contact form submissions."""

    __tablename__ = "contact_messages"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), nullable=False)
    email = Column(String(200), nullable=False)
    subject = Column(String(300), nullable=True)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    ip_address = Column(String(50), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<ContactMessage from {self.name}>"


class ChatLog(Base):
    """Chat log model - stores chatbot conversations for analytics."""

    __tablename__ = "chat_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_message = Column(Text, nullable=False)
    bot_response = Column(Text, nullable=False)
    confidence = Column(Float, nullable=True)
    ip_address = Column(String(50), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<ChatLog {self.id}>"
