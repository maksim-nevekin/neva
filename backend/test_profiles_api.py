#!/usr/bin/env python3
"""
Скрипт для тестирования API профилей
"""

import requests
import json

BASE_URL = "http://localhost:8000/api/v1"

def test_profile_api():
    """Тестирование API профилей"""
    
    # 1. Регистрация нового пользователя
    print("1. Регистрация нового пользователя...")
    register_data = {
        "email": "test@example.com",
        "username": "testuser",
        "password": "testpassword123"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/register", json=register_data)
        print(f"Статус регистрации: {response.status_code}")
        if response.status_code == 200:
            print("✅ Регистрация успешна")
        else:
            print(f"❌ Ошибка регистрации: {response.text}")
            return
    except Exception as e:
        print(f"❌ Ошибка подключения: {e}")
        return
    
    # 2. Авторизация
    print("\n2. Авторизация...")
    login_data = {
        "username": "test@example.com",
        "password": "testpassword123"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/login", data=login_data)
        print(f"Статус авторизации: {response.status_code}")
        if response.status_code == 200:
            token_data = response.json()
            access_token = token_data["access_token"]
            print("✅ Авторизация успешна")
        else:
            print(f"❌ Ошибка авторизации: {response.text}")
            return
    except Exception as e:
        print(f"❌ Ошибка подключения: {e}")
        return
    
    # Заголовки для авторизованных запросов
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    
    # 3. Создание пустого профиля
    print("\n3. Создание пустого профиля...")
    try:
        response = requests.post(
            f"{BASE_URL}/profiles/create-empty",
            json={"profile_type": "employee"},
            headers=headers
        )
        print(f"Статус создания профиля: {response.status_code}")
        if response.status_code == 200:
            profile = response.json()
            print("✅ Профиль создан успешно")
            print(f"ID профиля: {profile['id']}")
            print(f"Тип профиля: {profile['profile_type']}")
        else:
            print(f"❌ Ошибка создания профиля: {response.text}")
    except Exception as e:
        print(f"❌ Ошибка подключения: {e}")
    
    # 4. Получение своего профиля
    print("\n4. Получение своего профиля...")
    try:
        response = requests.get(f"{BASE_URL}/profiles/me", headers=headers)
        print(f"Статус получения профиля: {response.status_code}")
        if response.status_code == 200:
            profile = response.json()
            print("✅ Профиль получен успешно")
            print(f"Имя: {profile.get('first_name', 'Не указано')}")
            print(f"Фамилия: {profile.get('last_name', 'Не указано')}")
            print(f"Тип: {profile['profile_type']}")
        else:
            print(f"❌ Ошибка получения профиля: {response.text}")
    except Exception as e:
        print(f"❌ Ошибка подключения: {e}")
    
    # 5. Обновление профиля
    print("\n5. Обновление профиля...")
    update_data = {
        "first_name": "Иван",
        "last_name": "Петров",
        "position": "Frontend Developer",
        "bio": "Опытный разработчик с фокусом на React и TypeScript",
        "skills": ["React", "TypeScript", "Node.js"],
        "location": "Москва, Россия"
    }
    
    try:
        response = requests.put(
            f"{BASE_URL}/profiles/me",
            json=update_data,
            headers=headers
        )
        print(f"Статус обновления профиля: {response.status_code}")
        if response.status_code == 200:
            profile = response.json()
            print("✅ Профиль обновлен успешно")
            print(f"Имя: {profile['first_name']}")
            print(f"Должность: {profile['position']}")
            print(f"Навыки: {profile['skills']}")
        else:
            print(f"❌ Ошибка обновления профиля: {response.text}")
    except Exception as e:
        print(f"❌ Ошибка подключения: {e}")
    
    # 6. Получение статистики профиля
    print("\n6. Получение статистики профиля...")
    try:
        response = requests.get(f"{BASE_URL}/profiles/me/stats", headers=headers)
        print(f"Статус получения статистики: {response.status_code}")
        if response.status_code == 200:
            stats = response.json()
            print("✅ Статистика получена успешно")
            print(f"Просмотры: {stats['profile_views']}")
            print(f"Запросы на перевод: {stats['transfer_requests']}")
        else:
            print(f"❌ Ошибка получения статистики: {response.text}")
    except Exception as e:
        print(f"❌ Ошибка подключения: {e}")
    
    print("\n🎉 Тестирование завершено!")

if __name__ == "__main__":
    test_profile_api()
