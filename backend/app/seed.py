"""
Database Seed Script
=====================
Populates the database with sample portfolio data.
Run: python -m app.seed
"""

import asyncio
import uuid
from datetime import datetime

from sqlalchemy.ext.asyncio import AsyncSession

from app.database import async_session, init_db
from app.models.models import Project, Skill, Experience
from app.logging_config import setup_logging
from loguru import logger


# ── Sample Projects ───────────────────────────────────────
SAMPLE_PROJECTS = [
    {
        "title": "Virtual Pain Clinic",
        "description": "An enterprise healthcare platform powered by Agentic AI that automates clinical intake, adaptive symptom screening, ICD-10 generation, and structured medical documentation using AWS Bedrock and LangGraph.",
        "long_description": "An enterprise healthcare solution built around agentic workflows for patient intake, adaptive question flow, medical documentation, and structured outputs using AWS Bedrock and LangGraph.",
        "tech_stack": ["Agentic AI", "AWS Bedrock", "LangGraph", "FastAPI", "React", "PostgreSQL", "Docker"],
        "github_url": "#",
        "live_url": "#",
        "category": "Healthcare AI",
        "featured": True,
        "order": 1,
    },
    {
        "title": "Hyundai AI Sales Assistant",
        "description": "An intelligent automotive assistant using LangGraph multi-agent workflows and Snowflake SQL retrieval for vehicle discovery, pricing comparison, and conversational recommendations.",
        "long_description": "A conversational automotive assistant that combines multi-agent reasoning and retrieval over Snowflake data for vehicle discovery and pricing comparison.",
        "tech_stack": ["LangGraph", "Snowflake", "GPT-4o", "RAG", "FastAPI", "Streamlit"],
        "github_url": "#",
        "category": "Automotive AI",
        "featured": True,
        "order": 2,
    },
    {
        "title": "Nexus AI",
        "description": "A modular enterprise AI platform featuring reusable LLM orchestration, RAG pipelines, vector embeddings, prompt templates, and document intelligence services.",
        "tech_stack": ["RAG", "Embeddings", "LangChain", "FastAPI", "PostgreSQL"],
        "github_url": "#",
        "category": "Enterprise AI",
        "featured": True,
        "order": 3,
    },
    {
        "title": "SmartMergeAI",
        "description": "An AI-powered GitHub pull request review assistant leveraging Retrieval-Augmented Generation to analyze repositories, summarize changes, and improve developer productivity.",
        "tech_stack": ["RAG", "GitHub API", "FastAPI", "LLM", "Python"],
        "github_url": "#",
        "category": "Developer AI",
        "featured": False,
        "order": 4,
    },
]

