import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { apiClient } from '../../utils/apiClient'
import ProfileHeader from './ProfileHeader'
import ProfileInfo from './ProfileInfo'
import ProfileStats from './ProfileStats'
import ProfileActions from './ProfileActions'
import ProfileEditModal from './ProfileEditModal'
import './profile.css'

function Profile() {
  const { user: currentUser, isAuthenticated } = useAuth()
  const { userId } = useParams()
  const navigate = useNavigate()
  
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  
  const isOwnProfile = !userId || (currentUser && currentUser.id === parseInt(userId))
  const targetUserId = userId ? parseInt(userId) : (currentUser ? currentUser.id : null)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    const fetchProfile = async () => {
      try {
        setLoading(true)
        setError(null)
        
        let profileData
        if (isOwnProfile) {
          // Получаем свой профиль
          profileData = await apiClient.getMyProfile()
        } else {
          // Получаем профиль другого пользователя
          profileData = await apiClient.getUserProfile(targetUserId)
        }
        
        setProfile(profileData)
      } catch (err) {
        console.error('Profile loading error:', err)
        if (err.message.includes('404')) {
          setError('Профиль не найден')
        } else if (err.message.includes('401')) {
          setError('Необходима авторизация')
          navigate('/login')
        } else {
          setError('Ошибка загрузки профиля')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [targetUserId, isOwnProfile, isAuthenticated, navigate])

  const handleEditProfile = () => {
    setIsEditModalOpen(true)
  }

  const handleSaveProfile = async (profileData) => {
    try {
      const updatedProfile = await apiClient.updateProfile(profileData)
      setProfile(updatedProfile)
      setIsEditModalOpen(false)
    } catch (err) {
      console.error('Profile update error:', err)
      // Здесь можно добавить уведомление об ошибке
    }
  }

  const handleChangeProfileType = async (newType) => {
    try {
      const updatedProfile = await apiClient.changeProfileType(newType)
      setProfile(updatedProfile)
    } catch (err) {
      console.error('Profile type change error:', err)
    }
  }

  const handleChangeStatus = async (newStatus) => {
    try {
      const updatedProfile = await apiClient.changeProfileStatus(newStatus)
      setProfile(updatedProfile)
    } catch (err) {
      console.error('Profile status change error:', err)
    }
  }

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-loading">
          <div className="loading-spinner"></div>
          <h3>Загрузка профиля...</h3>
          <p>Пожалуйста, подождите</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="profile-error">
          <div className="error-icon">⚠️</div>
          <h3>Ошибка загрузки</h3>
          <p>{error}</p>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Попробовать снова
          </button>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="profile-container">
        <div className="profile-not-found">
          <div className="not-found-icon">👤</div>
          <h3>Профиль не найден</h3>
          <p>Пользователь с таким ID не существует или профиль скрыт</p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/')}
          >
            Вернуться на главную
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-main">
          <ProfileHeader 
            profile={profile}
            isOwnProfile={isOwnProfile}
            onEdit={handleEditProfile}
            onChangeType={handleChangeProfileType}
            onChangeStatus={handleChangeStatus}
          />
          
          <ProfileInfo profile={profile} />
        </div>
        
        <div className="profile-sidebar">
          <ProfileStats profile={profile} />
          <ProfileActions 
            profile={profile}
            isOwnProfile={isOwnProfile}
            onEdit={handleEditProfile}
            onChangeStatus={handleChangeStatus}
          />
        </div>
      </div>

      {isEditModalOpen && (
        <ProfileEditModal
          profile={profile}
          onSave={handleSaveProfile}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  )
}

export default Profile