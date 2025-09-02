import React from 'react'
import Header from './Layout/Header'

function Home() {
  return (
    <div>
      <Header />
      <div className="home-container">
        <div className="home-welcome">
          <h1 className="home-title">🎉 Добро пожаловать в приложение!</h1>
          <p className="home-subtitle">Вы успешно авторизованы!</p>
        </div>
        
        <div className="features-section">
          <h3 className="features-title">🚀 Что вы можете делать:</h3>
          <ul className="features-list">
            <li>Просматривать свой профиль</li>
            <li>Настраивать настройки аккаунта</li>
            <li>Использовать все функции приложения</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home