"use client";

import React, { useState, useEffect } from "react";

function CardEggControl() {
  const [isOpen, setIsOpen] = useState(false); // For controlling dropdown
  const [statusFan, setStatusFan] = useState(false); // For controlling
  const [statusLamb, setStatusLamb] = useState(false);
  const [statusGas, setStatusGas] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full border rounded-lg shadow-lg mb-4">
      <div className="flex justify-between items-center p-6 bg-gray-100 border-b">
        <div>
          <h2 className="lg:text-3xl text-xl font-semibold text-black">
            inCube #1
          </h2>
          <div className="lg:text-2xl text-xl font-semibold text-black">
            <span className="text-primary">(+43)</span>
            <span>Eggs</span>
          </div>
        </div>
        <button
          onClick={toggleDropdown}
          className="text-blue-500 font-semibold lg:text-lg text-sm"
        >
          {isOpen ? "Close Input" : "Input Eggs"}
        </button>
      </div>
      {/* Sensor Data */}
      <div className="flex flex-wrap p-6 bg-gray-100 border-b">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/2 xl:w-1/2 p-2">
          <div className="flex flex-wrap -mx-2">
            {/* Card 1 */}
            <div className="w-1/2 px-2">
              <div className="flex items-center justify-between bg-yellow-400 rounded-lg shadow-md px-6 py-[17px]">
                <div className="mr-5">
                  <p className="text-sm text-gray-500">Status Fan</p>
                  <p className="lg:text-2xl text-lg font-bold text-gray-900">
                    {statusFan || "-"}
                  </p>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="w-1/2 px-2">
              <div className="flex items-center justify-between bg-yellow-400 rounded-lg shadow-md px-6 py-[17px]">
                <div className="mr-5">
                  <p className="text-sm text-gray-500">Status Lamp</p>
                  <p className="lg:text-2xl text-lg font-bold text-gray-900">
                    -
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
          <div
            className="flex items-center justify-between rounded-lg shadow-md px-6 py-[17px] bg-yellow-400
            "
          >
            <div className="mr-5">
              <p className="text-sm text-gray-500">Status Flame</p>
              <p className="lg:text-2xl text-lg font-bold text-gray-900">-</p>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="p-4">
          <div className="px-4">
            <div className="lg:text-3xl text-xl font-semibold text-black">
              Silahkan Edit disini
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardEggControl;
