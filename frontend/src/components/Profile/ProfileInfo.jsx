import React from 'react'

function ProfileInfo({ profile }) {
  const renderEmployeeInfo = () => (
    <div className="profile-info-content">
      <div className="info-section">
        <h3 className="section-title">📋 Основная информация</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">{profile.email}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Телефон:</span>
            <span className="info-value">{profile.phone}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Местоположение:</span>
            <span className="info-value">{profile.location}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Опыт работы:</span>
            <span className="info-value">{profile.experience}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Образование:</span>
            <span className="info-value">{profile.education}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Ожидаемая зарплата:</span>
            <span className="info-value">{profile.salary}</span>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h3 className="section-title">💬 О себе</h3>
        <p className="bio-text">{profile.bio}</p>
      </div>

      <div className="info-section">
        <h3 className="section-title">🛠️ Навыки и технологии</h3>
        <div className="skills-container">
          {profile.skills.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>

      <div className="info-section">
        <h3 className="section-title">🌍 Языки</h3>
        <div className="languages-container">
          {profile.languages.map((language, index) => (
            <span key={index} className="language-tag">{language}</span>
          ))}
        </div>
      </div>

      <div className="info-section">
        <h3 className="section-title">🏆 Достижения</h3>
        <div className="achievements-container">
          {profile.achievements.map((achievement, index) => (
            <div key={index} className="achievement-item">
              <span className="achievement-icon">🏆</span>
              <span className="achievement-text">{achievement}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="info-section">
        <h3 className="section-title">⚙️ Предпочтения</h3>
        <div className="preferences-container">
          {profile.preferences.map((preference, index) => (
            <span key={index} className="preference-tag">{preference}</span>
          ))}
        </div>
      </div>

      {profile.transferHistory && profile.transferHistory.length > 0 && (
        <div className="info-section">
          <h3 className="section-title">🔄 История трансферов</h3>
          <div className="transfer-history">
            {profile.transferHistory.map((transfer, index) => (
              <div key={index} className="transfer-item">
                <div className="transfer-arrow">
                  {transfer.from} → {transfer.to}
                </div>
                <div className="transfer-date">{transfer.date}</div>
                <div className={`transfer-status ${transfer.success ? 'success' : 'failed'}`}>
                  {transfer.success ? '✅ Успешно' : '❌ Неудачно'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const renderCompanyInfo = () => (
    <div className="profile-info-content">
      <div className="info-section">
        <h3 className="section-title">📋 Основная информация</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">{profile.email}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Телефон:</span>
            <span className="info-value">{profile.phone}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Веб-сайт:</span>
            <span className="info-value">
              <a href={profile.website} target="_blank" rel="noopener noreferrer">
                {profile.website}
              </a>
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Отрасль:</span>
            <span className="info-value">{profile.industry}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Размер компании:</span>
            <span className="info-value">{profile.size}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Основана:</span>
            <span className="info-value">{profile.founded}</span>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h3 className="section-title">💬 О компании</h3>
        <p className="bio-text">{profile.description}</p>
      </div>

      <div className="info-section">
        <h3 className="section-title">🎯 Специализации</h3>
        <div className="specialties-container">
          {profile.specialties.map((specialty, index) => (
            <span key={index} className="specialty-tag">{specialty}</span>
          ))}
        </div>
      </div>

      <div className="info-section">
        <h3 className="section-title">🎁 Преимущества для сотрудников</h3>
        <div className="benefits-container">
          {profile.benefits.map((benefit, index) => (
            <span key={index} className="benefit-tag">{benefit}</span>
          ))}
        </div>
      </div>

      <div className="info-section">
        <h3 className="section-title">🏢 Корпоративная культура</h3>
        <p className="culture-text">{profile.culture}</p>
      </div>

      <div className="info-section">
        <h3 className="section-title">📊 Статистика</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-value">{profile.openPositions}</span>
            <span className="stat-label">Открытых вакансий</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{profile.transferRequests}</span>
            <span className="stat-label">Запросов на трансфер</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{profile.successRate}%</span>
            <span className="stat-label">Успешных трансферов</span>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAgentInfo = () => (
    <div className="profile-info-content">
      <div className="info-section">
        <h3 className="section-title">📋 Основная информация</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">{profile.email}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Телефон:</span>
            <span className="info-value">{profile.phone}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Местоположение:</span>
            <span className="info-value">{profile.location}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Опыт работы:</span>
            <span className="info-value">{profile.experience}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Специализация:</span>
            <span className="info-value">{profile.specialization}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Доступность:</span>
            <span className="info-value">{profile.availability}</span>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h3 className="section-title">💬 О себе</h3>
        <p className="bio-text">{profile.bio}</p>
      </div>

      <div className="info-section">
        <h3 className="section-title">🛠️ Навыки</h3>
        <div className="skills-container">
          {profile.skills.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>

      <div className="info-section">
        <h3 className="section-title">🌍 Языки</h3>
        <div className="languages-container">
          {profile.languages.map((language, index) => (
            <span key={index} className="language-tag">{language}</span>
          ))}
        </div>
      </div>

      <div className="info-section">
        <h3 className="section-title">🎓 Образование и сертификации</h3>
        <div className="education-container">
          <div className="education-item">
            <span className="education-icon">🎓</span>
            <span className="education-text">{profile.education}</span>
          </div>
          {profile.certifications.map((cert, index) => (
            <div key={index} className="certification-item">
              <span className="certification-icon">📜</span>
              <span className="certification-text">{cert}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="info-section">
        <h3 className="section-title">📊 Статистика работы</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-value">{profile.successRate}%</span>
            <span className="stat-label">Успешных трансферов</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{profile.completedTransfers}</span>
            <span className="stat-label">Завершенных трансферов</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{profile.activeTransfers}</span>
            <span className="stat-label">Активных трансферов</span>
          </div>
        </div>
      </div>
    </div>
  )

  const renderInfo = () => {
    switch (profile.type) {
      case 'employee':
        return renderEmployeeInfo()
      case 'company':
        return renderCompanyInfo()
      case 'agent':
        return renderAgentInfo()
      default:
        return renderEmployeeInfo()
    }
  }

  return (
    <div className="profile-info">
      {renderInfo()}
    </div>
  )
}

export default ProfileInfo
