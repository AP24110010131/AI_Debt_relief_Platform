from sqlalchemy import Column, Integer, Float, String, ForeignKey
from source_code.backend.app.database import Base

class Loan(Base):
    __tablename__ = "loans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    lender = Column(String)
    loan_type = Column(String)
    outstanding_amount = Column(Float)
    interest_rate = Column(Float)
    tenure = Column(Integer)