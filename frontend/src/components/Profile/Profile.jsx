import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import ProfileHeader from './ProfileHeader'
import ProfileInfo from './ProfileInfo'
import ProfileStats from './ProfileStats'
import ProfileActions from './ProfileActions'
import ProfileEditModal from './ProfileEditModal'
import './profile.css'

function Profile() {
  const { user: currentUser, isAuthenticated } = useAuth()
  const { userId } = useParams()
  const navigate = useNavigate()
  
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isOwnProfile, setIsOwnProfile] = useState(false)

  // Определяем, чей профиль просматриваем
  const profileUserId = userId || currentUser?.id
  const isOwn = !userId || userId === currentUser?.id

  useEffect(() => {
    setIsOwnProfile(isOwn)
    fetchProfile()
  }, [profileUserId, isOwn])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      // Здесь будет API вызов для получения профиля
      // Пока используем моковые данные
      const mockProfile = generateMockProfile(profileUserId, isOwn)
      setProfile(mockProfile)
    } catch (err) {
      setError('Ошибка при загрузке профиля')
      console.error('Profile fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const generateMockProfile = (id, isOwn) => {
    const profiles = {
      employee: {
        id: id,
        type: 'employee',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        firstName: 'Александр',
        lastName: 'Петров',
        email: 'alex.petrov@example.com',
        phone: '+7 (999) 123-45-67',
        position: 'Senior Frontend Developer',
        company: 'TechCorp',
        experience: '5 лет',
        skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
        location: 'Москва, Россия',
        bio: 'Опытный разработчик с глубокими знаниями современных веб-технологий. Специализируюсь на создании масштабируемых приложений.',
        status: 'available', // available, in_transfer, transferred
        transferHistory: [
          { from: 'OldCorp', to: 'TechCorp', date: '2023-01-15', success: true },
          { from: 'StartupInc', to: 'OldCorp', date: '2021-06-20', success: true }
        ],
        achievements: ['Лучший сотрудник месяца', 'Патент на алгоритм оптимизации'],
        education: 'МГУ им. Ломоносова, Информатика',
        languages: ['Русский (родной)', 'Английский (C1)', 'Немецкий (B2)'],
        salary: 'от 200,000 ₽',
        preferences: ['Удаленная работа', 'Гибкий график', 'Проектная работа'],
        createdAt: '2020-03-15',
        lastActive: '2024-01-20'
      },
      company: {
        id: id,
        type: 'company',
        avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop',
        name: 'TechCorp Solutions',
        email: 'hr@techcorp.com',
        phone: '+7 (495) 123-45-67',
        website: 'https://techcorp.com',
        industry: 'IT и разработка программного обеспечения',
        size: '150-300 сотрудников',
        founded: '2018',
        location: 'Москва, Россия',
        description: 'Инновационная IT-компания, специализирующаяся на разработке корпоративных решений и мобильных приложений.',
        specialties: ['Web Development', 'Mobile Apps', 'AI/ML', 'Cloud Solutions'],
        benefits: ['Медицинская страховка', 'ДМС', 'Гибкий график', 'Удаленная работа'],
        culture: 'Современная корпоративная культура с акцентом на инновации и развитие сотрудников.',
        openPositions: 12,
        transferRequests: 5,
        successRate: 94,
        rating: 4.8,
        reviews: 47,
        createdAt: '2018-01-01',
        lastActive: '2024-01-20'
      },
      agent: {
        id: id,
        type: 'agent',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        firstName: 'Михаил',
        lastName: 'Сидоров',
        email: 'mikhail.sidorov@neva-agent.com',
        phone: '+7 (999) 987-65-43',
        position: 'HR Агент',
        company: 'NEVA Platform',
        experience: '8 лет',
        specialization: 'IT-рекрутинг и трансферы',
        successRate: 96,
        completedTransfers: 127,
        activeTransfers: 8,
        rating: 4.9,
        reviews: 89,
        bio: 'Профессиональный HR-агент с многолетним опытом в IT-индустрии. Специализируюсь на трансферах высококвалифицированных специалистов.',
        skills: ['IT-рекрутинг', 'Переговоры', 'Анализ рынка', 'Психология', 'Право'],
        languages: ['Русский (родной)', 'Английский (C2)', 'Китайский (B1)'],
        education: 'МГПУ, Психология и педагогика',
        certifications: ['SHRM-CP', 'HRCI-PHR', 'ITIL Foundation'],
        location: 'Москва, Россия',
        availability: 'Пн-Пт, 9:00-18:00',
        createdAt: '2016-05-10',
        lastActive: '2024-01-20'
      }
    }

    // Определяем тип профиля на основе данных пользователя или случайно
    const types = ['employee', 'company', 'agent']
    const randomType = types[Math.floor(Math.random() * types.length)]
    
    return profiles[randomType]
  }

  const handleEditProfile = () => {
    setIsEditing(true)
  }

  const handleSaveProfile = async (updatedData) => {
    try {
      // Здесь будет API вызов для обновления профиля
      setProfile(prev => ({ ...prev, ...updatedData }))
      setIsEditing(false)
      // Показать уведомление об успехе
    } catch (err) {
      console.error('Profile update error:', err)
      // Показать уведомление об ошибке
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Загрузка профиля...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="profile-error">
        <div className="error-icon">⚠️</div>
        <h3>Ошибка загрузки</h3>
        <p>{error}</p>
        <button onClick={fetchProfile} className="btn btn-primary">
          Попробовать снова
        </button>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="profile-not-found">
        <div className="not-found-icon">🔍</div>
        <h3>Профиль не найден</h3>
        <p>Запрашиваемый профиль не существует или был удален.</p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Вернуться на главную
        </button>
      </div>
    )
  }

  return (
    <div className="profile-container">
      <ProfileHeader 
        profile={profile} 
        isOwnProfile={isOwnProfile}
        onEdit={handleEditProfile}
      />
      
      <div className="profile-content">
        <div className="profile-main">
          <ProfileInfo profile={profile} />
        </div>
        
        <div className="profile-sidebar">
          <ProfileStats profile={profile} />
          <ProfileActions 
            profile={profile} 
            isOwnProfile={isOwnProfile}
            currentUser={currentUser}
          />
        </div>
      </div>

      {isEditing && (
        <ProfileEditModal
          profile={profile}
          onSave={handleSaveProfile}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  )
}

export default Profile
