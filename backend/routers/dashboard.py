from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, database

router = APIRouter(
    prefix="/api/dashboard",
    tags=["dashboard"]
)

@router.get("/stats")
async def get_dashboard_stats(db: Session = Depends(database.get_db)):
    """
    Retrieves the dashboard KPIs and emissions breakdown for the current user.
    """
    try:
        user_id = 1
        latest = db.query(models.Assessment).filter(models.Assessment.user_id == user_id).order_by(models.Assessment.timestamp.desc()).first()
        
        if not latest:
            return {"has_data": False}
            
        return {
            "has_data": True,
            "latest_score": latest.carbon_score,
            "total_emissions": latest.total_emissions,
            "breakdown": [
                {"name": "Transport", "value": latest.transport_emissions},
                {"name": "Energy", "value": latest.energy_emissions},
                {"name": "Food", "value": latest.food_emissions},
                {"name": "Shopping", "value": latest.shopping_emissions},
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to fetch dashboard statistics.")
