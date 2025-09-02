import React, { useState, useEffect } from 'react'

function ProfileEditModal({ profile, onSave, onCancel }) {
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    // Инициализируем форму данными профиля
    setFormData(profile)
  }, [profile])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }))
    }
  }

  const handleArrayInputChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), '']
    }))
  }

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email обязателен'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Неверный формат email'
    }
    
    if (profile.type === 'employee') {
      if (!formData.firstName) newErrors.firstName = 'Имя обязательно'
      if (!formData.lastName) newErrors.lastName = 'Фамилия обязательна'
      if (!formData.position) newErrors.position = 'Должность обязательна'
    }
    
    if (profile.type === 'company') {
      if (!formData.name) newErrors.name = 'Название компании обязательно'
      if (!formData.industry) newErrors.industry = 'Отрасль обязательна'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    try {
      await onSave(formData)
    } catch (error) {
      console.error('Save error:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderEmployeeForm = () => (
    <>
      <div className="form-row">
        <div className="form-col">
          <div className="form-group">
            <label className="form-label required">Имя</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName || ''}
              onChange={handleInputChange}
              className={`form-input ${errors.firstName ? 'error' : ''}`}
              placeholder="Введите имя"
            />
            {errors.firstName && <div className="form-error">{errors.firstName}</div>}
          </div>
        </div>
        <div className="form-col">
          <div className="form-group">
            <label className="form-label required">Фамилия</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName || ''}
              onChange={handleInputChange}
              className={`form-input ${errors.lastName ? 'error' : ''}`}
              placeholder="Введите фамилию"
            />
            {errors.lastName && <div className="form-error">{errors.lastName}</div>}
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="form-col">
          <div className="form-group">
            <label className="form-label required">Должность</label>
            <input
              type="text"
              name="position"
              value={formData.position || ''}
              onChange={handleInputChange}
              className={`form-input ${errors.position ? 'error' : ''}`}
              placeholder="Введите должность"
            />
            {errors.position && <div className="form-error">{errors.position}</div>}
          </div>
        </div>
        <div className="form-col">
          <div className="form-group">
            <label className="form-label">Компания</label>
            <input
              type="text"
              name="company"
              value={formData.company || ''}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Введите название компании"
            />
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="form-col">
          <div className="form-group">
            <label className="form-label">Опыт работы</label>
            <input
              type="text"
              name="experience"
              value={formData.experience || ''}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Например: 5 лет"
            />
          </div>
        </div>
        <div className="form-col">
          <div className="form-group">
            <label className="form-label">Местоположение</label>
            <input
              type="text"
              name="location"
              value={formData.location || ''}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Город, страна"
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">О себе</label>
        <textarea
          name="bio"
          value={formData.bio || ''}
          onChange={handleInputChange}
          className="form-textarea"
          placeholder="Расскажите о себе, опыте и целях"
          rows="4"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Навыки и технологии</label>
        <div className="array-input-container">
          {(formData.skills || []).map((skill, index) => (
            <div key={index} className="array-input-item">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleArrayInputChange('skills', index, e.target.value)}
                className="form-input"
                placeholder="Навык или технология"
              />
              <button
                type="button"
                onClick={() => removeArrayItem('skills', index)}
                className="btn btn-danger btn-sm"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('skills')}
            className="btn btn-outline btn-primary btn-sm"
          >
            + Добавить навык
          </button>
        </div>
      </div>
    </>
  )

  const renderCompanyForm = () => (
    <>
      <div className="form-group">
        <label className="form-label required">Название компании</label>
        <input
          type="text"
          name="name"
          value={formData.name || ''}
          onChange={handleInputChange}
          className={`form-input ${errors.name ? 'error' : ''}`}
          placeholder="Введите название компании"
        />
        {errors.name && <div className="form-error">{errors.name}</div>}
      </div>

      <div className="form-row">
        <div className="form-col">
          <div className="form-group">
            <label className="form-label required">Отрасль</label>
            <input
              type="text"
              name="industry"
              value={formData.industry || ''}
              onChange={handleInputChange}
              className={`form-input ${errors.industry ? 'error' : ''}`}
              placeholder="Введите отрасль"
            />
            {errors.industry && <div className="form-error">{errors.industry}</div>}
          </div>
        </div>
        <div className="form-col">
          <div className="form-group">
            <label className="form-label">Размер компании</label>
            <input
              type="text"
              name="size"
              value={formData.size || ''}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Например: 150-300 сотрудников"
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">О компании</label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleInputChange}
          className="form-textarea"
          placeholder="Опишите деятельность компании, миссию и ценности"
          rows="4"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Специализации</label>
        <div className="array-input-container">
          {(formData.specialties || []).map((specialty, index) => (
            <div key={index} className="array-input-item">
              <input
                type="text"
                value={specialty}
                onChange={(e) => handleArrayInputChange('specialties', index, e.target.value)}
                className="form-input"
                placeholder="Специализация"
              />
              <button
                type="button"
                onClick={() => removeArrayItem('specialties', index)}
                className="btn btn-danger btn-sm"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('specialties')}
            className="btn btn-outline btn-primary btn-sm"
          >
            + Добавить специализацию
          </button>
        </div>
      </div>
    </>
  )

  const renderAgentForm = () => (
    <>
      <div className="form-row">
        <div className="form-col">
          <div className="form-group">
            <label className="form-label required">Имя</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName || ''}
              onChange={handleInputChange}
              className={`form-input ${errors.firstName ? 'error' : ''}`}
              placeholder="Введите имя"
            />
            {errors.firstName && <div className="form-error">{errors.firstName}</div>}
          </div>
        </div>
        <div className="form-col">
          <div className="form-group">
            <label className="form-label required">Фамилия</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName || ''}
              onChange={handleInputChange}
              className={`form-input ${errors.lastName ? 'error' : ''}`}
              placeholder="Введите фамилию"
            />
            {errors.lastName && <div className="form-error">{errors.lastName}</div>}
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Специализация</label>
        <input
          type="text"
          name="specialization"
          value={formData.specialization || ''}
          onChange={handleInputChange}
          className="form-input"
          placeholder="Опишите вашу специализацию"
        />
      </div>

      <div className="form-group">
        <label className="form-label">О себе</label>
        <textarea
          name="bio"
          value={formData.bio || ''}
          onChange={handleInputChange}
          className="form-textarea"
          placeholder="Расскажите о своем опыте и подходе к работе"
          rows="4"
        />
      </div>
    </>
  )

  const renderForm = () => {
    switch (profile.type) {
      case 'employee':
        return renderEmployeeForm()
      case 'company':
        return renderCompanyForm()
      case 'agent':
        return renderAgentForm()
      default:
        return renderEmployeeForm()
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">✏️ Редактирование профиля</h2>
          <button onClick={onCancel} className="modal-close">×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-content">
            {renderForm()}
            
            {/* Общие поля для всех типов */}
            <div className="form-row">
              <div className="form-col">
                <div className="form-group">
                  <label className="form-label required">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleInputChange}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="Введите email"
                  />
                  {errors.email && <div className="form-error">{errors.email}</div>}
                </div>
              </div>
              <div className="form-col">
                <div className="form-group">
                  <label className="form-label">Телефон</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Введите телефон"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
              disabled={loading}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Сохранение...' : 'Сохранить изменения'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileEditModal
