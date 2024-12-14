"use client";

import React, { useState, useEffect } from "react";
import SensorCard from "./cardIncube";
import Paho from "paho-mqtt";
import DoubleChart from "../chart/doubleChart";

type ClientType = {
  subscribe: (topic: string) => void;
  on: (event: string, callback: (message: any) => void) => void;
};

function Card() {
  const [temp, setTemp] = useState<string | null>(null);
  const [humid, setHumid] = useState<string | null>(null);
  const [gas, setGas] = useState<string | null>(null);
  const [mintemp, setMinTemp] = useState();
  const [newMinTemp, setNewMinTemp] = useState();
  const [client, setClient] = useState<ClientType | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [openall, setOpenall] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Untuk mengontrol dropdown

  const connectToMqttBroker = async () => {
    const clientID = "clientID-tes-mirsabanwar-mqtt";
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

  const messageArrived = (message: any) => {
    const payload = message.payloadString;
    const topic = message.destinationName;

    if (topic === "MirsabAnwar/Temp") {
      setTemp(payload);
    } else if (topic === "MirsabAnwar/Humid") {
      setHumid(payload);
    } else if (topic === "MirsabAnwar/Gas") {
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

  // Berlangganan ke topik setelah client terhubung
  useEffect(() => {
    if (client && isConnected) {
      subscribeToTopic("MirsabAnwar/Temp");
      subscribeToTopic("MirsabAnwar/Humid");
      subscribeToTopic("MirsabAnwar/Gas");
    }
  }, [client, isConnected]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Logika untuk menentukan status keamanan
  const tempValue = temp ? parseFloat(temp) : null;
  const humidValue = humid ? parseFloat(humid) : null;
  const gasValue = gas ? parseFloat(gas) : null;

  const isDangerous =
    tempValue !== null &&
    tempValue > 50 &&
    humidValue !== null &&
    humidValue < 30 &&
    gasValue !== null &&
    gasValue > 1400;

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
          <SensorCard
            sensor={tempValue ?? undefined}
            type="Temperature"
            format="°C"
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
          <SensorCard sensor={gasValue ?? undefined} type="Gas" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
          <SensorCard
            sensor={humidValue ?? undefined}
            type="Humidity"
            format="%"
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
          {/* <div className="bg-yellow-400 rounded-lg shadow-md px-6 "> */}
          {/* </div> */}
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
          <DoubleChart />
        </div>
      )}
    </div>
  );
}

export default Card;
