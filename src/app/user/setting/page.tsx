// ProfilePage.tsx
import React from "react";
import ProfileCard from "@/components/Profile/ProfileCard";
import AddressForm from "@/components/Profile/AddressForm";
import InCubeStatus from "@/components/Profile/IncubeStatus";

const ProfilePage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="h-max-screen flex flex-col items-center bg-gray-500 py-10 space-y-8">
        <div className="flex flex-wrap gap-6 bg-gray-200">
          <InCubeStatus title="Active" value={2} />
          <InCubeStatus title="Days left" value={2} />
        </div>
        <div className="flex flex-wrap justify-center gap-6 w-full bg-gray-300">
          <ProfileCard
            name="Mochamad Abel Avriyana S"
            location="Bandung, Indonesia"
            phone="+62 8515 6931 813"
          />
          <AddressForm />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
