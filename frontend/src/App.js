import React, { useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
);

function App() {
  const [start, setStart] = useState("2025-01-01");
  const [end, setEnd] = useState("2025-01-05");
  const [horizon, setHorizon] = useState(4);
  const [chartData, setChartData] = useState(null);

  const fetchData = async () => {
    const res = await axios.get("https://wind-forecast-backend-32c2.onrender.com/wind-data",
      {
        params: { start, end, horizon },
      },
    );

    // http://127.0.0.1:8000/wind-data
    const data = res.data;

    // const labels = data.map((d) => d.time);
    const labels = data.map((d) => {
      const date = new Date(d.time);
      return date.toLocaleString("en-GB", {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    });
    const actual = data.map((d) => d.actual);

    const forecast = data.map((d) =>
      d.forecast !== undefined ? d.forecast : null,
    );
    setChartData({
      labels,
      datasets: [
        {
          label: "Actual Generation",
          data: actual,
          borderColor: "#3b82f6", 
          borderWidth: 2,
          // tension: 0.4, 
          pointRadius: 0, 
        },
        {
          label: "Forecast Generation",
          data: forecast,
          borderColor: "#1abc86", 
          borderWidth: 2,
          // tension: 0.4,
          pointRadius: 0,
          spanGaps: true,
        },
      ],
    });
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, 
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: {
        grid: { color: "#f3f4f6", drawBorder: false }, 
        title: {
          display: true,
          text: "Target Time End (UTC)",
          color: "#4b5563",
          font: { size: 14 },
        },
        ticks: { color: "#6b7280", maxTicksLimit: 8 },
      },
      y: {
        grid: { color: "#f3f4f6", drawBorder: false },
        title: {
          display: true,
          text: "Power (MW)",
          color: "#4b5563",
          font: { size: 14 },
        },
        ticks: {
          color: "#6b7280",
          callback: function (value) {
            return value / 1000 + "k";
          },
        },
      },
    },
  };


  return (
    <div
      style={{
        fontFamily: "sans-serif",
        padding: "30px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      {/* Title */}
      <h2
        style={{
          fontWeight: "normal",
          fontSize: "1.4rem",
          color: "#111",
          marginBottom: "30px",
        }}
      >
        1. Forecast monitoring app
      </h2>

      {/* Top Controls Row */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "40px",
          alignItems: "flex-end",
          flexWrap: "wrap",
        }}
      >
        {/* Start Time Box */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontSize: "0.9rem", color: "#333" }}>
            Start Time:
          </label>
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            style={{
              padding: "8px 12px",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              outline: "none",
              fontSize: "1rem",
            }}
          />
        </div>

        {/* End Time Box */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontSize: "0.9rem", color: "#333" }}>End Time:</label>
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            style={{
              padding: "8px 12px",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              outline: "none",
              fontSize: "1rem",
            }}
          />
        </div>

        {/* Horizon Slider Box */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            flex: 1,
            minWidth: "200px",
            paddingBottom: "10px",
          }}
        >
          <label style={{ fontSize: "0.9rem", color: "#333" }}>
            Forecast Horizon: {horizon}h
          </label>
          <input
            type="range"
            min="0"
            max="48"
            value={horizon}
            onChange={(e) => setHorizon(Number(e.target.value))}
            style={{ width: "100%", cursor: "pointer", accentColor: "#2563eb" }}
          />
        </div>

        {/* Load Data Button */}
        <button
          onClick={fetchData}
          style={{
            padding: "9px 16px",
            backgroundColor: "#f1f5f9",
            border: "1px solid #cbd5e1",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "0.9rem",
            color: "#333",
          }}
        >
          Load Data
        </button>
      </div>

      {/* Chart Area */}
      <div style={{ height: "450px", width: "100%" }}>
        {chartData && <Line data={chartData} options={chartOptions} />}
      </div>
    </div>
  );
}

export default App;
