import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import toast from 'react-hot-toast'

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await login(formData.username, formData.password)

    if (!result.success) {
      setError(result.error)
      // Show error toast
      toast.error(`Ошибка входа: ${result.error}`)
    } else {
      // Show success toast
      toast.success('🎉 Вход выполнен успешно! Перенаправление...', {
        duration: 2000,
      })
      // Redirect to home page after successful login
      navigate('/')
    }

    setLoading(false)
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))

    // Clear error when user starts typing
    if (error) {
      setError('')
    }
  }

  return (
    <div className="auth-container">
      <h2 className="auth-title">🔐 Вход в систему</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label className="form-label">Email или Username</label>
          <input
            type="text"
            name="username"
            placeholder="Введите ваш email или username"
            value={formData.username}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Пароль</label>
          <input
            type="password"
            name="password"
            placeholder="Введите ваш пароль"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        {error && (
          <div className="error-message">⚠️ {error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`btn btn-primary ${loading ? 'btn:disabled' : ''}`}
        >
          {loading ? 'Вход...' : 'Войти'}
        </button>
      </form>

      <p className="auth-switch">
        Нет аккаунта?{' '}
        <Link to="/register" className="auth-link">
          Зарегистрироваться
        </Link>
      </p>
    </div>
  )
}

export default Login