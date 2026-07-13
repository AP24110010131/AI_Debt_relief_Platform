from sqlalchemy import Column, Integer, Float, ForeignKey
from source_code.backend.app.database import Base

class SettlementPrediction(Base):
    __tablename__ = "settlement_predictions"

    id = Column(Integer, primary_key=True, index=True)
    loan_id = Column(Integer, ForeignKey("loans.id"))
    predicted_amount = Column(Float)
    confidence_score = Column(Float)