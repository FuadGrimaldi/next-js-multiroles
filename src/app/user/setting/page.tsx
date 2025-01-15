// ProfilePage.tsx
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import SettingCom from "@/components/setting/setting";

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
      <div className="h-max-screen">
        <SettingCom />
      </div>
    </div>
  );
};

export default ProfilePage;
