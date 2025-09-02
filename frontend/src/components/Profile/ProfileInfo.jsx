import React from 'react'

function ProfileInfo({ profile }) {
  const renderEmployeeInfo = () => (
    <>
      <div className="info-section">
        <h3 className="section-title">
          📧 Контактная информация
        </h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Email</span>
            <span className="info-value">
              {profile.user?.email || 'Не указан'}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Телефон</span>
            <span className="info-value">
              {profile.phone || 'Не указан'}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Местоположение</span>
            <span className="info-value">
              {profile.location || 'Не указано'}
            </span>
          </div>
        </div>
      </div>

      {profile.bio && (
        <div className="info-section">
          <h3 className="section-title">
            📝 О себе
          </h3>
          <p className="bio-text">{profile.bio}</p>
        </div>
      )}

      {profile.skills && profile.skills.length > 0 && (
        <div className="info-section">
          <h3 className="section-title">
            🛠️ Навыки
          </h3>
          <div className="skills-container">
            {profile.skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {profile.languages && profile.languages.length > 0 && (
        <div className="info-section">
          <h3 className="section-title">
            🌍 Языки
          </h3>
          <div className="languages-container">
            {profile.languages.map((language, index) => (
              <span key={index} className="language-tag">
                {language}
              </span>
            ))}
          </div>
        </div>
      )}

      {profile.education && profile.education.length > 0 && (
        <div className="info-section">
          <h3 className="section-title">
            🎓 Образование
          </h3>
          <div className="education-container">
            {profile.education.map((edu, index) => (
              <div key={index} className="education-item">
                <div className="education-degree">{edu.degree}</div>
                <div className="education-field">{edu.field}</div>
                <div className="education-institution">{edu.institution}</div>
                <div className="education-year">{edu.year}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {profile.achievements && profile.achievements.length > 0 && (
        <div className="info-section">
          <h3 className="section-title">
            🏆 Достижения
          </h3>
          <div className="achievements-container">
            {profile.achievements.map((achievement, index) => (
              <div key={index} className="achievement-item">
                <span className="achievement-icon">🏆</span>
                <span className="achievement-text">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )

  const renderCompanyInfo = () => (
    <>
      <div className="info-section">
        <h3 className="section-title">
          🏢 Информация о компании
        </h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Название</span>
            <span className="info-value">
              {profile.company_name || 'Не указано'}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Отрасль</span>
            <span className="info-value">
              {profile.industry || 'Не указана'}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Размер</span>
            <span className="info-value">
              {profile.company_size || 'Не указан'}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Год основания</span>
            <span className="info-value">
              {profile.founded_year || 'Не указан'}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Веб-сайт</span>
            <span className="info-value">
              {profile.website ? (
                <a href={profile.website} target="_blank" rel="noopener noreferrer">
                  {profile.website}
                </a>
              ) : 'Не указан'}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Email</span>
            <span className="info-value">
              {profile.user?.email || 'Не указан'}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Телефон</span>
            <span className="info-value">
              {profile.phone || 'Не указан'}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Местоположение</span>
            <span className="info-value">
              {profile.location || 'Не указано'}
            </span>
          </div>
        </div>
      </div>

      {profile.description && (
        <div className="info-section">
          <h3 className="section-title">
            📝 О компании
          </h3>
          <p className="culture-text">{profile.description}</p>
        </div>
      )}

      {profile.benefits && profile.benefits.length > 0 && (
        <div className="info-section">
          <h3 className="section-title">
            💼 Преимущества работы
          </h3>
          <div className="benefits-container">
            {profile.benefits.map((benefit, index) => (
              <span key={index} className="benefit-tag">
                {benefit}
              </span>
            ))}
          </div>
        </div>
      )}

      {profile.specialties && profile.specialties.length > 0 && (
        <div className="info-section">
          <h3 className="section-title">
            🎯 Специализации
          </h3>
          <div className="specialties-container">
            {profile.specialties.map((specialty, index) => (
              <span key={index} className="specialty-tag">
                {specialty}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  )

  const renderAgentInfo = () => (
    <>
      <div className="info-section">
        <h3 className="section-title">
          🤝 Информация об агенте
        </h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Агентство</span>
            <span className="info-value">
              {profile.agency_name || 'Не указано'}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Лицензия</span>
            <span className="info-value">
              {profile.license_number || 'Не указана'}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Успешность</span>
            <span className="info-value">
              {profile.success_rate || 0}%
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Рейтинг</span>
            <span className="info-value">
              {profile.rating ? `⭐ ${profile.rating}/5` : 'Не оценен'}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Email</span>
            <span className="info-value">
              {profile.user?.email || 'Не указан'}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Телефон</span>
            <span className="info-value">
              {profile.phone || 'Не указан'}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Местоположение</span>
            <span className="info-value">
              {profile.location || 'Не указано'}
            </span>
          </div>
        </div>
      </div>

      {profile.bio && (
        <div className="info-section">
          <h3 className="section-title">
            📝 О себе
          </h3>
          <p className="bio-text">{profile.bio}</p>
        </div>
      )}

      {profile.specialties && profile.specialties.length > 0 && (
        <div className="info-section">
          <h3 className="section-title">
            🎯 Специализации
          </h3>
          <div className="specialties-container">
            {profile.specialties.map((specialty, index) => (
              <span key={index} className="specialty-tag">
                {specialty}
              </span>
            ))}
          </div>
        </div>
      )}

      {profile.preferences && profile.preferences.length > 0 && (
        <div className="info-section">
          <h3 className="section-title">
            ⚙️ Предпочтения по работе
          </h3>
          <div className="preferences-container">
            {profile.preferences.map((preference, index) => (
              <span key={index} className="preference-tag">
                {preference}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  )

  return (
    <div className="profile-info">
      <div className="profile-info-content">
        {profile.profile_type === 'employee' && renderEmployeeInfo()}
        {profile.profile_type === 'company' && renderCompanyInfo()}
        {profile.profile_type === 'agent' && renderAgentInfo()}
      </div>
    </div>
  )
}

export default ProfileInfo
