from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import models, schemas
from app.auth import require_roles
from app.database import get_db

router = APIRouter(prefix="/investor", tags=["Investor"])


@router.get("/interests", response_model=schemas.InvestorInterestListResponse)
def list_interests(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_roles("investor")),
):
    interests = (
        db.query(models.InvestorInterest)
        .filter(models.InvestorInterest.investor_user_id == current_user.id)
        .all()
    )
    return schemas.InvestorInterestListResponse(
        items=[schemas.InvestorInterestOut.model_validate(i) for i in interests]
    )
