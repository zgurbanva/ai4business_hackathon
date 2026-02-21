import json
from typing import Optional

import ulid
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app import models, schemas, ai_service
from app.audit import record_audit
from app.auth import get_current_user
from app.database import get_db

router = APIRouter(prefix="/startups", tags=["Startups"])

# ── counter for human-friendly IDs ──────────────────────────────────────────


def _next_startup_code(db: Session) -> str:
    count = db.query(models.Startup).count()
    return f"AZ-ST-{count + 1:04d}"


# ── helpers ──────────────────────────────────────────────────────────────────

def _to_out(s: models.Startup) -> schemas.StartupProfileOut:
    return schemas.StartupProfileOut(
        id=s.id,
        startup_id_code=s.startup_id_code,
        owner_user_id=s.owner_user_id,
        name=s.name,
        tagline=s.tagline,
        description=s.description,
        sector=s.sector,
        stage=s.stage,
        website_url=s.website_url,
        founded_year=s.founded_year,
        city=s.city,
        team_size=s.team_size,
        founders=s.founders,
        traction=s.traction,
        latest_success_score=s.latest_success_score,
        created_at=s.created_at,
        updated_at=s.updated_at,
    )


# ── List startups ─────────────────────────────────────────────────────────────

@router.get("", response_model=schemas.StartupListResponse)
def list_startups(
    sector: Optional[str] = None,
    stage: Optional[str] = None,
    search: Optional[str] = None,
    min_score: Optional[float] = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    _: models.User = Depends(get_current_user),
):
    q = db.query(models.Startup)
    if sector:
        q = q.filter(models.Startup.sector.ilike(f"%{sector}%"))
    if stage:
        q = q.filter(models.Startup.stage == stage)
    if search:
        q = q.filter(
            models.Startup.name.ilike(f"%{search}%")
            | models.Startup.description.ilike(f"%{search}%")
        )
    if min_score is not None:
        q = q.filter(models.Startup.latest_success_score >= min_score)

    total = q.count()
    items = q.offset((page - 1) * page_size).limit(page_size).all()
    return schemas.StartupListResponse(
        items=[_to_out(s) for s in items],
        meta=schemas.PaginationMeta(page=page, page_size=page_size, total=total),
    )


# ── Create startup ─────────────────────────────────────────────────────────────

