import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import toast from 'react-hot-toast'

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Валидация
    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов')
      setLoading(false)
      return
    }

    const result = await register({
      email: formData.email,
      username: formData.username,
      password: formData.password
    })

    if (result.success) {
      setSuccess(true)
      // Show success toast
      toast.success('🎉 Пользователь успешно создан! Перенаправление на главную страницу...', {
        duration: 3000,
      })
      
      // Redirect to home page after a short delay
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } else {
      setError(result.error)
      // Show error toast
      toast.error(`Ошибка регистрации: ${result.error}`)
    }

    setLoading(false)
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))

    // Очищаем ошибку при изменении поля
    if (error) {
      setError('')
    }
  }

  // Show success message
  if (success) {
    return (
      <div className="success-container">
        <div className="success-icon">✅</div>
        <h2 className="success-title">Регистрация успешна!</h2>
        <p className="success-message">
          Ваш аккаунт был создан. Перенаправление на главную страницу...
        </p>
        <div className="progress-container">
          <div className="progress-bar" />
        </div>
      </div>
    )
  }

  return (
    <div className="auth-container">
      <h2 className="auth-title">📝 Регистрация</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Введите ваш email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Имя пользователя</label>
          <input
            type="text"
            name="username"
            placeholder="Придумайте username"
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
            placeholder="Придумайте пароль"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Подтверждение пароля</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Повторите пароль"
            value={formData.confirmPassword}
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
          className={`btn btn-success ${loading ? 'btn:disabled' : ''}`}
        >
          {loading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>

      <p className="auth-switch">
        Уже есть аккаунт?{' '}
        <Link to="/login" className="auth-link">
          Войти
        </Link>
      </p>

      <div className="password-requirements">
        <strong>Требования к паролю:</strong>
        <ul>
          <li>Минимум 6 символов</li>
          <li>Рекомендуется использовать буквы, цифры и специальные символы</li>
        </ul>
      </div>
    </div>
  )
}

export default Register