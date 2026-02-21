import json
from sqlalchemy.orm import Session
from app import models


def record_audit(
    db: Session,
    actor: models.User,
    action: str,
    entity_type: str,
    entity_id: str,
    metadata: dict = None,
):
    import ulid
    log = models.AuditLog(
        id=f"aud_{ulid.new()}",
        actor_user_id=actor.id,
        actor_role=actor.role,
        action=action,
        entity_type=entity_type,
        entity_id=entity_id,
        metadata_json=json.dumps(metadata or {}),
    )
    db.add(log)
    db.commit()
