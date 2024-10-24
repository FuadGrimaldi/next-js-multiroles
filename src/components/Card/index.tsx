"use client";

import React, { useState } from "react";
import SensorCard from "./cardIncube";
import Chart from "@/components/chart";
import DoubleChart from "../chart/doubleChart";

function Card() {
  const [isOpen, setIsOpen] = useState(false); // Untuk mengontrol dropdown

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full border rounded-lg shadow-lg mb-4">
      <div className="flex justify-between items-center p-6 bg-gray-100 border-b">
        <div>
          <h2 className="text-3xl font-semibold text-black">inCube #1</h2>
          <div className="text-2xl font-semibold text-black">
            <span className="text-primary">(+43)</span>
            <span>Eggs</span>
          </div>
        </div>
        <button
          onClick={toggleDropdown}
          className="text-blue-500 font-semibold"
        >
          {isOpen ? "Hide Details" : "Show Details"}
        </button>
      </div>
      {/* Sensor Data */}
      <div className="flex flex-wrap p-6 bg-gray-100 border-b">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
          <SensorCard temperature={20} type="temperature" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
          <div className="bg-[#ffb800] rounded-lg shadow-md px-6 py-[42px]"></div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
          <SensorCard humidity={60} type="humidity" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
          <div className="bg-[#B6FFA1] rounded-lg shadow-md px-6 py-[42px]"></div>
        </div>
      </div>
      {isOpen && (
        <div className="p-4">
          {/* Chart component */}
          <DoubleChart />
        </div>
      )}
    </div>
  );
}

export default Card;
