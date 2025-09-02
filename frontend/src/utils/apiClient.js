const API_BASE_URL = '/api/v1'

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    // Получаем токен из cookies (совместимость с AuthContext)
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    };
    
    const token = getCookie('access_token') || localStorage.getItem('access_token')
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Auth endpoints
  async login(email, password) {
    const formData = new FormData()
    formData.append('username', email)
    formData.append('password', password)
    
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      body: formData,
    })
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || 'Login failed')
    }
    
    const data = await response.json()
    
    // Сохраняем токен в localStorage для совместимости
    if (data.access_token) {
      localStorage.setItem('access_token', data.access_token)
    }
    
    return data
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async getCurrentUser() {
    return this.request('/users/me/profile')
  }

  // Profile endpoints
  async getMyProfile() {
    return this.request('/profiles/me')
  }

  async createEmptyProfile(profileType = 'employee') {
    return this.request('/profiles/create-empty', {
      method: 'POST',
      body: JSON.stringify({ profile_type: profileType }),
    })
  }

  async updateProfile(profileData) {
    return this.request('/profiles/me', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    })
  }

  async getUserProfile(userId) {
    return this.request(`/profiles/${userId}`)
  }

  async getProfiles(filters = {}) {
    const params = new URLSearchParams()
    if (filters.profile_type) params.append('profile_type', filters.profile_type)
    if (filters.skip) params.append('skip', filters.skip)
    if (filters.limit) params.append('limit', filters.limit)
    
    const queryString = params.toString()
    const endpoint = queryString ? `/profiles/?${queryString}` : '/profiles/'
    
    return this.request(endpoint)
  }

  async searchProfiles(query, filters = {}) {
    const params = new URLSearchParams()
    params.append('q', query)
    if (filters.profile_type) params.append('profile_type', filters.profile_type)
    if (filters.skip) params.append('skip', filters.skip)
    if (filters.limit) params.append('limit', filters.limit)
    
    return this.request(`/profiles/search/?${params.toString()}`)
  }

  async getProfileStats() {
    return this.request('/profiles/me/stats')
  }

  async changeProfileType(profileType) {
    return this.request('/profiles/me/type', {
      method: 'PUT',
      body: JSON.stringify({ new_type: profileType }),
    })
  }

  async changeProfileStatus(status) {
    return this.request('/profiles/me/status', {
      method: 'PUT',
      body: JSON.stringify({ status }),
    })
  }

  async deleteProfile() {
    return this.request('/profiles/me', {
      method: 'DELETE',
    })
  }
}

export const apiClient = new ApiClient()
