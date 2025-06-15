"use client";
import React, { useState, useEffect } from "react";
import "jspdf-autotable";

interface reportParams {
  productId: string;
  nama: string;
  tinggi: number;
  lebar: number; //
  kapasitas: number;
  telur: number;
}

type thresholdType = {
  min_suhu: number;
  max_suhu: number;
};

const CardIncubeControll: React.FC<reportParams> = ({ productId = "" }) => {
  const [isOpen, setIsOpen] = useState(false); // Untuk mengontrol dropdown
  const [loadingTH, setLoadingTH] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingFan, setLoadingFan] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [responseMessageFan, setResponseMessageFan] = useState<string>("");
  const [responseMessageLam, setResponseMessageLam] = useState<string>("");
  const [threshold1, setThreshold1] = useState<number>(0);
  const [threshold2, setThreshold2] = useState<number>(0);
  const [threshold, setThreshold] = useState<thresholdType>({
    min_suhu: 0,
    max_suhu: 0,
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetcThreshold = async () => {
      try {
        const response = await fetch(`/api/device-setting/${productId}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const result = await response.json();

        if (result.success && result.data) {
          const { min_suhu, max_suhu } = result.data;
          setThreshold({ min_suhu, max_suhu });
          setThreshold1(min_suhu);
          setThreshold2(max_suhu);
        }
      } catch (error) {
        setResponseMessage(
          `Error: ${error instanceof Error ? error.message : "Unknown error"}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetcThreshold();
  }, [productId]);

  const handleSliderChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThreshold1(Number(event.target.value)); // Update threshold langsung
  };
  const handleSliderChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThreshold2(Number(event.target.value)); // Update threshold langsung
  };

  const handleSubmitTh = async () => {
    setLoadingTH(true);
    setResponseMessage(""); // Reset response message
    try {
      const response = await fetch(`/api/update-threshold/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          min_suhu: threshold1,
          max_suhu: threshold2,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.meta?.code !== 200) {
        throw new Error(data.meta?.message || "Failed to update threshold");
      }

      if (response.ok) {
        setResponseMessage(`Success: ${data.meta.message}`);
      } else {
        setResponseMessage(`Error: ${data.meta.message}`);
      }
    } catch (error: any) {
      setResponseMessage(`Error: ${error.message}`);
    } finally {
      setLoadingTH(false);
    }
  };
  const handleControlFan = async (state: string) => {
    setLoadingFan(true);
    setResponseMessageFan(""); // Reset response message
    try {
      const response = await fetch(`/api/update-fan-status/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fan: state,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.meta?.code !== 200) {
        throw new Error(data.meta?.message || "Failed to update threshold");
      }

      if (response.ok) {
        setResponseMessageFan(`Success: ${data.meta.message}`);
      } else {
        setResponseMessageFan(`Error: ${data.meta.message}`);
      }
    } catch (error: any) {
      setResponseMessageFan(`Error: ${error.message}`);
    } finally {
      setLoadingFan(false);
    }
  };
  const handleControlLamp = async (state: string) => {
    setLoading(true);
    setResponseMessageLam(""); // Reset response message
    try {
      const response = await fetch(`/api/update-lampu-status/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lampu: state,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.meta?.code !== 200) {
        throw new Error(data.meta?.message || "Failed to update threshold");
      }

      if (response.ok) {
        setResponseMessageLam(`Success: ${data.meta.message}`);
      } else {
        setResponseMessageLam(`Error: ${data.meta.message}`);
      }
    } catch (error: any) {
      setResponseMessageLam(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full border rounded-lg shadow-lg mb-4">
      <div className="flex justify-between items-center p-6 bg-gray-100 border-b">
        <div>
          <h2 className="lg:text-3xl text-lg font-semibold text-black">
            inCube #{productId}
          </h2>
        </div>
        <button
          onClick={toggleDropdown}
          className="text-blue-500 font-semibold"
        >
          {isOpen ? "Hide" : "Show"}
        </button>
      </div>
      {isOpen && (
        <div className="p-4">
          {/* Chart component */}
          <div className="bg-gray-200 rounded rounded-lg p-6">
            <div className="">
              <h1 className="lg:text-xl text-lg font-bold text-black font-montserrat mb-3">
                Temperature Control
              </h1>
            </div>
            <p className="text-gray-600 mb-1">Default 38.00°C - 39.50°C</p>
            <p className="text-gray-600 mb-1">Tentukan batas suhu:</p>
            <div className="flex lg:flex-row flex-col  gap-6 w-full">
              {/* Kolom Kedua: Sliders */}
              <div className="flex flex-col gap-4 w-full">
                {/* Slider 1 */}
                <div className="flex flex-col items-start bg-gray-100 p-4 rounded-lg shadow-md">
                  <div className="flex flex-row items-center w-full">
                    <h1 className="lg:text-lg text-base text-black font-montserrat mr-4">
                      Start
                    </h1>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={threshold1}
                      onChange={handleSliderChange1}
                      className="w-full h-2 cursor-pointer"
                    />
                    <span className="text-lg font-medium text-black ml-4">
                      {threshold1}°C
                    </span>
                  </div>
                </div>

                {/* Slider 2 */}
                <div className="flex flex-col items-start bg-gray-100 p-4 rounded-lg shadow-md">
                  <div className="flex flex-row items-center w-full">
                    <h1 className="lg:text-lg text-base text-black font-montserrat mr-4">
                      End
                    </h1>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={threshold2}
                      onChange={handleSliderChange2}
                      className="w-full h-2 rounded-lg cursor-pointer"
                    />
                    <span className="text-lg font-medium text-black ml-4">
                      {threshold2}°C
                    </span>
                  </div>
                </div>
              </div>

              {/* Kolom Ketiga: Button */}
              <div className="flex justify-center items-center">
                <button
                  onClick={handleSubmitTh}
                  disabled={loadingTH}
                  className={`px-6 lg:py-[46px] py-2 w-full text-black bg-yellow-500 rounded-md hover:bg-yellow-600 text-base ${
                    loadingTH ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loadingTH ? "Loading..." : "Set Threshold"}
                </button>
              </div>
            </div>
            {responseMessage && (
              <div
                className={`mt-4 p-2 text-black rounded-md ${
                  responseMessage.startsWith("Success")
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              >
                {responseMessage}
              </div>
            )}

            <h1 className="text-lg lg:text-xl font-bold text-black font-montserrat my-3">
              Fan Control
            </h1>
            <p className="text-gray-600 mb-4">
              Control Fan secara manual menggunakan tombol di bawah:
            </p>

            <div className="flex flex-wrap gap-2 bg-gray-100 p-4 rounded-lg shadow-md text-sm">
              {[
                { label: "Turn ON", state: "ON", color: "green" },
                { label: "Turn OFF", state: "OFF", color: "red" },
                { label: "Turn AUTO", state: "AUTO", color: "yellow" },
              ].map(({ label, state, color }) => (
                <button
                  key={state}
                  onClick={() => handleControlFan(state)}
                  disabled={loadingFan}
                  className={`px-4 py-2 rounded-lg text-white shadow-md transition duration-200
                    bg-${color}-500 hover:bg-${color}-600
                    ${loadingFan ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  {label}
                </button>
              ))}
            </div>

            {responseMessageFan && (
              <div
                className={`mt-4 p-2 text-white font-medium rounded-md ${
                  responseMessageFan.startsWith("Success")
                    ? "bg-green-600"
                    : "bg-red-600"
                }`}
              >
                {responseMessageFan}
              </div>
            )}

            <h1 className="lg:text-xl text-lg font-bold text-black font-montserrat my-3">
              Lamp Control
            </h1>
            <p className="text-gray-600 mb-4">
              Control Lampu Manual Menggunakan tombol dibawah:
            </p>
            <div className="flex bg-gray-100 p-2 rounded-lg shadow-md text-sm">
              <div className="lg:space-x-4 space-x-1">
                <button
                  onClick={() => handleControlLamp("ON")}
                  disabled={loading}
                  className={`lg:px-6 px-4 lg:py-2 py-1 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-200 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Turn ON
                </button>
                <button
                  onClick={() => handleControlLamp("OFF")}
                  disabled={loading}
                  className={`lg:px-6 px-4 lg:py-2 py-1 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Turn OFF
                </button>
                <button
                  onClick={() => handleControlLamp("AUTO")}
                  disabled={loading}
                  className={`lg:px-6 px-4 lg:py-2 py-1 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition duration-200 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Turn AUTO
                </button>
              </div>
            </div>
            {responseMessageLam && (
              <div
                className={`mt-4 p-2 text-black rounded-md ${
                  responseMessageLam.startsWith("Success")
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              >
                {responseMessageLam}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardIncubeControll;
