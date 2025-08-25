import React, { useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Header from './components/Layout/Header'
import './App.css'

function AppContent() {
  const { isAuthenticated, loading } = useAuth()
  const [isLogin, setIsLogin] = useState(true)

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Загрузка...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div>
        {isLogin ? (
          <Login onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          <Register onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div style={{ padding: '20px' }}>
        <h1>🎉 Добро пожаловать в приложение!</h1>
        <p>Вы успешно авторизованы!</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App