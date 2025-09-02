/**
 * Утилиты для работы с датами
 */

/**
 * Форматирует дату в удобочитаемом виде
 * @param {string|Date} date - Дата для форматирования
 * @param {string} locale - Локаль (по умолчанию 'ru-RU')
 * @returns {string} Отформатированная дата
 */
export const formatDate = (date, locale = 'ru-RU') => {
  if (!date) return 'Не указано'
  
  try {
    const dateObj = new Date(date)
    
    if (isNaN(dateObj.getTime())) {
      return 'Неверная дата'
    }
    
    const now = new Date()
    const diffTime = Math.abs(now - dateObj)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    // Если дата сегодня
    if (diffDays === 0) {
      return 'Сегодня'
    }
    
    // Если дата вчера
    if (diffDays === 1) {
      return 'Вчера'
    }
    
    // Если дата в пределах недели
    if (diffDays <= 7) {
      return `${diffDays} ${getDayLabel(diffDays)} назад`
    }
    
    // Если дата в пределах месяца
    if (diffDays <= 30) {
      const weeks = Math.floor(diffDays / 7)
      return `${weeks} ${getWeekLabel(weeks)} назад`
    }
    
    // Если дата в пределах года
    if (diffDays <= 365) {
      const months = Math.floor(diffDays / 30)
      return `${months} ${getMonthLabel(months)} назад`
    }
    
    // Если дата больше года
    const years = Math.floor(diffDays / 365)
    return `${years} ${getYearLabel(years)} назад`
    
  } catch (error) {
    console.error('Error formatting date:', error)
    return 'Ошибка форматирования'
  }
}

/**
 * Форматирует дату в полном формате
 * @param {string|Date} date - Дата для форматирования
 * @param {string} locale - Локаль (по умолчанию 'ru-RU')
 * @returns {string} Полная дата
 */
export const formatFullDate = (date, locale = 'ru-RU') => {
  if (!date) return 'Не указано'
  
  try {
    const dateObj = new Date(date)
    
    if (isNaN(dateObj.getTime())) {
      return 'Неверная дата'
    }
    
    return dateObj.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    
  } catch (error) {
    console.error('Error formatting full date:', error)
    return 'Ошибка форматирования'
  }
}

/**
 * Форматирует дату и время
 * @param {string|Date} date - Дата для форматирования
 * @param {string} locale - Локаль (по умолчанию 'ru-RU')
 * @returns {string} Дата и время
 */
export const formatDateTime = (date, locale = 'ru-RU') => {
  if (!date) return 'Не указано'
  
  try {
    const dateObj = new Date(date)
    
    if (isNaN(dateObj.getTime())) {
      return 'Неверная дата'
    }
    
    return dateObj.toLocaleString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
    
  } catch (error) {
    console.error('Error formatting date time:', error)
    return 'Ошибка форматирования'
  }
}

/**
 * Форматирует дату для отображения в профиле
 * @param {string|Date} date - Дата для форматирования
 * @returns {string} Дата для профиля
 */
export const formatProfileDate = (date) => {
  if (!date) return 'Не указано'
  
  try {
    const dateObj = new Date(date)
    
    if (isNaN(dateObj.getTime())) {
      return 'Неверная дата'
    }
    
    const now = new Date()
    const diffTime = Math.abs(now - dateObj)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    // Если дата сегодня
    if (diffDays === 0) {
      return 'Сегодня'
    }
    
    // Если дата вчера
    if (diffDays === 1) {
      return 'Вчера'
    }
    
    // Если дата в пределах недели
    if (diffDays <= 7) {
      return `${diffDays} дн. назад`
    }
    
    // Если дата в пределах месяца
    if (diffDays <= 30) {
      const weeks = Math.floor(diffDays / 7)
      return `${weeks} нед. назад`
    }
    
    // Если дата в пределах года
    if (diffDays <= 365) {
      const months = Math.floor(diffDays / 30)
      return `${months} мес. назад`
    }
    
    // Если дата больше года
    const years = Math.floor(diffDays / 365)
    return `${years} лет назад`
    
  } catch (error) {
    console.error('Error formatting profile date:', error)
    return 'Ошибка форматирования'
  }
}

/**
 * Проверяет, является ли дата сегодняшней
 * @param {string|Date} date - Дата для проверки
 * @returns {boolean} true если дата сегодня
 */
export const isToday = (date) => {
  if (!date) return false
  
  try {
    const dateObj = new Date(date)
    const today = new Date()
    
    return dateObj.toDateString() === today.toDateString()
  } catch (error) {
    return false
  }
}

/**
 * Проверяет, является ли дата вчерашней
 * @param {string|Date} date - Дата для проверки
 * @returns {boolean} true если дата вчера
 */
export const isYesterday = (date) => {
  if (!date) return false
  
  try {
    const dateObj = new Date(date)
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    
    return dateObj.toDateString() === yesterday.toDateString()
  } catch (error) {
    return false
  }
}

/**
 * Получает правильное окончание для дней
 * @param {number} days - Количество дней
 * @returns {string} Правильное окончание
 */
const getDayLabel = (days) => {
  if (days === 1) return 'день'
  if (days >= 2 && days <= 4) return 'дня'
  return 'дней'
}

/**
 * Получает правильное окончание для недель
 * @param {number} weeks - Количество недель
 * @returns {string} Правильное окончание
 */
const getWeekLabel = (weeks) => {
  if (weeks === 1) return 'неделя'
  if (weeks >= 2 && weeks <= 4) return 'недели'
  return 'недель'
}

/**
 * Получает правильное окончание для месяцев
 * @param {number} months - Количество месяцев
 * @returns {string} Правильное окончание
 */
const getMonthLabel = (months) => {
  if (months === 1) return 'месяц'
  if (months >= 2 && months <= 4) return 'месяца'
  return 'месяцев'
}

/**
 * Получает правильное окончание для лет
 * @param {number} years - Количество лет
 * @returns {string} Правильное окончание
 */
const getYearLabel = (years) => {
  if (years === 1) return 'год'
  if (years >= 2 && years <= 4) return 'года'
  return 'лет'
}

/**
 * Форматирует дату для API
 * @param {Date} date - Дата для форматирования
 * @returns {string} Дата в формате YYYY-MM-DD
 */
export const formatDateForAPI = (date) => {
  if (!date) return ''
  
  try {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    
    return `${year}-${month}-${day}`
  } catch (error) {
    console.error('Error formatting date for API:', error)
    return ''
  }
}

/**
 * Получает относительное время
 * @param {string|Date} date - Дата для форматирования
 * @returns {string} Относительное время
 */
export const getRelativeTime = (date) => {
  if (!date) return 'Не указано'
  
  try {
    const dateObj = new Date(date)
    const now = new Date()
    const diffTime = Math.abs(now - dateObj)
    const diffMinutes = Math.floor(diffTime / (1000 * 60))
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
    
    if (diffMinutes < 1) return 'Только что'
    if (diffMinutes < 60) return `${diffMinutes} мин. назад`
    if (diffHours < 24) return `${diffHours} ч. назад`
    
    return formatProfileDate(date)
    
  } catch (error) {
    console.error('Error getting relative time:', error)
    return 'Ошибка форматирования'
  }
}
