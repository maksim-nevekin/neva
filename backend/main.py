from fastapi import FastAPI
from app.config import settings
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Разрешенные домены
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/hellow")
def hellow():
    return {"status": "success", "message": "FastAPI is working!"}
