from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas, database
from ..services.calculator_service import calculate_emissions

router = APIRouter(
    prefix="/api/calculator",
    tags=["calculator"]
)

@router.post("/assess", response_model=schemas.AssessmentResponse)
async def create_assessment(assessment: schemas.AssessmentCreate, db: Session = Depends(database.get_db)):
    """
    Submits a new carbon footprint assessment.
    
    Validates input data, calculates emissions across multiple categories,
    and stores the final assessment record in the database.
    """
    try:
        results = calculate_emissions(assessment)
        
        # In a production app, user_id would come from JWT auth middleware
        user_id = 1 
        
        db_assessment = models.Assessment(
            user_id=user_id,
            transport_data=assessment.transport_data,
            energy_data=assessment.energy_data,
            food_data=assessment.food_data,
            shopping_data=assessment.shopping_data,
            **results
        )
        db.add(db_assessment)
        db.commit()
        db.refresh(db_assessment)
        return db_assessment
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error during assessment creation: {str(e)}")
