from fastapi import APIRouter
from pydantic import BaseModel
from source_code.backend.app.services.ai_service import generate_negotiation_letter

from source_code.backend.app.services.ai_service import generate_settlement_recommendation
from source_code.backend.app.schemas.financial_schema import FinancialCreate

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


@router.post("/settlement")
def settlement(profile: FinancialCreate):

    recommendation = generate_settlement_recommendation(
        profile.monthly_income,
        profile.monthly_expense,
        profile.total_debt,
        profile.credit_score
    )

    return {
        "recommendation": recommendation
    }

class LetterRequest(BaseModel):
    name: str
    lender: str
    total_debt: float
    monthly_income: float


@router.post("/negotiation-letter")
def negotiation_letter(request: LetterRequest):

    letter = generate_negotiation_letter(
        request.name,
        request.lender,
        request.total_debt,
        request.monthly_income
    )

    return {
        "letter": letter
    }