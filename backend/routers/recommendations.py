from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, database
from ..services.calculator_service import get_recommendations

router = APIRouter(
    prefix="/api/recommendations",
    tags=["recommendations"]
)

@router.get("/", response_model=List[schemas.Recommendation])
async def read_recommendations(db: Session = Depends(database.get_db)):
    """
    Fetches personalized emission reduction recommendations based on
    the user's most recent carbon footprint assessment.
    """
    try:
        user_id = 1
        latest = db.query(models.Assessment).filter(models.Assessment.user_id == user_id).order_by(models.Assessment.timestamp.desc()).first()
        
        if not latest:
            return []
            
        assessment_data = {
            "transport_emissions": latest.transport_emissions,
            "energy_emissions": latest.energy_emissions,
            "food_emissions": latest.food_emissions,
            "shopping_emissions": latest.shopping_emissions,
        }
        
        return get_recommendations(assessment_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to fetch recommendations.")
