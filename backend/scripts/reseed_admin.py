from app.database import SessionLocal
from app import models
from app.auth import hash_password
import uuid

def reseed():
    db = SessionLocal()
    email = "admin@test.com"
    user = db.query(models.User).filter(models.User.email == email).first()
    
    if not user:
        print(f"Creating new admin user: {email}")
        user = models.User(
            id=f"usr_{uuid.uuid4().hex}",
            full_name="IRIA Admin",
            email=email,
            hashed_password=hash_password("admin123"),
            role="iria_admin",
        )
        db.add(user)
    else:
        print(f"Updating existing admin user: {email}")
        user.hashed_password = hash_password("admin123")
        user.role = "iria_admin" # Ensure role is correct
    
    db.commit()
    print(f"Admin user {email} is ready with password 'admin123'.")

if __name__ == "__main__":
    reseed()
