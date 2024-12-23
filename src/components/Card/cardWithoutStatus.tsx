"use client";

import React, { useState, useEffect } from "react";
import Paho from "paho-mqtt";
import ChartWeekly from "../chart/ChartWeekly";
import InfoCard from "./infoCard";
import { format } from "date-fns";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Swal from "sweetalert2";

type ClientType = {
  subscribe: (topic: string) => void;
  on: (event: string, callback: (message: any) => void) => void;
};
type DataType = {
  id: string;
  id_produk: string;
  suhu: number;
  humid: number;
  gas: number;
  fan: string;
  lampu: string;
  ts: string; // timestamp
};

function CardNoStatus() {
  const [isOpen, setIsOpen] = useState(false); // Untuk mengontrol dropdown
  const [temp, setTemp] = useState<number | null>(null);
  const [humid, setHumid] = useState<number | null>(null);
  const [tempData, setTempData] = useState<number[]>(() => {
    const savedData = localStorage.getItem("tempData");
    return savedData ? JSON.parse(savedData) : [];
  });
  const [humidData, setHumidData] = useState<number[]>(() => {
    const savedData = localStorage.getItem("humidData");
    return savedData ? JSON.parse(savedData) : [];
  });
  const [weeklyTempAvg, setWeeklyTempAvg] = useState<number | null>(null);
  const [weeklyHumidAvg, setWeeklyHumidAvg] = useState<number | null>(null);
  const [labels, setLabels] = useState<string[]>([]);
  const [client, setClient] = useState<ClientType | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState<DataType[]>([]); // State untuk data tabel
  const [isLoading, setIsLoading] = useState(true); // State untuk loading
  const [filter, setFilter] = useState(""); // Untuk menyimpan input pencarian
  const [startDate, setStartDate] = useState<string>(""); // Tanggal awal
  const [endDate, setEndDate] = useState<string>(""); // Tanggal akhir
  const [currentPage, setCurrentPage] = useState(1); // Halaman aktif
  const [filteredData, setFilteredData] = useState<DataType[]>([]);
  const itemsPerPage = 8; // Jumlah item per halaman
  const [filteredTempData, setFilteredTempData] = useState<number[]>([]);
  const [filteredHumidData, setFilteredHumidData] = useState<number[]>([]);
  const [filteredGasData, setFilteredGasData] = useState<number[]>([]);
  const [filteredLabels, setFilteredLabels] = useState<string[]>([]);
  const [averageTemp, setAverageTemp] = useState(0); // Rata-rata suhu
  const [averageHumid, setAverageHumid] = useState(0); // Rata-rata humiditas
  const [averageGas, setAverageGas] = useState(0); // Rata-rata gas

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

    if (topic === "inCube/Temp") {
      setTemp(payload);
      setTempData((prevData) => {
        const newData = [...prevData, payload].slice(-7); // Menyimpan data harian untuk 7 hari
        localStorage.setItem("tempData", JSON.stringify(newData)); // Simpan di localStorage
        return newData;
      });
    } else if (topic === "inCube/Humid") {
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
      subscribeToTopic("inCube/Temp");
      subscribeToTopic("inCube/Humid");
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
    const now = new Date();
    const currentHour = now.getHours().toString().padStart(2, "0");
    const currentMinute = now.getMinutes().toString().padStart(2, "0");
    const currentSecond = now.getSeconds().toString().padStart(2, "0");
    setLabels((prevLabels) => {
      const newLabel = `${currentHour}:${currentMinute}:${currentSecond}`;
      const updatedLabels = [...prevLabels, newLabel];
      return updatedLabels.length > 60 ? updatedLabels.slice(1) : updatedLabels;
    });
  }, [tempData, humidData]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/data/getAllSensor");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        if (Array.isArray(result)) {
          const sortedData = result.sort((a: any, b: any) => a.id - b.id);
          setData(sortedData);
          setFilteredData(sortedData); // Default filter menunjukkan semua data
        } else {
          console.error("Invalid data format: Expected an array");
        }
      } catch (error) {
        console.error("Failed to fetch data:");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter Data
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value.toLowerCase();
    setFilter(keyword);
    const filtered = data.filter(
      (item: any) =>
        item.id.toString().includes(keyword) || // Filter berdasarkan ID
        item.suhu.toString().includes(keyword) || // Filter berdasarkan suhu
        item.humid.toString().includes(keyword)
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset halaman ke 1 jika filter diubah
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // const handleFilterTime = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const value = event.target.value;
  //   setFilterY(value);

  //   const now = new Date();
  //   let filtered: DataType[] = [];

  //   if (value === "today") {
  //     // Filter data hari ini
  //     filtered = data.filter((item) => {
  //       const itemDate = new Date(item.ts);
  //       return (
  //         itemDate.getDate() === now.getDate() &&
  //         itemDate.getMonth() === now.getMonth() &&
  //         itemDate.getFullYear() === now.getFullYear()
  //       );
  //     });
  //   } else if (value === "thisWeek") {
  //     // Filter data minggu ini
  //     const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())); // Mulai minggu
  //     filtered = data.filter((item) => {
  //       const itemDate = new Date(item.ts);
  //       return itemDate >= startOfWeek && itemDate <= new Date();
  //     });
  //   } else if (value === "thisMonth") {
  //     // Filter data bulan ini
  //     filtered = data.filter((item) => {
  //       const itemDate = new Date(item.ts);
  //       return (
  //         itemDate.getMonth() === now.getMonth() &&
  //         itemDate.getFullYear() === now.getFullYear()
  //       );
  //     });
  //   } else {
  //     // Semua data
  //     filtered = data;
  //   }

  //   setFilteredData(filtered);
  // };

  // Handle Filter by Date Range
  const handleFilterByDateRange = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start > end) {
        console.error("Start date cannot be later than end date");
        return;
      }

      const filteredTemp: number[] = [];
      const filteredHumid: number[] = [];
      const filteredLabel: string[] = [];
      const filteredGas: number[] = [];
      const filteredItems: any[] = [];

      data.forEach((item) => {
        const itemDate = new Date(item.ts); // `ts` adalah timestamp data
        if (itemDate >= start && itemDate <= end) {
          filteredTemp.push(item.suhu); // `suhu` adalah temperature
          filteredHumid.push(item.humid); // `humid` adalah humidity
          filteredGas.push(item.gas); // `gas` adalah gas
          // Format tanggal menggunakan date-fns
          const formattedDate = format(itemDate, "yyyy-MM-dd");
          filteredLabel.push(formattedDate);
          filteredItems.push(item);
        }
      });

      setFilteredTempData(filteredTemp);
      setFilteredHumidData(filteredHumid);
      setFilteredGasData(filteredGas);
      setFilteredLabels(filteredLabel);

      setFilteredData(filteredItems); // Update filteredData state
      calculateAverages();
    } else {
      console.error("Please select both start and end dates");
    }
  };
  const calculateAverages = () => {
    if (filteredData.length > 0) {
      const totalTemp = filteredData.reduce((sum, item) => sum + item.suhu, 0);
      const totalHumid = filteredData.reduce(
        (sum, item) => sum + item.humid,
        0
      );
      const totalGas = filteredData.reduce((sum, item) => sum + item.gas, 0);

      setAverageTemp(totalTemp / filteredData.length);
      setAverageHumid(totalHumid / filteredData.length);
      setAverageGas(totalGas / filteredData.length);
    } else {
      setAverageTemp(0);
      setAverageHumid(0);
      setAverageGas(0);
    }
  };

  const handlePrintPDF = () => {
    if (!startDate || !endDate) {
      Swal.fire({
        position: "top",
        icon: "warning",
        title:
          "Please select both start and end dates before generating the PDF.",
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: "custom-swal",
          title: "custom-swal-title",
          icon: "custom-swal-icon",
        },
      });
      return;
    }
    const doc = new jsPDF();
    const title = "Filtered Data Report";
    const filterDateRange = `Date Range: ${format(
      startDate,
      "yyyy-MM-dd"
    )} - ${format(endDate, "yyyy-MM-dd")}`;
    const tableData = filteredData.map((item, index) => [
      index + 1,
      item.suhu,
      item.humid,
      item.gas,
      item.fan,
      item.lampu,
      item.ts,
    ]);
    // Hitung rata-rata
    const avgTemp = averageTemp.toFixed(2);
    const avgHumid = averageHumid.toFixed(2);
    const avgGas = averageGas.toFixed(2);
    const averagesText = `
    Averages:
    - Temperature: ${avgTemp}°C
    - Humidity: ${avgHumid}%
    - Gas: ${avgGas} ppm
  `;

    // Tambahkan judul
    doc.text(title, 20, 10);
    // Tambahkan rentang tanggal filter
    doc.text(filterDateRange, 20, 20);

    // Tambahkan tabel
    doc.autoTable({
      startY: 30,
      head: [
        ["#", "Temperature", "Humidity", "Gas", "Fan", "Lamp", "Timestamp"],
      ],
      body: tableData,
    });

    // Tambahkan data rata-rata setelah tabel
    // Periksa apakah lastAutoTable ada, jika tidak gunakan nilai default
    const finalY = doc.lastAutoTable?.finalY ?? 50; // Gunakan `??` untuk nilai default
    doc.text("Summary:", 20, finalY + 10);
    doc.text(averagesText, 20, finalY + 20);

    // Simpan dokumen sebagai PDF
    doc.save("data-sensor.pdf");
  };

  useEffect(() => {
    handleFilterByDateRange();
  }, [startDate, endDate]);
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
            <ChartWeekly
              temperatureData={tempData}
              humidityData={humidData}
              labels={labels}
              gasData={[]}
              Type="One Hour Average"
              limitData={10}
            />

            <div className="md:w-1/2 lg:pt-[50px]">
              <div className="space-y-4">
                <h2 className="lg:text-3xl text-xl font-semibold lg:pl-[90px] px-2 text-black">
                  Average One Hour
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
                <h2 className="lg:text-3xl text-xl font-semibold mt-6 lg:pl-[90px] px-2 text-black">
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

          <h2 className="text-xl font-semibold mt-6 text-black">Sensor Data</h2>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filter Section */}
            <div className="lg:w-1/3 bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="lg:text-xl text-lg font-semibold text-black mb-4">
                Find
              </h2>
              <input
                value={filter}
                onChange={handleFilterChange}
                placeholder="Search by ID or Temp or Humid"
                className="w-full p-2 border border-gray-300 bg-white rounded-md mb-4 text-black"
              />
              <h2 className="lg:text-xl text-lg font-semibold text-black mb-4">
                Filter
              </h2>
              {/* <select
                id="filter"
                value={filterY}
                onChange={handleFilterTime}
                className="w-full p-2 border border-gray-300 bg-white rounded-md"
              >
                <option value="all">All Data</option>
                <option value="today">Today</option>
                <option value="thisWeek">This Week</option>
                <option value="thisMonth">This Month</option>
              </select> */}
              <div>
                <label
                  htmlFor="startDate"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 bg-white rounded-md text-black"
                />
              </div>
              <div>
                <label
                  htmlFor="endDate"
                  className="block mb-2 text-sm font-medium text-gray-700 pt-1"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 bg-white rounded-md text-black"
                />
              </div>
              <div className="flex items-end mt-5">
                <button
                  onClick={handleFilterByDateRange}
                  className="bg-blue-500 lg:px-4 px-2 lg:py-2 py-1 lg:text-base text-sm rounded-md hover:bg-blue-600"
                >
                  Apply Filter
                </button>
              </div>
            </div>
            <ChartWeekly
              temperatureData={filteredTempData}
              humidityData={filteredHumidData}
              labels={filteredLabels}
              gasData={[]}
              Type="Filtered Data"
              limitData={30}
            />
            <div className="lg:w-1/3 bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="lg:text-xl text-lg font-semibold text-black mb-4">
                Average By Filtered
              </h2>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                  <h3 className="lg:text-lg text-sm font-semibold text-gray-700">
                    Average Suhu
                  </h3>
                  <p className="lg:text-xl text-base font-bold text-[#FFC107]">
                    {averageTemp.toFixed(2)}°C
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                  <h3 className="lg:text-lg text-sm font-semibold text-gray-700">
                    Average Humid
                  </h3>
                  <p className="lg:text-xl text-base font-bold text-[#FFC107]">
                    {averageHumid.toFixed(2)}%
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                  <h3 className="lg:text-lg text-sm font-semibold text-gray-700">
                    Average Gas
                  </h3>
                  <p className="lg:text-xl text-base font-bold text-[#FFC107]">
                    {averageGas.toFixed(2)} PPM
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md bg-[#FFC107]">
                  <button
                    onClick={handlePrintPDF}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Print to PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Table Section */}
          <div className="lg:w-2/3">
            {isLoading ? (
              <p>Loading data...</p>
            ) : (
              <div className="relative">
                <div className="absolute lg:relative top-10 lg:top-0 lg:transform-none lg:left-0 left-[248px] transform -translate-x-1/2 lg:translate-x-0 z-2 lg:bg-transparent bg-white shadow-lg lg:shadow-none rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <h2 className="lg:px-0 px-[39px] lg:py-0 py-[39px] lg:text-xl text-lg font-semibold text-black lg:my-[20px] my-4 ">
                      Data
                    </h2>
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="w-20 border border-gray-300 px-4 py-2 text-black text-sm">
                            No
                          </th>
                          <th className="w-36 border border-gray-300 px-4 py-2 text-black text-sm">
                            ID
                          </th>
                          <th className="w-32 border border-gray-300 px-4 py-2 text-black text-sm">
                            Temp
                          </th>
                          <th className="w-32 border border-gray-300 px-4 py-2 text-black text-sm">
                            Humid
                          </th>
                          <th className="w-32 border border-gray-300 px-4 py-2 text-black text-sm">
                            Gas
                          </th>
                          <th className="w-32 border border-gray-300 px-4 py-2 text-black text-sm">
                            Status Fan
                          </th>
                          <th className="w-32 border border-gray-300 px-4 py-2 text-black text-sm">
                            Status Lamp
                          </th>
                          <th className="w-48 border border-gray-300 px-4 py-2 text-black text-sm">
                            Timestamp
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.map((item: any) => (
                          <tr key={item.id}>
                            <td className="w-20 border border-gray-300 px-4 py-2 text-black text-sm">
                              {item.id}
                            </td>
                            <td className="w-36 border border-gray-300 px-4 py-2 text-black text-sm">
                              {item.id_produk}
                            </td>
                            <td className="w-32 border border-gray-300 px-4 py-2 text-black text-sm">
                              {item.suhu}
                            </td>
                            <td className="w-32 border border-gray-300 px-4 py-2 text-black text-sm">
                              {item.humid}
                            </td>
                            <td className="w-32 border border-gray-300 px-4 py-2 text-black text-sm">
                              {item.gas}
                            </td>
                            <td className="w-32 border border-gray-300 px-4 py-2 text-black text-sm">
                              {item.fan}
                            </td>
                            <td className="w-32 border border-gray-300 px-4 py-2 text-black text-sm">
                              {item.lampu}
                            </td>
                            <td className="w-48 border border-gray-300 px-4 py-2 text-black text-sm">
                              {item.ts}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-4">
                      <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
                      >
                        Prev
                      </button>
                      <span className="text-black">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CardNoStatus;
