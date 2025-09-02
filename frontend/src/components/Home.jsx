import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Header from './Layout/Header'

function Home() {
  const { user, logout } = useAuth()

  return (
    <div className="home-container">
      <Header user={user} onLogout={logout} />
      
      <div className="home-welcome">
        <h1 className="home-title">Добро пожаловать в NEVA! 🚀</h1>
        <p className="home-subtitle">
          Платформа трансфера сотрудников между компаниями
        </p>
        
        {user && (
          <div className="user-welcome">
            <p>Привет, {user.username || user.email}!</p>
            <Link to="/profile" className="btn btn-primary">
              👤 Мой профиль
            </Link>
          </div>
        )}
      </div>

      <div className="features-section">
        <h2 className="features-title">Возможности платформы</h2>
        <div className="features-list">
          <div className="feature-item">
            <h3>🔄 Трансфер сотрудников</h3>
            <p>Обменивайтесь сотрудниками между компаниями вместо увольнения</p>
          </div>
          <div className="feature-item">
            <h3>💼 Поиск талантов</h3>
            <p>Находите подходящих специалистов по компетенциям</p>
          </div>
          <div className="feature-item">
            <h3>🤝 HR агентство</h3>
            <p>Профессиональная помощь в организации трансферов</p>
          </div>
          <div className="feature-item">
            <h3>📊 Аналитика и отчеты</h3>
            <p>Подробная статистика и аналитика по трансферам</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home