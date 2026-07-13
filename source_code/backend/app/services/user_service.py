from sqlalchemy.orm import Session
from passlib.context import CryptContext

from source_code.backend.app.models.user import User
from source_code.backend.app.schemas.user_schema import UserCreate, LoginRequest
from source_code.backend.app.auth import create_access_token

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def create_user(db: Session, user: UserCreate):
    hashed_password = pwd_context.hash(user.password)

    db_user = User(
        full_name=user.full_name,
        email=user.email,
        phone=user.phone,
        password=hashed_password
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def login_user(db: Session, user: LoginRequest):
    db_user = db.query(User).filter(User.email == user.email).first()

    if db_user is None:
        return None

    if not verify_password(user.password, db_user.password):
        return None

    token = create_access_token({"sub": db_user.email})

    return {
        "access_token": token,
        "token_type": "bearer"
    }