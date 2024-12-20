"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar/sidebar";
import FooterUser from "@/components/Footer/footerUser";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sideMenuIsExpanded, setSideMenuIsExpanded] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar container */}
      <div
        className={`${
          sideMenuIsExpanded ? "w-[200px]" : "w-20" // Control width of the sidebar
        } transition-all duration-300 bg-[#ffb800]`}
      >
        <Sidebar setExpand={setSideMenuIsExpanded} />
      </div>

      {/* Main content container */}
      <div className="flex-1 bg-gray-100 p-4 transition-all duration-300">
        <main>{children}</main>
        <FooterUser />
      </div>
    </div>
  );
}
