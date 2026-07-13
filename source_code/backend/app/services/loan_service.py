from sqlalchemy.orm import Session
from source_code.backend.app.models.loan import Loan
from source_code.backend.app.schemas.loan_schema import LoanCreate


def create_loan(db: Session, loan: LoanCreate):
    db_loan = Loan(
        user_id=loan.user_id,
        lender=loan.lender,
        loan_type=loan.loan_type,
        outstanding_amount=loan.outstanding_amount,
        interest_rate=loan.interest_rate,
        tenure=loan.tenure
    )

    db.add(db_loan)
    db.commit()
    db.refresh(db_loan)

    return db_loan


def get_all_loans(db: Session):
    return db.query(Loan).all()