@router.post("", response_model=schemas.StartupProfileOut, status_code=201)
def create_startup(
    payload: schemas.StartupCreateRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    if current_user.role not in ("startup", "iria_admin"):
        raise HTTPException(status_code=403, detail="Insufficient permissions")

    startup = models.Startup(
        id=f"st_{ulid.new()}",
        startup_id_code=_next_startup_code(db),
        owner_user_id=current_user.id,
        name=payload.name,
        tagline=payload.tagline,
        description=payload.description,
        sector=payload.sector,
        stage=payload.stage,
        website_url=payload.website_url,
        founded_year=payload.founded_year,
        city=payload.city,
        team_size=payload.team_size,
        founders_json=json.dumps([f.model_dump() for f in (payload.founders or [])]),
        traction_json=json.dumps(payload.traction.model_dump()) if payload.traction else None,
    )
    db.add(startup)
    db.commit()
    db.refresh(startup)
    record_audit(db, current_user, "startup_created", "startup", startup.id)
    return _to_out(startup)


# ── Get startup ────────────────────────────────────────────────────────────────

@router.get("/{startup_id}", response_model=schemas.StartupProfileOut)
def get_startup(
    startup_id: str,
    db: Session = Depends(get_db),
    _: models.User = Depends(get_current_user),
):
    startup = db.query(models.Startup).filter(models.Startup.id == startup_id).first()
    if not startup:
        raise HTTPException(status_code=404, detail="Startup not found")
    return _to_out(startup)


# ── Update startup ─────────────────────────────────────────────────────────────

@router.patch("/{startup_id}", response_model=schemas.StartupProfileOut)
def update_startup(
    startup_id: str,
    payload: schemas.StartupUpdateRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    startup = db.query(models.Startup).filter(models.Startup.id == startup_id).first()
    if not startup:
        raise HTTPException(status_code=404, detail="Startup not found")
    if startup.owner_user_id != current_user.id and current_user.role != "iria_admin":
        raise HTTPException(status_code=403, detail="Insufficient permissions")

    fields = payload.model_dump(exclude_unset=True)
    for key, val in fields.items():
        if key == "traction":
            startup.traction_json = json.dumps(val) if val else None
        else:
            setattr(startup, key, val)
    db.commit()
    db.refresh(startup)
    record_audit(db, current_user, "startup_updated", "startup", startup.id)
    return _to_out(startup)


# ── AI Analysis ────────────────────────────────────────────────────────────────

@router.post("/{startup_id}/analysis", response_model=schemas.StartupAnalysisOut, tags=["AI Analysis"])
def run_analysis(
    startup_id: str,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    startup = db.query(models.Startup).filter(models.Startup.id == startup_id).first()
    if not startup:
        raise HTTPException(status_code=404, detail="Startup not found")
    if startup.owner_user_id != current_user.id and current_user.role not in ("iria_admin", "investor", "mentor"):
        raise HTTPException(status_code=403, detail="Insufficient permissions")

    result = ai_service.run_analysis(startup)

    analysis = models.StartupAnalysis(
        id=result["id"],
        startup_id=startup.id,
        success_score=result["success_score"],
        score_band=result["score_band"],
        swot_json=json.dumps(result["swot"]),
        market_snapshot=result["market_snapshot"],
        positioning_insight=result["positioning_insight"],
        explainability_json=json.dumps(result["explainability"]),
    )
    db.add(analysis)

    # Update cached score
    startup.latest_success_score = result["success_score"]
    db.commit()
    db.refresh(analysis)
    record_audit(db, current_user, "analysis_run", "startup", startup.id)

    return schemas.StartupAnalysisOut(
        id=analysis.id,
        startup_id=analysis.startup_id,
        success_score=analysis.success_score,
        score_band=analysis.score_band,
        swot=schemas.SWOTOut(**analysis.swot),
        market_snapshot=analysis.market_snapshot,
        positioning_insight=analysis.positioning_insight,
        explainability=[schemas.ScoreFactorOut(**f) for f in analysis.explainability],
        generated_at=analysis.generated_at,
    )


@router.get("/{startup_id}/analysis", response_model=schemas.StartupAnalysisOut, tags=["AI Analysis"])
def get_latest_analysis(
    startup_id: str,
    db: Session = Depends(get_db),
    _: models.User = Depends(get_current_user),
):
    startup = db.query(models.Startup).filter(models.Startup.id == startup_id).first()
    if not startup:
        raise HTTPException(status_code=404, detail="Startup not found")
    analysis = (
        db.query(models.StartupAnalysis)
        .filter(models.StartupAnalysis.startup_id == startup_id)
        .order_by(models.StartupAnalysis.generated_at.desc())
        .first()
    )
    if not analysis:
        raise HTTPException(status_code=404, detail="No analysis found for this startup")
    return schemas.StartupAnalysisOut(
        id=analysis.id,
        startup_id=analysis.startup_id,
        success_score=analysis.success_score,
        score_band=analysis.score_band,
        swot=schemas.SWOTOut(**analysis.swot),
        market_snapshot=analysis.market_snapshot,
        positioning_insight=analysis.positioning_insight,
        explainability=[schemas.ScoreFactorOut(**f) for f in analysis.explainability],
        generated_at=analysis.generated_at,
    )


# ── Similarity ─────────────────────────────────────────────────────────────────

@router.get("/{startup_id}/similar", response_model=schemas.SimilarStartupsResponse, tags=["Similarity"])
def get_similar(
    startup_id: str,
    limit: int = Query(5, ge=1, le=20),
    db: Session = Depends(get_db),
    _: models.User = Depends(get_current_user),
):
    startup = db.query(models.Startup).filter(models.Startup.id == startup_id).first()
    if not startup:
        raise HTTPException(status_code=404, detail="Startup not found")
    all_startups = db.query(models.Startup).all()
    similar = ai_service.get_similar(startup, all_startups)[:limit]
    return schemas.SimilarStartupsResponse(startup_id=startup_id, items=similar)


# ── Investor interest ──────────────────────────────────────────────────────────

@router.post("/{startup_id}/interest", response_model=schemas.InvestorInterestOut, status_code=201, tags=["Investor"])
def mark_interest(
    startup_id: str,
    payload: Optional[schemas.InvestorInterestCreateRequest] = None,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    if current_user.role != "investor":
        raise HTTPException(status_code=403, detail="Investor role required")
    startup = db.query(models.Startup).filter(models.Startup.id == startup_id).first()
    if not startup:
        raise HTTPException(status_code=404, detail="Startup not found")
    existing = (
        db.query(models.InvestorInterest)
        .filter(
            models.InvestorInterest.investor_user_id == current_user.id,
            models.InvestorInterest.startup_id == startup_id,
        )
        .first()
    )
    if existing:
        raise HTTPException(status_code=409, detail="Already marked as interested")

    interest = models.InvestorInterest(
        id=f"int_{ulid.new()}",
        investor_user_id=current_user.id,
        startup_id=startup_id,
        note=(payload.note if payload else None),
    )
    db.add(interest)
    db.commit()
    db.refresh(interest)
    record_audit(db, current_user, "investor_interest_added", "startup", startup_id)
    return schemas.InvestorInterestOut.model_validate(interest)


@router.delete("/{startup_id}/interest", status_code=204, tags=["Investor"])
def remove_interest(
    startup_id: str,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    if current_user.role != "investor":
        raise HTTPException(status_code=403, detail="Investor role required")
    interest = (
        db.query(models.InvestorInterest)
        .filter(
            models.InvestorInterest.investor_user_id == current_user.id,
            models.InvestorInterest.startup_id == startup_id,
        )
        .first()
    )
    if not interest:
        raise HTTPException(status_code=404, detail="Interest not found")
    db.delete(interest)
    db.commit()


from typing import Optional  # noqa: E402 (already imported above; safe duplicate)