# ── Sample Skills ─────────────────────────────────────────
SAMPLE_SKILLS = [
    {"name": "OpenAI GPT-4o", "category": "Generative AI",
        "proficiency": 95, "icon": "openai", "order": 1},
    {"name": "AWS Bedrock", "category": "Generative AI",
        "proficiency": 92, "icon": "aws", "order": 2},
    {"name": "Claude", "category": "Generative AI",
        "proficiency": 90, "icon": "claude", "order": 3},
    {"name": "LangChain", "category": "Generative AI",
        "proficiency": 92, "icon": "langchain", "order": 4},
    {"name": "LangGraph", "category": "Generative AI",
        "proficiency": 90, "icon": "langgraph", "order": 5},

    {"name": "Python", "category": "Backend",
        "proficiency": 95, "icon": "python", "order": 1},
    {"name": "FastAPI", "category": "Backend",
        "proficiency": 95, "icon": "fastapi", "order": 2},
    {"name": "Django", "category": "Backend",
        "proficiency": 86, "icon": "django", "order": 3},
    {"name": "Flask", "category": "Backend",
        "proficiency": 84, "icon": "flask", "order": 4},
    {"name": "PostgreSQL", "category": "Backend",
        "proficiency": 88, "icon": "postgresql", "order": 5},
    {"name": "SQLAlchemy", "category": "Backend",
        "proficiency": 85, "icon": "sqlalchemy", "order": 6},
    {"name": "Pydantic", "category": "Backend",
        "proficiency": 88, "icon": "pydantic", "order": 7},

    {"name": "AWS EC2", "category": "Cloud",
        "proficiency": 84, "icon": "ec2", "order": 1},
    {"name": "Amazon S3", "category": "Cloud",
        "proficiency": 82, "icon": "s3", "order": 2},
    {"name": "Amazon ECS", "category": "Cloud",
        "proficiency": 80, "icon": "ecs", "order": 3},
    {"name": "Amazon RDS", "category": "Cloud",
        "proficiency": 82, "icon": "rds", "order": 4},
    {"name": "Docker", "category": "Cloud",
        "proficiency": 88, "icon": "docker", "order": 5},
    {"name": "GitHub Actions", "category": "Cloud",
        "proficiency": 83, "icon": "github-actions", "order": 6},

    {"name": "FAISS", "category": "AI Infrastructure",
        "proficiency": 90, "icon": "faiss", "order": 1},
    {"name": "ChromaDB", "category": "AI Infrastructure",
        "proficiency": 88, "icon": "chromadb", "order": 2},
    {"name": "Embeddings", "category": "AI Infrastructure",
        "proficiency": 91, "icon": "embeddings", "order": 3},
    {"name": "Semantic Search", "category": "AI Infrastructure",
        "proficiency": 90, "icon": "search", "order": 4},
    {"name": "RAG", "category": "AI Infrastructure",
        "proficiency": 93, "icon": "rag", "order": 5},
    {"name": "LLM Guardrails", "category": "AI Infrastructure",
        "proficiency": 89, "icon": "guardrails", "order": 6},
]

# ── Sample Experiences ────────────────────────────────────
SAMPLE_EXPERIENCES = [
    {
        "company": "64 Squares LLC",
        "role": "AI Engineer (Generative AI)",
        "description": "Designed enterprise multi-agent workflows, built healthcare Agentic AI platforms, developed Hyundai AI Sales Assistant, implemented RAG pipelines, created LLM Guardrails, and built FastAPI backend microservices on AWS Bedrock.",
        "tech_used": ["LangGraph", "AWS Bedrock", "FastAPI", "RAG", "Python", "PostgreSQL"],
        "start_date": "October 2024",
        "end_date": None,
        "is_current": True,
        "location": "Remote",
        "order": 1,
    },
    {
        "company": "FirstBit Solutions",
        "role": "Python Full Stack Developer",
        "description": "Developed scalable REST APIs, built JWT authentication, optimized PostgreSQL, designed backend architectures, and contributed to CMS platform development.",
        "tech_used": ["Python", "Django", "REST APIs", "JWT", "PostgreSQL"],
        "start_date": "Aug 2023",
        "end_date": "May 2024",
        "is_current": False,
        "location": "Hybrid",
        "order": 2,
    },
]


async def seed_database():
    """Seed the database with sample data."""
    setup_logging()
    await init_db()

    async with async_session() as session:
        async with session.begin():
            # Seed projects
            for project_data in SAMPLE_PROJECTS:
                project = Project(id=uuid.uuid4(), created_at=datetime.utcnow(
                ), updated_at=datetime.utcnow(), **project_data)
                session.add(project)
            logger.info(f"Seeded {len(SAMPLE_PROJECTS)} projects")

            # Seed skills
            for skill_data in SAMPLE_SKILLS:
                skill = Skill(id=uuid.uuid4(),
                              created_at=datetime.utcnow(), **skill_data)
                session.add(skill)
            logger.info(f"Seeded {len(SAMPLE_SKILLS)} skills")

            # Seed experiences
            for exp_data in SAMPLE_EXPERIENCES:
                experience = Experience(
                    id=uuid.uuid4(), created_at=datetime.utcnow(), **exp_data)
                session.add(experience)
            logger.info(f"Seeded {len(SAMPLE_EXPERIENCES)} experiences")

    logger.info("Database seeding completed successfully!")


if __name__ == "__main__":
    asyncio.run(seed_database())
