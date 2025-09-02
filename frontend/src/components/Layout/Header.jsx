import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function Header({ user, onLogout }) {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    if (onLogout) {
      onLogout()
    }
  }

  return (
    <header className="header">
      <div className="header-brand">
        <Link to="/" className="brand-link">
          <h1>🚀 NEVA</h1>
        </Link>
      </div>
      
      <div className="header-user">
        {user && (
          <>
            <div className="user-greeting">
              Привет, {user.username || user.email}!
            </div>
            <Link to="/profile" className="btn btn-outline btn-primary btn-sm">
              👤 Профиль
            </Link>
            <button onClick={handleLogout} className="logout-btn">
              Выйти
            </button>
          </>
        )}
      </div>
    </header>
  )
}

export default Header