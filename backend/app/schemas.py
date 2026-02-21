from __future__ import annotations
from typing import Optional, List, Any, Dict
from datetime import datetime
from pydantic import BaseModel, EmailStr, field_validator


# ─── Enums ───────────────────────────────────────────────────────────────────

class UserRole:
    startup = "startup"
    investor = "investor"
    mentor = "mentor"
    iria_admin = "iria_admin"
    values = ["startup", "investor", "mentor", "iria_admin"]


class StartupStage:
    values = ["idea", "pre_seed", "seed", "series_a", "growth"]


class ApplicationStatus:
    values = ["submitted", "under_review", "accepted", "rejected"]


# ─── Generic ─────────────────────────────────────────────────────────────────

class ErrorDetail(BaseModel):
    field: Optional[str] = None
    issue: Optional[str] = None


class ErrorBody(BaseModel):
    code: str
    message: str
    details: Optional[List[ErrorDetail]] = None


class ErrorResponse(BaseModel):
    error: ErrorBody


class HealthResponse(BaseModel):
    service: str
    status: str
    version: str


class PaginationMeta(BaseModel):
    page: int
    page_size: int
    total: int


# ─── Auth / Users ─────────────────────────────────────────────────────────────

class RegisterRequest(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: str

    @field_validator("role")
    @classmethod
    def validate_role(cls, v):
        if v not in UserRole.values:
            raise ValueError(f"role must be one of {UserRole.values}")
        return v

    @field_validator("password")
    @classmethod
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError("password must be at least 8 characters")
        return v


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: str
    full_name: str
    email: str
    role: str
    organization: Optional[str] = None
    bio: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user: UserOut


class UserUpdateRequest(BaseModel):
    full_name: Optional[str] = None
    organization: Optional[str] = None
    bio: Optional[str] = None


# ─── Startup ──────────────────────────────────────────────────────────────────

class StartupTraction(BaseModel):
    users: Optional[int] = None
    monthly_revenue_azn: Optional[float] = None
    pilots: Optional[int] = None
    partnerships: Optional[int] = None


class StartupFounder(BaseModel):
    user_id: Optional[str] = None
    full_name: str
    title: Optional[str] = None


class StartupCreateRequest(BaseModel):
    name: str
    tagline: Optional[str] = None
    description: str
    sector: str
    stage: str
    website_url: Optional[str] = None
    founded_year: Optional[int] = None
    city: Optional[str] = None
    team_size: Optional[int] = None
    founders: Optional[List[StartupFounder]] = []
    traction: Optional[StartupTraction] = None

    @field_validator("stage")
    @classmethod
    def validate_stage(cls, v):
        if v not in StartupStage.values:
            raise ValueError(f"stage must be one of {StartupStage.values}")
        return v


class StartupUpdateRequest(BaseModel):
    tagline: Optional[str] = None
    description: Optional[str] = None
    sector: Optional[str] = None
    stage: Optional[str] = None
    website_url: Optional[str] = None
    city: Optional[str] = None
    team_size: Optional[int] = None
    traction: Optional[StartupTraction] = None


class StartupProfileOut(BaseModel):
    id: str
    startup_id_code: str
    owner_user_id: str
    name: str
    tagline: Optional[str] = None
    description: str
    sector: str
    stage: str
    website_url: Optional[str] = None
    founded_year: Optional[int] = None
    city: Optional[str] = None
    team_size: Optional[int] = None
    founders: List[Dict[str, Any]] = []
    traction: Optional[Dict[str, Any]] = None
    latest_success_score: Optional[float] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class StartupListResponse(BaseModel):
    items: List[StartupProfileOut]
    meta: PaginationMeta


# ─── AI Analysis ─────────────────────────────────────────────────────────────

class SWOTOut(BaseModel):
    strengths: List[str]
    weaknesses: List[str]
    opportunities: List[str]
    threats: List[str]


class ScoreFactorOut(BaseModel):
    factor: str
    weight: float
    contribution: float
    explanation: Optional[str] = None


class StartupAnalysisOut(BaseModel):
    id: str
    startup_id: str
    success_score: float
    score_band: str
    swot: SWOTOut
    market_snapshot: Optional[str] = None
    positioning_insight: Optional[str] = None
    explainability: List[ScoreFactorOut]
    generated_at: datetime

    class Config:
        from_attributes = True


class SimilarStartupItem(BaseModel):
    startup_id: str
    startup_name: str
    similarity_score: float
    reasons: List[str]


class SimilarStartupsResponse(BaseModel):
    startup_id: str
    items: List[SimilarStartupItem]


# ─── Events ──────────────────────────────────────────────────────────────────

class EventOut(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    category: str
    sector: Optional[str] = None
    topic: Optional[str] = None
    start_date: str
    end_date: str
    location: Optional[str] = None
    registration_url: Optional[str] = None

    class Config:
        from_attributes = True


class EventCreateRequest(BaseModel):
    title: str
    description: Optional[str] = None
    category: str
    sector: Optional[str] = None
    topic: Optional[str] = None
    start_date: str
    end_date: str
    location: Optional[str] = None
    registration_url: Optional[str] = None


class EventListResponse(BaseModel):
    items: List[EventOut]


# ─── Programs ─────────────────────────────────────────────────────────────────

class ProgramOut(BaseModel):
    id: str
    title: str
    type: str
    description: Optional[str] = None
    status: str
    application_deadline: Optional[str] = None
    eligibility_notes: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class ProgramCreateRequest(BaseModel):
    title: str
    type: str
    description: Optional[str] = None
    status: str
    application_deadline: Optional[str] = None
    eligibility_notes: Optional[str] = None


class ProgramListResponse(BaseModel):
    items: List[ProgramOut]


# ─── Applications ─────────────────────────────────────────────────────────────

class ApplicationCreateRequest(BaseModel):
    startup_id: str
    cover_letter: Optional[str] = None
    attachments: Optional[List[str]] = []


class ApplicationStatusUpdateRequest(BaseModel):
    status: str
    review_note: Optional[str] = None

    @field_validator("status")
    @classmethod
    def validate_status(cls, v):
        if v not in ApplicationStatus.values:
            raise ValueError(f"status must be one of {ApplicationStatus.values}")
        return v


class ApplicationOut(BaseModel):
    id: str
    program_id: str
    startup_id: str
    status: str
    submitted_by_user_id: Optional[str] = None
    cover_letter: Optional[str] = None
    review_note: Optional[str] = None
    submitted_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ApplicationListResponse(BaseModel):
    items: List[ApplicationOut]


# ─── Investor ─────────────────────────────────────────────────────────────────

class InvestorInterestCreateRequest(BaseModel):
    note: Optional[str] = None


class InvestorInterestOut(BaseModel):
    id: str
    investor_user_id: str
    startup_id: str
    note: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class InvestorInterestListResponse(BaseModel):
    items: List[InvestorInterestOut]


# ─── Dashboard ────────────────────────────────────────────────────────────────

class SectorDistributionItem(BaseModel):
    sector: str
    count: int


class KpiDashboard(BaseModel):
    total_startups: int
    total_programs: int
    applications_submitted: int
    investor_interest_count: int
    average_startup_score: Optional[float] = None
    sector_distribution: List[SectorDistributionItem]
    trust_distribution: Dict[str, int]
    updated_at: datetime


# ─── Audit ────────────────────────────────────────────────────────────────────

class AuditLogOut(BaseModel):
    id: str
    actor_user_id: Optional[str] = None
    actor_role: str
    action: str
    entity_type: str
    entity_id: str
    meta: Optional[Dict[str, Any]] = None
    created_at: datetime

    class Config:
        from_attributes = True


class AuditLogListResponse(BaseModel):
    items: List[AuditLogOut]
