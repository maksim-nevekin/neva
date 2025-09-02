from pydantic import BaseModel, EmailStr, validator
from datetime import datetime
from typing import Optional, List, Dict, Any
from app.models.profile import ProfileType, ProfileStatus


class ProfileBase(BaseModel):
    profile_type: ProfileType
    status: ProfileStatus = ProfileStatus.AVAILABLE
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    middle_name: Optional[str] = None
    phone: Optional[str] = None
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    is_public: bool = True


class EmployeeProfileCreate(ProfileBase):
    profile_type: ProfileType = ProfileType.EMPLOYEE
    position: Optional[str] = None
    experience_years: Optional[int] = None
    skills: Optional[List[str]] = None
    languages: Optional[List[str]] = None
    education: Optional[List[Dict[str, Any]]] = None
    achievements: Optional[List[str]] = None


class CompanyProfileCreate(ProfileBase):
    profile_type: ProfileType = ProfileType.COMPANY
    company_name: Optional[str] = None
    industry: Optional[str] = None
    company_size: Optional[str] = None
    founded_year: Optional[int] = None
    website: Optional[str] = None
    description: Optional[str] = None
    benefits: Optional[List[str]] = None
    specialties: Optional[List[str]] = None


class AgentProfileCreate(ProfileBase):
    profile_type: ProfileType = ProfileType.AGENT
    agency_name: Optional[str] = None
    license_number: Optional[str] = None
    success_rate: Optional[int] = None
    rating: Optional[int] = None
    specialties: Optional[List[str]] = None
    preferences: Optional[List[str]] = None


class ProfileUpdate(BaseModel):
    status: Optional[ProfileStatus] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    middle_name: Optional[str] = None
    phone: Optional[str] = None
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    is_public: Optional[bool] = None
    
    # Поля для сотрудников
    position: Optional[str] = None
    experience_years: Optional[int] = None
    skills: Optional[List[str]] = None
    languages: Optional[List[str]] = None
    education: Optional[List[Dict[str, Any]]] = None
    achievements: Optional[List[str]] = None
    
    # Поля для компаний
    company_name: Optional[str] = None
    industry: Optional[str] = None
    company_size: Optional[str] = None
    founded_year: Optional[int] = None
    website: Optional[str] = None
    description: Optional[str] = None
    benefits: Optional[List[str]] = None
    specialties: Optional[List[str]] = None
    
    # Поля для агентов
    agency_name: Optional[str] = None
    license_number: Optional[str] = None
    success_rate: Optional[int] = None
    rating: Optional[int] = None
    preferences: Optional[List[str]] = None


class ProfileResponse(BaseModel):
    id: int
    user_id: int
    profile_type: ProfileType
    status: ProfileStatus
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    middle_name: Optional[str] = None
    phone: Optional[str] = None
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    is_verified: bool
    is_public: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    last_activity: datetime
    
    # Поля для сотрудников
    position: Optional[str] = None
    experience_years: Optional[int] = None
    skills: Optional[List[str]] = None
    languages: Optional[List[str]] = None
    education: Optional[List[Dict[str, Any]]] = None
    achievements: Optional[List[str]] = None
    
    # Поля для компаний
    company_name: Optional[str] = None
    industry: Optional[str] = None
    company_size: Optional[str] = None
    founded_year: Optional[int] = None
    website: Optional[str] = None
    description: Optional[str] = None
    benefits: Optional[List[str]] = None
    specialties: Optional[List[str]] = None
    
    # Поля для агентов
    agency_name: Optional[str] = None
    license_number: Optional[str] = None
    success_rate: Optional[int] = None
    rating: Optional[int] = None
    preferences: Optional[List[str]] = None

    class Config:
        from_attributes = True


class ProfileWithUserResponse(ProfileResponse):
    user: Optional[Dict[str, Any]] = None


class ProfileStatsResponse(BaseModel):
    profile_views: int = 0
    transfer_requests: int = 0
    successful_transfers: int = 0
    rating: Optional[float] = None
    last_activity: datetime


class EmptyProfileResponse(BaseModel):
    message: str
    profile_type: ProfileType
    is_empty: bool = True
