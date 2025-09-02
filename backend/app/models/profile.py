from app.db.base import Base
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, Enum, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum


class ProfileType(str, enum.Enum):
    EMPLOYEE = "employee"
    COMPANY = "company"
    AGENT = "agent"


class ProfileStatus(str, enum.Enum):
    AVAILABLE = "available"
    TRANSFER = "transfer"
    COMPLETED = "completed"
    UNAVAILABLE = "unavailable"


class Profile(Base):
    __tablename__ = "profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    
    # Основная информация
    profile_type = Column(Enum(ProfileType), nullable=False, default=ProfileType.EMPLOYEE)
    status = Column(Enum(ProfileStatus), nullable=False, default=ProfileStatus.AVAILABLE)
    
    # Персональная информация
    first_name = Column(String(100), nullable=True)
    last_name = Column(String(100), nullable=True)
    middle_name = Column(String(100), nullable=True)
    phone = Column(String(20), nullable=True)
    avatar_url = Column(String(500), nullable=True)
    bio = Column(Text, nullable=True)
    
    # Для сотрудников
    position = Column(String(200), nullable=True)
    experience_years = Column(Integer, nullable=True)
    skills = Column(JSON, nullable=True)  # Список навыков
    languages = Column(JSON, nullable=True)  # Список языков
    education = Column(JSON, nullable=True)  # Образование
    achievements = Column(JSON, nullable=True)  # Достижения
    
    # Для компаний
    company_name = Column(String(200), nullable=True)
    industry = Column(String(100), nullable=True)
    company_size = Column(String(50), nullable=True)
    founded_year = Column(Integer, nullable=True)
    website = Column(String(200), nullable=True)
    description = Column(Text, nullable=True)
    benefits = Column(JSON, nullable=True)  # Преимущества компании
    specialties = Column(JSON, nullable=True)  # Специализации
    
    # Для агентов
    agency_name = Column(String(200), nullable=True)
    license_number = Column(String(100), nullable=True)
    success_rate = Column(Integer, nullable=True)  # Процент успешных переводов
    rating = Column(Integer, nullable=True)  # Рейтинг от 1 до 5
    specialties = Column(JSON, nullable=True)  # Специализации агента
    preferences = Column(JSON, nullable=True)  # Предпочтения по работе
    
    # Общие поля
    location = Column(String(200), nullable=True)
    is_verified = Column(Boolean, default=False)
    is_public = Column(Boolean, default=True)
    
    # Метаданные
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    last_activity = Column(DateTime(timezone=True), server_default=func.now())
    
    # Связи
    user = relationship("User", back_populates="profile")
