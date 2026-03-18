import pandas as pd 
import numpy as np 
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from data_fetcher import fetch_actual, fetch_forecast
from forecast_selector import select_forecast

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/wind-data")
def get_wind_data(start: str, end: str, horizon: int):

    actual = fetch_actual(start, end)
    forecast = fetch_forecast(start, end)
    selected = select_forecast(actual, forecast, horizon)

    merged = actual.merge(selected, on="time", how="left")
    merged = merged.replace({np.nan: None})

    merged = merged.sort_values(by="time", ascending=True)
    
    merged['time'] = merged['time'].astype(str)
    
    return merged.to_dict(orient="records")