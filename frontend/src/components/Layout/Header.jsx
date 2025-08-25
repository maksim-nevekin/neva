import { useAuth } from '../../contexts/AuthContext'

function Header() {
  const { user, logout } = useAuth()

  return (
    <header style={{
      background: '#f8f9fa',
      padding: '15px 20px',
      borderBottom: '1px solid #dee2e6',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
        🚀 My App
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={{ color: '#666' }}>
          👋 Привет, {user?.username}!
        </span>
        <button
          onClick={logout}
          style={{
            padding: '8px 16px',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Выйти
        </button>
      </div>
    </header>
  )
}

export default Header