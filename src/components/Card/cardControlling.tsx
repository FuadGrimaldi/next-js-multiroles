"use client";
import React, { useState, useEffect } from "react";
import "jspdf-autotable";
import Paho from "paho-mqtt";
import Swal from "sweetalert2";

type ClientType = {
  subscribe: (topic: string) => void;
  on: (event: string, callback: (message: any) => void) => void;
};

interface reportParams {
  productId: string;
  nama: string;
  tinggi: number;
  lebar: number; //
  kapasitas: number;
  telur: number;
}

const CardIncubeControll: React.FC<reportParams> = ({
  productId = "",
  nama = "",
  tinggi = 0,
  lebar = 0,
  kapasitas = 0,
  telur = 0,
}) => {
  const [isOpen, setIsOpen] = useState(false); // Untuk mengontrol dropdown
  const [loading, setLoading] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [threshold1, setThreshold1] = useState<number>(0);
  const [threshold2, setThreshold2] = useState<number>(0);
  const [fanControl, setFanControl] = useState<string>("");
  const [client, setClient] = useState<ClientType | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const connectToMqttBroker = async () => {
    const clientID = "clientID-incube-mqtt";
    const host = "broker.hivemq.com";
    const port = 8000;

    const mqttClient: any = new Paho.Client(host, Number(port), clientID);

    mqttClient.onMessageArrived = messageArrived;

    mqttClient.connect({
      onSuccess: () => {
        setClient(mqttClient);
        setIsConnected(true);
      },
      onFailure: (message: any) => {
        setIsConnected(false);
      },
    });
  };

  const messageArrived = (message: any) => {
    const payload = message.payloadString;
    const topic = message.destinationName;

    if (topic === `${productId}/earlyTh`) {
      setThreshold1(Number(payload));
    } else if (topic === `${productId}/endTh`) {
      setThreshold2(Number(payload));
    }
  };
  const subscribeToTopic = (topic: string) => {
    if (client && isConnected && topic) {
      client.subscribe(topic);
    }
  };

  useEffect(() => {
    if (!isConnected) {
      connectToMqttBroker();
    }
  }, [isConnected]);

  // Berlangganan ke topik setelah client terhubung
  useEffect(() => {
    if (client && isConnected) {
      subscribeToTopic(`${productId}/earlyTh`);
      subscribeToTopic(`${productId}/endTh`);
    }
  }, [client, isConnected]);

  const handleSliderChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThreshold1(Number(event.target.value)); // Update threshold langsung
  };
  const handleSliderChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThreshold2(Number(event.target.value)); // Update threshold langsung
  };

  const handleSubmitTh = async () => {
    setLoading(true);
    setResponseMessage(""); // Reset response message
    try {
      const response = await fetch(
        `/api/data/threshold/${productId}/?minThreshold=${threshold1}&maxThreshold=${threshold2}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();

      if (response.ok) {
        setResponseMessage(`Success: ${data.message}`);
      } else {
        setResponseMessage(`Error: ${data.message}`);
      }
    } catch (error: any) {
      setResponseMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  const handleControl = async (state: string) => {
    setLoading(true);
    setMessage("");
    setFanControl(state);
    try {
      const response = await fetch(
        `/api/data/relay/${productId}/?state=${state}`,
        { method: "GET" }
      );
      const data = await response.json();

      if (response.ok) {
        setMessage(`Relay ${state.toUpperCase()} successfully triggered.`);
      } else {
        setMessage(`Error triggering relay: ${data.message}`);
      }
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
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
                  disabled={loading}
                  className={`px-6 lg:py-[46px] py-2 w-full text-black bg-yellow-500 rounded-md hover:bg-yellow-600 text-base ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Setting..." : "Set Threshold"}
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

            <h1 className="lg:text-xl text-lg font-bold text-black font-montserrat my-3">
              Fan Control
            </h1>
            <p className="text-gray-600 mb-4">
              Control Fan Manual Menggunakan tombol dibawah:
            </p>
            <div className="flex bg-gray-100 p-2 rounded-lg shadow-md text-sm">
              <div className="lg:space-x-4 space-x-1">
                <button
                  onClick={() => handleControl("on")}
                  className="lg:px-6 px-4 lg:py-2 py-1 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-200"
                >
                  Turn ON
                </button>
                <button
                  onClick={() => handleControl("off")}
                  className="lg:px-6 px-4 lg:py-2 py-1 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200"
                >
                  Turn OFF
                </button>
              </div>
            </div>
            {message && (
              <div
                className={`mt-4 p-2 text-black rounded-md ${
                  message ? "bg-yellow-500" : "bg-red-500"
                }`}
              >
                {message}
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
                  onClick={() => handleControl("on")}
                  className="lg:px-6 px-4 lg:py-2 py-1 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-200"
                >
                  Turn ON
                </button>
                <button
                  onClick={() => handleControl("off")}
                  className="lg:px-6 px-4 lg:py-2 py-1 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200"
                >
                  Turn OFF
                </button>
              </div>
            </div>
            {message && (
              <div
                className={`mt-4 p-2 text-black rounded-md ${
                  message ? "bg-yellow-500" : "bg-red-500"
                }`}
              >
                {message}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardIncubeControll;
