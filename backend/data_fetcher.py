import requests
import pandas as pd


ACTUAL_URL = "https://data.elexon.co.uk/bmrs/api/v1/datasets/FUELHH/stream"
FORECAST_URL = "https://data.elexon.co.uk/bmrs/api/v1/datasets/WINDFOR/stream"

def fetch_actual(start, end):
    params = {
        "fuelType": "WIND",
        "settlementDateFrom": start,
        "settlementDateTo": end
    }
    response = requests.get(ACTUAL_URL, params=params)
    data = response.json()
    
    rows = []
    for item in data:
        rows.append({
            "time": item["startTime"],
            "actual": item["generation"]
        })
    return pd.DataFrame(rows)

def fetch_forecast(start, end):
    params = {
        "publishDateTimeFrom": "2024-12-25T00:00:00Z",  
        "publishDateTimeTo": end + "T23:59:00Z"
    }
    
    response = requests.get(FORECAST_URL, params=params)
    data = response.json()
    
    rows = []
    for item in data:
        rows.append({
            "time": item["startTime"],
            "publishTime": item["publishTime"],
            "forecast": item["generation"]
        })
    return pd.DataFrame(rows)