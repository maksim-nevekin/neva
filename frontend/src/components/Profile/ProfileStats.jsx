import React, { useState, useEffect } from 'react'
import { apiClient } from '../../utils/apiClient'

function ProfileStats({ profile }) {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsData = await apiClient.getProfileStats()
        setStats(statsData)
      } catch (err) {
        console.error('Stats loading error:', err)
        // Используем дефолтные значения при ошибке
        setStats({
          profile_views: 0,
          transfer_requests: 0,
          successful_transfers: 0,
          rating: profile.rating || null,
          last_activity: profile.last_activity
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [profile])

  const renderEmployeeStats = () => (
    <>
      <div className="stats-section">
        <h3 className="stats-section-title">
          📊 Статистика профиля
        </h3>
        <div className="stat-card">
          <div className="stat-icon">👁️</div>
          <div className="stat-content">
            <span className="stat-value">{stats?.profile_views || 0}</span>
            <span className="stat-label">Просмотров профиля</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📨</div>
          <div className="stat-content">
            <span className="stat-value">{stats?.transfer_requests || 0}</span>
            <span className="stat-label">Запросов на перевод</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <span className="stat-value">{stats?.successful_transfers || 0}</span>
            <span className="stat-label">Успешных переводов</span>
          </div>
        </div>
        {stats?.rating && (
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <span className="stat-value">{stats.rating}</span>
              <span className="stat-label">Рейтинг</span>
            </div>
          </div>
        )}
      </div>

      <div className="stats-section">
        <h3 className="stats-section-title">
          🕒 Активность
        </h3>
        <div className="activity-item">
          <div className="activity-icon">🕐</div>
          <div className="activity-content">
            <span className="activity-label">Последняя активность</span>
            <span className="activity-value">
              {new Date(stats?.last_activity || profile.last_activity).toLocaleDateString('ru-RU')}
            </span>
          </div>
        </div>
        <div className="activity-item">
          <div className="activity-icon">📅</div>
          <div className="activity-content">
            <span className="activity-label">Профиль создан</span>
            <span className="activity-value">
              {new Date(profile.created_at).toLocaleDateString('ru-RU')}
            </span>
          </div>
        </div>
      </div>
    </>
  )

  const renderCompanyStats = () => (
    <>
      <div className="stats-section">
        <h3 className="stats-section-title">
          📊 Статистика компании
        </h3>
        <div className="stat-card">
          <div className="stat-icon">👁️</div>
          <div className="stat-content">
            <span className="stat-value">{stats?.profile_views || 0}</span>
            <span className="stat-label">Просмотров профиля</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <span className="stat-value">{stats?.transfer_requests || 0}</span>
            <span className="stat-label">Активных переводов</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <span className="stat-value">{stats?.successful_transfers || 0}</span>
            <span className="stat-label">Успешных переводов</span>
          </div>
        </div>
        {stats?.rating && (
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <span className="stat-value">{stats.rating}</span>
              <span className="stat-label">Средний рейтинг</span>
            </div>
          </div>
        )}
      </div>

      <div className="stats-section">
        <h3 className="stats-section-title">
          🏢 Информация о компании
        </h3>
        <div className="company-info-item">
          <div className="info-icon">📅</div>
          <div className="info-content">
            <span className="info-label">Год основания</span>
            <span className="info-value">
              {profile.founded_year || 'Не указан'}
            </span>
          </div>
        </div>
        <div className="company-info-item">
          <div className="info-icon">👥</div>
          <div className="info-content">
            <span className="info-label">Размер компании</span>
            <span className="info-value">
              {profile.company_size || 'Не указан'}
            </span>
          </div>
        </div>
        <div className="company-info-item">
          <div className="info-icon">🏭</div>
          <div className="info-content">
            <span className="info-label">Отрасль</span>
            <span className="info-value">
              {profile.industry || 'Не указана'}
            </span>
          </div>
        </div>
      </div>
    </>
  )

  const renderAgentStats = () => (
    <>
      <div className="stats-section">
        <h3 className="stats-section-title">
          📊 Статистика агента
        </h3>
        <div className="stat-card">
          <div className="stat-icon">👁️</div>
          <div className="stat-content">
            <span className="stat-value">{stats?.profile_views || 0}</span>
            <span className="stat-label">Просмотров профиля</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <span className="stat-value">{stats?.transfer_requests || 0}</span>
            <span className="stat-label">Активных переводов</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <span className="stat-value">{stats?.successful_transfers || 0}</span>
            <span className="stat-label">Успешных переводов</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <span className="stat-value">{profile.success_rate || 0}%</span>
            <span className="stat-label">Успешность</span>
          </div>
        </div>
        {profile.rating && (
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <span className="stat-value">{profile.rating}/5</span>
              <span className="stat-label">Рейтинг</span>
            </div>
          </div>
        )}
      </div>

      <div className="stats-section">
        <h3 className="stats-section-title">
          🕒 Доступность
        </h3>
        <div className="availability-item">
          <div className="availability-icon">🟢</div>
          <div className="availability-content">
            <span className="availability-label">Статус</span>
            <span className="availability-value">
              {profile.status === 'available' ? 'Доступен' : 'Недоступен'}
            </span>
          </div>
        </div>
        <div className="availability-item">
          <div className="availability-icon">🕐</div>
          <div className="availability-content">
            <span className="availability-label">Последняя активность</span>
            <span className="availability-value">
              {new Date(stats?.last_activity || profile.last_activity).toLocaleDateString('ru-RU')}
            </span>
          </div>
        </div>
      </div>
    </>
  )

  if (loading) {
    return (
      <div className="profile-stats">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <div className="profile-stats">
      <div className="profile-stats-content">
        {profile.profile_type === 'employee' && renderEmployeeStats()}
        {profile.profile_type === 'company' && renderCompanyStats()}
        {profile.profile_type === 'agent' && renderAgentStats()}
      </div>
    </div>
  )
}

export default ProfileStats