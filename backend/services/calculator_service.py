from typing import Dict, List, Any
from fastapi import HTTPException
from ..schemas import AssessmentCreate, Recommendation
from ..carbon_constants import CarbonFactors

def calculate_emissions(data: AssessmentCreate) -> Dict[str, float]:
    """
    Calculates carbon emissions across four categories based on user input.

    Args:
        data (AssessmentCreate): The validated user input data containing
            transport, energy, food, and shopping metrics.

    Returns:
        Dict[str, float]: A dictionary containing the emissions breakdown
            and the final carbon score (0-100).
            
    Raises:
        HTTPException: If any of the inputs are invalid or missing unexpectedly.
    """
    try:
        # Transport calculations
        car_miles = float(data.transport_data.get("car_miles_per_week", 0))
        flights = float(data.transport_data.get("flights_per_year", 0))
        transport_emissions = (car_miles * 52 * CarbonFactors.PETROL_CAR) + (flights * 1000 * CarbonFactors.FLIGHT_SHORT_HAUL)
        
        # Energy calculations
        kwh = float(data.energy_data.get("kwh_per_month", 0))
        energy_emissions = (kwh * 12 * CarbonFactors.GRID_ELECTRICITY)
        
        # Food calculations
        meat_meals = float(data.food_data.get("meat_meals_per_week", 0))
        food_emissions = (meat_meals * 52 * CarbonFactors.DIET_MEAT_HEAVY) + 1000 # Base 1000 for other food
        
        # Shopping
        shopping_spend = float(data.shopping_data.get("monthly_spend_usd", 0))
        shopping_emissions = shopping_spend * 12 * CarbonFactors.WASTE_GENERAL
        
        total = transport_emissions + energy_emissions + food_emissions + shopping_emissions
        
        # Scale score from 0 (terrible) to 100 (excellent)
        # Assume 10,000 kg is average (score 50), 2,000 kg is excellent (score 100)
        score = max(0, min(100, int(100 - ((total - 2000) / 160))))
        
        return {
            "transport_emissions": round(transport_emissions, 2),
            "energy_emissions": round(energy_emissions, 2),
            "food_emissions": round(food_emissions, 2),
            "shopping_emissions": round(shopping_emissions, 2),
            "total_emissions": round(total, 2),
            "carbon_score": float(score)
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Invalid data format provided: {str(e)}")

def get_recommendations(assessment_data: Dict[str, float]) -> List[Recommendation]:
    """
    Generates a list of actionable recommendations based on the user's specific emissions profile.

    Args:
        assessment_data (Dict[str, float]): The calculated emissions breakdown.

    Returns:
        List[Recommendation]: A prioritized list of recommendations to reduce footprint.
    """
    recs: List[Recommendation] = []
    
    # Priority: High Transport Emissions
    if assessment_data.get("transport_emissions", 0) > 2000:
        recs.append(Recommendation(
            id="rec-1",
            title="Switch to EV or Public Transit",
            description="Your transport emissions are high. Consider using public transit twice a week or switching to an electric vehicle to drastically cut CO2.",
            category="Transport",
            impact_score=85,
            effort_level="Medium",
            co2_savings_kg=1200.0,
            financial_savings=500.0
        ))
        
    # Priority: High Food Emissions
    if assessment_data.get("food_emissions", 0) > 1500:
        recs.append(Recommendation(
            id="rec-2",
            title="Adopt a Plant-Based Diet",
            description="Reducing meat consumption can drastically cut your footprint. Start with 'Meatless Mondays'.",
            category="Food",
            impact_score=90,
            effort_level="High",
            co2_savings_kg=900.0,
            financial_savings=800.0
        ))
    
    # Generic energy recommendation
    recs.append(Recommendation(
        id="rec-3",
        title="Switch to LED Bulbs",
        description="Replace 5 incandescent bulbs with LEDs to save energy and money instantly.",
        category="Energy",
        impact_score=40,
        effort_level="Low",
        co2_savings_kg=150.0,
        financial_savings=75.0
    ))
    
    return recs
