from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db import create_tables
from app.api.routes import auth, users, profiles

# Создаем таблицы при запуске
create_tables()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключаем роуты
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(users.router, prefix=settings.API_V1_STR)
app.include_router(profiles.router, prefix=settings.API_V1_STR)

@app.get("/")
def read_root():
    return {"message": "Welcome to NEVA project!"}

@app.get("/api/home")
def home():
    return {"status": "success", "message": "FastAPI is working!"}

@app.get("/api/v1/info")
def api_info():
    return {
        "version": "1.0.0",
        "title": settings.PROJECT_NAME,
        "description": "FastAPI + React + PostgreSQL"
    }
