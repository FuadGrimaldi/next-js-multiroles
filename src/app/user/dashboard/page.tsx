// File: /pages/dashboard.tsx
import React from "react";
import Card from "@/components/Card";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session?.user.id);

  if (!session) {
    redirect("/login");
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-semibold text-black mb-6">
        Dashboard, {session.user?.name || "User"}
      </h1>
      <div className="h-max-screen">
        <Card />
        {/* <Card /> */}
      </div>
    </div>
  );
};

export default DashboardPage;
