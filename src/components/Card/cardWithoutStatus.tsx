"use client";

import React, { useState, useEffect } from "react";
import Chart from "@/components/chart";
import Paho from "paho-mqtt";
import ChartWeekly from "../chart/ChartWeekly";
import InfoCard from "./infoCard";

type ClientType = {
  subscribe: (topic: string) => void;
  on: (event: string, callback: (message: any) => void) => void;
};

function CardNoStatus() {
  const [isOpen, setIsOpen] = useState(false); // Untuk mengontrol dropdown
  const [temp, setTemp] = useState<number | null>(null);
  const [humid, setHumid] = useState<number | null>(null);
  const [tempData, setTempData] = useState<number[]>([]);
  const [humidData, setHumidData] = useState<number[]>([]);
  const [weeklyTempAvg, setWeeklyTempAvg] = useState<number | null>(null);
  const [weeklyHumidAvg, setWeeklyHumidAvg] = useState<number | null>(null);
  const [client, setClient] = useState<ClientType | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [openAll, setOpenAll] = useState(false);

  // Load data dari localStorage hanya di sisi klien
  useEffect(() => {
    const savedTempData = localStorage.getItem("tempData");
    const savedHumidData = localStorage.getItem("humidData");

    if (savedTempData) {
      setTempData(JSON.parse(savedTempData));
    }
    if (savedHumidData) {
      setHumidData(JSON.parse(savedHumidData));
    }
  }, []);

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
    const payload = parseFloat(message.payloadString);
    const topic = message.destinationName;

    if (topic === "MirsabAnwar/Temp") {
      setTemp(payload);
      setTempData((prevData) => {
        const newData = [...prevData, payload].slice(-7); // Menyimpan data harian untuk 7 hari
        localStorage.setItem("tempData", JSON.stringify(newData)); // Simpan di localStorage
        return newData;
      });
    } else if (topic === "MirsabAnwar/Humid") {
      setHumid(payload);
      setHumidData((prevData) => {
        const newData = [...prevData, payload].slice(-7);
        localStorage.setItem("humidData", JSON.stringify(newData)); // Simpan di localStorage
        return newData;
      });
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

  useEffect(() => {
    if (client && isConnected) {
      subscribeToTopic("MirsabAnwar/Temp");
      subscribeToTopic("MirsabAnwar/Humid");
    }
  }, [client, isConnected]);

  // Menghitung rata-rata mingguan setiap kali data diperbarui
  useEffect(() => {
    if (tempData.length === 7) {
      const tempAvg =
        tempData.reduce((acc, curr) => acc + curr, 0) / tempData.length;
      setWeeklyTempAvg(tempAvg);
    }
    if (humidData.length === 7) {
      const humidAvg =
        humidData.reduce((acc, curr) => acc + curr, 0) / humidData.length;
      setWeeklyHumidAvg(humidAvg);
    }
  }, [tempData, humidData]);

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
              <ChartWeekly />
            </div>
            <div className="md:w-1/2 lg:pt-[50px]">
              <div className="p-6 space-y-4">
                <h2 className="lg:text-3xl text-xl font-semibold lg:pl-[90px] pl-6 text-black">
                  Average
                </h2>
                <div className="grid grid-cols-2">
                  <InfoCard
                    color="#FFC107"
                    title="Temperature"
                    value={
                      weeklyTempAvg !== null ? weeklyTempAvg.toFixed(2) : "N/A"
                    }
                  />
                  <div className="lg:mr-[110px] mr-0 lg:-ml-[110px]">
                    <InfoCard
                      color="#4CAF50"
                      title="Humidity"
                      value={
                        weeklyHumidAvg !== null
                          ? weeklyHumidAvg.toFixed(2)
                          : "N/A"
                      }
                    />
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
          {/* <div className="">
            <ChartWeekly></ChartWeekly>
          </div> */}
        </div>
      )}
    </div>
  );
}

export default CardNoStatus;
