"use client";

import React from "react";
import Card from "@/components/Card"; // Mengimpor komponen Card
import FooterUser from "@/components/Footer/footerUser";

function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-semibold text-black mb-6">Dashboard</h1>
      <Card /> {/* Menggunakan komponen Card */}
      <Card /> {/* Menggunakan komponen Card */}
      <Card /> {/* Menggunakan komponen Card */}
      <FooterUser />
    </div>
  );
}

export default Dashboard;
