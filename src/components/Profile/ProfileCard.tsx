import React from "react";
import { FaEllipsisV } from "react-icons/fa";

type ProfileCardProps = {
  name: string;
  location: string;
  phone: string;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ name, location, phone }) => {
  return (
    <div className="flex flex-col items-center lg:w-auto w-full">
      <div className="rounded-lg border border-gray-200 p-6 lg:mx-[175px] mx-0 shadow-md lg:pb-[100px] pb-0 max-w-[1000px] w-full">
        {/* Header section with "Your Profile" text and icon aligned to the corners */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-black">Your Profile</h3>
          <div className="cursor-pointer">
            <FaEllipsisV size={20} className="text-gray-600" />
          </div>
        </div>

        {/* Profile image */}
        <div className="w-[130px] h-[130px] rounded-full bg-gray-300 mx-auto overflow-hidden mt-6">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile details */}
        <div className="text-center mt-4">
          <p className="text-xl font-medium text-black">{name}</p>
          <p className="text-gray-500">{location}</p>
          <p className="text-gray-500">{phone}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
