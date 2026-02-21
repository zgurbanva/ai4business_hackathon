"""
Heuristic AI analysis engine — explainable, rule-based scoring.
No external ML dependencies required for MVP.
"""
from __future__ import annotations

import json
import random
import uuid
from datetime import datetime, timezone
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models import Startup


SECTOR_MARKET_NOTES = {
    "fintech": (
        "Azerbaijan's fintech market is growing rapidly, driven by PASHA Bank, ABB, and CBА digital reforms. "
        "Non-cash payment adoption hit 35% in 2024."
    ),
    "agritech": (
        "Azerbaijan's agrarian sector contributes ~7% of GDP. Digital precision-ag adoption is nascent, "
        "making early movers well-positioned."
    ),
    "edtech": (
        "A young, digitally-literate population (median age 32) and government STEAM initiatives "
        "create strong demand for edtech solutions."
    ),
    "healthtech": (
        "Ministry of Health has launched e-health pilots; telehealth and diagnostic AI represent "
        "high-impact opportunities."
    ),
    "logistics": (
        "Azerbaijan's BTK corridor and Middle Corridor trade routes are driving logistics tech investment."
    ),
}

DEFAULT_MARKET_NOTE = (
    "The Azerbaijani startup ecosystem is nascent but growing, with IRIA and the Innovation Agency "
    "providing structured support."
)

STAGE_BASE_SCORES = {
    "idea": 20.0,
    "pre_seed": 30.0,
    "seed": 40.0,
    "series_a": 55.0,
    "growth": 70.0,
}

SWOT_TEMPLATES = {
    "fintech": {
        "strengths": ["Strong digital payment infrastructure", "Experienced founding team in finance"],
        "weaknesses": ["Regulatory uncertainty around fintech licensing", "Limited credit-score data availability"],
        "opportunities": ["CBА open-banking sandbox launching Q3 2025", "Underbanked SME segment"],
        "threats": ["Incumbent bank digital offerings improving", "Regional fintech competition from Georgia/Turkey"],
    },
    "agritech": {
        "strengths": ["Large addressable farming base (>800k farmers)", "Government subsidies available"],
        "weaknesses": ["Low smartphone penetration in rural areas", "Fragmented land ownership"],
        "opportunities": ["EU climate-smart agriculture funding", "Export diversification initiatives"],
        "threats": ["Weather volatility", "Low willingness-to-pay in early adopters"],
    },
    "edtech": {
        "strengths": ["Young, tech-savvy population", "Ministry partnerships"],
        "weaknesses": ["Content localisation cost in Azerbaijani", "Parents hesitant to pay for digital"],
        "opportunities": ["Government STEAM grants", "Remote-work skills demand"],
        "threats": ["Free alternatives (YouTube, Khan Academy)", "Brain-drain reducing local talent pool"],
    },
    "_default": {
        "strengths": ["Clear problem-solution fit", "Experienced team"],
        "weaknesses": ["Early traction, revenue not yet proven", "Limited brand awareness"],
        "opportunities": ["Growing startup ecosystem support (IRIA, Technopark)", "Regional market expansion"],
        "threats": ["Macroeconomic volatility", "Competition from international platforms"],
    },
}


def _get_swot(sector: str) -> dict:
    return SWOT_TEMPLATES.get((sector or "").lower(), SWOT_TEMPLATES["_default"])


