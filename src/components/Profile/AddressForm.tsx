"use client";
import React, { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import axios from "axios";

const AddressForm: React.FC = () => {
  const [addressData, setAddressData] = useState<any>({}); // Store the address data
  const [isLoading, setIsLoading] = useState(true); // Handle loading state
  const [userId, setUserId] = useState<string | null>(null); // State to store userId
  const provinsi = useState<string | null>(null); // State to store provins

  useEffect(() => {
    // Only access localStorage on the client side
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("id"); // Get the user ID from localStorage
      if (storedUserId) {
        setUserId(storedUserId); // Set userId in state
      }
    }
  }, []);

  useEffect(() => {
    // Fetch the address data when the component mounts and userId is available
    if (userId) {
      axios
        .get(`/api/address?id=${userId}`)
        .then((response) => {
          if (response.data.status === 200) {
            setAddressData(response.data.data[0]); // Set the fetched address data
          }
        })
        .catch((error) => {
          console.error("Error fetching address data:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [userId]);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading text while data is being fetched
  }

  if (!addressData) {
    return <div>No address data found.</div>; // Handle case when no address data is available
  }

  return (
    <div className="rounded-lg border border-gray-200 p-6 shadow-md w-full max-w-[800px] bg-white">
      {/* Header section with "Your Address" text and icon aligned to the corners */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-black">Your Address</h3>
        <div className="cursor-pointer">
          <FaEllipsisV size={20} className="text-gray-600" />
        </div>
      </div>

      <form className="space-y-4 text-base">
        <div>
          <label className="text-base font-medium text-gray-700">
            Provinsi
          </label>
          <input
            type="text"
            className="mt-1 w-full rounded-sm border-gray-300 bg-gray-500 p-1 text-white"
            value={addressData?.provinsi || "kosong"}
            disabled
          />
        </div>
        <div>
          <label className="text-base font-medium text-gray-700">
            Kota/Kabupaten
          </label>
          <input
            type="text"
            className="mt-1 w-full rounded-sm border-gray-300 bg-gray-500 p-1 "
            value={addressData?.Kabupaten || ""}
            disabled
          />
        </div>
        <div>
          <label className="text-base font-medium text-gray-700">
            Kecamatan
          </label>
          <input
            type="text"
            className="mt-1 w-full rounded-sm border-gray-300 bg-gray-500 p-1"
            value={addressData?.Kecamatan || ""}
            disabled
          />
        </div>
        <div>
          <label className="text-base font-medium text-gray-700">
            Kelurahan
          </label>
          <input
            type="text"
            className="mt-1 w-full rounded-sm border-gray-300 bg-gray-500 p-1"
            value={addressData?.Kelurahan || ""}
            disabled
          />
        </div>
        <div>
          <label className="text-base font-medium text-gray-700">
            Kode Pos
          </label>
          <input
            type="text"
            className="mt-1 w-full rounded-sm border-gray-300 bg-gray-500 p-1"
            value={addressData?.Kode_pos || ""}
            disabled
          />
        </div>
        <div>
          <label className="text-base font-medium text-gray-700">
            Nama Jalan, Gedung, No. Rumah
          </label>
          <textarea
            className="mt-1 w-full rounded-sm bg-gray-500 p-1 py-3"
            value={addressData?.alama_lengkap || ""}
            rows={2}
            disabled
          />
        </div>
        <button className="w-full bg-yellow-500 text-white py-2 rounded-md font-medium hover:bg-yellow-600">
          Edit
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
