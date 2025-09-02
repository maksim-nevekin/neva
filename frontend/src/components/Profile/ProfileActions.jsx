import React from 'react'

function ProfileActions({ profile, isOwnProfile, currentUser }) {
  const handleAction = (action) => {
    console.log(`Action: ${action}`, { profile, currentUser })
    // Здесь будут обработчики действий
  }

  const renderEmployeeActions = () => (
    <div className="profile-actions-content">
      <div className="actions-section">
        <h3 className="actions-section-title">🚀 Действия</h3>
        
        {isOwnProfile ? (
          <>
            <button 
              onClick={() => handleAction('edit_profile')}
              className="btn btn-primary btn-block"
            >
              ✏️ Редактировать профиль
            </button>
            
            <button 
              onClick={() => handleAction('change_status')}
              className="btn btn-outline btn-primary btn-block"
            >
              🔄 Изменить статус
            </button>
            
            <button 
              onClick={() => handleAction('upload_photo')}
              className="btn btn-outline btn-primary btn-block"
            >
              📷 Загрузить фото
            </button>
            
            <button 
              onClick={() => handleAction('privacy_settings')}
              className="btn btn-outline btn-primary btn-block"
            >
              🔒 Настройки приватности
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => handleAction('send_message')}
              className="btn btn-primary btn-block"
            >
              💬 Написать сообщение
            </button>
            
            <button 
              onClick={() => handleAction('propose_transfer')}
              className="btn btn-outline btn-primary btn-block"
            >
              📋 Предложить трансфер
            </button>
            
            <button 
              onClick={() => handleAction('add_to_favorites')}
              className="btn btn-outline btn-primary btn-block"
            >
              ❤️ Добавить в избранное
            </button>
            
            <button 
              onClick={() => handleAction('share_profile')}
              className="btn btn-outline btn-primary btn-block"
            >
              📤 Поделиться профилем
            </button>
          </>
        )}
      </div>

      <div className="actions-section">
        <h3 className="actions-section-title">📊 Аналитика</h3>
        
        <button 
          onClick={() => handleAction('view_analytics')}
          className="btn btn-outline btn-primary btn-block"
        >
          📈 Просмотр аналитики
        </button>
        
        <button 
          onClick={() => handleAction('download_cv')}
          className="btn btn-outline btn-primary btn-block"
        >
          📄 Скачать резюме
        </button>
      </div>
    </div>
  )

  const renderCompanyActions = () => (
    <div className="profile-actions-content">
      <div className="actions-section">
        <h3 className="actions-section-title">🏢 Действия компании</h3>
        
        {isOwnProfile ? (
          <>
            <button 
              onClick={() => handleAction('edit_company')}
              className="btn btn-primary btn-block"
            >
              ✏️ Редактировать профиль
            </button>
            
            <button 
              onClick={() => handleAction('post_vacancy')}
              className="btn btn-outline btn-primary btn-block"
            >
              💼 Разместить вакансию
            </button>
            
            <button 
              onClick={() => handleAction('manage_transfers')}
              className="btn btn-outline btn-primary btn-block"
            >
              🔄 Управление трансферами
            </button>
            
            <button 
              onClick={() => handleAction('company_settings')}
              className="btn btn-outline btn-primary btn-block"
            >
              ⚙️ Настройки компании
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => handleAction('view_vacancies')}
              className="btn btn-primary btn-block"
            >
              💼 Посмотреть вакансии
            </button>
            
            <button 
              onClick={() => handleAction('propose_employee')}
              className="btn btn-outline btn-primary btn-block"
            >
              👤 Предложить сотрудника
            </button>
            
            <button 
              onClick={() => handleAction('contact_hr')}
              className="btn btn-outline btn-primary btn-block"
            >
              📞 Связаться с HR
            </button>
            
            <button 
              onClick={() => handleAction('follow_company')}
              className="btn btn-outline btn-primary btn-block"
            >
              👁️ Подписаться на компанию
            </button>
          </>
        )}
      </div>

      <div className="actions-section">
        <h3 className="actions-section-title">📊 Статистика</h3>
        
        <button 
          onClick={() => handleAction('view_company_stats')}
          className="btn btn-outline btn-primary btn-block"
        >
          📈 Статистика компании
        </button>
        
        <button 
          onClick={() => handleAction('view_reviews')}
          className="btn btn-outline btn-primary btn-block"
        >
          ⭐ Отзывы и рейтинги
        </button>
      </div>
    </div>
  )

  const renderAgentActions = () => (
    <div className="profile-actions-content">
      <div className="actions-section">
        <h3 className="actions-section-title">🤝 Действия агента</h3>
        
        {isOwnProfile ? (
          <>
            <button 
              onClick={() => handleAction('edit_agent_profile')}
              className="btn btn-primary btn-block"
            >
              ✏️ Редактировать профиль
            </button>
            
            <button 
              onClick={() => handleAction('manage_transfers')}
              className="btn btn-outline btn-primary btn-block"
            >
              🔄 Управление трансферами
            </button>
            
            <button 
              onClick={() => handleAction('agent_analytics')}
              className="btn btn-outline btn-primary btn-block"
            >
              📊 Аналитика работы
            </button>
            
            <button 
              onClick={() => handleAction('agent_settings')}
              className="btn btn-outline btn-primary btn-block"
            >
              ⚙️ Настройки агента
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => handleAction('start_cooperation')}
              className="btn btn-primary btn-block"
            >
              🤝 Начать сотрудничество
            </button>
            
            <button 
              onClick={() => handleAction('send_message')}
              className="btn btn-outline btn-primary btn-block"
            >
              💬 Написать сообщение
            </button>
            
            <button 
              onClick={() => handleAction('schedule_consultation')}
              className="btn btn-outline btn-primary btn-block"
            >
              📅 Записаться на консультацию
            </button>
            
            <button 
              onClick={() => handleAction('view_portfolio')}
              className="btn btn-outline btn-primary btn-block"
            >
              📁 Посмотреть портфолио
            </button>
          </>
        )}
      </div>

      <div className="actions-section">
        <h3 className="actions-section-title">📊 Результаты</h3>
        
        <button 
          onClick={() => handleAction('view_success_cases')}
          className="btn btn-outline btn-primary btn-block"
        >
          🏆 Успешные кейсы
        </button>
        
        <button 
          onClick={() => handleAction('view_certificates')}
          className="btn btn-outline btn-primary btn-block"
        >
          📜 Сертификаты
        </button>
      </div>
    </div>
  )

  const renderActions = () => {
    switch (profile.type) {
      case 'employee':
        return renderEmployeeActions()
      case 'company':
        return renderCompanyActions()
      case 'agent':
        return renderAgentActions()
      default:
        return renderEmployeeActions()
    }
  }

  return (
    <div className="profile-actions">
      {renderActions()}
      
      {/* Общие действия для всех типов профилей */}
      <div className="actions-section">
        <h3 className="actions-section-title">🔧 Общие действия</h3>
        
        <button 
          onClick={() => handleAction('report_profile')}
          className="btn btn-outline btn-danger btn-block"
        >
          🚨 Пожаловаться на профиль
        </button>
        
        <button 
          onClick={() => handleAction('block_user')}
          className="btn btn-outline btn-danger btn-block"
        >
          🚫 Заблокировать пользователя
        </button>
      </div>
    </div>
  )
}

export default ProfileActions
