import pandas as pd


def select_forecast(actual_df, forecast_df, horizon):

    if actual_df.empty or forecast_df.empty:
        return pd.DataFrame(columns=["time", "forecast"])

    actual_df["time"] = pd.to_datetime(actual_df["time"], utc=True)
    forecast_df["time"] = pd.to_datetime(forecast_df["time"], utc=True)
    forecast_df["publishTime"] = pd.to_datetime(forecast_df["publishTime"], utc=True)

    selected_rows = []

    
    print(f"Total Actual Rows: {len(actual_df)}")
    print(f"Total Forecast Rows: {len(forecast_df)}")
    
    if not forecast_df.empty:
        print("Sample Forecast Data:")
        print(forecast_df[["time", "publishTime"]].head(3))
        
    
    for target_time in actual_df["time"]:

        cutoff = target_time - pd.Timedelta(hours=horizon)

        valid = forecast_df[
            (forecast_df["time"] == target_time) & 
            (forecast_df["publishTime"] <= cutoff)
        ]

        if not valid.empty:


            latest = valid.sort_values("publishTime").iloc[-1]

            selected_rows.append({
                "time": target_time,
                "forecast": latest["forecast"]
            })

    return pd.DataFrame(selected_rows, columns=["time", "forecast"])