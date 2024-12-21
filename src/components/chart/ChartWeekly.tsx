"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Title,
} from "chart.js";
// import { getDatabase, ref, onValue } from "firebase/database";
// import app from "@/lib/firebase/init"; // Firebase initialization

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Title
);

type DoubleChartProps = {
  temperatureData: number[];
  humidityData: number[];
  labels: string[];
};

function Chart({ temperatureData, humidityData, labels }: DoubleChartProps) {
  console.log("Temperature Data:", temperatureData);
  console.log("Humidity Data:", humidityData);
  console.log("Labels:", labels);
  const last10TemperatureData = temperatureData.slice(-10);
  const last10HumidityData = humidityData.slice(-10);
  const last10Labels = labels.slice(-10);
  const chartData = {
    labels: last10Labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: last10TemperatureData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Humidity (%)",
        data: last10HumidityData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Average One Hour Temperature and Humidity",
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
    <div className="flex flex-col md:flex-row lg:w-full w-4/5">
      {/* Temperature Chart */}
      <div className="lg:h-[400px] h-[300px] lg:w-full w-[240px]">
        <Line data={chartData} options={options as any} />
      </div>
    </div>
  );
}

export default Chart;
