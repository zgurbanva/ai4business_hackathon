from typing import Optional
import uuid

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import models, schemas
from app.auth import require_roles
from app.database import get_db

router = APIRouter(prefix="/events", tags=["Events"])


@router.get("", response_model=schemas.EventListResponse)
def list_events(
    category: Optional[str] = None,
    sector: Optional[str] = None,
    topic: Optional[str] = None,
    db: Session = Depends(get_db),
):
    q = db.query(models.Event)
    if category:
        q = q.filter(models.Event.category == category)
    if sector:
        q = q.filter(models.Event.sector.ilike(f"%{sector}%"))
    if topic:
        q = q.filter(models.Event.topic.ilike(f"%{topic}%"))
    items = q.order_by(models.Event.start_date).all()
    return schemas.EventListResponse(items=[schemas.EventOut.model_validate(e) for e in items])


@router.post("", response_model=schemas.EventOut, status_code=201)
def create_event(
    payload: schemas.EventCreateRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_roles("iria_admin")),
):
    event = models.Event(
        id=f"evt_{uuid.uuid4().hex}",
        title=payload.title,
        description=payload.description,
        category=payload.category,
        sector=payload.sector,
        topic=payload.topic,
        start_date=payload.start_date,
        end_date=payload.end_date,
        location=payload.location,
        registration_url=payload.registration_url,
    )
    db.add(event)
    db.commit()
    db.refresh(event)
    return schemas.EventOut.model_validate(event)
