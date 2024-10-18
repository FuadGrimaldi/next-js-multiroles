"use client";

import React, { useState } from "react";
import Chart from "@/components/chart";

function CardNoStatus() {
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
      {isOpen && (
        <div className="p-4">
          {/* Chart component */}
          <Chart />
        </div>
      )}
    </div>
  );
}

export default CardNoStatus;
