from collections import Counter
from datetime import datetime, timezone

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import models, schemas
from app.auth import require_roles
from app.database import get_db

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/kpis", response_model=schemas.KpiDashboard)
def get_kpis(
    db: Session = Depends(get_db),
    _: models.User = Depends(require_roles("iria_admin")),
):
    startups = db.query(models.Startup).all()
    total_startups = len(startups)
    total_programs = db.query(models.Program).count()
    applications_submitted = db.query(models.Application).count()
    investor_interest_count = db.query(models.InvestorInterest).count()

    scores = [s.latest_success_score for s in startups if s.latest_success_score is not None]
    avg_score = round(sum(scores) / len(scores), 2) if scores else None

    sector_counter = Counter(s.sector for s in startups)
    sector_distribution = [
        schemas.SectorDistributionItem(sector=sector, count=count)
        for sector, count in sector_counter.items()
    ]

    # Trust distribution based on score bands
    trust_dist: dict[str, int] = {"low": 0, "medium": 0, "high": 0}
    for score in scores:
        if score < 35:
            trust_dist["low"] += 1
        elif score < 65:
            trust_dist["medium"] += 1
        else:
            trust_dist["high"] += 1

    return schemas.KpiDashboard(
        total_startups=total_startups,
        total_programs=total_programs,
        applications_submitted=applications_submitted,
        investor_interest_count=investor_interest_count,
        average_startup_score=avg_score,
        sector_distribution=sector_distribution,
        trust_distribution=trust_dist,
        updated_at=datetime.now(timezone.utc),
    )
