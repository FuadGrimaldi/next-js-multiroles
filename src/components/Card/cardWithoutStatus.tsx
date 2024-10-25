"use client";

import React, { useState } from "react";
import Chart from "@/components/chart";
import InfoCard from "./infoCard";

function CardNoStatus() {
  const [isOpen, setIsOpen] = useState(false); // Untuk mengontrol dropdown

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full border rounded-lg shadow-lg mb-4">
      <div className="flex justify-between items-center p-6 bg-gray-100 border-b">
        <div>
          <h2 className="lg:text-3xl text-2xl font-semibold text-black">
            inCube #1
          </h2>
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
          <div className="flex flex-col md:flex-row w-full">
            <div className="h-full w-full md:w-1/2">
              <Chart />
            </div>
            <div className="md:w-1/2 lg:pt-[50px]">
              <div className="p-6 space-y-4">
                <h2 className="lg:text-3xl text-xl font-semibold lg:pl-[90px] pl-6 text-black">
                  Average
                </h2>
                <div className="grid grid-cols-2">
                  <InfoCard color="#FFC107" title="Temperature" value="36°C" />
                  <div className="lg:mr-[110px] mr-0 lg:-ml-[110px]">
                    <InfoCard color="#4CAF50" title="Humidity" value="39%" />
                  </div>
                </div>
                <h2 className="lg:text-3xl text-xl font-semibold mt-6 lg:pl-[90px] pl-6 text-black">
                  Eggs
                </h2>
                <div className="grid grid-cols-2">
                  <InfoCard color="#2196F3" title="Active" value={43} />
                  <div className="lg:mr-[110px] mr-0 lg:-ml-[110px]">
                    <InfoCard color="#F48FB1" title="Hatched" value={5} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardNoStatus;
