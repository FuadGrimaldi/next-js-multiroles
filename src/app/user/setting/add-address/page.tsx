// ProfilePage.tsx
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import SaveAddressForm from "@/components/Profile/save-address";

export const metadata: Metadata = {
  title: "Profile Incube",
  description: "Add address information",
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
        <SaveAddressForm></SaveAddressForm>
      </div>
    </div>
  );
};

export default ProfilePage;
