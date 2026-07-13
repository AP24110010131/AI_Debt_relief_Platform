import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def generate_settlement_recommendation(
    monthly_income,
    monthly_expense,
    total_debt,
    credit_score
):
    prompt = f"""
You are a financial debt recovery expert.

Monthly Income: ₹{monthly_income}
Monthly Expense: ₹{monthly_expense}
Total Debt: ₹{total_debt}
Credit Score: {credit_score}

Provide:
1. Debt Stress Analysis
2. Recommended Settlement Percentage
3. Financial Recovery Suggestions
4. Repayment Strategy

Keep the response professional and easy to understand.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    return response.text

def generate_negotiation_letter(
    name,
    lender,
    total_debt,
    monthly_income
):
    prompt = f"""
You are a financial advisor.

Write a professional loan settlement negotiation letter.

Customer Name: {name}
Lender: {lender}
Outstanding Debt: ₹{total_debt}
Monthly Income: ₹{monthly_income}

The letter should:
1. Be polite and professional.
2. Explain financial hardship.
3. Request a one-time settlement.
4. End respectfully.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    return response.text