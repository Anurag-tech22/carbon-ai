from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime

class AssessmentBase(BaseModel):
    """Base model for carbon footprint assessment data."""
    transport_data: Dict[str, float] = Field(..., description="Transport data, e.g., {'car_miles_per_week': 150}")
    energy_data: Dict[str, float] = Field(..., description="Energy data, e.g., {'kwh_per_month': 900}")
    food_data: Dict[str, float] = Field(..., description="Food data, e.g., {'meat_meals_per_week': 5}")
    shopping_data: Dict[str, float] = Field(..., description="Shopping data, e.g., {'monthly_spend_usd': 300}")

class AssessmentCreate(AssessmentBase):
    """Schema for creating a new assessment."""
    pass

class AssessmentResponse(AssessmentBase):
    """Schema for returning assessment results."""
    id: int = Field(..., description="Unique assessment ID")
    user_id: int = Field(..., description="ID of the user")
    timestamp: datetime = Field(..., description="Time of assessment")
    total_emissions: float = Field(..., ge=0, description="Total CO2 emissions in kg")
    transport_emissions: float = Field(..., ge=0, description="Transport emissions in kg")
    energy_emissions: float = Field(..., ge=0, description="Energy emissions in kg")
    food_emissions: float = Field(..., ge=0, description="Food emissions in kg")
    shopping_emissions: float = Field(..., ge=0, description="Shopping emissions in kg")
    carbon_score: int = Field(..., ge=0, le=100, description="Score from 0 (worst) to 100 (best)")

    class Config:
        from_attributes = True

class Recommendation(BaseModel):
    """Schema representing an actionable recommendation."""
    id: str = Field(..., description="Recommendation ID")
    title: str = Field(..., description="Action title")
    description: str = Field(..., description="Detailed description")
    category: str = Field(..., description="Category (e.g., Transport, Food)")
    impact_score: int = Field(..., ge=0, le=100, description="Impact rating 0-100")
    effort_level: str = Field(..., description="Low, Medium, or High")
    co2_savings_kg: float = Field(..., ge=0, description="Estimated CO2 saved annually")
    financial_savings: float = Field(..., ge=0, description="Estimated USD saved annually")

class ChatMessage(BaseModel):
    """Schema for a single chat message."""
    role: str = Field(..., description="Role: 'user' or 'assistant'")
    content: str = Field(..., min_length=1, max_length=1000, description="Message content")

class ChatRequest(BaseModel):
    """Schema for sending chat context to the coach."""
    messages: List[ChatMessage] = Field(..., description="Conversation history")

class ChatResponse(BaseModel):
    """Schema for the coach's reply."""
    reply: str = Field(..., description="Coach's reply text")
