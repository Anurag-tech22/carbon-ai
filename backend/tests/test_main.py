import pytest
from fastapi.testclient import TestClient
from ..main import app
from ..database import Base, engine, get_db
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Setup test database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test_carbon_compass.db"
engine_test = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine_test)

Base.metadata.create_all(bind=engine_test)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to Carbon Compass AI API"}

def test_register_user():
    response = client.post(
        "/api/auth/register",
        json={"username": "testuser", "email": "test@example.com", "password": "testpassword"}
    )
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"

def test_register_duplicate_user():
    response = client.post(
        "/api/auth/register",
        json={"username": "testuser", "email": "test@example.com", "password": "testpassword"}
    )
    assert response.status_code == 400

def test_login_user():
    response = client.post(
        "/api/auth/login",
        json={"username": "testuser", "password": "testpassword"}
    )
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_login_wrong_password():
    response = client.post(
        "/api/auth/login",
        json={"username": "testuser", "password": "wrongpassword"}
    )
    assert response.status_code == 401
