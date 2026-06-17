import pytest
from fastapi import HTTPException
from ..schemas import AssessmentCreate
from ..services.calculator_service import calculate_emissions, get_recommendations

def test_calculate_emissions_valid():
    data = AssessmentCreate(
        transport_data={"car_miles_per_week": 100, "flights_per_year": 1},
        energy_data={"kwh_per_month": 500},
        food_data={"meat_meals_per_week": 3},
        shopping_data={"monthly_spend_usd": 200}
    )
    
    result = calculate_emissions(data)
    
    assert "total_emissions" in result
    assert "carbon_score" in result
    assert result["transport_emissions"] == (100 * 52 * 0.4) + 1000
    assert result["carbon_score"] >= 0 and result["carbon_score"] <= 100

def test_calculate_emissions_invalid_data():
    data = AssessmentCreate(
        transport_data={"car_miles_per_week": "invalid"},
        energy_data={},
        food_data={},
        shopping_data={}
    )
    
    with pytest.raises(HTTPException) as excinfo:
        calculate_emissions(data)
    assert excinfo.value.status_code == 400
    assert "Invalid data format" in str(excinfo.value.detail)

def test_get_recommendations():
    assessment_data = {
        "transport_emissions": 3000,
        "food_emissions": 500,
        "energy_emissions": 2000,
        "shopping_emissions": 1000
    }
    recs = get_recommendations(assessment_data)
    
    # Should recommend transport changes because transport > 2000
    assert any(r.category == "Transport" for r in recs)
    # Should NOT recommend food changes because food is low (500)
    assert not any(r.title == "Adopt a Plant-Based Diet" for r in recs)
    # Generic energy recommendation is always included
    assert any(r.category == "Energy" for r in recs)
