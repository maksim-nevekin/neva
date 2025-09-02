import React from 'react'
import { formatDate } from '../../utils/dateUtils'

function ProfileHeader({ profile, isOwnProfile, onEdit }) {
  const getProfileTypeLabel = (type) => {
    const labels = {
      employee: 'Сотрудник',
      company: 'Компания',
      agent: 'HR Агент'
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
      available: 'Доступен для трансфера',
      in_transfer: 'В процессе трансфера',
      transferred: 'Трансфер завершен',
      unavailable: 'Недоступен'
    }
    return labels[status] || 'Неизвестно'
  }

  const getStatusClass = (status) => {
    const classes = {
      available: 'status-available',
      in_transfer: 'status-transfer',
      transferred: 'status-completed',
      unavailable: 'status-unavailable'
    }
    return classes[status] || 'status-unknown'
  }

  const renderEmployeeHeader = () => (
    <div className="profile-header-content">
      <div className="profile-avatar-section">
        <div className="profile-avatar-container">
          <img 
            src={profile.avatar} 
            alt={`${profile.firstName} ${profile.lastName}`}
            className="profile-avatar"
          />
          <div className="profile-type-badge">
            {getProfileTypeIcon(profile.type)} {getProfileTypeLabel(profile.type)}
          </div>
        </div>
      </div>
      
      <div className="profile-info-section">
        <div className="profile-name-section">
          <h1 className="profile-name">
            {profile.firstName} {profile.lastName}
          </h1>
          <div className="profile-position">{profile.position}</div>
          <div className="profile-company">в {profile.company}</div>
        </div>
        
        <div className="profile-meta">
          <div className="profile-location">📍 {profile.location}</div>
          <div className="profile-experience">💼 {profile.experience} опыта</div>
          {profile.status && (
            <div className={`profile-status ${getStatusClass(profile.status)}`}>
              {getStatusLabel(profile.status)}
            </div>
          )}
        </div>
      </div>
      
      <div className="profile-actions-section">
        {isOwnProfile ? (
          <button onClick={onEdit} className="btn btn-primary">
            ✏️ Редактировать профиль
          </button>
        ) : (
          <div className="profile-action-buttons">
            <button className="btn btn-primary">
              💬 Написать сообщение
            </button>
            <button className="btn btn-outline btn-primary">
              📋 Предложить трансфер
            </button>
          </div>
        )}
      </div>
    </div>
  )

  const renderCompanyHeader = () => (
    <div className="profile-header-content">
      <div className="profile-avatar-section">
        <div className="profile-avatar-container">
          <img 
            src={profile.avatar} 
            alt={profile.name}
            className="profile-avatar company-avatar"
          />
          <div className="profile-type-badge">
            {getProfileTypeIcon(profile.type)} {getProfileTypeLabel(profile.type)}
          </div>
        </div>
      </div>
      
      <div className="profile-info-section">
        <div className="profile-name-section">
          <h1 className="profile-name">{profile.name}</h1>
          <div className="profile-industry">{profile.industry}</div>
          <div className="profile-size">👥 {profile.size}</div>
        </div>
        
        <div className="profile-meta">
          <div className="profile-location">📍 {profile.location}</div>
          <div className="profile-founded">🏗️ Основана в {profile.founded}</div>
          <div className="profile-rating">
            ⭐ {profile.rating} ({profile.reviews} отзывов)
          </div>
        </div>
      </div>
      
      <div className="profile-actions-section">
        {isOwnProfile ? (
          <button onClick={onEdit} className="btn btn-primary">
            ✏️ Редактировать профиль
          </button>
        ) : (
          <div className="profile-action-buttons">
            <button className="btn btn-primary">
              💼 Посмотреть вакансии
            </button>
            <button className="btn btn-outline btn-primary">
              📋 Предложить сотрудника
            </button>
          </div>
        )}
      </div>
    </div>
  )

  const renderAgentHeader = () => (
    <div className="profile-header-content">
      <div className="profile-avatar-section">
        <div className="profile-avatar-container">
          <img 
            src={profile.avatar} 
            alt={`${profile.firstName} ${profile.lastName}`}
            className="profile-avatar"
          />
          <div className="profile-type-badge">
            {getProfileTypeIcon(profile.type)} {getProfileTypeLabel(profile.type)}
          </div>
        </div>
      </div>
      
      <div className="profile-info-section">
        <div className="profile-name-section">
          <h1 className="profile-name">
            {profile.firstName} {profile.lastName}
          </h1>
          <div className="profile-position">{profile.position}</div>
          <div className="profile-company">в {profile.company}</div>
        </div>
        
        <div className="profile-meta">
          <div className="profile-location">📍 {profile.location}</div>
          <div className="profile-experience">💼 {profile.experience} опыта</div>
          <div className="profile-success-rate">
            🎯 {profile.successRate}% успешных трансферов
          </div>
        </div>
      </div>
      
      <div className="profile-actions-section">
        {isOwnProfile ? (
          <button onClick={onEdit} className="btn btn-primary">
            ✏️ Редактировать профиль
          </button>
        ) : (
          <div className="profile-action-buttons">
            <button className="btn btn-primary">
              💬 Написать сообщение
            </button>
            <button className="btn btn-outline btn-primary">
              🤝 Начать сотрудничество
            </button>
          </div>
        )}
      </div>
    </div>
  )

  const renderHeader = () => {
    switch (profile.type) {
      case 'employee':
        return renderEmployeeHeader()
      case 'company':
        return renderCompanyHeader()
      case 'agent':
        return renderAgentHeader()
      default:
        return renderEmployeeHeader()
    }
  }

  return (
    <div className="profile-header">
      {renderHeader()}
      
      <div className="profile-footer">
        <div className="profile-activity">
          <span className="activity-label">Последняя активность:</span>
          <span className="activity-time">
            {formatDate(profile.lastActive)}
          </span>
        </div>
        
        <div className="profile-created">
          <span className="created-label">На платформе с:</span>
          <span className="created-date">
            {formatDate(profile.createdAt)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
