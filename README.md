# Wind Generation Forecast Monitor 🌬️

This project is a full-stack web application designed to help users intuitively understand the accuracy of UK national-level wind power generation forecasts. It compares actual generation data with forecasted data fetched from the BMRS API, adjusting for configurable forecast horizons.

##  Directory Structure

The repository is organized into three main sections:

* **`/analysis`**: Contains the Jupyter Notebook (`forecast_analysis.ipynb`) detailing the error characteristics of the forecast model and recommendations for reliable wind capacity based on first-principles reasoning.
* **`/backend`**: A Python FastAPI application responsible for interacting with the Elexon BMRS API (`/datasets/FUELHH/stream` and `/datasets/WINDFOR/stream`). It handles data fetching, time-zone standardization, horizon filtering, and merging the datasets.
* **`/frontend`**: A React.js application using `Chart.js` (`react-chartjs-2`) to provide an interactive dashboard. Users can select date ranges and use a slider to configure the forecast horizon.

## 🚀 How to Start the Application Locally

### 1. Backend Setup (FastAPI)
1. Navigate to the backend directory:
   ```bash
   cd backend

2. Create and activate a virtual environment (optional but recommended):

     ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    
3.  Install the required dependencies:

     ```bash
    pip install fastapi uvicorn pandas numpy requests
    
4.  Start the development server:

    ```bash
    uvicorn main:app --reload
    The backend will run on http://127.0.0.1:8000

### 2. Frontend Setup (React)

1. Open a new terminal and navigate to the frontend directory:

     ```bash
    cd frontend

2.  Install the required Node modules:

    ```bash
    npm install

3.  Start the React development server:

     ```bash
    npm start

4.  The frontend will run on http://localhost:3000



### 🔗 Important Links
Live Application (Frontend): [(https://wind-forecast-app-sigma.vercel.app/)]

Live Backend API: [(https://wind-forecast-backend-32c2.onrender.com)]

Demo & Analysis Video: [Insert your Unlisted YouTube Video Link here]

### AI Tools Usage Disclaimer
As permitted by the challenge guidelines, AI tools (Google Gemini) were utilized for low-level assistance during development. Specifically, AI was used to help debug strict JSON compliance issues with Pandas NaN values, troubleshoot BMRS API parameter syntax (publishDateTimeFrom), and resolve Chart.js configuration for plotting non-continuous lines (spanGaps). All architectural decisions, analytical reasoning, and data interpretations were derived independently.
