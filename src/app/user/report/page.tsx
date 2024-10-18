"use client";

import React from "react";
import FooterUser from "@/components/Footer/footerUser";
import CardNoStatus from "@/components/Card/cardWithoutStatus";

function Report() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-semibold text-black mb-6">Report</h1>
      <CardNoStatus /> {/* Menggunakan komponen Card */}
      <CardNoStatus /> {/* Menggunakan komponen Card */}
      <CardNoStatus /> {/* Menggunakan komponen Card */}
      <CardNoStatus /> {/* Menggunakan komponen Card */}
      <CardNoStatus /> {/* Menggunakan komponen Card */}
      <FooterUser />
    </div>
  );
}

export default Report;
