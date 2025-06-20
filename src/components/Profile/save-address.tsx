"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type AddressData = {
  id_user: number;
  provinsi: string;
  Kabupaten: string;
  Kecamatan: string;
  Kelurahan: string;
  Kode_pos: string;
  alamat_lengkap: string;
};

const SaveAddressForm: React.FC = () => {
  const [addressData, setAddressData] = useState<AddressData>({
    id_user: parseInt(localStorage.getItem("id") || "0"), // changed to parseInt
    provinsi: "",
    Kabupaten: "",
    Kecamatan: "",
    Kelurahan: "",
    Kode_pos: "",
    alamat_lengkap: "",
  });
  const [loading, setLoading] = useState<boolean>(false); // changed loading state to false initially
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAddressData({ ...addressData, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // start loading state

    try {
      // Use POST instead of PUT to create a new address
      const response = await fetch(`/api/address`, {
        method: "POST", // Changed to POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressData),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get error response text
        console.error("Error response:", errorText);
        throw new Error("Failed to create address");
      }

      // Redirect to a confirmation page or address listing page
      router.push("/user/setting"); // Adjust the redirect path as needed
    } catch (error) {
      console.error("Error creating address:", error);
    } finally {
      setLoading(false); // stop loading state after the request
    }
  };

  return (
    <div className="flex flex-col items-center my-10">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
          Add Address
        </h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="provinsi"
              className="block text-gray-700 font-medium"
            >
              Provinsi
            </label>
            <input
              type="text"
              id="provinsi"
              name="provinsi"
              value={addressData.provinsi}
              onChange={handleInputChange}
              className="w-full border bg-gray-100 text-black rounded-md p-2"
            />
          </div>
          <div>
            <label
              htmlFor="Kabupaten"
              className="block text-gray-700 font-medium"
            >
              Kabupaten
            </label>
            <input
              type="text"
              id="Kabupaten"
              name="Kabupaten"
              value={addressData.Kabupaten}
              onChange={handleInputChange}
              className="w-full border bg-gray-100 text-black rounded-md p-2"
            />
          </div>
          <div>
            <label
              htmlFor="Kecamatan"
              className="block text-gray-700 font-medium"
            >
              Kecamatan
            </label>
            <input
              type="text"
              id="Kecamatan"
              name="Kecamatan"
              value={addressData.Kecamatan}
              onChange={handleInputChange}
              className="w-full border bg-gray-100 text-black rounded-md p-2"
            />
          </div>
          <div>
            <label
              htmlFor="Kelurahan"
              className="block text-gray-700 font-medium"
            >
              Kelurahan
            </label>
            <input
              type="text"
              id="Kelurahan"
              name="Kelurahan"
              value={addressData.Kelurahan}
              onChange={handleInputChange}
              className="w-full border bg-gray-100 text-black rounded-md p-2"
            />
          </div>
          <div>
            <label
              htmlFor="Kode_pos"
              className="block text-gray-700 font-medium"
            >
              Kode Pos
            </label>
            <input
              type="text"
              id="Kode_pos"
              name="Kode_pos"
              value={addressData.Kode_pos}
              onChange={handleInputChange}
              className="w-full border bg-gray-100 text-black rounded-md p-2"
            />
          </div>
          <div>
            <label
              htmlFor="alamat_lengkap"
              className="block text-gray-700 font-medium"
            >
              Alamat Lengkap
            </label>
            <textarea
              id="alamat_lengkap"
              name="alamat_lengkap"
              value={addressData.alamat_lengkap}
              onChange={handleInputChange}
              className="w-full border bg-gray-100 text-black rounded-md p-2"
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
            disabled={loading} // Disable the button while loading
          >
            {loading ? "Saving..." : "Save Address"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SaveAddressForm;
