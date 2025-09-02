import React from 'react'

function ProfileActions({ profile, isOwnProfile, onEdit, onChangeStatus }) {
  const renderEmployeeActions = () => {
    if (isOwnProfile) {
      return (
        <>
          <div className="actions-section">
            <h3 className="actions-section-title">
              ⚙️ Управление профилем
            </h3>
            <button 
              className="btn btn-primary btn-block"
              onClick={onEdit}
            >
              ✏️ Редактировать профиль
            </button>
            <button 
              className="btn btn-outline btn-block"
              onClick={() => onChangeStatus('transfer')}
            >
              🔄 Начать поиск работы
            </button>
            <button 
              className="btn btn-outline btn-block"
              onClick={() => onChangeStatus('unavailable')}
            >
              ⏸️ Приостановить поиск
            </button>
          </div>

          <div className="actions-section">
            <h3 className="actions-section-title">
              📊 Статистика
            </h3>
            <button className="btn btn-outline btn-block">
              📈 Просмотреть аналитику
            </button>
            <button className="btn btn-outline btn-block">
              📋 История переводов
            </button>
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className="actions-section">
            <h3 className="actions-section-title">
              🤝 Действия
            </h3>
            <button className="btn btn-primary btn-block">
              💬 Написать сообщение
            </button>
            <button className="btn btn-outline btn-block">
              🔄 Предложить перевод
            </button>
            <button className="btn btn-outline btn-block">
              ⭐ Добавить в избранное
            </button>
          </div>

          <div className="actions-section">
            <h3 className="actions-section-title">
              ℹ️ Дополнительно
            </h3>
            <button className="btn btn-outline btn-block">
              📋 Поделиться профилем
            </button>
            <button className="btn btn-outline btn-block">
              🚨 Пожаловаться
            </button>
          </div>
        </>
      )
    }
  }

  const renderCompanyActions = () => {
    if (isOwnProfile) {
      return (
        <>
          <div className="actions-section">
            <h3 className="actions-section-title">
              ⚙️ Управление компанией
            </h3>
            <button 
              className="btn btn-primary btn-block"
              onClick={onEdit}
            >
              ✏️ Редактировать профиль
            </button>
            <button className="btn btn-outline btn-block">
              👥 Управление сотрудниками
            </button>
            <button className="btn btn-outline btn-block">
              📋 Создать вакансию
            </button>
          </div>

          <div className="actions-section">
            <h3 className="actions-section-title">
              📊 Статистика
            </h3>
            <button className="btn btn-outline btn-block">
              📈 Просмотреть аналитику
            </button>
            <button className="btn btn-outline btn-block">
              📋 История найма
            </button>
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className="actions-section">
            <h3 className="actions-section-title">
              🤝 Действия
            </h3>
            <button className="btn btn-primary btn-block">
              💬 Связаться с компанией
            </button>
            <button className="btn btn-outline btn-block">
              📋 Подать заявку
            </button>
            <button className="btn btn-outline btn-block">
              ⭐ Добавить в избранное
            </button>
          </div>

          <div className="actions-section">
            <h3 className="actions-section-title">
              ℹ️ Дополнительно
            </h3>
            <button className="btn btn-outline btn-block">
              📋 Поделиться профилем
            </button>
            <button className="btn btn-outline btn-block">
              🌐 Перейти на сайт
            </button>
          </div>
        </>
      )
    }
  }

  const renderAgentActions = () => {
    if (isOwnProfile) {
      return (
        <>
          <div className="actions-section">
            <h3 className="actions-section-title">
              ⚙️ Управление агентством
            </h3>
            <button 
              className="btn btn-primary btn-block"
              onClick={onEdit}
            >
              ✏️ Редактировать профиль
            </button>
            <button className="btn btn-outline btn-block">
              👥 Управление клиентами
            </button>
            <button className="btn btn-outline btn-block">
              📋 Создать предложение
            </button>
          </div>

          <div className="actions-section">
            <h3 className="actions-section-title">
              📊 Статистика
            </h3>
            <button className="btn btn-outline btn-block">
              📈 Просмотреть аналитику
            </button>
            <button className="btn btn-outline btn-block">
              📋 История переводов
            </button>
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className="actions-section">
            <h3 className="actions-section-title">
              🤝 Действия
            </h3>
            <button className="btn btn-primary btn-block">
              💬 Связаться с агентом
            </button>
            <button className="btn btn-outline btn-block">
              📋 Запросить услуги
            </button>
            <button className="btn btn-outline btn-block">
              ⭐ Добавить в избранное
            </button>
          </div>

          <div className="actions-section">
            <h3 className="actions-section-title">
              ℹ️ Дополнительно
            </h3>
            <button className="btn btn-outline btn-block">
              📋 Поделиться профилем
            </button>
            <button className="btn btn-outline btn-block">
              🚨 Пожаловаться
            </button>
          </div>
        </>
      )
    }
  }

  return (
    <div className="profile-actions">
      <div className="profile-actions-content">
        {profile.profile_type === 'employee' && renderEmployeeActions()}
        {profile.profile_type === 'company' && renderCompanyActions()}
        {profile.profile_type === 'agent' && renderAgentActions()}
      </div>
    </div>
  )
}

export default ProfileActions