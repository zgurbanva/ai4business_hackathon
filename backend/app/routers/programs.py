from typing import Optional

import ulid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas
from app.auth import get_current_user, require_roles
from app.database import get_db

router = APIRouter(prefix="/programs", tags=["Programs"])


@router.get("", response_model=schemas.ProgramListResponse)
def list_programs(
    status: Optional[str] = None,
    type: Optional[str] = None,
    db: Session = Depends(get_db),
    _: models.User = Depends(get_current_user),
):
    q = db.query(models.Program)
    if status:
        q = q.filter(models.Program.status == status)
    if type:
        q = q.filter(models.Program.type == type)
    items = q.all()
    return schemas.ProgramListResponse(items=[schemas.ProgramOut.model_validate(p) for p in items])


@router.post("", response_model=schemas.ProgramOut, status_code=201)
def create_program(
    payload: schemas.ProgramCreateRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_roles("iria_admin")),
):
    program = models.Program(
        id=f"prg_{ulid.new()}",
        title=payload.title,
        type=payload.type,
        description=payload.description,
        status=payload.status,
        application_deadline=payload.application_deadline,
        eligibility_notes=payload.eligibility_notes,
    )
    db.add(program)
    db.commit()
    db.refresh(program)
    return schemas.ProgramOut.model_validate(program)


@router.get("/{program_id}", response_model=schemas.ProgramOut)
def get_program(
    program_id: str,
    db: Session = Depends(get_db),
    _: models.User = Depends(get_current_user),
):
    program = db.query(models.Program).filter(models.Program.id == program_id).first()
    if not program:
        raise HTTPException(status_code=404, detail="Program not found")
    return schemas.ProgramOut.model_validate(program)
