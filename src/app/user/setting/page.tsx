// ProfilePage.tsx
import React from "react";
import ProfileCard from "@/components/Profile/ProfileCard";
import AddressForm from "@/components/Profile/AddressForm";
import InCubeStatus from "@/components/Profile/IncubeStatus";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const ProfilePage: React.FC = async () => {
  const session = await getServerSession(authOptions);

  // console.log(session?.user.);

  // const userId = session?.user.;

  if (!session) {
    // Redirect jika sesi tidak ditemukan
    redirect("/login");
    return null;
  }
  return (
    <div className="p-6">
      <div className="h-max-screen space-y-8">
        <div className="flex flex-wrap gap-6 lg:ml-[97px] ml-0">
          <InCubeStatus title="Active" value={2} />
          <InCubeStatus title="Days left" value={2} />
        </div>
        <div className="flex flex-wrap gap-6 w-full lg:ml-[97px] ml-0 mx-auto">
          <ProfileCard
            name={session.user?.name ?? "User"}
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
