from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from source_code.backend.app.database import get_db
from source_code.backend.app.schemas.loan_schema import LoanCreate, LoanResponse
from source_code.backend.app.services.loan_service import create_loan, get_all_loans

router = APIRouter(
    prefix="/loans",
    tags=["Loans"]
)


@router.post("/create", response_model=LoanResponse)
def create_new_loan(
    loan: LoanCreate,
    db: Session = Depends(get_db)
):
    return create_loan(db, loan)


@router.get("/", response_model=list[LoanResponse])
def get_loans(db: Session = Depends(get_db)):
    return get_all_loans(db)