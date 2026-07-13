from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from source_code.backend.app.database import get_db
from source_code.backend.app.schemas.financial_schema import (
    FinancialCreate,
    FinancialResponse,
)
from source_code.backend.app.services.financial_service import (
    create_financial_profile,
    get_all_profiles,
)

router = APIRouter(
    prefix="/financial",
    tags=["Financial Profile"]
)


@router.post("/create", response_model=FinancialResponse)
def create_profile(
    profile: FinancialCreate,
    db: Session = Depends(get_db)
):
    return create_financial_profile(db, profile)


@router.get("/", response_model=list[FinancialResponse])
def get_profiles(
    db: Session = Depends(get_db)
):
    return get_all_profiles(db)
