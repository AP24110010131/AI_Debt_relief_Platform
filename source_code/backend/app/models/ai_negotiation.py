from sqlalchemy import Column, Integer, String, ForeignKey
from source_code.backend.app.database import Base

class AINegotiation(Base):
    __tablename__ = "ai_negotiations"

    id = Column(Integer, primary_key=True, index=True)
    loan_id = Column(Integer, ForeignKey("loans.id"))
    negotiation_status = Column(String)
    ai_response = Column(String)