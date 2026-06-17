"""
Scientific Constants for Carbon Footprint Calculation.
Values represent kg CO2e (Carbon Dioxide Equivalent) per unit.
Source references: EPA, IPCC, and DEFRA carbon conversion factors (2023-2024).
"""

class CarbonFactors:
    """
    Scientific Carbon Emission Constants (kg CO2e)
    Sourced from:
    1. EPA (Environmental Protection Agency) GHG Emission Factors Hub (2024)
    2. IPCC (Intergovernmental Panel on Climate Change) Sixth Assessment Report
    3. DEFRA (Department for Environment, Food & Rural Affairs) Carbon Metrics
    """
    # Transport (kg CO2e per mile/flight)
    PETROL_CAR = 0.404192
    DIESEL_CAR = 0.171
    HYBRID_CAR = 0.109
    ELECTRIC_CAR = 0.053 # Based on grid average
    BUS = 0.105
    TRAIN = 0.041
    FLIGHT_SHORT_HAUL = 0.254 # per km per passenger
    FLIGHT_LONG_HAUL = 0.195

    # Energy (per kWh)
    GRID_ELECTRICITY = 0.233 # Varies heavily by region
    NATURAL_GAS = 0.203
    HEATING_OIL = 0.254
    SOLAR_WIND = 0.000 # Direct emissions

    # Food (per day average for diet type)
    DIET_MEAT_HEAVY = 7.19
    DIET_AVERAGE = 5.63
    DIET_VEGETARIAN = 3.81
    DIET_VEGAN = 2.89

    # Waste & Shopping (per kg or item)
    WASTE_GENERAL = 0.446
    CLOTHING_COTTON = 15.0 # per kg of clothing
