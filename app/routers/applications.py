from typing import Optional

import ulid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas
from app.audit import record_audit
from app.auth import get_current_user
from app.database import get_db

router = APIRouter(tags=["Applications"])


# ── Apply to program ──────────────────────────────────────────────────────────

@router.post("/programs/{program_id}/apply", response_model=schemas.ApplicationOut, status_code=201)
def apply_to_program(
    program_id: str,
    payload: schemas.ApplicationCreateRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    program = db.query(models.Program).filter(models.Program.id == program_id).first()
    if not program:
        raise HTTPException(status_code=404, detail="Program not found")
    if program.status != "open":
        raise HTTPException(status_code=400, detail="Program is closed for applications")

    startup = db.query(models.Startup).filter(models.Startup.id == payload.startup_id).first()
    if not startup:
        raise HTTPException(status_code=400, detail="Startup not found")
    if startup.owner_user_id != current_user.id and current_user.role != "iria_admin":
        raise HTTPException(status_code=403, detail="You can only apply on behalf of your own startup")

    existing = (
        db.query(models.Application)
        .filter(
            models.Application.program_id == program_id,
            models.Application.startup_id == payload.startup_id,
        )
        .first()
    )
    if existing:
        raise HTTPException(status_code=409, detail="Duplicate application")

    application = models.Application(
        id=f"app_{ulid.new()}",
        program_id=program_id,
        startup_id=payload.startup_id,
        submitted_by_user_id=current_user.id,
        status="submitted",
        cover_letter=payload.cover_letter,
    )
    db.add(application)
    db.commit()
    db.refresh(application)
    record_audit(db, current_user, "application_submitted", "application", application.id)
    return schemas.ApplicationOut.model_validate(application)


# ── List applications ──────────────────────────────────────────────────────────

@router.get("/applications", response_model=schemas.ApplicationListResponse)
def list_applications(
    status: Optional[str] = None,
    program_id: Optional[str] = None,
    startup_id: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    q = db.query(models.Application)

    if current_user.role == "startup":
        # Find startups owned by user
        owned_startup_ids = [
            s.id for s in db.query(models.Startup)
            .filter(models.Startup.owner_user_id == current_user.id).all()
        ]
        q = q.filter(models.Application.startup_id.in_(owned_startup_ids))
    elif current_user.role not in ("iria_admin",):
        # mentor/investor: show nothing for now (could be expanded)
        return schemas.ApplicationListResponse(items=[])

    if status:
        q = q.filter(models.Application.status == status)
    if program_id:
        q = q.filter(models.Application.program_id == program_id)
    if startup_id:
        q = q.filter(models.Application.startup_id == startup_id)

    items = q.all()
    return schemas.ApplicationListResponse(
        items=[schemas.ApplicationOut.model_validate(a) for a in items]
    )


# ── Get application ────────────────────────────────────────────────────────────

@router.get("/applications/{application_id}", response_model=schemas.ApplicationOut)
def get_application(
    application_id: str,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    app = db.query(models.Application).filter(models.Application.id == application_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    return schemas.ApplicationOut.model_validate(app)


# ── Update application status ──────────────────────────────────────────────────

@router.patch("/applications/{application_id}", response_model=schemas.ApplicationOut)
def update_application_status(
    application_id: str,
    payload: schemas.ApplicationStatusUpdateRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    if current_user.role != "iria_admin":
        raise HTTPException(status_code=403, detail="Insufficient permissions")
    app = db.query(models.Application).filter(models.Application.id == application_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    app.status = payload.status
    if payload.review_note is not None:
        app.review_note = payload.review_note
    db.commit()
    db.refresh(app)
    record_audit(db, current_user, "application_status_updated", "application", application_id,
                 {"new_status": payload.status})
    return schemas.ApplicationOut.model_validate(app)
