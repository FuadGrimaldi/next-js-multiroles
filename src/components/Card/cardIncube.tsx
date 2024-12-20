import React from "react";

interface SensorCardProps {
  sensor?: number; // Nilai sensor
  format?: string; // Menentukan format nilai sensor, seperti "°C", "%", dll.
  type?: string; // Menentukan jenis sensor atau kartu
}

const SensorCard: React.FC<SensorCardProps> = ({
  format = "",
  sensor = 0,
  type = "",
}) => {
  // Jika `type` tidak disediakan, jangan tampilkan komponen
  if (!type) return null;

  return (
    <div className="flex items-center justify-between bg-gray-200 rounded-lg shadow-md px-6 py-4">
      <div className="mr-5">
        <p className="text-sm text-gray-500">{type}</p>
        <p className="text-2xl font-bold text-gray-900">
          {sensor}
          {format}
        </p>
      </div>
      <div className="flex items-center justify-center bg-yellow-400 rounded-full lg:h-12 h-8 lg:w-12 w-8">
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
};

export default SensorCard;
