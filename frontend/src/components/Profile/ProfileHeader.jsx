import React from 'react'
import { formatProfileDate } from '../../utils/dateUtils'

function ProfileHeader({ profile, isOwnProfile, onEdit, onChangeType, onChangeStatus }) {
  const getProfileTypeLabel = (type) => {
    const labels = {
      employee: 'Сотрудник',
      company: 'Компания',
      agent: 'Агент'
    }
    return labels[type] || 'Пользователь'
  }

  const getProfileTypeIcon = (type) => {
    const icons = {
      employee: '👨‍💼',
      company: '🏢',
      agent: '🤝'
    }
    return icons[type] || '👤'
  }

  const getStatusLabel = (status) => {
    const labels = {
      available: 'Доступен',
      transfer: 'В процессе перевода',
      completed: 'Перевод завершен',
      unavailable: 'Недоступен'
    }
    return labels[status] || 'Неизвестно'
  }

  const getDisplayName = () => {
    if (profile.profile_type === 'company') {
      return profile.company_name || 'Название компании'
    } else if (profile.profile_type === 'agent') {
      return profile.agency_name || 'Название агентства'
    } else {
      const firstName = profile.first_name || ''
      const lastName = profile.last_name || ''
      return `${firstName} ${lastName}`.trim() || 'Имя не указано'
    }
  }

  const getPositionOrIndustry = () => {
    if (profile.profile_type === 'employee') {
      return profile.position || 'Должность не указана'
    } else if (profile.profile_type === 'company') {
      return profile.industry || 'Отрасль не указана'
    } else {
      return `Лицензия: ${profile.license_number || 'Не указана'}`
    }
  }

  const getAvatarUrl = () => {
    if (profile.avatar_url) {
      return profile.avatar_url
    }
    
    // Возвращаем дефолтный аватар в зависимости от типа профиля
    const defaultAvatars = {
      employee: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      company: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop',
      agent: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
    
    return defaultAvatars[profile.profile_type] || defaultAvatars.employee
  }

  return (
    <div className="profile-header">
      <div className="profile-header-content">
        <div className="profile-avatar-section">
          <div className="profile-avatar-container">
            <img 
              src={getAvatarUrl()} 
              alt={getDisplayName()}
              className={`profile-avatar ${profile.profile_type === 'company' ? 'company-avatar' : ''}`}
            />
            <div className="profile-type-badge">
              {getProfileTypeIcon(profile.profile_type)} {getProfileTypeLabel(profile.profile_type)}
            </div>
          </div>
        </div>

        <div className="profile-info-section">
          <div className="profile-name-section">
            <h1 className="profile-name">{getDisplayName()}</h1>
            <p className="profile-position">{getPositionOrIndustry()}</p>
            
            {profile.profile_type === 'company' && (
              <>
                <p className="profile-size">{profile.company_size || 'Размер компании не указан'}</p>
                {profile.founded_year && (
                  <p className="profile-founded">Основана в {profile.founded_year} году</p>
                )}
              </>
            )}
            
            {profile.profile_type === 'agent' && (
              <>
                <p className="profile-success-rate">
                  Успешность: {profile.success_rate || 0}%
                </p>
                {profile.rating && (
                  <p className="profile-rating">
                    ⭐ {profile.rating}/5
                  </p>
                )}
              </>
            )}
          </div>

          <div className="profile-meta">
            {profile.location && (
              <div className="profile-location">
                📍 {profile.location}
              </div>
            )}
            
            {profile.profile_type === 'employee' && profile.experience_years && (
              <div className="profile-experience">
                💼 {profile.experience_years} лет опыта
              </div>
            )}
            
            <div className={`profile-status status-${profile.status}`}>
              {getStatusLabel(profile.status)}
            </div>
          </div>
        </div>

        <div className="profile-actions-section">
          <div className="profile-action-buttons">
            {isOwnProfile ? (
              <>
                <button 
                  className="btn btn-primary btn-block"
                  onClick={onEdit}
                >
                  ✏️ Редактировать профиль
                </button>
                
                <select 
                  className="form-select"
                  value={profile.profile_type}
                  onChange={(e) => onChangeType(e.target.value)}
                >
                  <option value="employee">Сотрудник</option>
                  <option value="company">Компания</option>
                  <option value="agent">Агент</option>
                </select>
                
                <select 
                  className="form-select"
                  value={profile.status}
                  onChange={(e) => onChangeStatus(e.target.value)}
                >
                  <option value="available">Доступен</option>
                  <option value="transfer">В процессе перевода</option>
                  <option value="completed">Перевод завершен</option>
                  <option value="unavailable">Недоступен</option>
                </select>
              </>
            ) : (
              <>
                <button className="btn btn-primary btn-block">
                  💬 Написать сообщение
                </button>
                <button className="btn btn-outline btn-block">
                  🔄 Предложить перевод
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="profile-footer">
        <div className="profile-activity">
          <span className="activity-label">Последняя активность</span>
          <span className="activity-time">
            {formatProfileDate(profile.last_activity)}
          </span>
        </div>
        <div className="profile-created">
          <span className="created-label">Профиль создан</span>
          <span className="created-date">
            {formatProfileDate(profile.created_at)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader