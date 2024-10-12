import React from "react";

interface SensorCardProps {
  temperature?: number;
  humidity?: number;
  type: "temperature" | "humidity"; // Menentukan jenis card
}

const SensorCard: React.FC<SensorCardProps> = ({
  temperature,
  humidity,
  type,
}) => {
  if (type === "temperature") {
    return (
      <div className="flex items-center justify-between bg-gray-200 rounded-lg shadow-md px-6 py-4">
        <div className="mr-5">
          <p className="text-sm text-gray-500">Temperature</p>
          <p className="text-2xl font-bold text-gray-900">{temperature}°C</p>
        </div>
        <div className="flex items-center justify-center bg-yellow-400 rounded-full h-12 w-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
      </div>
    );
  }

  if (type === "humidity") {
    return (
      <div className="flex items-center justify-between bg-gray-200 rounded-lg shadow-md px-6 py-4">
        <div className="mr-5">
          <p className="text-sm text-gray-500">Humidity</p>
          <p className="text-2xl font-bold text-gray-900">{humidity}%</p>
        </div>
        <div className="flex items-center justify-center bg-[#B6FFA1] rounded-full h-12 w-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
      </div>
    );
  }

  return null; // Jika tidak ada yang sesuai, return null
};

export default SensorCard;
