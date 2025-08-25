from pydantic_settings import BaseSettings
from pydantic import Field, validator
from typing import Optional
import secrets
import string

class Settings(BaseSettings):
    PROJECT_NAME: str = "NEVA Project"
    API_V1_STR: str = "/api/v1"
    
    # Настройки базы данных
    POSTGRES_SERVER: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    POSTGRES_PORT: str
    
    # JWT настройки с автоматической генерацией
    SECRET_KEY: str = Field(default_factory=lambda: ''.join(secrets.choice(string.ascii_letters + string.digits + string.punctuation) for _ in range(50)))
    ALGORITHM: str = Field("HS256", env="ALGORITHM")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(30, env="ACCESS_TOKEN_EXPIRE_MINUTES")
    REFRESH_TOKEN_EXPIRE_DAYS: int = Field(7, env="REFRESH_TOKEN_EXPIRE_DAYS")
    
    # Автоматическое создание DNS строки
    @property
    def DATABASE_URL(self) -> str:
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
    
    # Валидация секретного ключа
    @validator("SECRET_KEY", pre=True)
    def validate_secret_key(cls, v):
        if v is None or v == "change-this-in-production":
            # Генерируем случайный ключ
            return ''.join(secrets.choice(string.ascii_letters + string.digits + string.punctuation) for _ in range(50))
        return v
    
    class Config:
        env_file = "../.env"
        case_sensitive = False

settings = Settings()
