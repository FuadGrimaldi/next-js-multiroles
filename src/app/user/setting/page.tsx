// ProfilePage.tsx
import React from "react";
import ProfileCard from "@/components/Profile/ProfileCard";
import AddressForm from "@/components/Profile/AddressForm";
import InCubeStatus from "@/components/Profile/IncubeStatus";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Incube",
  description: "User information",
  // other metadata
};

const ProfilePage: React.FC = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    // Redirect jika sesi tidak ditemukan
    redirect("/login");
    return null;
  }
  return (
    <div className="p-6">
      <div className="h-max-screen space-y-8">
        <div className="flex flex-wrap gap-6 lg:pl-[97px] ml-0">
          <InCubeStatus title="Active" value={2} />
          <InCubeStatus title="Days left" value={2} />
        </div>
        <div className="flex flex-wrap gap-6 w-full lg:pl-[97px] ml-0 mx-auto">
          <ProfileCard />
          <AddressForm />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
