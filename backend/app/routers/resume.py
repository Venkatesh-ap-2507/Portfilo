from fastapi import APIRouter
from fastapi.responses import FileResponse
from pathlib import Path

router = APIRouter()


@router.get("/resume")
def download_resume() -> FileResponse:
    pdf_path = Path(__file__).resolve().parent.parent / \
        "docs" / "VenkateshPensalwar_AIEngineer1.pdf"
    return FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename="VenkateshPensalwar_AIEngineer1.pdf",
    )
