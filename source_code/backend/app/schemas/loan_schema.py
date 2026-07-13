from pydantic import BaseModel


class LoanCreate(BaseModel):
    user_id: int
    lender: str
    loan_type: str
    outstanding_amount: float
    interest_rate: float
    tenure: int


class LoanResponse(BaseModel):
    id: int
    user_id: int
    lender: str
    loan_type: str
    outstanding_amount: float
    interest_rate: float
    tenure: int

    class Config:
        from_attributes = True