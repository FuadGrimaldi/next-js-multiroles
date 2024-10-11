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

// Mendaftar skala dan elemen yang digunakan
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

      const currentTemperature = temperatureResponse.data.Temperature;
      const currentHumidity = humidityResponse.data.Humidity;

      setTemperatureData((prevData) => [...prevData, currentTemperature]);
      setHumidityData((prevData) => [...prevData, currentHumidity]);

      const currentTime = new Date().toLocaleTimeString();
      setLabels((prevLabels) => [...prevLabels, currentTime]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(fetchData, 2000);
    return () => clearInterval(intervalId);
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
        text: "Real-time Incubator Temperature and Humidity",
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
          text: "Time (HH:MM:SS)",
        },
      },
    },
  };

  return (
    <div className="h-full w-1/2">
      <Line data={chartData} />
    </div>
  );
}

export default Chart;
