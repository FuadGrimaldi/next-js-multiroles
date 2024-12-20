"use client";

import React, { useState, useEffect } from "react";
import SensorCard from "./cardIncube";
import Paho from "paho-mqtt";
import DoubleChart from "../chart/doubleChart"; // Ensure DoubleChart can handle single or array data.

type ClientType = {
  subscribe: (topic: string) => void;
  on: (event: string, callback: (message: any) => void) => void;
};

function Card() {
  // const [temp, setTemp] = useState<string | null>(null);
  // const [humid, setHumid] = useState<string | null>(null);
  const [temp, setTemp] = useState<number[]>([]); // store temperature data
  const [humid, setHumid] = useState<number[]>([]); // store humidity data
  const [labels, setLabels] = useState<string[]>([]);
  const [gas, setGas] = useState<string | null>(null);
  const [mintemp, setMinTemp] = useState<number | null>(null);
  const [newMinTemp, setNewMinTemp] = useState<number | null>(null);
  const [client, setClient] = useState<ClientType | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [openall, setOpenall] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // For controlling dropdown

  const connectToMqttBroker = async () => {
    const clientID = "clientID-inc-mqtt";
    const host = "broker.hivemq.com";
    const port = 8000;

    const mqttClient: any = new Paho.Client(host, Number(port), clientID);

    mqttClient.onMessageArrived = messageArrived;

    mqttClient.onConnectionLost = (responseObject: any) => {
      if (responseObject.errorCode !== 0) {
        setIsConnected(false);
      }
    };

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

  // const messageArrived = (message: any) => {
  //   const payload = message.payloadString;
  //   const topic = message.destinationName;

  //   if (topic === "inCube/Temp") {
  //     setTemp(payload);
  //   } else if (topic === "inCube/Humid") {
  //     setHumid(payload);
  //   } else if (topic === "inCube/Gas") {
  //     setGas(payload);
  //   }
  // };

  const messageArrived = (message: any) => {
    const payload = message.payloadString;
    const topic = message.destinationName;

    if (topic === "inCube/Temp") {
      const newTemperature = parseFloat(payload);
      setTemp((prevData) => {
        const updatedData = [...prevData, newTemperature];
        return updatedData.length > 60 ? updatedData.slice(1) : updatedData;
      });

      const now = new Date();
      const currentHour = now.getHours().toString().padStart(2, "0");
      const currentMinute = now.getMinutes().toString().padStart(2, "0");
      const currentSecond = now.getSeconds().toString().padStart(2, "0");
      setLabels((prevLabels) => {
        const newLabel = `${currentHour}:${currentMinute}:${currentSecond}`;
        const updatedLabels = [...prevLabels, newLabel];
        return updatedLabels.length > 60
          ? updatedLabels.slice(1)
          : updatedLabels;
      });
    } else if (topic === "inCube/Humid") {
      const newHumidity = parseFloat(payload);
      setHumid((prevData) => {
        const updatedData = [...prevData, newHumidity];
        return updatedData.length > 60 ? updatedData.slice(1) : updatedData;
      });
    } else if (topic === "inCube/Gas") {
      setGas(payload);
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

  // Subscribe to topics after client connects
  useEffect(() => {
    if (client && isConnected) {
      subscribeToTopic("inCube/Temp");
      subscribeToTopic("inCube/Humid");
      subscribeToTopic("inCube/Gas");
    }
  }, [client, isConnected]);

  useEffect(() => {
    if (temp && humid) {
      setLabels((prevLabels) => [
        ...prevLabels,
        new Date().toLocaleTimeString(), // Menambahkan waktu saat data diterima
      ]);
    }
  }, [temp, humid]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Safety check logic
  const tempValue = temp;
  const humidValue = humid;
  const gasValue = gas ? parseFloat(gas) : null;

  const isDangerous =
    temp !== null &&
    temp[0] >= 50 &&
    humid !== null &&
    humid[0] < 30 && // Akses elemen pertama dari array
    gasValue !== null &&
    gasValue > 1400;

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
          className="text-blue-500 font-semibold text-lg"
        >
          {isOpen ? "Hide Details" : "Show Details"}
        </button>
      </div>
      {/* Sensor Data */}
      <div className="flex flex-wrap p-6 bg-gray-100 border-b">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
          <SensorCard
            sensor={temp[0] ?? undefined} // temp[temp.length - 1]
            type="Temperature"
            format="°C"
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
          <SensorCard sensor={gasValue ?? undefined} type="Gas" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
          <SensorCard
            sensor={humid[0] ?? undefined}
            type="Humidity"
            format="%"
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
          <div className="flex items-center justify-between bg-yellow-400 rounded-lg shadow-md px-6 py-[17px]">
            <div className="mr-5">
              <p className="text-sm text-gray-500">Status</p>
              <p className="text-2xl font-bold text-gray-900">
                {isDangerous ? "Berbahaya" : "Aman"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="p-4">
          {/* Chart component */}
          <DoubleChart
            temperatureData={temp} // Pastikan data dalam bentuk array
            humidityData={humid} // Pastikan data dalam bentuk array
            labels={labels} // Menggunakan state labels yang sudah diupdate
          />
        </div>
      )}
    </div>
  );
}

export default Card;
