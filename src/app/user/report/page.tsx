import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import ReportCom from "@/components/report/report";

export const metadata: Metadata = {
  title: "Report Incube",
  description: "Collect Your Report",
  // other metadata
};

const Report = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    // Redirect jika sesi tidak ditemukan
    redirect("/login");
    return null;
  }
  return (
    <div className="p-6">
      <h1 className="lg:text-4xl text-2xl font-semibold text-black mb-6">
        Report
      </h1>
      <div className="h-max-screen">
        <ReportCom />
      </div>
    </div>
  );
};

export default Report;
