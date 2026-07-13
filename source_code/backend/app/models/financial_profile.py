from sqlalchemy import Column, Integer, Float, ForeignKey
from source_code.backend.app.database import Base

class FinancialProfile(Base):
    __tablename__ = "financial_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    monthly_income = Column(Float)
    monthly_expense = Column(Float)
    total_debt = Column(Float)
    credit_score = Column(Integer)