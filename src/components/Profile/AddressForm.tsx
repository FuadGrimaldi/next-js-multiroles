import React from "react";
import { FaEllipsisV } from "react-icons/fa";

const AddressForm: React.FC = () => {
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
            className="mt-1 w-full rounded-sm border-gray-300 bg-gray-500 p-1"
            value="Jawa Barat"
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
            value="Kota Bandung"
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
            p-1
            value="Cibeunying Kidul"
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
            p-1
            value="Cikutra"
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
            p-1
            value="40124"
            disabled
          />
        </div>
        <div>
          <label className="text-base font-medium text-gray-700">
            Nama Jalan, Gedung, No. Rumah
          </label>
          <textarea
            className="mt-1 w-full rounded-sm bg-gray-500 p-1 py-3"
            p-1
            value="Jalan Sekejapjaring III No.43 RT004 / RW.01, Kec. Cibeunying Kidul Kel. Cikutra, Kota Bandung ID 40124"
            rows={2}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded-md font-medium hover:bg-yellow-600"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
