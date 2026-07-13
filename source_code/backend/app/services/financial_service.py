from sqlalchemy.orm import Session

from source_code.backend.app.models.financial_profile import FinancialProfile
from source_code.backend.app.schemas.financial_schema import FinancialCreate


def create_financial_profile(db: Session, profile: FinancialCreate):
    db_profile = FinancialProfile(
        user_id=profile.user_id,
        monthly_income=profile.monthly_income,
        monthly_expense=profile.monthly_expense,
        total_debt=profile.total_debt,
        credit_score=profile.credit_score
    )

    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)

    return db_profile


def get_all_profiles(db: Session):
    return db.query(FinancialProfile).all()