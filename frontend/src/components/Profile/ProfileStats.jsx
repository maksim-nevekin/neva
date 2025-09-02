import React from 'react'

function ProfileStats({ profile }) {
  const renderEmployeeStats = () => (
    <div className="profile-stats-content">
      <div className="stats-section">
        <h3 className="stats-section-title">📊 Статистика профиля</h3>
        
        <div className="stat-card">
          <div className="stat-icon">👁️</div>
          <div className="stat-content">
            <div className="stat-value">1,247</div>
            <div className="stat-label">Просмотров профиля</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <div className="stat-value">{profile.transferHistory?.length || 0}</div>
            <div className="stat-label">Трансферов</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <div className="stat-value">4.8</div>
            <div className="stat-label">Рейтинг</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💼</div>
          <div className="stat-content">
            <div className="stat-value">{profile.experience}</div>
            <div className="stat-label">Опыт работы</div>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <h3 className="stats-section-title">🎯 Активность</h3>
        
        <div className="activity-item">
          <div className="activity-icon">📅</div>
          <div className="activity-content">
            <div className="activity-label">Последнее обновление</div>
            <div className="activity-value">2 дня назад</div>
          </div>
        </div>

        <div className="activity-item">
          <div className="activity-icon">🔍</div>
          <div className="activity-content">
            <div className="activity-label">Поиск работы</div>
            <div className="activity-value">Активен</div>
          </div>
        </div>

        <div className="activity-item">
          <div className="activity-icon">📱</div>
          <div className="activity-content">
            <div className="activity-label">Онлайн статус</div>
            <div className="activity-value">Онлайн</div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCompanyStats = () => (
    <div className="profile-stats-content">
      <div className="stats-section">
        <h3 className="stats-section-title">📊 Статистика компании</h3>
        
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-value">{profile.size}</div>
            <div className="stat-label">Размер команды</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💼</div>
          <div className="stat-content">
            <div className="stat-value">{profile.openPositions}</div>
            <div className="stat-label">Открытых вакансий</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <div className="stat-value">{profile.transferRequests}</div>
            <div className="stat-label">Запросов на трансфер</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <div className="stat-value">{profile.successRate}%</div>
            <div className="stat-label">Успешных трансферов</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <div className="stat-value">{profile.rating}</div>
            <div className="stat-label">Рейтинг ({profile.reviews} отзывов)</div>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <h3 className="stats-section-title">🏢 Информация о компании</h3>
        
        <div className="company-info-item">
          <div className="info-icon">🏗️</div>
          <div className="info-content">
            <div className="info-label">Основана</div>
            <div className="info-value">{profile.founded}</div>
          </div>
        </div>

        <div className="company-info-item">
          <div className="info-icon">📍</div>
          <div className="info-content">
            <div className="info-label">Локация</div>
            <div className="info-value">{profile.location}</div>
          </div>
        </div>

        <div className="company-info-item">
          <div className="info-icon">🌐</div>
          <div className="info-content">
            <div className="info-label">Веб-сайт</div>
            <div className="info-value">
              <a href={profile.website} target="_blank" rel="noopener noreferrer">
                Открыть
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAgentStats = () => (
    <div className="profile-stats-content">
      <div className="stats-section">
        <h3 className="stats-section-title">📊 Статистика агента</h3>
        
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <div className="stat-value">{profile.successRate}%</div>
            <div className="stat-label">Успешных трансферов</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-value">{profile.completedTransfers}</div>
            <div className="stat-label">Завершенных трансферов</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <div className="stat-value">{profile.activeTransfers}</div>
            <div className="stat-label">Активных трансферов</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <div className="stat-value">{profile.rating}</div>
            <div className="stat-label">Рейтинг ({profile.reviews} отзывов)</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💼</div>
          <div className="stat-content">
            <div className="stat-value">{profile.experience}</div>
            <div className="stat-label">Опыт работы</div>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <h3 className="stats-section-title">📅 Доступность</h3>
        
        <div className="availability-item">
          <div className="availability-icon">🕐</div>
          <div className="availability-content">
            <div className="availability-label">Рабочие часы</div>
            <div className="availability-value">{profile.availability}</div>
          </div>
        </div>

        <div className="availability-item">
          <div className="availability-icon">🌍</div>
          <div className="availability-content">
            <div className="availability-label">Часовой пояс</div>
            <div className="availability-value">MSK (UTC+3)</div>
          </div>
        </div>

        <div className="availability-item">
          <div className="availability-icon">📱</div>
          <div className="availability-content">
            <div className="availability-label">Ответ в течение</div>
            <div className="availability-value">2-4 часов</div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStats = () => {
    switch (profile.type) {
      case 'employee':
        return renderEmployeeStats()
      case 'company':
        return renderCompanyStats()
      case 'agent':
        return renderAgentStats()
      default:
        return renderEmployeeStats()
    }
  }

  return (
    <div className="profile-stats">
      {renderStats()}
    </div>
  )
}

export default ProfileStats
