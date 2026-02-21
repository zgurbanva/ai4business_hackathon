import json
from sqlalchemy import Column, String, Integer, Float, DateTime, Text, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime, timezone

from app.database import Base


def utcnow():
    return datetime.now(timezone.utc)


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False)  # startup|investor|mentor|iria_admin
    organization = Column(String, nullable=True)
    bio = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=utcnow)
    updated_at = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)

    startups = relationship("Startup", back_populates="owner")
    interests = relationship("InvestorInterest", back_populates="investor")
    audit_logs = relationship("AuditLog", back_populates="actor")


class Startup(Base):
    __tablename__ = "startups"

    id = Column(String, primary_key=True)
    startup_id_code = Column(String, unique=True, nullable=False)
    owner_user_id = Column(String, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    tagline = Column(String, nullable=True)
    description = Column(Text, nullable=False)
    sector = Column(String, nullable=False)
    stage = Column(String, nullable=False)
    website_url = Column(String, nullable=True)
    founded_year = Column(Integer, nullable=True)
    city = Column(String, nullable=True)
    team_size = Column(Integer, nullable=True)
    founders_json = Column(Text, nullable=True)   # JSON list
    traction_json = Column(Text, nullable=True)   # JSON object
    latest_success_score = Column(Float, nullable=True)
    created_at = Column(DateTime(timezone=True), default=utcnow)
    updated_at = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)

    owner = relationship("User", back_populates="startups")
    analyses = relationship("StartupAnalysis", back_populates="startup", order_by="StartupAnalysis.generated_at.desc()")
    interests = relationship("InvestorInterest", back_populates="startup")
    applications = relationship("Application", back_populates="startup")

    @property
    def founders(self):
        return json.loads(self.founders_json) if self.founders_json else []

    @property
    def traction(self):
        return json.loads(self.traction_json) if self.traction_json else None


class StartupAnalysis(Base):
    __tablename__ = "startup_analyses"

    id = Column(String, primary_key=True)
    startup_id = Column(String, ForeignKey("startups.id"), nullable=False)
    success_score = Column(Float, nullable=False)
    score_band = Column(String, nullable=False)  # low|medium|high
    swot_json = Column(Text, nullable=False)
    market_snapshot = Column(Text, nullable=True)
    positioning_insight = Column(Text, nullable=True)
    explainability_json = Column(Text, nullable=False)
    generated_at = Column(DateTime(timezone=True), default=utcnow)

    startup = relationship("Startup", back_populates="analyses")

    @property
    def swot(self):
        return json.loads(self.swot_json)

    @property
    def explainability(self):
        return json.loads(self.explainability_json)


class Event(Base):
    __tablename__ = "events"

    id = Column(String, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String, nullable=False)
    sector = Column(String, nullable=True)
    topic = Column(String, nullable=True)
    start_date = Column(String, nullable=False)  # ISO date string
    end_date = Column(String, nullable=False)
    location = Column(String, nullable=True)
    registration_url = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), default=utcnow)


class Program(Base):
    __tablename__ = "programs"

    id = Column(String, primary_key=True)
    title = Column(String, nullable=False)
    type = Column(String, nullable=False)   # incubation|acceleration|grant
    description = Column(Text, nullable=True)
    status = Column(String, nullable=False)  # open|closed
    application_deadline = Column(String, nullable=True)
    eligibility_notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=utcnow)

    applications = relationship("Application", back_populates="program")


class Application(Base):
    __tablename__ = "applications"

    id = Column(String, primary_key=True)
    program_id = Column(String, ForeignKey("programs.id"), nullable=False)
    startup_id = Column(String, ForeignKey("startups.id"), nullable=False)
    submitted_by_user_id = Column(String, ForeignKey("users.id"), nullable=False)
    status = Column(String, nullable=False, default="submitted")
    cover_letter = Column(Text, nullable=True)
    review_note = Column(Text, nullable=True)
    submitted_at = Column(DateTime(timezone=True), default=utcnow)
    updated_at = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)

    program = relationship("Program", back_populates="applications")
    startup = relationship("Startup", back_populates="applications")


class InvestorInterest(Base):
    __tablename__ = "investor_interests"

    id = Column(String, primary_key=True)
    investor_user_id = Column(String, ForeignKey("users.id"), nullable=False)
    startup_id = Column(String, ForeignKey("startups.id"), nullable=False)
    note = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=utcnow)

    investor = relationship("User", back_populates="interests")
    startup = relationship("Startup", back_populates="interests")


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String, primary_key=True)
    actor_user_id = Column(String, ForeignKey("users.id"), nullable=True)
    actor_role = Column(String, nullable=False)
    action = Column(String, nullable=False)
    entity_type = Column(String, nullable=False)
    entity_id = Column(String, nullable=False)
    metadata_json = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=utcnow)

    actor = relationship("User", back_populates="audit_logs")

    @property
    def metadata(self):
        import json
        return json.loads(self.metadata_json) if self.metadata_json else {}
