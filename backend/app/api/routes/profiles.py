from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db import get_db
from app.schemas.profile import (
    ProfileResponse, ProfileUpdate, ProfileWithUserResponse,
    EmployeeProfileCreate, CompanyProfileCreate, AgentProfileCreate,
    ProfileStatsResponse, EmptyProfileResponse
)
from app.services.profile import ProfileService
from app.services.auth import AuthService
from app.models.user import User
from app.models.profile import ProfileType, ProfileStatus, Profile
from datetime import datetime

router = APIRouter(prefix="/profiles", tags=["profiles"])


@router.post("/create-empty", response_model=ProfileResponse)
async def create_empty_profile(
    profile_type: ProfileType = ProfileType.EMPLOYEE,
    db: Session = Depends(get_db),
    current_user: User = Depends(AuthService.get_current_active_user)
):
    """
    Создание пустого профиля для текущего пользователя
    """
    profile_service = ProfileService(db)
    try:
        profile = profile_service.create_empty_profile(current_user.id, profile_type)
        return profile
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail="Failed to create profile"
        )


@router.get("/me", response_model=ProfileResponse)
async def get_my_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(AuthService.get_current_active_user)
):
    """
    Получение профиля текущего пользователя
    """
    profile_service = ProfileService(db)
    profile = profile_service.get_profile_by_user_id(current_user.id)
    
    if not profile:
        # Если профиль не существует, создаем пустой
        profile = profile_service.create_empty_profile(current_user.id)
    
    return profile


@router.put("/me", response_model=ProfileResponse)
async def update_my_profile(
    profile_data: ProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(AuthService.get_current_active_user)
):
    """
    Обновление профиля текущего пользователя
    """
    profile_service = ProfileService(db)
    try:
        profile = profile_service.update_profile(current_user.id, profile_data)
        return profile
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail="Failed to update profile"
        )


@router.delete("/me")
async def delete_my_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(AuthService.get_current_active_user)
):
    """
    Удаление профиля текущего пользователя
    """
    profile_service = ProfileService(db)
    try:
        profile_service.delete_profile(current_user.id)
        return {"message": "Profile deleted successfully"}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail="Failed to delete profile"
        )


@router.get("/{user_id}", response_model=ProfileWithUserResponse)
async def get_user_profile(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(AuthService.get_current_active_user)
):
    """
    Получение публичного профиля пользователя
    """
    profile_service = ProfileService(db)
    profile = profile_service.get_public_profile(user_id)
    
    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found or not public"
        )
    
    # Обновляем активность при просмотре
    profile_service.update_last_activity(user_id)
    
    # Добавляем информацию о пользователе
    user_data = {
        "id": profile.user.id,
        "username": profile.user.username,
        "email": profile.user.email,
        "created_at": profile.user.created_at
    }
    
    profile_dict = profile.__dict__.copy()
    profile_dict["user"] = user_data
    
    return profile_dict


@router.get("/", response_model=List[ProfileWithUserResponse])
async def get_profiles(
    profile_type: Optional[ProfileType] = Query(None, description="Filter by profile type"),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(AuthService.get_current_active_user)
):
    """
    Получение списка публичных профилей
    """
    profile_service = ProfileService(db)
    
    if profile_type:
        profiles = profile_service.get_profiles_by_type(profile_type, skip, limit)
    else:
        # Получаем все публичные профили
        profiles = db.query(Profile).filter(
            Profile.is_public == True
        ).offset(skip).limit(limit).all()
    
    # Добавляем информацию о пользователях
    result = []
    for profile in profiles:
        user_data = {
            "id": profile.user.id,
            "username": profile.user.username,
            "email": profile.user.email,
            "created_at": profile.user.created_at
        }
        
        profile_dict = profile.__dict__.copy()
        profile_dict["user"] = user_data
        result.append(profile_dict)
    
    return result


@router.get("/search/", response_model=List[ProfileWithUserResponse])
async def search_profiles(
    q: str = Query(..., min_length=2, description="Search query"),
    profile_type: Optional[ProfileType] = Query(None, description="Filter by profile type"),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(AuthService.get_current_active_user)
):
    """
    Поиск профилей по запросу
    """
    profile_service = ProfileService(db)
    profiles = profile_service.search_profiles(q, profile_type, skip, limit)
    
    # Добавляем информацию о пользователях
    result = []
    for profile in profiles:
        user_data = {
            "id": profile.user.id,
            "username": profile.user.username,
            "email": profile.user.email,
            "created_at": profile.user.created_at
        }
        
        profile_dict = profile.__dict__.copy()
        profile_dict["user"] = user_data
        result.append(profile_dict)
    
    return result


@router.get("/me/stats", response_model=ProfileStatsResponse)
async def get_my_profile_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(AuthService.get_current_active_user)
):
    """
    Получение статистики профиля текущего пользователя
    """
    profile_service = ProfileService(db)
    profile = profile_service.get_profile_by_user_id(current_user.id)
    
    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )
    
    # Здесь можно добавить логику для получения реальной статистики
    # Пока возвращаем базовые данные
    stats = ProfileStatsResponse(
        profile_views=0,  # TODO: Реализовать подсчет просмотров
        transfer_requests=0,  # TODO: Реализовать подсчет запросов на перевод
        successful_transfers=0,  # TODO: Реализовать подсчет успешных переводов
        rating=profile.rating if profile.rating else None,
        last_activity=profile.last_activity
    )
    
    return stats


@router.put("/me/type", response_model=ProfileResponse)
async def change_profile_type(
    new_type: ProfileType,
    db: Session = Depends(get_db),
    current_user: User = Depends(AuthService.get_current_active_user)
):
    """
    Изменение типа профиля
    """
    profile_service = ProfileService(db)
    try:
        profile = profile_service.change_profile_type(current_user.id, new_type)
        return profile
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail="Failed to change profile type"
        )


@router.put("/me/status", response_model=ProfileResponse)
async def change_profile_status(
    status: ProfileStatus,
    db: Session = Depends(get_db),
    current_user: User = Depends(AuthService.get_current_active_user)
):
    """
    Изменение статуса профиля
    """
    profile_service = ProfileService(db)
    profile = profile_service.get_profile_by_user_id(current_user.id)
    
    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )
    
    profile.status = status
    profile.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(profile)
    
    return profile


@router.post("/me/verify", response_model=ProfileResponse)
async def verify_profile(
    profile_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(AuthService.get_current_active_user)
):
    """
    Верификация профиля (только для админов)
    """
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=403,
            detail="Not enough permissions"
        )
    
    profile_service = ProfileService(db)
    try:
        profile = profile_service.verify_profile(profile_id)
        return profile
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail="Failed to verify profile"
        )
