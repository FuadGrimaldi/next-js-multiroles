import React from "react";
import CardNoStatus from "@/components/Card/cardWithoutStatus";
import { getServerSession } from "next-auth";
import { authOptionts } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Report = async () => {
  const session = await getServerSession(authOptionts);

  if (!session) {
    // Redirect jika sesi tidak ditemukan
    redirect("/login");
    return null;
  }
  return (
    <div className="p-6">
      <h1 className="text-4xl font-semibold text-black mb-6">Report</h1>
      <div className="h-screen">
        <CardNoStatus /> {/* Menggunakan komponen Card */}
        <CardNoStatus /> {/* Menggunakan komponen Card */}
      </div>
    </div>
  );
};

export default Report;
