// ProfilePage.tsx
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import UpdateAddressForm from "@/components/Profile/Edit-Address";

export const metadata: Metadata = {
  title: "Profile Incube",
  description: "Edit Address information",
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
        <UpdateAddressForm></UpdateAddressForm>
      </div>
    </div>
  );
};

export default ProfilePage;