def _score_factors(startup: "Startup") -> list[dict]:
    traction = startup.traction or {}
    team_size = startup.team_size or 1
    stage = startup.stage or "idea"

    factors = []

    # Factor 1: Team size
    team_score = min(team_size / 10, 1.0) * 15
    factors.append({
        "factor": "team_size",
        "weight": 0.15,
        "contribution": round(team_score, 2),
        "explanation": f"Team of {team_size} person(s). Larger, diverse teams score higher.",
    })

    # Factor 2: Stage maturity
    stage_score = (STAGE_BASE_SCORES.get(stage, 20) / 100) * 25
    factors.append({
        "factor": "stage_maturity",
        "weight": 0.25,
        "contribution": round(stage_score, 2),
        "explanation": f"Stage '{stage}' reflects development progress.",
    })

    # Factor 3: Traction — user base
    users = traction.get("users", 0) or 0
    user_score = min(users / 10000, 1.0) * 20
    factors.append({
        "factor": "user_traction",
        "weight": 0.20,
        "contribution": round(user_score, 2),
        "explanation": f"{users} registered users. Milestone target: 10,000.",
    })

    # Factor 4: Revenue
    revenue = traction.get("monthly_revenue_azn", 0) or 0
    rev_score = min(revenue / 50000, 1.0) * 20
    factors.append({
        "factor": "revenue",
        "weight": 0.20,
        "contribution": round(rev_score, 2),
        "explanation": f"{revenue:,} AZN monthly revenue. Target: 50,000 AZN.",
    })

    # Factor 5: Partnerships / pilots
    pilots = (traction.get("pilots", 0) or 0) + (traction.get("partnerships", 0) or 0)
    partner_score = min(pilots / 5, 1.0) * 10
    factors.append({
        "factor": "partnerships_pilots",
        "weight": 0.10,
        "contribution": round(partner_score, 2),
        "explanation": f"{pilots} partnerships/pilots. Target: 5.",
    })

    # Factor 6: Description completeness
    description_len = len(startup.description or "")
    desc_score = min(description_len / 500, 1.0) * 10
    factors.append({
        "factor": "profile_completeness",
        "weight": 0.10,
        "contribution": round(desc_score, 2),
        "explanation": "Assessed from description length and profile detail.",
    })

    return factors


def run_analysis(startup: "Startup") -> dict:
    """Run heuristic analysis and return a dict matching StartupAnalysis schema."""
    factors = _score_factors(startup)
    total_score = round(sum(f["contribution"] for f in factors), 2)
    total_score = min(max(total_score, 0), 100)

    if total_score < 35:
        band = "low"
    elif total_score < 65:
        band = "medium"
    else:
        band = "high"

    swot = _get_swot(startup.sector)
    market_note = SECTOR_MARKET_NOTES.get((startup.sector or "").lower(), DEFAULT_MARKET_NOTE)

    positioning_insight = (
        f"{startup.name} is currently at {startup.stage} stage in the {startup.sector} sector. "
        f"With a success score of {total_score}/100 ({band}), the startup demonstrates "
        + ("strong fundamentals." if band == "high" else
           "moderate fundamentals with clear growth areas." if band == "medium" else
           "early-stage potential that requires accelerated traction.")
    )

    return {
        "id": f"ana_{uuid.uuid4().hex}",
        "startup_id": startup.id,
        "success_score": total_score,
        "score_band": band,
        "swot": swot,
        "market_snapshot": market_note,
        "positioning_insight": positioning_insight,
        "explainability": factors,
        "generated_at": datetime.now(timezone.utc).isoformat(),
    }


def get_similar(startup: "Startup", all_startups: list) -> list[dict]:
    """Compute lightweight similarity scores against all other startups."""
    results = []
    for candidate in all_startups:
        if candidate.id == startup.id:
            continue

        score = 0.0
        reasons = []

        if candidate.sector == startup.sector:
            score += 0.4
            reasons.append(f"Same sector ({startup.sector})")

        if candidate.stage == startup.stage:
            score += 0.3
            reasons.append(f"Same stage ({startup.stage})")

        if candidate.city and startup.city and candidate.city.lower() == startup.city.lower():
            score += 0.2
            reasons.append(f"Same city ({startup.city})")

        if score > 0:
            results.append({
                "startup_id": candidate.id,
                "startup_name": candidate.name,
                "similarity_score": round(min(score, 1.0), 2),
                "reasons": reasons,
            })

    results.sort(key=lambda x: x["similarity_score"], reverse=True)
    return results
