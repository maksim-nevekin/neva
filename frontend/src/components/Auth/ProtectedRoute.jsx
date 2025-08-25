import { useAuth } from '../../contexts/AuthContext'

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div>Загрузка...</div>
  }

  if (!isAuthenticated) {
    return <div>Пожалуйста, войдите в систему</div>
  }

  return children
}

export default ProtectedRoute