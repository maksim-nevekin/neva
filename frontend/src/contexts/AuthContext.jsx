import React, { createContext, useContext, useState, useEffect } from 'react'
import apiClient from '../api/client'
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
            apiClient.defaults.headers.Authorization = `Bearer ${token}`
            getCurrentUser()
        } else {
            setLoading(false)
        }
    }, [token])

    const login = async (username, password) => {
        try {
            const formData = new FormData()
            formData.append('username', username)
            formData.append('password', password)

            const response = await apiClient.post('/auth/login', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data' // Важно для FastAPI OAuth2
                }
            })
            const { access_token, refresh_token } = response.data

            setToken(access_token)
            Cookies.set('access_token', access_token, { expires: 1 })
            Cookies.set('refresh_token', refresh_token, { expires: 7 })

            apiClient.defaults.headers.Authorization = `Bearer ${access_token}`

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
            const response = await apiClient.post('/auth/register', userData)
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.detail || 'Registration failed'
            }
        }
    }

    const logout = () => {
        setToken(null)
        setUser(null)
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        delete apiClient.defaults.headers.Authorization
    }

    const getCurrentUser = async () => {
        try {
            const response = await apiClient.get('/auth/me')
            setUser(response.data)
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