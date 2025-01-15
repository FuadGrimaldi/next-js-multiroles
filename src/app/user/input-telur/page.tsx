import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import CardEggControl from "@/components/Card/cardEggControl";

export const metadata: Metadata = {
  title: "Controlling Incube",
  description: "Control your product",
  // other metadata
};

const ControlEgg = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    // Redirect jika sesi tidak ditemukan
    redirect("/login");
    return null;
  }
  return (
    <div className="p-6">
      <h1 className="lg:text-4xl text-2xl font-semibold text-black mb-6">
        Eggs Control
      </h1>
      <div className="h-max-screen">
        <CardEggControl></CardEggControl>
      </div>
    </div>
  );
};

export default ControlEgg;
