import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

function Register({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()

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

    // Очищаем ошибку при изменении поля
    if (error) {
      setError('')
    }
  }

  return (
    <div style={{
      maxWidth: '400px',
      margin: '50px auto',
      padding: '30px',
      background: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '30px',
        color: '#333'
      }}>
        📝 Регистрация
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
            color: '#555'
          }}>
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Введите ваш email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
            color: '#555'
          }}>
            Имя пользователя
          </label>
          <input
            type="text"
            name="username"
            placeholder="Придумайте username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
            color: '#555'
          }}>
            Пароль
          </label>
          <input
            type="password"
            name="password"
            placeholder="Придумайте пароль"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
            color: '#555'
          }}>
            Подтверждение пароля
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Повторите пароль"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {error && (
          <div style={{
            color: '#d32f2f',
            marginBottom: '20px',
            padding: '10px',
            background: '#ffebee',
            borderRadius: '5px',
            border: '1px solid #ffcdd2'
          }}>
            ⚠️ {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            background: loading ? '#ccc' : '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background 0.3s'
          }}
          onMouseOver={(e) => {
            if (!loading) e.target.style.background = '#45a049'
          }}
          onMouseOut={(e) => {
            if (!loading) e.target.style.background = '#4caf50'
          }}
        >
          {loading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>

      <p style={{
        marginTop: '25px',
        textAlign: 'center',
        color: '#666'
      }}>
        Уже есть аккаунт?{' '}
        <button
          onClick={onSwitchToLogin}
          style={{
            background: 'none',
            border: 'none',
            color: '#2196f3',
            cursor: 'pointer',
            fontWeight: 'bold',
            textDecoration: 'underline'
          }}
        >
          Войти
        </button>
      </p>

      <div style={{
        marginTop: '30px',
        padding: '15px',
        background: '#f5f5f5',
        borderRadius: '5px',
        fontSize: '14px',
        color: '#666'
      }}>
        <strong>Требования к паролю:</strong>
        <ul style={{ margin: '10px 0 0 20px', padding: 0 }}>
          <li>Минимум 6 символов</li>
          <li>Рекомендуется использовать буквы, цифры и специальные символы</li>
        </ul>
      </div>
    </div>
  )
}

export default Register