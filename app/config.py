from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "IRIA Ecosystem Platform API"
    VERSION: str = "1.0.0"
    SECRET_KEY: str = "changeme-very-secret-key-for-jwt"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    DATABASE_URL: str = "sqlite:///./iria.db"

    class Config:
        env_file = ".env"


settings = Settings()
