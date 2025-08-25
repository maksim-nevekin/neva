import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

function Login({ onSwitchToRegister }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await login(formData.username, formData.password)

    if (!result.success) {
      setError(result.error)
    }

    setLoading(false)
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2>🔐 Вход</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="username"
            placeholder="Email или username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px' }}
          />
        </div>

        {error && (
          <div style={{ color: 'red', marginBottom: '15px' }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            background: '#007bff',
            color: 'white',
            border: 'none'
          }}
        >
          {loading ? 'Вход...' : 'Войти'}
        </button>
      </form>

      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Нет аккаунта?{' '}
        <button
          onClick={onSwitchToRegister}
          style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}
        >
          Зарегистрироваться
        </button>
      </p>
    </div>
  )
}

export default Login