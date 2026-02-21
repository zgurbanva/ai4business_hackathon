from app.database import SessionLocal
from app import models
from app.auth import hash_password
import uuid

def seed():
    db = SessionLocal()
    email = "investor@test.com"
    existing = db.query(models.User).filter(models.User.email == email).first()
    if existing:
        print(f"User {email} already exists.")
        return

    user = models.User(
        id=f"usr_{uuid.uuid4().hex}",
        full_name="Peak Ventures",
        email=email,
        hashed_password=hash_password("password123"),
        role="investor",
    )
    db.add(user)
    db.commit()
    print(f"User {email} created successfully with role 'investor'.")

if __name__ == "__main__":
    seed()
