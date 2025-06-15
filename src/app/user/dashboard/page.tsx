// File: /pages/dashboard.tsx
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Dashboard from "@/components/dashboard/dashboard";

export const metadata: Metadata = {
  title: "Dashboard Incube",
  description: "Monitoring realtime Incube",
  // other metadata
};

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="lg:text-4xl text-2xl font-semibold text-black mb-6">
        Dashboard
      </h1>
      <div className="h-max-screen">
        <Dashboard />
        {/* <Card /> */}
      </div>
    </div>
  );
};

export default DashboardPage;
