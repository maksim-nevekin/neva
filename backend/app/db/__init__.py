from .base import Base
from .session import engine, get_db, SessionLocal

# Импорт моделей чтобы они регистрировались у Base
from app.models.user import User
from app.models.profile import Profile


# Функция для создания таблиц
def create_tables():
    Base.metadata.create_all(bind=engine)

# Функция для удаления таблиц (для тестов)
def drop_tables():
    Base.metadata.drop_all(bind=engine)    
