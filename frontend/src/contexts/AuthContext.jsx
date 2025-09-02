import React, { createContext, useContext, useState, useEffect } from 'react'
import { apiClient } from '../utils/apiClient'
import Cookies from 'js-cookie'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState(Cookies.get('access_token') || null)

    useEffect(() => {
        if (token) {
            getCurrentUser()
        } else {
            setLoading(false)
        }
    }, [token])

    const login = async (username, password) => {
        try {
            const response = await apiClient.login(username, password)
            const { access_token, refresh_token } = response

            setToken(access_token)
            Cookies.set('access_token', access_token, { expires: 1 })
            Cookies.set('refresh_token', refresh_token, { expires: 7 })
            localStorage.setItem('access_token', access_token)

            await getCurrentUser()
            return { success: true }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.detail || 'Login failed'
            }
        }
    }

    const register = async (userData) => {
        try {
            const response = await apiClient.register(userData)
            
            // Автоматически логиним пользователя после регистрации
            try {
                const loginResponse = await apiClient.login(userData.email, userData.password)
                const { access_token, refresh_token } = loginResponse
                
                setToken(access_token)
                Cookies.set('access_token', access_token, { expires: 1 })
                Cookies.set('refresh_token', refresh_token, { expires: 7 })
                localStorage.setItem('access_token', access_token)
                
                await getCurrentUser()
                
                // Автоматически создаем пустой профиль для нового пользователя
                try {
                    await apiClient.createEmptyProfile('employee')
                } catch (profileError) {
                    console.warn('Failed to create profile:', profileError)
                    // Не прерываем регистрацию, если не удалось создать профиль
                }
                
            } catch (loginError) {
                console.warn('Auto-login failed after registration:', loginError)
                // Регистрация прошла успешно, но автологин не удался
            }
            
            return { success: true, data: response }
        } catch (error) {
            return {
                success: false,
                error: error.message || 'Registration failed'
            }
        }
    }

    const logout = () => {
        setToken(null)
        setUser(null)
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        localStorage.removeItem('access_token')
    }

    const getCurrentUser = async () => {
        try {
            const response = await apiClient.getCurrentUser()
            setUser(response)
        } catch (error) {
            logout()
        } finally {
            setLoading(false)
        }
    }

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!token
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}