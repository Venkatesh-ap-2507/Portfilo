"""
Compatibility shim for launching the backend from the repository root.

This extends the `app` package search path so `uvicorn app.main:app` can
resolve the existing FastAPI backend modules under `backend/app`.
"""

from __future__ import annotations

from pathlib import Path
from pkgutil import extend_path

__path__ = extend_path(__path__, __name__)  # type: ignore[name-defined]

_backend_app = Path(__file__).resolve().parent.parent / "backend" / "app"
if _backend_app.is_dir():
    __path__.append(str(_backend_app))
