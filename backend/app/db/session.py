from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings


# Движок базы данных
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True, # Проверяет соединение перед использованием
    echo=True, # Логирование SQL запросов
)

# Фабрика сессий
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Функция для получения сессии в зависимостях
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
