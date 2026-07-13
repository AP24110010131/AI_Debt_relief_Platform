from fastapi import FastAPI
from source_code.backend.app.database import Base, engine
from source_code.backend.app.routers.user_router import router as user_router
from source_code.backend.app.models.loan import Loan
from source_code.backend.app.routers.loan_router import router as loan_router
from source_code.backend.app.models.financial_profile import FinancialProfile
from source_code.backend.app.routers.financial_router import router as financial_router
from source_code.backend.app.routers.ai_router import router as ai_router
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Powered Debt Relief & Financial Recovery Platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Including USER router")
app.include_router(user_router)

print("Including LOAN router")
app.include_router(loan_router)

print("Including FINANCIAL router")
app.include_router(financial_router)

print("Including AI router")
app.include_router(ai_router)

print("All routers included")

@app.get("/")
def home():
    return {
        "message": "Welcome to AI Powered Debt Relief Platform"
    }