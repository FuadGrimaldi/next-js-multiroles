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
  gasData: number[];
  labels: string[];
  name?: string;
  lebar?: number; //
  tinggi?: number; //
  statusCon: string;
  statusIp: string; // status koneksi internet
};

function DoubleChart({
  temperatureData,
  humidityData,
  gasData,
  labels,
  name,
  tinggi,
  lebar,
  statusCon,
  statusIp,
}: DoubleChartProps) {
  // Data for Temperature Chart
  // Ambil 10 data terakhir untuk menghindari chart yang terlalu padat
  const last10TemperatureData = temperatureData.slice(-10);
  const last10HumidityData = humidityData.slice(-10);
  const last10Gas = gasData.slice(-10);
  const last10Labels = labels.slice(-10);

  const temperatureChartData = {
    labels: last10Labels,
    datasets: [
      {
        label: "Temperature (°C)",
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

  const gasChartData = {
    labels: last10Labels,
    datasets: [
      {
        label: "Gas (ppm)",
        data: last10Gas,
        borderColor: "rgb(172, 99, 255)", // Line color
        backgroundColor: "rgba(32, 12, 46, 0.2)", // Area under line color
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
        max: 60, // Maximum temperature
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
        min: 0, // Minimum humidity
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

  // Chart options for humidity
  const gasOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Real-time Incubator Gas",
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "gas (ppm",
        },
        min: 100, // Minimum humidity
        max: 3000, // Maximum humidity
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:w-full w-4/5">
      {/* Temperature Chart */}
      <div className="lg:h-[400px] h-[300px] lg:w-full w-[240px]">
        <Line data={temperatureChartData} options={temperatureOptions as any} />
      </div>
      {/* Humidity Chart */}
      <div className="lg:h-[400px] h-[300px] lg:w-full w-[240px]">
        <Line data={humidityChartData} options={humidityOptions as any} />
      </div>
      {/* Gas Chart */}
      <div className="lg:h-[400px] h-[300px] lg:w-full w-[240px]">
        <Line data={gasChartData} options={gasOptions as any} />
      </div>
      <div className="w-[240px] lg:w-1/2 lg:mt-[56px] mt-2 px-4 pb-2 lg:px-0 mx-auto">
        <div className="bg-white border rounded-md shadow-md lg:mx-4 mx-0 p-2">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 lg:px-6 px-2 pt-[6px]">
            <h3 className="lg:text-lg text-base font-semibold text-gray-800">
              Network Connection
            </h3>
            <div className="text-green-500 text-xl mb-2">📶</div>
          </div>
          <div className="flex flex-col items-center mb-4">
            <span className="text-base text-green-500 bg-green-100 px-3 py-1 rounded-full">
              {statusCon || "-"}
            </span>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg mx-3 px-6 py-[8px]">
            <p className="text-sm text-gray-600">IP {statusIp || "-"} </p>
          </div>
          <div className="flex items-center justify-between mb-4 lg:px-6 px-2 pt-[6px]">
            <h3 className="lg:text-lg text-base font-semibold text-gray-800">
              Info product
            </h3>
          </div>
          {/* Device Info */}
          <div className="bg-gray-100 p-3 rounded-lg mb-2 mx-3 px-6 py-[8px]">
            <p className="text-sm text-gray-600">{name}</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg mb-2 mx-3 px-6 py-[8px]">
            <p className="text-sm text-gray-600">
              {lebar} x {tinggi}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoubleChart;
