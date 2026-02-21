from typing import Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import models, schemas
from app.auth import require_roles
from app.database import get_db

router = APIRouter(prefix="/audit", tags=["Audit"])


@router.get("/logs", response_model=schemas.AuditLogListResponse)
def list_audit_logs(
    actor_role: Optional[str] = None,
    action: Optional[str] = None,
    entity_type: Optional[str] = None,
    entity_id: Optional[str] = None,
    db: Session = Depends(get_db),
    _: models.User = Depends(require_roles("iria_admin")),
):
    q = db.query(models.AuditLog)
    if actor_role:
        q = q.filter(models.AuditLog.actor_role == actor_role)
    if action:
        q = q.filter(models.AuditLog.action == action)
    if entity_type:
        q = q.filter(models.AuditLog.entity_type == entity_type)
    if entity_id:
        q = q.filter(models.AuditLog.entity_id == entity_id)
    items = q.order_by(models.AuditLog.created_at.desc()).all()
    return schemas.AuditLogListResponse(
        items=[
            schemas.AuditLogOut(
                id=log.id,
                actor_user_id=log.actor_user_id,
                actor_role=log.actor_role,
                action=log.action,
                entity_type=log.entity_type,
                entity_id=log.entity_id,
                metadata=log.metadata,
                created_at=log.created_at,
            )
            for log in items
        ]
    )
