from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    xp = Column(Integer, default=0)
    carbon_score = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    assessments = relationship("Assessment", back_populates="user")
    goals = relationship("Goal", back_populates="user")

class Assessment(Base):
    __tablename__ = "assessments"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    # Input data
    transport_data = Column(JSON)
    energy_data = Column(JSON)
    food_data = Column(JSON)
    shopping_data = Column(JSON)
    
    # Results
    total_emissions = Column(Float)
    transport_emissions = Column(Float)
    energy_emissions = Column(Float)
    food_emissions = Column(Float)
    shopping_emissions = Column(Float)
    carbon_score = Column(Integer)
    
    user = relationship("User", back_populates="assessments")

class Goal(Base):
    __tablename__ = "goals"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    title = Column(String)
    target_reduction_kg = Column(Float)
    deadline = Column(DateTime)
    progress_kg = Column(Float, default=0.0)
    
    user = relationship("User", back_populates="goals")
