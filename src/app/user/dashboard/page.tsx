import React from "react";
import Card from "@/components/Card"; // Mengimpor komponen Card
import { getServerSession } from "next-auth";
import { authOptionts } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await getServerSession(authOptionts);

  if (!session) {
    // Redirect jika sesi tidak ditemukan
    redirect("/login");
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-semibold text-black mb-6">
        Dashboard, {session.user?.name}
      </h1>
      <Card /> {/* Menggunakan komponen Card */}
      <Card /> {/* Menggunakan komponen Card */}
      <Card /> {/* Menggunakan komponen Card */}
    </div>
  );
};

export default DashboardPage;
