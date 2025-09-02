import { useAuth } from '../../contexts/AuthContext'

function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="header">
      <div className="header-brand">
        🚀 My App
      </div>
      
      <div className="header-user">
        <span className="user-greeting">
          👋 Привет, {user?.username}!
        </span>
        <button onClick={logout} className="logout-btn">
          Выйти
        </button>
      </div>
    </header>
  )
}

export default Header