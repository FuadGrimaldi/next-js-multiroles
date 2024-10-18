"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register scales and elements used by the chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Chart() {
  const [temperatureData, setTemperatureData] = useState<number[]>([]);
  const [humidityData, setHumidityData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      const temperatureResponse = await axios.get(
        "http://127.0.0.1:8000/temperature"
      );
      const humidityResponse = await axios.get(
        "http://127.0.0.1:8000/humidity"
      );

      // Assuming the response contains an array of data
      const temperatureArray = temperatureResponse.data.Temperature;
      const humidityArray = humidityResponse.data.Humidity;

      console.log("Temperature Data:", temperatureArray);
      console.log("Humidity Data:", humidityArray);

      // Limit the data to the latest 50 entries
      const limitedTemperature = temperatureArray.slice(-50);
      const limitedHumidity = humidityArray.slice(-50);

      // Store only the latest 50 data points
      setTemperatureData(limitedTemperature);
      setHumidityData(limitedHumidity);

      // Create labels for the last 50 data points
      const generatedLabels = limitedTemperature.map(
        (_: number, index: number) => {
          return `Time ${index + 1}`;
        }
      );

      setLabels(generatedLabels);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data once on mount
  }, []);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Incubator Temperature (°C)",
        data: temperatureData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Humidity (%)",
        data: humidityData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Incubator Temperature and Humidity (Last 50 Data Points)",
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Value",
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
      x: {
        title: {
          display: true,
          text: "Index",
        },
      },
    },
  };

  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className="h-full w-full md:w-1/2">
        <Line data={chartData} options={options} />
      </div>
      <div className="h-full w-full md:w-1/2">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default Chart;
