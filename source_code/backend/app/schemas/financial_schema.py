from pydantic import BaseModel


class FinancialCreate(BaseModel):
    user_id: int
    monthly_income: float
    monthly_expense: float
    total_debt: float
    credit_score: int


class FinancialResponse(BaseModel):
    id: int
    user_id: int
    monthly_income: float
    monthly_expense: float
    total_debt: float
    credit_score: int

    class Config:
        from_attributes = True