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

function DoubleChart({
  temperatureData,
  humidityData,
  labels,
}: DoubleChartProps) {
  // Data for Temperature Chart
  // Ambil 10 data terakhir untuk menghindari chart yang terlalu padat
  const last10TemperatureData = temperatureData.slice(-10);
  const last10HumidityData = humidityData.slice(-10);
  const last10Labels = labels.slice(-10);

  const temperatureChartData = {
    labels: last10Labels,
    datasets: [
      {
        label: "Incubator Temperature (°C)",
        data: last10TemperatureData,
        borderColor: "rgba(75, 192, 192, 1)", // Line color
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Area under line color
        fill: true, // Fill area below the line
        tension: 0.4,
      },
    ],
  };

  // Data for Humidity Chart
  const humidityChartData = {
    labels: last10Labels,
    datasets: [
      {
        label: "Humidity (%)",
        data: last10HumidityData,
        borderColor: "rgba(255, 99, 132, 1)", // Line color
        backgroundColor: "rgba(255, 99, 132, 0.2)", // Area under line color
        fill: true, // Fill area below the line
        tension: 0.4,
      },
    ],
  };

  // Chart options for temperature
  const temperatureOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Real-time Incubator Temperature",
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Temperature (°C)",
        },
        min: 15, // Minimum temperature
        max: 50, // Maximum temperature
      },
      x: {
        title: {
          display: true,
          text: "Time (HH:MM:SS)",
        },
      },
    },
  };

  // Chart options for humidity
  const humidityOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Real-time Incubator Humidity",
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Humidity (%)",
        },
        min: 40, // Minimum humidity
        max: 120, // Maximum humidity
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
      <div className="lg:h-[400px] h-[300px] w-full">
        <Line data={temperatureChartData} options={temperatureOptions as any} />
      </div>
      {/* Humidity Chart */}
      <div className="lg:h-[400px] h-[300px] w-full">
        <Line data={humidityChartData} options={humidityOptions as any} />
      </div>
    </div>
  );
}

export default DoubleChart;
