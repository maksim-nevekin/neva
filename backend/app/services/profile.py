from sqlalchemy.orm import Session
from fastapi import HTTPException
from typing import Optional, List
from app.models.profile import Profile, ProfileType, ProfileStatus
from app.models.user import User
from app.schemas.profile import (
    ProfileUpdate, ProfileResponse, 
    EmployeeProfileCreate, CompanyProfileCreate, AgentProfileCreate
)
from datetime import datetime


class ProfileService:
    def __init__(self, db: Session):
        self.db = db

    def create_empty_profile(self, user_id: int, profile_type: ProfileType = ProfileType.EMPLOYEE) -> Profile:
        """Создание пустого профиля для нового пользователя"""
        # Проверяем, что у пользователя еще нет профиля
        existing_profile = self.db.query(Profile).filter(Profile.user_id == user_id).first()
        if existing_profile:
            raise HTTPException(
                status_code=400,
                detail="Profile already exists for this user"
            )
        
        # Проверяем, что пользователь существует
        user = self.db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found"
            )
        
        # Создаем пустой профиль
        profile = Profile(
            user_id=user_id,
            profile_type=profile_type,
            status=ProfileStatus.AVAILABLE,
            is_verified=False,
            is_public=True
        )
        
        self.db.add(profile)
        self.db.commit()
        self.db.refresh(profile)
        
        return profile

    def get_profile_by_user_id(self, user_id: int) -> Optional[Profile]:
        """Получение профиля по ID пользователя"""
        return self.db.query(Profile).filter(Profile.user_id == user_id).first()

    def get_profile_by_id(self, profile_id: int) -> Optional[Profile]:
        """Получение профиля по ID"""
        return self.db.query(Profile).filter(Profile.id == profile_id).first()

    def get_public_profile(self, user_id: int) -> Optional[Profile]:
        """Получение публичного профиля пользователя"""
        return self.db.query(Profile).filter(
            Profile.user_id == user_id,
            Profile.is_public == True
        ).first()

    def update_profile(self, user_id: int, profile_data: ProfileUpdate) -> Profile:
        """Обновление профиля пользователя"""
        profile = self.get_profile_by_user_id(user_id)
        if not profile:
            raise HTTPException(
                status_code=404,
                detail="Profile not found"
            )
        
        # Обновляем только переданные поля
        update_data = profile_data.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(profile, field, value)
        
        profile.updated_at = datetime.utcnow()
        profile.last_activity = datetime.utcnow()
        
        self.db.commit()
        self.db.refresh(profile)
        
        return profile

    def delete_profile(self, user_id: int) -> bool:
        """Удаление профиля пользователя"""
        profile = self.get_profile_by_user_id(user_id)
        if not profile:
            raise HTTPException(
                status_code=404,
                detail="Profile not found"
            )
        
        self.db.delete(profile)
        self.db.commit()
        
        return True

    def change_profile_type(self, user_id: int, new_type: ProfileType) -> Profile:
        """Изменение типа профиля"""
        profile = self.get_profile_by_user_id(user_id)
        if not profile:
            raise HTTPException(
                status_code=404,
                detail="Profile not found"
            )
        
        # Очищаем поля, специфичные для предыдущего типа
        if profile.profile_type != new_type:
            # Очищаем поля сотрудника
            if profile.profile_type == ProfileType.EMPLOYEE:
                profile.position = None
                profile.experience_years = None
                profile.skills = None
                profile.languages = None
                profile.education = None
                profile.achievements = None
            
            # Очищаем поля компании
            elif profile.profile_type == ProfileType.COMPANY:
                profile.company_name = None
                profile.industry = None
                profile.company_size = None
                profile.founded_year = None
                profile.website = None
                profile.description = None
                profile.benefits = None
                profile.specialties = None
            
            # Очищаем поля агента
            elif profile.profile_type == ProfileType.AGENT:
                profile.agency_name = None
                profile.license_number = None
                profile.success_rate = None
                profile.rating = None
                profile.preferences = None
            
            profile.profile_type = new_type
            profile.updated_at = datetime.utcnow()
            
            self.db.commit()
            self.db.refresh(profile)
        
        return profile

    def get_profiles_by_type(self, profile_type: ProfileType, skip: int = 0, limit: int = 100) -> List[Profile]:
        """Получение профилей по типу"""
        return self.db.query(Profile).filter(
            Profile.profile_type == profile_type,
            Profile.is_public == True
        ).offset(skip).limit(limit).all()

    def search_profiles(self, query: str, profile_type: Optional[ProfileType] = None, skip: int = 0, limit: int = 100) -> List[Profile]:
        """Поиск профилей по запросу"""
        search_query = self.db.query(Profile).filter(Profile.is_public == True)
        
        if profile_type:
            search_query = search_query.filter(Profile.profile_type == profile_type)
        
        # Поиск по имени, позиции, компании, навыкам и т.д.
        search_conditions = [
            Profile.first_name.ilike(f"%{query}%"),
            Profile.last_name.ilike(f"%{query}%"),
            Profile.position.ilike(f"%{query}%"),
            Profile.company_name.ilike(f"%{query}%"),
            Profile.industry.ilike(f"%{query}%"),
            Profile.bio.ilike(f"%{query}%")
        ]
        
        from sqlalchemy import or_
        search_query = search_query.filter(or_(*search_conditions))
        
        return search_query.offset(skip).limit(limit).all()

    def update_last_activity(self, user_id: int):
        """Обновление времени последней активности"""
        profile = self.get_profile_by_user_id(user_id)
        if profile:
            profile.last_activity = datetime.utcnow()
            self.db.commit()

    def verify_profile(self, profile_id: int) -> Profile:
        """Верификация профиля (только для админов)"""
        profile = self.get_profile_by_id(profile_id)
        if not profile:
            raise HTTPException(
                status_code=404,
                detail="Profile not found"
            )
        
        profile.is_verified = True
        profile.updated_at = datetime.utcnow()
        
        self.db.commit()
        self.db.refresh(profile)
        
        return profile
