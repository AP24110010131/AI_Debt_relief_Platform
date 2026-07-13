from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from source_code.backend.app.database import get_db
from source_code.backend.app.schemas.user_schema import (
    UserCreate,
    UserResponse,
    LoginRequest,
    Token,
)
from source_code.backend.app.services.user_service import (
    create_user,
    login_user,
)

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post("/create", response_model=UserResponse)
def create_new_user(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user)


@router.post("/login", response_model=Token)
def login(user: LoginRequest, db: Session = Depends(get_db)):
    token = login_user(db, user)

    if token is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    return token