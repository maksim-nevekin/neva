import requests
import json

# Тестируем регистрацию
url = "http://localhost:8000/api/v1/auth/register"
data = {
    "email": "test@example.com",
    "username": "testuser",
    "password": "testpassword123"
}

try:
    response = requests.post(url, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"Error: {e}")
