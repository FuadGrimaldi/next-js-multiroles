import React from "react";
import Card from "@/components/Card"; // Mengimpor komponen Card
import FooterUser from "@/components/Footer/footerUser";
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
      <h1 className="text-4xl font-semibold text-black mb-6">Dashboard</h1>
      <p>Welcome, {session.user?.email}!</p> {/* Menampilkan email dari sesi */}
      <Card /> {/* Menggunakan komponen Card */}
      <Card /> {/* Menggunakan komponen Card */}
      <Card /> {/* Menggunakan komponen Card */}
      <FooterUser />
    </div>
  );
};

export default DashboardPage;
