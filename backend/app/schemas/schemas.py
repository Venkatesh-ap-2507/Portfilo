"""
Pydantic Schemas
================
Request/Response schemas for API validation and serialization.
"""

from datetime import datetime
from typing import List, Optional
from uuid import UUID

from pydantic import BaseModel, Field, EmailStr


# ══════════════════════════════════════════
# PROJECT SCHEMAS
# ══════════════════════════════════════════

class ProjectBase(BaseModel):
    """Base project schema."""
    title: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=1)
    long_description: Optional[str] = None
    tech_stack: List[str] = Field(default_factory=list)
    image_url: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    category: Optional[str] = None
    featured: bool = False
    order: int = 0


class ProjectCreate(ProjectBase):
    """Schema for creating a project."""
    pass


class ProjectResponse(ProjectBase):
    """Schema for project response."""
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ══════════════════════════════════════════
# SKILL SCHEMAS
# ══════════════════════════════════════════

class SkillBase(BaseModel):
    """Base skill schema."""
    name: str = Field(..., min_length=1, max_length=100)
    category: str = Field(..., min_length=1, max_length=100)
    proficiency: int = Field(default=80, ge=0, le=100)
    icon: Optional[str] = None
    order: int = 0


class SkillCreate(SkillBase):
    """Schema for creating a skill."""
    pass


class SkillResponse(SkillBase):
    """Schema for skill response."""
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True


# ══════════════════════════════════════════
# EXPERIENCE SCHEMAS
# ══════════════════════════════════════════

class ExperienceBase(BaseModel):
    """Base experience schema."""
    company: str = Field(..., min_length=1, max_length=200)
    role: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=1)
    tech_used: List[str] = Field(default_factory=list)
    start_date: str = Field(..., min_length=1, max_length=20)
    end_date: Optional[str] = None
    is_current: bool = False
    location: Optional[str] = None
    order: int = 0


class ExperienceCreate(ExperienceBase):
    """Schema for creating an experience."""
    pass


class ExperienceResponse(ExperienceBase):
    """Schema for experience response."""
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True


# ══════════════════════════════════════════
# CONTACT SCHEMAS
# ══════════════════════════════════════════

class ContactCreate(BaseModel):
    """Schema for contact form submission."""
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    subject: Optional[str] = Field(None, max_length=300)
    message: str = Field(..., min_length=10, max_length=5000)


class ContactResponse(BaseModel):
    """Schema for contact response."""
    id: UUID
    name: str
    email: str
    subject: Optional[str]
    message: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True


class ContactSuccess(BaseModel):
    """Success response for contact submission."""
    success: bool = True
    message: str = "Thank you for reaching out! I'll get back to you soon."


# ══════════════════════════════════════════
# CERTIFICATION SCHEMAS
# ══════════════════════════════════════════

class CertificationBase(BaseModel):
    """Base certification schema."""
    title: str = Field(..., min_length=1, max_length=300)
    issuer: str = Field(..., min_length=1, max_length=200)
    year: str = Field(..., min_length=4, max_length=4)
    file_path: Optional[str] = None
    order: int = 0


class CertificationCreate(CertificationBase):
    """Schema for creating a certification."""
    pass


class CertificationResponse(CertificationBase):
    """Schema for certification response."""
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True


# ══════════════════════════════════════════
# CHATBOT SCHEMAS
# ══════════════════════════════════════════

class ChatRequest(BaseModel):
    """Schema for chatbot request."""
    message: str = Field(..., min_length=1, max_length=1000,
                         description="User's message to the chatbot")


class ChatResponse(BaseModel):
    """Schema for chatbot response."""
    answer: str = Field(..., description="The chatbot's response")
    confidence: str = Field(...,
                            description="Confidence level: high, medium, or low")


# ══════════════════════════════════════════
# GENERIC SCHEMAS
# ══════════════════════════════════════════

class HealthResponse(BaseModel):
    """Health check response."""
    status: str = "healthy"
    version: str
    environment: str


class ErrorResponse(BaseModel):
    """Error response schema."""
    detail: str
    type: str = "error"
