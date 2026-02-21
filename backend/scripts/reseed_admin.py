from app.database import SessionLocal
from app import models
from app.auth import hash_password
import uuid

def reseed():
    db = SessionLocal()
    
    # Ready Admin
    email_admin = "admin@test.com"
    user_admin = db.query(models.User).filter(models.User.email == email_admin).first()
    if not user_admin:
        user_admin = models.User(
            id=f"usr_{uuid.uuid4().hex}",
            full_name="IRIA Admin",
            email=email_admin,
            hashed_password=hash_password("admin123"),
            role="iria_admin",
        )
        db.add(user_admin)
    else:
        user_admin.hashed_password = hash_password("admin123")
        user_admin.role = "iria_admin"

    # Ready Investor
    email_inv = "investor@test.com"
    user_inv = db.query(models.User).filter(models.User.email == email_inv).first()
    if not user_inv:
        user_inv = models.User(
            id=f"usr_investor",
            full_name="Peak Ventures",
            email=email_inv,
            hashed_password=hash_password("password123"),
            role="investor",
        )
        db.add(user_inv)
    else:
        user_inv.hashed_password = hash_password("password123")
        user_inv.role = "investor"
    
    db.commit()
    print("Demo accounts (Admin, Investor) are ready with new hashes.")

if __name__ == "__main__":
    reseed()
